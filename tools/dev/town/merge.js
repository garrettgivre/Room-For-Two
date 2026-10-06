// Two-phone merge check (v106): both "phones" start from the same save, each makes different changes through the game's own
// functions (as different people), then mergeInto (the three-way merge used by flush/tryRemote) combines them. Reports every
// change that didn't survive. Run:  node tools/dev/town/run.js tools/dev/town/merge.js
module.exports=async({ev,pg,wait,log})=>{
 const J=async c=>{let r=await ev(c);try{r=JSON.parse(r)}catch(_){}if(typeof r==='string'){try{r=JSON.parse(r)}catch(_){}}return r};
 for(let i=0;i<300;i++){if(await ev('typeof ready!=="undefined"&&ready&&tm&&!tm.pending&&!ARR.on')==='true')break;await wait(300)}
 await ev('showMap();1');await wait(2000);await ev('tmClose();1');await wait(500);
 const r=await J(`(()=>{const clone=o=>JSON.parse(JSON.stringify(o)),real=state,realId=myId,quiet=window.toast;window.toast=()=>{};
  state.btn=3000;state.glim=40;state.tix=300;state.seeds={berry:4,potato:4};const fk=CAT.filter(c=>!c.gacha&&c.p>0&&!c.k.startsWith('win_')).map(c=>c.k);
  const base=clone(state);const T=TREASURES.filter(t=>t.col==='shore'),F=TREASURES.filter(t=>t.fish);
  // what each phone does: [label, action, check(merged) -> true if it survived]
  const ops={A:[],B:[]};const add=(side,n,f,c)=>ops[side].push([n,f,c]);
  const side=(s,who)=>{const o=s==='A'?0:1;
    add(s,'journal line',()=>jrAdd('Journal line from '+who,'','test',Date.now()+o,''),M=>M.journal.some(j=>j.t==='Journal line from '+who||j.text==='Journal line from '+who||JSON.stringify(j).includes('Journal line from '+who)));
    add(s,'note in Footprints',()=>logEvent('note from '+who),M=>JSON.stringify(M.feed).includes('note from '+who));
    add(s,'keepsake',()=>keepAdd({k:'letter',n:'Keepsake '+who,d:'x'}),M=>JSON.stringify(M.keeps).includes('Keepsake '+who));
    add(s,'scrapbook first',()=>firstOf('first_'+who,'First by '+who),M=>!!(M.firsts||{})['first_'+who]);
    add(s,'design',()=>designNew({n:'Design '+who,px:new Array(1024).fill(o+2).map(v=>v.toString(16)).join(''),pal:DZ_PAL.slice()}),M=>(M.designs||[]).some(d=>d.n==='Design '+who));
    add(s,'garden plot',()=>plantSeed(o,o?'potato':'berry'),M=>!!(M.garden&&(M.garden.p||M.garden)[o]&&((M.garden.p||M.garden)[o].s===(o?'potato':'berry'))));
    add(s,'museum',()=>{treasureGet((o?F:T)[0].id,true);musDonate()},M=>!!(M.museum||{})[(o?F:T)[0].id]);
    add(s,'project money',()=>projGive(50),M=>(M.proj&&M.proj.got&&M.proj.got[who])>=50);
    add(s,'wishlist',()=>toggleWish(fk[o]),M=>!!(M.fwish||{})[fk[o]]);
    add(s,'bought furniture',()=>{state.fown[fk[5+o]]=(state.fown[fk[5+o]]|0)+1},M=>(M.fown||{})[fk[5+o]]>=1);
    add(s,'placed furniture',()=>{state.items.push({id:'it_'+who,k:fk[10+o],x:o?1:-1,z:0,r:0,c:0,by:who})},M=>M.items.some(i=>i.id==='it_'+who));
    add(s,'painted a floor tile',()=>{state.tf[o]=o?'f:diner':'f:motel'},M=>M.tf[o]===(o?'f:diner':'f:motel'));
    add(s,'town decoration',()=>{tmMOf('world').d.push(['bench',5+o*3,42])},M=>M.wmap.d.some(q=>q[0]==='bench'&&q[1]===5+o*3&&q[2]===42));
    add(s,'town path',()=>{tmMOf('world').r.push([6+o*3,43,'gravel'])},M=>M.wmap.r.some(q=>q[0]===6+o*3&&q[1]===43));
    add(s,'friendship',()=>kfAdd(o?'jam':'baker',3),M=>(M.kf[o?'jam':'baker']||{}).p>=3);
    add(s,'gift memory',()=>memRec(o?'book':'posy','visit',{}),M=>!!((M.rmem||{})[o?'book':'posy']||{}).visit);
    add(s,'trick practice',()=>{const R=trickRec('twirl');R.by[who]=(R.by[who]|0)+2},M=>(((M.tricks||{}).twirl||{}).by||{})[who]>=2);
    add(s,'spent buttons',()=>{state.btn-=o?100:10},M=>true);
  };side('A','pa');side('B','pb');
  const run=(s,who)=>{state=clone(base);myId=who;const res=[];ops[s].forEach(([n,f])=>{try{f()}catch(e){res.push(n+' threw '+e.message)}});return{st:clone(state),res}};
  const A=run('A','pa'),B=run('B','pb');
  snapBase(base,false);const L=clone(A.st);const ch=mergeInto(L,B.st);
  const lost=[];['A','B'].forEach(s=>ops[s].forEach(([n,,c])=>{let ok=false;try{ok=c(L)}catch(e){ok=false}if(!ok)lost.push((s==='A'?'this phone':'other phone')+': '+n)}));
  const btn=L.btn+' A='+A.st.btn+' B='+B.st.btn+' base='+base.btn,want=base.btn+(A.st.btn-base.btn)+(B.st.btn-base.btn);
  state=real;myId=realId;window.toast=quiet;snapBase(state,false);
  return{merged:Object.keys(ch).length,lost,threw:A.res.concat(B.res),btn:btn+' (want '+want+')'}})()`);
 log('merged keys',r.merged,'| buttons',r.btn);if(r.threw.length)log('threw:',r.threw.join(' | '));
 log(r.lost.length?'LOST after merging:\n  '+r.lost.join('\n  '):'nothing lost');log('merge done, lost',r.lost.length)};
