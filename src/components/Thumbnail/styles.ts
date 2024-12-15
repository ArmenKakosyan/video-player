import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    thumbnail: {
      width: 100,
      objectFit: 'cover',
      height: 'auto',
    },
  },
  { name: 'thumbnail' },
);

export default useStyles;
