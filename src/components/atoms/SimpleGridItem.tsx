import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { getArtist, SpotifyApiClient } from '@ekwoka/spotify-api';
import { Track } from '@ekwoka/spotify-api/dist/endpoints';
import { useQuery } from '@tanstack/react-query';
import { JSXInternal } from 'preact/src/jsx';
import { usePlayer } from '../../hooks';
import { classNames } from '../../utils';
import { getBestImage } from '../../utils/getBestImage';
import { SongLabel } from './SongLabel';

export const SimpleGridItem = ({
  name,
  artists,
  album,
  uri,
  class: className,
}: Track & { class?: string }): JSXInternal.Element => {
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');
  const [_, { play }] = usePlayer();

  const { data: artist } = useQuery(
    ['artist', artists[0].id],
    async () => await client(getArtist(artists[0].id)),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 15,
    }
  );

  return (
    <li
      class={classNames(
        'flex shrink-0 grow cursor-pointer snap-start flex-col gap-4',
        className
      )}
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
