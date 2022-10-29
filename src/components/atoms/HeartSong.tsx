import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import {
  removeTracks,
  SpotifyApiClient,
  trackIsSaved,
  saveTracks,
} from '@ekwoka/spotify-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HeartSolid } from 'preact-heroicons';
import { classNames } from '../../utils';

export const HeartSong = ({ id }: { id: string }) => {
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');
  const queryClient = useQueryClient();
  const { data: isLiked } = useQuery(
    ['isLiked', id],
    () => {
      if (!id) return false;
      return client(trackIsSaved(id));
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 15,
      initialData: false,
      initialDataUpdatedAt: 0,
    }
  );
  const mutateIsLiked = useMutation(
    async (isLiked: boolean) =>
      await client((isLiked ? saveTracks : removeTracks)(id)),

    {
      onSuccess: (newState) =>
        queryClient.setQueryData(['isLiked', id], newState),
    }
  );
  const toggleHeart = () => mutateIsLiked.mutate(!isLiked);
  return (
    <button type="button" onClick={toggleHeart} disabled={!id}>
      <HeartSolid
        class={classNames(
          'h-6 w-6 flex-none transition-colors',
          isLiked
            ? 'animate-like text-rose-600'
            : 'stroke-white text-transparent'
        )}
      />
    </button>
  );
};
