import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    container: {
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 32,
    },
    backButton: {
      color: '#FFF',
      cursor: 'pointer',
    },
    title: {
      margin: 0,
      color: '#FFF',
      fontSize: 24,
      fontWeight: 'normal',
    },
  },
  {
    name: 'header',
  },
);

export default useStyles;
