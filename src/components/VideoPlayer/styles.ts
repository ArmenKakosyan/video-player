import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    container: {
      backgroundColor: '#151515',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 2,
      padding: [20, 0],
    },
    video: {
      display: 'none',
    },
    canvasContainer: {
      position: 'relative',
      aspectRatio: '9 / 16',
      '& canvas': {
        maxHeight: 600,
      },
      '&:hover $overlayButton': {
        display: 'flex',
      },
    },
    overlayButton: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      inset: 0,
      cursor: 'pointer',
      border: 'none',
    },
    iconContainer: {
      color: '#FFF',
      width: 50,
      height: 50,
      '& svg': {
        fontSize: 32,
      },
    },
  },
  {
    name: 'video-player',
  },
);

export default useStyles;
