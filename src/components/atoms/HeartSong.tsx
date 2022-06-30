import { HeartIcon } from '@heroicons/react/solid';
import { useState } from 'preact/hooks';
import { useAsyncEffect, useSpotify } from '../../hooks';
import { classNames } from '../../utils';
import { getLiked } from '../../utils/spotify';

export const HeartSong = ({ id }: { id: string }) => {
  const Spotify = useSpotify();
  const [isLiked, setIsLiked] = useState(false);
  useAsyncEffect(async () => {
    if (!id) return;
    setIsLiked(await getLiked(id));
  }, [id]);
  const toggleHeart = () => {
    setIsLiked((prev) => {
      if (!id) return prev;
      if (prev) Spotify.removeFromMySavedTracks([id]);
      else Spotify.addToMySavedTracks([id]);
      return !prev;
    });
  };
  return (
    <button type="button" onClick={toggleHeart} disabled={!id}>
      <HeartIcon
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
