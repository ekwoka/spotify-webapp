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

type RespImageProps = {
  src: string;
  maxWidth?: number;
  [key: string]: string | number | undefined;
};
