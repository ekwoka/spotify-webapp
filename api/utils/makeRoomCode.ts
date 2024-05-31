export const makeRoomCode = (): string => {
  return Array.from(
    { length: 4 },
    () => CHARS[Math.floor(Math.random() * CHARS.length)],
  ).join('');
};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
