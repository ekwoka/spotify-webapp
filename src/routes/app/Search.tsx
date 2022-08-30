import { useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { TrackObject, useAsyncEffect } from '../../hooks';
import { SimpleGridItem } from '../../components/atoms';
import { SimpleFlexGrid } from '../../components/molecules';
import { SearchInput } from '../../components/atoms/inputs';
import { route } from 'preact-router';
import { autoRecommend } from '../../utils/spotify/autoRecommend';
import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { SpotifyApiClient, search } from '@ekwoka/spotify-api';

export const Search = ({ q: query }: { q: string }): JSXInternal.Element => {
  const [results, setResults] = useState<TrackObject[]>([]);
  const [searchQuery, setQuery] = useState<string>(query ?? '');
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');

  useAsyncEffect(async () => {
    console.log(searchQuery);
    route(`/search/${searchQuery}`);
    if (!searchQuery) {
      setResults(await autoRecommend(client));
      return;
    }
    const tracks = await client(search(searchQuery, 'track'));
    setResults(tracks.tracks.items);
  }, [searchQuery]);

  return (
    <div class="flex w-full flex-col gap-8">
      <SearchInput value={searchQuery} setter={setQuery} />
      <SimpleFlexGrid
        as={(item) => <SimpleGridItem key={item.id} {...item} />}
        items={results}
        minHeight={52}
        wrap={true}
      />
    </div>
  );
};
