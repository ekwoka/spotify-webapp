import { useMemo, useState } from 'preact/hooks';
import { usePlayer } from '../hooks';
import { BlurredBackground } from '../components/atoms/BlurredBackground';
import { MainSection } from './app/MainSection';
import {
  DeskTopSideBar,
  MobileSideBar,
} from '../components/organisms/navigation';

export const Main = () => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState<boolean>(false);
  const playerState = usePlayer()[2];

  const bgImage = useMemo(() => {
    if (!playerState?.track_window?.current_track?.album?.images[0])
      return null;
    const images = playerState.track_window.current_track.album.images;
    return images.reduce((largest, image) =>
      image.width > largest.width ? image : largest
    );
  }, [playerState]);

  return (
    <div>
      <BlurredBackground src={bgImage?.url} />
      <MobileSideBar isOpen={sideBarIsOpen} setIsOpen={setSideBarIsOpen} />
      <DeskTopSideBar />
      <MainSection />
    </div>
  );
};
