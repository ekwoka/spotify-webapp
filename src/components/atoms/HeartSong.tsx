import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import {
  removeTracks,
  SpotifyApiClient,
  trackIsSaved,
  saveTracks,
} from '@ekwoka/spotify-api';
import { HeartSolid } from '@graywolfai/react-heroicons/dist/solid/heart-solid';
import { useState } from 'preact/hooks';
import { useAsyncEffect } from '../../hooks';
import { classNames } from '../../utils';

export const HeartSong = ({ id }: { id: string }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');
  useAsyncEffect(async () => {
    if (!id) return;
    setIsLiked(await client(trackIsSaved(id)));
  }, [id]);
  const toggleHeart = () => {
    setIsLiked((prev) => {
      if (!id) return prev;
      if (prev) client(removeTracks(id));
      else client(saveTracks(id));
      return !prev;
    });
  };
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
