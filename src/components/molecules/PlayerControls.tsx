import { FastForwardIcon, PauseIcon, PlayIcon } from '@heroicons/react/solid';
import { JSXInternal } from 'preact/src/jsx';
import { usePlayer } from '../../hooks';

export const PlayerControls = (): JSXInternal.Element => {
  const [_, { play, pause, next, previous }, currentState] = usePlayer();

  return (
    <div class="flex flex-row items-center justify-center px-8 pb-2">
      <button onClick={() => previous()} class="block disabled:text-gray-400"
        disabled={!!currentState}>
        <FastForwardIcon class="h-8 w-8 rotate-180" />
      </button>
      <button
        class="text-lime-500 disabled:text-gray-400"
        disabled={!!currentState}
        onClick={() => {
          if (!currentState) return;
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
      <button onClick={() => next()} class="block disabled:text-gray-400"
        disabled={!!currentState}>
        <FastForwardIcon class="h-8 w-8" />
      </button>
    </div>
  );
};
