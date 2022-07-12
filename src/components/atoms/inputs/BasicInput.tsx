import { JSXInternal } from 'preact/src/jsx';

export const BasicInput = ({
  label,
  id,
  class: className,
  ...props
}: {
  label?: string;
  id: string;
  class?: string;
  [key: string]: any;
}): JSXInternal.Element => (
  <div class={className}>
    {label && (
      <label htmlFor={id} class="block text-sm font-medium text-gray-200">
        {label}
      </label>
    )}
    <div class="mt-1">
      <input
        id={id}
        class="block w-full rounded-md border-gray-300 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...props}
      />
    </div>
  </div>
);
