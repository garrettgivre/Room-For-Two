// Wearables preview: injects a file of Object.assign(ACCS|HAND_STYLES|FOOT_STYLES|WEAR_DESC,{...}) statements at the wear-more
// marker, puts each new item on the real pet (hats on the left head, eyewear on the left face, hands/shoes as the style) and
// renders it from the front and three-quarter, on a contact sheet. Prints errors and triangle counts.
// Usage: node tools/dev/town/wview.js <file.js> <outPrefix>
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=(()=>{for(const p of [path.join(__dirname,'..','pw','node_modules','playwright'),path.join(__dirname,'..','..','..','.claude','pw','node_modules','playwright'),'playwright']){try{return require(p)}catch(_){}}throw new Error('Install Playwright')})();
const ROOT=(()=>{let d=__dirname;while(!fs.existsSync(path.join(d,'index.html'))&&path.dirname(d)!==d)d=path.dirname(d);return d})();
const [file,out]=process.argv.slice(2);if(!file||!out){console.log('usage: node wview.js <file.js> <outPrefix>');process.exit(1)}
const src=fs.readFileSync(file,'utf8');
const items=[];for(const m of src.matchAll(/Object\.assign\((ACCS|HAND_STYLES|FOOT_STYLES)\s*,\s*\{([\s\S]*?)\}\s*\)\s*;/g)){for(const k of m[2].matchAll(/(?:^|[\n,{])\s*(\w+)\s*:\s*\{\s*n\s*:/g))items.push([m[1],k[1]])}
const MIME={'.html':'text/html','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.css':'text/css'};
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);
  if(p.endsWith('/firebase-config.js')){r.writeHead(200);return r.end('window.R42_FIREBASE=null;')}
  if(p.endsWith('/sw.js')){r.writeHead(404);return r.end()}
  if(p==='/'||p.endsWith('/index.html')){let h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');h=h.replace('/* </wear-more> */',()=>src+'\n/* </wear-more> */');h=h.replace('const clock=',()=>';window.__T={f:c=>eval(c)};const clock=');r.writeHead(200,{'Content-Type':'text/html'});return r.end(h)}
  fs.readFile(path.join(ROOT,p),(e,b)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':MIME[path.extname(p)]||'application/octet-stream'});r.end(b)})});
srv.listen(0,'127.0.0.1',async()=>{const port=srv.address().port;let br;
  try{br=await chromium.launch({args:process.env.R42_GL==='soft'?['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']:['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist']});const pg=await br.newPage({viewport:{width:800,height:800}});const errs=[];
    pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
    await pg.addInitScript(()=>{try{localStorage.r42coach='1';localStorage.r42locAsked='1'}catch(_){}});await pg.goto(`http://127.0.0.1:${port}/index.html`);
    try{await pg.waitForFunction(()=>window.__T&&__T.f('!!state&&ready&&!!pet.rig'),null,{timeout:90000})}catch(e){console.log('app did not start\n'+errs.join('\n'));process.exitCode=2;return}
    await pg.waitForTimeout(2000);
    const info=await pg.evaluate(IT=>__T.f(`(()=>{const IT=${JSON.stringify(IT)};gc={open:true};itemRoot.visible=false;rewardQ.length=0;{const st=document.createElement('style');st.textContent='body>*:not(canvas):not(:has(canvas)){display:none!important}';document.head.appendChild(st)}
      pet.mode='idle';pet.use=null;const res=[],W=renderer.domElement.width,H=renderer.domElement.height,cw=260,ch=290,cols=4,rows=Math.ceil(IT.length/cols*2/2),sheet=document.createElement('canvas');sheet.width=cols*cw*2;sheet.height=Math.ceil(IT.length/cols)*ch;const x=sheet.getContext('2d');x.fillStyle='#F6F0FB';x.fillRect(0,0,sheet.width,sheet.height);
      IT.forEach(([reg,k],i)=>{const base=petLook(true),L=JSON.parse(JSON.stringify(base));L.acc={};let what='';
        try{if(reg==='ACCS'){const A=ACCS[k];if(!A)throw new Error('ACCS.'+k+' missing');const slot=A.slot==='hat'?'hatL':A.slot==='face'?'faceL':A.slot;L.acc[slot]=k;if(A.slot==='hat')L.acc.hatR=k;if(A.slot==='face')L.acc.faceR=k;what=A.n+' ['+A.slot+'] '+A.p}
          else if(reg==='HAND_STYLES'){L.hand.s=k;what=HAND_STYLES[k].n+' [hands] '+HAND_STYLES[k].p}else{L.foot.s=k;what=FOOT_STYLES[k].n+' [shoes] '+FOOT_STYLES[k].p}
          lookDraft=L;pet.key=null;buildPet();pet.group.position.set(0,0,0);pet.group.rotation.set(0,0,0);for(let f=0;f<6;f++)updatePet(1/30,f/30);pet.group.rotation.set(0,0,0);pet.heading=0;
          const B=new THREE.Box3().setFromObject(pet.group),c=new THREE.Vector3(),s=new THREE.Vector3();B.getCenter(c);B.getSize(s);let tr=0;pet.group.traverse(q=>{if(q.isMesh)tr+=(q.geometry.idx?q.geometry.idx.length:0)/3});
          [[0,.12],[.8,.3]].forEach(([yaw,el],j)=>{const d=Math.max(s.y,s.x)*2.2+.5;camera.fov=32;camera.aspect=W/H;camera.updateProjectionMatrix();camera.position.set(c.x+Math.sin(yaw)*Math.cos(el)*d,c.y+Math.sin(el)*d,c.z+Math.cos(yaw)*Math.cos(el)*d);camera.lookAt(c);try{updLighting(1)}catch(_){}renderer.render(scene,camera);
            const sq=Math.min(W,H);x.drawImage(renderer.domElement,(W-sq)/2,(H-sq)/2,sq,sq,((i%cols)*2+j)*cw,Math.floor(i/cols)*ch,cw,cw)});
          x.fillStyle='#3B1273';x.font='bold 14px sans-serif';x.fillText(what.slice(0,60),(i%cols)*2*cw+6,Math.floor(i/cols)*ch+cw+16);res.push({k,reg,tris:Math.round(tr)})}catch(e){res.push({k,reg,err:String(e&&e.stack||e).slice(0,300)})}});
      lookDraft=null;window.__sheet=sheet.toDataURL('image/png');return res})()`),items);
    console.log(JSON.stringify(info).replace(/\},\{/g,'},\n{'));fs.writeFileSync(out+'_wear.png',Buffer.from((await pg.evaluate(()=>window.__sheet)).split(',')[1],'base64'));
    console.log(errs.length?'errors:\n'+errs.slice(0,15).join('\n'):'no errors');
  }catch(e){console.log('harness error: '+e.message);process.exitCode=3}finally{if(br)await br.close();srv.close()}});
