// Furniture animation preview: renders pieces through their "in use" animation so you can see what moves.
// Usage: node tools/dev/town/aview.js <override.js|--none> <outPrefix> --set <setKey>      (every piece of a set)
//        node tools/dev/town/aview.js <override.js|--none> <outPrefix> --keys k1,k2,k3    (chosen pieces)
// The override file (a single `Object.assign(BUILD,{...});`) is injected near the end of the main script, after every builder.
// Each piece gets one row of 5 frames: at rest, use(.6,.15), use(1.8,.45), use(3.2,.8), then after use(-1,-1) with anim(5).
// The pieces go through buildItem, so the static-mesh merge (bakeStatic) has already run: a part that doesn't move in these
// frames didn't move in the merge's simulation either and got merged away. Writes <outPrefix>_anim.png and prints, per piece,
// triangles, meshes, whether it has use/anim, and how many nodes moved between the rest frame and the use frames.
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=(()=>{for(const p of [path.join(__dirname,'..','pw','node_modules','playwright'),path.join(__dirname,'..','..','..','.claude','pw','node_modules','playwright'),'playwright']){try{return require(p)}catch(_){}}throw new Error('Install Playwright: cd .claude/pw && npm i playwright')})();
const ROOT=(()=>{let d=__dirname;while(!fs.existsSync(path.join(d,'index.html'))&&path.dirname(d)!==d)d=path.dirname(d);return d})();
const [file,out]=process.argv.slice(2);const arg=n=>{const i=process.argv.indexOf(n);return i>0?process.argv[i+1]:null};
const SET=arg('--set'),KEYS=(arg('--keys')||'').split(',').filter(Boolean);
if(!file||!out||(!SET&&!KEYS.length)){console.log('usage: node aview.js <override.js|--none> <outPrefix> --set <key> | --keys a,b');process.exit(1)}
const src=file==='--none'?'':fs.readFileSync(file,'utf8');
const MIME={'.html':'text/html','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.webmanifest':'application/json','.css':'text/css'};
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);
  if(p.endsWith('/firebase-config.js')){r.writeHead(200,{'Content-Type':'text/javascript'});return r.end('window.R42_FIREBASE=null;')}
  if(p.endsWith('/sw.js')){r.writeHead(404);return r.end()}
  if(p==='/'||p.endsWith('/index.html')){let h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
    h=h.replace('/* </loop-fixes> */',()=>src+'\n/* </loop-fixes> */');h=h.replace('const clock=',()=>';window.__T={f:c=>eval(c)};const clock=');
    r.writeHead(200,{'Content-Type':'text/html','Cache-Control':'no-store'});return r.end(h)}
  const f=path.join(ROOT,p);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream','Cache-Control':'no-store'});r.end(b)})});
srv.listen(0,'127.0.0.1',async()=>{const port=srv.address().port;let br;
  try{br=await chromium.launch({args:process.env.R42_GL==='soft'?['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']:['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist']});
    const pg=await br.newPage({viewport:{width:900,height:900}});const errs=[];
    pg.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
    await pg.addInitScript(()=>{try{localStorage.r42coach='1';localStorage.r42nameAsked=String(Date.now())}catch(_){}});
    await pg.goto(`http://127.0.0.1:${port}/index.html`);
    try{await pg.waitForFunction(()=>window.__T&&__T.f('!!state&&ready'),null,{timeout:90000})}catch(e){console.log('app did not start\n'+errs.join('\n'));process.exitCode=2;return}
    await pg.waitForTimeout(2000);
    const info=await pg.evaluate(([SET,KEYS])=>__T.f(`(()=>{const SET=${JSON.stringify(SET)},KEYS=${JSON.stringify(KEYS)};
      gc={open:true};pet.group.visible=false;itemRoot.visible=false;{const st=document.createElement('style');st.textContent='body>*:not(canvas):not(:has(canvas)){display:none!important}';document.head.appendChild(st)}
      const pieces=SET?CAT.filter(c=>c.set===SET):KEYS.map(k=>CATMAP[k]).filter(Boolean),res=[],F=5,cw=220,ch=246;
      const sheet=document.createElement('canvas');sheet.width=F*cw;sheet.height=pieces.length*ch;const x=sheet.getContext('2d');x.fillStyle='#F3EEF8';x.fillRect(0,0,sheet.width,sheet.height);
      const W=renderer.domElement.width,H=renderer.domElement.height,sq=Math.min(W,H);
      const snap=o=>{const a=[];o.traverse(q=>a.push([q.position.x,q.position.y,q.position.z,q.rotation.x,q.rotation.y,q.rotation.z,q.scale.x,q.scale.y,q.scale.z,q.visible?1:0].map(v=>Math.round(v*1e3)).join(',')));return a};
      pieces.forEach((c,row)=>{let o;try{o=buildItem({id:'av'+row,k:c.k,c:c.dc||0,x:0,z:0,r:0,w:0,u:0,y:c.y})}catch(e){res.push({k:c.k,err:String(e&&e.stack||e).slice(0,400)});return}
        const holder=new THREE.Group();holder.add(o);o.position.set(0,0,0);o.rotation.set(0,0,0);scene.add(holder);holder.updateMatrixWorld(true);
        const B=new THREE.Box3().setFromObject(holder),sz=new THREE.Vector3(),cc=new THREE.Vector3();B.getSize(sz);B.getCenter(cc);let m=0,tr=0;holder.traverse(q=>{if(q.isMesh){m++;tr+=(q.geometry.idx?q.geometry.idx.length:0)/3}});
        const d=Math.max(sz.x,sz.y,sz.z)*2.2+.6,yaw=c.wall?0:.6;camera.fov=35;camera.aspect=W/H;camera.updateProjectionMatrix();camera.position.set(cc.x+Math.sin(yaw)*d*.92,cc.y+d*.38,cc.z+Math.cos(yaw)*d*.92);camera.lookAt(cc);
        const U=o.userData,s0=snap(o);let moved=0;
        const frames=[()=>{},()=>{U.use&&U.use(.6,.15);U.anim&&U.anim(.6)},()=>{U.use&&U.use(1.8,.45);U.anim&&U.anim(1.8)},()=>{U.use&&U.use(3.2,.8);U.anim&&U.anim(3.2)},()=>{U.use&&U.use(-1,-1);U.anim&&U.anim(5)}];
        frames.forEach((f,i)=>{try{f()}catch(e){res.push({k:c.k,err:'frame '+i+': '+String(e&&e.message||e)})}holder.updateMatrixWorld(true);if(i>0&&i<4){const s1=snap(o);moved=Math.max(moved,s1.filter((v,j)=>v!==s0[j]).length)}
          try{updLighting(1)}catch(_){}renderer.render(scene,camera);x.drawImage(renderer.domElement,(W-sq)/2,(H-sq)/2,sq,sq,i*cw,row*ch,cw,cw);
          x.fillStyle='#3B1273';x.font='bold 13px sans-serif';x.fillText(i?['','use .15','use .45','use .8','after'][i]:(c.n).slice(0,26),i*cw+5,row*ch+cw+16)});
        scene.remove(holder);res.push({k:c.k,fn:c.fn,tris:Math.round(tr),meshes:m,use:!!U.use,anim:!!U.anim,movedNodes:moved})});
      window.__sheet=sheet.toDataURL('image/png');return res})()`),[SET,KEYS]);
    console.log(JSON.stringify(info,null,0).replace(/\},\{/g,'},\n{'));
    fs.writeFileSync(out+'_anim.png',Buffer.from((await pg.evaluate(()=>window.__sheet)).split(',')[1],'base64'));
    if(errs.length)console.log('errors:\n'+errs.slice(0,20).join('\n'));else console.log('no errors');
  }catch(e){console.log('harness error: '+e.message);process.exitCode=3}
  finally{if(br)await br.close();srv.close()}});
