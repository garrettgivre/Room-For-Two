// Save/reload check (v106): fills the save through the game's own code (sweep3 clicks through most systems, then the rest are
// called directly), saves, reloads, and diffs every field of `state`. Anything that changes or vanishes across a reload is reported.
// Run before releases that touch saved state:  node tools/dev/town/run.js tools/dev/town/persist.js
// Background: v75-v104 lost the whole town layout on every load (a version number cut by |0); nothing on screen showed it.
const path=require('path');
const VOLATILE=/^(rev|kr|visits|jrT|cv|minV|ibT|pet\.(s\..*|hunger|fun|energy|clean|affection|t|mood|auto\..*|last.*)|wish(\..*)?|td\.(prog.*|nudge.*)|weather.*)$/;
module.exports=async({ev,pg,wait,log})=>{const errs=[];pg.on('pageerror',e=>errs.push(e.message));
 const J=async c=>{let r=await ev(c);try{r=JSON.parse(r)}catch(_){}if(typeof r==='string'){try{r=JSON.parse(r)}catch(_){}}return r};
 const ready=async()=>{for(let i=0;i<300;i++){if(await ev('typeof ready!=="undefined"&&ready&&tm&&!tm.pending&&!ARR.on')==='true')return;await wait(300)}};
 await ready();
 if(!process.env.PERSIST_QUICK){log('running sweep3 to fill the save...');const q=[];await require(path.join(__dirname,'sweep3.js'))({ev,pg,wait,log:(...a)=>q.push(a.join(' '))});
   log('  sweep3:',q.filter(l=>/done/.test(l)).join(' ')||'(finished)')}
 await ev(`(()=>{try{if(sandbox)setSandbox(false)}catch(_){}document.querySelectorAll('#reward,#dlyBox,#shopcard').forEach(e=>e.hidden=true);return 1})()`);
 // everything else, through the real functions
 const fill=await J(`(()=>{const done=[],bad=[];const t=(n,f)=>{try{f();done.push(n)}catch(e){bad.push(n+': '+e.message)}};
   state.btn=(state.btn|0)+5000;state.glim=(state.glim|0)+50;state.tix=(state.tix|0)+500;
   t('gift',()=>giveGift('baker',{t:'inv',id:Object.keys(state.inv).find(k=>state.inv[k]>0)||'cookie'},'mail'));
   t('keepsake',()=>keepAdd({k:'letter',n:'Persist test letter',d:'A keepsake made by the save test.'}));
   t('first',()=>firstOf('persisttest','The save test was here.'));
   t('memory',()=>memRec('book','visit',{}));
   t('treasure',()=>treasureGet(TREASURES.find(x=>x.col==='shore').id,true));
   t('fish',()=>treasureGet(TREASURES.find(x=>x.fish).id,true));
   t('wish',()=>toggleWish(CAT.find(c=>!c.gacha&&c.p>0).k));
   t('project',()=>projGive(50));
   t('museum',()=>musDonate());
   t('seeds',()=>{state.seeds=state.seeds||{};state.seeds.berry=(state.seeds.berry|0)+2;plantSeed(0,'berry')});
   t('design',()=>designNew({n:'Persist test',px:new Array(1024).fill(3).map(v=>v.toString(16)).join(''),pal:(DZ_PAL||[]).slice?DZ_PAL.slice():[]}));
   t('kf',()=>{kfAdd('jam',3);const f=kfOf('jam');f.m=f.m||Date.now();f.c=(f.c|0)+1});
   t('journal',()=>jrAdd('The save test wrote this line.','', 'test',Date.now(),''));
   t('feed',()=>logEvent('ran the save test'));
   t('arrange',()=>{const m=tmM();m.d.push(['bench',3,40]);m.r.push([4,40,'gravel']);(m.c||(m.c=[])).push([10,10,2,1,'gravel'])});
   t('ceil',()=>{state.ceil=.42});
   t('door',()=>{state.door=Object.assign({},state.door)});
   saveSoon();return{done,bad}})()`);
 log('filled:',fill.done.join(', '));if(fill.bad.length)log('could not fill:',fill.bad.join(' | '));
 await ev('showMap();1');await wait(2500);await ev('tmClose();1');await wait(800);
 await ev('dirty=true;flush();1');await wait(2500);
 const S1=await J('JSON.stringify(state)');
 await pg.reload();await ready();await wait(1500);await ev('showMap();1');await wait(2500);await ev('tmClose();1');await wait(500);
 const S2=await J('JSON.stringify(state)');
 // deep diff
 const out=[];const walk=(a,b,p)=>{if(out.length>200)return;if(VOLATILE.test(p))return;
   if(a&&typeof a==='object'){if(!b||typeof b!=='object'){out.push(`${p}: was ${JSON.stringify(a).slice(0,80)}, now ${JSON.stringify(b)}`);return}
     if(Array.isArray(a)){if(a.length!==b.length&&!/journal|inbox|feed/.test(p)){out.push(`${p}: length ${a.length} -> ${b.length}`)}const n=Math.min(a.length,b.length);
       if(/^(journal|inbox|feed)$/.test(p)){const sb=new Set(b.map(x=>JSON.stringify(x)));const lost=a.filter(x=>!sb.has(JSON.stringify(x)));if(lost.length)out.push(`${p}: ${lost.length} entries lost, e.g. ${JSON.stringify(lost[0]).slice(0,100)}`);return}
       for(let i=0;i<n;i++)walk(a[i],b[i],p+'['+i+']');return}
     for(const k of Object.keys(a))walk(a[k],b[k],p?p+'.'+k:k);return}
   if(a===0&&b===undefined&&/^inv\./.test(p))return; // empty bag slots are dropped on load
   if(a!==b&&!(typeof a==='number'&&typeof b==='number'&&Math.abs(a-b)<1e-9))out.push(`${p}: ${JSON.stringify(a)} -> ${JSON.stringify(b)}`)};
 walk(S1,S2,'');
 const keys=Object.keys(S1).filter(k=>!VOLATILE.test(k));
 log(`checked ${keys.length} saved fields; ${out.length} differences after a reload`);out.slice(0,80).forEach(l=>log('  '+l));
 log('persist done, differences',out.length,'errors',errs.length);if(errs.length)log(errs.slice(0,5).join('\n'))};
