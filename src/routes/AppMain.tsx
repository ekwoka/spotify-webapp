import { useState } from 'preact/hooks';
import { BlurredBackground } from '../components/atoms/BlurredBackground';
import { MainSection } from './app/MainSection';
import {
  DeskTopSideBar,
  MobileSideBar,
} from '../components/organisms/navigation';

export const Main = () => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState<boolean>(false);

  return (
    <div>
      <BlurredBackground />
      <MobileSideBar isOpen={sideBarIsOpen} setIsOpen={setSideBarIsOpen} />
      <DeskTopSideBar />
      <MainSection />
    </div>
  );
};
