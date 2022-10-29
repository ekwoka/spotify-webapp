import { useEffect, useMemo } from 'preact/hooks';
import SpotifyPlayer, { SpotifyWebPlaybackState } from 'spotify-web-playback';
import { useAsyncEffect } from './useAsyncEffect';
import { useGlobalState } from '@ekwoka/preact-global-state';
import { arrayWrap } from '../utils';
import { addToRoomQueue } from '../utils/apiLayer/addToRoomQueue';
import { SpotifyApiClient, addToQueue } from '@ekwoka/spotify-api';

let alreadyCalled = false;

export const usePlayer = (): [
  SpotifyPlayer | null,
  PlayerActions,
  PlayerState | null
] => {
  const [player, setPlayer] = useGlobalState<SpotifyPlayer | null>(
    'webplayer',
    null
  );
  const [status, setStatus] = useGlobalState<PlayerState | null>(
    'playerstate',
    nullPlaybackState
  );
  const [token, setToken] = useGlobalState<string>('token', '');
  const [room] = useGlobalState<string>('roomCode', '');
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');

  useAsyncEffect(async () => {
    if (alreadyCalled || !token) return;
    alreadyCalled = true;
    const newPlayer = new SpotifyPlayer('Kwoka Player');
    newPlayer.addListener('error', () => {
      alreadyCalled = false;
      setToken('');
    });
    await newPlayer.connect(token);
    setPlayer(newPlayer);
  }, []);

  useEffect(() => {
    if (!player) return;

    const handler = (state: PlayerState | null) => {
      if (!state) return;
      setStatus(state);
    };

    player.addListener('state', handler);
    return () => {
      player.removeListener('state', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  useEffect(() => {
    if (!player || !token) return;
    if (player.token === token) return;
    player.setToken(token);
  }, [player, token]);

  const actions = useMemo<PlayerActions>(
    () =>
      player
        ? {
            play: (items?: string | string[], offset?: number) => {
              if (!items) return;
              if (typeof items === 'string' && /^spotify:playlist:/.test(items))
                return player.play(items, offset);
              if (status?.track_window.current_track.id) {
                arrayWrap(items ?? []).forEach((item) =>
                  client(addToQueue(item))
                );
                return;
              }
              if (!room) return player.play(items, offset);
              return addToRoomQueue(items, room);
            },
            pause: () => player.pause(),
            next: () => player.next(),
            previous: () => player.previous(),
            seek: (position: number) => player.seek(position),
          }
        : nullPlayerActions,
    [player, room, status?.track_window.current_track.id, client]
  );

  return [player, actions, status];
};

export type PlayerActions = {
  play: (items?: string | string[], offset?: number) => Promise<void> | void;
  pause: () => Promise<void>;
  next: () => Promise<void>;
  previous: () => Promise<void>;
  seek: (position: number) => Promise<void>;
};

export type PlayerState = SpotifyWebPlaybackState;

const nullPlayerActions: PlayerActions = {
  play: () => Promise.resolve(),
  pause: () => Promise.resolve(),
  next: () => Promise.resolve(),
  previous: () => Promise.resolve(),
  seek: () => Promise.resolve(),
};

const nullPlaybackState: SpotifyWebPlaybackState = {
  duration: 1,
  position: 0,
  paused: true,
  track_window: {
    current_track: {
      album: {
        images: [],
        name: '',
        uri: '',
      },
      artists: [],
      id: '',
      linked_from: { uri: null, id: null },
      linked_from_uri: null,
      duration_ms: 1,
      name: '',
      uri: '',
      is_playable: false,
      media_type: '',
      type: '',
    },
    next_tracks: [],
    previous_tracks: [],
  },
  context: {
    uri: null,
    metadata: {
      album: {
        images: [],
        name: '',
        uri: '',
      },
      artists: [],
      name: '',
      type: '',
    },
  },
  bitrate: 0,
  disallows: {
    skipping_prev: false,
    resuming: false,
  },
  restrictions: {
    disallow_resuming_reasons: [],
    disallow_skipping_prev_reasons: [],
  },
  shuffle: false,
  timestamp: 0,
  repeat_mode: 0,
};
