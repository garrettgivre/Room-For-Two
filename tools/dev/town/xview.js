// Building exterior preview on the real world map. Injects a file of `Object.assign(TM_BODY,{...})` (and optionally TM_SIGN)
// overrides at the exteriors-v2 marker, rebuilds the given buildings and shoots each from three angles by day and one by night.
// Usage: node tools/dev/town/xview.js <file.js|-> <outPrefix> <buildingKey>[,<buildingKey>...]   (shops: snack, toys...; houses: h_bunbun...)
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=(()=>{for(const p of [path.join(__dirname,'..','pw','node_modules','playwright'),path.join(__dirname,'..','..','..','.claude','pw','node_modules','playwright'),'playwright']){try{return require(p)}catch(_){}}throw new Error('Install Playwright')})();
const ROOT=(()=>{let d=__dirname;while(!fs.existsSync(path.join(d,'index.html'))&&path.dirname(d)!==d)d=path.dirname(d);return d})();
const [file,out,keysA]=process.argv.slice(2);if(!file||!out||!keysA){console.log('usage: node xview.js <file.js|-> <outPrefix> <key,key>');process.exit(1)}
const src=file==='-'?'':fs.readFileSync(file,'utf8'),KEYS=keysA.split(',');
const MIME={'.html':'text/html','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.css':'text/css'};
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);
  if(p.endsWith('/firebase-config.js')){r.writeHead(200);return r.end('window.R42_FIREBASE=null;')}
  if(p.endsWith('/sw.js')){r.writeHead(404);return r.end()}
  if(p==='/'||p.endsWith('/index.html')){let h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');h=h.replace('/* </exteriors-v2> */',()=>src+'\n/* </exteriors-v2> */');h=h.replace('const clock=',()=>';window.__T={f:c=>eval(c)};const clock=');r.writeHead(200,{'Content-Type':'text/html'});return r.end(h)}
  fs.readFile(path.join(ROOT,p),(e,b)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':MIME[path.extname(p)]||'application/octet-stream'});r.end(b)})});
srv.listen(0,'127.0.0.1',async()=>{const port=srv.address().port;let br;
  try{br=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const pg=await br.newPage({viewport:{width:640,height:860}});const errs=[];
    pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
    await pg.addInitScript(()=>{try{localStorage.r42coach='1';localStorage.r42locAsked='1'}catch(_){}});await pg.goto(`http://127.0.0.1:${port}/index.html`);
    const ev=c=>pg.evaluate(c=>__T.f(c),c);
    try{await pg.waitForFunction(()=>window.__T&&__T.f('!!state&&ready'),null,{timeout:90000})}catch(e){console.log('app did not start');process.exitCode=2;return}
    await ev("rewardQ.length=0;{const st=document.createElement('style');st.textContent='#reward,#emotes,#toast,#tmRain,.tm-lab,#tmWheelBtn,.tm-top,#tmCard{display:none!important}';document.head.appendChild(st)}skyHourOverride=13;showMap();1");
    for(let i=0;i<120;i++){if(await ev("tm.pending?0:1")===1)break;await pg.waitForTimeout(1000)}await pg.waitForTimeout(1500);
    for(const k of KEYS){const info=await ev(`(()=>{const k=${JSON.stringify(k)};if(!tm.bld[k])return'no building '+k;tmUnmerge();tm.world.remove(tm.bld[k]);delete tm.bld[k];try{tmBuildOne(k)}catch(e){return'build threw: '+e.message}const o=tm.bld[k];if(!o)return'build failed';let t=0,m=0;o.traverse(q=>{if(q.isMesh){m++;t+=(q.geometry.idx?q.geometry.idx.length:0)/3}});return JSON.stringify({k,meshes:m,tris:Math.round(t)})})()`);
      console.log(info);
      for(const [n,yaw,pitch,zoom,hour] of [['a',-.5,.42,.11,13],['b',.9,.36,.11,13],['c',2.6,.5,.13,13],['night',-.5,.42,.11,22]]){
        await ev(`(()=>{const o=tm.bld[${JSON.stringify(k)}];tm.open=false;tw.follow=false;tm.focus=${JSON.stringify(k)};skyHourOverride=${hour};tmTodT=0;tm.tgtTo.set(o.position.x,0,o.position.z);tm.tgt.copy(tm.tgtTo);tm.yaw=${yaw};tm.pitch=${pitch};tm.zoom=${zoom};for(let i=0;i<10;i++)tmFrame(.1);return 1})()`);
        await pg.screenshot({path:`${out}_${k}_${n}.png`})}}
    console.log(errs.length?'errors:\n'+errs.slice(0,15).join('\n'):'no errors');
  }catch(e){console.log('harness error: '+e.message);process.exitCode=3}finally{if(br)await br.close();srv.close()}});
