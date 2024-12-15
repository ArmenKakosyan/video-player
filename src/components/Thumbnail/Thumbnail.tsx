import { memo, MouseEvent } from 'react';
import useStyles from './styles';

interface ThumbnailProps {
  thumb: string;
  duration: number;
  onSeek: (time: number) => void;
}

const Thumbnail = ({ thumb, duration, onSeek }: ThumbnailProps) => {
  const classes = useStyles();

  const handleClick = (e: MouseEvent<HTMLImageElement>) => {
    const parent = e.currentTarget.parentElement as HTMLDivElement;
    const { scrollLeft, scrollWidth } = parent;
    const rect1 = parent.getBoundingClientRect();
    const clickX = e.clientX - rect1.left;

    const actualX = clickX + scrollLeft;

    const percentOfClick = (actualX * 100) / scrollWidth;

    onSeek((percentOfClick * duration) / 100);
  };

  return <img src={thumb} alt={`Thumbnail: ${thumb}`} className={classes.thumbnail} onClick={handleClick} draggable={false} />;
};

export default memo(Thumbnail);
