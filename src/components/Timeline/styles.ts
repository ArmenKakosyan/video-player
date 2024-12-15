import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    container: {
      height: 150,
      width: '100%',
      display: 'flex',
      padding: [8, 0],
    },
    video: {
      display: 'none',
    },
    thumbnailWrapper: {
      border: '2px solid #ccc',
      borderRadius: 16,
      position: 'relative',
    },
    seekThumb: {
      position: 'absolute',
      width: 1,
      height: '100%',
      backgroundColor: '#FFF',
    },
    thumbnailsContainer: {
      height: '100%',
      overflow: 'hidden',
      borderRadius: 16,
    },
    thumbnails: {
      display: 'flex',
      overflowX: 'auto',
      height: '100%',
      maxWidth: 'calc(100vw - 40px)',
    },
  },
  { name: 'video-timeline' },
);

export default useStyles;
