import CaptionsMetaData from '../../types/captionMetaData';
import usePlayerStore from '../playerStore';
import useVideoDataStore from '../videoData';

const THRESHOLD = 1.5;

const useRelevantCaptionSelector = () => {
  const currentTime = usePlayerStore(state => state.currentTime);
  const captions = useVideoDataStore(state => state.captions);
  const captionsMetaData = useVideoDataStore(state => state.captionsMetaData);

  if (!captions) return null;

  const relevantCaptions = captions.filter(caption => caption.start_time - THRESHOLD <= currentTime && caption.end_time + THRESHOLD >= currentTime);

  if (!relevantCaptions.length) return null;

  const ids = relevantCaptions.map(caption => caption.id);
  const result: CaptionsMetaData[] = [];

  for (const [key, value] of captionsMetaData) {
    for (const id of ids) {
      if (key.startsWith(`${id}_`)) {
        result.push(value);
        break;
      }
    }
  }

  return result;
};

export default useRelevantCaptionSelector;
