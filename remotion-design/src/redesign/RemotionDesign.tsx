import React,{useEffect,useState} from 'react';
import {AbsoluteFill,Audio,cancelRender,continueRender,delayRender,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {C,clamp,pop,tween} from './design';
import {Catalogue,Discovery,HotelWidget,Phone,SeatWidget,Title,Upload} from './Primitives';
import {Pipeline} from './Pipeline';
import {Finale} from './Finale';
import captions from './captions.json';

const titles=[
 {start:0,end:3.8,lines:['NEXT STOP:','THE CHAT.'],color:C.lime},
 {start:3.8,end:7.8,lines:['YOUR BRAND.','IN THE CHAT.'],color:C.purple},
 {start:7.8,end:17.6,lines:['FROM MENTION','TO EXPERIENCE.'],color:C.lime},
 {start:17.6,end:21.6,lines:['AND THEN?','IT’S DONE.'],color:C.mint},
 {start:21.6,end:28.4,lines:['SAME CHAT.','MORE POSSIBLE.'],color:C.purple},
 {start:28.4,end:31.2,lines:['READY WHEN','THEY ARE.'],color:C.orange},
 {start:31.2,end:57.887,lines:['BEHIND THE','MOMENT.'],color:C.lime},
 {start:57.887,end:64.4,lines:['USEFUL.','RIGHT HERE.'],color:C.mint},
];
const CSS=`@font-face{font-family:SailDM;src:url(${staticFile('assets/dm-sans-regular.woff2')}) format('woff2');font-weight:400;font-display:block}@font-face{font-family:SailDM;src:url(${staticFile('assets/dm-sans-bold.woff2')}) format('woff2');font-weight:700;font-display:block}.remotion-design,.remotion-design *{box-sizing:border-box}.remotion-design{font-family:SailDM,sans-serif}`;

function Backdrop({t}:{t:number}){
 return <svg width="1080" height="1920" style={{position:'absolute',inset:0}}>
  <rect width="1080" height="1920" fill={C.ink}/>
  <g transform={`rotate(${t*1.3},900,900)`}><circle cx="1080" cy="900" r="510" stroke="#26243d" strokeWidth="150" fill="none"/><circle cx="1080" cy="900" r="510" stroke={C.purple} opacity=".18" strokeWidth="3" strokeDasharray="4 24" fill="none"/></g>
  <path d={`M-220 ${1180+Math.sin(t*.35)*35}C250 1000 180 1740 540 1600S990 1450 1300 1860`} stroke="#2d3337" strokeWidth="72" fill="none"/>
  <path d="M70 61H240" stroke={C.lime} strokeWidth="5"/><path d="M850 61h160" stroke={C.purple} strokeWidth="5"/>
  <g opacity=".32" stroke={C.muted} strokeWidth="2">{[560,920,1210].map(y=><path key={y} d={`M32 ${y}h18m-9-9v18M1030 ${y+55}h18m-9-9v18`}/>)}</g>
 </svg>;
}

export const RemotionDesign:React.FC=()=>{
 const frame=useCurrentFrame(),t=frame/60;
 const [fontHandle]=useState(()=>delayRender('Load Remotion design fonts'));
 useEffect(()=>{Promise.all([document.fonts.load('400 30px SailDM'),document.fonts.load('700 132px SailDM')]).then(()=>continueRender(fontHandle)).catch(cancelRender);},[fontHandle]);
 const title=titles.find(s=>t>=s.start&&t<s.end);
 const top=interpolate(t,[0,7.8,9.3,30.9,32.8,57.887,59.2,64.4],[530,530,420,420,420,420,420,420],clamp);
 const height=interpolate(t,[0,7.8,9.3,30.9,32.8,57.887,59.2],[1110,1110,1250,1250,1130,1130,1250],clamp);
 const scale=interpolate(t,[0,.8,30.9,32.8,57.887,59.2,64.4,65.1],[.9,1,1,.8,.8,1,1,.44],clamp);
 const phoneOpacity=tween(t,0,.5)*tween(t,64.4,65.1,1,0);
 let content:React.ReactNode,prompt:string;
 if(t<7.8){content=<Discovery t={t}/>;prompt='A weekend in Barcelona.';}
 else if(t<21.6){content=<HotelWidget t={t}/>;prompt=t>=17.6?'I’d like that room.':'A weekend in Barcelona.';}
 else if(t<25.511){content=<Catalogue t={t}/>;prompt='Find a watch under €100.';}
 else if(t<26.736){content=<SeatWidget t={t} preview/>;prompt='Can I get a window seat?';}
 else if(t<31.2){content=<Upload t={t}/>;prompt='Upload my prescription.';}
 else{content=<SeatWidget t={t}/>;prompt='Can I get a window seat?';}
 const swapStart=t>=26.736&&t<31.2?26.736:t>=25.511&&t<26.736?25.511:t>=21.6&&t<25.511?21.6:0;
 const cardProgress=swapStart?pop(frame,swapStart):1;
 const caption=captions.find(c=>t>=c.start&&t<c.end);
 return <AbsoluteFill className="remotion-design" style={{background:C.ink,overflow:'hidden'}}>
  <style>{CSS}</style><Backdrop t={t}/>
  {title&&<Title frame={frame} start={title.start} lines={title.lines} color={title.color} size={title.start===7.8?83:92}/>}
  {t<65.1&&<Phone frame={frame} top={top} height={height} scale={scale} prompt={prompt} opacity={phoneOpacity}><div style={{transform:`perspective(1400px) rotateY(${(1-cardProgress)*38}deg)`,transformOrigin:'50% 50%',opacity:cardProgress}}>{content}</div></Phone>}
  {t>=31.2&&t<59.1&&<Pipeline frame={frame} t={t}/>}
  {t>=64.4&&<Finale frame={frame} t={t}/>}
  <div style={{position:'absolute',left:72,right:72,bottom:54,height:4,background:'#303547',zIndex:10}}><div style={{width:`${t/69.283333*100}%`,height:'100%',background:t>=64.4?C.lime:C.purple}}/></div>
  {caption&&<div data-caption style={{position:'absolute',left:90,right:90,top:1792,minHeight:70,color:C.paper,fontSize:32,lineHeight:1.3,textAlign:'center',zIndex:10}}>{caption.text}</div>}
  <Audio src={staticFile('assets/audio.wav')}/>
 </AbsoluteFill>;
};
