const fs=require('fs');const h=fs.readFileSync(process.argv[2]||'index.html','utf8');const re=/<script>([\s\S]*?)<\/script>/g;let m,i=0,bad=0;
while((m=re.exec(h))){i++;try{new Function(m[1])}catch(e){bad++;console.log('script',i,e.message)}}console.log(i,'scripts,',bad,'bad')
