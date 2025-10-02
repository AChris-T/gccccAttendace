import $api from '@/lib/axios';

export const MediaService = {
  fetchVideos: async () => {
    const { data } = await $api('/media');
    return data;
  },
};
