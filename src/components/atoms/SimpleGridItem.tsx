import { ChevronRightIcon } from '@heroicons/react/solid';
import { useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { TrackObject, useAsyncEffect, useSpotify } from '../../hooks';

export const SimpleGridItem = ({
  name,
  artists,
  album,
}: TrackObject): JSXInternal.Element => {
  const [artist, setArtist] = useState<{ [key: string]: any } | null>(null);
  const SpotifyApi = useSpotify();

  useAsyncEffect(async () => {
    const response = await SpotifyApi.getArtist(artists[0].id);
    setArtist((prev) => response?.body || prev);
  }, []);

  return (
    <li class="flex w-48 shrink-0 flex-col gap-4">
      <img
        class="h-auto w-full rounded-lg"
        src={album.images[0].url}
        loading="lazy"
        width={album.images[0].width}
        height={album.images[0].height}
        alt={album.name}
      />
      <button type="button" class="flex w-full flex-row items-center gap-2">
        {artist && (
          <img
            class="h-6 w-6 rounded-full"
            src={artist.images[0].url}
            loading="lazy"
            width={artist.images[0].width}
            height={artist.images[0].height}
            alt={artist.name}
          />
        )}
        <span class=" text-left text-xs line-clamp-1">
          {name} <ChevronRightIcon class="inline h-3 w-3" /> {artists[0].name}
        </span>
      </button>
    </li>
  );
};
