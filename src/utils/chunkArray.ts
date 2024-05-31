export const chunkArray = <T>(
  arr: T[],
  maxSize: number,
  mutate = false,
): T[][] => {
  if (!mutate) arr = [...arr];
  const output: T[][] = [];
  while (arr.length) output.push(arr.splice(0, maxSize));
  return output;
};
