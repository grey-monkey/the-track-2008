import bpy,json,math
from pathlib import Path
from mathutils import Matrix,Vector
root=Path('C:/Users/grey/Documents/Codex/2026-09-10/r')
# Reuse only the approved source-pose setup, never its texture/model export.
source=(root/'work/crew21/export-native.py').read_text()
exec(source.split('frames=[')[0])
scene.frame_set(1);ropearm();bpy.context.view_layer.update()
base={b.name:b.matrix.copy() for b in rig.pose.bones}
basis={b.name:b.matrix_basis.copy() for b in rig.pose.bones}
rig.animation_data_clear()
C=Matrix(((-1,0,0,0),(0,0,1,shift),(0,1,0,0),(0,0,0,1)))
names=[b.name for b in rig.pose.bones if b.bone.use_deform];indices={n:i for i,n in enumerate(names)}
points=[]
for o in objects:
 ev=o.evaluated_get(bpy.context.evaluated_depsgraph_get());me=ev.to_mesh()
 for v in me.vertices:
  weights=[(indices[o.vertex_groups[g.group].name],g.weight) for g in v.groups if o.vertex_groups[g.group].name in indices and g.weight>.001]
  if not weights:continue
  p=C@o.matrix_world@v.co;total=sum(w for _,w in weights)
  points.append([*[round(x,5) for x in p],[[i,round(w/total,6)] for i,w in weights]])
 ev.to_mesh_clear()
footBase={s:base['foot_'+s].copy() for s in ['l','r']}
for s in ['l','r']:
 target=bpy.data.objects.new('Locked ankle '+s,None);bpy.context.collection.objects.link(target);target.matrix_world=rig.matrix_world@footBase[s]
 ik=rig.pose.bones['calf_'+s].constraints.new('IK');ik.target=target;ik.chain_count=2;ik.use_stretch=False
 rot=rig.pose.bones['foot_'+s].constraints.new('COPY_ROTATION');rot.target=target;rot.owner_space='WORLD';rot.target_space='WORLD'
poses={};errors={}
for key in ['load','brake','flight']:
 for b in rig.pose.bones:b.matrix_basis=basis[b.name]
 bpy.context.view_layer.update()
 # Grounded poses use locked ankles. Flight changes the upper body only;
 # the approved native airborne pose still owns the leg tuck.
 pelvis=rig.pose.bones['pelvis'];m=base['pelvis'].copy()
 if key=='load':m.translation+=Vector((0,.045,-.055))
 elif key=='brake':m.translation+=Vector((0,-.03,-.025))
 pelvis.matrix=m;bpy.context.view_layer.update()
 chest=rig.pose.bones['spine_02']
 chest.matrix=chest.matrix@Matrix.Rotation(math.radians(7 if key=='load' else -5 if key=='brake' else 3),4,'X');bpy.context.view_layer.update()
 # A bent elbow and a wrist aligned with the forearm, never a separate hand wave.
 u=rig.pose.bones['upperarm_l'];l=rig.pose.bones['lowerarm_l'];hand=rig.pose.bones['hand_l']
 offset=Vector((-.055,.09,.095)) if key=='load' else Vector((-.04,-.105,.085)) if key=='brake' else Vector((-.15,.04,.23))
 shoulder=rig.matrix_world@u.head;wrist=rig.matrix_world@hand.head+offset
 a=(u.tail-u.head).length;b=(l.tail-l.head).length;axis=(wrist-shoulder).normalized();dist=min((wrist-shoulder).length,a+b-.04)
 along=(a*a-b*b+dist*dist)/(2*dist);pole=rig.matrix_world@l.head-shoulder;pole=(pole-axis*pole.dot(axis)).normalized()
 elbow=shoulder+axis*along+pole*math.sqrt(max(0,a*a-along*along));target=shoulder+axis*dist
 aim(u,elbow);aim(l,target);aim(hand,target+(target-elbow).normalized()*.10)
 result=[]
 for name in names:
  delta=C@rig.matrix_world@rig.pose.bones[name].matrix@base[name].inverted()@rig.matrix_world.inverted()@C.inverted()
  result.append([round(delta[r][c],8) for r in range(4) for c in range(4)])
 poses[key]=result;errors[key]={s:(rig.pose.bones['foot_'+s].head-footBase[s].translation).length for s in ['l','r']}
original=(root/'outputs/painted-prototype/motion124/carve-field.js').read_text(encoding='utf-8')
data=json.loads(original.removeprefix('export const field=').rstrip().removesuffix(';'))
assert data['bones']==names
data['poses'].update(poses);data['footErrors'].update(errors)
(root/'outputs/painted-prototype/motion125/carve-field.js').write_text('export const field='+json.dumps(data,separators=(',',':'))+';',encoding='utf-8')
print('NEW POSES',list(poses),'ANKLES',errors)
