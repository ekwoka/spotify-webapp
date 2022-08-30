import { useGlobalState } from '@ekwoka/preact-global-state';
import { ChatBubbleBottomCenterOutline } from '@graywolfai/react-heroicons/dist/outline/chat-bubble-bottom-center-outline';
import { GlobeAltOutline } from '@graywolfai/react-heroicons/dist/outline/globe-alt-outline';
import { BoltOutline } from '@graywolfai/react-heroicons/dist/outline/bolt-outline';
import { ScaleOutline } from '@graywolfai/react-heroicons/dist/outline/scale-outline';
import { JSXInternal } from 'preact/src/jsx';
import { BasicInput, MainButton } from '../../components/atoms/inputs';

const partyFeatures = [
  {
    name: 'One Main Stream',
    description:
      'Only one Spotify Premium account is needed, and all songs are played through that account.',
    icon: GlobeAltOutline,
  },
  {
    name: 'Infinite DJs',
    description:
      'Everyone can choose songs to add to the queue, from their own devices.',
    icon: ScaleOutline,
  },
  {
    name: 'Party Management Tools',
    description:
      'Party Hosts can manage the queue, and enforce a variety of rules for songs (such as max length, limit genres, etc.)',
    icon: BoltOutline,
  },
  {
    name: 'Simple Room Codes',
    description:
      'Room codes are just 4 digits! Easy to share with friends. You can even generate a QR code to make it even easier for others to join.',
    icon: ChatBubbleBottomCenterOutline,
  },
];

export const Party = (): JSXInternal.Element => {
  const [code, setCode] = useGlobalState('roomCode', '');
  const [_, setIsHost] = useGlobalState('isPartyHost', false);
  const makeRoom = async () => {
    const response = await fetch('/api/makeroom');
    if (!response.ok) return;
    const { code } = await response.json();
    setCode(code);
    setIsHost(true);
  };
  const joinRoom = async ({
    target: { value: code },
  }: {
    target: { value: string };
  }) => {
    if (code.length !== 4) return;
    const response = await fetch('/api/joinroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    if (!response.ok) return;
    setCode(code.toUpperCase());
  };
  return code ? (
    <div>Your Code is {code}</div>
  ) : (
    <section class="mx-auto flex max-w-7xl flex-col gap-10 px-4 tracking-wide sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base font-semibold uppercase text-lime-400">
          Party Mode
        </h2>
        <p class="mt-2 text-3xl font-extrabold leading-8 text-gray-100 sm:text-4xl">
          Let The Whole Party Choose The Playlist
        </p>
        <p class="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
          Why have all the responsibility for music choice be on one person? Let
          everyone use their own devices control a unified Spotify Playlist!
        </p>
      </div>

      <dl class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
        {partyFeatures.map((feature) => (
          <div key={feature.name} class="relative">
            <dt>
              <div class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-gray-500 text-white">
                <feature.icon class="h-6 w-6" aria-hidden="true" />
              </div>
              <p class="ml-16 text-lg font-medium leading-6 text-gray-100">
                {feature.name}
              </p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-400">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>

      <div class="flex flex-row items-end justify-center gap-8 px-8">
        <MainButton class="max-w-sm" type="button" onClick={makeRoom}>
          Activate Party Mode!
        </MainButton>
        <BasicInput
          class="max-w-sm grow"
          label="Trying to join a room?"
          id="partCode"
          type="text"
          placeholder="Room Code"
          onChange={joinRoom}
        />
      </div>
    </section>
  );
};
