import bpy,json,gzip
from pathlib import Path
root=Path(r'C:/Users/grey/Documents/Codex/2026-10-15/download-reverse-engineer-anything-rea-and')
legacy=Path(r'C:/Users/grey/Documents/Codex/2026-09-10/r')
bpy.ops.wm.open_mainfile(filepath=str(legacy/'work/crew20/sources/skater-with-animation/source/skateboard varial.blend'))
namespace={};exec((legacy/'work/clothing70/setup.py').read_text(encoding='utf8'),namespace);obj=namespace['garment_setup']('SALLY')
asset=root/'outputs/track-2008-build136/source/assets/articulated135.json.gz';data=json.loads(gzip.decompress((root/'outputs/track-2008-build135/source/assets/articulated135.json.gz').read_bytes()));rig=data['rig'];named={b['name']:i for i,b in enumerate(rig['bones'])}
part=json.loads((root/'work/sally136-outfit.json').read_text())
print('MODIFIERS',[(m.name,m.type) for m in obj.modifiers]);uvs={}
for loop in obj.data.loops:uvs.setdefault(loop.vertex_index,set()).add(tuple(round(x,5) for x in obj.data.uv_layers.active.data[loop.index].uv))
joints=[];weights=[];bad=[]
for i,(vi,uv) in enumerate(part['keys']):
 if tuple(uv) not in uvs.get(vi,set()):bad.append([i,vi,uv])
 values=[(named[obj.vertex_groups[g.group].name],g.weight) for g in obj.data.vertices[vi].groups if obj.vertex_groups[g.group].name in named and g.weight>1e-7];values=sorted(values,key=lambda v:-v[1])[:8];total=sum(w for j,w in values);assert total>0
 joints.extend([j for j,w in values]+[0]*(8-len(values)));weights.extend([w/total for j,w in values]+[0]*(8-len(values)))
assert len(joints)==rig['characters']['SALLY']['clothing']['count']*8
print('AUTHORED',len(obj.data.vertices),'EXPORTED',len(part['keys']),'UV_MISMATCH',len(bad),bad[:3])
assert not bad,'Topology differs; cannot use vertex identity'
# Smooth the original hoodie weights across welded topology to soften abrupt armpit assignments.
import numpy as np
count=len(obj.data.vertices);W=np.zeros((count,len(named)));adj=[set() for i in range(count)]
for edge in obj.data.edges:
 a,b=edge.vertices;adj[a].add(b);adj[b].add(a)
for i,(vi,uv) in enumerate(part['keys']):
 for j,w in zip(joints[i*8:i*8+8],weights[i*8:i*8+8]):W[vi,j]+=w
for i in range(count):
 if W[i].sum():W[i]/=W[i].sum()
# Only the connected hoodie surface; leave pants and collar insert at their authored weights.
hood=set();stack=[part['keys'][1728][0]]
while stack:
 i=stack.pop()
 if i in hood:continue
 hood.add(i);stack.extend(adj[i]-hood)
for iteration in range(16):
 smooth=W.copy()
 for i in hood:
  if adj[i]:smooth[i]=W[i]*.35+W[list(adj[i])].mean(axis=0)*.65
 W=smooth
joints=[];weights=[]
for vi,uv in part['keys']:
 best=np.argsort(W[vi])[-8:][::-1];w=W[vi,best];w/=w.sum();joints.extend(best.tolist());weights.extend(w.tolist())
target=rig['characters']['SALLY']['clothing'];target.update(joints=joints,weights=weights,method='Original authored MakeHuman garment weights, exact export UV and vertex identity; welded-topology smoothing across hoodie shoulder and sleeve seams')
asset.write_bytes(gzip.compress(json.dumps(data,separators=(',',':')).encode(),compresslevel=9))
print('Smoothed hoodie vertices',len(hood))
