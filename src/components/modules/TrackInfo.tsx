import { PlayerState } from '../../hooks';
import { useGlobalState } from '@ekwoka/preact-global-state';

export const TrackInfo = () => {
  const [state] = useGlobalState<PlayerState | null>('playerstate', null);
  return <div>{JSON.stringify(state)}</div>;
};
