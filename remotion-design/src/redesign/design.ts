import {Easing, interpolate, spring} from 'remotion';
export const C={ink:'#11131e',panel:'#1d2131',muted:'#9ca4bc',paper:'#f3f0e8',lime:'#d9ff79',purple:'#ae96ff',blue:'#6355ff',mint:'#7ee4c3',orange:'#ff997c',line:'#3a4057'};
export const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const ease=Easing.bezier(.22,1,.36,1);
export const tween=(t:number,start:number,end:number,from=0,to=1)=>interpolate(t,[start,end],[from,to],{...clamp,easing:ease});
export const linear=(t:number,start:number,end:number,from=0,to=1)=>interpolate(t,[start,end],[from,to],clamp);
export const pop=(frame:number,start:number,delay=0)=>spring({frame:frame-Math.round((start+delay)*60),fps:60,config:{damping:19,stiffness:125,mass:.9}});
