import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: 8,
      gap: 16,
      backgroundColor: '#333',
      borderRadius: 8,
    },
    inputContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
      backgroundColor: '#444',
      borderRadius: 6,
    },
    input: {
      backgroundColor: '#444',
      color: '#fff',
      border: 'none',
      padding: 8,
      borderRadius: 4,
      maxWidth: 100,
    },
    inputButton: {
      widows: 28,
      height: 28,
      backgroundColor: '#FFF',
      color: '#444',
      border: 'none',
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#DDD',
      },
    },
    colorPicker: {
      display: 'flex',
      gap: 8,
    },
    removeButton: {
      backgroundColor: 'transparent',
      outline: 'none',
      border: 'none',
      color: '#BC0000',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      '&:hover': {
        color: '#FF0000',
      },
    },
  },
  { name: 'word-edit-popover' },
);

export default useStyles;
