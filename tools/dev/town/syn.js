const fs=require('fs');const h=fs.readFileSync(process.argv[2]||'index.html','utf8');const re=/<script>([\s\S]*?)<\/script>/g;let m,i=0,bad=0;
while((m=re.exec(h))){i++;try{new Function(m[1])}catch(e){bad++;console.log('script',i,e.message)}}console.log(i,'scripts,',bad,'bad')
// stray control characters (a heredoc once turned \b into a backspace inside a regex): report each one
{const cc=[];for(let j=0;j<h.length;j++){const c=h.charCodeAt(j);if(c<32&&c!==9&&c!==10&&c!==13)cc.push(j)}if(cc.length){console.log(cc.length,'control characters, first at',cc.slice(0,5).map(j=>JSON.stringify(h.slice(Math.max(0,j-40),j+10))).join(' | '));process.exitCode=1}}
