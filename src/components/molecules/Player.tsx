import { usePlayer } from '../../hooks';

export const Player = () => {
  const [player, { play }] = usePlayer();

  return (
    <button
      class="mx-auto mt-20 max-w-max rounded-full bg-green-500 px-4 py-2 text-black disabled:bg-neutral-500"
      type="button"
      onClick={() => play(TEST_URIS)}
      disabled={!player}>
      Play Test Songs
    </button>
  );
};

const TEST_URIS: string[] = [
  'spotify:track:4b9LMCUaw55QajVRfrfPyS',
  'spotify:track:2zCXNCWa1RMIHfv0435jhT',
  'spotify:track:03UrZgTINDqvnUMbbIMhql',
];
