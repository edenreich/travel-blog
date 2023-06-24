import Video from '@/types/Video';

export async function getAvailableTags(videos: Video[]): Promise<string[]> {
  const tags = new Set<string>();
  videos.forEach((video: Video) => {
    if (!video.tags) {
      return;
    }
    video.tags.split(', ').forEach((tag: string) => tags.add(tag));
  });

  return Array.from(tags);
};
