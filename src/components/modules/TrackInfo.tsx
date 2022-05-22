import { PlayerState } from '../../hooks';
import { useGlobalState } from '../../hooks/useGlobalState';

export const TrackInfo = () => {
  const [state] = useGlobalState<PlayerState | null>('playerstate', null);
  return <div>{JSON.stringify(state)}</div>;
};
