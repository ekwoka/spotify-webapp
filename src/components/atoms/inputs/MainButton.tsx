import { JSXInternal } from 'preact/src/jsx';
import { classNames } from '../../../utils';

export const MainButton = ({
  class: className,
  children,
  ...props
}: {
  class?: string;
  [key: string]: any;
}): JSXInternal.Element => (
  <button
    class={classNames(
      'flex w-full justify-center rounded-md border border-transparent bg-lime-500 py-2 px-4 font-medium text-neutral-900 shadow-sm hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2',
      className
    )}
    {...props}>
    {children}
  </button>
);
