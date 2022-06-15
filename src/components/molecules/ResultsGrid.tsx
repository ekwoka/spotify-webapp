import { JSXInternal } from 'preact/src/jsx';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const ResultsGrid = <T extends unknown>({
  as,
  data,
}: {
  as: (item: T) => JSXInternal.Element;
  data: T[];
}): JSXInternal.Element => {
  return (
    <ul
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3">
      {data.map(as)}
    </ul>
  );
};
