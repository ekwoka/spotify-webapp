import { JSXInternal } from 'preact/src/jsx';
import { Suspense, lazy } from 'preact/compat';
import { Spinner } from '../atoms/icons';

export const LazyLoad = ({
  Component,
  fallback,
  ...props
}: LazyLoadProps): JSXInternal.Element => (
  <Suspense fallback={prepareFallback(fallback)}>
    <Component {...props} />
  </Suspense>
);

const prepareFallback = (fb: LazyLoadProps['fallback']) => {
  const toUse = fb ? fb : Default;
  return typeof toUse === 'function' ? toUse() : toUse;
};

const Default = () => (
  <div class="w-full p-8 h-full flex items-center justify-center">
    <Spinner />
  </div>
);

export const lazyLoad = (
  cb: () => Promise<() => JSXInternal.Element>,
  fallback?: LazyLoadProps['fallback']
) => {
  const LazyComponent = lazy(cb);
  const LazyLoadWrapped = (props: any) => (
    <LazyLoad Component={LazyComponent} fallback={fallback} {...props} />
  );
  return LazyLoadWrapped;
};

export type LazyLoadProps = {
  Component: () => JSXInternal.Element;
  fallback?: () => JSXInternal.Element | JSXInternal.Element;
};
