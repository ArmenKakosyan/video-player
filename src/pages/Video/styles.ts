import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    container: {
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      '@media (max-width: 768px)': {
        height: 'auto',
      },
    },
  },
  { name: 'video' },
);

export default useStyles;
