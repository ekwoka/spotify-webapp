import { JSXInternal } from 'preact/src/jsx';
import { useAuth } from '../../hooks';
import { SpotifyLogo } from '../atoms/icons/SpotifyLogo';
import { Main } from './MainApp';

export const TestPlayer = (): JSXInternal.Element => {
  const [ready, status] = useAuth();

  if (!ready) return <SpotifyLogo class="text-white" />;

  if (status === 'logged out')
    return (
      <button onClick={() => (window.location.href = `/api/login`)}>
        Login with spotify
      </button>
    );

  return <Main />;
};
