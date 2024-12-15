import Caption from './caption';

type Video = {
  videoUrl: string;
  startTime: number;
  endTime: number;
  captions: Caption[];
};

export default Video;
