// headless pinball bot: node tools/dev/pb_sim.js [games]
const fs=require('fs');const src=fs.readFileSync(__dirname+'/../../index.html','utf8');
const a=src.indexOf('  pinball:{n:'),b=src.indexOf('\n  says:{',a);const body=src.slice(a,b).trim().replace(/,$/,'');
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),gFx=()=>{},gBurst=()=>{},PN=()=>'Mochi';
function gLevel(g,sub){g.lv++;g.banner={sub}}
const GAMES=eval('({'+body+'})');const CAT={};const c0=src.indexOf('GAMES.pinball2='),c1=src.indexOf('})})();',c0)+6;eval(src.slice(c0,c1));const D=GAMES[process.argv[3]||'pinball'];D.proj=(g,x,y)=>[x,y];const EV=D.ev,EC={};let PT=0;D.ev=function(g,k){EC[k]=(EC[k]||0)+1;return EV.call(this,g,k)};const MD=D.mDone,MSx={};D.mDone=function(g){const i=g.ms.a.i;(MSx[i]=MSx[i]||[0,0,0])[0]++;return MD.call(this,g)};const P0=D.pts;D.pts=function(g,v,x,y,col,nm){const s0=g.score,r=P0.call(this,g,v,x,y,col,nm);const k=col+(nm?'!':'');CAT[k]=(CAT[k]||0)+(g.score-s0);return r};
const N=+process.argv[2]||60,res=[];let stuck=0,escape=0;const kinds={};
for(let n=0;n<N;n++){const g={w:375,h:700,t:0,score:0,lv:1,over:false,fx:[],pt:[],shake:0,banner:null,time:null};D.init(g);
  const dt=1/60;let hold=[0,0],ph=0,T=0,last={x:0,y:0,t:0};const st={fail:0,mis:0,skill:0,jack:0,eb:0,wiz:0,match:0,mb:0};
  while(!g.over&&T<900){T+=dt;g.t+=dt;
    // launch
    if(D.onLauncher(g)&&!g.chg&&!(g.drainT>0)&&!(g.matchT>0)){if(ph<=0){D.press(g,'p');ph=.1+Math.random()*.9}}
    if(g.chg){ph-=dt;if(ph<=0){g._ch=g.charge;D.release(g,'p')}}if(g.skillT>0)g._sk=[g._ch,g.skill];else if(g._sk){(global.SK=global.SK||[]).push([+g._sk[0].toFixed(2),g._sk[1],g.lanes.join('')]);g._sk=null}
    // flippers
    D.FP.forEach((_,i)=>{const P=D.FP[i],d=D.FD[i],tx=P[0]+d*Math.cos(.52)*D.FL,ty=P[1]+Math.sin(.52)*D.FL;
      const near=[g.b,...g.extra].some(q=>{const ex=tx-P[0],ey=ty-P[1],t=clamp(((q.x-P[0])*ex+(q.y-P[1])*ey)/(ex*ex+ey*ey),0,1),dd=Math.hypot(q.x-P[0]-ex*t,q.y-P[1]-ey*t);return dd<D.R+.05+Math.random()*.03&&q.vy>-.3&&t>.15});
      const sd=i===1?1:0;if(near&&!g.fl[i].up){D.press(g,sd);hold[sd]=.18}if(hold[sd]>0&&i===sd){hold[sd]-=dt;if(hold[sd]<=0)D.release(g,sd)}});
    if(g.served&&!(g.drainT>0)&&!D.onLauncher(g))PT+=dt;const ai=g.ms.a&&g.ms.a.i,dk=g.dm.k,dt0=g.dm.t,sc0=g.score,bv0=g.bonusV;D.upd(g,dt);if(bv0&&!g.bonusV)CAT.bonus=(CAT.bonus||0)+(g.score-sc0);if(g.dm.k!==dk||g.dm.t<dt0){kinds[g.dm.k]=(kinds[g.dm.k]||0)+1;
      if(g.dm.k==='mfail')(MSx[ai]=MSx[ai]||[0,0,0])[1]++;if(g.dm.k==='mfail')st.fail=(st.fail||0)+1;if(g.dm.k==='mdone')st.mis++;if(g.dm.k==='skill')st.skill++;if(g.dm.k==='jackpot')st.jack++;if(g.dm.k==='extra')st.eb++;if(g.dm.k==='wizard')st.wiz++;if(g.dm.k==='multi')st.mb++}
    const B=g.b;if(!isFinite(B.x)||(B.x<-.1||B.x>1.1||B.y<-.1)&&B.y<D.TH){escape++;console.log('escape',JSON.stringify(B),'prev',JSON.stringify(g._pv),'hole',!!g.hole,'extra',g.extra.length,'dm',g.dm.k);break}g._pv={...B};
    if(Math.hypot(B.x-last.x,B.y-last.y)>.02){last={x:B.x,y:B.y,t:T}}else if(T-last.t>8&&!D.onLauncher(g)&&!g.hole&&!(g.drainT>0)&&!(g.matchT>0)){stuck++;console.log('stuck at',B.x.toFixed(3),B.y.toFixed(3));B.vy=1;last.t=T}
  }
  if(g.over&&g.matchWin)st.match++;res.push({s:g.score,lv:g.lv,T:Math.round(T),...st})}
const sc=res.map(r=>r.s).sort((a,b)=>a-b),q=f=>sc[Math.floor(f*(sc.length-1))],avg=k=>(res.reduce((a,r)=>a+r[k],0)/res.length).toFixed(2);
console.log(JSON.stringify({games:N,stuck,escape,p10:q(.1),median:q(.5),p90:q(.9),max:sc[sc.length-1],len:avg('T'),missions:avg('mis'),rank:avg('lv'),skill:avg('skill'),jackpots:avg('jack'),extraBalls:avg('eb'),wizards:avg('wiz'),multiballs:avg('mb'),fails:avg('fail')}));
console.log(kinds);console.log(Object.fromEntries(Object.entries(CAT).map(([k,v])=>[k,Math.round(v/N)]).sort((a,b)=>b[1]-a[1])));

console.log((global.SK||[]).slice(0,25).map(a=>a.join(':')).join(' '));

console.log('missions [done,fail]',JSON.stringify(MSx));

console.log('per minute of play',JSON.stringify(Object.fromEntries(Object.entries(EC).map(([k,v])=>[k,+(v/PT*60).toFixed(2)]))));
