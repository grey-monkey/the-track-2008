import * as T from './vendor/three.module.js';
import {kick} from './kickflip-data.js';
import {PortraitNativeHuman} from './portrait-native-human.js';
import {installEyeComparison} from './eye-comparison.js';
import {View as SelectionView} from './selection-view.js';
import {PortraitRider} from './portrait-rider.js';
export class View extends SelectionView{
 draw(sim,dt,input,menu){const r=sim.rider;this.human.flipProgress=false&&sim.time-r.trickStart<r.trickDuration+.10?(sim.time-r.trickStart)/(r.trickDuration+.10):null;super.draw(sim,dt,input,menu);}
 correctBoard(sim){super.correctBoard(sim);const p=this.human.flipProgress;if(p==null||sim.rider.height<.06)return;const f=Math.min(1,p)*(kick.poseNames.length-1),i=Math.min(kick.poseNames.length-2,Math.floor(f)),q=new T.Quaternion().fromArray(kick.boardposes[kick.poseNames[i]]).slerp(new T.Quaternion().fromArray(kick.boardposes[kick.poseNames[i+1]]),f-i);if(this.human.stance==='REGULAR'){q.y=-q.y;q.z=-q.z;}this.board.quaternion.multiply(q);}
 makeRider(){const group=super.makeRider();group.remove(this.human);this.human=new PortraitNativeHuman();this.human.position.y=.023;group.add(this.human);return group;}
 setSelection(o){const previous=this.human?.name;super.setSelection(o);this.human.setStance(o.stance);if(previous!==this.human?.name)this.riderFall=null;}
 makeSelectionPerson(name){const person=new PortraitRider(name);installEyeComparison(person);person.setEyeComparison('eyes');return person;}
}
