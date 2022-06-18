import { JSXInternal } from 'preact/src/jsx';

export const RespImage = ({
  src,
  maxWidth,
  ...props
}: RespImageProps): JSXInternal.Element => (
  <img
    src={toRespImageURL(src)}
    srcset={toRespImageSrcset(src, maxWidth)}
    {...props}
  />
);

export const toRespImageURL = (url: string, width = 180): string => {
  return `/api/image?url=${url}&w=${width}`;
};

export const toRespImageSrcset = (url: string, maxWidth = Infinity): string => {
  return imgWidths
    .map((w) => (w < maxWidth ? `${toRespImageURL(url, w)} ${w}w` : ''))
    .join(', ');
};

const imgWidths = [90, 180, 270, 360, 450, 540, 630, 720];

type RespImageProps = {
  src: string;
  maxWidth?: number;
  [key: string]: string | number | undefined;
};
