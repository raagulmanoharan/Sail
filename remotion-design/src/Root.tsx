import React from 'react';
import {Composition} from 'remotion';
import {RemotionDesign} from './redesign/RemotionDesign';
export const RemotionRoot:React.FC=()=> <Composition id="SailRemotionDesign" component={RemotionDesign} width={1080} height={1920} fps={60} durationInFrames={4157}/>;
