// Generic headless test: serves the app in solo mode with a __T eval hook (plus optional injected files), runs a test module.
// Usage: node .claude/town/run.js <test.js> [inject1.js,inject2.js]
// Uses the real GPU (ANGLE on Direct3D 11; the laptop's RTX 3060). R42_GL=soft forces software GL (SwiftShader, much slower).
// test.js: module.exports=async({pg,ev,shot,wait,log})=>{...}; ev(code) evals inside the app's closure.
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=(()=>{for(const p of [path.join(__dirname,'..','pw','node_modules','playwright'),path.join(__dirname,'..','..','..','.claude','pw','node_modules','playwright'),'playwright']){try{return require(p)}catch(_){}}throw new Error('Install Playwright: cd .claude/pw && npm i playwright')})();
const ROOT=(()=>{let d=__dirname;while(!fs.existsSync(path.join(d,'index.html'))&&path.dirname(d)!==d)d=path.dirname(d);return d})();const [test,inj]=process.argv.slice(2);
const MIME={'.html':'text/html','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.webmanifest':'application/json','.css':'text/css'};
const extra=(inj?inj.split(','):[]).map(f=>fs.readFileSync(f,'utf8')).join('\n;\n');
const srv=http.createServer((q,r)=>{const p=decodeURIComponent(q.url.split('?')[0]);
  if(p.endsWith('/firebase-config.js')){r.writeHead(200,{'Content-Type':'text/javascript'});return r.end('window.R42_FIREBASE=null;')}
  if(p.endsWith('/sw.js')){r.writeHead(404);return r.end()}
  if(p==='/'||p.endsWith('/index.html')){let h=fs.readFileSync(process.env.R42_INDEX||path.join(ROOT,'index.html'),'utf8');h=h.replace('const clock=',()=>extra+'\n;window.__T={f:c=>eval(c)};const clock=');r.writeHead(200,{'Content-Type':'text/html'});return r.end(h)}
  const f=path.join(ROOT,p);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});r.end(b)})});
let errs=[];srv.listen(0,'127.0.0.1',async()=>{const port=srv.address().port;let br;
  try{br=await chromium.launch({args:process.env.R42_GL==='soft'?['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']:['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist']});
    const pg=await br.newPage({viewport:{width:430,height:860}});errs=[];
    pg.on('console',m=>{if(m.type()==='error'||m.type()==='warning'){const t=m.text();if(!/404/.test(t))errs.push(m.type()+': '+t)}});pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
    await pg.addInitScript(()=>{try{localStorage.r42coach='1'}catch(_){}});
    await pg.goto(`http://127.0.0.1:${port}/index.html`);
    await pg.waitForFunction(()=>window.__T&&__T.f('!!state'),null,{timeout:60000});await pg.waitForTimeout(1200);
    const ev=c=>pg.evaluate(c=>{try{const r=__T.f(c);return r&&r.then?r.then(v=>JSON.stringify(v),e=>'ERR '+e.message):JSON.stringify(r)}catch(e){return 'ERR '+e.message+'\n'+(e.stack||'').split('\n').slice(0,4).join('\n')}},c);
    const shot=async n=>pg.screenshot({path:path.join(ROOT,'.claude','town','out',n+'.png'),animations:'disabled',timeout:90000});const wait=ms=>pg.waitForTimeout(ms);
    await require(path.resolve(test))({pg,ev,shot,wait,log:console.log});
    if(errs.length)console.log('console:\n'+errs.slice(0,30).join('\n'));
  }catch(e){console.log('harness error: '+e.stack)}finally{try{if(errs.length)console.log(errs.join(String.fromCharCode(10)))}catch(_){}if(br)await br.close();srv.close()}});
