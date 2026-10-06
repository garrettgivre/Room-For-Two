// Creature preview: renders a keeper builder (KEEPERS.<key>) in the solo app, headless, and saves screenshots.
// Usage: node .claude/town/kview.js <file.js|-> <key> <outPrefix> [act=idle] [frames=40]
//   file.js defines KEEPERS.<key>=function(){...} (use '-' to preview an existing keeper)
// Writes <outPrefix>_front.png, _three.png, _side.png, _back.png, and _act.png (greet/cheer/talk poses), plus console errors.
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=(()=>{for(const p of [path.join(__dirname,'..','pw','node_modules','playwright'),path.join(__dirname,'..','..','..','.claude','pw','node_modules','playwright'),'playwright']){try{return require(p)}catch(_){}}throw new Error('Install Playwright: cd .claude/pw && npm i playwright')})();
const ROOT=(()=>{let d=__dirname;while(!fs.existsSync(path.join(d,'index.html'))&&path.dirname(d)!==d)d=path.dirname(d);return d})();
const [file,key,out,act0,fr0]=process.argv.slice(2);
if(!key||!out){console.log('usage: node kview.js <file.js|-> <key> <outPrefix> [act] [frames]');process.exit(1)}
const MIME={'.html':'text/html','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.webmanifest':'application/json','.css':'text/css'};
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);
  if(p.endsWith('/firebase-config.js')){r.writeHead(200,{'Content-Type':'text/javascript'});return r.end('window.R42_FIREBASE=null;')}
  if(p.endsWith('/sw.js')){r.writeHead(404);return r.end()}
  if(p==='/'||p.endsWith('/index.html')){let h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');const inj=file&&file!=='-'?fs.readFileSync(file,'utf8'):'';
    if(h.split('const clock=').length!==2){r.writeHead(500);return r.end('no hook point')}
    h=h.replace('const clock=',()=>inj+'\n;window.__T={f:c=>eval(c)};const clock=');r.writeHead(200,{'Content-Type':'text/html','Cache-Control':'no-store'});return r.end(h)}
  const f=path.join(ROOT,p);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream','Cache-Control':'no-store'});r.end(b)})});
srv.listen(0,'127.0.0.1',async()=>{const port=srv.address().port;let br;
  try{br=await chromium.launch({args:process.env.R42_GL==='soft'?['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']:['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist']});
    const pg=await br.newPage({viewport:{width:720,height:900}});const errs=[];
    pg.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.type()+': '+m.text())});pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
    await pg.addInitScript(()=>{try{localStorage.r42coach='1'}catch(_){}});
    await pg.goto(`http://127.0.0.1:${port}/index.html`);
    await pg.waitForFunction(()=>window.__T&&__T.f('!!state'),null,{timeout:60000});
    await pg.waitForTimeout(1500);
    const info=await pg.evaluate(([key,act,frames])=>__T.f(`(${(([key,act,frames])=>{
      gc={open:true};// pauses the main loop; we render by hand
      const cv=renderer.domElement||document.querySelector('canvas');[...document.body.children].forEach(e=>{if(e!==cv&&!e.contains(cv))e.style.display='none'});{const st=document.createElement('style');st.textContent='body>*:not(canvas):not(:has(canvas)){display:none!important}';document.head.appendChild(st)}
      if(typeof pet!=='undefined'&&pet.group)pet.group.visible=false;itemRoot.visible=false;
      if(!KEEPERS[key])return{err:'KEEPERS.'+key+' is not defined'};
      let K;try{K=KEEPERS[key]()}catch(e){return{err:'build threw: '+e.message+'\n'+e.stack}}
      if(!K||!K.g||!K.upd)return{err:'builder must return {g, head, upd(dt,t,act,p,talk)}'};
      const L=new THREE.Group();L.add(K.g);const root=new THREE.Group();root.add(L);root.scale.setScalar(1.22);scene.add(root);try{kPolish(K,key)}catch(_){}
      let t=0;try{for(let i=0;i<frames;i++){t+=1/30;K.upd(1/30,t,'idle',0,false)}}catch(e){return{err:'upd threw: '+e.message+'\n'+e.stack}}
      const B=new THREE.Box3().setFromObject(root),s=new THREE.Vector3(),c=new THREE.Vector3();B.getSize(s);B.getCenter(c);
      window.__kv={K,root,t,c,s,B};
      // count meshes and triangles
      let meshes=0,tris=0;root.traverse(o=>{if(o.isMesh){meshes++;const g=o.geometry;tris+=(g.idx?g.idx.length:(g.pos?g.pos.length/3:0))/3}});
      return{size:[s.x,s.y,s.z].map(v=>+v.toFixed(3)),min:[B.min.x,B.min.y,B.min.z].map(v=>+v.toFixed(3)),meshes,tris:Math.round(tris)}
    }).toString()})(${JSON.stringify([key,act,frames])})`),[key,act0||'idle',+(fr0||40)]);
    console.log(JSON.stringify(info));
    if(info.err){console.log(errs.join('\n'));process.exitCode=2;return}
    const shot=async(name,yaw,elev,doAct,talk)=>{await pg.evaluate(([yaw,elev,doAct,talk])=>__T.f(`(${(([yaw,elev,doAct,talk])=>{const V=window.__kv,{K,c,s}=V;
        V.root.rotation.y=0;let t=V.t;
        if(doAct){for(let i=0;i<24;i++){t+=1/30;K.upd(1/30,t,doAct,i/24,!!talk)}}else{for(let i=0;i<3;i++){t+=1/30;K.upd(1/30,t,'idle',0,!!talk)}}V.t=t;
        const d=Math.max(s.y,s.x)*2.4+1.4;camera.aspect=innerWidth/innerHeight;camera.fov=40;camera.updateProjectionMatrix();
        camera.position.set(c.x+Math.sin(yaw)*Math.cos(elev)*d,c.y+Math.sin(elev)*d,c.z+Math.cos(yaw)*Math.cos(elev)*d);camera.lookAt(c);
        try{updLighting(t)}catch(_){}renderer.render(scene,camera)}).toString()})(${JSON.stringify([yaw,elev,doAct,talk])})`),[yaw,elev,doAct||null,talk||false]);
      await pg.screenshot({path:`${out}_${name}.png`})};
    await shot('front',0,.12);await shot('three',.75,.25);await shot('side',Math.PI/2,.1);await shot('back',Math.PI,.15);
    await shot('act',.3,.15,act0&&act0!=='idle'?act0:'cheer',act0==='talk');
    if(errs.length)console.log('console:\n'+errs.slice(0,20).join('\n'));
  }catch(e){console.log('harness error: '+e.message);process.exitCode=3}
  finally{if(br)await br.close();srv.close()}});
