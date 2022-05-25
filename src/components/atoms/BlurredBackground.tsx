import { JSXInternal } from 'preact/src/jsx';

export const BlurredBackground = ({
  src,
}: {
  src: string | undefined;
}): JSXInternal.Element => {
  if (!src) return <></>;
  return (
    <>
      <img
        src={src}
        class="absolute -inset-4 min-h-[calc(100vh+32px)] min-w-[calc(100vw+32px)] object-cover blur-lg"
        loading="lazy"
      />
      <div class="absolute -inset-4 bg-gray-900 opacity-50" />
    </>
  );
};
