import CaptionsMetaData from '../../../types/captionMetaData';
import { ASPECT_RATIO, FONT, BOX_PADDING_X, BOTTOM, BOX_COLOR, BOX_HEIGHT, BOX_BORDER_RADIUS, TEXT_COLOR, TEXT_ALIGN, TEXT_BASELINE } from '../constants/drawing';

export const drawCorrectSizeImage = (video: HTMLVideoElement, canvas: HTMLCanvasElement, captions: CaptionsMetaData[] | null) => {
  const ctx = canvas?.getContext('2d');
  if (!video || !canvas || !ctx) return;

  const videoAspectRatio = video.videoWidth / video.videoHeight;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  let sx, sy, sWidth, sHeight;

  if (videoAspectRatio > ASPECT_RATIO) {
    sHeight = video.videoHeight;
    sWidth = sHeight * ASPECT_RATIO;
    sx = (video.videoWidth - sWidth) / 2;
    sy = 0;
  } else {
    sWidth = video.videoWidth;
    sHeight = sWidth / ASPECT_RATIO;
    sx = 0;
    sy = (video.videoHeight - sHeight) / 2;
  }

  ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);

  if (!captions) return;

  const text = captions.map(caption => caption.word).join(' ');

  ctx.font = FONT;
  const textWidth = ctx.measureText(text).width;
  const containerWidth = textWidth + BOX_PADDING_X * 2;

  const containerX = (canvasWidth - containerWidth) / 2;
  const containerY = canvasHeight - BOTTOM;

  ctx.beginPath();
  ctx.fillStyle = BOX_COLOR;
  ctx.roundRect(containerX, containerY, containerWidth, BOX_HEIGHT, BOX_BORDER_RADIUS);
  ctx.fill();
  ctx.textAlign = TEXT_ALIGN;
  ctx.textBaseline = TEXT_BASELINE;
  let x = canvasWidth / 2;

  captions.forEach(caption => {
    const { color, word, removed } = caption;
    if (!removed) {
      ctx.fillStyle = (color as string) === BOX_COLOR ? TEXT_COLOR : color;
      ctx.fillText(word, x - textWidth / 2 + 15, canvasHeight - BOTTOM + BOX_HEIGHT / 2);
      const wordWidth = ctx.measureText(word + ' ').width;
      x += wordWidth;
    }
  });
};

export const drawFrame = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
  if (video.readyState >= 2) {
    const canvasHeight = 720;
    const canvasWidth = Math.floor(canvasHeight * ASPECT_RATIO);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    video.currentTime = 0;
  }
};
