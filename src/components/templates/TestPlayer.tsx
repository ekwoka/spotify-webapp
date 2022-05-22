import { useRef } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { PlayerState, useStorage } from '../../hooks';
import { useGlobalState } from '../../hooks/useGlobalState';
import { SpotifyLogo } from '../atoms/icons/SpotifyLogo';
import { lazyLoad } from '../organisms';

export const TestPlayer = (): JSXInternal.Element => {
  const [token, setToken] = useStorage<string>('token', '');
  const [state] = useGlobalState<PlayerState | null>('playerstate', null);
  const string = useRef<string>(token);

  if (!token)
    return (
      <div class="flex h-full w-full flex-col items-center justify-center p-8">
        <div class="mx-auto flex w-full max-w-screen-md flex-col items-center justify-center gap-y-2 rounded-xl bg-gray-700 p-8 text-gray-50 shadow-xl">
          <h2 class="text-center text-2xl text-green-200">
            Please login to view this content.
          </h2>
          <a
            href="https://accounts.spotify.com/en/authorize?response_type=token&client_id=adaaf209fb064dfab873a71817029e0d&redirect_uri=https%3A%2F%2Fdeveloper.spotify.com%2Fdocumentation%2Fweb-playback-sdk%2Fquick-start%2F&scope=streaming+user-read-email+user-modify-playback-state+user-read-private&show_dialog=true"
            target="_blank"
            rel="noreferrer"
            class="flex w-max flex-col items-center justify-center rounded-full bg-green-500 px-8 py-2 text-black">
            <span class="text-center">Get Token From</span>
            <SpotifyLogo class="h-12" />
          </a>
          <label class="flex flex-col">
            <span>Token:</span>
            <input
              class="bg-gray-900"
              type="text"
              value={string.current}
              onChange={(e) => (string.current = e.currentTarget.value)}
            />
          </label>
          <button type="button" onClick={() => setToken(string.current)}>
            Submit Token
          </button>
        </div>
      </div>
    );

  const LazyPlayer = lazyLoad(() =>
    import('../modules/Player').then((exp) => exp.Player)
  );
  const LazyTrackInfo = lazyLoad(() =>
    import('../modules/TrackInfo').then((exp) => exp.TrackInfo)
  );

  return (
    <>
      <LazyPlayer />;{state && <LazyTrackInfo />}
    </>
  );
};
