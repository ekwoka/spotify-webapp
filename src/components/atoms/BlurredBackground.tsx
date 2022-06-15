import { JSXInternal } from 'preact/src/jsx';
import { AnimatedWaves } from './AnimatedWaves';

export const BlurredBackground = ({
  src,
}: {
  src: string | undefined;
}): JSXInternal.Element => {
  return (
    <div class="fixed inset-0">
      {/* {src && (
        <img
          src={src}
          class="absolute -inset-4 min-h-[calc(100vh+32px)] min-w-[calc(100vw+32px)] object-cover opacity-60 blur-lg"
          loading="lazy"
        />
      )}
      <AnimatedWaves layers={3} /> */}
      <div class="absolute inset-0 bg-gradient-to-tr from-neutral-900 to-transparent opacity-75" />
      <div class="absolute inset-0 bg-neutral-900 opacity-50" />
    </div>
  );
};
