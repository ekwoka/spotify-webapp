import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { SpotifyApiClient, getUsersPlaylists } from '@ekwoka/spotify-api';
import { useQuery } from '@tanstack/react-query';
import { JSXInternal } from 'preact/src/jsx';
import { SimpleFlexGrid } from '../../components/molecules';
import { usePlayer } from '../../hooks';

export const Playlists = (): JSXInternal.Element => {
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');
  const { data: playlists } = useQuery(
    ['userPlaylists'],
    async () => {
      const response = await client(getUsersPlaylists());
      return response.items.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
    {
      keepPreviousData: true,
      initialData: [],
      staleTime: 1000 * 60 * 15,
      initialDataUpdatedAt: 0,
    },
  );
  return <SimpleFlexGrid items={playlists} as={PlaylistItem} wrap={true} />;
};

export const PlaylistItem = ({
  name,
  images,
  uri,
}: {
  name: string;
  images: { url: string }[];
  uri: string;
}): JSXInternal.Element => {
  const { play } = usePlayer()[1];
  return (
    <li
      class="flex shrink-0 grow cursor-pointer flex-col gap-4"
      onClick={() => play(uri)}>
      <img
        class="h-auto w-full rounded-lg"
        src={images[0]?.url ?? 'https://placekitten.com/600/600'}
        loading="lazy"
        width={1}
        height={1}
        alt={name}
      />
    </li>
  );
};
