import { Composition } from 'remotion';
import { TechRetailFilm } from './TechRetailFilm';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="TechRetailOffer4K" component={TechRetailFilm} width={3840} height={2160} fps={30} durationInFrames={1260} />
    </>
  );
};
