import React from 'react';
import {Composition} from 'remotion';
import {SailReel} from './SailReel';
import meta from './meta.json';
export const RemotionRoot: React.FC = () => (
  <Composition id="SailReel" component={SailReel} width={meta.width} height={meta.height}
    fps={meta.fps} durationInFrames={meta.durationInFrames}/>
);
