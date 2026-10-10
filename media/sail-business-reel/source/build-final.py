from pathlib import Path
import re,json,html
import numpy as np,soundfile as sf
P=Path(__file__).parent;R=P/'inputs/review-reel';S=P/'inputs/seat-flow-concept';OPEN=31.2;CLOSE=46.116;OLDEND=57.502
business=json.loads((P/'business-timeline.json').read_text());businessph={x['id']:x for x in business['scenes']};buildDuration=businessph['ending']['start'];INTRO=OPEN+buildDuration
segment=json.loads((P/'timeline.json').read_text());phases=segment['scenes'];sd=segment['duration'];closeStart=INTRO+sd;duration=closeStart+OLDEND-CLOSE
old,_=sf.read(R/'assets/narration.wav');new,_=sf.read(P/'assets/narration.wav');SR=24000;bvoice,_=sf.read(P/'assets/business-narration.wav');ending=bvoice[round(buildDuration*SR):];ending=np.pad(ending,(0,max(0,round((OLDEND-CLOSE)*SR)-len(ending))))[:round((OLDEND-CLOSE)*SR)];narration=np.concatenate([old[:round(OPEN*SR)],bvoice[:round(buildDuration*SR)],new,ending])
sf.write(P/'assets/full-narration.wav',narration,SR)
# Reuse original procedural music synthesis for one uninterrupted bed.
code=(P/'make-audio.py').read_text();a=code.index('# Restrained original');b=code.index("sf.write(ROOT/'assets/music.wav'",a)
ctx={'np':np,'SR':SR,'DURATION':duration,'narration':narration,'scenes':[{**x,'start':INTRO+x['start']} for x in phases]};exec(code[a:b],ctx);sf.write(P/'assets/fullmix.wav',narration+ctx['music'],SR)
oldcaps=json.loads((R/'captions.json').read_text());segcaps=json.loads((P/'captions.json').read_text());bcaps=json.loads((P/'business-captions.json').read_text());caps=[{**c,'end':min(c['end'],OPEN)} for c in oldcaps if c['start']<OPEN]+[{**c,'start':OPEN+c['start'],'end':OPEN+c['end']} for c in bcaps if c['start']<buildDuration]+[{**c,'start':INTRO+c['start'],'end':INTRO+c['end']} for c in segcaps]+[{**c,'start':closeStart+c['start']-buildDuration,'end':closeStart+c['end']-buildDuration} for c in bcaps if c['start']>=buildDuration]
(P/'full-captions.json').write_text(json.dumps(caps,indent=2));(P/'edit.json').write_text(json.dumps({'duration':duration,'closeStart':closeStart,'intro':OPEN,'architectureStart':INTRO,'builderDuration':buildDuration,'businessPhases':businessph,'phases':phases},indent=2))
def extract(path,stageid):
 h=path.read_text();css=re.search(r'<style>(.*?)</style>',h,re.S).group(1)
 body=h[h.index('<body>')+6:h.index('<script src=')]
 body=re.sub(r'<audio\b.*?</audio>','',body,flags=re.S);body=re.sub(r'<div id="caption\d+".*?</div>','',body,flags=re.S)
 body=re.sub(r' data-(?:composition-id|start|duration|width|height|track-index)="[^"]*"','',body)
 body=body.replace('id="stage"',f'id="{stageid}"');css=css.replace('#stage',f'#{stageid}')
 script=h[h.rindex('<script>')+8:h.rindex('</script>')]
 script=re.sub(r'window\.__timelines=.*?tl.seek\(0\);','',script,flags=re.S)
 # review source uses a two-part registration statement.
 script=re.sub(r"window\.__timelines=window\.__timelines\|\|\{\};window\.__timelines\['sail-connected'\]=tl;tl.seek\(0\);",'',script)
 return css,body,script
oc,ob,oj=extract(R/'index.html','old-stage');sc,sb,sj=extract(S/'index.html','seat-stage')
# Correct the earlier seat example to the same 3+3 cabin geometry.
rows=[]
for r in range(3):
 for c in range(7):
  if c==3:rows.append('<div class="aisle"></div>')
  else:
   j=c if c<3 else c-1;i=r*6+j;rows.append(f'<div class="seat" id="seat{i}">{11+r}{"ABCDEF"[j]}</div>')
ob=re.sub(r'(<div class="seatgrid">).*?(</div></div><h3>)',lambda m:m.group(1)+''.join(rows)+m.group(2),ob,flags=re.S)
oc+=' .seatgrid{grid-template-columns:repeat(3,1fr) 24px repeat(3,1fr);gap:10px;padding:20px 8px;height:320px}.seat{font-size:24px}'
sb=sb.replace('<div class="home"></div></div></div>','<div class="home"></div></div><div class="clickpulse" data-layout-ignore></div></div>',1)
sc+=' .clickpulse{position:absolute;left:72px;top:397px;width:30px;height:30px;border:3px solid #315cf1;border-radius:50%;background:#315cf115;opacity:0;z-index:10;pointer-events:none}'
sb=sb.replace('M3 19 12 4l9 15-9-5-9 5Z','M5 19V5L19 19V5')
sb=sb.replace('viewBox="0 0 64 64"','viewBox="0 0 80 80"').replace('M32 6 59 54H8L28 19 44 38 32 6Z','M39 7C41 5 44 6 45 9L73 68C74 70 72 73 69 73H13C10 73 9 70 11 68L31 40L53 52L35 32Z')
# Send the first packet only after the camera settles.
a=sj.index("tl.to('.token',{opacity:1");b=sj.index("tl.to('.requestline'",a);packet=sj[a:b]
for old,new in [('},.5)','},1.5)'),('},.65)','},1.65)'),('},1.3)','},2.3)'),('},1.95)','},2.95)')]:packet=packet.replace(old,new)
sj=sj[:a]+packet+sj[b:]
# The same preview stays mounted through builder and architecture.
sj=sj.replace("tl.set('.widget',{opacity:0},0);",'').replace("tl.to('.widget',{opacity:1,duration:.45},6.5);",'')
sc+=' .waiting{display:none}.widget{opacity:1}'
# Show selection, explicit confirmation, then the mutation request.
for before,after in [('},10.5);','},11.7);'),('},11.15);','},12.35);'),('},11.8);','},13);')]:sj=sj.replace(before,after)
sj+="tl.fromTo('.clickpulse',{opacity:0,scale:.4},{opacity:1,scale:1.6,duration:.3,immediateRender:false},10);tl.to('.clickpulse',{opacity:0,duration:.2},10.3);tl.set('.clickpulse',{left:173,top:556},11.5);tl.fromTo('.clickpulse',{opacity:0,scale:.4},{opacity:1,scale:1.6,duration:.25,immediateRender:false},11.5);tl.to('.clickpulse',{opacity:0,duration:.2},11.75);"
ob=ob.replace('Make the moment yours.','Built once. Ready where customers need you.')
oc+=' .closeword{font-size:75px;line-height:1.08}'
fonts=''.join(re.findall(r'@font-face\{[^}]*\}',oc));oc=re.sub(r'@font-face\{[^}]*\}','',oc);sc=re.sub(r'@font-face\{[^}]*\}','',sc)
caphtml=''.join(f'<div id="full-caption-{i}" class="caption clip" data-start="{c["start"]}" data-duration="{max(.08,min(c["end"],caps[i+1]["start"] if i+1<len(caps) else duration)-c["start"])}" data-track-index="4">{html.escape(c["text"])}</div>' for i,c in enumerate(caps))
base='''*{box-sizing:border-box}html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#f2f5fa;font-family:DM;color:#111c32}#master{position:relative;width:1080px;height:1920px;overflow:hidden}.layer{position:absolute;inset:0;width:1080px;height:1920px}#old-sequence{z-index:1}#seat-sequence{z-index:3;opacity:0}#old-sequence .systems,#old-sequence .socket,#old-sequence .bridge,#old-sequence .lf-host,#old-sequence .lf-arrow-label,#old-sequence .token{display:none!important}#seat-sequence .story{display:none}.caption{position:absolute;bottom:110px;left:90px;width:900px;text-align:center;font-size:39px;line-height:1.2;padding:18px;background:#f2f5faed;border-radius:20px;z-index:20}'''
js='''function authored(fn,scope){let out;gsap.context(()=>{out=fn()},scope);return out;}
const oldtl=authored(()=>{'''+oj+'''\nreturn tl;},document.getElementById('old-sequence'));
const seattl=authored(()=>{'''+sj+'''\nreturn tl;},document.getElementById('seat-sequence'));
const tl=gsap.timeline({paused:true});
'''
js+=f"tl.fromTo(oldtl,{{time:0}},{{time:{OPEN},duration:{OPEN},ease:'none',immediateRender:false}},0);\n"
js+=(P/'builder-animation.js').read_text().replace('__OPEN__',str(OPEN)).replace('__ARCH__',str(INTRO)).replace('__BRAND__',str(OPEN+businessph['brand']['start'])).replace('__CONNECT__',str(OPEN+businessph['connect']['start'])).replace('__REUSE__',str(OPEN+businessph['reuse']['start']))
for i,ph in enumerate(phases):js+=f"tl.fromTo(seattl,{{time:{i*5}}},{{time:{(i+1)*5},duration:{ph['duration']},ease:'none',immediateRender:false}},{INTRO+ph['start']});\n"
# Explicit confirmation before mutation; same map persists.
js+="seattl.set('#seat-sequence .button',{textContent:'Reserving…'},11.7);\n"
js+=f"tl.set('#old-sequence',{{display:'block',opacity:1}},{closeStart});tl.set('#old-sequence #phone',{{display:'none'}},{closeStart});tl.fromTo(oldtl,{{time:{CLOSE}}},{{time:{OLDEND},duration:{OLDEND-CLOSE},ease:'none',immediateRender:false}},{closeStart});\n"
js+=f"tl.to('#seat-sequence .phone',{{scale:1.756,x:0,y:337.5,duration:1.25,ease:'power3.inOut'}},{closeStart});tl.to('#seat-sequence .panel,#seat-sequence .routes,#seat-sequence .token,#seat-sequence .arrowtext',{{opacity:0,duration:.65}},{closeStart});tl.to('#seat-sequence .phone',{{scale:1.22,y:446,duration:1.25,ease:'power3.inOut'}},{closeStart+7.8});\n"
js+="window.__timelines={'sail-final':tl};tl.seek(0);"
h=f'''<!doctype html><html><head><meta charset="utf-8"><title>Sail — connected experiences</title><style>{fonts}{base}{(P/'builder.css').read_text()}@scope (#old-sequence) {{{oc}}}@scope (#seat-sequence) {{{sc}}}</style></head><body><div id="master" data-composition-id="sail-final" data-start="0" data-duration="{duration}" data-width="1080" data-height="1920" data-fps="60"><div id="old-sequence" class="layer">{ob}</div>{(P/'builder.html').read_text()}<div id="seat-sequence" class="layer">{sb}</div>{caphtml}<audio class="clip" id="full-narration" src="assets/fullmix.wav" data-start="0" data-duration="{duration}" data-track-index="2"></audio></div><script src="assets/gsap.min.js"></script><script>{js}</script></body></html>'''
(P/'index.html').write_text(h);print('DURATION',duration,'CLOSE',closeStart)
