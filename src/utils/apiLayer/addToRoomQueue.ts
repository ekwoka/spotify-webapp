import { arrayWrap } from '../arrayWrap';

export const addToRoomQueue = async (
  uri: string | string[],
  roomCode: string
): Promise<void> => {
  try {
    const response = await fetch('/api/addtoqueue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uri: arrayWrap(uri), code: roomCode }),
    });
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);
  } catch (e) {
    console.error(e);
  }
};
