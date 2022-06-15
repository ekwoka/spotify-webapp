import { FastForwardIcon, PauseIcon, PlayIcon } from '@heroicons/react/solid';
import { useMemo } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { usePlayer } from '../../hooks';
import { PlayProgress } from '../atoms/PlayProgress';

export const PlayerBar = (): JSXInternal.Element => {
  const [player, { play, pause, next, previous }, currentState] = usePlayer();
  const currentSong = useMemo(() => {
    if (!currentState) return null;
    return currentState.track_window.current_track;
  }, [currentState]);

  if (!currentState || !currentSong)
    return (
      <div
        class="fixed inset-x-0 bottom-0 z-20 flex h-24 flex-row gap-2 bg-gray-900 text-white"
        onClick={() => play(TEST_URIS)}>
        {player ? 'No Songs' : 'Connecting...'}
      </div>
    );

  return (
    <div class="fixed inset-x-0 bottom-0 h-24 bg-gray-900 text-white">
      <PlayProgress
        currentTime={currentState.position}
        duration={currentState.duration}
        isPlaying={!currentState.paused}
      />
      <div className="grid h-full grid-cols-2 gap-2">
        <div class="flex flex-row gap-2">
          <img
            src={
              currentSong.album.images[0]?.url ??
              'https://placekitten.com/640/640'
            }
            class="h-24 w-auto object-cover"
            width="1"
            height="1"
            loading="lazy"
          />
        </div>
        <div class="flex w-full flex-row items-center justify-center pb-2">
          <button onClick={() => previous()} class="block">
            <FastForwardIcon class="h-12 w-12 rotate-180" />
          </button>
          <button
            onClick={() => {
              if (!currentState) return play(TEST_URIS);
              if (currentState.paused) play();
              else pause();
            }}>
            {currentState?.paused ? (
              <>
                <span class="sr-only">Play Current Track</span>
                <PlayIcon class="h-12 w-12" />
              </>
            ) : (
              <>
                <span class="sr-only">Pause Current Track</span>
                <PauseIcon class="h-12 w-12" />
              </>
            )}
          </button>
          <button onClick={() => next()} class="block">
            <FastForwardIcon class="h-12 w-12" />
          </button>
        </div>
        <SongLabel
          name={currentSong.name}
          artist={currentSong.artists[0]?.name ?? 'None'}
          class="flex-none pb-2 text-sm"
        />
      </div>
    </div>
  );
};

const TEST_URIS: string[] = [
  'spotify:track:4b9LMCUaw55QajVRfrfPyS',
  'spotify:track:2zCXNCWa1RMIHfv0435jhT',
  'spotify:track:03UrZgTINDqvnUMbbIMhql',
];
