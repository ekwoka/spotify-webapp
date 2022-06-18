import { useMemo } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { usePlayer } from '../../hooks';
import { PlayProgress } from '../atoms/PlayProgress';
import { RespImage } from '../atoms/RespImage';
import { SongLabel } from '../atoms/SongLabel';
import { PlayerControls } from '../molecules/PlayerControls';
import { PlayerOptions } from '../molecules/PlayerOptions';

export const PlayerBar = (): JSXInternal.Element => {
  const currentState = usePlayer()[2];
  const currentSong = useMemo(() => {
    if (!currentState) return null;
    return currentState.track_window.current_track;
  }, [currentState]);

  if (!currentState || !currentSong)
    return (
      <div class="fixed inset-x-0 bottom-0 z-20 flex h-24 flex-row gap-2 bg-neutral-900 text-center text-neutral-200">
        'Connecting...'
      </div>
    );

  return (
    <div class="fixed inset-x-0 bottom-0 z-20 h-24 bg-neutral-900 text-neutral-200">
      <PlayProgress
        currentTime={currentState.position}
        duration={currentState.duration}
        isPlaying={!currentState.paused}
      />
      <div class="flex h-full flex-row flex-nowrap items-center justify-between gap-4">
        <div class="flex flex-row gap-2">
          <RespImage
            src={
              currentSong.album.images[0]?.url ??
              'https://placekitten.com/640/640'
            }
            maxWidth={currentSong.album.images[0]?.width}
            sizes={`${24 / 4}rem`}
            class="h-24 w-auto object-cover"
            width="1"
            height="1"
            loading="lazy"
          />
        </div>
        <PlayerControls />
        <SongLabel
          name={currentSong.name}
          artist={currentSong.artists[0]?.name ?? 'None'}
          class="flex-none pb-2 text-sm"
        />
        <PlayerOptions />
      </div>
    </div>
  );
};
