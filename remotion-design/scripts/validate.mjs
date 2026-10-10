import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {bundle} from '@remotion/bundler';
import {openBrowser, selectComposition, renderStill} from '@remotion/renderer';
const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'qa');fs.mkdirSync(out,{recursive:true});
const errors=[];
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.tsx'),publicDir:path.join(root,'public')});
const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium'});
try {
 const composition=await selectComposition({serveUrl,id:'SailRemotionDesign',puppeteerInstance:browser});
 const times=[2,6,12,16.2,20.5,24.2,26.1,27.7,30,34.8,39.5,43.8,47,52.5,54,60,65.8,68.5,44];
 for(const t of times){
  const frame=Math.round(t*composition.fps);
  await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,output:path.join(out,`frame-${t}.png`),imageFormat:'png',onBrowserLog:(log)=>{if(log.type==='error')errors.push(log.text);}});
  console.log(`Validated frame ${frame} (${t}s)`);
 }
 // Seek backwards after the finale. Independent evaluation must yield identical bytes.
 await renderStill({serveUrl,composition,frame:2640,puppeteerInstance:browser,output:path.join(out,'repeat-44.png'),imageFormat:'png'});
 const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(path.join(out,f))).digest('hex');
 const deterministic=hash('repeat-44.png')===hash('frame-44.png');
 const report={ok:errors.length===0&&deterministic,composition:{id:composition.id,fps:composition.fps,width:composition.width,height:composition.height,durationInFrames:composition.durationInFrames},frames:times,backwardsSeekMatches:deterministic,browserErrors:errors};
 fs.writeFileSync(path.join(out,'validation.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 if(!report.ok)process.exitCode=1;
} finally {await browser.close({silent:true});}
