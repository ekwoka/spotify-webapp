import { JSXInternal } from 'preact/src/jsx';
import { TrackObject, useAsyncMemo, usePlayer, useSpotify } from '../../hooks';
import { getBestImage } from '../../utils/getBestImage';
import { SongLabel } from './SongLabel';

export const SimpleGridItem = ({
  name,
  artists,
  album,
  uri,
}: TrackObject): JSXInternal.Element => {
  const SpotifyApi = useSpotify();
  const { play } = usePlayer()[1];

  const artist = useAsyncMemo<{ [key: string]: any } | null>(
    async () => (await SpotifyApi.getArtist(artists[0].id)).body,
    null,
    []
  );

  return (
    <li
      class="flex w-52 shrink-0 grow cursor-pointer snap-start flex-col gap-4"
      onClick={() => play(uri)}>
      <img
        class="h-auto w-full rounded-lg"
        src={getBestImage(album.images) ?? 'https://placekitten.com/600/600'}
        loading="lazy"
        width={album.images[0]?.width ?? 1}
        height={album.images[0]?.height ?? 1}
        alt={album.name}
      />
      <button
        type="button"
        class="flex w-full flex-row items-center gap-2 text-left">
        <img
          class="h-6 w-6 rounded-full"
          src={artist?.images[0]?.url ?? 'https://placekitten.com/100/100'}
          loading="lazy"
          width={artist?.images[0]?.width ?? 1}
          height={artist?.images[0]?.height ?? 1}
          alt={artist?.name ?? ''}
        />
        <SongLabel name={name} artist={artists[0].name} class="text-xs" />
      </button>
    </li>
  );
};
