import CaptionColor from '../../../../constants/captionColor';
import useVideoDataStore from '../../../../store/videoData';
import useWordChangePopover from '../../../../store/wordChangePopover';
import Caption from '../../../../types/caption';
import useStyles from './styles';

interface ColorProps {
  wordId: Caption['id'];
  color: CaptionColor;
}

const Color = ({ wordId, color }: ColorProps) => {
  const index = useWordChangePopover(state => state.index)!;
  const changeCaptionColor = useVideoDataStore(state => state.changeCaptionColor);
  const captionsMetaData = useVideoDataStore(state => state.captionsMetaData);
  const currentItem = captionsMetaData.get(wordId)!;

  const classes = useStyles({ color, selected: currentItem?.color === color });

  const handleClick = () => {
    changeCaptionColor(wordId, color, index);
  };

  return <div className={classes.container} onClick={handleClick} />;
};

export default Color;
