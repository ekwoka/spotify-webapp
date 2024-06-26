import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { SpotifyApiClient } from '@ekwoka/spotify-api';
import { useMemo } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { useAsyncEffect, usePlayer } from '../../hooks';
import { getBestImage } from '../../utils/getBestImage';
import { radioPlay } from '../../utils/spotify/radioPlay';
import { PlayProgress } from '../atoms/PlayProgress';
import { SongLabel } from '../atoms/SongLabel';
import { Zen } from '../atoms/Zen';
import { PartyController, PlayerControls, PlayerOptions } from '../molecules';

export const PlayerBar = (): JSXInternal.Element => {
  const [_, { play }, currentState] = usePlayer();
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');
  const currentSong = useMemo(() => {
    if (!currentState) return null;
    return currentState.track_window.current_track;
  }, [currentState]);

  useAsyncEffect(async () => {
    if (!currentState) return;
    const { current_track, previous_tracks, next_tracks } =
      currentState.track_window;
    if (
      next_tracks.length !== 0 ||
      !previous_tracks.some(({ id }) => id === current_track.id)
    )
      return;
    const trackUris = await radioPlay(
      client,
      previous_tracks.map(({ id }) => id),
    );
    if (!trackUris) return;
    play(trackUris);
  }, [currentState]);

  if (!currentState || !currentSong)
    return (
      <div class="fixed inset-x-0 bottom-0 z-20 flex h-24 flex-row gap-2 bg-neutral-900 text-center text-neutral-200">
        'Connecting...'
      </div>
    );

  return (
    <div class="fixed inset-x-0 bottom-0 z-20 bg-neutral-900 text-neutral-200">
      <PlayProgress
        currentTime={currentState.position}
        duration={currentState.duration}
        isPlaying={!currentState.paused}
      />
      <div class="flex h-24 flex-row flex-nowrap items-center justify-between gap-4">
        <div class="flex flex-row gap-2">
          <img
            src={
              getBestImage(currentSong.album.images) ||
              'https://placekitten.com/640/640'
            }
            class="h-24 w-auto object-cover"
            width="1"
            height="1"
            loading="lazy"
          />
        </div>
        <PlayerControls />
        {currentSong.name ? (
          <SongLabel
            name={currentSong.name}
            artist={currentSong.artists[0]?.name ?? 'Unknown'}
            class="pb-2 text-sm"
          />
        ) : (
          <Zen />
        )}
        <PlayerOptions song={currentSong} />
      </div>
      <PartyController />
    </div>
  );
};
