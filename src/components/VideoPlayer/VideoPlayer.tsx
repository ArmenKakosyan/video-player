import { useCallback, useEffect, useRef, useState } from 'react';
import useStyles from './styles';
import useVideoDataStore from '../../store/videoData.ts';
import usePlayerStore from '../../store/playerStore.ts';
import { FaPause, FaPlay } from 'react-icons/fa';
import { drawFrame, drawCorrectSizeImage } from './utils/drawing.ts';
import useRelevantCaptionSelector from '../../store/selectors/useRelevantCaptionSelector.ts';

interface VideoPlayerContainerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoPlayerContainer = ({ videoRef }: VideoPlayerContainerProps) => {
  const classes = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const { videoUrl } = useVideoDataStore(state => state.data)!;

  const setCurrentTime = usePlayerStore(state => state.setCurrentTime);
  const relevantCaptions = useRelevantCaptionSelector();
  const relevantCaptionsRef = useRef(relevantCaptions);

  useEffect(() => {
    relevantCaptionsRef.current = relevantCaptions;
  }, [relevantCaptions]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!video || !canvas || !ctx) return;

    const ladedDataCallback = () => {
      drawFrame(video, canvas);
    };

    const seekedCallback = () => {
      drawCorrectSizeImage(video, canvas, relevantCaptionsRef.current);
    };

    if (video) {
      video.addEventListener('loadeddata', ladedDataCallback);
      video.addEventListener('seeked', seekedCallback);

      return () => {
        video.pause();
        video.removeEventListener('loadeddata', ladedDataCallback);
        video.removeEventListener('seeked', seekedCallback);
      };
    }
  }, [videoRef]);

  const updateFrame = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      drawCorrectSizeImage(videoRef.current, canvasRef.current, relevantCaptionsRef.current);

      if (!videoRef.current.paused) {
        animationFrameId.current = requestAnimationFrame(updateFrame);
      }
    }
  }, [setCurrentTime, videoRef]);

  const handleContainerClick = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!video || !canvas || !ctx) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      animationFrameId.current = requestAnimationFrame(updateFrame);
    } else {
      video.pause();
      setIsPlaying(false);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
  }, [updateFrame, videoRef]);

  useEffect(
    () => () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    },
    [],
  );

  return (
    <div className={classes.container}>
      <video ref={videoRef} className={classes.video} src={videoUrl} />
      <div className={classes.canvasContainer}>
        <canvas ref={canvasRef} />
        <button className={classes.overlayButton} type="button" title={isPlaying ? 'pause' : 'play'} onClick={handleContainerClick}>
          <div className={classes.iconContainer}>{isPlaying ? <FaPause /> : <FaPlay />}</div>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayerContainer;
