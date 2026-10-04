// broad regression sweep: every event, every hour, every building, the map at every zoom, every menu page, conversations
module.exports=async({ev,pg,wait,log})=>{const errs=[];pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
 await ev("rewardQ.length=0;1");await ev("showMap();1");for(let i=0;i<90;i++){if(await ev("tm.pending")==='false')break;await wait(1000)}await wait(1500);
 const R=async(name,code)=>{const r=await ev(code);if(typeof r==='string'&&r.startsWith('ERR'))errs.push(name+': '+r.split('\n').slice(0,3).join(' | '));return r};
 const PART=process.env.PART||'123456';
 if(PART.includes('1')){// 1. events (house ones, place ones, festivals) x a few hours: where everyone is, crews, plans, cards
 let evs=JSON.parse(await ev("JSON.stringify(EVENTS.map(e=>e.k))"));if(typeof evs==="string")evs=JSON.parse(evs);
 for(const k of [...evs,null]){for(const h of [8,12,16,19,21]){await R('ev '+k+' '+h,`(()=>{dbgEvent=${k?JSON.stringify(k):'null'};skyHourOverride=${h};for(const q in evMemo)delete evMemo[q];const E=eventNow();
   Object.keys(RESIDENTS).forEach(r=>{resWhere(r);lifeWhere(r);resUntil(r);if(typeof twPlan==='function')twPlan(r)});Object.keys(SHOPS).forEach(s=>{shopCrew(s);const S=SHOPS[s];if(S.house)houseVisit(S.hid);if(S.place)placeVisit(S.pid)});
   tmPeopleCard();$('#tmCard').hidden=true;if(typeof tmWhatsOnCard==='function'){tmWhatsOnCard();$('#tmCard').hidden=true}return E?evAt(E):'-'})()`)}}
 await R('fest',"(()=>{dbgEvent=null;dbgFest='summer';for(const q in evMemo)delete evMemo[q];skyHourOverride=12;const E=eventNow();Object.keys(RESIDENTS).forEach(r=>{resWhere(r);lifeWhere(r)});shopCrew('p_townhall');dbgFest=null;for(const q in evMemo)delete evMemo[q];return evAt(E)})()");
 }
 if(PART.includes('2')){// 2. the map: every zoom (in close too), tilt, a walk tick, night
 await R('map zoom',`(()=>{tm.open=false;const out=[];for(const z of [1.4,.9,.5,.2,.08,.04,.02]){tm.zoom=z;tm.zoomTo=null;for(let i=0;i<3;i++){twTick(.05,tm.t+=.05);tmFrame(.05)}out.push(z)}skyHourOverride=22;tmTodT=0;tmFrame(.05);skyHourOverride=12;tmTodT=0;tmFrame(.05);return out.join(',')})()`);
 await R('map pinch',`(()=>{const cv=$('#tmc'),r=cv.getBoundingClientRect(),f=(t,id,x,y)=>cv.dispatchEvent(new PointerEvent(t,{pointerId:id,clientX:x,clientY:y,pointerType:'touch',bubbles:true}));const z0=tm.zoom;
   f('pointerdown',1,r.left+150,r.top+300);f('pointerdown',2,r.left+250,r.top+400);for(let i=1;i<=10;i++){f('pointermove',1,r.left+150-i*8,r.top+300-i*8);f('pointermove',2,r.left+250+i*8,r.top+400+i*8)}f('pointerup',1,0,0);f('pointerup',2,0,0);return z0.toFixed(3)+'->'+tm.zoom.toFixed(3)})()`);
 }
 if(PART.includes('3')){// 3. inside every building (staff on), a keeper close-up and its actions list
 let keys=JSON.parse(await ev("JSON.stringify(Object.keys(SHOPS))"));if(typeof keys==="string")keys=JSON.parse(keys);
 await ev("closeMap();1");await wait(800);
 for(const k of keys){await R('in '+k,`(()=>{dbgAllHome=false;dbgEvent=null;skyHourOverride=${keys.indexOf(k)%2?11:15};sandbox=sandbox||null;travelTo(${JSON.stringify(k)});return 1})()`);await wait(3200);
   if(keys.indexOf(k)%6===0)log('mem '+k,await ev("(performance.memory?Math.round(performance.memory.usedJSHeapSize/1e6)+'MB':'?')+' tex '+Object.keys(renderer._tex||{}).length+' geo '+(renderer._vao?(renderer._vao.size||Object.keys(renderer._vao).length):'?')"));
   await R('crew '+k,`(()=>{if(!away)return'not there';const K=away.keepers&&away.keepers[0];if(K){kOpen(K);const a=kActs().map(x=>x[0]);kClose(true);return a.join(',')}return'empty'})()`)}
 await ev("travelTo('home');1");await wait(3000);
 }
 if(PART.includes('4')){// 4. every menu page and the pet page
 let tabs=JSON.parse(await ev("JSON.stringify([...MENU_KIDS,'pet','wardrobe','decorate','town','inbox','journal','steps'])"));if(typeof tabs==="string")tabs=JSON.parse(tabs);
 for(const t of tabs)await R('tab '+t,`(()=>{setTab(${JSON.stringify(t)});return document.querySelector('.sheet-body')?document.querySelector('.sheet-body').innerHTML.length:0})()`);
 await R('tab close',"(()=>{setTab(null);return 1})()");
 }
 if(PART.includes('5')){// 5. a conversation with a few residents on the map
 await ev("showMap();1");await wait(2500);
 await R('talk',`(()=>{tm.open=false;twResSync();const out=[];for(const k of ['baker','book','mayor','jam','cloud']){try{cvStart(k);for(let i=0;i<4&&cv;i++){const b=document.querySelector('#cvCh button');if(b)b.click()}if(cv)cvEnd();out.push(k)}catch(e){out.push(k+':'+e.message)}}return out.join(',')})()`);
 }
 log('events/zoom/buildings/tabs done, errors '+errs.length);errs.slice(0,40).forEach(e=>log(e))};
