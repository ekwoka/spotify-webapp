import { JSXInternal } from 'preact/src/jsx';
import { PlayerState, useAuth } from '../../hooks';
import { useGlobalState } from '../../hooks/useGlobalState';
import { SpotifyLogo } from '../atoms/icons/SpotifyLogo';
import { Player, TrackInfo } from '../modules';

export const TestPlayer = (): JSXInternal.Element => {
  const [state] = useGlobalState<PlayerState | null>('playerstate', null);
  const [ready, status] = useAuth();

  if (!ready) return <SpotifyLogo class="text-white" />;

  if (status === 'logged out')
    return (
      <button onClick={() => (window.location.href = `/api/login`)}>
        Login with spotify
      </button>
    );

  return <Player />;
};
