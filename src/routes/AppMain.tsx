import { BlurredBackground } from '../components/atoms/BlurredBackground';
import { MainSection } from './app/MainSection';
import {
  DeskTopSideBar,
  MobileSideBar,
} from '../components/organisms/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export const Main = () => {
  return (
    <QueryClientProvider client={client}>
      <BlurredBackground />
      <MobileSideBar />
      <DeskTopSideBar />
      <MainSection />
    </QueryClientProvider>
  );
};
