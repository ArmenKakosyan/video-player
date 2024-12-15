import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    word: {
      cursor: 'pointer',
      color: ({ color }: { color?: string }) => color ?? '#FFF',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  { name: 'word' },
);

export default useStyles;
