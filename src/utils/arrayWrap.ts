export const arrayWrap = <T>(maybe: T | T[]): T[] => {
  if (Array.isArray(maybe)) return maybe;
  return [maybe];
};
