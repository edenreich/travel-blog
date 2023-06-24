import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { getAvailableTags } from '@/utils/getAvailableTags';
import TagList from '@/components/TagList';
import Head from 'next/head';
import Video from '@/components/Video';
import type VideoProps from '@/types/Video';
import fs from 'fs';
import { format } from 'date-fns';

interface HomeProps {
  videos: VideoProps[];
  tags: string[];
}

const Home: React.FC<HomeProps> = ({ videos, tags }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
  };

  const filterVideosBySelectedTags = (videos: VideoProps[]) => {
    if (selectedTags.length === 0) {
      return videos;
    }

    return videos.filter((video: VideoProps) => {
      return selectedTags.some((selectedTag) => video?.tags?.includes(selectedTag));
    });
  };

  const sortByDate = (video: VideoProps[]) => {
    return video.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB.getTime() - dateA.getTime();
    });
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Home | Travel Blog</title>
        <meta property="og:title" content="Home | Travel Blog" />
      </Head>
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-8">Travel Blog</h1>
        <p className="text-xl mt-4 text-center">
          This is a blog about my travels around the world.
        </p>
        <div className="container">
          <TagList tags={tags} selectedTags={selectedTags} onTagClick={handleTagClick} />
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortByDate(filterVideosBySelectedTags(videos)).map((video) => (
            <React.Fragment key={video.title}>
              <Video
                id={video.id}
                title={video.title}
                date={format(new Date(video.date), 'MMMM dd, yyyy')}
                excerpt={video.excerpt}
              />
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  );
};

async function fetchVideos(): Promise<VideoProps[]> {
  return JSON.parse(fs.readFileSync('videos/youtube.json', { encoding: 'utf-8' })) as unknown as VideoProps[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const videos = await fetchVideos();
  const tags = await getAvailableTags(videos);

  return {
    props: {
      videos,
      tags,
    },
  };
};

export default Home;
