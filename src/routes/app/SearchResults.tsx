import { useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { TrackObject, useAsyncEffect, useSpotify } from '../../hooks';
import { SimpleGridItem } from '../../components/atoms';
import { SimpleFlexGrid } from '../../components/molecules';
import { SearchInput } from '../../components/atoms/inputs';
import { route } from 'preact-router';

export const SearchResults = ({
  q: query,
}: {
  q: string;
}): JSXInternal.Element => {
  const [results, setResults] = useState<TrackObject[]>([]);
  const [search, setSearch] = useState<string>(query ?? '');
  const SpotifyApi = useSpotify();

  useAsyncEffect(async () => {
    route(`/search/${search}`);
    if (!search) return;
    const response = await SpotifyApi.searchTracks(search);
    setResults((prev) => response?.body?.tracks?.items || prev);
  }, [search]);

  return (
    <div class="flex w-full flex-col gap-8">
      <SearchInput value={search} setter={setSearch} />
      <SimpleFlexGrid
        as={(item) => <SimpleGridItem key={item.id} {...item} />}
        items={results}
        minHeight={52}
        wrap={true}
      />
    </div>
  );
};
