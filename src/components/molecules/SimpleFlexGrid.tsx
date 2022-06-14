import { JSXInternal } from 'preact/src/jsx';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const SimpleFlexGrid = <T extends unknown>({
  as,
  data,
}: {
  as: (item: T) => JSXInternal.Element;
  data: T[];
}): JSXInternal.Element => {
  return (
    <ul
      role="list"
      className="flex max-w-full flex-row flex-wrap gap-8 overflow-x-hidden">
      {data.map(as)}
    </ul>
  );
};
