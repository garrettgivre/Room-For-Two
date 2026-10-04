module.exports=async({ev,pg,wait,log})=>{const errs=[];pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
 const R=async(name,code)=>{const r=await ev(code);if(typeof r==='string'&&r.startsWith('ERR'))errs.push(name+': '+r.split('\n').slice(0,3).join(' | '));else log(name,String(r).slice(0,140));return r};
 await wait(3000);await ev("rewardQ.length=0;1");
 // pet care
 await R('care',"(()=>{const out=[];['feed','bath','play','nap','pat'].forEach(a=>{try{if(typeof doAct==='function'){const it=ITEMS.find(i=>i.k===(a==='feed'?'food':a==='bath'?'groom':'toy'));doAct(a==='feed'||a==='bath'||a==='play'?it.id:a)}out.push(a)}catch(e){out.push(a+':'+e.message)}});return out.join(',')})()");
 await wait(2000);
 // decorate: place a piece from storage (sandbox), move it, undo
 await R('decorate',"(()=>{setSandbox(true);setTab('decorate');const k=CAT.find(c=>c.fn==='seat').k;const n0=state.items.length;try{beginBuild();spawn(k);endBuild&&endBuild()}catch(e){return'spawn '+e.message}const n1=state.items.length;try{undoBuild()}catch(e){}setTab(null);setSandbox(false);return n0+'>'+n1})()");
 // arrange: place a decoration and a path on the map, then take them back
 await ev("showMap();1");for(let i=0;i<90;i++){if(await ev("tm.pending")==='false')break;await wait(1000)}
 await R('arrange',"(()=>{tmArrange(true);const m=tmM(),d0=m.d.length,r0=m.r.length;tm.tool='road';tm.ptype='gravel';tmRoad(9,43,true,1);tm.pbrush='ring';tmRoadShape(12,42,14,42);tm.pbrush='line';tmPaths();const r1=m.r.length,c1=(m.c||[]).length;m.r=m.r.filter(q=>!(q[0]===9&&q[1]===43));m.c.pop();tmPaths();tmArrange(false);return [d0,r0,r1,c1].join(',')})()");
 await ev("closeMap();1");await wait(1500);
 // arcade games: open and close each
 await R('games',"(()=>{const out=[];Object.keys(GAMES).forEach(k=>{try{openGame(k);if(typeof closeGame==='function')closeGame();else if(typeof gameClose==='function')gameClose();out.push(k)}catch(e){out.push(k+':'+e.message)}});return out.join(',')})()");
 await wait(1500);
 await R('gacha',"(()=>{try{openGacha();if(typeof closeGacha==='function')closeGacha();return'ok'}catch(e){return'ERR '+e.message}})()");
 await R('wardrobe',"(()=>{setTab('wardrobe');const n=document.querySelectorAll('.sheet-body button').length;setTab(null);return n})()");
 await R('studio',"(()=>{try{openService('hair','bobble');setTab(null);return'ok'}catch(e){return'ERR '+e.message}})()");
 log('sweep2 done, errors '+errs.length);errs.slice(0,30).forEach(e=>log(e))};
