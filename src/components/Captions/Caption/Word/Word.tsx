import { useCallback, useEffect, useRef } from 'react';
import ElementPopper from 'react-element-popper';
import 'react-element-popper/build/element_popper.css';

import useWordChangePopover from '../../../../store/wordChangePopover';
import useStyles from './styles';
import useVideoDataStore from '../../../../store/videoData';
import WordEditPopover from '../../WordEditPopover/WordEditPopover';

interface WordProps {
  word: string;
  id: string;
  index: number;
  popperRef: React.RefObject<HTMLDivElement>;
}

const Word = ({ word, id, index, popperRef }: WordProps) => {
  const currentWordId = useWordChangePopover(state => state.wordId);
  const currentWordIndex = useWordChangePopover(state => state.index);
  const setCurrentWordId = useWordChangePopover(state => state.setCurrentWord);
  const resetCurrentWord = useWordChangePopover(state => state.resetCurrentWord);
  const captionsMetaData = useVideoDataStore(state => state.captionsMetaData);

  const isCurrentlySelected = currentWordId === id && currentWordIndex === index;

  const currentItem = captionsMetaData.get(`${id}_${index}`);

  const classes = useStyles({ color: currentItem?.color });

  const handleWordClick = useCallback(() => {
    setCurrentWordId(id, word, index);
  }, [id, setCurrentWordId, word, index]);

  const handleClickOutside = useCallback(
    ({ target }: MouseEvent) => {
      if (popperRef.current && !popperRef.current.contains(target as Node)) {
        resetCurrentWord();
      }
    },
    [popperRef, resetCurrentWord],
  );

  const handleEscKey = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        resetCurrentWord();
      }
    },
    [resetCurrentWord],
  );

  useEffect(() => {
    if (currentWordId === id) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [currentWordId, id, handleClickOutside, handleEscKey]);

  if (currentItem?.removed) return null;

  return (
    <ElementPopper
      element={
        <span className={classes.word} onClick={handleWordClick}>
          {currentItem?.word ?? word}
        </span>
      }
      popper={
        isCurrentlySelected ? (
          <div ref={popperRef}>
            <WordEditPopover />
          </div>
        ) : (
          <></>
        )
      }
      active={isCurrentlySelected}
    />
  );
};

export default Word;
