// Furniture set preview: injects a set file (a single SET_DEF({...}) call), renders every piece of that set on a contact sheet,
// then furnishes the room with the whole set (its floor and wallpaper painted everywhere) and shoots it from two angles.
// Usage: node tools/dev/town/sview.js <setfile.js> <outPrefix>   or   node tools/dev/town/sview.js --set <existingSetKey> <outPrefix>
// Writes <outPrefix>_pieces.png, <outPrefix>_room.png, <outPrefix>_room2.png and prints per-piece size/mesh/triangle counts and errors.
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=(()=>{for(const p of [path.join(__dirname,'..','pw','node_modules','playwright'),path.join(__dirname,'..','..','..','.claude','pw','node_modules','playwright'),'playwright']){try{return require(p)}catch(_){}}throw new Error('Install Playwright: cd .claude/pw && npm i playwright')})();
const ROOT=(()=>{let d=__dirname;while(!fs.existsSync(path.join(d,'index.html'))&&path.dirname(d)!==d)d=path.dirname(d);return d})();
let [file,out]=process.argv.slice(2);const OUT3=process.argv[4];
if(!file||!out){console.log('usage: node sview.js <setfile.js> <outPrefix>');process.exit(1)}
const MIME={'.html':'text/html','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.webmanifest':'application/json','.css':'text/css'};
// `--set <key>` renders a set that's already in index.html
const EXIST=file==='--set';const src=EXIST?'':fs.readFileSync(file,'utf8');const KEY=EXIST?out:(src.match(/set\s*:\s*\{\s*k\s*:\s*['"]([\w]+)['"]/)||[])[1];
if(EXIST)out=OUT3;
if(!KEY){console.log('could not find set:{k:\'...\'} in the file');process.exit(1)}
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);
  if(p.endsWith('/firebase-config.js')){r.writeHead(200,{'Content-Type':'text/javascript'});return r.end('window.R42_FIREBASE=null;')}
  if(p.endsWith('/sw.js')){r.writeHead(404);return r.end()}
  if(p==='/'||p.endsWith('/index.html')){let h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
    h=h.replace('/* </resident-sets> */',()=>src+'\n/* </resident-sets> */');h=h.replace('const clock=',()=>';window.__T={f:c=>eval(c)};const clock=');
    r.writeHead(200,{'Content-Type':'text/html','Cache-Control':'no-store'});return r.end(h)}
  // a set icon that only exists in the scratch folder yet
  if(/\/assets\/icons\/set-\w+\.svg$/.test(p)&&!fs.existsSync(path.join(ROOT,p))){const alt=path.join(path.dirname(path.resolve(file)),path.basename(p));if(fs.existsSync(alt)){r.writeHead(200,{'Content-Type':'image/svg+xml'});return r.end(fs.readFileSync(alt))}}
  const f=path.join(ROOT,p);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream','Cache-Control':'no-store'});r.end(b)})});
srv.listen(0,'127.0.0.1',async()=>{const port=srv.address().port;let br;
  try{br=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
    const pg=await br.newPage({viewport:{width:900,height:900}});const errs=[];
    pg.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
    await pg.addInitScript(()=>{try{localStorage.r42coach='1'}catch(_){}});
    await pg.goto(`http://127.0.0.1:${port}/index.html`);
    try{await pg.waitForFunction(()=>window.__T&&__T.f('!!state&&ready'),null,{timeout:90000})}catch(e){console.log('app did not start\n'+errs.join('\n'));process.exitCode=2;return}
    await pg.waitForTimeout(2500);
    const info=await pg.evaluate(K=>__T.f(`(()=>{const K=${JSON.stringify(K)};if(!SETMAP[K])return{err:'SET_DEF for '+K+' did not register (syntax error or SET_DEF threw?)'};
      gc={open:true};pet.group.visible=false;{const st=document.createElement('style');st.textContent='body>*:not(canvas):not(:has(canvas)){display:none!important}';document.head.appendChild(st)}
      const pieces=CAT.filter(c=>c.set===K),res=[];itemRoot.visible=false;
      const cols=4,cw=300,ch=320,rows=Math.ceil(pieces.length/cols),sheet=document.createElement('canvas');sheet.width=cols*cw;sheet.height=rows*ch;const x=sheet.getContext('2d');x.fillStyle='#F3EEF8';x.fillRect(0,0,sheet.width,sheet.height);
      const W=renderer.domElement.width,H=renderer.domElement.height;
      pieces.forEach((c,i)=>{let o;try{o=buildItem({id:'pv'+i,k:c.k,c:c.dc||0,x:0,z:0,r:0,w:0,u:0,y:c.y})}catch(e){res.push({k:c.k,err:String(e&&e.stack||e).slice(0,400)});return}
        const holder=new THREE.Group();holder.add(o);o.position.set(0,0,0);o.rotation.set(0,0,0);scene.add(holder);holder.updateMatrixWorld(true);
        const B=new THREE.Box3().setFromObject(holder),sz=new THREE.Vector3(),cc=new THREE.Vector3();B.getSize(sz);B.getCenter(cc);let m=0,tr=0;holder.traverse(q=>{if(q.isMesh){m++;tr+=(q.geometry.idx?q.geometry.idx.length:0)/3}});
        const d=Math.max(sz.x,sz.y,sz.z)*2.1+.6,yaw=c.wall?0:.6;camera.fov=35;camera.aspect=W/H;camera.updateProjectionMatrix();camera.position.set(cc.x+Math.sin(yaw)*d*.92,cc.y+d*.38,cc.z+Math.cos(yaw)*d*.92);camera.lookAt(cc);
        try{updLighting(1)}catch(_){}renderer.render(scene,camera);const sq=Math.min(W,H);x.drawImage(renderer.domElement,(W-sq)/2,(H-sq)/2,sq,sq,(i%cols)*cw,Math.floor(i/cols)*ch,cw,cw);
        x.fillStyle='#3B1273';x.font='bold 15px sans-serif';x.fillText((c.n+' ['+c.fn+']').slice(0,34),(i%cols)*cw+6,Math.floor(i/cols)*ch+cw+15);
        scene.remove(holder);res.push({k:c.k,fn:c.fn,size:[sz.x,sz.y,sz.z].map(v=>+v.toFixed(2)),meshes:m,tris:Math.round(tr)})});
      window.__sheet=sheet.toDataURL('image/png');
      // the set's door and window, if it has them (dw in SET_DEF): a second small sheet
      if(THEME_DW[K]&&THEME_DW[K].g===SETMAP[K].n){const sh2=document.createElement('canvas');sh2.width=2*cw;sh2.height=ch;const y=sh2.getContext('2d');y.fillStyle='#F3EEF8';y.fillRect(0,0,sh2.width,sh2.height);
        [['door',()=>buildDoorModel(K).g],['window',()=>buildWindowModel(K)]].forEach(([nm,f],i)=>{let o;try{o=f()}catch(e){res.push({k:nm,err:String(e&&e.stack||e).slice(0,400)});return}const holder=new THREE.Group();holder.add(o);scene.add(holder);holder.updateMatrixWorld(true);
          const B=new THREE.Box3().setFromObject(holder),sz=new THREE.Vector3(),cc=new THREE.Vector3();B.getSize(sz);B.getCenter(cc);let tr=0;holder.traverse(q=>{if(q.isMesh)tr+=(q.geometry.idx?q.geometry.idx.length:0)/3});
          const d=Math.max(sz.x,sz.y)*2+.6;camera.position.set(cc.x+d*.25,cc.y+d*.12,cc.z+d*.96);camera.lookAt(cc);try{updLighting(1)}catch(_){}renderer.render(scene,camera);const sq=Math.min(W,H);y.drawImage(renderer.domElement,(W-sq)/2,(H-sq)/2,sq,sq,i*cw,0,cw,cw);
          y.fillStyle='#3B1273';y.font='bold 15px sans-serif';y.fillText((nm==='door'?THEME_DW[K].n+' door':THEME_DW[K].wn).slice(0,34),i*cw+6,cw+15);scene.remove(holder);res.push({k:nm,size:[sz.x,sz.y,sz.z].map(v=>+v.toFixed(2)),tris:Math.round(tr)})});
        window.__dw=sh2.toDataURL('image/png')}
      return{n:pieces.length,res}})()`),KEY);
    if(info.err){console.log(info.err+'\n'+errs.join('\n'));process.exitCode=2;return}
    console.log(JSON.stringify(info.res,null,0).replace(/\},\{/g,'},\n{'));
    fs.writeFileSync(out+'_pieces.png',Buffer.from((await pg.evaluate(()=>window.__sheet)).split(',')[1],'base64'));
    {const dw=await pg.evaluate(()=>window.__dw||null);if(dw)fs.writeFileSync(out+'_doorwin.png',Buffer.from(dw.split(',')[1],'base64'))}
    // furnish the room with the whole set
    await pg.evaluate(K=>__T.f(`(()=>{const K=${JSON.stringify(K)};setSandbox(true);itemRoot.visible=true;const pieces=CAT.filter(c=>c.set===K);
      if(TILESETS.f['s_'+K])state.tf=state.tf.map(()=>'s_'+K);if(TILESETS.w['s_'+K])state.tw=state.tw.map(()=>'s_'+K);
      const fl=pieces.filter(c=>!c.wall),wl=pieces.filter(c=>c.wall),items=[],n=Math.ceil(Math.sqrt(fl.length)),sp=Math.min(1.9,6.2/n);
      fl.forEach((c,i)=>{const gx=i%n,gz=Math.floor(i/n);items.push({id:'s'+i,k:c.k,c:c.dc||0,x:(gx-(n-1)/2)*sp,z:(gz-(n-1)/2)*sp,r:0})});
      wl.forEach((c,i)=>{items.push({id:'w'+i,k:c.k,c:c.dc||0,w:i%2?3:0,u:(Math.floor(i/2)-.5)*2.2,y:c.y||1.6})});
      if(THEME_DW[K]&&THEME_DW[K].g===SETMAP[K].n){state.downs=DOOR_KEYS.slice();state.door=Object.assign({},state.door,{s:K});items.push({id:'win0',k:'win_'+K,c:0,w:3,u:1.2,y:1.85});try{syncDoor()}catch(_){}}
      state.items=items;syncScene();rewardQ.length=0;return 1})()`),KEY);
    await pg.waitForTimeout(2500);
    for(const [n,yaw,pitch] of [['room',.8,.6],['room2',-.7,.45]]){await pg.evaluate(([yaw,pitch])=>__T.f(`cam.yaw=${yaw};cam.pitch=${pitch};cam.dist=11.5;for(let i=0;i<30;i++){try{updCam(1/30)}catch(_){}}walls.forEach((w,i)=>{const d=WALLDEF[i];w.g.visible=(camera.position.x-d.c[0])*d.n[0]+(camera.position.z-d.c[1])*d.n[1]>2.5});try{updLighting(1)}catch(_){}renderer.render(scene,camera);1`),[yaw,pitch]);
      await pg.waitForTimeout(400);await pg.screenshot({path:out+'_'+n+'.png'})}
    if(errs.length)console.log('errors:\n'+errs.slice(0,20).join('\n'));else console.log('no errors');
  }catch(e){console.log('harness error: '+e.message);process.exitCode=3}
  finally{if(br)await br.close();srv.close()}});
