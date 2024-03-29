import { useSignal } from '@preact/signals';
import { XMarkOutline } from 'preact-heroicons';
import { Link } from 'preact-router/match';
import { JSXInternal } from 'preact/src/jsx';
import { MAIN_NAVIGATION } from '../../../data/navigation';
import { TogglePanel } from '../../atoms/headlessui/togglePanel';
import { SpotifyLogo } from '../../atoms/icons';

export const MobileSideBar = (): JSXInternal.Element => {
  const isOpen = useSignal<boolean>(false);
  return (
    <div class="relative z-40 md:hidden" role="dialog" aria-modal="true">
      <TogglePanel
        show={isOpen.value}
        trueClass="opacity-100"
        falseClass="opacity-0 pointer-events-none duration-500"
        class="fixed inset-0 bg-lime-900 bg-opacity-50 backdrop-blur duration-500"
        as="div"
      />
      <TogglePanel
        show={isOpen.value}
        trueClass={'translate-x-0'}
        falseClass={'-translate-x-full pointer-events-none'}
        class="fixed inset-0 z-40 flex duration-500"
        as="div">
        <div class="relative flex w-full max-w-xs flex-1 flex-col bg-lime-700 pb-4 pt-5">
          <TogglePanel
            show={isOpen.value}
            trueClass="opacity-100"
            falseClass="opacity-0 pointer-events-none"
            as="div"
            class="absolute right-0 top-0 -mr-12 pt-2 duration-500">
            <button
              type="button"
              class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => (isOpen.value = false)}
              tabIndex={isOpen.value ? 0 : -1}>
              <span class="sr-only">Close sidebar</span>
              <XMarkOutline
                class="h-6 w-6 text-neutral-200"
                aria-hidden="true"
              />
            </button>
          </TogglePanel>

          <div class="flex flex-shrink-0 items-center px-4">
            <SpotifyLogo class="max-h-8 w-full text-neutral-200" />
          </div>
          <div class="mt-5 h-0 flex-1 overflow-y-auto">
            <nav class="space-y-1 px-2">
              {MAIN_NAVIGATION.map((navItem) => (
                <Link
                  key={navItem.path}
                  href={navItem.path}
                  class="group flex items-center rounded-md bg-lime-800 px-2 py-2 text-base font-medium text-neutral-200"
                  tabIndex={isOpen.value ? 0 : -1}>
                  {navItem.Icon && (
                    <navItem.Icon class="mr-4 h-6 w-6 flex-shrink-0 text-lime-300" />
                  )}
                  {navItem.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </TogglePanel>
    </div>
  );
};
