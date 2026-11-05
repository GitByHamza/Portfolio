import { loadFont } from '@remotion/fonts';
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from 'remotion';
import { Opening, Compatibility, Stock, Warranty, Package, Closing } from './scenes/Story';
import { FinishLayers } from './components/Motion';
import './style.css';

loadFont({ family: 'Manrope', url: staticFile('fonts/Manrope.ttf'), weight: '100 900' });
loadFont({ family: 'Newsreader', url: staticFile('fonts/Newsreader.ttf'), weight: '100 900' });

export const TechRetailFilm = () => {
  const { width, fps } = useVideoConfig();
  return <AbsoluteFill>
    <Audio src={staticFile('audio/score.wav')} volume={.9} />
    <div style={{ position: 'absolute', width: 1920, height: 1080, transform: `scale(${width / 1920})`, transformOrigin: 'top left' }}>
      <Sequence name="Your shop, connected" durationInFrames={5 * fps}><Opening /></Sequence>
      <Sequence name="PC compatibility" from={4.5 * fps} durationInFrames={8 * fps}><Compatibility /></Sequence>
      <Sequence name="Catalogue and stock" from={12 * fps} durationInFrames={8 * fps}><Stock /></Sequence>
      <Sequence name="Serial lifecycle" from={19.5 * fps} durationInFrames={6.5 * fps}><Warranty /></Sequence>
      <Sequence name="The Multi-Branch offer" from={25.5 * fps} durationInFrames={9.5 * fps}><Package /></Sequence>
      <Sequence name="Personalised demo" from={34.5 * fps} durationInFrames={7.5 * fps}><Closing /></Sequence>
      <FinishLayers />
    </div>
  </AbsoluteFill>;
};
