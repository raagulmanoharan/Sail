import React from 'react';
import {C,linear,pop,tween} from './design';
import {Check,SailMark,Star} from './Primitives';

export const Pipeline=({frame,t}:{frame:number;t:number})=>{
 const entrance=pop(frame,32,.15);const mutate=t>=44.2;const response=(t>=37.55&&t<41.945)||t>=50.167;const success=t>=50.167;
 const nodes=[{x:72,w:232},{x:402,w:270},{x:760,w:248}];
 const packets=[
  {start:33.85,end:34.9,a:315,b:391,y:1447,color:C.purple},
  {start:35.05,end:36.1,a:685,b:747,y:1447,color:C.purple},
  {start:37.55,end:38.1,a:747,b:685,y:1550,color:C.mint},
  {start:38.15,end:38.7,a:391,b:315,y:1550,color:C.mint},
  {start:44.63,end:45.7,a:315,b:391,y:1447,color:C.purple},
  {start:45.85,end:47,a:685,b:747,y:1447,color:C.purple},
  {start:51.65,end:52.35,a:747,b:685,y:1550,color:C.mint},
  {start:52.4,end:53.2,a:391,b:315,y:1550,color:C.mint},
 ];
 return <div data-pipeline style={{position:'absolute',inset:0,opacity:tween(t,31.8,32.6)*tween(t,58,59,1,0),transform:`translateY(${(1-entrance)*35}px)`,zIndex:4}}>
  <div style={{position:'absolute',left:72,top:350,color:response?C.mint:C.purple,fontSize:32,fontWeight:700}}>{t<41.945?'Check live availability.':t<50.167?'Choose. Confirm. Reserve.':'Return the confirmed result.'}</div>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0}}>
   <defs><marker id="arrow-call" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill={C.purple}/></marker><marker id="arrow-return" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill={C.mint}/></marker></defs>
   {[[315,389],[685,747]].map(([a,b],i)=><React.Fragment key={i}><path d={`M${a} 1447H${b}`} stroke={C.purple} strokeWidth="4" opacity={response?.28:1} markerEnd="url(#arrow-call)"/><path d={`M${b} 1550H${a}`} stroke={C.mint} strokeWidth="4" opacity={response?1:.28} markerEnd="url(#arrow-return)"/></React.Fragment>)}
   {packets.filter(p=>t>=p.start&&t<=p.end).map((p,i)=><g key={i} transform={`translate(${linear(t,p.start,p.end,p.a,p.b)} ${p.y})`}><circle r="16" fill={p.color}/><circle r="5" fill={C.ink}/></g>)}
   <path d="M540 1330V1348H188V1365" stroke={C.line} strokeWidth="3" fill="none"/>
  </svg>
  <div style={{position:'absolute',left:nodes[0].x,top:1370,width:nodes[0].w,height:280,padding:23,borderRadius:28,background:C.panel,border:`2px solid ${C.line}`,color:C.paper}}><Star size={42}/><div style={{fontSize:30,fontWeight:700,marginTop:17,lineHeight:1.15}}>AI<br/>assistant</div><div style={{height:44,borderRadius:12,background:'#353050',color:C.purple,marginTop:20,fontSize:23,display:'flex',alignItems:'center',justifyContent:'center'}}>{mutate?'select_seat':'get_seat_map'}</div></div>
  <div style={{position:'absolute',left:nodes[1].x,top:1370,width:nodes[1].w,height:280,padding:25,borderRadius:28,background:C.blue,border:'2px solid #aa9cff',color:C.paper}}><div style={{display:'flex',alignItems:'center',gap:10,fontSize:47,fontWeight:700}}><SailMark size={46}/>Sail</div><div style={{fontSize:24,marginTop:20}}>Branded UI</div><div style={{display:'flex',gap:10,marginTop:16}}>{['A','B','C'].map((x,i)=><div key={x} style={{width:59,height:47,borderRadius:10,background:i===0?(success?C.mint:C.lime):'#ffffff22',color:i===0?C.ink:C.paper,display:'flex',alignItems:'center',justifyContent:'center',fontSize:25,fontWeight:700}}>{i===0&&success?<Check size={25}/>:x}</div>)}</div><div style={{fontSize:22,marginTop:15,color:'#e0d9ff'}}>Connected APIs</div></div>
  <div style={{position:'absolute',left:nodes[2].x,top:1370,width:nodes[2].w,height:280,padding:20,borderRadius:28,background:C.panel,border:`2px solid ${success?C.mint:C.line}`,color:C.paper}}><div style={{fontSize:29,fontWeight:700,marginBottom:20}}>Airline API</div>{[{method:'GET',name:'Seat map',active:!mutate},{method:'POST',name:'Reserve',active:mutate}].map(a=><div key={a.method} style={{height:60,display:'flex',alignItems:'center',gap:9,padding:'0 10px',borderRadius:12,marginBottom:12,background:a.active?(success?'#245448':'#363050'):'#181b28',border:`2px solid ${a.active?(success?C.mint:C.purple):'#292e40'}`,opacity:a.active?1:.5}}><span style={{fontSize:18,fontWeight:700,color:a.active?(success?C.mint:C.purple):C.muted}}>{a.method}</span><span style={{fontSize:24,fontWeight:700}}>{a.name}</span></div>)}<div style={{display:'flex',alignItems:'center',gap:5,fontSize:22,color:success?C.mint:C.muted}}>{success?<><Check size={20} color={C.mint}/>12A reserved</>:mutate?'Rechecking 12A…':'Live availability'}</div></div>
 </div>;
};
