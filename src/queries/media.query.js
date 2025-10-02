import { MediaService } from '@/services/media.service';
import { useQuery } from '@tanstack/react-query';

export const useVideos = () => {
  return useQuery({
    queryKey: ['church-videos'],
    queryFn: MediaService.fetchVideos,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
