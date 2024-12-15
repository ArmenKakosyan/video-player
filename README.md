# React Video Timeline Application

## Prerequisites

- Node.js (recommended version 18+)
- npm (Node Package Manager)

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd <video-player>
```

2. Install Dependencies

```bash
npm i
```

## Development

To run the project in development mode:

```bash
npm run dev
```

## Production Build

To create a production build:

```bash
npm run build
```

## Video Thumbnail Troubleshooting

If you encounter issues creating video thumbnails from URL:

1. Download a video file
2. Rename the video to `video.mp4` (or appropriate extension)
3. Place the video in the `src/video` folder
4. Open `Timeline.tsx`
5. Delete line 23
6. Uncomment line 3 and update with the correct video filename

### Example:

If your video is `sample.mp4`, modify line 3 to:

```typescript
import videoFile from './video/sample.mp4';
```

## Potential Thumbnail Generation Issues

- Some URLs may be blocked by CORS policy
- Video hosting platforms might prevent direct thumbnail extraction
- Ensure video files are locally accessible for reliable thumbnail generation

## Troubleshooting

- Check network requests in browser developer tools
- Verify video file permissions and path
- Ensure video codec compatibility
