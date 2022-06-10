import { useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { TrackObject, useAsyncEffect, useSpotify } from '../../hooks';
import { ResultsItem } from '../../components/atoms';
import { ResultsGrid } from '../../components/modules';

export const Home = (): JSXInternal.Element => {
  const [results, setResults] = useState<TrackObject[]>([]);
  const SpotifyApi = useSpotify();

  useAsyncEffect(async () => {
    const response = await SpotifyApi.getMyTopTracks({ limit: 20 });
    setResults((prev) => response?.body?.items || prev);
  }, []);

  return (
    <ResultsGrid as={(item) => <ResultsItem {...item} />} data={results} />
  );
};
