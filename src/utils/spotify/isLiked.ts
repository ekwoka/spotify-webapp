import { spotifyApi } from '../../hooks/useSpotify';
import { chunkArray } from '../chunkArray';
import { debounce } from '../debounce';

export const getLiked = (id: string): Promise<boolean> => {
  return new Promise((res) => queue.push({ id, res }) && getAllLiked());
};

const queue: LikedQueue = [];
const getAllLiked = debounce(async (): Promise<void> => {
  const chunks = chunkArray(queue, 50, true);
  chunks.forEach(async (chunk) => {
    const [ids, res] = chunk.reduce(
      (acc, next) => {
        acc[0].push(next.id);
        acc[1].push(next.res);
        return acc;
      },
      [[], []] as [string[], ((val: boolean) => void)[]]
    );
    const likedResponses = (await spotifyApi.containsMySavedTracks(ids)).body;
    while (res.length) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (res.pop() ?? (() => {}))(likedResponses.pop() ?? false);
    }
  });
});

type LikedQueue = {
  id: string;
  res: (val: boolean) => void;
}[];
