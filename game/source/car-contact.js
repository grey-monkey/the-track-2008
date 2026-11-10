export {PavementContact} from './motion131/packed-pavement.mjs';
export function groundCar(car,body,wheels,road,pitch){
 // The root carries heading only. Pitch and roll belong to the sprung body.
 car.rotation.set(0,car.rotation.y,0);const yaw=car.rotation.y,co=Math.cos(yaw),si=Math.sin(yaw),contacts=[];
 for(const w of wheels){const [x,,z]=w.pivot,wx=car.position.x+co*x+si*z,wz=car.position.z-si*x+co*z;
  const ground=road.height(wx,wz);if(ground===undefined)continue;
  const turn=yaw+w.steering.rotation.y,c=Math.cos(turn),s=Math.sin(turn);let center=-Infinity;
  // Support the lower tire tread across the slope, not just its center point.
  for(const across of [-.075,0,.075])for(let j=-4;j<=4;j++){const a=j*.125,along=Math.sin(a)*w.radius,dy=-Math.cos(a)*w.radius;const y=road.height(wx+c*across+s*along,wz-s*across+c*along);if(y!==undefined)center=Math.max(center,y-dy);}
  contacts.push({w,ground,center:center+.002});
 }
 if(contacts.length!==4)return;
 const front=contacts.filter(p=>p.w.front),rear=contacts.filter(p=>!p.w.front),left=contacts.filter(p=>p.w.pivot[0]<0),right=contacts.filter(p=>p.w.pivot[0]>0),avg=a=>a.reduce((s,p)=>s+p.ground,0)/a.length;
 car.position.y=avg(contacts);
 body.rotation.set(Math.atan2(avg(front)-avg(rear),2.8)+pitch,0,Math.atan2(avg(right)-avg(left),1.496));
 for(const p of contacts)p.w.steering.position.set(p.w.pivot[0],p.center-car.position.y,p.w.pivot[2]);
}
