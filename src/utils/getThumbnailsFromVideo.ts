const getThumbnailsFromVideo = async (videoUrl: string, thumbnailCount: number = 10) => {
  const videoElem = document.createElement('video');
  videoElem.src = videoUrl;
  videoElem.load();

  let resolvePromise: ((value: unknown) => void) | null = null;
  let rejectPromise: ((reason?: string) => void) | null = null;

  videoElem.onloadedmetadata = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const duration = videoElem.duration;
    const interval = Math.floor(duration / thumbnailCount);

    const thumbnails = [];

    for (let i = 0; i <= duration; i += interval) {
      videoElem.currentTime = i;
      await new Promise(resolve => (videoElem.onseeked = resolve));

      canvas.width = videoElem.videoWidth / 4;
      canvas.height = videoElem.videoHeight / 4;
      ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);

      const imgElement = new Image();
      imgElement.src = canvas.toDataURL('image/jpg');
      thumbnails.push(imgElement.src);
    }

    resolvePromise?.({ thumbnails, duration: videoElem.duration });
  };

  videoElem.onerror = e => {
    rejectPromise?.(e as string);
  };

  return new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });
};

export default getThumbnailsFromVideo;
