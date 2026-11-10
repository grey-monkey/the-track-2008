export async function loadBinary(url){
 const response=await fetch(url);if(!response.ok)throw Error('Rider cache download failed: '+response.status);
 const buffer=await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
 const length=new DataView(buffer).getUint32(0,true),data=JSON.parse(new TextDecoder().decode(new Uint8Array(buffer,4,length)));
 data.binary={buffer,offset:4+length};return data;
}
