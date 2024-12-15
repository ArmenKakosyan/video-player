import { useEffect, useRef, useState } from 'react';
import useStyles from './styles';
// import videoUrl from '../../video/video.mp4';
import SeekThumb from '../SeekThumb/SeekThumb';
import getThumbnailsFromVideo from '../../utils/getThumbnailsFromVideo';
import usePlayerStore from '../../store/playerStore';
import Thumbnail from '../Thumbnail/Thumbnail';
import useVideoDataStore from '../../store/videoData';

interface TimelineProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const Timeline = ({ videoRef }: TimelineProps) => {
  const classes = useStyles();

  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [duration, setDuration] = useState(0);
  const isGettingThumbnails = useRef(false);

  const setCurrentTime = usePlayerStore(state => state.setCurrentTime);
  // DELETE NEXT LINE IF YOU ARE USING THE VIDEO FROM LOCAL FILES AND UNCOMMENT THE IMPORT
  const videoUrl = useVideoDataStore(state => state.data?.videoUrl)!;

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  useEffect(() => {
    if (isGettingThumbnails.current) return;

    const getThumbnails = async () => {
      try {
        isGettingThumbnails.current = true;
        const { thumbnails: thumbs, duration } = (await getThumbnailsFromVideo(videoUrl)) as { thumbnails: string[]; duration: number };
        setThumbnails(thumbs);
        setDuration(duration);
      } catch (error) {
        console.error('Error getting thumbnails', error);
      }
    };

    getThumbnails();
  }, [videoUrl]);

  return (
    <div className={classes.container}>
      {duration && (
        <div className={classes.thumbnailWrapper}>
          <SeekThumb onSeek={handleSeek} duration={duration} />
          <div className={classes.thumbnailsContainer}>
            <div className={classes.thumbnails}>
              {thumbnails.map(thumb => (
                <Thumbnail key={thumb} thumb={thumb} duration={duration} onSeek={handleSeek} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
