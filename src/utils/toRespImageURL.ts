export const toRespImageURL = (url: string, width = 180): string => {
  return `/api/image?url=${url}&w=${width}`;
};

export const toRespImageSrcset = (url: string, maxWidth = Infinity): string => {
  return imgWidths
    .map((w) => (w < maxWidth ? `${toRespImageURL(url, w)} ${w}w` : ''))
    .filter((u) => u)
    .join(', ');
};

const imgWidths = [90, 180, 270, 360, 450, 540, 630, 720];
