export const getBestImage = (images: SpotifyImageArray): string => {
  return (
    images.reduce(
      (best, { width, url }) => (best.width > width ? best : { width, url }),
      { width: 0, url: '' }
    ).url ?? ''
  );
};

export type SpotifyImageArray = {
  width: number;
  height?: number;
  url: string;
}[];
