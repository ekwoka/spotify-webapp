import { useGlobalState } from '@ekwoka/preact-global-state';
import { useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { TrackObject, useAsyncEffect, useSpotify } from '../../hooks';
import { ResultsItem } from '../atoms';
import { ResultsGrid } from '../modules';

export const SearchResults = (props: { q: string }): JSXInternal.Element => {
  const [query] = useGlobalState<string>('searchString', props.q || '');
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
