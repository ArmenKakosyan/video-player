import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1.5,
      color: '#FFF',
      maxWidth: 500,
    },
    title: {
      fontSize: 20,
    },
    captions: {
      display: 'inline-flex',
      gap: 8,
      flexWrap: 'wrap',
    },
  },
  { name: 'video-captions' },
);

export default useStyles;
