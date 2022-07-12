import { describe, expect, it } from '@jest/globals';
import { getNewRoomCode } from './getNewRoomCode';

describe('getNewRoomCode', () => {
  it('Returns a new room code', async () => {
    const code = await getNewRoomCode();
    expect(code).toBeDefined();
    expect(code).toMatch(/^[A-Z]{4}$/);
  });
});
