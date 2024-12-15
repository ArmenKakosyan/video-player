import { memo, useRef } from 'react';
import type CaptionType from '../../../types/caption';
import useStyles from './styles';
import Word from './Word/Word';

interface CaptionProps {
  caption: CaptionType;
}

const Caption = ({ caption: { word, start_time, end_time, id } }: CaptionProps) => {
  const classes = useStyles();

  const popperRef = useRef<HTMLDivElement>(null);

  const difference = end_time - start_time;
  const time = difference ? difference.toFixed(1) : 0;
  const splittedWords = word.split(' ');

  return (
    <div className={classes.caption}>
      {splittedWords.map((w, index) => (
        <Word key={`${w}_${index}`} word={w} id={id} index={index} popperRef={popperRef} />
      ))}
      <span className={classes.time}>{time}s</span>
    </div>
  );
};

export default memo(Caption);
