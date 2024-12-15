import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    caption: {
      display: 'inline-flex',
      gap: 8,
    },
    wordsContainer: {
      display: 'inline-flex',
      gap: 4,
    },
    time: {
      color: '#AAA',
    },
  },
  {
    name: 'caption',
  },
);

export default useStyles;
