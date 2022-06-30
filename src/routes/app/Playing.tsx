import { JSXInternal } from 'preact/src/jsx';
import { SimpleListSong } from '../../components/atoms/SimpleListSong';
import { useAsyncMemo, usePlayer, useSpotify } from '../../hooks';
import { getBestImage, SpotifyImageArray } from '../../utils/getBestImage';

export const Playing = (): JSXInternal.Element => {
  const [_, { play }, state] = usePlayer();
  const spotifyApi = useSpotify();
  const currentPlaylist = useAsyncMemo(
    async () => {
      if (!state?.context?.uri) return;
      const playlistId = (state.context.uri as string).split(':playlist:')[1];
      const playlist = await spotifyApi.getPlaylistTracks(playlistId);
      return (playlist?.body?.items ?? []).map((item) => item.track);
    },
    [],
    [state?.context?.uri]
  );
  const currentIndex = (currentPlaylist ?? []).findIndex(
    (track) => track?.id === state?.track_window.current_track.id
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
        <div class="flex flex-col gap-2">
          {state?.track_window.current_track && (
            <SimpleListSong
              key={state?.track_window.current_track?.id}
              click={() => handlePlay(currentIndex)}
              name={state?.track_window.current_track?.name ?? ''}
              album={state?.track_window.current_track?.album?.name ?? ''}
              artist={state?.track_window.current_track?.artists[0]?.name ?? ''}
              image={
                getBestImage(
                  (state?.track_window.current_track?.album?.images ??
                    []) as SpotifyImageArray
                ) || 'https://placekitten.com/300/300'
              }
            />
          )}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h2 class="text-lg">Up Next</h2>
        <div class="flex flex-col gap-2">
          {nextTracks.map((track, i) => (
            <SimpleListSong
              key={track?.id}
              click={() => handlePlay(currentIndex + i + 1)}
              name={track?.name ?? ''}
              album={track?.album?.name ?? ''}
              artist={track?.artists[0]?.name ?? ''}
              image={getBestImage(
                (track?.album?.images ?? []) as SpotifyImageArray
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
