import { useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { TrackObject, useAsyncEffect, useSpotify } from '../../hooks';
import { ResultsItem } from '../../components/atoms';
import { ResultsGrid } from '../../components/molecules';

export const SearchResults = ({
  q: query,
}: {
  q: string;
}): JSXInternal.Element => {
  const [results, setResults] = useState<TrackObject[]>([]);
  const SpotifyApi = useSpotify();

  useAsyncEffect(async () => {
    if (!query) return;
    const response = await SpotifyApi.searchTracks(query);
    setResults((prev) => response?.body?.tracks?.items || prev);
  }, [query]);

  return (
    <ResultsGrid as={(item) => <ResultsItem {...item} />} data={results} />
  );
};