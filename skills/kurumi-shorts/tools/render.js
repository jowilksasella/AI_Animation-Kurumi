/* Frame-accurate capture of a built episode page.
     node render.js <index.html> stills <outDir> <t1,t2,...>
     node render.js <index.html> video <out.mp4> <durationSeconds> [fps=30]
     node render.js <index.html> qa <outDir> <durationSeconds>   layout check (outDir/check.json) + one still per scene
   Video mode also writes <out>.sfx.json (the page's sound cues) for the audio mix. */
const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const puppeteer=require('puppeteer-core');
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe';
const [,,page_,mode,out,arg,fpsArg]=process.argv;

(async()=>{
  const browser=await puppeteer.launch({executablePath:CHROME,headless:true,
    args:['--hide-scrollbars','--allow-file-access-from-files','--force-device-scale-factor=1','--disable-gpu-vsync','--font-render-hinting=none']});
  const page=await browser.newPage();
  const warns=[];page.on('console',m=>{if(m.type()==='warning'||m.type()==='error')warns.push(m.text())});
  page.on('pageerror',e=>warns.push('pageerror: '+e.message));
  await page.setViewport({width:1080,height:1920,deviceScaleFactor:1});
  await page.goto('file:///'+path.resolve(page_).replace(/\\/g,'/'),{waitUntil:'load'});
  await page.evaluate(()=>window.__ready);
  const shot=async t=>{await page.evaluate(t=>window.renderAt(t),t);return page.screenshot({type:mode==='video'?'jpeg':'png',quality:mode==='video'?94:undefined,optimizeForSpeed:true})};
  if(mode==='qa'){
    fs.mkdirSync(out,{recursive:true});const dur=+arg,found={};
    for(const t of await page.evaluate(d=>window.__checkTimes(d),dur))
      for(const msg of new Set(await page.evaluate(t=>window.__layoutCheck(t),t))){found[msg]=found[msg]||[];if(!found[msg].includes(t))found[msg].push(t)}
    fs.writeFileSync(path.join(out,'check.json'),JSON.stringify(found,null,1));
    for(const t of await page.evaluate(d=>window.__sheetTimes(d),dur))fs.writeFileSync(path.join(out,`t${t.toFixed(2).padStart(6,'0')}.png`),await shot(t));
    const keys=Object.keys(found);
    console.log(keys.length?keys.map(k=>`  ${k}  @ ${found[k].slice(0,4).join(', ')}${found[k].length>4?' …':''}`).join(String.fromCharCode(10)):'  layout check: clean');
  }else if(mode==='sfx'){
    fs.writeFileSync(out,JSON.stringify(await page.evaluate(()=>window.EP_SFX),null,1));
  }else if(mode==='stills'){
    fs.mkdirSync(out,{recursive:true});
    for(const t of arg.split(',').map(Number)){fs.writeFileSync(path.join(out,`t${t.toFixed(2).padStart(6,'0')}.png`),await shot(t))}
  }else{
    const fps=+(fpsArg||30),n=Math.ceil(+arg*fps);
    const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-',
      '-c:v','libx264','-preset','medium','-crf','16','-pix_fmt','yuv420p','-r',String(fps),out],{stdio:['pipe','inherit','inherit']});
    const t0=Date.now();
    for(let f=0;f<n;f++){
      const buf=await shot(f/fps);
      if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
      if(f%150===0)process.stdout.write(`frame ${f}/${n} ${((Date.now()-t0)/1000).toFixed(0)}s\n`);
    }
    ff.stdin.end();await new Promise(r=>ff.on('close',r));
    fs.writeFileSync(out+'.sfx.json',JSON.stringify(await page.evaluate(()=>window.EP_SFX),null,1));
  }
  if(warns.length)console.log('page warnings:\n'+[...new Set(warns)].join('\n'));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
