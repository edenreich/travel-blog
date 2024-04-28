import React, { useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import { getAvailableTags } from '@/utils/getAvailableTags';
import TagList from '@/components/TagList';
import Head from 'next/head';
import type VideoProps from '@/types/Video';
import fs from 'fs';
import { format } from 'date-fns';
import Loading from '@/components/Loading';

const Video = React.lazy(() => import('@/components/Video'));

interface HomeProps {
  videos: VideoProps[]
  tags: string[]
}

const filterVideosBySelectedTags = (
  videos: VideoProps[],
  selectedTags: string[]
) => {
  if (selectedTags.length === 0) {
    return videos;
  }

  return videos.filter((video: VideoProps) => {
    return selectedTags.some((selectedTag) =>
      video?.tags?.includes(selectedTag)
    );
  });
};

const sortByDate = (video: VideoProps[]) => {
  return video.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime();
  });
};

const Home: React.FC<HomeProps> = ({ videos, tags }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
  };

  const filteredVideos = useMemo(
    () => filterVideosBySelectedTags(videos, selectedTags),
    [videos, selectedTags]
  );
  const sortedVideos = useMemo(
    () => sortByDate(filteredVideos),
    [filteredVideos]
  );

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
          <TagList
            tags={tags}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
          />
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <React.Suspense fallback={<Loading />}>
            {sortedVideos.map((video) => (
              <React.Fragment key={video.title}>
                <Video
                  url={video.url}
                  title={video.title}
                  date={format(new Date(video.date), 'MMMM dd, yyyy')}
                  excerpt={video.excerpt}
                />
              </React.Fragment>
            ))}
          </React.Suspense>
        </div>
      </section>
    </>
  );
};

async function fetchVideos(): Promise<VideoProps[]> {
  const youtubeVideos = JSON.parse(
    fs.readFileSync('videos/youtube.json', { encoding: 'utf-8' })
  ) as unknown as VideoProps[];
  return youtubeVideos;
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
