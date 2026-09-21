import {updateFreeView,angle as freeAngle} from './freeride128/view-state.mjs';
import {useCrashGeometry} from './crash-limbs.js';
import {View as PaintedView} from './painted.js';
import {NativeHuman} from './native-human.js';
import * as T from './vendor/three.module.js';
import {height} from './world.js';
import {addRearDetails} from './rear-details.js';
import {BoardContact} from './board-contact.js';
import {RiderFall} from './rider-fall.js';
import {buildAssetBoard} from './asset-boards.js';
export class View extends PaintedView{
 constructor(canvas){super(canvas);this.handle.material=this.handle.material.clone();this.handle.material.color.setHex(0x111317);this.rope.material.color.setHex(0xe9e5d7);this.exhaustUpdate=addRearDetails(this);}
 makeRider(){const group=super.makeRider();group.remove(this.human);this.human=new NativeHuman();this.human.position.y=.023;group.add(this.human);return group;}
 makeBoard(){this.deck=new T.Object3D();return buildAssetBoard('LONGBOARD');}
 setSelection(o){super.setSelection(o);if(this.assetBoardKey!==o.board){this.scene.remove(this.board);this.board=buildAssetBoard(o.board);this.scene.add(this.board);this.assetBoardKey=o.board;this.boardContact=null;}}
 correctBoard(sim){this.boardContact??=new BoardContact(this.board,this.roadContact);this.boardContact.surface=this.contactSurface?.(this.board.position.x,this.board.position.z,.7)??this.surfaceGround;const lift=this.boardContact.update(sim);if(sim.phase!=='crashed'&&sim.phase!=='ended')this.rider.position.y+=lift+this.board.userData.deckHeight-(.08+.023+.0365*this.human.scale.y);}
 correctRider(sim){if(sim.phase==='crashed'||sim.phase==='ended'){if(this.riderFall?.character!==this.human.name)this.riderFall=null;this.riderFall??=new RiderFall(this.rider,this.human,this.roadContact);this.riderFall.surface=this.contactSurface?.(sim.rider.x,sim.rider.z,2)??this.surfaceGround;this.riderFall.character=this.human.name;this.riderFall.update(sim);}else{useCrashGeometry(this.human,false);this.riderFall=null;}}
 draw(sim,dt,input,menu){this.human.towTarget=new T.Vector3(sim.car.hx,height(sim.car.hx,sim.car.hz)+.39,sim.car.hz);this.human.lookTarget=new T.Vector3(sim.car.hx,height(sim.car.hx,sim.car.hz)+.733,sim.car.hz);const free=updateFreeView(this.freeRideView??={blend:0},sim,dt,menu),r=sim.rider;
 if(free.blend>0){const carBearing=Math.atan2(sim.car.hz-r.z,sim.car.hx-r.x),gaze=carBearing+freeAngle(free.heading-carBearing)*free.blend;const distance=8;this.human.lookTarget.set(r.x+Math.cos(gaze)*distance,height(r.x,r.z)+.733+free.blend*.65,r.z+Math.sin(gaze)*distance);}
 this.human.air=Math.min(1,Math.max(0,sim.rider.height/.20));super.draw(sim,dt,input,menu);this.exhaustUpdate?.(sim,menu);}
}
