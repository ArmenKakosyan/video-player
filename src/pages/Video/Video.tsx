import { useEffect, useRef } from 'react';
import Header from '../../components/Header/Header';
import useVideoDataStore from '../../store/videoData';
import useStyles from './styles';
import VideoContainer from './VideoContainer/VideoContainer';

const VideoPlayer = () => {
  const classes = useStyles();
  const isRequestSentRef = useRef(false);

  const isLoading = useVideoDataStore(state => state.isLoading);
  const fetchVideoData = useVideoDataStore(state => state.fetchVideoData);

  useEffect(() => {
    if (isRequestSentRef.current) return;

    isRequestSentRef.current = true;
    fetchVideoData();
  }, [fetchVideoData]);

  return (
    <div className={classes.container}>
      <Header />
      {isLoading ? <div>Loading...</div> : <VideoContainer />}
    </div>
  );
};

export default VideoPlayer;
