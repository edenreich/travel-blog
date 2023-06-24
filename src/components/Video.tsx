import type VideoProps from '@/types/Video';

const Video: React.FC<VideoProps> = ({ title, date, excerpt, url }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="video-container">
        <iframe
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{date}</p>
        <p className="text-gray-700 text-base">{excerpt}</p>
      </div>

      <style jsx>{`
        .video-container {
          position: relative;
          overflow: hidden;
          padding-top: 56.25%; /* 16:9 aspect ratio (for a 560x315 video player) */
        }

        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Video;
