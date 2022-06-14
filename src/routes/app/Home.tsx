import { useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { TrackObject, useAsyncEffect, useSpotify } from '../../hooks';
import { SimpleFlexGrid } from '../../components/molecules/SimpleFlexGrid';
import { SimpleGridItem } from '../../components/atoms/SimpleGridItem';

export const Home = (): JSXInternal.Element => {
  const [results, setResults] = useState<TrackObject[]>([]);
  const SpotifyApi = useSpotify();

  useAsyncEffect(async () => {
    const response = await SpotifyApi.getMyTopTracks({ limit: 20 });
    setResults((prev) => response?.body?.items || prev);
  }, []);

  return (
    <SimpleFlexGrid
      as={(item) => <SimpleGridItem {...item} />}
      data={results}
    />
  );
};
