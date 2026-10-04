// Place preview (civic buildings): node tools/dev/town/pview.js <placeId> [outPrefix] [extra.js,...]
// Injects .claude/places/<id>_set.js and .claude/places/<id>.js (PLACE_DEF.<id>, TM_BODY.p_<id>), registers the place, rebuilds the
// world map and shoots: <out>_map_a/_map_b (close up from the door side, two angles), _map_night, _map_wide, then walks inside
// with the staff on duty: _in1/_in2 (+ _up1/_up2 for an upper floor). Prints triangles, errors and a pet clip check. Solo mode only.
const {execFileSync}=require('child_process'),fs=require('fs'),path=require('path');
const [id,outA,extraA]=process.argv.slice(2);if(!id){console.log('usage: node pview.js <placeId> [outPrefix] [extra.js,...]');process.exit(1)}
const ROOT=(()=>{let d=__dirname;while(!fs.existsSync(path.join(d,'index.html'))&&path.dirname(d)!==d)d=path.dirname(d);return d})();
const PD=path.join(ROOT,'.claude','places');
const files=[`${id}_set.js`,`${id}.js`].map(f=>path.join(PD,f)).filter(f=>fs.existsSync(f)).concat(extraA?extraA.split(','):[]);
const out=outA||path.join(PD,'out',id);fs.mkdirSync(path.dirname(out),{recursive:true});
const test=path.join(PD,'out',`_pv_${id}.js`);
fs.writeFileSync(test,`module.exports=async({ev,pg,wait,log})=>{
  const OUT=${JSON.stringify(out)},key='p_${id}',K=JSON.stringify(key);
  const shot=n=>pg.screenshot({path:OUT+'_'+n+'.png',animations:'disabled',timeout:180000});
  log('register',await ev("for(const k in PLACE_DEF)SHOPS['p_'+k]=placeShop(k);if(state.wmap){state.wmap.pl=(state.wmap.pl||[]).filter(q=>!PLACE_DEF[q]);worldV4(state.wmap)}rewardQ.length=0;{const st=document.createElement('style');st.textContent='#reward,#emotes,.toast,#toast,#tmRain,.tm-lab,#tmWheelBtn,.tm-top,#tmCard{display:none!important}';document.head.appendChild(st)}[!!SHOPS[K],!!TM_BODY[K]]".replace(/K/g,K)));
  const P0=await ev("JSON.stringify(PLACES['${id}'])");const P=JSON.parse(JSON.parse(P0));const st=Object.values(P.staff)[0],hr=st[0]+.5;
  log('map',await ev("skyHourOverride="+hr+";showMap();1"));for(let i=0;i<120;i++){if(await ev("tm.pending?0:1")==='1')break;await wait(1000)}await wait(1500);
  log('built',await ev("(()=>{const o=tm.bld[K];if(!o)return'not on the map';let t=0,m=0;o.traverse(q=>{if(q.isMesh){m++;t+=(q.geometry.idx?q.geometry.idx.length:0)/3}});return{at:state.wmap.b[K],pos:[o.position.x.toFixed(1),o.position.z.toFixed(1),o.rotation.y.toFixed(2)],meshes:m,tris:Math.round(t)}})()".replace(/K/g,K)));
  const cam=async(n,dy,pitch,zoom,hour)=>{const cr=await ev(\`(()=>{const o=tm.bld[\${K}];tm.open=false;tw.follow=false;tm.focus=null;const G_=tw.grid;tw.grid=null;skyHourOverride=\${hour};tmTodT=0;
      const v=state.wmap.b[\${K}],ft=tmFoot(\${K},v[2]);tm.tgtTo.set(v[0]+ft[0]/2-TM_W/2,0,v[1]+ft[1]/2-TM_D/2);tm.tgt.copy(tm.tgtTo);tm.yaw0=1;tm.yaw=Math.atan2(-Math.cos(v[2]*Math.PI/2),Math.sin(v[2]*Math.PI/2))+(\${dy});tm.pitch=\${pitch};tm.zoom=\${zoom};tm.zoomTo=null;for(let i=0;i<10;i++)tmFrame(.1);tw.grid=G_;return 1})()\`);if(cr!=='1')log('cam',cr);await shot(n)};
  await cam('map_a',-.5,.5,.075,hr);await cam('map_b',.7,.42,.075,hr);await cam('map_night',-.3,.5,.075,22);await cam('map_wide',-.4,.75,.2,hr);
  await ev("gc=null;tm.open=true;closeMap();1");await wait(800);
  log('travel',await ev("sandbox=null;skyHourOverride="+hr+";travelTo(K);1".replace(/K/g,K)));await wait(4500);
  log('inside',await ev("[away&&away.key,away&&away.keepers.map(k=>k.kind),away&&away.plan&&away.plan.levels.length]"));
  const sIn=async(n,yaw)=>{await ev(\`gc=null;cam.yaw=\${yaw};1\`);await wait(1500);await ev("gc={open:true};renderer.render(scene,camera);1");await shot(n);await ev("gc=null;1")};
  await sIn('in1',.8);await sIn('in2',-.7);
  const lv=await ev("away&&away.plan?away.plan.levels.length:1");
  if(+lv>1){await ev("setLevel(1);1");await wait(1500);await sIn('up1',.8);await sIn('up2',-.7);await ev("setLevel(0);1")}
  log('pet clip check',await ev("const pb=new THREE.Box3().setFromObject(pet.group),hits=[];away.objs.forEach((o,id)=>{const b=new THREE.Box3().setFromObject(o);if(b.min.x<pb.max.x&&b.max.x>pb.min.x&&b.min.z<pb.max.z&&b.max.z>pb.min.z&&b.min.y<pb.max.y)hits.push(away.items.get(id).k)});hits"));
};`);
try{process.stdout.write(execFileSync('node',[path.join(__dirname,'run.js'),test,...(files.length?[files.join(',')]:[])],{encoding:'utf8',timeout:1200000}))}catch(e){console.log(e.stdout||'',e.message)}
