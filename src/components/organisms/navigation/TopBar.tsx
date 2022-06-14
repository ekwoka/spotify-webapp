import { Link } from 'preact-router';
import { JSXInternal } from 'preact/src/jsx';
import { TAB_NAV } from '../../../data/navigation';

export const TopBar = (): JSXInternal.Element => {
  return (
    <div class="hidden sm:block">
      <div class="border-b border-gray-600 px-4 pt-4">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          {TAB_NAV.map((tab) => (
            <Link
              key={tab.name}
              href={tab.path}
              activeClassName="border-emerald-500 text-emerald-400 text-lg"
              class="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-400 hover:border-gray-300 hover:text-gray-100">
              {tab.Icon && <tab.Icon class="h-6 w-6" />}
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
