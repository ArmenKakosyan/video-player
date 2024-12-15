import { createUseStyles } from 'react-jss';

const useGlobalStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
    },
  },
});

export default useGlobalStyles;
