// World decoration preview: injects a file of `Object.assign(TM_DECOR,{...})` entries into the town-map block, builds every
// entry it adds, renders a contact sheet (each item on a grass tile, three-quarter view, with a 1x1 cell outline and a pet-sized
// marker for scale) and a "street" shot with all of them in a row on grass. Prints size/mesh/triangle counts and errors.
// Usage: node tools/dev/town/dview.js <file.js> <outPrefix>
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=(()=>{for(const p of [path.join(__dirname,'..','pw','node_modules','playwright'),path.join(__dirname,'..','..','..','.claude','pw','node_modules','playwright'),'playwright']){try{return require(p)}catch(_){}}throw new Error('Install Playwright: cd .claude/pw && npm i playwright')})();
const ROOT=(()=>{let d=__dirname;while(!fs.existsSync(path.join(d,'index.html'))&&path.dirname(d)!==d)d=path.dirname(d);return d})();
const [file,out]=process.argv.slice(2);if(!file||!out){console.log('usage: node dview.js <file.js> <outPrefix>');process.exit(1)}
const src=fs.readFileSync(file,'utf8');const KEYS=[...src.matchAll(/^\s{0,4}(\w+)\s*:\s*\{\s*n\s*:/gm)].map(m=>m[1]);
const MIME={'.html':'text/html','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.css':'text/css'};
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);
  if(p.endsWith('/firebase-config.js')){r.writeHead(200);return r.end('window.R42_FIREBASE=null;')}
  if(p.endsWith('/sw.js')){r.writeHead(404);return r.end()}
  if(p==='/'||p.endsWith('/index.html')){let h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');h=h.replace('/* </world-decor> */',()=>src+'\n/* </world-decor> */');h=h.replace('const clock=',()=>';window.__T={f:c=>eval(c)};const clock=');r.writeHead(200,{'Content-Type':'text/html'});return r.end(h)}
  fs.readFile(path.join(ROOT,p),(e,b)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':MIME[path.extname(p)]||'application/octet-stream'});r.end(b)})});
srv.listen(0,'127.0.0.1',async()=>{const port=srv.address().port;let br;
  try{br=await chromium.launch({args:process.env.R42_GL==='soft'?['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']:['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist']});const pg=await br.newPage({viewport:{width:900,height:900}});const errs=[];
    pg.on('pageerror',e=>errs.push('pageerror: '+e.message));pg.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
    await pg.addInitScript(()=>{try{localStorage.r42coach='1';localStorage.r42locAsked='1'}catch(_){}});await pg.goto(`http://127.0.0.1:${port}/index.html`);
    try{await pg.waitForFunction(()=>window.__T&&__T.f('!!state&&ready'),null,{timeout:90000})}catch(e){console.log('app did not start\n'+errs.join('\n'));process.exitCode=2;return}
    await pg.waitForTimeout(2000);
    const info=await pg.evaluate(K=>__T.f(`(()=>{const KS=${JSON.stringify(K)}.filter(k=>TM_DECOR[k]);gc={open:true};pet.group.visible=false;itemRoot.visible=false;walls.forEach(w=>w.g.visible=false);rewardQ.length=0;
      {const st=document.createElement('style');st.textContent='body>*:not(canvas):not(:has(canvas)){display:none!important}';document.head.appendChild(st)}
      const grass=M(0x8CCB5E,{roughness:.95}),line=M(0x3B1273),res=[],W=renderer.domElement.width,H=renderer.domElement.height,cols=4,cw=300,ch=320,rows=Math.ceil(KS.length/cols),sheet=document.createElement('canvas');sheet.width=cols*cw;sheet.height=rows*ch;const x=sheet.getContext('2d');x.fillStyle='#EEF6E8';x.fillRect(0,0,sheet.width,sheet.height);
      KS.forEach((k,i)=>{const D=TM_DECOR[k],[sw,sd]=D.sz||[1,1],hold=new THREE.Group();let o;try{o=D.b()}catch(e){res.push({k,err:String(e&&e.stack||e).slice(0,400)});return}
        const gp=add(hold,new THREE.BoxGeometry(sw+.6,.04,sd+.6),grass,0,-.02,0);gp.outline=0;[[0,-sd/2,sw,0],[0,sd/2,sw,0],[-sw/2,0,sd,1],[sw/2,0,sd,1]].forEach(([a,b,l,r])=>{const q=add(hold,new THREE.BoxGeometry(l,.005,.012),line,a,.002,b);q.outline=0;if(r)q.rotation.y=Math.PI/2});
        const pm=sp(hold,.12,M(0xA6E22E),sw/2+.18,.12,sd/2+.18);pm.outline=.004;hold.add(o);hold.position.y=.04;scene.add(hold);hold.updateMatrixWorld(true);
        const B=new THREE.Box3().setFromObject(o),sz=new THREE.Vector3(),cc=new THREE.Vector3();B.getSize(sz);B.getCenter(cc);let m=0,tr=0;o.traverse(q=>{if(q.isMesh){m++;tr+=(q.geometry.idx?q.geometry.idx.length:0)/3}});
        if(o.userData.anim)try{o.userData.anim(1.3)}catch(e){res.push({k,err:'anim: '+e.message})}
        const d=Math.max(sz.x,sz.y,sz.z,sw,sd)*2+.8;camera.fov=35;camera.aspect=W/H;camera.updateProjectionMatrix();camera.position.set(cc.x+d*.6,cc.y+d*.5,cc.z+d*.62);camera.lookAt(cc);
        try{updLighting(1)}catch(_){}renderer.render(scene,camera);const sq=Math.min(W,H);x.drawImage(renderer.domElement,(W-sq)/2,(H-sq)/2,sq,sq,(i%cols)*cw,Math.floor(i/cols)*ch,cw,cw);
        x.fillStyle='#3B1273';x.font='bold 15px sans-serif';x.fillText((D.n+' ['+(D.cat||'?')+'] '+sw+'x'+sd).slice(0,36),(i%cols)*cw+6,Math.floor(i/cols)*ch+cw+15);scene.remove(hold);
        res.push({k,cat:D.cat,size:[sz.x,sz.y,sz.z].map(v=>+v.toFixed(2)),meshes:m,tris:Math.round(tr)})});
      window.__sheet=sheet.toDataURL('image/png');
      // all in a row on a strip of grass
      const row=new THREE.Group();let px=0;KS.forEach(k=>{const D=TM_DECOR[k];if(!D)return;const [sw]=D.sz||[1,1];try{const o=D.b();o.position.x=px+sw/2;row.add(o)}catch(_){}px+=sw+.4});const strip=add(row,new THREE.BoxGeometry(px+1,.04,3),grass,px/2,-.02,0);strip.outline=0;row.position.x=-px/2;row.position.y=.04;scene.add(row);window.__row=[row,px];
      return res})()`),KEYS);
    console.log(JSON.stringify(info).replace(/\},\{/g,'},\n{'));fs.writeFileSync(out+'_items.png',Buffer.from((await pg.evaluate(()=>window.__sheet)).split(',')[1],'base64'));
    await pg.evaluate(()=>__T.f(`{const [row,px]=window.__row,d=Math.max(6,px*.55);camera.position.set(0,d*.45,d*.9);camera.lookAt(new THREE.Vector3(0,.6,0));try{updLighting(1)}catch(_){}renderer.render(scene,camera);1}`));
    await pg.screenshot({path:out+'_row.png'});
    console.log(errs.length?'errors:\n'+errs.slice(0,20).join('\n'):'no errors');
  }catch(e){console.log('harness error: '+e.message);process.exitCode=3}finally{if(br)await br.close();srv.close()}});
