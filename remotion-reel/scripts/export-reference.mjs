/** One-time migration: sample the reviewed authored motion into frame-indexed React data.
 * GSAP/Puppeteer are used here only; the Remotion composition does not import them.
 */
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const root=path.resolve(import.meta.dirname,'..');
const reference=process.env.SAIL_REFERENCE_DIR || path.resolve(root,'../reel/final-reel');
const require=createRequire(path.join(reference,'package.json'));
const puppeteer=require('puppeteer-core');
const original=fs.readFileSync(path.join(reference,'index.html'),'utf8');
const css=original.match(/<style>([\s\S]*?)<\/style>/)[1];
const mime={'.woff2':'font/woff2','.svg':'image/svg+xml','.wav':'audio/wav','.js':'text/javascript','.jpg':'image/jpeg'};
const assetMap={};
function embed(p){
 const data=`data:${mime[path.extname(p)]};base64,${fs.readFileSync(path.join(reference,p)).toString('base64')}`;
 assetMap[data]=p;return data;
}
let html=original.replace(/url\((assets\/[^)]+)\)/g,(_,p)=>`url(${embed(p)})`)
 .replace(/src="(assets\/[^\"]+)"/g,(_,p)=>`src="${embed(p)}"`);
const browser=await puppeteer.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
try {
 const page=await browser.newPage();
 await page.setViewport({width:1080,height:1920});
 await page.setContent(html,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);
 const result=await page.evaluate((assetMap)=>{
  const fps=60,total=4157,tl=window.__timelines['sail-final'];tl.seek(0,false);
  const master=document.querySelector('#master');master.querySelectorAll('audio,script').forEach(x=>x.remove());
  const elements=[master,...master.querySelectorAll('*')];
  const tracks={},last={};
  const style=(e)=>Object.fromEntries([...e.style].map(k=>[k,e.style.getPropertyValue(k)]));
  const attrs=(e)=>Object.fromEntries([...e.attributes].filter(a=>!['style','data-rid'].includes(a.name)).map(a=>[a.name,assetMap[a.value]||a.value]));
  const tree=(node)=>{
   if(node.nodeType===3)return node.textContent;
   if(node.nodeType!==1)return null;
   const id=elements.indexOf(node);node.dataset.rid=String(id);
   return {id,tag:node.tagName.toLowerCase(),attrs:attrs(node),style:style(node),children:[...node.childNodes].map(tree).filter(x=>x!==null)};
  };
  const scene=tree(master);
  const captions=[...master.querySelectorAll('.caption')].map(e=>({e,start:Number(e.dataset.start),end:Number(e.dataset.start)+Number(e.dataset.duration)}));
  for(let frame=0;frame<total;frame++){
   const t=frame/fps;tl.seek(t,false);
   for(const {e,start,end} of captions)e.style.opacity=t>=start&&t<end?'1':'0';
   for(let id=0;id<elements.length;id++){
    const e=elements[id];
    const state={style:style(e),attrs:attrs(e)};
    if(!e.children.length)state.text=e.textContent;
    const s=JSON.stringify(state);
    if(s!==last[id]){(tracks[id]??=[]).push([frame,state]);last[id]=s;}
   }
  }
  return {scene,tracks,meta:{fps,width:1080,height:1920,durationInFrames:total,durationSeconds:total/fps,sourceDuration:69.273,nodeCount:elements.length,trackCount:Object.keys(tracks).length}};
 },assetMap);
 fs.writeFileSync(path.join(root,'src/scene.json'),JSON.stringify(result.scene));
 fs.writeFileSync(path.join(root,'src/motion.json'),JSON.stringify(result.tracks));
 fs.writeFileSync(path.join(root,'src/meta.json'),JSON.stringify(result.meta,null,2));
 // Fonts/body are scoped so Remotion Studio itself keeps its normal layout.
 const scoped=css.replace(/html,body\{/g,'.sail-composition{');
 fs.writeFileSync(path.join(root,'src/scene.css'),scoped);
 fs.writeFileSync(path.join(root,'src/styles.ts'),'export const css = '+JSON.stringify(scoped)+';\n');
 console.log(JSON.stringify({...result.meta,motionBytes:fs.statSync(path.join(root,'src/motion.json')).size},null,2));
} finally {await browser.close();}
