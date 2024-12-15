import useStyles from './styles';
import Caption from './Caption/Caption.tsx';
import useVideoDataStore from '../../store/videoData.ts';

const Captions = () => {
  const classes = useStyles();
  const captions = useVideoDataStore(state => state.captions)!;

  return (
    <div className={classes.container}>
      <p className={classes.title}>Captions</p>
      <div className={classes.captions}>
        {captions.map(caption => (
          <Caption key={caption.id} caption={caption} />
        ))}
      </div>
    </div>
  );
};

export default Captions;
