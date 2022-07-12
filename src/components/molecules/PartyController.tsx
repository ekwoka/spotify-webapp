import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { JSXInternal } from 'preact/src/jsx';

export const PartyController = (): JSXInternal.Element => {
  const [code] = useGlobalState('roomCode', '');
  const [_] = useGlobalState('isPartyHost', false);

  if (!code) return <></>;
  return (
    <div class="flex w-full items-center justify-center gap-2 bg-lime-500 tracking-wide text-gray-900">
      <span>Your Room Code is:</span>{' '}
      <span class="font-mono text-4xl font-medium tracking-widest">{code}</span>
    </div>
  );
};
