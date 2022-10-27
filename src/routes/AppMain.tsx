import { BlurredBackground } from '../components/atoms/BlurredBackground';
import { MainSection } from './app/MainSection';
import {
  DeskTopSideBar,
  MobileSideBar,
} from '../components/organisms/navigation';

export const Main = () => {
  return (
    <div>
      <BlurredBackground />
      <MobileSideBar />
      <DeskTopSideBar />
      <MainSection />
    </div>
  );
};
