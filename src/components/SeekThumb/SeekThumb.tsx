import { memo } from 'react';
import useStyles from './styles';
import usePlayerStore from '../../store/playerStore';

interface SeekThumbProps {
  duration: number;
  onSeek: (time: number) => void;
}

const SeekThumb = ({ duration }: SeekThumbProps) => {
  const currentTime = usePlayerStore(state => state.currentTime);
  const left = (currentTime / duration) * 100;
  const classes = useStyles({ left });

  return <div className={classes.container} />;
};

export default memo(SeekThumb);
