import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import {
  removeTracks,
  SpotifyApiClient,
  trackIsSaved,
  saveTracks,
} from '@ekwoka/spotify-api';
import { useSignal } from '@preact/signals';
import { HeartSolid } from 'preact-heroicons';
import { useAsyncEffect } from '../../hooks';
import { classNames } from '../../utils';

export const HeartSong = ({ id }: { id: string }) => {
  const isLiked = useSignal(false);
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');
  useAsyncEffect(async () => {
    if (!id) return;
    isLiked.value = await client(trackIsSaved(id));
  }, [id]);
  const toggleHeart = () => {
    isLiked.value = ((prev) => {
      if (!id) return prev;
      if (prev) client(removeTracks(id));
      else client(saveTracks(id));
      return !prev;
    })(isLiked.value);
  };
  return (
    <button type="button" onClick={toggleHeart} disabled={!id}>
      <HeartSolid
        class={classNames(
          'h-6 w-6 flex-none transition-colors',
          isLiked.value
            ? 'animate-like text-rose-600'
            : 'stroke-white text-transparent'
        )}
      />
    </button>
  );
};
