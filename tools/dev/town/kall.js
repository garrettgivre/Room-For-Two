// Renders every resident model in one page load: front, three-quarter, cheer and greet per character.
// Usage: node tools/dev/town/kall.js [key,key...] [outdir]   (env KZ = camera distance factor, KL = look-at lift as a share of height, for face close-ups)
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=(()=>{for(const p of [path.join(__dirname,'..','pw','node_modules','playwright'),path.join(__dirname,'..','..','..','.claude','pw','node_modules','playwright'),'playwright']){try{return require(p)}catch(_){}}throw new Error('Install Playwright: cd .claude/pw && npm i playwright')})();
const ROOT=(()=>{let d=__dirname;while(!fs.existsSync(path.join(d,'index.html'))&&path.dirname(d)!==d)d=path.dirname(d);return d})();const ZOOM=+(process.env.KZ||1),LIFT=+(process.env.KL||0),only=(process.argv[2]||'').split(',').filter(Boolean),OUT=process.argv[3]||path.join(ROOT,'.claude','town','out','kall');fs.mkdirSync(OUT,{recursive:true});
const MIME={'.html':'text/html','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.css':'text/css'};
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);
  if(p.endsWith('/firebase-config.js')){r.writeHead(200);return r.end('window.R42_FIREBASE=null;')}
  if(p.endsWith('/sw.js')){r.writeHead(404);return r.end()}
  if(p==='/'||p.endsWith('/index.html')){let h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');h=h.replace('const clock=',()=>';window.__T={f:c=>eval(c)};const clock=');r.writeHead(200,{'Content-Type':'text/html'});return r.end(h)}
  fs.readFile(path.join(ROOT,p),(e,b)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':MIME[path.extname(p)]||'application/octet-stream'});r.end(b)})});
srv.listen(0,'127.0.0.1',async()=>{const port=srv.address().port;const br=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  try{const pg=await br.newPage({viewport:{width:480,height:600}});pg.on('pageerror',e=>console.log('pageerror',e.message));
    await pg.addInitScript(()=>{try{localStorage.r42coach='1'}catch(_){}});await pg.goto(`http://127.0.0.1:${port}/index.html`);
    await pg.waitForFunction(()=>window.__T&&__T.f('!!state'),null,{timeout:90000});await pg.waitForTimeout(1500);await pg.evaluate(([z,l])=>{window.ZOOM=z;window.LIFT=l},[ZOOM,LIFT]);
    const keys=JSON.parse(await pg.evaluate(()=>__T.f(`gc={open:true};{const st=document.createElement('style');st.textContent='body>*:not(canvas):not(:has(canvas)){display:none!important}';document.head.appendChild(st)}pet.group.visible=false;itemRoot.visible=false;JSON.stringify(Object.keys(RESIDENTS).filter(k=>KEEPERS[k]))`)));
    for(const k of keys){if(only.length&&!only.includes(k))continue;
      const info=await pg.evaluate(k=>__T.f(`{if(window.__kr)scene.remove(window.__kr);const K=KEEPERS['${k}']();kPolish(K,'${k}');const root=new THREE.Group();root.add(K.g);root.scale.setScalar(1.22);scene.add(root);window.__kr=root;let t=0;for(let i=0;i<40;i++){t+=1/30;K.upd(1/30,t,'idle',0,false)}
        const B=new THREE.Box3().setFromObject(root),s=new THREE.Vector3(),c=new THREE.Vector3();B.getSize(s);B.getCenter(c);let m=0,tr=0;root.traverse(o=>{if(o.isMesh){m++;tr+=(o.geometry.idx?o.geometry.idx.length:0)/3}});c.y+=s.y*${LIFT};window.__kv={K,c,s,t};JSON.stringify({k:'${k}',s:[s.x,s.y,s.z].map(v=>+v.toFixed(2)),m,tr:Math.round(tr)})}`),k);
      console.log(info);
      for(const [n,yaw,el] of [['f',0,.12],['t',.75,.3]]){await pg.evaluate(([yaw,el])=>__T.f(`{const V=window.__kv,{c,s}=V;const d=(Math.max(s.y,s.x)*2.3+1.2)*${ZOOM};camera.aspect=innerWidth/innerHeight;camera.fov=40;camera.updateProjectionMatrix();camera.position.set(c.x+Math.sin(${yaw})*Math.cos(${el})*d,c.y+Math.sin(${el})*d,c.z+Math.cos(${yaw})*Math.cos(${el})*d);camera.lookAt(c);try{updLighting(V.t)}catch(_){}renderer.render(scene,camera)}`),[yaw,el]);
        await pg.screenshot({path:path.join(OUT,k+'_'+n+'.png')})}
      for(const act of ['cheer','greet']){await pg.evaluate(act=>__T.f(`{const V=window.__kv,{K,c,s}=V;let t=V.t;for(let i=0;i<14;i++){t+=1/30;K.upd(1/30,t,'${act}',i/24,false)}V.t=t;const d=(Math.max(s.y,s.x)*2.3+1.2);camera.position.set(c.x+Math.sin(.4)*d,c.y+Math.sin(.15)*d,c.z+Math.cos(.4)*d);camera.lookAt(c);try{updLighting(t)}catch(_){}renderer.render(scene,camera)}`),act);
        await pg.screenshot({path:path.join(OUT,k+'_'+act+'.png')})}}
  }catch(e){console.log('err',e.message)}finally{await br.close();srv.close()}});
