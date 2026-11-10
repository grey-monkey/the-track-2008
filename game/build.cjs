const fs=require('fs'),path=require('path'),crypto=require('crypto'),zlib=require('zlib'),esbuild=require('esbuild');
const root=path.join(__dirname,'source'),out=path.join(__dirname,'build');fs.mkdirSync(out,{recursive:true});const assets=new Map();
function asset(bytes,ext){const name='p46-'+crypto.createHash('sha256').update(bytes).digest('hex').slice(0,16)+'.'+ext;assets.set(name,bytes.length);fs.writeFileSync(path.join(out,name),bytes);return './'+name;}
const images=/data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)/g;
function extractImages(s){return s.replace(images,(_,type,data)=>asset(Buffer.from(data,'base64'),type==='jpeg'?'jpg':type));}
(async()=>{
const result=await esbuild.build({absWorkingDir:root,tsconfigRaw:{},entryPoints:['./portrait-selection-app.js'],bundle:true,splitting:true,format:'esm',target:'es2022',minify:true,legalComments:'inline',metafile:true,outdir:out,entryNames:'p181-app-[hash]',chunkNames:'p181-chunk-[hash]',plugins:[{name:'cacheable-assets',setup(b){b.onResolve({filter:/.*/},args=>({path:path.resolve(args.resolveDir||root,args.path.split('?')[0]),namespace:'memory'}));b.onLoad({filter:/\.m?js$/},args=>{let s=fs.readFileSync(args.path,'utf8');
s=s.replace(/Uint8Array\.from\(atob\((['"])(H4s[A-Za-z0-9+/=]+)\1\),c=>c\.charCodeAt\(0\)\)/g,(_,quote,data)=>{const json=extractImages(zlib.gunzipSync(Buffer.from(data,'base64')).toString());JSON.parse(json);const url=asset(zlib.gzipSync(json,{level:9}),'model.gz');return `new Uint8Array(await fetch(${JSON.stringify(url)}).then(r=>{if(!r.ok)throw Error('Model download failed: '+r.status);return r.arrayBuffer()}))`;});
if(path.basename(args.path)==='painted.js'){const url=asset(zlib.gzipSync(fs.readFileSync(path.join(root,'assets/mercedes-painted.json')),{level:9}),'model.gz');s=s.replace(/const carData=[^\r\n]+[\r\n]+function paint/,"const carData=JSON.parse(await new Response((await fetch("+JSON.stringify(url)+")).body.pipeThrough(new DecompressionStream('gzip'))).text());\nfunction paint");}
s=extractImages(s).replace(/(['"])\.\/assets\/([^'"]+)\1/g,(_,quote,file)=>{const bytes=fs.readFileSync(path.join(root,'assets',file));return JSON.stringify(asset(bytes,path.extname(file).slice(1)));});return{contents:s,loader:'js',resolveDir:path.dirname(args.path)};});}}]});
const entry=Object.entries(result.metafile.outputs).find(([n,v])=>v.entryPoint.endsWith('portrait-selection-app.js'))[0];
const fonts=[['TrackMarker','PermanentMarker-Regular.ttf',400],['TrackSans','Barlow-Regular.ttf',400],['TrackSans','Barlow-SemiBold.ttf',600]].map(([family,file,weight])=>`@font-face{font-family:${family};font-weight:${weight};font-style:normal;font-display:swap;src:url(${asset(fs.readFileSync(path.join(root,'fonts138',file)),'ttf')}) format('truetype')}`).join('');
const css=asset(Buffer.concat([Buffer.from(fonts),fs.readFileSync(path.join(root,'style.css')),fs.readFileSync(path.join(root,'selection.css')),fs.readFileSync(path.join(root,'stance94/stance.css')),fs.readFileSync(path.join(root,'car-audio100/selection.css')),fs.readFileSync(path.join(root,'motion134/play.css')),fs.readFileSync(path.join(root,'hud137/style.css')),fs.readFileSync(path.join(root,'ui138.css')),fs.readFileSync(path.join(root,'settings173.css'))]),'css');let html=fs.readFileSync(path.join(root,'speed117/selection-template.html'),'utf8').replace('./style.css',css).replace('src="./app.js"','src="./'+path.basename(entry)+'"').replace('STUDY 45','BUILD 181');html=html.replaceAll('./assets/help-marker.svg',asset(fs.readFileSync(path.join(root,'assets/help-marker.svg')),'svg'));html=html.replaceAll('./assets/ride-marker.svg',asset(fs.readFileSync(path.join(root,'assets/ride-marker.svg')),'svg'));html=html.replaceAll('./assets/the-track-logo-white.svg',asset(fs.readFileSync(path.join(root,'assets/the-track-logo-white.svg')),'svg'));html=html.replaceAll('./assets/greydog-lovesyou-publisher.png',asset(fs.readFileSync(path.join(root,'assets/greydog-lovesyou-publisher.png')),'png'));fs.writeFileSync(path.join(out,'playtest181.html'),html);
const files=[...assets].map(([name,bytes])=>({name,bytes}));for(const n of Object.keys(result.metafile.outputs))files.push({name:path.basename(n),bytes:fs.statSync(path.resolve(root,n)).size});files.push({name:'playtest181.html',bytes:Buffer.byteLength(html)});fs.writeFileSync(path.join(__dirname,'build-manifest.json'),JSON.stringify({files,totalBytes:files.reduce((n,f)=>n+f.bytes,0),htmlBytes:Buffer.byteLength(html)},null,2));console.log({files:files.length,totalBytes:files.reduce((n,f)=>n+f.bytes,0),htmlBytes:Buffer.byteLength(html)});
})();









