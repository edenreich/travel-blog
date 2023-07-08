'use client';

import type VideoProps from '@/types/Video';
import dynamic from 'next/dynamic';
import React, { useRef, useEffect, useState, Suspense } from 'react';
import Loading from './Loading';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const Video: React.FC<VideoProps> = ({ url, title, date, excerpt }) => {
  const videoWrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const videoRef = useRef<typeof ReactPlayer>() as React.MutableRefObject<typeof ReactPlayer>;
  const [isVisible, setIsVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    observer.observe(videoWrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    updateScreenWidth();

    window.addEventListener('resize', updateScreenWidth);

    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  return (
    <div ref={videoWrapperRef} className="bg-white rounded-lg shadow-lg md:p-2 lg:p-4 mt-4">
      <Suspense fallback={<Loading />}>
        <div className="video-container">
          <ReactPlayer
            playing={isVisible && screenWidth < 768}
            ref={videoRef}
            url={url}
            title={title}
            className="w-full"
            controls={true}
            width="100%"
            height="100vh"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">{date}</p>
          <p className="text-gray-700 text-base">{excerpt}</p>
        </div>
      </Suspense>
    </div>
  );
};

export default Video;
