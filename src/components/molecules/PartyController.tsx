import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { useEffect, useRef } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { useSpotify } from '../../hooks';

export const PartyController = (): JSXInternal.Element => {
  const [code] = useGlobalState('roomCode', '');
  const [_] = useGlobalState('isPartyHost', false);
  const SpotifyApi = useSpotify();
  const alreadyAdded = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!code) return;
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/getroomqueue?code=${code}`);
        if (!response.ok) return;
        const { queue } = await response.json();
        for (let i = 0; i < queue.length; i++) {
          const uri = queue[i];
          if (alreadyAdded.current.has(uri)) continue;
          alreadyAdded.current.add(uri);
          await SpotifyApi.addToQueue(uri);
        }
      } catch (e) {
        console.error(e);
      }
    }, THREE_MINUTES);
    return () => clearInterval(interval);
  }, [code, SpotifyApi]);

  if (!code) return <></>;
  return (
    <div class="flex w-full items-center justify-center gap-2 bg-lime-500 tracking-wide text-gray-900">
      <span>Your Room Code is:</span>
      <span class="font-mono text-4xl font-medium tracking-widest">{code}</span>
    </div>
  );
};

const THREE_MINUTES = 180000;
