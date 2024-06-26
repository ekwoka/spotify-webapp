import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { SpotifyApiClient, getPlaylistItems } from '@ekwoka/spotify-api';
import { useQuery } from '@tanstack/react-query';
import { JSXInternal } from 'preact/src/jsx';
import { SimpleListSong } from '../../components/atoms/SimpleListSong';
import { useAutoAnimate, usePlayer } from '../../hooks';
import { getBestImage, SpotifyImageArray } from '../../utils/getBestImage';

export const Playing = (): JSXInternal.Element => {
  const [_, { play }, state] = usePlayer();
  const animateCurrent = useAutoAnimate<HTMLDivElement>();
  const animateUpcoming = useAutoAnimate<HTMLDivElement>();
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');
  const { data: currentPlaylist } = useQuery(
    ['currentPlaylist', state?.context.uri ?? 'none'],
    async () => {
      if (!state?.context.uri) return [];
      const playlistId = (state.context.uri as string).split(':playlist:')[1];
      const playlist = await client(
        getPlaylistItems(playlistId, { limit: Infinity }),
      );
      return playlist.items.map((item) => item.track);
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 15,
    },
  );
  const currentIndex = (currentPlaylist ?? []).findIndex(
    (track) => track?.id === state?.track_window.current_track.id,
  );
  const nextTracks =
    currentIndex >= 0 ? currentPlaylist?.slice(currentIndex + 1) ?? [] : [];

  const handlePlay = (offset: number) => {
    if (!state?.context?.uri) return;
    play(state.context.uri, offset);
  };

  return (
    <section class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <h2 class="text-lg">Currently Playing</h2>
        <div class="flex flex-col gap-2" ref={animateCurrent}>
          {state?.track_window.current_track && (
            <SimpleListSong
              id={state?.track_window.current_track?.id}
              key={state?.track_window.current_track?.id}
              click={() => handlePlay(currentIndex)}
              name={state?.track_window.current_track?.name ?? ''}
              album={state?.track_window.current_track?.album?.name ?? ''}
              artist={state?.track_window.current_track?.artists[0]?.name ?? ''}
              image={
                getBestImage(
                  (state?.track_window.current_track?.album?.images ??
                    []) as SpotifyImageArray,
                ) || 'https://placekitten.com/300/300'
              }
            />
          )}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h2 class="text-lg">Up Next</h2>
        <div class="flex flex-col gap-2" ref={animateUpcoming}>
          {nextTracks.map((track, i) => (
            <SimpleListSong
              id={track?.id ?? ''}
              key={track?.id}
              click={() => handlePlay(currentIndex + i + 1)}
              name={track?.name ?? ''}
              album={track?.album?.name ?? ''}
              artist={track?.artists[0]?.name ?? ''}
              image={getBestImage(
                (track?.album?.images ?? []) as SpotifyImageArray,
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
