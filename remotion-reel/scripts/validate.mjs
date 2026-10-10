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
 const composition=await selectComposition({serveUrl,id:'SailReel',puppeteerInstance:browser});
 const times=[5,13.9,23.7,28.7,31.18,31.25,32.5,34,39.5,44,49,54,57.8,58,60,65.8,68.5];
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
