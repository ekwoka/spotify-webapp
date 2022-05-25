import { PauseIcon, PlayIcon } from '@heroicons/react/solid';
import { useMemo } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { usePlayer } from '../../hooks';

export const PlayerBar = (): JSXInternal.Element => {
  const [player, { play, pause, next, previous }, currentState] = usePlayer();
  const currentSong = useMemo(() => {
    console.log(currentState);
    if (!currentState) return null;
    return currentState.track_window.current_track;
  }, [currentState]);

  if (!currentSong)
    return (
      <div
        class="fixed inset-x-0 bottom-0 text-white"
        onClick={() => play(TEST_URIS)}>
        No song playing
      </div>
    );

  return (
    <div class="fixed inset-x-0 bottom-0 flex h-24 flex-row gap-2 bg-gray-900 text-white">
      <img
        src={currentSong.album.images[0].url}
        class="h-24 w-auto"
        loading="lazy"
      />
      <div class="grow-1 flex flex-col">
        <div>Song: {currentSong.name}</div>
        <div>Artist: {currentSong.artists[0].name}</div>
        <div>Album: {currentSong.album.name}</div>
      </div>
      <div class="flex flex-row">
        <button
          onClick={() => {
            if (!currentState) return play(TEST_URIS);
            if (currentState.paused) play();
            else pause();
          }}>
          {currentState?.paused ? (
            <>
              <span class="sr-only">Play Current Track</span>
              <PlayIcon class="h-5 w-5" />
            </>
          ) : (
            <>
              <span class="sr-only">Pause Current Track</span>
              <PauseIcon class="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const TEST_URIS: string[] = [
  'spotify:track:4b9LMCUaw55QajVRfrfPyS',
  'spotify:track:2zCXNCWa1RMIHfv0435jhT',
  'spotify:track:03UrZgTINDqvnUMbbIMhql',
];
