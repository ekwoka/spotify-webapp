import { JSXInternal } from 'preact/src/jsx';
import { Suspense, lazy } from 'preact/compat';

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
  <div class="w-full text-center text-5xl text-white">Loading...</div>
);

export const lazyLoad = (
  cb: () => Promise<() => JSXInternal.Element>,
  fallback?: LazyLoadProps['fallback']
) => {
  const LazyComponent = lazy(cb);
  return (props: any) => (
    <LazyLoad Component={LazyComponent} fallback={fallback} {...props} />
  ); // eslint-disable-line react/display-name
};

export type LazyLoadProps = {
  Component: () => JSXInternal.Element;
  fallback?: () => JSXInternal.Element | JSXInternal.Element;
};
