import type VideoProps from '@/types/Video';
import dynamic from 'next/dynamic';
import type YoutubeProps from 'react-youtube';

const YouTube = dynamic<React.ComponentProps<typeof YoutubeProps>>(() => import('react-youtube').then(mod => mod.default), { ssr: false, loading: () => <p>Loading...</p> });

const Video: React.FC<VideoProps> = ({ id, title, date, excerpt }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="video-container">
        <YouTube
          videoId={id}
          id={id}
          title={title}
          className={'w-full'}
          iframeClassName={'w-full'}
          loading={'lazy'}
          opts={{
            width: '100%',
            height: '390px',
            playerVars: {
              rel: 0,
              autoplay: 0,
            },
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{date}</p>
        <p className="text-gray-700 text-base">{excerpt}</p>
      </div>
    </div>
  );
};

export default Video;
