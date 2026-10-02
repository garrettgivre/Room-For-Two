// House preview: node .claude/town/hview.js <kind> [outPrefix]
// Injects .claude/town/houses/<kind>_home.js and <kind>_ext.js (if they exist), then shoots:
//   <out>_map1.png, <out>_map2.png  (the house on the neighbourhood map, two angles, close up)
//   <out>_map_wide.png              (the whole neighbourhood)
//   <out>_in1.png, <out>_in2.png    (inside, resident at home, two camera angles; + _up1/_up2 for an upper floor)
// Prints errors. Uses solo mode (never touches live data).
const {execFileSync}=require('child_process'),fs=require('fs'),path=require('path');
const [kind,outA]=process.argv.slice(2);if(!kind){console.log('usage: node hview.js <kind> [outPrefix]');process.exit(1)}
const H=path.join(__dirname,'houses'),CR=path.join(__dirname,'creatures'),idx=fs.readFileSync(path.join(__dirname,'..','..','index.html'),'utf8'),
  cre=fs.readdirSync(CR).filter(f=>f.endsWith('.js')&&!idx.includes('KEEPERS.'+f.slice(0,-3)+'=function')).map(f=>path.join(CR,f)),
  files=[...cre,...[`${kind}_home.js`,`${kind}_ext.js`].map(f=>path.join(H,f)).filter(f=>fs.existsSync(f))];
const out=outA||path.join(ROOT,'.claude','town','out','h_'+kind);
const test=path.join(ROOT,'.claude','town','out',`_hv_${kind}.js`);
fs.writeFileSync(test,`module.exports=async({ev,pg,wait,log})=>{
  const OUT=${JSON.stringify(out)},key='h_${kind}';
  const shot=n=>pg.screenshot({path:OUT+'_'+n+'.png',animations:'disabled',timeout:90000});
  log('register',await ev("for(const k in HOUSE_DEF)SHOPS['h_'+k]=houseShop(k);state.hmap=null;rewardQ.length=0;{const st=document.createElement('style');st.textContent='#reward,#emotes,.toast,#toast{display:none!important}';document.head.appendChild(st)}[!!SHOPS[key],!!TM_BODY[key]]".replace(/key/g,JSON.stringify(key))));
  log('map',await ev("showMap();1"));await wait(2600);
  const freezeMap=async(n,yaw,zoom,focus)=>{await ev(\`tmUse(HOUSES['${kind}'].hood);$('#tmCard').hidden=true;tm.open=false;gc={open:true};tm.yaw=\${yaw};tm.zoom=\${zoom};tm.focus=\${focus?JSON.stringify(key):'null'};const o=tm.bld[\${JSON.stringify(key)}];if(\${focus}&&o)tm.tgtTo.set(o.position.x,0,o.position.z);else tm.tgtTo.set(0,0,0);for(let i=0;i<12;i++)tmFrame(.5);1\`);await shot(n)};
  await freezeMap('map_wide',-.35,.98,false);await freezeMap('map1',-.35,.55,true);await freezeMap('map2',1.4,.55,true);
  log('night',await ev("skyHourOverride=22;tmTodT=0;1"));await freezeMap('map_night',-.35,.55,true);
  await ev("gc=null;tm.open=true;closeMap();skyHourOverride=null;1");await wait(800);
  const R=await ev("sandbox={};dbgAllHome=true;skyHourOverride=12;travelTo(key);1".replace(/key/g,JSON.stringify(key)));log('travel',R);
  await wait(4200);
  const sIn=async(n,yaw)=>{await ev(\`gc=null;cam.yaw=\${yaw};1\`);await wait(1500);await ev("gc={open:true};renderer.render(scene,camera);1");await shot(n);await ev("gc=null;1")};
  log('inside',await ev("[away&&away.key,away&&away.keepers.map(k=>k.kind),away&&away.plan&&away.plan.levels.length]"));
  await sIn('in1',.8);await sIn('in2',-.7);
  const lv=await ev("away&&away.plan?away.plan.levels.length:1");
  if(+lv>1){await ev("setLevel(1);1");await wait(1500);await sIn('up1',.8);await sIn('up2',-.7)}
  log('pet clip check',await ev("const pb=new THREE.Box3().setFromObject(pet.group),hits=[];away.objs.forEach((o,id)=>{const b=new THREE.Box3().setFromObject(o);if(b.min.x<pb.max.x&&b.max.x>pb.min.x&&b.min.z<pb.max.z&&b.max.z>pb.min.z&&b.min.y<pb.max.y)hits.push(away.items.get(id).k)});hits"));
};`);
try{process.stdout.write(execFileSync('node',[path.join(__dirname,'run.js'),test,files.join(',')],{encoding:'utf8',timeout:600000}))}catch(e){console.log(e.stdout||'',e.message)}
