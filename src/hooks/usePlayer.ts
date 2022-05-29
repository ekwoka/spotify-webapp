import { useEffect, useMemo } from 'preact/hooks';
import SpotifyPlayer, { SpotifyWebPlaybackState } from 'spotify-web-playback';
import { useAsyncEffect } from './useAsyncEffect';
import { useGlobalState } from '@ekwoka/preact-global-state';
import { useStorage } from './useStorage';

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
    null
  );
  const [token, setToken] = useStorage<string>('token', '');

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
            play: (items?: string | string[], offset?: number) =>
              player.play(items, offset),
            pause: () => player.pause(),
            next: () => player.next(),
            previous: () => player.previous(),
            seek: (position: number) => player.seek(position),
          }
        : nullPlayerActions,
    [player]
  );

  return [player, actions, status];
};

export type PlayerActions = {
  play: (items?: string | string[], offset?: number) => Promise<void>;
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
