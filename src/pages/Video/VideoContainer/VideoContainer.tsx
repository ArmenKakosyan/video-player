import { useRef } from 'react';
import Captions from '../../../components/Captions/Captions';
import Timeline from '../../../components/Timeline/Timeline';
import VideoPlayerContainer from '../../../components/VideoPlayer/VideoPlayer';
import useStyles from './styles';

const VideoContainer = () => {
  const classes = useStyles();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={classes.container}>
      <div className={classes.captionsAndPlayerContainer}>
        <Captions />
        <VideoPlayerContainer videoRef={videoRef} />
      </div>
      <Timeline videoRef={videoRef} />
    </div>
  );
};

export default VideoContainer;
