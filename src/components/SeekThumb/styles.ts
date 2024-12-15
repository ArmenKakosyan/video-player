import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    container: {
      position: 'absolute',
      height: '100%',
      width: 2,
      left: ({ left }: { left: number }) => `${left}%` || 0,
      transition: 'left .2s linear',

      '&:after': {
        content: '""',
        position: 'absolute',
        width: 2,
        height: '100%',
        backgroundColor: '#FFF',
      },

      '&:before': {
        content: '""',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '10px solid #FFF',
      },
    },
  },
  {
    name: 'seek-thumb',
  },
);

export default useStyles;
