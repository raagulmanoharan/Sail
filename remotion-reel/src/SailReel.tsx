import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Img, cancelRender, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
import {attributesToProps} from 'html-react-parser';
import rawScene from './scene.json';
import rawMotion from './motion.json';
import {css} from './styles';

interface SceneNode {
  id: number; tag: string; attrs: Record<string,string>; style: Record<string,string>;
  children: (SceneNode|string)[];
}
interface FrameState {style: Record<string,string>; attrs: Record<string,string>; text?: string}
type Track = [number, FrameState][];
const scene = rawScene as SceneNode;
const motion = rawMotion as unknown as Record<string,Track>;
const stylesheet = css.replace(/url\((assets\/[^)]+)\)/g, (_: string, asset: string) => `url("${staticFile(asset)}")`);
const voidElements = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

/** The frame is the only clock. Binary search also supports seeking in any order. */
export function stateAt(track: Track|undefined, frame: number): FrameState|undefined {
  if (!track?.length) return undefined;
  let lo=0, hi=track.length-1;
  while(lo<hi){const mid=Math.ceil((lo+hi)/2);if(track[mid][0]<=frame)lo=mid;else hi=mid-1;}
  return track[lo][1];
}
function cssStyle(style: Record<string,string>): React.CSSProperties {
  return Object.fromEntries(Object.entries(style).map(([k,v]) => [
    k.startsWith('--') ? k : k.replace(/^-ms-/,'ms-').replace(/-([a-z])/g,(_,c:string)=>c.toUpperCase()),v,
  ])) as React.CSSProperties;
}
function SceneElement({node,frame}: {node:SceneNode;frame:number}): React.ReactElement {
  const state=stateAt(motion[node.id],frame);
  const attrs={...(state?.attrs??node.attrs)};
  if(attrs.src?.startsWith('assets/')) attrs.src=staticFile(attrs.src);
  const props={...attributesToProps(attrs),style:cssStyle(state?.style??node.style)};
  if(node.tag==='img') return <Img {...props} src={attrs.src}/>;
  const tag=node.tag;
  if(voidElements.has(node.tag)) return React.createElement(tag,props);
  const children=state?.text!==undefined ? state.text : node.children.map((child,i)=>
    typeof child==='string'?child:<SceneElement key={child.id??i} node={child} frame={frame}/>);
  return React.createElement(tag,props,children);
}

/** Native React/DOM/SVG composition: no video background, iframe, GSAP, or wall-clock animation. */
export const SailReel: React.FC = () => {
  const frame=useCurrentFrame();
  const [fontHandle]=useState(()=>delayRender('Load bundled Sail fonts'));
  useEffect(()=>{
    Promise.all([document.fonts.load('400 39px DM'),document.fonts.load('700 60px DM')])
      .then(()=>continueRender(fontHandle)).catch(cancelRender);
  },[fontHandle]);
  return <AbsoluteFill className="sail-composition">
    <style>{stylesheet}</style>
    <SceneElement node={scene} frame={frame}/>
    <Audio src={staticFile('assets/audio.wav')}/>
  </AbsoluteFill>;
};
