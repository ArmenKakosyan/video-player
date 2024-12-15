import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      padding: 16,
    },
    captionsAndPlayerContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      flex: 1,
      gap: 16,
    },
  },
  { name: 'video-container' },
);

export default useStyles;
