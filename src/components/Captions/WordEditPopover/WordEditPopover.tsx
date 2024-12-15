import { memo, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';

import useStyles from './styles';
import useWordChangePopover from '../../../store/wordChangePopover';
import useVideoDataStore from '../../../store/videoData';
import Color from './Color/Color';
import CaptionColor from '../../../constants/captionColor';

const WordEditPopover = () => {
  const classes = useStyles();

  const wordId = useWordChangePopover(state => state.wordId)!;
  const word = useWordChangePopover(state => state.word)!;
  const index = useWordChangePopover(state => state.index)!;
  const setCaptionWord = useVideoDataStore(state => state.setCaptionWord);
  const removeCaption = useVideoDataStore(state => state.removeCaption);
  const resetCurrentWord = useWordChangePopover(state => state.resetCurrentWord);

  const [text, setText] = useState(word);

  const colors = Object.values(CaptionColor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    setCaptionWord(wordId, text, index);
  };

  const handleRemoveClick = () => {
    removeCaption(wordId, index);
    resetCurrentWord();
  };

  return (
    <div className={classes.container}>
      <div className={classes.inputContainer}>
        <input className={classes.input} onChange={handleChange} type="text" defaultValue={word} title="Edit word" placeholder="Enter new word" />
        <button className={classes.inputButton} type="button" onClick={handleSubmit} title="Submit">
          <TiTick />
        </button>
      </div>
      <div className={classes.colorPicker}>
        {colors.map(color => (
          <Color key={color} wordId={wordId} color={color} />
        ))}
      </div>
      <button className={classes.removeButton} type="button" onClick={handleRemoveClick}>
        <FaRegTrashAlt /> Remove caption
      </button>
    </div>
  );
};

export default memo(WordEditPopover);
