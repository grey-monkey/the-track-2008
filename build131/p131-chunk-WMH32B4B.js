/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var yh=0,Pc=1,Mh=2;var Lc=1,Sh=2,dn=3,bn=0,Le=1,fn=2,wn=0,jn=1,Dc=2,Uc=3,Nc=4,bh=5,On=100,Th=101,Eh=102,wh=103,Ah=104,Ch=200,Rh=201,Ih=202,Ph=203,Fr=204,zr=205,Lh=206,Dh=207,Uh=208,Nh=209,Fh=210,zh=211,Oh=212,Bh=213,Vh=214,_a=0,va=1,ya=2,ti=3,Ma=4,Sa=5,ba=6,Ta=7,Fc=0,kh=1,Hh=2,An=0,Gh=1,Wh=2,Xh=3,qh=4,Yh=5,Zh=6,Jh=7;var zc=300,si=301,ri=302,Ea=303,wa=304,$s=306,Or=1e3,zn=1001,Br=1002,Ne=1003,$h=1004;var Ks=1005;var en=1006,Aa=1007;var kn=1008;var an=1009,Oc=1010,Bc=1011,$i=1012,Ca=1013,Hn=1014,Xe=1015,Ki=1016,Ra=1017,Ia=1018,Qi=1020,Vc=35902,kc=35899,Hc=1021,Gc=1022,Fe=1023,Fi=1026,ji=1027,Pa=1028,La=1029,Wc=1030,Da=1031;var Ua=1033,Qs=33776,js=33777,tr=33778,er=33779,Na=35840,Fa=35841,za=35842,Oa=35843,Ba=36196,Va=37492,ka=37496,Ha=37808,Ga=37809,Wa=37810,Xa=37811,qa=37812,Ya=37813,Za=37814,Ja=37815,$a=37816,Ka=37817,Qa=37818,ja=37819,to=37820,eo=37821,no=36492,io=36494,so=36495,ro=36283,ao=36284,oo=36285,co=36286;var Ss=2300,Vr=2301,Ur=2302,ec=2400,nc=2401,ic=2402;var Kh=3200,Qh=3201;var Xc=0,jh=1,Cn="",He="srgb",ei="srgb-linear",bs="linear",ee="srgb";var Kn=7680;var sc=519,tu=512,eu=513,nu=514,qc=515,iu=516,su=517,ru=518,au=519,kr=35044;var Yc="300 es",tn=2e3,Ts=2001;var Tn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Se=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hl=1234567,_s=Math.PI/180,zi=180/Math.PI;function hn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Se[i&255]+Se[i>>8&255]+Se[i>>16&255]+Se[i>>24&255]+"-"+Se[t&255]+Se[t>>8&255]+"-"+Se[t>>16&15|64]+Se[t>>24&255]+"-"+Se[e&63|128]+Se[e>>8&255]+"-"+Se[e>>16&255]+Se[e>>24&255]+Se[n&255]+Se[n>>8&255]+Se[n>>16&255]+Se[n>>24&255]).toLowerCase()}function Gt(i,t,e){return Math.max(t,Math.min(e,i))}function Zc(i,t){return(i%t+t)%t}function vd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function yd(i,t,e){return i!==t?(e-i)/(t-i):0}function vs(i,t,e){return(1-e)*i+e*t}function Md(i,t,e,n){return vs(i,t,1-Math.exp(-e*n))}function Sd(i,t=1){return t-Math.abs(Zc(i,t*2)-t)}function bd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Td(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ed(i,t){return i+Math.floor(Math.random()*(t-i+1))}function wd(i,t){return i+Math.random()*(t-i)}function Ad(i){return i*(.5-Math.random())}function Cd(i){i!==void 0&&(Hl=i);let t=Hl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Rd(i){return i*_s}function Id(i){return i*zi}function Pd(i){return(i&i-1)===0&&i!==0}function Ld(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Dd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ud(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),p=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*d,c*p,o*l);break;case"YZY":i.set(c*p,o*h,c*d,o*l);break;case"ZXZ":i.set(c*d,c*p,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function je(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function te(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Nd={DEG2RAD:_s,RAD2DEG:zi,generateUUID:hn,clamp:Gt,euclideanModulo:Zc,mapLinear:vd,inverseLerp:yd,lerp:vs,damp:Md,pingpong:Sd,smoothstep:bd,smootherstep:Td,randInt:Ed,randFloat:wd,randFloatSpread:Ad,seededRandom:Cd,degToRad:Rd,radToDeg:Id,isPowerOfTwo:Pd,ceilPowerOfTwo:Ld,floorPowerOfTwo:Dd,setQuaternionFromProperEuler:Ud,normalize:te,denormalize:je},at=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},nn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],p=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=p,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(d!==x||c!==p||l!==f||h!==g){let m=1-o,u=c*p+l*f+h*g+d*x,M=u>=0?1:-1,v=1-u*u;if(v>Number.EPSILON){let A=Math.sqrt(v),w=Math.atan2(A,u*M);m=Math.sin(m*w)/A,o=Math.sin(o*w)/A}let _=o*M;if(c=c*m+p*_,l=l*m+f*_,h=h*m+g*_,d=d*m+x*_,m===1-o){let A=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=A,l*=A,h*=A,d*=A}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],p=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+c*f-l*p,t[e+1]=c*g+h*p+l*d-o*f,t[e+2]=l*g+h*f+o*p-c*d,t[e+3]=h*g-o*d-c*p-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),p=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=p*h*d+l*f*g,this._y=l*f*d-p*h*g,this._z=l*h*g+p*f*d,this._w=l*h*d-p*f*g;break;case"YXZ":this._x=p*h*d+l*f*g,this._y=l*f*d-p*h*g,this._z=l*h*g-p*f*d,this._w=l*h*d+p*f*g;break;case"ZXY":this._x=p*h*d-l*f*g,this._y=l*f*d+p*h*g,this._z=l*h*g+p*f*d,this._w=l*h*d-p*f*g;break;case"ZYX":this._x=p*h*d-l*f*g,this._y=l*f*d+p*h*g,this._z=l*h*g-p*f*d,this._w=l*h*d+p*f*g;break;case"YZX":this._x=p*h*d+l*f*g,this._y=l*f*d+p*h*g,this._z=l*h*g-p*f*d,this._w=l*h*d-p*f*g;break;case"XZY":this._x=p*h*d-l*f*g,this._y=l*f*d-p*h*g,this._z=l*h*g+p*f*d,this._w=l*h*d+p*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],p=n+o+d;if(p>0){let f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Gt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-e)*h)/l,p=Math.sin(e*h)/l;return this._w=a*d+this._w*p,this._x=n*d+this._x*p,this._y=s*d+this._y*p,this._z=r*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Co.copy(this).projectOnVector(t),this.sub(Co)}reflect(t){return this.sub(Co.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Co=new L,Gl=new nn,Bt=class i{constructor(t,e,n,s,r,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],p=n[2],f=n[5],g=n[8],x=s[0],m=s[3],u=s[6],M=s[1],v=s[4],_=s[7],A=s[2],w=s[5],C=s[8];return r[0]=a*x+o*M+c*A,r[3]=a*m+o*v+c*w,r[6]=a*u+o*_+c*C,r[1]=l*x+h*M+d*A,r[4]=l*m+h*v+d*w,r[7]=l*u+h*_+d*C,r[2]=p*x+f*M+g*A,r[5]=p*m+f*v+g*w,r[8]=p*u+f*_+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,p=o*c-h*r,f=l*r-a*c,g=e*d+n*p+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(s*l-h*n)*x,t[2]=(o*n-s*a)*x,t[3]=p*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ro.makeScale(t,e)),this}rotate(t){return this.premultiply(Ro.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ro.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Ro=new Bt;function Jc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Oi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ou(){let i=Oi("canvas");return i.style.display="block",i}var Wl={};function Bi(i){i in Wl||(Wl[i]=!0,console.warn(i))}function cu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Xl=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ql=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Fd(){let i={enabled:!0,workingColorSpace:ei,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ee&&(s.r=Sn(s.r),s.g=Sn(s.g),s.b=Sn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ee&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Cn?bs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Bi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Bi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ei]:{primaries:t,whitePoint:n,transfer:bs,toXYZ:Xl,fromXYZ:ql,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:n,transfer:ee,toXYZ:Xl,fromXYZ:ql,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),i}var Jt=Fd();function Sn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ni(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var xi,Hr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{xi===void 0&&(xi=Oi("canvas")),xi.width=t.width,xi.height=t.height;let s=xi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=xi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Oi("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Sn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Sn(e[n]/255)*255):e[n]=Sn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},zd=0,Vi=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=hn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Io(s[a].image)):r.push(Io(s[a]))}else r=Io(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Io(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Od=0,Po=new L,Ee=class i extends Tn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=zn,s=zn,r=en,a=kn,o=Fe,c=an,l=i.DEFAULT_ANISOTROPY,h=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=hn(),this.name="",this.source=new Vi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Po).x}get height(){return this.source.getSize(Po).y}get depth(){return this.source.getSize(Po).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==zc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Or:t.x=t.x-Math.floor(t.x);break;case zn:t.x=t.x<0?0:1;break;case Br:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Or:t.y=t.y-Math.floor(t.y);break;case zn:t.y=t.y<0?0:1;break;case Br:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ee.DEFAULT_IMAGE=null;Ee.DEFAULT_MAPPING=zc;Ee.DEFAULT_ANISOTROPY=1;var ae=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],d=c[8],p=c[1],f=c[5],g=c[9],x=c[2],m=c[6],u=c[10];if(Math.abs(h-p)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(l+1)/2,_=(f+1)/2,A=(u+1)/2,w=(h+p)/4,C=(d+x)/4,R=(g+m)/4;return v>_&&v>A?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=w/n,r=C/n):_>A?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=R/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=C/r,s=R/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(p-h)*(p-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-x)/M,this.z=(p-h)/M,this.w=Math.acos((l+f+u-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this.w=Gt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this.w=Gt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Gr=class extends Tn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ae(0,0,t,e),this.scissorTest=!1,this.viewport=new ae(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new Ee(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Vi(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Je=class extends Gr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Es=class extends Ee{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Wr=class extends Ee{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Me=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint($e.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint($e.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=$e.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,$e):$e.fromBufferAttribute(r,a),$e.applyMatrix4(t.matrixWorld),this.expandByPoint($e);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),or.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),or.copy(n.boundingBox)),or.applyMatrix4(t.matrixWorld),this.union(or)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,$e),$e.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(os),cr.subVectors(this.max,os),_i.subVectors(t.a,os),vi.subVectors(t.b,os),yi.subVectors(t.c,os),Pn.subVectors(vi,_i),Ln.subVectors(yi,vi),Yn.subVectors(_i,yi);let e=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-Yn.z,Yn.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,Yn.z,0,-Yn.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-Yn.y,Yn.x,0];return!Lo(e,_i,vi,yi,cr)||(e=[1,0,0,0,1,0,0,0,1],!Lo(e,_i,vi,yi,cr))?!1:(lr.crossVectors(Pn,Ln),e=[lr.x,lr.y,lr.z],Lo(e,_i,vi,yi,cr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,$e).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize($e).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},gn=[new L,new L,new L,new L,new L,new L,new L,new L],$e=new L,or=new Me,_i=new L,vi=new L,yi=new L,Pn=new L,Ln=new L,Yn=new L,os=new L,cr=new L,lr=new L,Zn=new L;function Lo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Zn.fromArray(i,r);let o=s.x*Math.abs(Zn.x)+s.y*Math.abs(Zn.y)+s.z*Math.abs(Zn.z),c=t.dot(Zn),l=e.dot(Zn),h=n.dot(Zn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Bd=new Me,cs=new L,Do=new L,En=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Bd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;cs.subVectors(t,this.center);let e=cs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(cs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Do.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(cs.copy(t.center).add(Do)),this.expandByPoint(cs.copy(t.center).sub(Do))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},xn=new L,Uo=new L,hr=new L,Dn=new L,No=new L,ur=new L,Fo=new L,ki=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xn.copy(this.origin).addScaledVector(this.direction,e),xn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Uo.copy(t).add(e).multiplyScalar(.5),hr.copy(e).sub(t).normalize(),Dn.copy(this.origin).sub(Uo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(hr),o=Dn.dot(this.direction),c=-Dn.dot(hr),l=Dn.lengthSq(),h=Math.abs(1-a*a),d,p,f,g;if(h>0)if(d=a*c-o,p=a*o-c,g=r*h,d>=0)if(p>=-g)if(p<=g){let x=1/h;d*=x,p*=x,f=d*(d+a*p+2*o)+p*(a*d+p+2*c)+l}else p=r,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*c)+l;else p=-r,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*c)+l;else p<=-g?(d=Math.max(0,-(-a*r+o)),p=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+p*(p+2*c)+l):p<=g?(d=0,p=Math.min(Math.max(-r,-c),r),f=p*(p+2*c)+l):(d=Math.max(0,-(a*r+o)),p=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+p*(p+2*c)+l);else p=a>0?-r:r,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Uo).addScaledVector(hr,p),f}intersectSphere(t,e){xn.subVectors(t.center,this.origin);let n=xn.dot(this.direction),s=xn.dot(xn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,p=this.origin;return l>=0?(n=(t.min.x-p.x)*l,s=(t.max.x-p.x)*l):(n=(t.max.x-p.x)*l,s=(t.min.x-p.x)*l),h>=0?(r=(t.min.y-p.y)*h,a=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,a=(t.min.y-p.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-p.z)*d,c=(t.max.z-p.z)*d):(o=(t.max.z-p.z)*d,c=(t.min.z-p.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,xn)!==null}intersectTriangle(t,e,n,s,r){No.subVectors(e,t),ur.subVectors(n,t),Fo.crossVectors(No,ur);let a=this.direction.dot(Fo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Dn.subVectors(this.origin,t);let c=o*this.direction.dot(ur.crossVectors(Dn,ur));if(c<0)return null;let l=o*this.direction.dot(No.cross(Dn));if(l<0||c+l>a)return null;let h=-o*Dn.dot(Fo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class i{constructor(t,e,n,s,r,a,o,c,l,h,d,p,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,d,p,f,g,x,m)}set(t,e,n,s,r,a,o,c,l,h,d,p,f,g,x,m){let u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=h,u[10]=d,u[14]=p,u[3]=f,u[7]=g,u[11]=x,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Mi.setFromMatrixColumn(t,0).length(),r=1/Mi.setFromMatrixColumn(t,1).length(),a=1/Mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let p=a*h,f=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=p-x*l,e[9]=-o*c,e[2]=x-p*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){let p=c*h,f=c*d,g=l*h,x=l*d;e[0]=p+x*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=x+p*o,e[10]=a*c}else if(t.order==="ZXY"){let p=c*h,f=c*d,g=l*h,x=l*d;e[0]=p-x*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=x-p*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let p=a*h,f=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=g*l-f,e[8]=p*l+x,e[1]=c*d,e[5]=x*l+p,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let p=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=x-p*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*d+g,e[10]=p-x*d}else if(t.order==="XZY"){let p=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=p*d+x,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=x*d+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vd,t,kd)}lookAt(t,e,n){let s=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Un.crossVectors(n,Ve),Un.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Un.crossVectors(n,Ve)),Un.normalize(),dr.crossVectors(Ve,Un),s[0]=Un.x,s[4]=dr.x,s[8]=Ve.x,s[1]=Un.y,s[5]=dr.y,s[9]=Ve.y,s[2]=Un.z,s[6]=dr.z,s[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],p=n[9],f=n[13],g=n[2],x=n[6],m=n[10],u=n[14],M=n[3],v=n[7],_=n[11],A=n[15],w=s[0],C=s[4],R=s[8],S=s[12],b=s[1],P=s[5],U=s[9],O=s[13],k=s[2],G=s[6],W=s[10],et=s[14],X=s[3],ut=s[7],xt=s[11],yt=s[15];return r[0]=a*w+o*b+c*k+l*X,r[4]=a*C+o*P+c*G+l*ut,r[8]=a*R+o*U+c*W+l*xt,r[12]=a*S+o*O+c*et+l*yt,r[1]=h*w+d*b+p*k+f*X,r[5]=h*C+d*P+p*G+f*ut,r[9]=h*R+d*U+p*W+f*xt,r[13]=h*S+d*O+p*et+f*yt,r[2]=g*w+x*b+m*k+u*X,r[6]=g*C+x*P+m*G+u*ut,r[10]=g*R+x*U+m*W+u*xt,r[14]=g*S+x*O+m*et+u*yt,r[3]=M*w+v*b+_*k+A*X,r[7]=M*C+v*P+_*G+A*ut,r[11]=M*R+v*U+_*W+A*xt,r[15]=M*S+v*O+_*et+A*yt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],p=t[10],f=t[14],g=t[3],x=t[7],m=t[11],u=t[15];return g*(+r*c*d-s*l*d-r*o*p+n*l*p+s*o*f-n*c*f)+x*(+e*c*f-e*l*p+r*a*p-s*a*f+s*l*h-r*c*h)+m*(+e*l*d-e*o*f-r*a*d+n*a*f+r*o*h-n*l*h)+u*(-s*o*h-e*c*d+e*o*p+s*a*d-n*a*p+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],p=t[10],f=t[11],g=t[12],x=t[13],m=t[14],u=t[15],M=d*m*l-x*p*l+x*c*f-o*m*f-d*c*u+o*p*u,v=g*p*l-h*m*l-g*c*f+a*m*f+h*c*u-a*p*u,_=h*x*l-g*d*l+g*o*f-a*x*f-h*o*u+a*d*u,A=g*d*c-h*x*c-g*o*p+a*x*p+h*o*m-a*d*m,w=e*M+n*v+s*_+r*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/w;return t[0]=M*C,t[1]=(x*p*r-d*m*r-x*s*f+n*m*f+d*s*u-n*p*u)*C,t[2]=(o*m*r-x*c*r+x*s*l-n*m*l-o*s*u+n*c*u)*C,t[3]=(d*c*r-o*p*r-d*s*l+n*p*l+o*s*f-n*c*f)*C,t[4]=v*C,t[5]=(h*m*r-g*p*r+g*s*f-e*m*f-h*s*u+e*p*u)*C,t[6]=(g*c*r-a*m*r-g*s*l+e*m*l+a*s*u-e*c*u)*C,t[7]=(a*p*r-h*c*r+h*s*l-e*p*l-a*s*f+e*c*f)*C,t[8]=_*C,t[9]=(g*d*r-h*x*r-g*n*f+e*x*f+h*n*u-e*d*u)*C,t[10]=(a*x*r-g*o*r+g*n*l-e*x*l-a*n*u+e*o*u)*C,t[11]=(h*o*r-a*d*r-h*n*l+e*d*l+a*n*f-e*o*f)*C,t[12]=A*C,t[13]=(h*x*s-g*d*s+g*n*p-e*x*p-h*n*m+e*d*m)*C,t[14]=(g*o*s-a*x*s-g*n*c+e*x*c+a*n*m-e*o*m)*C,t[15]=(a*d*s-h*o*s+h*n*c-e*d*c-a*n*p+e*o*p)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,p=r*l,f=r*h,g=r*d,x=a*h,m=a*d,u=o*d,M=c*l,v=c*h,_=c*d,A=n.x,w=n.y,C=n.z;return s[0]=(1-(x+u))*A,s[1]=(f+_)*A,s[2]=(g-v)*A,s[3]=0,s[4]=(f-_)*w,s[5]=(1-(p+u))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(g+v)*C,s[9]=(m-M)*C,s[10]=(1-(p+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Mi.set(s[0],s[1],s[2]).length(),a=Mi.set(s[4],s[5],s[6]).length(),o=Mi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Ke.copy(this);let l=1/r,h=1/a,d=1/o;return Ke.elements[0]*=l,Ke.elements[1]*=l,Ke.elements[2]*=l,Ke.elements[4]*=h,Ke.elements[5]*=h,Ke.elements[6]*=h,Ke.elements[8]*=d,Ke.elements[9]*=d,Ke.elements[10]*=d,e.setFromRotationMatrix(Ke),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=tn,c=!1){let l=this.elements,h=2*r/(e-t),d=2*r/(n-s),p=(e+t)/(e-t),f=(n+s)/(n-s),g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===tn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Ts)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=tn,c=!1){let l=this.elements,h=2/(e-t),d=2/(n-s),p=-(e+t)/(e-t),f=-(n+s)/(n-s),g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===tn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Ts)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Mi=new L,Ke=new Qt,Vd=new L(0,0,0),kd=new L(1,1,1),Un=new L,dr=new L,Ve=new L,Yl=new Qt,Zl=new nn,sn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],p=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Gt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zl.setFromEuler(this),this.setFromQuaternion(Zl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};sn.DEFAULT_ORDER="XYZ";var Hi=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Hd=0,Jl=new L,Si=new nn,_n=new Qt,fr=new L,ls=new L,Gd=new L,Wd=new nn,$l=new L(1,0,0),Kl=new L(0,1,0),Ql=new L(0,0,1),jl={type:"added"},Xd={type:"removed"},bi={type:"childadded",child:null},zo={type:"childremoved",child:null},ve=class i extends Tn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new sn,n=new nn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Bt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.multiply(Si),this}rotateOnWorldAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.premultiply(Si),this}rotateX(t){return this.rotateOnAxis($l,t)}rotateY(t){return this.rotateOnAxis(Kl,t)}rotateZ(t){return this.rotateOnAxis(Ql,t)}translateOnAxis(t,e){return Jl.copy(t).applyQuaternion(this.quaternion),this.position.add(Jl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($l,t)}translateY(t){return this.translateOnAxis(Kl,t)}translateZ(t){return this.translateOnAxis(Ql,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?fr.copy(t):fr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(ls,fr,this.up):_n.lookAt(fr,ls,this.up),this.quaternion.setFromRotationMatrix(_n),s&&(_n.extractRotation(s.matrixWorld),Si.setFromRotationMatrix(_n),this.quaternion.premultiply(Si.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(jl),bi.child=t,this.dispatchEvent(bi),bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xd),zo.child=t,this.dispatchEvent(zo),zo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_n.multiply(t.parent.matrixWorld)),t.applyMatrix4(_n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(jl),bi.child=t,this.dispatchEvent(bi),bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,Gd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,Wd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),p=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};ve.DEFAULT_UP=new L(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Qe=new L,vn=new L,Oo=new L,yn=new L,Ti=new L,Ei=new L,th=new L,Bo=new L,Vo=new L,ko=new L,Ho=new ae,Go=new ae,Wo=new ae,Mn=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Qe.subVectors(t,e),s.cross(Qe);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Qe.subVectors(s,e),vn.subVectors(n,e),Oo.subVectors(t,e);let a=Qe.dot(Qe),o=Qe.dot(vn),c=Qe.dot(Oo),l=vn.dot(vn),h=vn.dot(Oo),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let p=1/d,f=(l*c-o*h)*p,g=(a*h-o*c)*p;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,yn.x),c.addScaledVector(a,yn.y),c.addScaledVector(o,yn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Ho.setScalar(0),Go.setScalar(0),Wo.setScalar(0),Ho.fromBufferAttribute(t,e),Go.fromBufferAttribute(t,n),Wo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ho,r.x),a.addScaledVector(Go,r.y),a.addScaledVector(Wo,r.z),a}static isFrontFacing(t,e,n,s){return Qe.subVectors(n,e),vn.subVectors(t,e),Qe.cross(vn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qe.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),Qe.cross(vn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ti.subVectors(s,n),Ei.subVectors(r,n),Bo.subVectors(t,n);let c=Ti.dot(Bo),l=Ei.dot(Bo);if(c<=0&&l<=0)return e.copy(n);Vo.subVectors(t,s);let h=Ti.dot(Vo),d=Ei.dot(Vo);if(h>=0&&d<=h)return e.copy(s);let p=c*d-h*l;if(p<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Ti,a);ko.subVectors(t,r);let f=Ti.dot(ko),g=Ei.dot(ko);if(g>=0&&f<=g)return e.copy(r);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Ei,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return th.subVectors(r,s),o=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(th,o);let u=1/(m+x+p);return a=x*u,o=p*u,e.copy(n).addScaledVector(Ti,a).addScaledVector(Ei,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},lu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},pr={h:0,s:0,l:0};function Xo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Wt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Jt.workingColorSpace){if(t=Zc(t,1),e=Gt(e,0,1),n=Gt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Xo(a,r,t+1/3),this.g=Xo(a,r,t),this.b=Xo(a,r,t-1/3)}return Jt.colorSpaceToWorking(this,s),this}setStyle(t,e=He){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){let n=lu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Sn(t.r),this.g=Sn(t.g),this.b=Sn(t.b),this}copyLinearToSRGB(t){return this.r=Ni(t.r),this.g=Ni(t.g),this.b=Ni(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return Jt.workingToColorSpace(be.copy(this),t),Math.round(Gt(be.r*255,0,255))*65536+Math.round(Gt(be.g*255,0,255))*256+Math.round(Gt(be.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(be.copy(this),e);let n=be.r,s=be.g,r=be.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(be.copy(this),e),t.r=be.r,t.g=be.g,t.b=be.b,t}getStyle(t=He){Jt.workingToColorSpace(be.copy(this),t);let e=be.r,n=be.g,s=be.b;return t!==He?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Nn),this.setHSL(Nn.h+t,Nn.s+e,Nn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Nn),t.getHSL(pr);let n=vs(Nn.h,pr.h,e),s=vs(Nn.s,pr.s,e),r=vs(Nn.l,pr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},be=new Wt;Wt.NAMES=lu;var qd=0,un=class extends Tn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=hn(),this.name="",this.type="Material",this.blending=jn,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fr,this.blendDst=zr,this.blendEquation=On,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=ti,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kn,this.stencilZFail=Kn,this.stencilZPass=Kn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==jn&&(n.blending=this.blending),this.side!==bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fr&&(n.blendSrc=this.blendSrc),this.blendDst!==zr&&(n.blendDst=this.blendDst),this.blendEquation!==On&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ti&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Kn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Kn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},ws=class extends un{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=Fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var pe=new L,mr=new at,Yd=0,Pe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=kr,this.updateRanges=[],this.gpuType=Xe,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)mr.fromBufferAttribute(this,e),mr.applyMatrix3(t),this.setXY(e,mr.x,mr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=je(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=te(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=je(e,this.array)),e}setX(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=je(e,this.array)),e}setY(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=je(e,this.array)),e}setZ(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=je(e,this.array)),e}setW(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array),s=te(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array),s=te(s,this.array),r=te(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==kr&&(t.usage=this.usage),t}};var As=class extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Cs=class extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ht=class extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Zd=0,Ze=new Qt,qo=new ve,wi=new L,ke=new Me,hs=new Me,_e=new L,fe=class i extends Tn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Jc(t)?Cs:As)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return qo.lookAt(t),qo.updateMatrix(),this.applyMatrix4(qo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ht(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Me);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];ke.setFromBufferAttribute(r),this.morphTargetsRelative?(_e.addVectors(this.boundingBox.min,ke.min),this.boundingBox.expandByPoint(_e),_e.addVectors(this.boundingBox.max,ke.max),this.boundingBox.expandByPoint(_e)):(this.boundingBox.expandByPoint(ke.min),this.boundingBox.expandByPoint(ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new En);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];hs.setFromBufferAttribute(o),this.morphTargetsRelative?(_e.addVectors(ke.min,hs.min),ke.expandByPoint(_e),_e.addVectors(ke.max,hs.max),ke.expandByPoint(_e)):(ke.expandByPoint(hs.min),ke.expandByPoint(hs.max))}ke.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)_e.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(_e));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)_e.fromBufferAttribute(o,l),c&&(wi.fromBufferAttribute(t,l),_e.add(wi)),s=Math.max(s,n.distanceToSquared(_e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let R=0;R<n.count;R++)o[R]=new L,c[R]=new L;let l=new L,h=new L,d=new L,p=new at,f=new at,g=new at,x=new L,m=new L;function u(R,S,b){l.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,b),p.fromBufferAttribute(r,R),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,b),h.sub(l),d.sub(l),f.sub(p),g.sub(p);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[R].add(x),o[S].add(x),o[b].add(x),c[R].add(m),c[S].add(m),c[b].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,S=M.length;R<S;++R){let b=M[R],P=b.start,U=b.count;for(let O=P,k=P+U;O<k;O+=3)u(t.getX(O+0),t.getX(O+1),t.getX(O+2))}let v=new L,_=new L,A=new L,w=new L;function C(R){A.fromBufferAttribute(s,R),w.copy(A);let S=o[R];v.copy(S),v.sub(A.multiplyScalar(A.dot(S))).normalize(),_.crossVectors(w,S);let P=_.dot(c[R])<0?-1:1;a.setXYZW(R,v.x,v.y,v.z,P)}for(let R=0,S=M.length;R<S;++R){let b=M[R],P=b.start,U=b.count;for(let O=P,k=P+U;O<k;O+=3)C(t.getX(O+0)),C(t.getX(O+1)),C(t.getX(O+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);let s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,h=new L,d=new L;if(t)for(let p=0,f=t.count;p<f;p+=3){let g=t.getX(p+0),x=t.getX(p+1),m=t.getX(p+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let p=0,f=e.count;p<f;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)_e.fromBufferAttribute(t,e),_e.normalize(),t.setXYZ(e,_e.x,_e.y,_e.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,d=o.normalized,p=new l.constructor(c.length*h),f=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*h;for(let u=0;u<h;u++)p[g++]=l[f++]}return new Pe(p,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){let p=l[h],f=t(p,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,p=l.length;d<p;d++){let f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],d=r[l];for(let p=0,f=d.length;p<f;p++)h.push(d[p].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},eh=new Qt,Jn=new ki,gr=new En,nh=new L,xr=new L,_r=new L,vr=new L,Yo=new L,yr=new L,ih=new L,Mr=new L,we=class extends ve{constructor(t=new fe,e=new ws){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){yr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],d=r[c];h!==0&&(Yo.fromBufferAttribute(d,t),a?yr.addScaledVector(Yo,h):yr.addScaledVector(Yo.sub(e),h))}e.add(yr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(r),Jn.copy(t.ray).recast(t.near),!(gr.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere(gr,nh)===null||Jn.origin.distanceToSquared(nh)>(t.far-t.near)**2))&&(eh.copy(r).invert(),Jn.copy(t.ray).applyMatrix4(eh),!(n.boundingBox!==null&&Jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Jn)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,p=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=p.length;g<x;g++){let m=p[g],u=a[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,A=v;_<A;_+=3){let w=o.getX(_),C=o.getX(_+1),R=o.getX(_+2);s=Sr(this,u,t,n,l,h,d,w,C,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,u=x;m<u;m+=3){let M=o.getX(m),v=o.getX(m+1),_=o.getX(m+2);s=Sr(this,a,t,n,l,h,d,M,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=p.length;g<x;g++){let m=p[g],u=a[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,A=v;_<A;_+=3){let w=_,C=_+1,R=_+2;s=Sr(this,u,t,n,l,h,d,w,C,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,u=x;m<u;m+=3){let M=m,v=m+1,_=m+2;s=Sr(this,a,t,n,l,h,d,M,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Jd(i,t,e,n,s,r,a,o){let c;if(t.side===Le?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===bn,o),c===null)return null;Mr.copy(o),Mr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Mr);return l<e.near||l>e.far?null:{distance:l,point:Mr.clone(),object:i}}function Sr(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,xr),i.getVertexPosition(c,_r),i.getVertexPosition(l,vr);let h=Jd(i,t,e,n,xr,_r,vr,ih);if(h){let d=new L;Mn.getBarycoord(ih,xr,_r,vr,d),s&&(h.uv=Mn.getInterpolatedAttribute(s,o,c,l,d,new at)),r&&(h.uv1=Mn.getInterpolatedAttribute(r,o,c,l,d,new at)),a&&(h.normal=Mn.getInterpolatedAttribute(a,o,c,l,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let p={a:o,b:c,c:l,normal:new L,materialIndex:0};Mn.getNormal(xr,_r,vr,p.normal),h.face=p,h.barycoord=d}return h}var Gi=class i extends fe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],d=[],p=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ht(l,3)),this.setAttribute("normal",new Ht(h,3)),this.setAttribute("uv",new Ht(d,2));function g(x,m,u,M,v,_,A,w,C,R,S){let b=_/C,P=A/R,U=_/2,O=A/2,k=w/2,G=C+1,W=R+1,et=0,X=0,ut=new L;for(let xt=0;xt<W;xt++){let yt=xt*P-O;for(let Ot=0;Ot<G;Ot++){let Yt=Ot*b-U;ut[x]=Yt*M,ut[m]=yt*v,ut[u]=k,l.push(ut.x,ut.y,ut.z),ut[x]=0,ut[m]=0,ut[u]=w>0?1:-1,h.push(ut.x,ut.y,ut.z),d.push(Ot/C),d.push(1-xt/R),et+=1}}for(let xt=0;xt<R;xt++)for(let yt=0;yt<C;yt++){let Ot=p+yt+G*xt,Yt=p+yt+G*(xt+1),jt=p+(yt+1)+G*(xt+1),Zt=p+(yt+1)+G*xt;c.push(Ot,Yt,Zt),c.push(Yt,jt,Zt),X+=6}o.addGroup(f,X,S),f+=X,p+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ai(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ae(i){let t={};for(let e=0;e<i.length;e++){let n=ai(i[e]);for(let s in n)t[s]=n[s]}return t}function $d(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function $c(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}var hu={clone:ai,merge:Ae},Kd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,rn=class extends un{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kd,this.fragmentShader=Qd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ai(t.uniforms),this.uniformsGroups=$d(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Rs=class extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Fn=new L,sh=new at,rh=new at,Te=class extends Rs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=zi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(_s*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zi*2*Math.atan(Math.tan(_s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z)}getViewSize(t,e){return this.getViewBounds(t,sh,rh),e.subVectors(rh,sh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(_s*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ai=-90,Ci=1,Xr=class extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Te(Ai,Ci,t,e);s.layers=this.layers,this.add(s);let r=new Te(Ai,Ci,t,e);r.layers=this.layers,this.add(r);let a=new Te(Ai,Ci,t,e);a.layers=this.layers,this.add(a);let o=new Te(Ai,Ci,t,e);o.layers=this.layers,this.add(o);let c=new Te(Ai,Ci,t,e);c.layers=this.layers,this.add(c);let l=new Te(Ai,Ci,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ts)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),p=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,p,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Is=class extends Ee{constructor(t=[],e=si,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},qr=class extends Je{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Is(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Gi(5,5,5),r=new rn({name:"CubemapFromEquirect",uniforms:ai(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:wn});r.uniforms.tEquirect.value=e;let a=new we(s,r),o=e.minFilter;return e.minFilter===kn&&(e.minFilter=en),new Xr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},Qn=class extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}},jd={type:"move"},Wi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),u=this._getHandJoint(l,x);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],p=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&p>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&p<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jd)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Qn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},rc=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Wt(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ps=class extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sn,this.environmentIntensity=1,this.environmentRotation=new sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Yr=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=kr,this.updateRanges=[],this.version=0,this.uuid=hn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ie=new L,Ls=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=je(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=te(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=je(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=je(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=je(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=je(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array),s=te(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array),s=te(s,this.array),r=te(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Pe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Zr=class extends un{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Ri,us=new L,Ii=new L,Pi=new L,Li=new at,ds=new at,uu=new Qt,br=new L,fs=new L,Tr=new L,ah=new at,Zo=new at,oh=new at,ac=class extends ve{constructor(t=new Zr){if(super(),this.isSprite=!0,this.type="Sprite",Ri===void 0){Ri=new fe;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Yr(e,5);Ri.setIndex([0,1,2,0,2,3]),Ri.setAttribute("position",new Ls(n,3,0,!1)),Ri.setAttribute("uv",new Ls(n,2,3,!1))}this.geometry=Ri,this.material=t,this.center=new at(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ii.setFromMatrixScale(this.matrixWorld),uu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Pi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ii.multiplyScalar(-Pi.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Er(br.set(-.5,-.5,0),Pi,a,Ii,s,r),Er(fs.set(.5,-.5,0),Pi,a,Ii,s,r),Er(Tr.set(.5,.5,0),Pi,a,Ii,s,r),ah.set(0,0),Zo.set(1,0),oh.set(1,1);let o=t.ray.intersectTriangle(br,fs,Tr,!1,us);if(o===null&&(Er(fs.set(-.5,.5,0),Pi,a,Ii,s,r),Zo.set(0,1),o=t.ray.intersectTriangle(br,Tr,fs,!1,us),o===null))return;let c=t.ray.origin.distanceTo(us);c<t.near||c>t.far||e.push({distance:c,point:us.clone(),uv:Mn.getInterpolation(us,br,fs,Tr,ah,Zo,oh,new at),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Er(i,t,e,n,s,r){Li.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(ds.x=r*Li.x-s*Li.y,ds.y=s*Li.x+r*Li.y):ds.copy(Li),i.copy(t),i.x+=ds.x,i.y+=ds.y,i.applyMatrix4(uu)}var Xi=class extends Ee{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Ne,h=Ne,d,p){super(null,a,o,c,l,h,s,r,d,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ds=class extends Pe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Di=new Qt,ch=new Qt,wr=[],lh=new Me,tf=new Qt,ps=new we,ms=new En,oc=class extends we{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ds(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,tf)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Me),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Di),lh.copy(t.boundingBox).applyMatrix4(Di),this.boundingBox.union(lh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new En),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Di),ms.copy(t.boundingSphere).applyMatrix4(Di),this.boundingSphere.union(ms)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(ps.geometry=this.geometry,ps.material=this.material,ps.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ms.copy(this.boundingSphere),ms.applyMatrix4(n),t.ray.intersectsSphere(ms)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Di),ch.multiplyMatrices(n,Di),ps.matrixWorld=ch,ps.raycast(t,wr);for(let a=0,o=wr.length;a<o;a++){let c=wr[a];c.instanceId=r,c.object=this,e.push(c)}wr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ds(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Xi(new Float32Array(s*this.count),s,this.count,Pa,Xe));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Jo=new L,ef=new L,nf=new Bt,cn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Jo.subVectors(n,e).cross(ef.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Jo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||nf.getNormalMatrix(t),s=this.coplanarPoint(Jo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},$n=new En,sf=new at(.5,.5),Ar=new L,qi=class{constructor(t=new cn,e=new cn,n=new cn,s=new cn,r=new cn,a=new cn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=tn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],p=r[6],f=r[7],g=r[8],x=r[9],m=r[10],u=r[11],M=r[12],v=r[13],_=r[14],A=r[15];if(s[0].setComponents(l-a,f-h,u-g,A-M).normalize(),s[1].setComponents(l+a,f+h,u+g,A+M).normalize(),s[2].setComponents(l+o,f+d,u+x,A+v).normalize(),s[3].setComponents(l-o,f-d,u-x,A-v).normalize(),n)s[4].setComponents(c,p,m,_).normalize(),s[5].setComponents(l-c,f-p,u-m,A-_).normalize();else if(s[4].setComponents(l-c,f-p,u-m,A-_).normalize(),e===tn)s[5].setComponents(l+c,f+p,u+m,A+_).normalize();else if(e===Ts)s[5].setComponents(c,p,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$n.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$n.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($n)}intersectsSprite(t){$n.center.set(0,0,0);let e=sf.distanceTo(t.center);return $n.radius=.7071067811865476+e,$n.applyMatrix4(t.matrixWorld),this.intersectsSphere($n)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ar.x=s.normal.x>0?t.max.x:t.min.x,Ar.y=s.normal.y>0?t.max.y:t.min.y,Ar.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ar)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Jr=class extends un{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},$r=new L,Kr=new L,hh=new Qt,gs=new ki,Cr=new En,$o=new L,uh=new L,cc=class extends ve{constructor(t=new fe,e=new Jr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)$r.fromBufferAttribute(e,s-1),Kr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=$r.distanceTo(Kr);t.setAttribute("lineDistance",new Ht(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(s),Cr.radius+=r,t.ray.intersectsSphere(Cr)===!1)return;hh.copy(s).invert(),gs.copy(t.ray).applyMatrix4(hh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){let u=h.getX(x),M=h.getX(x+1),v=Rr(this,t,gs,c,u,M,x);v&&e.push(v)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(f),u=Rr(this,t,gs,c,x,m,g-1);u&&e.push(u)}}else{let f=Math.max(0,a.start),g=Math.min(p.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){let u=Rr(this,t,gs,c,x,x+1,x);u&&e.push(u)}if(this.isLineLoop){let x=Rr(this,t,gs,c,g-1,f,g-1);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Rr(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if($r.fromBufferAttribute(o,s),Kr.fromBufferAttribute(o,r),e.distanceSqToSegment($r,Kr,$o,uh)>n)return;$o.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo($o);if(!(l<t.near||l>t.far))return{distance:l,point:uh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var lc=class extends Ee{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Us=class extends Ee{constructor(t,e,n=Hn,s,r,a,o=Ne,c=Ne,l,h=Fi,d=1){if(h!==Fi&&h!==ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let p={width:t,height:e,depth:d};super(p,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Vi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Ns=class extends Ee{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var hc=class i extends fe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],c=[],l=new L,h=new at;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,p=3;d<=e;d++,p+=3){let f=n+d/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[p]/t+1)/2,h.y=(a[p+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Ht(a,3)),this.setAttribute("normal",new Ht(o,3)),this.setAttribute("uv",new Ht(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Qr=class i extends fe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],p=[],f=[],g=0,x=[],m=n/2,u=0;M(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Ht(d,3)),this.setAttribute("normal",new Ht(p,3)),this.setAttribute("uv",new Ht(f,2));function M(){let _=new L,A=new L,w=0,C=(e-t)/n;for(let R=0;R<=r;R++){let S=[],b=R/r,P=b*(e-t)+t;for(let U=0;U<=s;U++){let O=U/s,k=O*c+o,G=Math.sin(k),W=Math.cos(k);A.x=P*G,A.y=-b*n+m,A.z=P*W,d.push(A.x,A.y,A.z),_.set(G,C,W).normalize(),p.push(_.x,_.y,_.z),f.push(O,1-b),S.push(g++)}x.push(S)}for(let R=0;R<s;R++)for(let S=0;S<r;S++){let b=x[S][R],P=x[S+1][R],U=x[S+1][R+1],O=x[S][R+1];(t>0||S!==0)&&(h.push(b,P,O),w+=3),(e>0||S!==r-1)&&(h.push(P,U,O),w+=3)}l.addGroup(u,w,0),u+=w}function v(_){let A=g,w=new at,C=new L,R=0,S=_===!0?t:e,b=_===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,m*b,0),p.push(0,b,0),f.push(.5,.5),g++;let P=g;for(let U=0;U<=s;U++){let k=U/s*c+o,G=Math.cos(k),W=Math.sin(k);C.x=S*W,C.y=m*b,C.z=S*G,d.push(C.x,C.y,C.z),p.push(0,b,0),w.x=G*.5+.5,w.y=W*.5*b+.5,f.push(w.x,w.y),g++}for(let U=0;U<s;U++){let O=A+U,k=P+U;_===!0?h.push(k,k+1,O):h.push(k+1,k,O),R+=3}l.addGroup(u,R,_===!0?1:2),u+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},uc=class i extends Qr{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},jr=class i extends fe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),l(n),h(),this.setAttribute("position",new Ht(r,3)),this.setAttribute("normal",new Ht(r.slice(),3)),this.setAttribute("uv",new Ht(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let v=new L,_=new L,A=new L;for(let w=0;w<e.length;w+=3)f(e[w+0],v),f(e[w+1],_),f(e[w+2],A),c(v,_,A,M)}function c(M,v,_,A){let w=A+1,C=[];for(let R=0;R<=w;R++){C[R]=[];let S=M.clone().lerp(_,R/w),b=v.clone().lerp(_,R/w),P=w-R;for(let U=0;U<=P;U++)U===0&&R===w?C[R][U]=S:C[R][U]=S.clone().lerp(b,U/P)}for(let R=0;R<w;R++)for(let S=0;S<2*(w-R)-1;S++){let b=Math.floor(S/2);S%2===0?(p(C[R][b+1]),p(C[R+1][b]),p(C[R][b])):(p(C[R][b+1]),p(C[R+1][b+1]),p(C[R+1][b]))}}function l(M){let v=new L;for(let _=0;_<r.length;_+=3)v.x=r[_+0],v.y=r[_+1],v.z=r[_+2],v.normalize().multiplyScalar(M),r[_+0]=v.x,r[_+1]=v.y,r[_+2]=v.z}function h(){let M=new L;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];let _=m(M)/2/Math.PI+.5,A=u(M)/Math.PI+.5;a.push(_,1-A)}g(),d()}function d(){for(let M=0;M<a.length;M+=6){let v=a[M+0],_=a[M+2],A=a[M+4],w=Math.max(v,_,A),C=Math.min(v,_,A);w>.9&&C<.1&&(v<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),A<.2&&(a[M+4]+=1))}}function p(M){r.push(M.x,M.y,M.z)}function f(M,v){let _=M*3;v.x=t[_+0],v.y=t[_+1],v.z=t[_+2]}function g(){let M=new L,v=new L,_=new L,A=new L,w=new at,C=new at,R=new at;for(let S=0,b=0;S<r.length;S+=9,b+=6){M.set(r[S+0],r[S+1],r[S+2]),v.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),w.set(a[b+0],a[b+1]),C.set(a[b+2],a[b+3]),R.set(a[b+4],a[b+5]),A.copy(M).add(v).add(_).divideScalar(3);let P=m(A);x(w,b+0,M,P),x(C,b+2,v,P),x(R,b+4,_,P)}}function x(M,v,_,A){A<0&&M.x===1&&(a[v]=M.x-1),_.x===0&&_.z===0&&(a[v]=A/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function u(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Ge=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let h=n[s],p=n[s+1]-h,f=(a-h)/p;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new at:new L);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new L,s=[],r=[],a=[],o=new L,c=new Qt;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new L)}r[0]=new L,a[0]=new L;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),p<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Gt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Gt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Yi=class extends Ge{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new at){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),p=c-this.aX,f=l-this.aY;c=p*h-f*d+this.aX,l=p*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ta=class extends Yi{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Kc(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,d){let p=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+d)+(c-o)/d;p*=h,f*=h,s(a,o,p,f)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Ir=new L,Ko=new Kc,Qo=new Kc,jo=new Kc,ea=class extends Ge{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(Ir.subVectors(s[0],s[1]).add(s[0]),l=Ir);let d=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Ir.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ir),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(p),f),m=Math.pow(p.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Ko.initNonuniformCatmullRom(l.x,d.x,p.x,h.x,g,x,m),Qo.initNonuniformCatmullRom(l.y,d.y,p.y,h.y,g,x,m),jo.initNonuniformCatmullRom(l.z,d.z,p.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(Ko.initCatmullRom(l.x,d.x,p.x,h.x,this.tension),Qo.initCatmullRom(l.y,d.y,p.y,h.y,this.tension),jo.initCatmullRom(l.z,d.z,p.z,h.z,this.tension));return n.set(Ko.calc(c),Qo.calc(c),jo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function dh(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function rf(i,t){let e=1-i;return e*e*t}function af(i,t){return 2*(1-i)*i*t}function of(i,t){return i*i*t}function ys(i,t,e,n){return rf(i,t)+af(i,e)+of(i,n)}function cf(i,t){let e=1-i;return e*e*e*t}function lf(i,t){let e=1-i;return 3*e*e*i*t}function hf(i,t){return 3*(1-i)*i*i*t}function uf(i,t){return i*i*i*t}function Ms(i,t,e,n,s){return cf(i,t)+lf(i,e)+hf(i,n)+uf(i,s)}var Fs=class extends Ge{constructor(t=new at,e=new at,n=new at,s=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new at){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ms(t,s.x,r.x,a.x,o.x),Ms(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},na=class extends Ge{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ms(t,s.x,r.x,a.x,o.x),Ms(t,s.y,r.y,a.y,o.y),Ms(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},zs=class extends Ge{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ia=class extends Ge{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Os=class extends Ge{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ys(t,s.x,r.x,a.x),ys(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Bs=class extends Ge{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ys(t,s.x,r.x,a.x),ys(t,s.y,r.y,a.y),ys(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Vs=class extends Ge{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(dh(o,c.x,l.x,h.x,d.x),dh(o,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new at().fromArray(s))}return this}},sa=Object.freeze({__proto__:null,ArcCurve:ta,CatmullRomCurve3:ea,CubicBezierCurve:Fs,CubicBezierCurve3:na,EllipseCurve:Yi,LineCurve:zs,LineCurve3:ia,QuadraticBezierCurve:Os,QuadraticBezierCurve3:Bs,SplineCurve:Vs}),ra=class extends Ge{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new sa[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new sa[s.type]().fromJSON(s))}return this}},ks=class extends ra{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new zs(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Os(this.currentPoint.clone(),new at(t,e),new at(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new Fs(this.currentPoint.clone(),new at(t,e),new at(n,s),new at(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Vs(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){let l=new Yi(t,e,n,s,r,a,o,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Hs=class extends ks{constructor(t){super(t),this.uuid=hn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new ks().fromJSON(s))}return this}};function df(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=du(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=xf(i,t,r,e)),i.length>80*e){o=1/0,c=1/0;let h=-1/0,d=-1/0;for(let p=e;p<s;p+=e){let f=i[p],g=i[p+1];f<o&&(o=f),g<c&&(c=g),f>h&&(h=f),g>d&&(d=g)}l=Math.max(h-o,d-c),l=l!==0?32767/l:0}return Gs(r,a,e,o,c,l,0),a}function du(i,t,e,n,s){let r;if(s===Cf(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=fh(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=fh(a/n|0,i[a],i[a+1],r);return r&&Zi(r,r.next)&&(Xs(r),r=r.next),r}function ni(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Zi(e,e.next)||ue(e.prev,e,e.next)===0)){if(Xs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Gs(i,t,e,n,s,r,a){if(!i)return;!a&&r&&Sf(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?pf(i,n,s,r):ff(i)){t.push(c.i,i.i,l.i),Xs(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=mf(ni(i),t),Gs(i,t,e,n,s,r,2)):a===2&&gf(i,t,e,n,s,r):Gs(ni(i),t,e,n,s,r,1);break}}}function ff(i){let t=i.prev,e=i,n=i.next;if(ue(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,c=e.y,l=n.y,h=Math.min(s,r,a),d=Math.min(o,c,l),p=Math.max(s,r,a),f=Math.max(o,c,l),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=p&&g.y>=d&&g.y<=f&&xs(s,o,r,c,a,l,g.x,g.y)&&ue(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function pf(i,t,e,n){let s=i.prev,r=i,a=i.next;if(ue(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,d=r.y,p=a.y,f=Math.min(o,c,l),g=Math.min(h,d,p),x=Math.max(o,c,l),m=Math.max(h,d,p),u=dc(f,g,t,e,n),M=dc(x,m,t,e,n),v=i.prevZ,_=i.nextZ;for(;v&&v.z>=u&&_&&_.z<=M;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&xs(o,h,c,d,l,p,v.x,v.y)&&ue(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==a&&xs(o,h,c,d,l,p,_.x,_.y)&&ue(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=u;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&xs(o,h,c,d,l,p,v.x,v.y)&&ue(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=M;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==a&&xs(o,h,c,d,l,p,_.x,_.y)&&ue(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function mf(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Zi(n,s)&&pu(n,e,e.next,s)&&Ws(n,s)&&Ws(s,n)&&(t.push(n.i,e.i,s.i),Xs(e),Xs(e.next),e=i=s),e=e.next}while(e!==i);return ni(e)}function gf(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ef(a,o)){let c=mu(a,o);a=ni(a,a.next),c=ni(c,c.next),Gs(a,t,e,n,s,r,0),Gs(c,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function xf(i,t,e,n){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,c=r<a-1?t[r+1]*n:i.length,l=du(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Tf(l))}s.sort(_f);for(let r=0;r<s.length;r++)e=vf(s[r],e);return e}function _f(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function vf(i,t){let e=yf(i,t);if(!e)return t;let n=mu(e,i);return ni(n,n.next),ni(e,e.next)}function yf(i,t){let e=t,n=i.x,s=i.y,r=-1/0,a;if(Zi(i,e))return e;do{if(Zi(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=c&&n!==e.x&&fu(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let d=Math.abs(s-e.y)/(n-e.x);Ws(e,i)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&Mf(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function Mf(i,t){return ue(i.prev,i,t.prev)<0&&ue(t.next,i,i.next)<0}function Sf(i,t,e,n){let s=i;do s.z===0&&(s.z=dc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,bf(s)}function bf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function dc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Tf(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function fu(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function xs(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&fu(i,t,e,n,s,r,a,o)}function Ef(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!wf(i,t)&&(Ws(i,t)&&Ws(t,i)&&Af(i,t)&&(ue(i.prev,i,t.prev)||ue(i,t.prev,t))||Zi(i,t)&&ue(i.prev,i,i.next)>0&&ue(t.prev,t,t.next)>0)}function ue(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Zi(i,t){return i.x===t.x&&i.y===t.y}function pu(i,t,e,n){let s=Lr(ue(i,t,e)),r=Lr(ue(i,t,n)),a=Lr(ue(e,n,i)),o=Lr(ue(e,n,t));return!!(s!==r&&a!==o||s===0&&Pr(i,e,t)||r===0&&Pr(i,n,t)||a===0&&Pr(e,i,n)||o===0&&Pr(e,t,n))}function Pr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Lr(i){return i>0?1:i<0?-1:0}function wf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&pu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ws(i,t){return ue(i.prev,i,i.next)<0?ue(i,t,i.next)>=0&&ue(i,i.prev,t)>=0:ue(i,t,i.prev)<0||ue(i,i.next,t)<0}function Af(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function mu(i,t){let e=fc(i.i,i.x,i.y),n=fc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function fh(i,t,e,n){let s=fc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Xs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function fc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Cf(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var pc=class{static triangulate(t,e,n=2){return df(t,e,n)}},ln=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];ph(t),mh(n,t);let a=t.length;e.forEach(ph);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,mh(n,e[c]);let o=pc.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function ph(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function mh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var mc=class i extends fe{constructor(t=new Hs([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,c=t.length;o<c;o++){let l=t[o];a(l)}this.setAttribute("position",new Ht(s,3)),this.setAttribute("uv",new Ht(r,2)),this.computeVertexNormals();function a(o){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,p=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,u=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:Rf,v,_=!1,A,w,C,R;u&&(v=u.getSpacedPoints(h),_=!0,p=!1,A=u.computeFrenetFrames(h,!1),w=new L,C=new L,R=new L),p||(m=0,f=0,g=0,x=0);let S=o.extractPoints(l),b=S.shape,P=S.holes;if(!ln.isClockWise(b)){b=b.reverse();for(let j=0,$=P.length;j<$;j++){let J=P[j];ln.isClockWise(J)&&(P[j]=J.reverse())}}function O(j){let J=10000000000000001e-36,Z=j[0];for(let lt=1;lt<=j.length;lt++){let nt=lt%j.length,ht=j[nt],Ft=ht.x-Z.x,Nt=ht.y-Z.y,E=Ft*Ft+Nt*Nt,y=Math.max(Math.abs(ht.x),Math.abs(ht.y),Math.abs(Z.x),Math.abs(Z.y)),z=J*y*y;if(E<=z){j.splice(nt,1),lt--;continue}Z=ht}}O(b),P.forEach(O);let k=P.length,G=b;for(let j=0;j<k;j++){let $=P[j];b=b.concat($)}function W(j,$,J){return $||console.error("THREE.ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector($,J)}let et=b.length;function X(j,$,J){let Z,lt,nt,ht=j.x-$.x,Ft=j.y-$.y,Nt=J.x-j.x,E=J.y-j.y,y=ht*ht+Ft*Ft,z=ht*E-Ft*Nt;if(Math.abs(z)>Number.EPSILON){let H=Math.sqrt(y),Q=Math.sqrt(Nt*Nt+E*E),q=$.x-Ft/H,At=$.y+ht/H,ct=J.x-E/Q,Tt=J.y+Nt/Q,Et=((ct-q)*E-(Tt-At)*Nt)/(ht*E-Ft*Nt);Z=q+ht*Et-j.x,lt=At+Ft*Et-j.y;let it=Z*Z+lt*lt;if(it<=2)return new at(Z,lt);nt=Math.sqrt(it/2)}else{let H=!1;ht>Number.EPSILON?Nt>Number.EPSILON&&(H=!0):ht<-Number.EPSILON?Nt<-Number.EPSILON&&(H=!0):Math.sign(Ft)===Math.sign(E)&&(H=!0),H?(Z=-Ft,lt=ht,nt=Math.sqrt(y)):(Z=ht,lt=Ft,nt=Math.sqrt(y/2))}return new at(Z/nt,lt/nt)}let ut=[];for(let j=0,$=G.length,J=$-1,Z=j+1;j<$;j++,J++,Z++)J===$&&(J=0),Z===$&&(Z=0),ut[j]=X(G[j],G[J],G[Z]);let xt=[],yt,Ot=ut.concat();for(let j=0,$=k;j<$;j++){let J=P[j];yt=[];for(let Z=0,lt=J.length,nt=lt-1,ht=Z+1;Z<lt;Z++,nt++,ht++)nt===lt&&(nt=0),ht===lt&&(ht=0),yt[Z]=X(J[Z],J[nt],J[ht]);xt.push(yt),Ot=Ot.concat(yt)}let Yt;if(m===0)Yt=ln.triangulateShape(G,P);else{let j=[],$=[];for(let J=0;J<m;J++){let Z=J/m,lt=f*Math.cos(Z*Math.PI/2),nt=g*Math.sin(Z*Math.PI/2)+x;for(let ht=0,Ft=G.length;ht<Ft;ht++){let Nt=W(G[ht],ut[ht],nt);Rt(Nt.x,Nt.y,-lt),Z===0&&j.push(Nt)}for(let ht=0,Ft=k;ht<Ft;ht++){let Nt=P[ht];yt=xt[ht];let E=[];for(let y=0,z=Nt.length;y<z;y++){let H=W(Nt[y],yt[y],nt);Rt(H.x,H.y,-lt),Z===0&&E.push(H)}Z===0&&$.push(E)}}Yt=ln.triangulateShape(j,$)}let jt=Yt.length,Zt=g+x;for(let j=0;j<et;j++){let $=p?W(b[j],Ot[j],Zt):b[j];_?(C.copy(A.normals[0]).multiplyScalar($.x),w.copy(A.binormals[0]).multiplyScalar($.y),R.copy(v[0]).add(C).add(w),Rt(R.x,R.y,R.z)):Rt($.x,$.y,0)}for(let j=1;j<=h;j++)for(let $=0;$<et;$++){let J=p?W(b[$],Ot[$],Zt):b[$];_?(C.copy(A.normals[j]).multiplyScalar(J.x),w.copy(A.binormals[j]).multiplyScalar(J.y),R.copy(v[j]).add(C).add(w),Rt(R.x,R.y,R.z)):Rt(J.x,J.y,d/h*j)}for(let j=m-1;j>=0;j--){let $=j/m,J=f*Math.cos($*Math.PI/2),Z=g*Math.sin($*Math.PI/2)+x;for(let lt=0,nt=G.length;lt<nt;lt++){let ht=W(G[lt],ut[lt],Z);Rt(ht.x,ht.y,d+J)}for(let lt=0,nt=P.length;lt<nt;lt++){let ht=P[lt];yt=xt[lt];for(let Ft=0,Nt=ht.length;Ft<Nt;Ft++){let E=W(ht[Ft],yt[Ft],Z);_?Rt(E.x,E.y+v[h-1].y,v[h-1].x+J):Rt(E.x,E.y,d+J)}}}Y(),tt();function Y(){let j=s.length/3;if(p){let $=0,J=et*$;for(let Z=0;Z<jt;Z++){let lt=Yt[Z];bt(lt[2]+J,lt[1]+J,lt[0]+J)}$=h+m*2,J=et*$;for(let Z=0;Z<jt;Z++){let lt=Yt[Z];bt(lt[0]+J,lt[1]+J,lt[2]+J)}}else{for(let $=0;$<jt;$++){let J=Yt[$];bt(J[2],J[1],J[0])}for(let $=0;$<jt;$++){let J=Yt[$];bt(J[0]+et*h,J[1]+et*h,J[2]+et*h)}}n.addGroup(j,s.length/3-j,0)}function tt(){let j=s.length/3,$=0;vt(G,$),$+=G.length;for(let J=0,Z=P.length;J<Z;J++){let lt=P[J];vt(lt,$),$+=lt.length}n.addGroup(j,s.length/3-j,1)}function vt(j,$){let J=j.length;for(;--J>=0;){let Z=J,lt=J-1;lt<0&&(lt=j.length-1);for(let nt=0,ht=h+m*2;nt<ht;nt++){let Ft=et*nt,Nt=et*(nt+1),E=$+Z+Ft,y=$+lt+Ft,z=$+lt+Nt,H=$+Z+Nt;Xt(E,y,z,H)}}}function Rt(j,$,J){c.push(j),c.push($),c.push(J)}function bt(j,$,J){se(j),se($),se(J);let Z=s.length/3,lt=M.generateTopUV(n,s,Z-3,Z-2,Z-1);I(lt[0]),I(lt[1]),I(lt[2])}function Xt(j,$,J,Z){se(j),se($),se(Z),se($),se(J),se(Z);let lt=s.length/3,nt=M.generateSideWallUV(n,s,lt-6,lt-3,lt-2,lt-1);I(nt[0]),I(nt[1]),I(nt[3]),I(nt[1]),I(nt[2]),I(nt[3])}function se(j){s.push(c[j*3+0]),s.push(c[j*3+1]),s.push(c[j*3+2])}function I(j){r.push(j.x),r.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return If(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new sa[s.type]().fromJSON(s)),new i(n,t.options)}},Rf={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new at(r,a),new at(o,c),new at(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],d=t[n*3+2],p=t[s*3],f=t[s*3+1],g=t[s*3+2],x=t[r*3],m=t[r*3+1],u=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new at(a,1-c),new at(l,1-d),new at(p,1-g),new at(x,1-u)]:[new at(o,1-c),new at(h,1-d),new at(f,1-g),new at(m,1-u)]}};function If(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var gc=class i extends jr{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var qs=class i extends fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=t/o,p=e/c,f=[],g=[],x=[],m=[];for(let u=0;u<h;u++){let M=u*p-a;for(let v=0;v<l;v++){let _=v*d-r;g.push(_,-M,0),x.push(0,0,1),m.push(v/o),m.push(1-u/c)}}for(let u=0;u<c;u++)for(let M=0;M<o;M++){let v=M+l*u,_=M+l*(u+1),A=M+1+l*(u+1),w=M+1+l*u;f.push(v,_,w),f.push(_,A,w)}this.setIndex(f),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},xc=class i extends fe{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],c=[],l=[],h=[],d=t,p=(e-t)/s,f=new L,g=new at;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let u=r+m/n*a;f.x=d*Math.cos(u),f.y=d*Math.sin(u),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=p}for(let x=0;x<s;x++){let m=x*(n+1);for(let u=0;u<n;u++){let M=u+m,v=M,_=M+n+1,A=M+n+2,w=M+1;o.push(v,_,w),o.push(_,A,w)}}this.setIndex(o),this.setAttribute("position",new Ht(c,3)),this.setAttribute("normal",new Ht(l,3)),this.setAttribute("uv",new Ht(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},_c=class i extends fe{constructor(t=new Hs([new at(0,.5),new at(-.5,-.5),new at(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],a=[],o=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(o,c,h),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new Ht(s,3)),this.setAttribute("normal",new Ht(r,3)),this.setAttribute("uv",new Ht(a,2));function l(h){let d=s.length/3,p=h.extractPoints(e),f=p.shape,g=p.holes;ln.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,u=g.length;m<u;m++){let M=g[m];ln.isClockWise(M)===!0&&(g[m]=M.reverse())}let x=ln.triangulateShape(f,g);for(let m=0,u=g.length;m<u;m++){let M=g[m];f=f.concat(M)}for(let m=0,u=f.length;m<u;m++){let M=f[m];s.push(M.x,M.y,0),r.push(0,0,1),a.push(M.x,M.y)}for(let m=0,u=x.length;m<u;m++){let M=x[m],v=M[0]+d,_=M[1]+d,A=M[2]+d;n.push(v,_,A),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Pf(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=e[t.shapes[s]];n.push(a)}return new i(n,t.curveSegments)}};function Pf(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var vc=class i extends fe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],d=new L,p=new L,f=[],g=[],x=[],m=[];for(let u=0;u<=n;u++){let M=[],v=u/n,_=0;u===0&&a===0?_=.5/e:u===n&&c===Math.PI&&(_=-.5/e);for(let A=0;A<=e;A++){let w=A/e;d.x=-t*Math.cos(s+w*r)*Math.sin(a+v*o),d.y=t*Math.cos(a+v*o),d.z=t*Math.sin(s+w*r)*Math.sin(a+v*o),g.push(d.x,d.y,d.z),p.copy(d).normalize(),x.push(p.x,p.y,p.z),m.push(w+_,1-v),M.push(l++)}h.push(M)}for(let u=0;u<n;u++)for(let M=0;M<e;M++){let v=h[u][M+1],_=h[u][M],A=h[u+1][M],w=h[u+1][M+1];(u!==0||a>0)&&f.push(v,_,w),(u!==n-1||c<Math.PI)&&f.push(_,A,w)}this.setIndex(f),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var yc=class i extends fe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],c=[],l=[],h=new L,d=new L,p=new L;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let x=g/s*r,m=f/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(x),d.y=(t+e*Math.cos(m))*Math.sin(x),d.z=e*Math.sin(m),o.push(d.x,d.y,d.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),p.subVectors(d,h).normalize(),c.push(p.x,p.y,p.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,u=(s+1)*(f-1)+g,M=(s+1)*f+g;a.push(x,m,M),a.push(m,u,M)}this.setIndex(a),this.setAttribute("position",new Ht(o,3)),this.setAttribute("normal",new Ht(c,3)),this.setAttribute("uv",new Ht(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Mc=class i extends fe{constructor(t=new Bs(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new L,c=new L,l=new at,h=new L,d=[],p=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new Ht(d,3)),this.setAttribute("normal",new Ht(p,3)),this.setAttribute("uv",new Ht(f,2));function x(){for(let v=0;v<e;v++)m(v);m(r===!1?e:0),M(),u()}function m(v){h=t.getPointAt(v/e,h);let _=a.normals[v],A=a.binormals[v];for(let w=0;w<=s;w++){let C=w/s*Math.PI*2,R=Math.sin(C),S=-Math.cos(C);c.x=S*_.x+R*A.x,c.y=S*_.y+R*A.y,c.z=S*_.z+R*A.z,c.normalize(),p.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,d.push(o.x,o.y,o.z)}}function u(){for(let v=1;v<=e;v++)for(let _=1;_<=s;_++){let A=(s+1)*(v-1)+(_-1),w=(s+1)*v+(_-1),C=(s+1)*v+_,R=(s+1)*(v-1)+_;g.push(A,w,R),g.push(w,C,R)}}function M(){for(let v=0;v<=e;v++)for(let _=0;_<=s;_++)l.x=v/e,l.y=_/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new sa[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Sc=class extends un{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xc,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var aa=class extends un{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Kh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},oa=class extends un{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Dr(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Lf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var ii=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ca=class extends ii{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ec,endingEnd:ec}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case nc:r=t,o=2*e-n;break;case ic:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case nc:a=t,c=2*n-e;break;case ic:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,p=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,u=-p*m+2*p*x-p*g,M=(1+p)*m+(-1.5-2*p)*x+(-.5+p)*g+1,v=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let A=0;A!==o;++A)r[A]=u*a[h+A]+M*a[l+A]+v*a[c+A]+_*a[d+A];return r}},la=class extends ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(n-e)/(s-e),d=1-h;for(let p=0;p!==o;++p)r[p]=a[l+p]*d+a[c+p]*h;return r}},ha=class extends ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},We=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Dr(e,this.TimeBufferType),this.values=Dr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Dr(t.times,Array),values:Dr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ha(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new la(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ca(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ss:e=this.InterpolantFactoryMethodDiscrete;break;case Vr:e=this.InterpolantFactoryMethodLinear;break;case Ur:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ss;case this.InterpolantFactoryMethodLinear:return Vr;case this.InterpolantFactoryMethodSmooth:return Ur}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&Lf(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ur,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(s)c=!0;else{let d=o*n,p=d-n,f=d+n;for(let g=0;g!==n;++g){let x=e[d+g];if(x!==e[p+g]||x!==e[f+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let d=o*n,p=a*n;for(let f=0;f!==n;++f)e[p+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};We.prototype.ValueTypeName="";We.prototype.TimeBufferType=Float32Array;We.prototype.ValueBufferType=Float32Array;We.prototype.DefaultInterpolation=Vr;var Bn=class extends We{constructor(t,e,n){super(t,e,n)}};Bn.prototype.ValueTypeName="bool";Bn.prototype.ValueBufferType=Array;Bn.prototype.DefaultInterpolation=Ss;Bn.prototype.InterpolantFactoryMethodLinear=void 0;Bn.prototype.InterpolantFactoryMethodSmooth=void 0;var ua=class extends We{constructor(t,e,n,s){super(t,e,n,s)}};ua.prototype.ValueTypeName="color";var da=class extends We{constructor(t,e,n,s){super(t,e,n,s)}};da.prototype.ValueTypeName="number";var fa=class extends ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let h=l+o;l!==h;l+=4)nn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Ys=class extends We{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new fa(this.times,this.values,this.getValueSize(),t)}};Ys.prototype.ValueTypeName="quaternion";Ys.prototype.InterpolantFactoryMethodSmooth=void 0;var Vn=class extends We{constructor(t,e,n){super(t,e,n)}};Vn.prototype.ValueTypeName="string";Vn.prototype.ValueBufferType=Array;Vn.prototype.DefaultInterpolation=Ss;Vn.prototype.InterpolantFactoryMethodLinear=void 0;Vn.prototype.InterpolantFactoryMethodSmooth=void 0;var pa=class extends We{constructor(t,e,n,s){super(t,e,n,s)}};pa.prototype.ValueTypeName="vector";var Nr={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},ma=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,p=l.length;d<p;d+=2){let f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},gu=new ma,Ji=class{constructor(t){this.manager=t!==void 0?t:gu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ji.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ui=new WeakMap,ga=class extends Ji{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,a=Nr.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);else{let d=Ui.get(a);d===void 0&&(d=[],Ui.set(a,d)),d.push({onLoad:e,onError:s})}return a}let o=Oi("img");function c(){h(),e&&e(this);let d=Ui.get(this)||[];for(let p=0;p<d.length;p++){let f=d[p];f.onLoad&&f.onLoad(this)}Ui.delete(this),r.manager.itemEnd(t)}function l(d){h(),s&&s(d),Nr.remove(`image:${t}`);let p=Ui.get(this)||[];for(let f=0;f<p.length;f++){let g=p[f];g.onError&&g.onError(d)}Ui.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Nr.add(`image:${t}`,o),r.manager.itemStart(t),o.src=t,o}};var bc=class extends Ji{constructor(t){super(t)}load(t,e,n,s){let r=new Ee,a=new ga(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Zs=class extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Tc=class extends Zs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},tc=new Qt,gh=new L,xh=new L,Ec=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qi,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;gh.setFromMatrixPosition(t.matrixWorld),e.position.copy(gh),xh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(xh),e.updateMatrixWorld(),tc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(tc,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(tc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Js=class extends Rs{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},wc=class extends Ec{constructor(){super(new Js(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ac=class extends Zs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new wc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var xa=class extends Te{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Qc="\\[\\]\\.:\\/",Df=new RegExp("["+Qc+"]","g"),jc="[^"+Qc+"]",Uf="[^"+Qc.replace("\\.","")+"]",Nf=/((?:WC+[\/:])*)/.source.replace("WC",jc),Ff=/(WCOD+)?/.source.replace("WCOD",Uf),zf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jc),Of=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jc),Bf=new RegExp("^"+Nf+Ff+zf+Of+"$"),Vf=["material","materials","bones","map"],Cc=class{constructor(t,e,n){let s=n||ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ce=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Df,"")}static parseTrackName(t){let e=Bf.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Vf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ce.Composite=Cc;ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ce.prototype.GetterByBindingType=[ce.prototype._getValue_direct,ce.prototype._getValue_array,ce.prototype._getValue_arrayElement,ce.prototype._getValue_toArray];ce.prototype.SetterByBindingTypeAndVersioning=[[ce.prototype._setValue_direct,ce.prototype._setValue_direct_setNeedsUpdate,ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_array,ce.prototype._setValue_array_setNeedsUpdate,ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_arrayElement,ce.prototype._setValue_arrayElement_setNeedsUpdate,ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_fromArray,ce.prototype._setValue_fromArray_setNeedsUpdate,ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var V3=new Float32Array(1);var _h=new Qt,Rc=class{constructor(t,e,n=0,s=1/0){this.ray=new ki(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Hi,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return _h.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_h),this}intersectObject(t,e=!0,n=[]){return Ic(t,this,n,e),n.sort(vh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ic(t[s],this,n,e);return n.sort(vh),n}};function vh(i,t){return i.distance-t.distance}function Ic(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Ic(r[a],t,e,!0)}}function tl(i,t,e,n){let s=kf(n);switch(e){case Hc:return i*t;case Pa:return i*t/s.components*s.byteLength;case La:return i*t/s.components*s.byteLength;case Wc:return i*t*2/s.components*s.byteLength;case Da:return i*t*2/s.components*s.byteLength;case Gc:return i*t*3/s.components*s.byteLength;case Fe:return i*t*4/s.components*s.byteLength;case Ua:return i*t*4/s.components*s.byteLength;case Qs:case js:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case tr:case er:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fa:case Oa:return Math.max(i,16)*Math.max(t,8)/4;case Na:case za:return Math.max(i,8)*Math.max(t,8)/2;case Ba:case Va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ga:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case qa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Za:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case $a:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ja:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case to:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case eo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case no:case io:case so:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ro:case ao:return Math.ceil(i/4)*Math.ceil(t/4)*8;case oo:case co:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function kf(i){switch(i){case an:case Oc:return{byteLength:1,components:1};case $i:case Bc:case Ki:return{byteLength:2,components:1};case Ra:case Ia:return{byteLength:2,components:4};case Hn:case Ca:case Xe:return{byteLength:4,components:1};case Vc:case kc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ku(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Gf(i){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,d=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let p=0;for(let f=1;f<d.length;f++){let g=d[p],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++p,d[p]=x)}d.length=p+1;for(let f=0,g=d.length;f<g;f++){let x=d[f];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Wf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$f=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ep=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,np=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ip=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ap=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,op=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,up=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,dp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,fp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_p=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,bp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Tp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ep=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ap=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ip=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Lp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Up=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Np=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Fp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,zp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Op=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Hp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Gp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$p=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,jp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,t0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,e0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,n0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,i0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,s0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,r0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,a0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,c0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,l0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,h0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,u0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,d0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,f0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,p0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,m0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,g0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,x0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,v0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,y0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,M0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,S0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,b0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,T0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,E0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,w0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,A0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,C0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,R0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,I0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,P0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,L0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,D0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,U0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,N0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,F0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,z0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,O0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,B0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,V0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,k0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,H0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,G0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,W0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,q0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Z0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,K0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Q0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,j0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,em=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,im=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,am=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,om=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,um=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_m=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ym=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Mm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:Wf,alphahash_pars_fragment:Xf,alphamap_fragment:qf,alphamap_pars_fragment:Yf,alphatest_fragment:Zf,alphatest_pars_fragment:Jf,aomap_fragment:$f,aomap_pars_fragment:Kf,batching_pars_vertex:Qf,batching_vertex:jf,begin_vertex:tp,beginnormal_vertex:ep,bsdfs:np,iridescence_fragment:ip,bumpmap_pars_fragment:sp,clipping_planes_fragment:rp,clipping_planes_pars_fragment:ap,clipping_planes_pars_vertex:op,clipping_planes_vertex:cp,color_fragment:lp,color_pars_fragment:hp,color_pars_vertex:up,color_vertex:dp,common:fp,cube_uv_reflection_fragment:pp,defaultnormal_vertex:mp,displacementmap_pars_vertex:gp,displacementmap_vertex:xp,emissivemap_fragment:_p,emissivemap_pars_fragment:vp,colorspace_fragment:yp,colorspace_pars_fragment:Mp,envmap_fragment:Sp,envmap_common_pars_fragment:bp,envmap_pars_fragment:Tp,envmap_pars_vertex:Ep,envmap_physical_pars_fragment:Fp,envmap_vertex:wp,fog_vertex:Ap,fog_pars_vertex:Cp,fog_fragment:Rp,fog_pars_fragment:Ip,gradientmap_pars_fragment:Pp,lightmap_pars_fragment:Lp,lights_lambert_fragment:Dp,lights_lambert_pars_fragment:Up,lights_pars_begin:Np,lights_toon_fragment:zp,lights_toon_pars_fragment:Op,lights_phong_fragment:Bp,lights_phong_pars_fragment:Vp,lights_physical_fragment:kp,lights_physical_pars_fragment:Hp,lights_fragment_begin:Gp,lights_fragment_maps:Wp,lights_fragment_end:Xp,logdepthbuf_fragment:qp,logdepthbuf_pars_fragment:Yp,logdepthbuf_pars_vertex:Zp,logdepthbuf_vertex:Jp,map_fragment:$p,map_pars_fragment:Kp,map_particle_fragment:Qp,map_particle_pars_fragment:jp,metalnessmap_fragment:t0,metalnessmap_pars_fragment:e0,morphinstance_vertex:n0,morphcolor_vertex:i0,morphnormal_vertex:s0,morphtarget_pars_vertex:r0,morphtarget_vertex:a0,normal_fragment_begin:o0,normal_fragment_maps:c0,normal_pars_fragment:l0,normal_pars_vertex:h0,normal_vertex:u0,normalmap_pars_fragment:d0,clearcoat_normal_fragment_begin:f0,clearcoat_normal_fragment_maps:p0,clearcoat_pars_fragment:m0,iridescence_pars_fragment:g0,opaque_fragment:x0,packing:_0,premultiplied_alpha_fragment:v0,project_vertex:y0,dithering_fragment:M0,dithering_pars_fragment:S0,roughnessmap_fragment:b0,roughnessmap_pars_fragment:T0,shadowmap_pars_fragment:E0,shadowmap_pars_vertex:w0,shadowmap_vertex:A0,shadowmask_pars_fragment:C0,skinbase_vertex:R0,skinning_pars_vertex:I0,skinning_vertex:P0,skinnormal_vertex:L0,specularmap_fragment:D0,specularmap_pars_fragment:U0,tonemapping_fragment:N0,tonemapping_pars_fragment:F0,transmission_fragment:z0,transmission_pars_fragment:O0,uv_pars_fragment:B0,uv_pars_vertex:V0,uv_vertex:k0,worldpos_vertex:H0,background_vert:G0,background_frag:W0,backgroundCube_vert:X0,backgroundCube_frag:q0,cube_vert:Y0,cube_frag:Z0,depth_vert:J0,depth_frag:$0,distanceRGBA_vert:K0,distanceRGBA_frag:Q0,equirect_vert:j0,equirect_frag:tm,linedashed_vert:em,linedashed_frag:nm,meshbasic_vert:im,meshbasic_frag:sm,meshlambert_vert:rm,meshlambert_frag:am,meshmatcap_vert:om,meshmatcap_frag:cm,meshnormal_vert:lm,meshnormal_frag:hm,meshphong_vert:um,meshphong_frag:dm,meshphysical_vert:fm,meshphysical_frag:pm,meshtoon_vert:mm,meshtoon_frag:gm,points_vert:xm,points_frag:_m,shadow_vert:vm,shadow_frag:ym,sprite_vert:Mm,sprite_frag:Sm},ft={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},pn={basic:{uniforms:Ae([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Ae([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Wt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Ae([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Ae([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Ae([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new Wt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Ae([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Ae([ft.points,ft.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Ae([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Ae([ft.common,ft.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Ae([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Ae([ft.sprite,ft.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Ae([ft.common,ft.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Ae([ft.lights,ft.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};pn.physical={uniforms:Ae([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};var lo={r:0,b:0,g:0},oi=new sn,bm=new Qt;function Tm(i,t,e,n,s,r,a){let o=new Wt(0),c=r===!0?0:1,l,h,d=null,p=0,f=null;function g(v){let _=v.isScene===!0?v.background:null;return _&&_.isTexture&&(_=(v.backgroundBlurriness>0?e:t).get(_)),_}function x(v){let _=!1,A=g(v);A===null?u(o,c):A&&A.isColor&&(u(A,1),_=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,_){let A=g(_);A&&(A.isCubeTexture||A.mapping===$s)?(h===void 0&&(h=new we(new Gi(1,1,1),new rn({name:"BackgroundCubeMaterial",uniforms:ai(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),oi.copy(_.backgroundRotation),oi.x*=-1,oi.y*=-1,oi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(bm.makeRotationFromEuler(oi)),h.material.toneMapped=Jt.getTransfer(A.colorSpace)!==ee,(d!==A||p!==A.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=A,p=A.version,f=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new we(new qs(2,2),new rn({name:"BackgroundMaterial",uniforms:ai(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(A.colorSpace)!==ee,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||p!==A.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=A,p=A.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function u(v,_){v.getRGB(lo,$c(i)),n.buffers.color.setClear(lo.r,lo.g,lo.b,_,a)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,_=1){o.set(v),c=_,u(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,u(o,c)},render:x,addToRenderList:m,dispose:M}}function Em(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null),r=s,a=!1;function o(b,P,U,O,k){let G=!1,W=d(O,U,P);r!==W&&(r=W,l(r.object)),G=f(b,O,U,k),G&&g(b,O,U,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,_(b,P,U,O),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function d(b,P,U){let O=U.wireframe===!0,k=n[b.id];k===void 0&&(k={},n[b.id]=k);let G=k[P.id];G===void 0&&(G={},k[P.id]=G);let W=G[O];return W===void 0&&(W=p(c()),G[O]=W),W}function p(b){let P=[],U=[],O=[];for(let k=0;k<e;k++)P[k]=0,U[k]=0,O[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:O,object:b,attributes:{},index:null}}function f(b,P,U,O){let k=r.attributes,G=P.attributes,W=0,et=U.getAttributes();for(let X in et)if(et[X].location>=0){let xt=k[X],yt=G[X];if(yt===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(yt=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(yt=b.instanceColor)),xt===void 0||xt.attribute!==yt||yt&&xt.data!==yt.data)return!0;W++}return r.attributesNum!==W||r.index!==O}function g(b,P,U,O){let k={},G=P.attributes,W=0,et=U.getAttributes();for(let X in et)if(et[X].location>=0){let xt=G[X];xt===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(xt=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(xt=b.instanceColor));let yt={};yt.attribute=xt,xt&&xt.data&&(yt.data=xt.data),k[X]=yt,W++}r.attributes=k,r.attributesNum=W,r.index=O}function x(){let b=r.newAttributes;for(let P=0,U=b.length;P<U;P++)b[P]=0}function m(b){u(b,0)}function u(b,P){let U=r.newAttributes,O=r.enabledAttributes,k=r.attributeDivisors;U[b]=1,O[b]===0&&(i.enableVertexAttribArray(b),O[b]=1),k[b]!==P&&(i.vertexAttribDivisor(b,P),k[b]=P)}function M(){let b=r.newAttributes,P=r.enabledAttributes;for(let U=0,O=P.length;U<O;U++)P[U]!==b[U]&&(i.disableVertexAttribArray(U),P[U]=0)}function v(b,P,U,O,k,G,W){W===!0?i.vertexAttribIPointer(b,P,U,k,G):i.vertexAttribPointer(b,P,U,O,k,G)}function _(b,P,U,O){x();let k=O.attributes,G=U.getAttributes(),W=P.defaultAttributeValues;for(let et in G){let X=G[et];if(X.location>=0){let ut=k[et];if(ut===void 0&&(et==="instanceMatrix"&&b.instanceMatrix&&(ut=b.instanceMatrix),et==="instanceColor"&&b.instanceColor&&(ut=b.instanceColor)),ut!==void 0){let xt=ut.normalized,yt=ut.itemSize,Ot=t.get(ut);if(Ot===void 0)continue;let Yt=Ot.buffer,jt=Ot.type,Zt=Ot.bytesPerElement,Y=jt===i.INT||jt===i.UNSIGNED_INT||ut.gpuType===Ca;if(ut.isInterleavedBufferAttribute){let tt=ut.data,vt=tt.stride,Rt=ut.offset;if(tt.isInstancedInterleavedBuffer){for(let bt=0;bt<X.locationSize;bt++)u(X.location+bt,tt.meshPerAttribute);b.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let bt=0;bt<X.locationSize;bt++)m(X.location+bt);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let bt=0;bt<X.locationSize;bt++)v(X.location+bt,yt/X.locationSize,jt,xt,vt*Zt,(Rt+yt/X.locationSize*bt)*Zt,Y)}else{if(ut.isInstancedBufferAttribute){for(let tt=0;tt<X.locationSize;tt++)u(X.location+tt,ut.meshPerAttribute);b.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let tt=0;tt<X.locationSize;tt++)m(X.location+tt);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let tt=0;tt<X.locationSize;tt++)v(X.location+tt,yt/X.locationSize,jt,xt,yt*Zt,yt/X.locationSize*tt*Zt,Y)}}else if(W!==void 0){let xt=W[et];if(xt!==void 0)switch(xt.length){case 2:i.vertexAttrib2fv(X.location,xt);break;case 3:i.vertexAttrib3fv(X.location,xt);break;case 4:i.vertexAttrib4fv(X.location,xt);break;default:i.vertexAttrib1fv(X.location,xt)}}}}M()}function A(){R();for(let b in n){let P=n[b];for(let U in P){let O=P[U];for(let k in O)h(O[k].object),delete O[k];delete P[U]}delete n[b]}}function w(b){if(n[b.id]===void 0)return;let P=n[b.id];for(let U in P){let O=P[U];for(let k in O)h(O[k].object),delete O[k];delete P[U]}delete n[b.id]}function C(b){for(let P in n){let U=n[P];if(U[b.id]===void 0)continue;let O=U[b.id];for(let k in O)h(O[k].object),delete O[k];delete U[b.id]}}function R(){S(),a=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function wm(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function o(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function c(l,h,d,p){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],p[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,p,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*p[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Am(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Fe&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let R=C===Ki&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==an&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Xe&&!R)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=e.logarithmicDepthBuffer===!0,p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:p,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:A,maxSamples:w}}function Cm(i){let t=this,e=null,n=0,s=!1,r=!1,a=new cn,o=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){let f=d.length!==0||p||n!==0||s;return s=p,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){e=h(d,p,0)},this.setState=function(d,p,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,u=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let M=r?0:n,v=M*4,_=u.clippingState||null;c.value=_,_=h(g,p,v,f);for(let A=0;A!==v;++A)_[A]=e[A];u.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,p,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let u=f+x*4,M=p.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<u)&&(m=new Float32Array(u));for(let v=0,_=f;v!==x;++v,_+=4)a.copy(d[v]).applyMatrix4(M,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Rm(i){let t=new WeakMap;function e(a,o){return o===Ea?a.mapping=si:o===wa&&(a.mapping=ri),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Ea||o===wa)if(t.has(a)){let c=t.get(a).texture;return e(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new qr(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var es=4,xu=[.125,.215,.35,.446,.526,.582],hi=20,el=new Js,_u=new Wt,nl=null,il=0,sl=0,rl=!1,li=(1+Math.sqrt(5))/2,ts=1/li,vu=[new L(-li,ts,0),new L(li,ts,0),new L(-ts,0,li),new L(ts,0,li),new L(0,li,-ts),new L(0,li,ts),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Im=new L,fo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Im}=r;nl=this._renderer.getRenderTarget(),il=this._renderer.getActiveCubeFace(),sl=this._renderer.getActiveMipmapLevel(),rl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Su(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(nl,il,sl),this._renderer.xr.enabled=rl,t.scissorTest=!1,ho(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===si||t.mapping===ri?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),nl=this._renderer.getRenderTarget(),il=this._renderer.getActiveCubeFace(),sl=this._renderer.getActiveMipmapLevel(),rl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:Ki,format:Fe,colorSpace:ei,depthBuffer:!1},s=yu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yu(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Pm(r)),this._blurMaterial=Lm(r,t,e)}return s}_compileMaterial(t){let e=new we(this._lodPlanes[0],t);this._renderer.compile(e,el)}_sceneToCubeUV(t,e,n,s,r){let c=new Te(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,f=d.toneMapping;d.getClearColor(_u),d.toneMapping=An,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let x=new ws({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),m=new we(new Gi,x),u=!1,M=t.background;M?M.isColor&&(x.color.copy(M),t.background=null,u=!0):(x.color.copy(_u),u=!0);for(let v=0;v<6;v++){let _=v%3;_===0?(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[v],r.y,r.z)):_===1?(c.up.set(0,0,l[v]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[v],r.z)):(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[v]));let A=this._cubeSize;ho(s,_*A,v>2?A:0,A,A),d.setRenderTarget(s),u&&d.render(m,c),d.render(t,c)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=p,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===si||t.mapping===ri;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Su()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new we(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;ho(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,el)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=vu[(s-r-1)%vu.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new we(this._lodPlanes[s],l),p=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*hi-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):hi;m>hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${hi}`);let u=[],M=0;for(let C=0;C<hi;++C){let R=C/x,S=Math.exp(-R*R/2);u.push(S),C===0?M+=S:C<m&&(M+=2*S)}for(let C=0;C<u.length;C++)u[C]=u[C]/M;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=u,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);let{_lodMax:v}=this;p.dTheta.value=g,p.mipInt.value=v-n;let _=this._sizeLods[s],A=3*_*(s>v-es?s-v+es:0),w=4*(this._cubeSize-_);ho(e,A,w,3*_,2*_),c.setRenderTarget(e),c.render(d,el)}};function Pm(i){let t=[],e=[],n=[],s=i,r=i-es+1+xu.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-es?c=xu[a-i+es-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,d=1+l,p=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,x=3,m=2,u=1,M=new Float32Array(x*g*f),v=new Float32Array(m*g*f),_=new Float32Array(u*g*f);for(let w=0;w<f;w++){let C=w%3*2/3-1,R=w>2?0:-1,S=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];M.set(S,x*g*w),v.set(p,m*g*w);let b=[w,w,w,w,w,w];_.set(b,u*g*w)}let A=new fe;A.setAttribute("position",new Pe(M,x)),A.setAttribute("uv",new Pe(v,m)),A.setAttribute("faceIndex",new Pe(_,u)),t.push(A),s>es&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function yu(i,t,e){let n=new Je(i,t,e);return n.texture.mapping=$s,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ho(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Lm(i,t,e){let n=new Float32Array(hi),s=new L(0,1,0);return new rn({name:"SphericalGaussianBlur",defines:{n:hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Mu(){return new rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Su(){return new rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function ml(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Dm(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===Ea||c===wa,h=c===si||c===ri;if(l||h){let d=t.get(o),p=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new fo(i)),d=l?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let f=o.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new fo(i)),d=l?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Um(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Bi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Nm(i,t,e,n){let s={},r=new WeakMap;function a(d){let p=d.target;p.index!==null&&t.remove(p.index);for(let g in p.attributes)t.remove(p.attributes[g]);p.removeEventListener("dispose",a),delete s[p.id];let f=r.get(p);f&&(t.remove(f),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(d,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function c(d){let p=d.attributes;for(let f in p)t.update(p[f],i.ARRAY_BUFFER)}function l(d){let p=[],f=d.index,g=d.attributes.position,x=0;if(f!==null){let M=f.array;x=f.version;for(let v=0,_=M.length;v<_;v+=3){let A=M[v+0],w=M[v+1],C=M[v+2];p.push(A,w,w,C,C,A)}}else if(g!==void 0){let M=g.array;x=g.version;for(let v=0,_=M.length/3-1;v<_;v+=3){let A=v+0,w=v+1,C=v+2;p.push(A,w,w,C,C,A)}}else return;let m=new(Jc(p)?Cs:As)(p,1);m.version=x;let u=r.get(d);u&&t.remove(u),r.set(d,m)}function h(d){let p=r.get(d);if(p){let f=d.index;f!==null&&p.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Fm(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,f){i.drawElements(n,f,r,p*a),e.update(f,n,1)}function l(p,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,p*a,g),e.update(f,n,g))}function h(p,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,p,0,g);let m=0;for(let u=0;u<g;u++)m+=f[u];e.update(m,n,1)}function d(p,f,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<p.length;u++)l(p[u]/a,f[u],x[u]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,p,0,x,0,g);let u=0;for(let M=0;M<g;M++)u+=f[M]*x[M];e.update(u,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function zm(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Om(i,t,e){let n=new WeakMap,s=new ae;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,p=n.get(o);if(p===void 0||p.count!==d){let S=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",S)};p!==void 0&&p.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],v=0;f===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let _=o.attributes.position.count*v,A=1;_>t.maxTextureSize&&(A=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let w=new Float32Array(_*A*4*d),C=new Es(w,_,A,d);C.type=Xe,C.needsUpdate=!0;let R=v*4;for(let b=0;b<d;b++){let P=m[b],U=u[b],O=M[b],k=_*A*4*b;for(let G=0;G<P.count;G++){let W=G*R;f===!0&&(s.fromBufferAttribute(P,G),w[k+W+0]=s.x,w[k+W+1]=s.y,w[k+W+2]=s.z,w[k+W+3]=0),g===!0&&(s.fromBufferAttribute(U,G),w[k+W+4]=s.x,w[k+W+5]=s.y,w[k+W+6]=s.z,w[k+W+7]=0),x===!0&&(s.fromBufferAttribute(O,G),w[k+W+8]=s.x,w[k+W+9]=s.y,w[k+W+10]=s.z,w[k+W+11]=O.itemSize===4?s.w:1)}}p={count:d,texture:C,size:new at(_,A)},n.set(o,p),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Bm(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,d=t.get(c,h);if(s.get(d)!==l&&(t.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return d}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}var Hu=new Ee,bu=new Us(1,1),Gu=new Es,Wu=new Wr,Xu=new Is,Tu=[],Eu=[],wu=new Float32Array(16),Au=new Float32Array(9),Cu=new Float32Array(4);function is(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Tu[s];if(r===void 0&&(r=new Float32Array(s),Tu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function xe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function po(i,t){let e=Eu[t];e===void 0&&(e=new Int32Array(t),Eu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Vm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function km(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2fv(this.addr,t),xe(e,t)}}function Hm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;i.uniform3fv(this.addr,t),xe(e,t)}}function Gm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4fv(this.addr,t),xe(e,t)}}function Wm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(ge(e,n))return;Cu.set(n),i.uniformMatrix2fv(this.addr,!1,Cu),xe(e,n)}}function Xm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(ge(e,n))return;Au.set(n),i.uniformMatrix3fv(this.addr,!1,Au),xe(e,n)}}function qm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(ge(e,n))return;wu.set(n),i.uniformMatrix4fv(this.addr,!1,wu),xe(e,n)}}function Ym(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Zm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2iv(this.addr,t),xe(e,t)}}function Jm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3iv(this.addr,t),xe(e,t)}}function $m(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4iv(this.addr,t),xe(e,t)}}function Km(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Qm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2uiv(this.addr,t),xe(e,t)}}function jm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3uiv(this.addr,t),xe(e,t)}}function t1(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4uiv(this.addr,t),xe(e,t)}}function e1(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(bu.compareFunction=qc,r=bu):r=Hu,e.setTexture2D(t||r,s)}function n1(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Wu,s)}function i1(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Xu,s)}function s1(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Gu,s)}function r1(i){switch(i){case 5126:return Vm;case 35664:return km;case 35665:return Hm;case 35666:return Gm;case 35674:return Wm;case 35675:return Xm;case 35676:return qm;case 5124:case 35670:return Ym;case 35667:case 35671:return Zm;case 35668:case 35672:return Jm;case 35669:case 35673:return $m;case 5125:return Km;case 36294:return Qm;case 36295:return jm;case 36296:return t1;case 35678:case 36198:case 36298:case 36306:case 35682:return e1;case 35679:case 36299:case 36307:return n1;case 35680:case 36300:case 36308:case 36293:return i1;case 36289:case 36303:case 36311:case 36292:return s1}}function a1(i,t){i.uniform1fv(this.addr,t)}function o1(i,t){let e=is(t,this.size,2);i.uniform2fv(this.addr,e)}function c1(i,t){let e=is(t,this.size,3);i.uniform3fv(this.addr,e)}function l1(i,t){let e=is(t,this.size,4);i.uniform4fv(this.addr,e)}function h1(i,t){let e=is(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function u1(i,t){let e=is(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function d1(i,t){let e=is(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function f1(i,t){i.uniform1iv(this.addr,t)}function p1(i,t){i.uniform2iv(this.addr,t)}function m1(i,t){i.uniform3iv(this.addr,t)}function g1(i,t){i.uniform4iv(this.addr,t)}function x1(i,t){i.uniform1uiv(this.addr,t)}function _1(i,t){i.uniform2uiv(this.addr,t)}function v1(i,t){i.uniform3uiv(this.addr,t)}function y1(i,t){i.uniform4uiv(this.addr,t)}function M1(i,t,e){let n=this.cache,s=t.length,r=po(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Hu,r[a])}function S1(i,t,e){let n=this.cache,s=t.length,r=po(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Wu,r[a])}function b1(i,t,e){let n=this.cache,s=t.length,r=po(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Xu,r[a])}function T1(i,t,e){let n=this.cache,s=t.length,r=po(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Gu,r[a])}function E1(i){switch(i){case 5126:return a1;case 35664:return o1;case 35665:return c1;case 35666:return l1;case 35674:return h1;case 35675:return u1;case 35676:return d1;case 5124:case 35670:return f1;case 35667:case 35671:return p1;case 35668:case 35672:return m1;case 35669:case 35673:return g1;case 5125:return x1;case 36294:return _1;case 36295:return v1;case 36296:return y1;case 35678:case 36198:case 36298:case 36306:case 35682:return M1;case 35679:case 36299:case 36307:return S1;case 35680:case 36300:case 36308:case 36293:return b1;case 36289:case 36303:case 36311:case 36292:return T1}}var ol=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=r1(e.type)}},cl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=E1(e.type)}},ll=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},al=/(\w+)(\])?(\[|\.)?/g;function Ru(i,t){i.seq.push(t),i.map[t.id]=t}function w1(i,t,e){let n=i.name,s=n.length;for(al.lastIndex=0;;){let r=al.exec(n),a=al.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Ru(e,l===void 0?new ol(o,i,t):new cl(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new ll(o),Ru(e,d)),e=d}}}var ns=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);w1(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Iu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var A1=37297,C1=0;function R1(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Pu=new Bt;function I1(i){Jt._getMatrix(Pu,Jt.workingColorSpace,i);let t=`mat3( ${Pu.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(i)){case bs:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Lu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+R1(i.getShaderSource(t),o)}else return r}function P1(i,t){let e=I1(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function L1(i,t){let e;switch(t){case Gh:e="Linear";break;case Wh:e="Reinhard";break;case Xh:e="Cineon";break;case qh:e="ACESFilmic";break;case Zh:e="AgX";break;case Jh:e="Neutral";break;case Yh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var uo=new L;function D1(){Jt.getLuminanceCoefficients(uo);let i=uo.x.toFixed(4),t=uo.y.toFixed(4),e=uo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function U1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nr).join(`
`)}function N1(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function F1(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function nr(i){return i!==""}function Du(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Uu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var z1=/^[ \t]*#include +<([\w\d./]+)>/gm;function hl(i){return i.replace(z1,B1)}var O1=new Map;function B1(i,t){let e=kt[t];if(e===void 0){let n=O1.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return hl(e)}var V1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nu(i){return i.replace(V1,k1)}function k1(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fu(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function H1(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Lc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Sh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===dn&&(t="SHADOWMAP_TYPE_VSM"),t}function G1(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case si:case ri:t="ENVMAP_TYPE_CUBE";break;case $s:t="ENVMAP_TYPE_CUBE_UV";break}return t}function W1(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===ri&&(t="ENVMAP_MODE_REFRACTION"),t}function X1(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Fc:t="ENVMAP_BLENDING_MULTIPLY";break;case kh:t="ENVMAP_BLENDING_MIX";break;case Hh:t="ENVMAP_BLENDING_ADD";break}return t}function q1(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Y1(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=H1(e),l=G1(e),h=W1(e),d=X1(e),p=q1(e),f=U1(e),g=N1(r),x=s.createProgram(),m,u,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(nr).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(nr).join(`
`),u.length>0&&(u+=`
`)):(m=[Fu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nr).join(`
`),u=[Fu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==An?"#define TONE_MAPPING":"",e.toneMapping!==An?kt.tonemapping_pars_fragment:"",e.toneMapping!==An?L1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,P1("linearToOutputTexel",e.outputColorSpace),D1(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(nr).join(`
`)),a=hl(a),a=Du(a,e),a=Uu(a,e),o=hl(o),o=Du(o,e),o=Uu(o,e),a=Nu(a),o=Nu(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",e.glslVersion===Yc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Yc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);let v=M+m+a,_=M+u+o,A=Iu(s,s.VERTEX_SHADER,v),w=Iu(s,s.FRAGMENT_SHADER,_);s.attachShader(x,A),s.attachShader(x,w),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(P){if(i.debug.checkShaderErrors){let U=s.getProgramInfoLog(x)||"",O=s.getShaderInfoLog(A)||"",k=s.getShaderInfoLog(w)||"",G=U.trim(),W=O.trim(),et=k.trim(),X=!0,ut=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,w);else{let xt=Lu(s,A,"vertex"),yt=Lu(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+G+`
`+xt+`
`+yt)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(W===""||et==="")&&(ut=!1);ut&&(P.diagnostics={runnable:X,programLog:G,vertexShader:{log:W,prefix:m},fragmentShader:{log:et,prefix:u}})}s.deleteShader(A),s.deleteShader(w),R=new ns(s,x),S=F1(s,x)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(x,A1)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=C1++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=w,this}var Z1=0,ul=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new dl(t),e.set(t,n)),n}},dl=class{constructor(t){this.id=Z1++,this.code=t,this.usedTimes=0}};function J1(i,t,e,n,s,r,a){let o=new Hi,c=new ul,l=new Set,h=[],d=s.logarithmicDepthBuffer,p=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,b,P,U,O){let k=U.fog,G=O.geometry,W=S.isMeshStandardMaterial?U.environment:null,et=(S.isMeshStandardMaterial?e:t).get(S.envMap||W),X=et&&et.mapping===$s?et.image.height:null,ut=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let xt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,yt=xt!==void 0?xt.length:0,Ot=0;G.morphAttributes.position!==void 0&&(Ot=1),G.morphAttributes.normal!==void 0&&(Ot=2),G.morphAttributes.color!==void 0&&(Ot=3);let Yt,jt,Zt,Y;if(ut){let Kt=pn[ut];Yt=Kt.vertexShader,jt=Kt.fragmentShader}else Yt=S.vertexShader,jt=S.fragmentShader,c.update(S),Zt=c.getVertexShaderID(S),Y=c.getFragmentShaderID(S);let tt=i.getRenderTarget(),vt=i.state.buffers.depth.getReversed(),Rt=O.isInstancedMesh===!0,bt=O.isBatchedMesh===!0,Xt=!!S.map,se=!!S.matcap,I=!!et,j=!!S.aoMap,$=!!S.lightMap,J=!!S.bumpMap,Z=!!S.normalMap,lt=!!S.displacementMap,nt=!!S.emissiveMap,ht=!!S.metalnessMap,Ft=!!S.roughnessMap,Nt=S.anisotropy>0,E=S.clearcoat>0,y=S.dispersion>0,z=S.iridescence>0,H=S.sheen>0,Q=S.transmission>0,q=Nt&&!!S.anisotropyMap,At=E&&!!S.clearcoatMap,ct=E&&!!S.clearcoatNormalMap,Tt=E&&!!S.clearcoatRoughnessMap,Et=z&&!!S.iridescenceMap,it=z&&!!S.iridescenceThicknessMap,gt=H&&!!S.sheenColorMap,Dt=H&&!!S.sheenRoughnessMap,Ct=!!S.specularMap,pt=!!S.specularColorMap,Vt=!!S.specularIntensityMap,D=Q&&!!S.transmissionMap,ot=Q&&!!S.thicknessMap,dt=!!S.gradientMap,Mt=!!S.alphaMap,st=S.alphaTest>0,K=!!S.alphaHash,wt=!!S.extensions,zt=An;S.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(zt=i.toneMapping);let re={shaderID:ut,shaderType:S.type,shaderName:S.name,vertexShader:Yt,fragmentShader:jt,defines:S.defines,customVertexShaderID:Zt,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:bt,batchingColor:bt&&O._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&O.instanceColor!==null,instancingMorph:Rt&&O.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:tt===null?i.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:ei,alphaToCoverage:!!S.alphaToCoverage,map:Xt,matcap:se,envMap:I,envMapMode:I&&et.mapping,envMapCubeUVHeight:X,aoMap:j,lightMap:$,bumpMap:J,normalMap:Z,displacementMap:p&&lt,emissiveMap:nt,normalMapObjectSpace:Z&&S.normalMapType===jh,normalMapTangentSpace:Z&&S.normalMapType===Xc,metalnessMap:ht,roughnessMap:Ft,anisotropy:Nt,anisotropyMap:q,clearcoat:E,clearcoatMap:At,clearcoatNormalMap:ct,clearcoatRoughnessMap:Tt,dispersion:y,iridescence:z,iridescenceMap:Et,iridescenceThicknessMap:it,sheen:H,sheenColorMap:gt,sheenRoughnessMap:Dt,specularMap:Ct,specularColorMap:pt,specularIntensityMap:Vt,transmission:Q,transmissionMap:D,thicknessMap:ot,gradientMap:dt,opaque:S.transparent===!1&&S.blending===jn&&S.alphaToCoverage===!1,alphaMap:Mt,alphaTest:st,alphaHash:K,combine:S.combine,mapUv:Xt&&x(S.map.channel),aoMapUv:j&&x(S.aoMap.channel),lightMapUv:$&&x(S.lightMap.channel),bumpMapUv:J&&x(S.bumpMap.channel),normalMapUv:Z&&x(S.normalMap.channel),displacementMapUv:lt&&x(S.displacementMap.channel),emissiveMapUv:nt&&x(S.emissiveMap.channel),metalnessMapUv:ht&&x(S.metalnessMap.channel),roughnessMapUv:Ft&&x(S.roughnessMap.channel),anisotropyMapUv:q&&x(S.anisotropyMap.channel),clearcoatMapUv:At&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:ct&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:it&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&x(S.sheenRoughnessMap.channel),specularMapUv:Ct&&x(S.specularMap.channel),specularColorMapUv:pt&&x(S.specularColorMap.channel),specularIntensityMapUv:Vt&&x(S.specularIntensityMap.channel),transmissionMapUv:D&&x(S.transmissionMap.channel),thicknessMapUv:ot&&x(S.thicknessMap.channel),alphaMapUv:Mt&&x(S.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Z||Nt),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!G.attributes.uv&&(Xt||Mt),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:vt,skinning:O.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Ot,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:zt,decodeVideoTexture:Xt&&S.map.isVideoTexture===!0&&Jt.getTransfer(S.map.colorSpace)===ee,decodeVideoTextureEmissive:nt&&S.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(S.emissiveMap.colorSpace)===ee,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===fn,flipSided:S.side===Le,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:wt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(wt&&S.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return re.vertexUv1s=l.has(1),re.vertexUv2s=l.has(2),re.vertexUv3s=l.has(3),l.clear(),re}function u(S){let b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)b.push(P),b.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(M(b,S),v(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function M(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function v(S,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),S.push(o.mask)}function _(S){let b=g[S.type],P;if(b){let U=pn[b];P=hu.clone(U.uniforms)}else P=S.uniforms;return P}function A(S,b){let P;for(let U=0,O=h.length;U<O;U++){let k=h[U];if(k.cacheKey===b){P=k,++P.usedTimes;break}}return P===void 0&&(P=new Y1(i,b,S,r),h.push(P)),P}function w(S){if(--S.usedTimes===0){let b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function C(S){c.remove(S)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:_,acquireProgram:A,releaseProgram:w,releaseShaderCache:C,programs:h,dispose:R}}function $1(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function K1(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function zu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ou(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,p,f,g,x,m){let u=i[t];return u===void 0?(u={id:d.id,object:d,geometry:p,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},i[t]=u):(u.id=d.id,u.object=d,u.geometry=p,u.material=f,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=x,u.group=m),t++,u}function o(d,p,f,g,x,m){let u=a(d,p,f,g,x,m);f.transmission>0?n.push(u):f.transparent===!0?s.push(u):e.push(u)}function c(d,p,f,g,x,m){let u=a(d,p,f,g,x,m);f.transmission>0?n.unshift(u):f.transparent===!0?s.unshift(u):e.unshift(u)}function l(d,p){e.length>1&&e.sort(d||K1),n.length>1&&n.sort(p||zu),s.length>1&&s.sort(p||zu)}function h(){for(let d=t,p=i.length;d<p;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function Q1(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Ou,i.set(n,[a])):s>=r.length?(a=new Ou,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function j1(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Wt};break;case"SpotLight":e={position:new L,direction:new L,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function t3(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var e3=0;function n3(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function i3(i){let t=new j1,e=t3(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new Qt,a=new Qt;function o(l){let h=0,d=0,p=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,x=0,m=0,u=0,M=0,v=0,_=0,A=0,w=0,C=0;l.sort(n3);for(let S=0,b=l.length;S<b;S++){let P=l[S],U=P.color,O=P.intensity,k=P.distance,G=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=U.r*O,d+=U.g*O,p+=U.b*O;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],O);C++}else if(P.isDirectionalLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let et=P.shadow,X=e.get(P);X.shadowIntensity=et.intensity,X.shadowBias=et.bias,X.shadowNormalBias=et.normalBias,X.shadowRadius=et.radius,X.shadowMapSize=et.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=G,n.directionalShadowMatrix[f]=P.shadow.matrix,M++}n.directional[f]=W,f++}else if(P.isSpotLight){let W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(U).multiplyScalar(O),W.distance=k,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[x]=W;let et=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,et.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[x]=et.matrix,P.castShadow){let X=e.get(P);X.shadowIntensity=et.intensity,X.shadowBias=et.bias,X.shadowNormalBias=et.normalBias,X.shadowRadius=et.radius,X.shadowMapSize=et.mapSize,n.spotShadow[x]=X,n.spotShadowMap[x]=G,_++}x++}else if(P.isRectAreaLight){let W=t.get(P);W.color.copy(U).multiplyScalar(O),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=W,m++}else if(P.isPointLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){let et=P.shadow,X=e.get(P);X.shadowIntensity=et.intensity,X.shadowBias=et.bias,X.shadowNormalBias=et.normalBias,X.shadowRadius=et.radius,X.shadowMapSize=et.mapSize,X.shadowCameraNear=et.camera.near,X.shadowCameraFar=et.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=P.shadow.matrix,v++}n.point[g]=W,g++}else if(P.isHemisphereLight){let W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(O),W.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[u]=W,u++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=p;let R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==x||R.rectAreaLength!==m||R.hemiLength!==u||R.numDirectionalShadows!==M||R.numPointShadows!==v||R.numSpotShadows!==_||R.numSpotMaps!==A||R.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,R.directionalLength=f,R.pointLength=g,R.spotLength=x,R.rectAreaLength=m,R.hemiLength=u,R.numDirectionalShadows=M,R.numPointShadows=v,R.numSpotShadows=_,R.numSpotMaps=A,R.numLightProbes=C,n.version=e3++)}function c(l,h){let d=0,p=0,f=0,g=0,x=0,m=h.matrixWorldInverse;for(let u=0,M=l.length;u<M;u++){let v=l[u];if(v.isDirectionalLight){let _=n.directional[d];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(v.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(v.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(v.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){let _=n.point[p];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),p++}else if(v.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function Bu(i){let t=new i3(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function s3(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Bu(i),t.set(s,[o])):r>=a.length?(o=new Bu(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var r3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,a3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function o3(i,t,e){let n=new qi,s=new at,r=new at,a=new ae,o=new aa({depthPacking:Qh}),c=new oa,l={},h=e.maxTextureSize,d={[bn]:Le,[Le]:bn,[fn]:fn},p=new rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:r3,fragmentShader:a3}),f=p.clone();f.defines.HORIZONTAL_PASS=1;let g=new fe;g.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new we(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lc;let u=this.type;this.render=function(w,C,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let S=i.getRenderTarget(),b=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),U=i.state;U.setBlending(wn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let O=u!==dn&&this.type===dn,k=u===dn&&this.type!==dn;for(let G=0,W=w.length;G<W;G++){let et=w[G],X=et.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let ut=X.getFrameExtents();if(s.multiply(ut),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ut.x),s.x=r.x*ut.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ut.y),s.y=r.y*ut.y,X.mapSize.y=r.y)),X.map===null||O===!0||k===!0){let yt=this.type!==dn?{minFilter:Ne,magFilter:Ne}:{};X.map!==null&&X.map.dispose(),X.map=new Je(s.x,s.y,yt),X.map.texture.name=et.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();let xt=X.getViewportCount();for(let yt=0;yt<xt;yt++){let Ot=X.getViewport(yt);a.set(r.x*Ot.x,r.y*Ot.y,r.x*Ot.z,r.y*Ot.w),U.viewport(a),X.updateMatrices(et,yt),n=X.getFrustum(),_(C,R,X.camera,et,this.type)}X.isPointLightShadow!==!0&&this.type===dn&&M(X,R),X.needsUpdate=!1}u=this.type,m.needsUpdate=!1,i.setRenderTarget(S,b,P)};function M(w,C){let R=t.update(x);p.defines.VSM_SAMPLES!==w.blurSamples&&(p.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Je(s.x,s.y)),p.uniforms.shadow_pass.value=w.map.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(C,null,R,p,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(C,null,R,f,x,null)}function v(w,C,R,S){let b=null,P=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)b=P;else if(b=R.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let U=b.uuid,O=C.uuid,k=l[U];k===void 0&&(k={},l[U]=k);let G=k[O];G===void 0&&(G=b.clone(),k[O]=G,C.addEventListener("dispose",A)),b=G}if(b.visible=C.visible,b.wireframe=C.wireframe,S===dn?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:d[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,R.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let U=i.properties.get(b);U.light=R}return b}function _(w,C,R,S,b){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===dn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);let O=t.update(w),k=w.material;if(Array.isArray(k)){let G=O.groups;for(let W=0,et=G.length;W<et;W++){let X=G[W],ut=k[X.materialIndex];if(ut&&ut.visible){let xt=v(w,ut,S,b);w.onBeforeShadow(i,w,C,R,O,xt,X),i.renderBufferDirect(R,null,O,xt,w,X),w.onAfterShadow(i,w,C,R,O,xt,X)}}}else if(k.visible){let G=v(w,k,S,b);w.onBeforeShadow(i,w,C,R,O,G,null),i.renderBufferDirect(R,null,O,G,w,null),w.onAfterShadow(i,w,C,R,O,G,null)}}let U=w.children;for(let O=0,k=U.length;O<k;O++)_(U[O],C,R,S,b)}function A(w){w.target.removeEventListener("dispose",A);for(let R in l){let S=l[R],b=w.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}var c3={[_a]:va,[ya]:ba,[Ma]:Ta,[ti]:Sa,[va]:_a,[ba]:ya,[Ta]:Ma,[Sa]:ti};function l3(i,t){function e(){let D=!1,ot=new ae,dt=null,Mt=new ae(0,0,0,0);return{setMask:function(st){dt!==st&&!D&&(i.colorMask(st,st,st,st),dt=st)},setLocked:function(st){D=st},setClear:function(st,K,wt,zt,re){re===!0&&(st*=zt,K*=zt,wt*=zt),ot.set(st,K,wt,zt),Mt.equals(ot)===!1&&(i.clearColor(st,K,wt,zt),Mt.copy(ot))},reset:function(){D=!1,dt=null,Mt.set(-1,0,0,0)}}}function n(){let D=!1,ot=!1,dt=null,Mt=null,st=null;return{setReversed:function(K){if(ot!==K){let wt=t.get("EXT_clip_control");K?wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.ZERO_TO_ONE_EXT):wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.NEGATIVE_ONE_TO_ONE_EXT),ot=K;let zt=st;st=null,this.setClear(zt)}},getReversed:function(){return ot},setTest:function(K){K?tt(i.DEPTH_TEST):vt(i.DEPTH_TEST)},setMask:function(K){dt!==K&&!D&&(i.depthMask(K),dt=K)},setFunc:function(K){if(ot&&(K=c3[K]),Mt!==K){switch(K){case _a:i.depthFunc(i.NEVER);break;case va:i.depthFunc(i.ALWAYS);break;case ya:i.depthFunc(i.LESS);break;case ti:i.depthFunc(i.LEQUAL);break;case Ma:i.depthFunc(i.EQUAL);break;case Sa:i.depthFunc(i.GEQUAL);break;case ba:i.depthFunc(i.GREATER);break;case Ta:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=K}},setLocked:function(K){D=K},setClear:function(K){st!==K&&(ot&&(K=1-K),i.clearDepth(K),st=K)},reset:function(){D=!1,dt=null,Mt=null,st=null,ot=!1}}}function s(){let D=!1,ot=null,dt=null,Mt=null,st=null,K=null,wt=null,zt=null,re=null;return{setTest:function(Kt){D||(Kt?tt(i.STENCIL_TEST):vt(i.STENCIL_TEST))},setMask:function(Kt){ot!==Kt&&!D&&(i.stencilMask(Kt),ot=Kt)},setFunc:function(Kt,mn,on){(dt!==Kt||Mt!==mn||st!==on)&&(i.stencilFunc(Kt,mn,on),dt=Kt,Mt=mn,st=on)},setOp:function(Kt,mn,on){(K!==Kt||wt!==mn||zt!==on)&&(i.stencilOp(Kt,mn,on),K=Kt,wt=mn,zt=on)},setLocked:function(Kt){D=Kt},setClear:function(Kt){re!==Kt&&(i.clearStencil(Kt),re=Kt)},reset:function(){D=!1,ot=null,dt=null,Mt=null,st=null,K=null,wt=null,zt=null,re=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},d={},p=new WeakMap,f=[],g=null,x=!1,m=null,u=null,M=null,v=null,_=null,A=null,w=null,C=new Wt(0,0,0),R=0,S=!1,b=null,P=null,U=null,O=null,k=null,G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,et=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(X)[1]),W=et>=1):X.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),W=et>=2);let ut=null,xt={},yt=i.getParameter(i.SCISSOR_BOX),Ot=i.getParameter(i.VIEWPORT),Yt=new ae().fromArray(yt),jt=new ae().fromArray(Ot);function Zt(D,ot,dt,Mt){let st=new Uint8Array(4),K=i.createTexture();i.bindTexture(D,K),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let wt=0;wt<dt;wt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,Mt,0,i.RGBA,i.UNSIGNED_BYTE,st):i.texImage2D(ot+wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,st);return K}let Y={};Y[i.TEXTURE_2D]=Zt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Zt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Zt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Zt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(i.DEPTH_TEST),a.setFunc(ti),J(!1),Z(Pc),tt(i.CULL_FACE),j(wn);function tt(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function vt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Rt(D,ot){return d[D]!==ot?(i.bindFramebuffer(D,ot),d[D]=ot,D===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ot),D===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function bt(D,ot){let dt=f,Mt=!1;if(D){dt=p.get(ot),dt===void 0&&(dt=[],p.set(ot,dt));let st=D.textures;if(dt.length!==st.length||dt[0]!==i.COLOR_ATTACHMENT0){for(let K=0,wt=st.length;K<wt;K++)dt[K]=i.COLOR_ATTACHMENT0+K;dt.length=st.length,Mt=!0}}else dt[0]!==i.BACK&&(dt[0]=i.BACK,Mt=!0);Mt&&i.drawBuffers(dt)}function Xt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}let se={[On]:i.FUNC_ADD,[Th]:i.FUNC_SUBTRACT,[Eh]:i.FUNC_REVERSE_SUBTRACT};se[wh]=i.MIN,se[Ah]=i.MAX;let I={[Ch]:i.ZERO,[Rh]:i.ONE,[Ih]:i.SRC_COLOR,[Fr]:i.SRC_ALPHA,[Fh]:i.SRC_ALPHA_SATURATE,[Uh]:i.DST_COLOR,[Lh]:i.DST_ALPHA,[Ph]:i.ONE_MINUS_SRC_COLOR,[zr]:i.ONE_MINUS_SRC_ALPHA,[Nh]:i.ONE_MINUS_DST_COLOR,[Dh]:i.ONE_MINUS_DST_ALPHA,[zh]:i.CONSTANT_COLOR,[Oh]:i.ONE_MINUS_CONSTANT_COLOR,[Bh]:i.CONSTANT_ALPHA,[Vh]:i.ONE_MINUS_CONSTANT_ALPHA};function j(D,ot,dt,Mt,st,K,wt,zt,re,Kt){if(D===wn){x===!0&&(vt(i.BLEND),x=!1);return}if(x===!1&&(tt(i.BLEND),x=!0),D!==bh){if(D!==m||Kt!==S){if((u!==On||_!==On)&&(i.blendEquation(i.FUNC_ADD),u=On,_=On),Kt)switch(D){case jn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Dc:i.blendFunc(i.ONE,i.ONE);break;case Uc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case jn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Dc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Uc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,v=null,A=null,w=null,C.set(0,0,0),R=0,m=D,S=Kt}return}st=st||ot,K=K||dt,wt=wt||Mt,(ot!==u||st!==_)&&(i.blendEquationSeparate(se[ot],se[st]),u=ot,_=st),(dt!==M||Mt!==v||K!==A||wt!==w)&&(i.blendFuncSeparate(I[dt],I[Mt],I[K],I[wt]),M=dt,v=Mt,A=K,w=wt),(zt.equals(C)===!1||re!==R)&&(i.blendColor(zt.r,zt.g,zt.b,re),C.copy(zt),R=re),m=D,S=!1}function $(D,ot){D.side===fn?vt(i.CULL_FACE):tt(i.CULL_FACE);let dt=D.side===Le;ot&&(dt=!dt),J(dt),D.blending===jn&&D.transparent===!1?j(wn):j(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let Mt=D.stencilWrite;o.setTest(Mt),Mt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),nt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?tt(i.SAMPLE_ALPHA_TO_COVERAGE):vt(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(D){b!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),b=D)}function Z(D){D!==yh?(tt(i.CULL_FACE),D!==P&&(D===Pc?i.cullFace(i.BACK):D===Mh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):vt(i.CULL_FACE),P=D}function lt(D){D!==U&&(W&&i.lineWidth(D),U=D)}function nt(D,ot,dt){D?(tt(i.POLYGON_OFFSET_FILL),(O!==ot||k!==dt)&&(i.polygonOffset(ot,dt),O=ot,k=dt)):vt(i.POLYGON_OFFSET_FILL)}function ht(D){D?tt(i.SCISSOR_TEST):vt(i.SCISSOR_TEST)}function Ft(D){D===void 0&&(D=i.TEXTURE0+G-1),ut!==D&&(i.activeTexture(D),ut=D)}function Nt(D,ot,dt){dt===void 0&&(ut===null?dt=i.TEXTURE0+G-1:dt=ut);let Mt=xt[dt];Mt===void 0&&(Mt={type:void 0,texture:void 0},xt[dt]=Mt),(Mt.type!==D||Mt.texture!==ot)&&(ut!==dt&&(i.activeTexture(dt),ut=dt),i.bindTexture(D,ot||Y[D]),Mt.type=D,Mt.texture=ot)}function E(){let D=xt[ut];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function z(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ct(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function gt(D){Yt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Yt.copy(D))}function Dt(D){jt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),jt.copy(D))}function Ct(D,ot){let dt=l.get(ot);dt===void 0&&(dt=new WeakMap,l.set(ot,dt));let Mt=dt.get(D);Mt===void 0&&(Mt=i.getUniformBlockIndex(ot,D.name),dt.set(D,Mt))}function pt(D,ot){let Mt=l.get(ot).get(D);c.get(ot)!==Mt&&(i.uniformBlockBinding(ot,Mt,D.__bindingPointIndex),c.set(ot,Mt))}function Vt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ut=null,xt={},d={},p=new WeakMap,f=[],g=null,x=!1,m=null,u=null,M=null,v=null,_=null,A=null,w=null,C=new Wt(0,0,0),R=0,S=!1,b=null,P=null,U=null,O=null,k=null,Yt.set(0,0,i.canvas.width,i.canvas.height),jt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:tt,disable:vt,bindFramebuffer:Rt,drawBuffers:bt,useProgram:Xt,setBlending:j,setMaterial:$,setFlipSided:J,setCullFace:Z,setLineWidth:lt,setPolygonOffset:nt,setScissorTest:ht,activeTexture:Ft,bindTexture:Nt,unbindTexture:E,compressedTexImage2D:y,compressedTexImage3D:z,texImage2D:Et,texImage3D:it,updateUBOMapping:Ct,uniformBlockBinding:pt,texStorage2D:ct,texStorage3D:Tt,texSubImage2D:H,texSubImage3D:Q,compressedTexSubImage2D:q,compressedTexSubImage3D:At,scissor:gt,viewport:Dt,reset:Vt}}function h3(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new at,h=new WeakMap,d,p=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return f?new OffscreenCanvas(E,y):Oi("canvas")}function x(E,y,z){let H=1,Q=Nt(E);if((Q.width>z||Q.height>z)&&(H=z/Math.max(Q.width,Q.height)),H<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let q=Math.floor(H*Q.width),At=Math.floor(H*Q.height);d===void 0&&(d=g(q,At));let ct=y?g(q,At):d;return ct.width=q,ct.height=At,ct.getContext("2d").drawImage(E,0,0,q,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+q+"x"+At+")."),ct}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),E;return E}function m(E){return E.generateMipmaps}function u(E){i.generateMipmap(E)}function M(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(E,y,z,H,Q=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let q=y;if(y===i.RED&&(z===i.FLOAT&&(q=i.R32F),z===i.HALF_FLOAT&&(q=i.R16F),z===i.UNSIGNED_BYTE&&(q=i.R8)),y===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.R8UI),z===i.UNSIGNED_SHORT&&(q=i.R16UI),z===i.UNSIGNED_INT&&(q=i.R32UI),z===i.BYTE&&(q=i.R8I),z===i.SHORT&&(q=i.R16I),z===i.INT&&(q=i.R32I)),y===i.RG&&(z===i.FLOAT&&(q=i.RG32F),z===i.HALF_FLOAT&&(q=i.RG16F),z===i.UNSIGNED_BYTE&&(q=i.RG8)),y===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RG8UI),z===i.UNSIGNED_SHORT&&(q=i.RG16UI),z===i.UNSIGNED_INT&&(q=i.RG32UI),z===i.BYTE&&(q=i.RG8I),z===i.SHORT&&(q=i.RG16I),z===i.INT&&(q=i.RG32I)),y===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGB8UI),z===i.UNSIGNED_SHORT&&(q=i.RGB16UI),z===i.UNSIGNED_INT&&(q=i.RGB32UI),z===i.BYTE&&(q=i.RGB8I),z===i.SHORT&&(q=i.RGB16I),z===i.INT&&(q=i.RGB32I)),y===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),z===i.UNSIGNED_INT&&(q=i.RGBA32UI),z===i.BYTE&&(q=i.RGBA8I),z===i.SHORT&&(q=i.RGBA16I),z===i.INT&&(q=i.RGBA32I)),y===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),y===i.RGBA){let At=Q?bs:Jt.getTransfer(H);z===i.FLOAT&&(q=i.RGBA32F),z===i.HALF_FLOAT&&(q=i.RGBA16F),z===i.UNSIGNED_BYTE&&(q=At===ee?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function _(E,y){let z;return E?y===null||y===Hn||y===Qi?z=i.DEPTH24_STENCIL8:y===Xe?z=i.DEPTH32F_STENCIL8:y===$i&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Hn||y===Qi?z=i.DEPTH_COMPONENT24:y===Xe?z=i.DEPTH_COMPONENT32F:y===$i&&(z=i.DEPTH_COMPONENT16),z}function A(E,y){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ne&&E.minFilter!==en?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function w(E){let y=E.target;y.removeEventListener("dispose",w),R(y),y.isVideoTexture&&h.delete(y)}function C(E){let y=E.target;y.removeEventListener("dispose",C),b(y)}function R(E){let y=n.get(E);if(y.__webglInit===void 0)return;let z=E.source,H=p.get(z);if(H){let Q=H[y.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(E),Object.keys(H).length===0&&p.delete(z)}n.remove(E)}function S(E){let y=n.get(E);i.deleteTexture(y.__webglTexture);let z=E.source,H=p.get(z);delete H[y.__cacheKey],a.memory.textures--}function b(E){let y=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(y.__webglFramebuffer[H]))for(let Q=0;Q<y.__webglFramebuffer[H].length;Q++)i.deleteFramebuffer(y.__webglFramebuffer[H][Q]);else i.deleteFramebuffer(y.__webglFramebuffer[H]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[H])}else{if(Array.isArray(y.__webglFramebuffer))for(let H=0;H<y.__webglFramebuffer.length;H++)i.deleteFramebuffer(y.__webglFramebuffer[H]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let H=0;H<y.__webglColorRenderbuffer.length;H++)y.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[H]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let z=E.textures;for(let H=0,Q=z.length;H<Q;H++){let q=n.get(z[H]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(z[H])}n.remove(E)}let P=0;function U(){P=0}function O(){let E=P;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),P+=1,E}function k(E){let y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function G(E,y){let z=n.get(E);if(E.isVideoTexture&&ht(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&z.__version!==E.version){let H=E.image;if(H===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,E,y);return}}else E.isExternalTexture&&(z.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+y)}function W(E,y){let z=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){Y(z,E,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+y)}function et(E,y){let z=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){Y(z,E,y);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+y)}function X(E,y){let z=n.get(E);if(E.version>0&&z.__version!==E.version){tt(z,E,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+y)}let ut={[Or]:i.REPEAT,[zn]:i.CLAMP_TO_EDGE,[Br]:i.MIRRORED_REPEAT},xt={[Ne]:i.NEAREST,[$h]:i.NEAREST_MIPMAP_NEAREST,[Ks]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[Aa]:i.LINEAR_MIPMAP_NEAREST,[kn]:i.LINEAR_MIPMAP_LINEAR},yt={[tu]:i.NEVER,[au]:i.ALWAYS,[eu]:i.LESS,[qc]:i.LEQUAL,[nu]:i.EQUAL,[ru]:i.GEQUAL,[iu]:i.GREATER,[su]:i.NOTEQUAL};function Ot(E,y){if(y.type===Xe&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===en||y.magFilter===Aa||y.magFilter===Ks||y.magFilter===kn||y.minFilter===en||y.minFilter===Aa||y.minFilter===Ks||y.minFilter===kn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,ut[y.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,ut[y.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,ut[y.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,xt[y.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,xt[y.minFilter]),y.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,yt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ne||y.minFilter!==Ks&&y.minFilter!==kn||y.type===Xe&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Yt(E,y){let z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",w));let H=y.source,Q=p.get(H);Q===void 0&&(Q={},p.set(H,Q));let q=k(y);if(q!==E.__cacheKey){Q[q]===void 0&&(Q[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Q[q].usedTimes++;let At=Q[E.__cacheKey];At!==void 0&&(Q[E.__cacheKey].usedTimes--,At.usedTimes===0&&S(y)),E.__cacheKey=q,E.__webglTexture=Q[q].texture}return z}function jt(E,y,z){return Math.floor(Math.floor(E/z)/y)}function Zt(E,y,z,H){let q=E.updateRanges;if(q.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,z,H,y.data);else{q.sort((it,gt)=>it.start-gt.start);let At=0;for(let it=1;it<q.length;it++){let gt=q[At],Dt=q[it],Ct=gt.start+gt.count,pt=jt(Dt.start,y.width,4),Vt=jt(gt.start,y.width,4);Dt.start<=Ct+1&&pt===Vt&&jt(Dt.start+Dt.count-1,y.width,4)===pt?gt.count=Math.max(gt.count,Dt.start+Dt.count-gt.start):(++At,q[At]=Dt)}q.length=At+1;let ct=i.getParameter(i.UNPACK_ROW_LENGTH),Tt=i.getParameter(i.UNPACK_SKIP_PIXELS),Et=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let it=0,gt=q.length;it<gt;it++){let Dt=q[it],Ct=Math.floor(Dt.start/4),pt=Math.ceil(Dt.count/4),Vt=Ct%y.width,D=Math.floor(Ct/y.width),ot=pt,dt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Vt),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Vt,D,ot,dt,z,H,y.data)}E.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ct),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Tt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Et)}}function Y(E,y,z){let H=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(H=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(H=i.TEXTURE_3D);let Q=Yt(E,y),q=y.source;e.bindTexture(H,E.__webglTexture,i.TEXTURE0+z);let At=n.get(q);if(q.version!==At.__version||Q===!0){e.activeTexture(i.TEXTURE0+z);let ct=Jt.getPrimaries(Jt.workingColorSpace),Tt=y.colorSpace===Cn?null:Jt.getPrimaries(y.colorSpace),Et=y.colorSpace===Cn||ct===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let it=x(y.image,!1,s.maxTextureSize);it=Ft(y,it);let gt=r.convert(y.format,y.colorSpace),Dt=r.convert(y.type),Ct=v(y.internalFormat,gt,Dt,y.colorSpace,y.isVideoTexture);Ot(H,y);let pt,Vt=y.mipmaps,D=y.isVideoTexture!==!0,ot=At.__version===void 0||Q===!0,dt=q.dataReady,Mt=A(y,it);if(y.isDepthTexture)Ct=_(y.format===ji,y.type),ot&&(D?e.texStorage2D(i.TEXTURE_2D,1,Ct,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Ct,it.width,it.height,0,gt,Dt,null));else if(y.isDataTexture)if(Vt.length>0){D&&ot&&e.texStorage2D(i.TEXTURE_2D,Mt,Ct,Vt[0].width,Vt[0].height);for(let st=0,K=Vt.length;st<K;st++)pt=Vt[st],D?dt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,pt.width,pt.height,gt,Dt,pt.data):e.texImage2D(i.TEXTURE_2D,st,Ct,pt.width,pt.height,0,gt,Dt,pt.data);y.generateMipmaps=!1}else D?(ot&&e.texStorage2D(i.TEXTURE_2D,Mt,Ct,it.width,it.height),dt&&Zt(y,it,gt,Dt)):e.texImage2D(i.TEXTURE_2D,0,Ct,it.width,it.height,0,gt,Dt,it.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){D&&ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Ct,Vt[0].width,Vt[0].height,it.depth);for(let st=0,K=Vt.length;st<K;st++)if(pt=Vt[st],y.format!==Fe)if(gt!==null)if(D){if(dt)if(y.layerUpdates.size>0){let wt=tl(pt.width,pt.height,y.format,y.type);for(let zt of y.layerUpdates){let re=pt.data.subarray(zt*wt/pt.data.BYTES_PER_ELEMENT,(zt+1)*wt/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,zt,pt.width,pt.height,1,gt,re)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,pt.width,pt.height,it.depth,gt,pt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,Ct,pt.width,pt.height,it.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?dt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,pt.width,pt.height,it.depth,gt,Dt,pt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,Ct,pt.width,pt.height,it.depth,0,gt,Dt,pt.data)}else{D&&ot&&e.texStorage2D(i.TEXTURE_2D,Mt,Ct,Vt[0].width,Vt[0].height);for(let st=0,K=Vt.length;st<K;st++)pt=Vt[st],y.format!==Fe?gt!==null?D?dt&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,pt.width,pt.height,gt,pt.data):e.compressedTexImage2D(i.TEXTURE_2D,st,Ct,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?dt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,pt.width,pt.height,gt,Dt,pt.data):e.texImage2D(i.TEXTURE_2D,st,Ct,pt.width,pt.height,0,gt,Dt,pt.data)}else if(y.isDataArrayTexture)if(D){if(ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Ct,it.width,it.height,it.depth),dt)if(y.layerUpdates.size>0){let st=tl(it.width,it.height,y.format,y.type);for(let K of y.layerUpdates){let wt=it.data.subarray(K*st/it.data.BYTES_PER_ELEMENT,(K+1)*st/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,it.width,it.height,1,gt,Dt,wt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,gt,Dt,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ct,it.width,it.height,it.depth,0,gt,Dt,it.data);else if(y.isData3DTexture)D?(ot&&e.texStorage3D(i.TEXTURE_3D,Mt,Ct,it.width,it.height,it.depth),dt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,gt,Dt,it.data)):e.texImage3D(i.TEXTURE_3D,0,Ct,it.width,it.height,it.depth,0,gt,Dt,it.data);else if(y.isFramebufferTexture){if(ot)if(D)e.texStorage2D(i.TEXTURE_2D,Mt,Ct,it.width,it.height);else{let st=it.width,K=it.height;for(let wt=0;wt<Mt;wt++)e.texImage2D(i.TEXTURE_2D,wt,Ct,st,K,0,gt,Dt,null),st>>=1,K>>=1}}else if(Vt.length>0){if(D&&ot){let st=Nt(Vt[0]);e.texStorage2D(i.TEXTURE_2D,Mt,Ct,st.width,st.height)}for(let st=0,K=Vt.length;st<K;st++)pt=Vt[st],D?dt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,gt,Dt,pt):e.texImage2D(i.TEXTURE_2D,st,Ct,gt,Dt,pt);y.generateMipmaps=!1}else if(D){if(ot){let st=Nt(it);e.texStorage2D(i.TEXTURE_2D,Mt,Ct,st.width,st.height)}dt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Dt,it)}else e.texImage2D(i.TEXTURE_2D,0,Ct,gt,Dt,it);m(y)&&u(H),At.__version=q.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function tt(E,y,z){if(y.image.length!==6)return;let H=Yt(E,y),Q=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+z);let q=n.get(Q);if(Q.version!==q.__version||H===!0){e.activeTexture(i.TEXTURE0+z);let At=Jt.getPrimaries(Jt.workingColorSpace),ct=y.colorSpace===Cn?null:Jt.getPrimaries(y.colorSpace),Tt=y.colorSpace===Cn||At===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let Et=y.isCompressedTexture||y.image[0].isCompressedTexture,it=y.image[0]&&y.image[0].isDataTexture,gt=[];for(let K=0;K<6;K++)!Et&&!it?gt[K]=x(y.image[K],!0,s.maxCubemapSize):gt[K]=it?y.image[K].image:y.image[K],gt[K]=Ft(y,gt[K]);let Dt=gt[0],Ct=r.convert(y.format,y.colorSpace),pt=r.convert(y.type),Vt=v(y.internalFormat,Ct,pt,y.colorSpace),D=y.isVideoTexture!==!0,ot=q.__version===void 0||H===!0,dt=Q.dataReady,Mt=A(y,Dt);Ot(i.TEXTURE_CUBE_MAP,y);let st;if(Et){D&&ot&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,Vt,Dt.width,Dt.height);for(let K=0;K<6;K++){st=gt[K].mipmaps;for(let wt=0;wt<st.length;wt++){let zt=st[wt];y.format!==Fe?Ct!==null?D?dt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,wt,0,0,zt.width,zt.height,Ct,zt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,wt,Vt,zt.width,zt.height,0,zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,wt,0,0,zt.width,zt.height,Ct,pt,zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,wt,Vt,zt.width,zt.height,0,Ct,pt,zt.data)}}}else{if(st=y.mipmaps,D&&ot){st.length>0&&Mt++;let K=Nt(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,Vt,K.width,K.height)}for(let K=0;K<6;K++)if(it){D?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,gt[K].width,gt[K].height,Ct,pt,gt[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Vt,gt[K].width,gt[K].height,0,Ct,pt,gt[K].data);for(let wt=0;wt<st.length;wt++){let re=st[wt].image[K].image;D?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,wt+1,0,0,re.width,re.height,Ct,pt,re.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,wt+1,Vt,re.width,re.height,0,Ct,pt,re.data)}}else{D?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ct,pt,gt[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Vt,Ct,pt,gt[K]);for(let wt=0;wt<st.length;wt++){let zt=st[wt];D?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,wt+1,0,0,Ct,pt,zt.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,wt+1,Vt,Ct,pt,zt.image[K])}}}m(y)&&u(i.TEXTURE_CUBE_MAP),q.__version=Q.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function vt(E,y,z,H,Q,q){let At=r.convert(z.format,z.colorSpace),ct=r.convert(z.type),Tt=v(z.internalFormat,At,ct,z.colorSpace),Et=n.get(y),it=n.get(z);if(it.__renderTarget=y,!Et.__hasExternalTextures){let gt=Math.max(1,y.width>>q),Dt=Math.max(1,y.height>>q);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,q,Tt,gt,Dt,y.depth,0,At,ct,null):e.texImage2D(Q,q,Tt,gt,Dt,0,At,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),nt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,H,Q,it.__webglTexture,0,lt(y)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,H,Q,it.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Rt(E,y,z){if(i.bindRenderbuffer(i.RENDERBUFFER,E),y.depthBuffer){let H=y.depthTexture,Q=H&&H.isDepthTexture?H.type:null,q=_(y.stencilBuffer,Q),At=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=lt(y);nt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,q,y.width,y.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,q,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,q,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,At,i.RENDERBUFFER,E)}else{let H=y.textures;for(let Q=0;Q<H.length;Q++){let q=H[Q],At=r.convert(q.format,q.colorSpace),ct=r.convert(q.type),Tt=v(q.internalFormat,At,ct,q.colorSpace),Et=lt(y);z&&nt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Et,Tt,y.width,y.height):nt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Et,Tt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Tt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function bt(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let H=n.get(y.depthTexture);H.__renderTarget=y,(!H.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G(y.depthTexture,0);let Q=H.__webglTexture,q=lt(y);if(y.depthTexture.format===Fi)nt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(y.depthTexture.format===ji)nt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Xt(E){let y=n.get(E),z=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){let H=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),H){let Q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,H.removeEventListener("dispose",Q)};H.addEventListener("dispose",Q),y.__depthDisposeCallback=Q}y.__boundDepthTexture=H}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");let H=E.texture.mipmaps;H&&H.length>0?bt(y.__webglFramebuffer[0],E):bt(y.__webglFramebuffer,E)}else if(z){y.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[H]),y.__webglDepthbuffer[H]===void 0)y.__webglDepthbuffer[H]=i.createRenderbuffer(),Rt(y.__webglDepthbuffer[H],E,!1);else{let Q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer[H];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,q)}}else{let H=E.texture.mipmaps;if(H&&H.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Rt(y.__webglDepthbuffer,E,!1);else{let Q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,q)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function se(E,y,z){let H=n.get(E);y!==void 0&&vt(H.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Xt(E)}function I(E){let y=E.texture,z=n.get(E),H=n.get(y);E.addEventListener("dispose",C);let Q=E.textures,q=E.isWebGLCubeRenderTarget===!0,At=Q.length>1;if(At||(H.__webglTexture===void 0&&(H.__webglTexture=i.createTexture()),H.__version=y.version,a.memory.textures++),q){z.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[ct]=[];for(let Tt=0;Tt<y.mipmaps.length;Tt++)z.__webglFramebuffer[ct][Tt]=i.createFramebuffer()}else z.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let ct=0;ct<y.mipmaps.length;ct++)z.__webglFramebuffer[ct]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(At)for(let ct=0,Tt=Q.length;ct<Tt;ct++){let Et=n.get(Q[ct]);Et.__webglTexture===void 0&&(Et.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&nt(E)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ct=0;ct<Q.length;ct++){let Tt=Q[ct];z.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ct]);let Et=r.convert(Tt.format,Tt.colorSpace),it=r.convert(Tt.type),gt=v(Tt.internalFormat,Et,it,Tt.colorSpace,E.isXRRenderTarget===!0),Dt=lt(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,gt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,z.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Rt(z.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),Ot(i.TEXTURE_CUBE_MAP,y);for(let ct=0;ct<6;ct++)if(y.mipmaps&&y.mipmaps.length>0)for(let Tt=0;Tt<y.mipmaps.length;Tt++)vt(z.__webglFramebuffer[ct][Tt],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Tt);else vt(z.__webglFramebuffer[ct],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(y)&&u(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let ct=0,Tt=Q.length;ct<Tt;ct++){let Et=Q[ct],it=n.get(Et),gt=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(gt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(gt,it.__webglTexture),Ot(gt,Et),vt(z.__webglFramebuffer,E,Et,i.COLOR_ATTACHMENT0+ct,gt,0),m(Et)&&u(gt)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ct=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,H.__webglTexture),Ot(ct,y),y.mipmaps&&y.mipmaps.length>0)for(let Tt=0;Tt<y.mipmaps.length;Tt++)vt(z.__webglFramebuffer[Tt],E,y,i.COLOR_ATTACHMENT0,ct,Tt);else vt(z.__webglFramebuffer,E,y,i.COLOR_ATTACHMENT0,ct,0);m(y)&&u(ct),e.unbindTexture()}E.depthBuffer&&Xt(E)}function j(E){let y=E.textures;for(let z=0,H=y.length;z<H;z++){let Q=y[z];if(m(Q)){let q=M(E),At=n.get(Q).__webglTexture;e.bindTexture(q,At),u(q),e.unbindTexture()}}}let $=[],J=[];function Z(E){if(E.samples>0){if(nt(E)===!1){let y=E.textures,z=E.width,H=E.height,Q=i.COLOR_BUFFER_BIT,q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,At=n.get(E),ct=y.length>1;if(ct)for(let Et=0;Et<y.length;Et++)e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer);let Tt=E.texture.mipmaps;Tt&&Tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Et=0;Et<y.length;Et++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,At.__webglColorRenderbuffer[Et]);let it=n.get(y[Et]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,it,0)}i.blitFramebuffer(0,0,z,H,0,0,z,H,Q,i.NEAREST),c===!0&&($.length=0,J.length=0,$.push(i.COLOR_ATTACHMENT0+Et),E.depthBuffer&&E.resolveDepthBuffer===!1&&($.push(q),J.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,J)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,$))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let Et=0;Et<y.length;Et++){e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.RENDERBUFFER,At.__webglColorRenderbuffer[Et]);let it=n.get(y[Et]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.TEXTURE_2D,it,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){let y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function lt(E){return Math.min(s.maxSamples,E.samples)}function nt(E){let y=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ht(E){let y=a.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function Ft(E,y){let z=E.colorSpace,H=E.format,Q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||z!==ei&&z!==Cn&&(Jt.getTransfer(z)===ee?(H!==Fe||Q!==an)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),y}function Nt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=U,this.setTexture2D=G,this.setTexture2DArray=W,this.setTexture3D=et,this.setTextureCube=X,this.rebindTextures=se,this.setupRenderTarget=I,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=nt}function u3(i,t){function e(n,s=Cn){let r,a=Jt.getTransfer(s);if(n===an)return i.UNSIGNED_BYTE;if(n===Ra)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ia)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Vc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===kc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Oc)return i.BYTE;if(n===Bc)return i.SHORT;if(n===$i)return i.UNSIGNED_SHORT;if(n===Ca)return i.INT;if(n===Hn)return i.UNSIGNED_INT;if(n===Xe)return i.FLOAT;if(n===Ki)return i.HALF_FLOAT;if(n===Hc)return i.ALPHA;if(n===Gc)return i.RGB;if(n===Fe)return i.RGBA;if(n===Fi)return i.DEPTH_COMPONENT;if(n===ji)return i.DEPTH_STENCIL;if(n===Pa)return i.RED;if(n===La)return i.RED_INTEGER;if(n===Wc)return i.RG;if(n===Da)return i.RG_INTEGER;if(n===Ua)return i.RGBA_INTEGER;if(n===Qs||n===js||n===tr||n===er)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Qs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Qs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===er)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Na||n===Fa||n===za||n===Oa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===za)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ba||n===Va||n===ka)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ba||n===Va)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ka)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ha||n===Ga||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===Ja||n===$a||n===Ka||n===Qa||n===ja||n===to||n===eo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ha)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ga)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ya)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Za)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ja)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$a)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ka)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ja)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===to)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===eo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===no||n===io||n===so)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===no)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===io)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===so)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ro||n===ao||n===oo||n===co)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ro)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ao)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===oo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===co)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var d3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,f3=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,fl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ns(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new rn({vertexShader:d3,fragmentShader:f3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new we(new qs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},pl=class extends Tn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,p=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new fl,u={},M=e.getContextAttributes(),v=null,_=null,A=[],w=[],C=new at,R=null,S=new Te;S.viewport=new ae;let b=new Te;b.viewport=new ae;let P=[S,b],U=new xa,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let tt=A[Y];return tt===void 0&&(tt=new Wi,A[Y]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(Y){let tt=A[Y];return tt===void 0&&(tt=new Wi,A[Y]=tt),tt.getGripSpace()},this.getHand=function(Y){let tt=A[Y];return tt===void 0&&(tt=new Wi,A[Y]=tt),tt.getHandSpace()};function G(Y){let tt=w.indexOf(Y.inputSource);if(tt===-1)return;let vt=A[tt];vt!==void 0&&(vt.update(Y.inputSource,Y.frame,l||a),vt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",et);for(let Y=0;Y<A.length;Y++){let tt=w[Y];tt!==null&&(w[Y]=null,A[Y].disconnect(tt))}O=null,k=null,m.reset();for(let Y in u)delete u[Y];t.setRenderTarget(v),f=null,p=null,d=null,s=null,_=null,Zt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",W),s.addEventListener("inputsourceschange",et),M.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let vt=null,Rt=null,bt=null;M.depth&&(bt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,vt=M.stencil?ji:Fi,Rt=M.stencil?Qi:Hn);let Xt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:r};d=this.getBinding(),p=d.createProjectionLayer(Xt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),_=new Je(p.textureWidth,p.textureHeight,{format:Fe,type:an,depthTexture:new Us(p.textureWidth,p.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,vt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{let vt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,vt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Je(f.framebufferWidth,f.framebufferHeight,{format:Fe,type:an,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Zt.setContext(s),Zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function et(Y){for(let tt=0;tt<Y.removed.length;tt++){let vt=Y.removed[tt],Rt=w.indexOf(vt);Rt>=0&&(w[Rt]=null,A[Rt].disconnect(vt))}for(let tt=0;tt<Y.added.length;tt++){let vt=Y.added[tt],Rt=w.indexOf(vt);if(Rt===-1){for(let Xt=0;Xt<A.length;Xt++)if(Xt>=w.length){w.push(vt),Rt=Xt;break}else if(w[Xt]===null){w[Xt]=vt,Rt=Xt;break}if(Rt===-1)break}let bt=A[Rt];bt&&bt.connect(vt)}}let X=new L,ut=new L;function xt(Y,tt,vt){X.setFromMatrixPosition(tt.matrixWorld),ut.setFromMatrixPosition(vt.matrixWorld);let Rt=X.distanceTo(ut),bt=tt.projectionMatrix.elements,Xt=vt.projectionMatrix.elements,se=bt[14]/(bt[10]-1),I=bt[14]/(bt[10]+1),j=(bt[9]+1)/bt[5],$=(bt[9]-1)/bt[5],J=(bt[8]-1)/bt[0],Z=(Xt[8]+1)/Xt[0],lt=se*J,nt=se*Z,ht=Rt/(-J+Z),Ft=ht*-J;if(tt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ft),Y.translateZ(ht),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),bt[10]===-1)Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let Nt=se+ht,E=I+ht,y=lt-Ft,z=nt+(Rt-Ft),H=j*I/E*Nt,Q=$*I/E*Nt;Y.projectionMatrix.makePerspective(y,z,H,Q,Nt,E),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function yt(Y,tt){tt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(tt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let tt=Y.near,vt=Y.far;m.texture!==null&&(m.depthNear>0&&(tt=m.depthNear),m.depthFar>0&&(vt=m.depthFar)),U.near=b.near=S.near=tt,U.far=b.far=S.far=vt,(O!==U.near||k!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),O=U.near,k=U.far),U.layers.mask=Y.layers.mask|6,S.layers.mask=U.layers.mask&3,b.layers.mask=U.layers.mask&5;let Rt=Y.parent,bt=U.cameras;yt(U,Rt);for(let Xt=0;Xt<bt.length;Xt++)yt(bt[Xt],Rt);bt.length===2?xt(U,S,b):U.projectionMatrix.copy(S.projectionMatrix),Ot(Y,U,Rt)};function Ot(Y,tt,vt){vt===null?Y.matrix.copy(tt.matrixWorld):(Y.matrix.copy(vt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(tt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=zi*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(p===null&&f===null))return c},this.setFoveation=function(Y){c=Y,p!==null&&(p.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(Y){return u[Y]};let Yt=null;function jt(Y,tt){if(h=tt.getViewerPose(l||a),g=tt,h!==null){let vt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Rt=!1;vt.length!==U.cameras.length&&(U.cameras.length=0,Rt=!0);for(let I=0;I<vt.length;I++){let j=vt[I],$=null;if(f!==null)$=f.getViewport(j);else{let Z=d.getViewSubImage(p,j);$=Z.viewport,I===0&&(t.setRenderTargetTextures(_,Z.colorTexture,Z.depthStencilTexture),t.setRenderTarget(_))}let J=P[I];J===void 0&&(J=new Te,J.layers.enable(I),J.viewport=new ae,P[I]=J),J.matrix.fromArray(j.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(j.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set($.x,$.y,$.width,$.height),I===0&&(U.matrix.copy(J.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Rt===!0&&U.cameras.push(J)}let bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let I=d.getDepthInformation(vt[0]);I&&I.isValid&&I.texture&&m.init(I,s.renderState)}if(bt&&bt.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let I=0;I<vt.length;I++){let j=vt[I].camera;if(j){let $=u[j];$||($=new Ns,u[j]=$);let J=d.getCameraImage(j);$.sourceTexture=J}}}}for(let vt=0;vt<A.length;vt++){let Rt=w[vt],bt=A[vt];Rt!==null&&bt!==void 0&&bt.update(Rt,tt,l||a)}Yt&&Yt(Y,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}let Zt=new ku;Zt.setAnimationLoop(jt),this.setAnimationLoop=function(Y){Yt=Y},this.dispose=function(){}}},ci=new sn,p3=new Qt;function m3(i,t){function e(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,$c(i)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,M,v,_){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),d(m,u)):u.isMeshPhongMaterial?(r(m,u),h(m,u)):u.isMeshStandardMaterial?(r(m,u),p(m,u),u.isMeshPhysicalMaterial&&f(m,u,_)):u.isMeshMatcapMaterial?(r(m,u),g(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),x(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?c(m,u,M,v):u.isSpriteMaterial?l(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,e(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,e(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,e(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Le&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,e(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Le&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,e(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,e(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);let M=t.get(u),v=M.envMap,_=M.envMapRotation;v&&(m.envMap.value=v,ci.copy(_),ci.x*=-1,ci.y*=-1,ci.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),m.envMapRotation.value.setFromMatrix4(p3.makeRotationFromEuler(ci)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,e(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function c(m,u,M,v){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*M,m.scale.value=v*.5,u.map&&(m.map.value=u.map,e(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,e(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function l(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,e(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,e(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function p(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function f(m,u,M){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Le&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function x(m,u){let M=t.get(u).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function g3(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,v){let _=v.program;n.uniformBlockBinding(M,_)}function l(M,v){let _=s[M.id];_===void 0&&(g(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",m));let A=v.program;n.updateUBOMapping(M,A);let w=t.render.frame;r[M.id]!==w&&(p(M),r[M.id]=w)}function h(M){let v=d();M.__bindingPointIndex=v;let _=i.createBuffer(),A=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(M){let v=s[M.id],_=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,C=_.length;w<C;w++){let R=Array.isArray(_[w])?_[w]:[_[w]];for(let S=0,b=R.length;S<b;S++){let P=R[S];if(f(P,w,S,A)===!0){let U=P.__offset,O=Array.isArray(P.value)?P.value:[P.value],k=0;for(let G=0;G<O.length;G++){let W=O[G],et=x(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,U+k,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,k),k+=et.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,v,_,A){let w=M.value,C=v+"_"+_;if(A[C]===void 0)return typeof w=="number"||typeof w=="boolean"?A[C]=w:A[C]=w.clone(),!0;{let R=A[C];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return A[C]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function g(M){let v=M.uniforms,_=0,A=16;for(let C=0,R=v.length;C<R;C++){let S=Array.isArray(v[C])?v[C]:[v[C]];for(let b=0,P=S.length;b<P;b++){let U=S[b],O=Array.isArray(U.value)?U.value:[U.value];for(let k=0,G=O.length;k<G;k++){let W=O[k],et=x(W),X=_%A,ut=X%et.boundary,xt=X+ut;_+=ut,xt!==0&&A-xt<et.storage&&(_+=A-xt),U.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=_,_+=et.storage}}}let w=_%A;return w>0&&(_+=A-w),M.__size=_,M.__cache={},this}function x(M){let v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){let v=M.target;v.removeEventListener("dispose",m);let _=a.indexOf(v.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function u(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:u}}var Vu=class{constructor(t={}){let{canvas:e=ou(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let g=new Uint32Array(4),x=new Int32Array(4),m=null,u=null,M=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,A=!1;this._outputColorSpace=He;let w=0,C=0,R=null,S=-1,b=null,P=new ae,U=new ae,O=null,k=new Wt(0),G=0,W=e.width,et=e.height,X=1,ut=null,xt=null,yt=new ae(0,0,W,et),Ot=new ae(0,0,W,et),Yt=!1,jt=new qi,Zt=!1,Y=!1,tt=new Qt,vt=new L,Rt=new ae,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xt=!1;function se(){return R===null?X:1}let I=n;function j(T,N){return e.getContext(T,N)}try{let T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",dt,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",st,!1),I===null){let N="webgl2";if(I=j(N,T),I===null)throw j(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let $,J,Z,lt,nt,ht,Ft,Nt,E,y,z,H,Q,q,At,ct,Tt,Et,it,gt,Dt,Ct,pt,Vt;function D(){$=new Um(I),$.init(),Ct=new u3(I,$),J=new Am(I,$,t,Ct),Z=new l3(I,$),J.reversedDepthBuffer&&p&&Z.buffers.depth.setReversed(!0),lt=new zm(I),nt=new $1,ht=new h3(I,$,Z,nt,J,Ct,lt),Ft=new Rm(_),Nt=new Dm(_),E=new Gf(I),pt=new Em(I,E),y=new Nm(I,E,lt,pt),z=new Bm(I,y,E,lt),it=new Om(I,J,ht),ct=new Cm(nt),H=new J1(_,Ft,Nt,$,J,pt,ct),Q=new m3(_,nt),q=new Q1,At=new s3($),Et=new Tm(_,Ft,Nt,Z,z,f,c),Tt=new o3(_,z,J),Vt=new g3(I,lt,J,Z),gt=new wm(I,$,lt),Dt=new Fm(I,$,lt),lt.programs=H.programs,_.capabilities=J,_.extensions=$,_.properties=nt,_.renderLists=q,_.shadowMap=Tt,_.state=Z,_.info=lt}D();let ot=new pl(_,I);this.xr=ot,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let T=$.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=$.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(T){T!==void 0&&(X=T,this.setSize(W,et,!1))},this.getSize=function(T){return T.set(W,et)},this.setSize=function(T,N,B=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=T,et=N,e.width=Math.floor(T*X),e.height=Math.floor(N*X),B===!0&&(e.style.width=T+"px",e.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(W*X,et*X).floor()},this.setDrawingBufferSize=function(T,N,B){W=T,et=N,X=B,e.width=Math.floor(T*B),e.height=Math.floor(N*B),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(yt)},this.setViewport=function(T,N,B,V){T.isVector4?yt.set(T.x,T.y,T.z,T.w):yt.set(T,N,B,V),Z.viewport(P.copy(yt).multiplyScalar(X).round())},this.getScissor=function(T){return T.copy(Ot)},this.setScissor=function(T,N,B,V){T.isVector4?Ot.set(T.x,T.y,T.z,T.w):Ot.set(T,N,B,V),Z.scissor(U.copy(Ot).multiplyScalar(X).round())},this.getScissorTest=function(){return Yt},this.setScissorTest=function(T){Z.setScissorTest(Yt=T)},this.setOpaqueSort=function(T){ut=T},this.setTransparentSort=function(T){xt=T},this.getClearColor=function(T){return T.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor(...arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha(...arguments)},this.clear=function(T=!0,N=!0,B=!0){let V=0;if(T){let F=!1;if(R!==null){let rt=R.texture.format;F=rt===Ua||rt===Da||rt===La}if(F){let rt=R.texture.type,mt=rt===an||rt===Hn||rt===$i||rt===Qi||rt===Ra||rt===Ia,St=Et.getClearColor(),_t=Et.getClearAlpha(),Lt=St.r,Ut=St.g,It=St.b;mt?(g[0]=Lt,g[1]=Ut,g[2]=It,g[3]=_t,I.clearBufferuiv(I.COLOR,0,g)):(x[0]=Lt,x[1]=Ut,x[2]=It,x[3]=_t,I.clearBufferiv(I.COLOR,0,x))}else V|=I.COLOR_BUFFER_BIT}N&&(V|=I.DEPTH_BUFFER_BIT),B&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",dt,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",st,!1),Et.dispose(),q.dispose(),At.dispose(),nt.dispose(),Ft.dispose(),Nt.dispose(),z.dispose(),pt.dispose(),Vt.dispose(),H.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",on),ot.removeEventListener("sessionend",Fl),Xn.stop()};function dt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let T=lt.autoReset,N=Tt.enabled,B=Tt.autoUpdate,V=Tt.needsUpdate,F=Tt.type;D(),lt.autoReset=T,Tt.enabled=N,Tt.autoUpdate=B,Tt.needsUpdate=V,Tt.type=F}function st(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function K(T){let N=T.target;N.removeEventListener("dispose",K),wt(N)}function wt(T){zt(T),nt.remove(T)}function zt(T){let N=nt.get(T).programs;N!==void 0&&(N.forEach(function(B){H.releaseProgram(B)}),T.isShaderMaterial&&H.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,B,V,F,rt){N===null&&(N=bt);let mt=F.isMesh&&F.matrixWorld.determinant()<0,St=fd(T,N,B,V,F);Z.setMaterial(V,mt);let _t=B.index,Lt=1;if(V.wireframe===!0){if(_t=y.getWireframeAttribute(B),_t===void 0)return;Lt=2}let Ut=B.drawRange,It=B.attributes.position,qt=Ut.start*Lt,ne=(Ut.start+Ut.count)*Lt;rt!==null&&(qt=Math.max(qt,rt.start*Lt),ne=Math.min(ne,(rt.start+rt.count)*Lt)),_t!==null?(qt=Math.max(qt,0),ne=Math.min(ne,_t.count)):It!=null&&(qt=Math.max(qt,0),ne=Math.min(ne,It.count));let de=ne-qt;if(de<0||de===1/0)return;pt.setup(F,V,St,B,_t);let oe,ie=gt;if(_t!==null&&(oe=E.get(_t),ie=Dt,ie.setIndex(oe)),F.isMesh)V.wireframe===!0?(Z.setLineWidth(V.wireframeLinewidth*se()),ie.setMode(I.LINES)):ie.setMode(I.TRIANGLES);else if(F.isLine){let Pt=V.linewidth;Pt===void 0&&(Pt=1),Z.setLineWidth(Pt*se()),F.isLineSegments?ie.setMode(I.LINES):F.isLineLoop?ie.setMode(I.LINE_LOOP):ie.setMode(I.LINE_STRIP)}else F.isPoints?ie.setMode(I.POINTS):F.isSprite&&ie.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Bi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ie.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if($.get("WEBGL_multi_draw"))ie.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Pt=F._multiDrawStarts,le=F._multiDrawCounts,$t=F._multiDrawCount,Oe=_t?E.get(_t).bytesPerElement:1,gi=nt.get(V).currentProgram.getUniforms();for(let Be=0;Be<$t;Be++)gi.setValue(I,"_gl_DrawID",Be),ie.render(Pt[Be]/Oe,le[Be])}else if(F.isInstancedMesh)ie.renderInstances(qt,de,F.count);else if(B.isInstancedBufferGeometry){let Pt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,le=Math.min(B.instanceCount,Pt);ie.renderInstances(qt,de,le)}else ie.render(qt,de)};function re(T,N,B){T.transparent===!0&&T.side===fn&&T.forceSinglePass===!1?(T.side=Le,T.needsUpdate=!0,ar(T,N,B),T.side=bn,T.needsUpdate=!0,ar(T,N,B),T.side=fn):ar(T,N,B)}this.compile=function(T,N,B=null){B===null&&(B=T),u=At.get(B),u.init(N),v.push(u),B.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(u.pushLight(F),F.castShadow&&u.pushShadow(F))}),T!==B&&T.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(u.pushLight(F),F.castShadow&&u.pushShadow(F))}),u.setupLights();let V=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let rt=F.material;if(rt)if(Array.isArray(rt))for(let mt=0;mt<rt.length;mt++){let St=rt[mt];re(St,B,F),V.add(St)}else re(rt,B,F),V.add(rt)}),u=v.pop(),V},this.compileAsync=function(T,N,B=null){let V=this.compile(T,N,B);return new Promise(F=>{function rt(){if(V.forEach(function(mt){nt.get(mt).currentProgram.isReady()&&V.delete(mt)}),V.size===0){F(T);return}setTimeout(rt,10)}$.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let Kt=null;function mn(T){Kt&&Kt(T)}function on(){Xn.stop()}function Fl(){Xn.start()}let Xn=new ku;Xn.setAnimationLoop(mn),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(T){Kt=T,ot.setAnimationLoop(T),T===null?Xn.stop():Xn.start()},ot.addEventListener("sessionstart",on),ot.addEventListener("sessionend",Fl),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(N),N=ot.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,N,R),u=At.get(T,v.length),u.init(N),v.push(u),tt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),jt.setFromProjectionMatrix(tt,tn,N.reversedDepth),Y=this.localClippingEnabled,Zt=ct.init(this.clippingPlanes,Y),m=q.get(T,M.length),m.init(),M.push(m),ot.enabled===!0&&ot.isPresenting===!0){let rt=_.xr.getDepthSensingMesh();rt!==null&&wo(rt,N,-1/0,_.sortObjects)}wo(T,N,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(ut,xt),Xt=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,Xt&&Et.addToRenderList(m,T),this.info.render.frame++,Zt===!0&&ct.beginShadows();let B=u.state.shadowsArray;Tt.render(B,T,N),Zt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=m.opaque,F=m.transmissive;if(u.setupLights(),N.isArrayCamera){let rt=N.cameras;if(F.length>0)for(let mt=0,St=rt.length;mt<St;mt++){let _t=rt[mt];Ol(V,F,T,_t)}Xt&&Et.render(T);for(let mt=0,St=rt.length;mt<St;mt++){let _t=rt[mt];zl(m,T,_t,_t.viewport)}}else F.length>0&&Ol(V,F,T,N),Xt&&Et.render(T),zl(m,T,N);R!==null&&C===0&&(ht.updateMultisampleRenderTarget(R),ht.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(_,T,N),pt.resetDefaultState(),S=-1,b=null,v.pop(),v.length>0?(u=v[v.length-1],Zt===!0&&ct.setGlobalState(_.clippingPlanes,u.state.camera)):u=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function wo(T,N,B,V){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)B=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)u.pushLight(T),T.castShadow&&u.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||jt.intersectsSprite(T)){V&&Rt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(tt);let mt=z.update(T),St=T.material;St.visible&&m.push(T,mt,St,B,Rt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||jt.intersectsObject(T))){let mt=z.update(T),St=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Rt.copy(T.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Rt.copy(mt.boundingSphere.center)),Rt.applyMatrix4(T.matrixWorld).applyMatrix4(tt)),Array.isArray(St)){let _t=mt.groups;for(let Lt=0,Ut=_t.length;Lt<Ut;Lt++){let It=_t[Lt],qt=St[It.materialIndex];qt&&qt.visible&&m.push(T,mt,qt,B,Rt.z,It)}}else St.visible&&m.push(T,mt,St,B,Rt.z,null)}}let rt=T.children;for(let mt=0,St=rt.length;mt<St;mt++)wo(rt[mt],N,B,V)}function zl(T,N,B,V){let F=T.opaque,rt=T.transmissive,mt=T.transparent;u.setupLightsView(B),Zt===!0&&ct.setGlobalState(_.clippingPlanes,B),V&&Z.viewport(P.copy(V)),F.length>0&&rr(F,N,B),rt.length>0&&rr(rt,N,B),mt.length>0&&rr(mt,N,B),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function Ol(T,N,B,V){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[V.id]===void 0&&(u.state.transmissionRenderTarget[V.id]=new Je(1,1,{generateMipmaps:!0,type:$.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float")?Ki:an,minFilter:kn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));let rt=u.state.transmissionRenderTarget[V.id],mt=V.viewport||P;rt.setSize(mt.z*_.transmissionResolutionScale,mt.w*_.transmissionResolutionScale);let St=_.getRenderTarget(),_t=_.getActiveCubeFace(),Lt=_.getActiveMipmapLevel();_.setRenderTarget(rt),_.getClearColor(k),G=_.getClearAlpha(),G<1&&_.setClearColor(16777215,.5),_.clear(),Xt&&Et.render(B);let Ut=_.toneMapping;_.toneMapping=An;let It=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),u.setupLightsView(V),Zt===!0&&ct.setGlobalState(_.clippingPlanes,V),rr(T,B,V),ht.updateMultisampleRenderTarget(rt),ht.updateRenderTargetMipmap(rt),$.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let ne=0,de=N.length;ne<de;ne++){let oe=N[ne],ie=oe.object,Pt=oe.geometry,le=oe.material,$t=oe.group;if(le.side===fn&&ie.layers.test(V.layers)){let Oe=le.side;le.side=Le,le.needsUpdate=!0,Bl(ie,B,V,Pt,le,$t),le.side=Oe,le.needsUpdate=!0,qt=!0}}qt===!0&&(ht.updateMultisampleRenderTarget(rt),ht.updateRenderTargetMipmap(rt))}_.setRenderTarget(St,_t,Lt),_.setClearColor(k,G),It!==void 0&&(V.viewport=It),_.toneMapping=Ut}function rr(T,N,B){let V=N.isScene===!0?N.overrideMaterial:null;for(let F=0,rt=T.length;F<rt;F++){let mt=T[F],St=mt.object,_t=mt.geometry,Lt=mt.group,Ut=mt.material;Ut.allowOverride===!0&&V!==null&&(Ut=V),St.layers.test(B.layers)&&Bl(St,N,B,_t,Ut,Lt)}}function Bl(T,N,B,V,F,rt){T.onBeforeRender(_,N,B,V,F,rt),T.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(_,N,B,V,T,rt),F.transparent===!0&&F.side===fn&&F.forceSinglePass===!1?(F.side=Le,F.needsUpdate=!0,_.renderBufferDirect(B,N,V,F,T,rt),F.side=bn,F.needsUpdate=!0,_.renderBufferDirect(B,N,V,F,T,rt),F.side=fn):_.renderBufferDirect(B,N,V,F,T,rt),T.onAfterRender(_,N,B,V,F,rt)}function ar(T,N,B){N.isScene!==!0&&(N=bt);let V=nt.get(T),F=u.state.lights,rt=u.state.shadowsArray,mt=F.state.version,St=H.getParameters(T,F.state,rt,N,B),_t=H.getProgramCacheKey(St),Lt=V.programs;V.environment=T.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(T.isMeshStandardMaterial?Nt:Ft).get(T.envMap||V.environment),V.envMapRotation=V.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,Lt===void 0&&(T.addEventListener("dispose",K),Lt=new Map,V.programs=Lt);let Ut=Lt.get(_t);if(Ut!==void 0){if(V.currentProgram===Ut&&V.lightsStateVersion===mt)return kl(T,St),Ut}else St.uniforms=H.getUniforms(T),T.onBeforeCompile(St,_),Ut=H.acquireProgram(St,_t),Lt.set(_t,Ut),V.uniforms=St.uniforms;let It=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(It.clippingPlanes=ct.uniform),kl(T,St),V.needsLights=md(T),V.lightsStateVersion=mt,V.needsLights&&(It.ambientLightColor.value=F.state.ambient,It.lightProbe.value=F.state.probe,It.directionalLights.value=F.state.directional,It.directionalLightShadows.value=F.state.directionalShadow,It.spotLights.value=F.state.spot,It.spotLightShadows.value=F.state.spotShadow,It.rectAreaLights.value=F.state.rectArea,It.ltc_1.value=F.state.rectAreaLTC1,It.ltc_2.value=F.state.rectAreaLTC2,It.pointLights.value=F.state.point,It.pointLightShadows.value=F.state.pointShadow,It.hemisphereLights.value=F.state.hemi,It.directionalShadowMap.value=F.state.directionalShadowMap,It.directionalShadowMatrix.value=F.state.directionalShadowMatrix,It.spotShadowMap.value=F.state.spotShadowMap,It.spotLightMatrix.value=F.state.spotLightMatrix,It.spotLightMap.value=F.state.spotLightMap,It.pointShadowMap.value=F.state.pointShadowMap,It.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Ut,V.uniformsList=null,Ut}function Vl(T){if(T.uniformsList===null){let N=T.currentProgram.getUniforms();T.uniformsList=ns.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function kl(T,N){let B=nt.get(T);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.batchingColor=N.batchingColor,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.instancingMorph=N.instancingMorph,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function fd(T,N,B,V,F){N.isScene!==!0&&(N=bt),ht.resetTextureUnits();let rt=N.fog,mt=V.isMeshStandardMaterial?N.environment:null,St=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ei,_t=(V.isMeshStandardMaterial?Nt:Ft).get(V.envMap||mt),Lt=V.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ut=!!B.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),It=!!B.morphAttributes.position,qt=!!B.morphAttributes.normal,ne=!!B.morphAttributes.color,de=An;V.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(de=_.toneMapping);let oe=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ie=oe!==void 0?oe.length:0,Pt=nt.get(V),le=u.state.lights;if(Zt===!0&&(Y===!0||T!==b)){let Re=T===b&&V.id===S;ct.setState(V,T,Re)}let $t=!1;V.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==le.state.version||Pt.outputColorSpace!==St||F.isBatchedMesh&&Pt.batching===!1||!F.isBatchedMesh&&Pt.batching===!0||F.isBatchedMesh&&Pt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Pt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Pt.instancing===!1||!F.isInstancedMesh&&Pt.instancing===!0||F.isSkinnedMesh&&Pt.skinning===!1||!F.isSkinnedMesh&&Pt.skinning===!0||F.isInstancedMesh&&Pt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Pt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Pt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Pt.instancingMorph===!1&&F.morphTexture!==null||Pt.envMap!==_t||V.fog===!0&&Pt.fog!==rt||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==ct.numPlanes||Pt.numIntersection!==ct.numIntersection)||Pt.vertexAlphas!==Lt||Pt.vertexTangents!==Ut||Pt.morphTargets!==It||Pt.morphNormals!==qt||Pt.morphColors!==ne||Pt.toneMapping!==de||Pt.morphTargetsCount!==ie)&&($t=!0):($t=!0,Pt.__version=V.version);let Oe=Pt.currentProgram;$t===!0&&(Oe=ar(V,N,F));let gi=!1,Be=!1,as=!1,he=Oe.getUniforms(),qe=Pt.uniforms;if(Z.useProgram(Oe.program)&&(gi=!0,Be=!0,as=!0),V.id!==S&&(S=V.id,Be=!0),gi||b!==T){Z.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),he.setValue(I,"projectionMatrix",T.projectionMatrix),he.setValue(I,"viewMatrix",T.matrixWorldInverse);let Ue=he.map.cameraPosition;Ue!==void 0&&Ue.setValue(I,vt.setFromMatrixPosition(T.matrixWorld)),J.logarithmicDepthBuffer&&he.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&he.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),b!==T&&(b=T,Be=!0,as=!0)}if(F.isSkinnedMesh){he.setOptional(I,F,"bindMatrix"),he.setOptional(I,F,"bindMatrixInverse");let Re=F.skeleton;Re&&(Re.boneTexture===null&&Re.computeBoneTexture(),he.setValue(I,"boneTexture",Re.boneTexture,ht))}F.isBatchedMesh&&(he.setOptional(I,F,"batchingTexture"),he.setValue(I,"batchingTexture",F._matricesTexture,ht),he.setOptional(I,F,"batchingIdTexture"),he.setValue(I,"batchingIdTexture",F._indirectTexture,ht),he.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&he.setValue(I,"batchingColorTexture",F._colorsTexture,ht));let Ye=B.morphAttributes;if((Ye.position!==void 0||Ye.normal!==void 0||Ye.color!==void 0)&&it.update(F,B,Oe),(Be||Pt.receiveShadow!==F.receiveShadow)&&(Pt.receiveShadow=F.receiveShadow,he.setValue(I,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(qe.envMap.value=_t,qe.flipEnvMap.value=_t.isCubeTexture&&_t.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(qe.envMapIntensity.value=N.environmentIntensity),Be&&(he.setValue(I,"toneMappingExposure",_.toneMappingExposure),Pt.needsLights&&pd(qe,as),rt&&V.fog===!0&&Q.refreshFogUniforms(qe,rt),Q.refreshMaterialUniforms(qe,V,X,et,u.state.transmissionRenderTarget[T.id]),ns.upload(I,Vl(Pt),qe,ht)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ns.upload(I,Vl(Pt),qe,ht),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&he.setValue(I,"center",F.center),he.setValue(I,"modelViewMatrix",F.modelViewMatrix),he.setValue(I,"normalMatrix",F.normalMatrix),he.setValue(I,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let Re=V.uniformsGroups;for(let Ue=0,Ao=Re.length;Ue<Ao;Ue++){let qn=Re[Ue];Vt.update(qn,Oe),Vt.bind(qn,Oe)}}return Oe}function pd(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function md(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,N,B){let V=nt.get(T);V.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),nt.get(T.texture).__webglTexture=N,nt.get(T.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:B,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,N){let B=nt.get(T);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0};let gd=I.createFramebuffer();this.setRenderTarget=function(T,N=0,B=0){R=T,w=N,C=B;let V=!0,F=null,rt=!1,mt=!1;if(T){let _t=nt.get(T);if(_t.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(I.FRAMEBUFFER,null),V=!1;else if(_t.__webglFramebuffer===void 0)ht.setupRenderTarget(T);else if(_t.__hasExternalTextures)ht.rebindTextures(T,nt.get(T.texture).__webglTexture,nt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let It=T.depthTexture;if(_t.__boundDepthTexture!==It){if(It!==null&&nt.has(It)&&(T.width!==It.image.width||T.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ht.setupDepthRenderbuffer(T)}}let Lt=T.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(mt=!0);let Ut=nt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ut[N])?F=Ut[N][B]:F=Ut[N],rt=!0):T.samples>0&&ht.useMultisampledRTT(T)===!1?F=nt.get(T).__webglMultisampledFramebuffer:Array.isArray(Ut)?F=Ut[B]:F=Ut,P.copy(T.viewport),U.copy(T.scissor),O=T.scissorTest}else P.copy(yt).multiplyScalar(X).floor(),U.copy(Ot).multiplyScalar(X).floor(),O=Yt;if(B!==0&&(F=gd),Z.bindFramebuffer(I.FRAMEBUFFER,F)&&V&&Z.drawBuffers(T,F),Z.viewport(P),Z.scissor(U),Z.setScissorTest(O),rt){let _t=nt.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,_t.__webglTexture,B)}else if(mt){let _t=N;for(let Lt=0;Lt<T.textures.length;Lt++){let Ut=nt.get(T.textures[Lt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Lt,Ut.__webglTexture,B,_t)}}else if(T!==null&&B!==0){let _t=nt.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,_t.__webglTexture,B)}S=-1},this.readRenderTargetPixels=function(T,N,B,V,F,rt,mt,St=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=nt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&mt!==void 0&&(_t=_t[mt]),_t){Z.bindFramebuffer(I.FRAMEBUFFER,_t);try{let Lt=T.textures[St],Ut=Lt.format,It=Lt.type;if(!J.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-V&&B>=0&&B<=T.height-F&&(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+St),I.readPixels(N,B,V,F,Ct.convert(Ut),Ct.convert(It),rt))}finally{let Lt=R!==null?nt.get(R).__webglFramebuffer:null;Z.bindFramebuffer(I.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(T,N,B,V,F,rt,mt,St=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=nt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&mt!==void 0&&(_t=_t[mt]),_t)if(N>=0&&N<=T.width-V&&B>=0&&B<=T.height-F){Z.bindFramebuffer(I.FRAMEBUFFER,_t);let Lt=T.textures[St],Ut=Lt.format,It=Lt.type;if(!J.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let qt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,qt),I.bufferData(I.PIXEL_PACK_BUFFER,rt.byteLength,I.STREAM_READ),T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+St),I.readPixels(N,B,V,F,Ct.convert(Ut),Ct.convert(It),0);let ne=R!==null?nt.get(R).__webglFramebuffer:null;Z.bindFramebuffer(I.FRAMEBUFFER,ne);let de=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await cu(I,de,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,qt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,rt),I.deleteBuffer(qt),I.deleteSync(de),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,N=null,B=0){let V=Math.pow(2,-B),F=Math.floor(T.image.width*V),rt=Math.floor(T.image.height*V),mt=N!==null?N.x:0,St=N!==null?N.y:0;ht.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,B,0,0,mt,St,F,rt),Z.unbindTexture()};let xd=I.createFramebuffer(),_d=I.createFramebuffer();this.copyTextureToTexture=function(T,N,B=null,V=null,F=0,rt=null){rt===null&&(F!==0?(Bi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),rt=F,F=0):rt=0);let mt,St,_t,Lt,Ut,It,qt,ne,de,oe=T.isCompressedTexture?T.mipmaps[rt]:T.image;if(B!==null)mt=B.max.x-B.min.x,St=B.max.y-B.min.y,_t=B.isBox3?B.max.z-B.min.z:1,Lt=B.min.x,Ut=B.min.y,It=B.isBox3?B.min.z:0;else{let Ye=Math.pow(2,-F);mt=Math.floor(oe.width*Ye),St=Math.floor(oe.height*Ye),T.isDataArrayTexture?_t=oe.depth:T.isData3DTexture?_t=Math.floor(oe.depth*Ye):_t=1,Lt=0,Ut=0,It=0}V!==null?(qt=V.x,ne=V.y,de=V.z):(qt=0,ne=0,de=0);let ie=Ct.convert(N.format),Pt=Ct.convert(N.type),le;N.isData3DTexture?(ht.setTexture3D(N,0),le=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(ht.setTexture2DArray(N,0),le=I.TEXTURE_2D_ARRAY):(ht.setTexture2D(N,0),le=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);let $t=I.getParameter(I.UNPACK_ROW_LENGTH),Oe=I.getParameter(I.UNPACK_IMAGE_HEIGHT),gi=I.getParameter(I.UNPACK_SKIP_PIXELS),Be=I.getParameter(I.UNPACK_SKIP_ROWS),as=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,oe.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,oe.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Lt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ut),I.pixelStorei(I.UNPACK_SKIP_IMAGES,It);let he=T.isDataArrayTexture||T.isData3DTexture,qe=N.isDataArrayTexture||N.isData3DTexture;if(T.isDepthTexture){let Ye=nt.get(T),Re=nt.get(N),Ue=nt.get(Ye.__renderTarget),Ao=nt.get(Re.__renderTarget);Z.bindFramebuffer(I.READ_FRAMEBUFFER,Ue.__webglFramebuffer),Z.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ao.__webglFramebuffer);for(let qn=0;qn<_t;qn++)he&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,nt.get(T).__webglTexture,F,It+qn),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,nt.get(N).__webglTexture,rt,de+qn)),I.blitFramebuffer(Lt,Ut,mt,St,qt,ne,mt,St,I.DEPTH_BUFFER_BIT,I.NEAREST);Z.bindFramebuffer(I.READ_FRAMEBUFFER,null),Z.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(F!==0||T.isRenderTargetTexture||nt.has(T)){let Ye=nt.get(T),Re=nt.get(N);Z.bindFramebuffer(I.READ_FRAMEBUFFER,xd),Z.bindFramebuffer(I.DRAW_FRAMEBUFFER,_d);for(let Ue=0;Ue<_t;Ue++)he?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ye.__webglTexture,F,It+Ue):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ye.__webglTexture,F),qe?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Re.__webglTexture,rt,de+Ue):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Re.__webglTexture,rt),F!==0?I.blitFramebuffer(Lt,Ut,mt,St,qt,ne,mt,St,I.COLOR_BUFFER_BIT,I.NEAREST):qe?I.copyTexSubImage3D(le,rt,qt,ne,de+Ue,Lt,Ut,mt,St):I.copyTexSubImage2D(le,rt,qt,ne,Lt,Ut,mt,St);Z.bindFramebuffer(I.READ_FRAMEBUFFER,null),Z.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else qe?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(le,rt,qt,ne,de,mt,St,_t,ie,Pt,oe.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(le,rt,qt,ne,de,mt,St,_t,ie,oe.data):I.texSubImage3D(le,rt,qt,ne,de,mt,St,_t,ie,Pt,oe):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,rt,qt,ne,mt,St,ie,Pt,oe.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,rt,qt,ne,oe.width,oe.height,ie,oe.data):I.texSubImage2D(I.TEXTURE_2D,rt,qt,ne,mt,St,ie,Pt,oe);I.pixelStorei(I.UNPACK_ROW_LENGTH,$t),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Oe),I.pixelStorei(I.UNPACK_SKIP_PIXELS,gi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Be),I.pixelStorei(I.UNPACK_SKIP_IMAGES,as),rt===0&&N.generateMipmaps&&I.generateMipmap(le),Z.unbindTexture()},this.initRenderTarget=function(T){nt.get(T).__webglFramebuffer===void 0&&ht.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?ht.setTextureCube(T,0):T.isData3DTexture?ht.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?ht.setTexture2DArray(T,0):ht.setTexture2D(T,0),Z.unbindTexture()},this.resetState=function(){w=0,C=0,R=null,Z.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}};var go=.3,mo=Math.acos(.75),ui=[[-.53,.025],[-.22,.025]];for(let i=1;i<=4;i++){let t=mo*i/4;ui.push([-.22+go*Math.sin(t),.025+go*(1-Math.cos(t))])}var x3=ui.at(-1)[0],_3=ui.at(-1)[1];for(let i=1;i<=4;i++){let t=mo*(1-i/4);ui.push([x3+go*(Math.sin(mo)-Math.sin(t)),_3+go*(Math.cos(t)-Math.cos(mo))])}ui.push([.28,.175]);var xl=(.12*.12+.074*.074)/(2*.074),v3=Math.asin(.12/xl);for(let i=1;i<=3;i++){let t=v3*i/3;ui.push([.28+xl*Math.sin(t),.175-xl*(1-Math.cos(t))])}var I6=ui;function y3(i,t=!1){let e=new Map,n=[],s=[];for(let o=0;o<i.length;o+=3){let c=[i[o],i[o+1],i[o+2]].map(h=>Math.round(h*1e5)).join(","),l=e.get(c);l===void 0&&(l=n.length/3,e.set(c,l),n.push(i[o],i[o+1],i[o+2])),s.push(l)}let r=new fe;if(r.setAttribute("position",new Ht(n,3)),r.setIndex(s),r.computeVertexNormals(),r.computeBoundingSphere(),t)return r;let a=r.toNonIndexed();return r.dispose(),a}function P6(i){let t=0,e=0;for(let n of["Tapered rolled curb","Circuit poured curb","Junction poured curb","Bulb poured curb"]){let s=i.scene.getObjectByName(n);if(!s)continue;let r=s.geometry;t+=r.attributes.position.array.byteLength+r.attributes.normal.array.byteLength,s.geometry=y3(r.attributes.position.array,!0),e+=s.geometry.attributes.position.array.byteLength+s.geometry.attributes.normal.array.byteLength+s.geometry.index.array.byteLength,s.material.flatShading=!1,s.material.needsUpdate=!0,r.dispose()}i.pavementMemory={before:t,after:e,saved:t-e}}var xo=class{constructor(t,e=!0){let n=[];for(let s=e?0:1;s<t.length;s++){let r=t[e?s:s-1],a=t[e?(s+1)%t.length:s];n.push({a:r,b:a,xa:Math.min(r.x,a.x),xb:Math.max(r.x,a.x),za:Math.min(r.z,a.z),zb:Math.max(r.z,a.z)})}this.root=_l(n)}distance(t,e){let n=1/0,s=r=>{let a=Math.max(r.xa-t,0,t-r.xb),o=Math.max(r.za-e,0,e-r.zb);if(a*a+o*o>n*n+1e-9)return;if(r.edges){for(let{a:p,b:f}of r.edges){let g=f.x-p.x,x=f.z-p.z,m=Math.max(0,Math.min(1,((t-p.x)*g+(e-p.z)*x)/(g*g+x*x)));n=Math.min(n,Math.hypot(t-p.x-m*g,e-p.z-m*x))}return}let c=r.left,l=r.right,h=(t-c.cx)**2+(e-c.cz)**2,d=(t-l.cx)**2+(e-l.cz)**2;h<d?(s(c),s(l)):(s(l),s(c))};return s(this.root),n}contains(t,e){let n=!1,s=r=>{if(!(e<r.za||e>=r.zb||t>=r.xb)){if(r.edges){for(let{a,b:o}of r.edges)a.z>e!=o.z>e&&t<(o.x-a.x)*(e-a.z)/(o.z-a.z)+a.x&&(n=!n);return}s(r.left),s(r.right)}};return s(this.root),n}};function _l(i){let t={xa:1/0,xb:-1/0,za:1/0,zb:-1/0};for(let e of i)t.xa=Math.min(t.xa,e.xa),t.xb=Math.max(t.xb,e.xb),t.za=Math.min(t.za,e.za),t.zb=Math.max(t.zb,e.zb);if(t.cx=(t.xa+t.xb)/2,t.cz=(t.za+t.zb)/2,i.length<=8)t.edges=i;else{let e=t.xb-t.xa>=t.zb-t.za?"x":"z";i.sort((s,r)=>s[e+"a"]+s[e+"b"]-r[e+"a"]-r[e+"b"]);let n=i.length>>1;t.left=_l(i.slice(0,n)),t.right=_l(i.slice(n))}return t}var qu=[{x:50.348970854832494,z:-22.664532753527787},{x:50.31589237874412,z:-22.71326862993473},{x:49.476494239883216,z:-23.928257706326235},{x:49.44059277245642,z:-23.979569562476613},{x:48.59085595173556,z:-25.171631508812933},{x:48.551776447912594,z:-25.225726801379633},{x:47.692315628696825,z:-26.392299641023467},{x:47.649649804321996,z:-26.44939787070325},{x:46.78108192277592,z:-27.587919440274643},{x:46.73435899463243,z:-27.64825115289327},{x:45.85730362702553,z:-28.75615926617145},{x:45.80597942888268,z:-28.81996399936622},{x:44.91527375866418,z:-29.90172313618289},{x:44.895774484182425,z:-29.925147605182428},{x:44.85912692049574,z:-29.96871178044197},{x:44.83901427208886,z:-29.992370701902807},{x:43.966393562218165,z:-31.008151922601336},{x:43.944438026013856,z:-31.033422810109297},{x:43.90392917263727,z:-31.079526521313657},{x:43.88169301356041,z:-31.104550840582707},{x:43.004507237586246,z:-32.08070204217826},{x:42.980166381918536,z:-32.107462760181384},{x:42.93524756760099,z:-32.156252964173376},{x:42.910585796976235,z:-32.18271823107828},{x:42.02975935530677,z:-33.11660562642457},{x:42.00268910213651,z:-33.14493365989632},{x:41.95272360757474,z:-33.196541728774484},{x:41.925285678642915,z:-33.2245137888177},{x:41.041794581729214,z:-34.11351517474665},{x:41.01159602384745,z:-34.14347423914309},{x:40.95584583326977,z:-34.198003484255786},{x:40.925225515038285,z:-34.227531344813194},{x:40.040104781018776,z:-35.0690442341656},{x:40.00631664802395,z:-35.10067506869442},{x:39.943928693520796,z:-35.15818310765837},{x:39.90965659540747,z:-35.189288909610646},{x:39.02400764081832,z:-35.98074192540403},{x:38.98609904010322,z:-36.01404944729114},{x:38.9160920811638,z:-36.0745237324754},{x:38.87762859438342,z:-36.107188900579196},{x:37.99262576785736,z:-36.846057444976296},{x:37.949990260998305,z:-36.88099317474557},{x:37.87124442938656,z:-36.94431768582953},{x:37.827974239024144,z:-36.97846416859819},{x:36.94486904617197,z:-37.66229152172681},{x:36.89682182929654,z:-37.698730078025946},{x:36.8080742062686,z:-37.764641016803246},{x:36.75930427825069,z:-37.80010645851482},{x:35.879424965452955,z:-38.4265314628597},{x:35.82520593677986,z:-38.46424001028097},{x:35.72505743438566,z:-38.53226856800167},{x:35.64250178296661,z:-38.58702845711958},{x:35.643219728126816,z:-38.58811082655711},{x:35.354987613150776,z:-38.78874082494084},{x:35.04195435908704,z:-39.03925891921984},{x:34.7463509040428,z:-39.310123702971474},{x:34.46949719244361,z:-39.60012569621405},{x:34.212629446353496,z:-39.90796996647013},{x:33.97689464542973,z:-40.23228191096854},{x:33.763345405367694,z:-40.57161339459457},{x:33.57293527770476,z:-40.924449216180605},{x:33.40651449197067,z:-41.289213874263815},{x:33.26482615919706,z:-41.664278602099884},{x:33.14850295373809,z:-42.047968640519784},{x:33.058064288218986,z:-42.43857071615436},{x:32.99391399422688,z:-42.83434069163461},{x:32.95633851910027,z:-43.233511353607554},{x:32.94550564686904,z:-43.63430030379223},{x:32.961463749056136,z:-44.03491791784021},{x:33.004141568686514,z:-44.433575336462404},{x:33.07334853846755,z:-44.82849245313961},{x:33.16877563172038,z:-45.217905862749795},{x:33.28999674226242,z:-45.60007673561933},{x:33.43647058707959,z:-45.97329858183869},{x:33.60754312329229,z:-46.33590487117282},{x:33.80245046862279,z:-46.686276474541486},{x:34.26510076321214,z:-47.45621561609552},{x:34.28946818251782,z:-47.49641022772386},{x:34.88544670661598,z:-48.47085972842379},{x:34.91174201399386,z:-48.51345344481376},{x:35.5127116279875,z:-49.477893638223286},{x:35.54101891333746,z:-49.52287626338273},{x:36.14717919698047,z:-50.47671724547901},{x:36.17758830375037,z:-50.524076222846645},{x:36.789129062382656,z:-51.46673267740273},{x:36.82173551819805,z:-51.51645243170441},{x:37.43883693549553,z:-52.44734479885436},{x:37.47374184093485,z:-52.499406026542786},{x:38.09657471158859,z:-53.41796176036083},{x:38.13388457702889,z:-53.4723406674553},{x:38.76261063741132,z:-54.37799558381312},{x:38.80243715689857,z:-54.4346630709312},{x:39.43720953337922,z:-55.32686278493161},{x:39.479669283525595,z:-55.38578358055814},{x:40.12063307971745,z:-56.263985030503825},{x:40.165847130739586,z:-56.325116775101975},{x:40.81314017634052,z:-57.18878982694747},{x:40.86123360159716,z:-57.2520821124319},{x:41.514987386656145,z:-58.10071123512485},{x:41.56608865648163,z:-58.16610460649589},{x:42.226429475606096,z:-58.99919060432991},{x:42.28066972097364,z:-59.06661553295098},{x:42.947720052161856,z:-59.883677316178165},{x:43.005232183839524,z:-59.95305315725357},{x:43.67911232594382,z:-60.75362952656903},{x:43.74002999545796,z:-60.824863476844534},{x:44.42085998666006,z:-61.6085148911601},{x:44.485316376681745,z:-61.681500966673596},{x:45.17321821346688,z:-62.447811256825915},{x:45.241344647330706,z:-62.52242931460944},{x:45.93644481911687,z:-63.271007298557976},{x:46.00836918220657,z:-63.34712213041432},{x:46.710801530710135,z:-64.07760307822706},{x:46.78664650053698,z:-64.15506360891439},{x:47.496555404991796,z:-64.86711049881494},{x:47.576436492048856,z:-64.94574912494264},{x:47.597722210293526,z:-64.96631578947368},{x:36.12438324653378,z:-64.96631578947368},{x:35.66014122083058,z:-64.39782840513155},{x:35.62167005236183,z:-64.35015151281704},{x:34.87082500699893,z:-63.40312798095492},{x:34.83458085870276,z:-63.35688354018833},{x:34.09559324033437,z:-62.39784097279412},{x:34.061483143438586,z:-62.35307862372957},{x:33.33400448134675,z:-61.38262780949759},{x:33.30193734054247,z:-61.33939004814113},{x:32.585619029894794,z:-60.35814160005848},{x:32.555506146436514,z:-60.316464503059095},{x:31.849999470636426,z:-59.325028863819036},{x:31.821754973152178,z:-59.28494279369369},{x:31.126711123817138,z:-58.283930242596234},{x:31.100252317054853,z:-58.24546052661909},{x:30.41532241164628,z:-57.23548118751877},{x:30.390570053196587,z:-57.1986487653974},{x:29.715405150385102,z:-56.180312615334884},{x:29.692283665045057,z:-56.14513465243554},{x:29.026534777908367,z:-55.119051530617405},{x:29.004972418798012,z:-55.085541994829825},{x:28.348290525996926,z:-54.052321611711925},{x:28.328219490932344,z:-54.020491813177806},{x:27.680255546011434,z:-52.9807437594406},{x:27.661612056953487,z:-52.950602853242145},{x:27.029040220912698,z:-51.91641879425705},{x:26.37936377929279,z:-50.835821775960575},{x:25.7390401547445,z:-49.75280907658348},{x:25.107311474849915,z:-48.66740318270539},{x:24.483780081968323,z:-47.580218262043935},{x:23.868052364359535,z:-46.49186811440555},{x:23.2597387417453,z:-45.402966490730385},{x:22.658453648928695,z:-44.314127386421326},{x:22.062832436653533,z:-43.22416630933021},{x:22.016845155160887,z:-43.139354351904736},{x:21.818021346452312,z:-42.799748100424},{x:21.597363139385237,z:-42.47390570200395},{x:21.355819752320137,z:-42.1632288520146},{x:21.09443024662209,z:-41.869054007296164},{x:20.814319056869536,z:-41.592646637044226},{x:20.516691153808058,z:-41.33519577906661},{x:20.20282686085697,z:-41.09780892482969},{x:19.874076346466957,z:-40.88150725529733},{x:19.669566389758412,z:-40.756361739172405},{x:19.48063973616804,z:-40.634030798089405},{x:19.373694353217793,z:-40.561466306581394},{x:18.90076960911153,z:-40.22547516361829},{x:18.814353272992758,z:-40.16172244870729},{x:18.65807380416734,z:-40.04205066857062},{x:18.573994752202093,z:-39.97524569250367},{x:18.071616408084502,z:-39.56119792567561},{x:18.00328748780048,z:-39.50314662992853},{x:17.87964045017233,z:-39.39487504250674},{x:17.813076898735556,z:-39.334807681109915},{x:17.286667485882543,z:-38.845302988754774},{x:17.232124982984647,z:-38.79329148829718},{x:17.13334635762397,z:-38.696698554825616},{x:17.080127654275064,z:-38.643333300061066},{x:16.53399288761459,z:-38.08175955247382},{x:16.489980995209727,z:-38.0355294536103},{x:16.41020472323947,z:-37.94992704013694},{x:16.367186387962427,z:-37.9027710061227},{x:15.804705443068196,z:-37.272857313156585},{x:15.768796324738128,z:-37.23190082580792},{x:15.703650861592838,z:-37.15622347640335},{x:15.66849126998109,z:-37.1146217726773},{x:15.092332534262917,z:-36.42020603715802},{x:15.062720649563559,z:-36.38394419512932},{x:15.008954739759231,z:-36.31704525428162},{x:14.979912336477701,z:-36.28032572658409},{x:14.392217207560558,z:-35.52524280247799},{x:14.367554486401271,z:-35.49311040064595},{x:14.322739576816122,z:-35.43389886820554},{x:14.298512951181925,z:-35.401436402605064},{x:13.701037176590923,z:-34.58946975610714},{x:13.680309552605884,z:-34.560951489268014},{x:13.642617635468396,z:-34.50844680913129},{x:13.622226578524957,z:-34.47968692845888},{x:13.016444258708427,z:-33.614552128810786},{x:12.998881854192534,z:-33.58919429549552},{x:12.966924095908059,z:-33.54254083335757},{x:12.949623344791032,z:-33.51700376669733},{x:12.341224875194417,z:-32.608948279475385},{x:12.298599650277717,z:-32.54433198722033},{x:11.66447066360158,z:-31.560285601978848},{x:11.628217871711074,z:-31.50321408573924},{x:10.991340140240805,z:-30.47930635097025},{x:10.960025507264405,z:-30.4283108054977},{x:10.32094645449536,z:-29.367710939663116},{x:10.293783767520248,z:-29.322110317242498},{x:9.653063404101065,z:-28.22799394445435},{x:9.629426302364944,z:-28.18721121459891},{x:8.987633960970845,z:-27.062759283453172},{x:8.96701999231352,z:-27.02630621853269},{x:8.32473196373537,z:-25.874704049538725},{x:8.306735758608468,z:-25.842168211459736},{x:7.670959342948092,z:-24.678367194738883},{x:7.012667678293369,z:-23.451315166318413},{x:6.35805093761189,z:-22.210634126207896},{x:5.707142310005212,z:-20.958653487774452},{x:5.060349388652577,z:-19.698362101557837},{x:4.418116304938188,z:-18.432787306272434},{x:3.780918100219759,z:-17.164991073909658},{x:3.1492564533661462,z:-15.898067042313977},{x:2.5236565085197737,z:-14.635138355102612},{x:1.9046646226743922,z:-13.379356253365541},{x:1.2928469124013573,z:-12.13389938886945},{x:.7203377452477983,z:-10.966315789473683},{x:10.19198135177864,z:-10.966315789473683},{x:10.751998517039564,z:-12.096917051250117},{x:10.758864218169382,z:-12.110733313244884},{x:11.370403663509627,z:-13.337410841864036},{x:11.37900169679677,z:-13.354588582879924},{x:11.991718859918326,z:-14.573836806726888},{x:12.002138298818252,z:-14.594471320066022},{x:12.615252202258464,z:-15.802882640081538},{x:12.627614404185483,z:-15.827111545154118},{x:13.2402857836627,z:-17.021203778889383},{x:13.254748207641704,z:-17.04920958397976},{x:13.866071716739931,z:-18.22542048251609},{x:13.882833266916998,z:-18.25743441111867},{x:14.491826803826497,z:-19.412113897911066},{x:14.511135031256986,z:-19.44842110499892},{x:15.11672550194911,z:-20.577820967124985},{x:15.138886139943835,z:-20.618767328794625},{x:15.739890689326746,z:-21.719027988455665},{x:15.765280188311422,z:-21.76502870848921},{x:16.36038154796552,z:-22.83216259423869},{x:16.389463536865172,z:-22.883712933146438},{x:16.977177608460536,z:-23.913583860628417},{x:17.010524573443888,z:-23.9712723516785},{x:17.58915762359979,z:-24.959570225987513},{x:17.62747960872699,z:-25.024094786124728},{x:18.195071395695653,z:-25.96630488332537},{x:18.239254262495034,z:-26.038492227760802},{x:18.793501904128565,z:-26.92985836709508},{x:18.84465873893565,z:-27.01068703983121},{x:19.382813956448548,z:-27.846168252458618},{x:19.442354730554417,z:-27.936795282488003},{x:19.961083966727276,z:-28.711016377425214},{x:20.03081073871544,z:-28.812806849960683},{x:20.526003146603333,z:-29.520005080366452},{x:20.608241218318014,z:-29.634562364218315},{x:21.07474314245804,z:-30.26853619050123},{x:21.17252295020213,z:-30.39772739744221},{x:21.603768790277964,z:-30.951801021521813},{x:21.72107915189855,z:-31.0977659828037},{x:21.722245398562777,z:-31.099171602444486},{x:21.978252679283134,z:-31.388264078053943},{x:22.25232578287195,z:-31.660290034765858},{x:22.543329481882413,z:-31.91412272454017},{x:22.850058421312852,z:-32.14871075695384},{x:23.171242111260348,z:-32.36308245412384},{x:23.505550189367124,z:-32.55634987545602},{x:23.85159793126226,z:-32.72771249554895},{x:24.207951986174155,z:-32.87646052001881},{x:24.573136313956525,z:-33.00197782551082},{x:24.945638298936352,z:-33.10374451171965},{x:25.323915015259914,z:-33.18133905484801},{x:25.70639961778541,z:-33.2344400535839},{x:26.091507832050738,z:-33.262827560364315},{x:26.47764451643456,z:-33.26638399241145},{x:26.863210269329823,z:-33.24509461876769},{x:27.246608053962397,z:-33.19904762131212},{x:27.626249813414397,z:-33.12843372950588},{x:28.00056304845246,z:-33.03354543037907},{x:28.367997330915067,z:-32.91477575703177},{x:28.727030725680226,z:-32.77261666066702},{x:29.076176094613185,z:-32.60765697289905},{x:29.34014328887846,z:-32.472384747930874},{x:29.618416074390687,z:-32.32036660398909},{x:30.10507675239242,z:-32.037560008660996},{x:30.351764901039648,z:-31.886129929055404},{x:30.88808143894395,z:-31.538826226227854},{x:31.106598094673263,z:-31.390392923963347},{x:31.686214922523682,z:-30.977738064798558},{x:31.879854102603144,z:-30.833926436862512},{x:32.49673378248111,z:-30.356249256268242},{x:32.66854880239548,z:-30.218081915721207},{x:33.3171207623049,z:-29.676604074530452},{x:33.46986763861931,z:-29.544656361057655},{x:34.1450866256052,z:-28.94125238163463},{x:34.28120911290349,z:-28.815777241990105},{x:34.97855779964068,z:-28.15278530687022},{x:35.10019708045693,z:-28.03380996184931},{x:35.815657010425596,z:-27.313887744703415},{x:35.92467453698607,z:-27.2012863571057},{x:36.654681339084824,z:-26.427303971080875},{x:36.75268748234679,z:-26.32085103382355},{x:37.49408026617575,z:-25.49581319507704},{x:37.58246434459871,z:-25.39522199865895},{x:38.33243507649328,z:-24.522212480417142},{x:38.412394273451284,z:-24.427162329207338},{x:39.16844026210909,z:-23.509305049787756},{x:39.24100616934121,z:-23.41946015361816},{x:40.000887128531964,z:-22.45989247244805},{x:40.06694939925499,z:-22.374914768232106},{x:40.828649567471395,z:-21.37676962389664},{x:40.88897659422288,z:-21.296327224178278},{x:41.65067183611134,z:-20.262721604744655},{x:41.70592860142946,z:-20.18649412913978},{x:42.465958129297285,z:-19.12052203021377},{x:42.51672148944361,z:-19.0482037378013},{x:43.27356371761437,z:-17.95293226766863},{x:43.32033542060657,z:-17.88423365471669},{x:44.072587432524756,z:-16.76270132119022},{x:44.11580517305978,z:-16.69734966079681},{x:44.86216529846823,z:-15.552566150645486},{x:44.90221209299572,z:-15.490305313146978},{x:45.641465134616375,z:-14.32525227684608},{x:45.67867727123132,z:-14.265842069458017},{x:46.409681972307325,z:-13.083474570700693},{x:46.44435575878499,z:-13.026689761919535},{x:47.16603415607476,z:-11.829938157867083},{x:47.19843165881073,z:-11.77556729920114},{x:47.674867888063204,z:-10.966315789473683},{x:51.06315789473685,z:-10.966315789473683},{x:51.06315789473685,z:-21.599558752195865}],U6=[[[44.74099247211435,-61.96631578947368],[44.61315623605718,-61.82390789473684],[44.48532,-61.6815],[44.42086,-61.60851],[44.21043,-61.366305],[44,-61.1241],[43.870014999999995,-60.97448],[43.74003,-60.82486],[43.67911,-60.75363],[43.46765666666667,-60.50242],[43.25620333333333,-60.25121],[43.04475,-60],[43.01639643237487,-59.96631578947368],[43.01658963570951,-59.96631578947368],[43.00523,-59.95305],[42.818949999999994,-59.721507499999994],[42.63267,-59.489965],[42.446389999999994,-59.258422499999995],[42.26011,-59.02688],[42.07383,-58.7953375],[41.88755,-58.563795],[41.701269999999994,-58.332252499999996],[41.51499,-58.10071],[41.32996090909091,-57.85389818181818],[41.14493181818182,-57.60708636363636],[40.95990272727273,-57.360274545454544],[40.77487363636364,-57.113462727272726],[40.58984454545455,-56.86665090909091],[40.40481545454545,-56.61983909090909],[40.21978636363636,-56.37302727272727],[40.03475727272727,-56.12621545454545],[39.84972818181818,-55.879403636363634],[39.66469909090909,-55.632591818181815],[39.47967,-55.38578],[39.297312727272725,-55.12338272727273],[39.11495545454545,-54.86098545454545],[38.93259818181818,-54.59858818181818],[38.750240909090905,-54.33619090909091],[38.56788363636363,-54.07379363636363],[38.385526363636366,-53.81139636363636],[38.20316909090909,-53.548999090909085],[38.02081181818182,-53.286601818181815],[37.838454545454546,-53.024204545454545],[37.65609727272727,-52.76180727272727],[37.47374,-52.49941],[37.29803818181818,-52.22881636363636],[37.122336363636364,-51.95822272727273],[36.94663454545454,-51.68762909090909],[36.77093272727273,-51.417035454545456],[36.59523090909091,-51.14644181818182],[36.419529090909094,-50.87584818181818],[36.24382727272727,-50.60525454545454],[36.06812545454546,-50.33466090909091],[35.89242363636364,-50.06406727272727],[35.716721818181824,-49.793473636363636],[35.54102,-49.52288],[35.382968181818185,-49.265007272727274],[35.22491636363637,-49.00713454545455],[35.06686454545455,-48.749261818181814],[34.90881272727273,-48.49138909090909],[34.750760909090914,-48.23351636363636],[34.59270909090909,-47.975643636363635],[34.43465727272727,-47.71777090909091],[34.276605454545454,-47.45989818181818],[34.118553636363636,-47.20202545454545],[33.96050181818182,-46.94415272727272],[33.80245,-46.68628],[33.680456666666664,-46.44862],[33.558463333333336,-46.21096],[33.43647,-45.9733],[33.34724,-45.72150333333334],[33.25801,-45.46970666666667],[33.16878,-45.21791],[33.1139,-44.95646666666667],[33.05902,-44.69502333333333],[33.00414,-44.43358],[32.98459666666667,-44.16715333333333],[32.96505333333333,-43.90072666666667],[32.94551,-43.6343],[32.961643333333335,-43.367646666666666],[32.977776666666664,-43.100993333333335],[32.99391,-42.83434],[33.025985,-42.636455],[33.05806,-42.43857],[33.126983333333335,-42.18047333333333],[33.195906666666666,-41.922376666666665],[33.26483,-41.66428],[33.33567,-41.476744999999994],[33.40651,-41.28921],[33.52545666666666,-41.05001],[33.64440333333334,-40.81081],[33.76335,-40.57161],[33.91311,-40.35039666666667],[34.06287,-40.12918333333333],[34.21263,-39.90797],[34.39053666666666,-39.708686666666665],[34.568443333333335,-39.50940333333333],[34.74635,-39.31012],[34.894149999999996,-39.17469],[35.04195,-39.03926],[35.19847,-38.914],[35.35499,-38.78874],[35.593136666666666,-38.62105333333333],[35.83128333333333,-38.45336666666667],[36.06943,-38.28568],[36.30757666666667,-38.11799333333333],[36.545723333333335,-37.95030666666667],[36.78387,-37.78262],[36.99705,-37.618414],[37.21023,-37.454208],[37.42341,-37.290002],[37.63659,-37.125796],[37.84977,-36.96159],[38.059216,-36.787476],[38.268662,-36.613362],[38.478108,-36.439248],[38.687554,-36.265134],[38.897,-36.09102],[39.122265999999996,-35.889814],[39.347532,-35.688608],[39.572798,-35.487401999999996],[39.798064000000004,-35.286196],[40.02333,-35.08499],[40.224024,-34.893712],[40.424718,-34.702434],[40.625412000000004,-34.511156],[40.826106,-34.319877999999996],[41.0268,-34.1286],[41.224704,-33.929052],[41.422608000000004,-33.729504],[41.620512,-33.529956],[41.818416,-33.330408],[42.01632,-33.13086],[42.21154,-32.923519999999996],[42.40676,-32.71618],[42.601980000000005,-32.50884],[42.797200000000004,-32.301500000000004],[42.99242,-32.09416],[43.19872111111111,-31.85931888888889],[43.40502222222222,-31.62447777777778],[43.61132333333334,-31.389636666666668],[43.81762444444445,-31.154795555555555],[44.02392555555556,-30.919954444444446],[44.23022666666667,-30.685113333333334],[44.43652777777778,-30.45027222222222],[44.64282888888889,-30.215431111111112],[44.84913,-29.98059],[45.051467982456145,-29.73009729192084],[45.25380596491228,-29.47960458384168],[45.456143947368425,-29.22911187576252],[45.65848192982457,-28.97861916768336],[45.860819912280704,-28.7281264596042],[46.06315789473685,-28.47763375152504],[46.06315789473685,-28.496215000917363],[46.25963394736843,-28.24810750045868],[46.45611,-28],[46.588855,-27.832369999999997],[46.7216,-27.66474],[46.7684,-27.60455],[46.942316,-27.376646],[47.116232,-27.148742],[47.290148,-26.920838],[47.464064,-26.692933999999997],[47.63798,-26.46503],[47.68071,-26.40805],[47.831064999999995,-26.204025],[47.98142,-26],[48,-25.97478],[48.06315789473685,-25.889076136408065]],[[2.1939767954388096,-13.966315789473683],[2.21058,-14],[2.3128633333333335,-14.207513333333333],[2.4151466666666668,-14.415026666666668],[2.51743,-14.62254],[2.52111,-14.62999],[2.6450940000000003,-14.8803],[2.7690780000000004,-15.130609999999999],[2.893062,-15.38092],[3.017046,-15.631229999999999],[3.14103,-15.88154],[3.1459,-15.89133],[3.18327903943857,-15.966315789473683],[3.1838710272898685,-15.966315789473683],[3.3312868492139938,-16.25802897832817],[3.4787026711381195,-16.54974216718266],[3.6261184930622448,-16.84145535603715],[3.77353431498637,-17.13316854489164],[3.9209501369104953,-17.42488173374613],[4.068365958834621,-17.716594922600617],[4.215781780758746,-18.008308111455108],[4.363197602682872,-18.300021300309595],[4.510613424606997,-18.591734489164086],[4.658029246531123,-18.883447678018573],[4.805445068455247,-19.175160866873064],[4.952860890379373,-19.46687405572755],[5.100276712303499,-19.758587244582042],[5.247692534227624,-20.05030043343653],[5.395108356151749,-20.34201362229102],[5.542524178075874,-20.633726811145507],[5.68994,-20.92544],[5.841496153846154,-21.212606923076923],[5.993052307692308,-21.499773846153843],[6.1446084615384615,-21.786940769230768],[6.296164615384615,-22.07410769230769],[6.447720769230769,-22.361274615384612],[6.599276923076923,-22.648441538461537],[6.750833076923077,-22.93560846153846],[6.902389230769231,-23.222775384615385],[7.053945384615385,-23.509942307692306],[7.205501538461538,-23.79710923076923],[7.357057692307692,-24.084276153846155],[7.508613846153846,-24.371443076923075],[7.66017,-24.65861],[7.812966153846154,-24.93231923076923],[7.965762307692307,-25.206028461538462],[8.118558461538463,-25.479737692307694],[8.271354615384615,-25.753446923076922],[8.424150769230769,-26.027156153846153],[8.576946923076923,-26.300865384615385],[8.729743076923077,-26.574574615384616],[8.88253923076923,-26.848283846153848],[9.035335384615385,-27.12199307692308],[9.188131538461539,-27.395702307692307],[9.340927692307693,-27.66941153846154],[9.493723846153847,-27.94312076923077],[9.64652,-28.21683],[9.810834166666668,-28.489393333333336],[9.975148333333333,-28.76195666666667],[10.1394625,-29.03452],[10.303776666666668,-29.307083333333335],[10.468090833333333,-29.57964666666667],[10.632405,-29.85221],[10.796719166666668,-30.124773333333334],[10.961033333333333,-30.397336666666668],[11.1253475,-30.669900000000002],[11.289661666666667,-30.942463333333336],[11.453975833333333,-31.215026666666667],[11.61829,-31.48759],[11.785779999999999,-31.74286875],[11.95327,-31.9981475],[12.12076,-32.253426250000004],[12.28825,-32.508705],[12.455739999999999,-32.76398375],[12.62323,-33.0192625],[12.79072,-33.27454125],[12.95821,-33.52982],[13.12724875,-33.76581125],[13.2962875,-34.0018025],[13.46532625,-34.23779375],[13.634364999999999,-34.473785],[13.80340375,-34.70977625],[13.9724425,-34.9457675],[14.14148125,-35.18175875],[14.31052,-35.41775],[14.507,-35.663154285714285],[14.70348,-35.90855857142857],[14.89996,-36.15396285714286],[15.09644,-36.39936714285714],[15.292919999999999,-36.644771428571424],[15.4894,-36.89017571428571],[15.68588,-37.13558],[15.892344999999999,-37.366405],[16.09881,-37.597229999999996],[16.305274999999998,-37.828055],[16.51174,-38.05888],[16.70996,-38.262703333333334],[16.90818,-38.46652666666667],[17.1064,-38.67035],[17.2912775,-38.844097500000004],[17.476155,-39.017845],[17.6610325,-39.1915925],[17.84591,-39.36534],[18.09868,-39.5725975],[18.35145,-39.779855],[18.604219999999998,-39.9871125],[18.85699,-40.19437],[19.09409,-40.357345714285714],[19.33119,-40.52032142857143],[19.56829,-40.68329714285714],[19.80539,-40.84627285714286],[20.04249,-41.00924857142857],[20.27959,-41.172224285714286],[20.51669,-41.3352],[20.70927,-41.51315],[20.90185,-41.6911],[21.09443,-41.86905],[21.262073333333333,-42.07067],[21.429716666666664,-42.27229],[21.59736,-42.47391],[21.73719,-42.69572333333333],[21.87702,-42.91753666666666],[22.01685,-43.13935],[22.17048666666667,-43.417613333333335],[22.324123333333336,-43.69587666666667],[22.47776,-43.97414],[22.631396666666667,-44.25240333333333],[22.785033333333335,-44.53066666666667],[22.938670000000002,-44.808930000000004],[23.092306666666666,-45.08719333333333],[23.245943333333333,-45.36545666666667],[23.39958,-45.64372],[23.553216666666664,-45.92198333333333],[23.70685333333333,-46.200246666666665],[23.86049,-46.47851],[24.014992499999998,-46.747895],[24.169494999999998,-47.01728],[24.323997499999997,-47.286665],[24.4785,-47.55605],[24.6330025,-47.825435],[24.787505,-48.09482],[24.9420075,-48.364205],[25.09651,-48.63359],[25.2510125,-48.902975],[25.405515,-49.17236],[25.5600175,-49.441745],[25.71452,-49.71113],[25.8773575,-49.984375],[26.040195,-50.257619999999996],[26.2030325,-50.530865],[26.36587,-50.804109999999994],[26.5287075,-51.077355],[26.691544999999998,-51.3506],[26.8543825,-51.623844999999996],[27.01722,-51.89709],[27.1829075,-52.16539875],[27.348595,-52.4337075],[27.5142825,-52.70201625],[27.679969999999997,-52.970325],[27.845657499999998,-53.23863375],[28.011345,-53.5069425],[28.1770325,-53.77525125],[28.34272,-54.04356],[28.512805,-54.305638333333334],[28.68289,-54.56771666666667],[28.852975,-54.829795],[29.02306,-55.09187333333333],[29.193145,-55.35395166666667],[29.36323,-55.616029999999995],[29.533314999999998,-55.87810833333333],[29.7034,-56.140186666666665],[29.873485,-56.402265],[30.04357,-56.664343333333335],[30.213655,-56.92642166666666],[30.38374,-57.1885],[30.56252,-57.44917625],[30.7413,-57.7098525],[30.92008,-57.97052875],[31.098860000000002,-58.231205],[31.27764,-58.49188125],[31.45642,-58.7525575],[31.6352,-59.01323375],[31.81398,-59.27391],[31.980218169117165,-59.50471192982456],[32.14645633823433,-59.735513859649124],[32.312694507351495,-59.96631578947368],[32.30625481708105,-59.96631578947368],[32.33022,-60],[32.43872,-60.152505000000005],[32.54722,-60.30501],[32.5773,-60.34674],[32.756255,-60.591935],[32.93521,-60.83713],[33.114165,-61.082325],[33.29312,-61.32752],[33.32515,-61.37082],[33.473918258964744,-61.56931859649123],[33.622686517929495,-61.767817192982456],[33.77145477689424,-61.96631578947368]],[[45.86386508935013,-13.966315789473683],[45.84304,-14],[45.67868,-14.26584],[45.64147,-14.32525],[45.471445,-14.593205000000001],[45.30142,-14.86116],[45.131395,-15.129114999999999],[44.96137,-15.39707],[44.90221,-15.49031],[44.86217,-15.55257]],[[44.86217,-15.55257],[44.727290888513,-15.759442894736841],[44.59241177702599,-15.966315789473683],[44.588577078826155,-15.966315789473683],[44.40740035327956,-16.240303533834584],[44.22622362773297,-16.514291278195486],[44.04504690218638,-16.788279022556388],[43.86387017663978,-17.062266766917293],[43.682693451093186,-17.336254511278195],[43.501516725546594,-17.610242255639097],[43.32034,-17.88423],[43.149464,-18.131487999999997],[42.978588,-18.378746],[42.807712,-18.626004],[42.636836,-18.873262],[42.46596,-19.12052],[42.29074,-19.362276666666666],[42.115520000000004,-19.604033333333334],[41.9403,-19.84579],[41.76508,-20.087546666666668],[41.58986,-20.329303333333332],[41.41464,-20.57106],[41.239419999999996,-20.812816666666667],[41.0642,-21.054573333333334],[40.88898,-21.29633],[40.697808888888886,-21.54221666666667],[40.506637777777776,-21.788103333333336],[40.315466666666666,-22.03399],[40.124295555555555,-22.279876666666667],[39.93312444444444,-22.525763333333334],[39.74195333333333,-22.77165],[39.55078222222222,-23.017536666666665],[39.35961111111111,-23.263423333333332],[39.16844,-23.50931],[38.970192499999996,-23.74504875],[38.771944999999995,-23.980787499999998],[38.573697499999994,-24.216526249999998],[38.37545,-24.452264999999997],[38.1772025,-24.68800375],[37.978955,-24.9237425],[37.7807075,-25.15948125],[37.58246,-25.39522],[37.3750175,-25.626627499999998],[37.167575,-25.858035],[36.9601325,-26.0894425],[36.75269,-26.32085],[36.53092375,-26.5498425],[36.3091575,-26.778835],[36.08739125,-27.0078275],[35.865625,-27.23682],[35.64385875,-27.4658125],[35.422092500000005,-27.694805],[35.20032625,-27.9237975],[34.97856,-28.15279],[34.7701925,-28.349905],[34.561825,-28.54702],[34.353457500000005,-28.744135],[34.14509,-28.94125],[33.899,-29.154055],[33.652910000000006,-29.36686],[33.40682,-29.579665],[33.16073,-29.79247],[32.914640000000006,-30.005275],[32.66855,-30.21808],[32.422965000000005,-30.407995],[32.17738,-30.59791],[31.931795,-30.787825],[31.68621,-30.97774],[31.420166666666667,-31.16477],[31.15412333333333,-31.3518],[30.88808,-31.53883],[30.634148,-31.695138],[30.380216,-31.851446],[30.126284,-32.007754],[29.872352,-32.164062],[29.61842,-32.32037],[29.3955725,-32.433432499999995],[29.172725,-32.546495],[28.9498775,-32.659557500000005],[28.72703,-32.77262],[28.484873333333333,-32.85959666666667],[28.242716666666666,-32.94657333333333],[28.00056,-33.03355],[27.749243333333332,-33.08871666666666],[27.497926666666668,-33.143883333333335],[27.24661,-33.19905],[26.990286666666666,-33.221493333333335],[26.733963333333335,-33.24393666666666],[26.47764,-33.26638],[26.284575,-33.264605],[26.09151,-33.26283],[25.835646666666666,-33.23566666666667],[25.579783333333335,-33.20850333333333],[25.32392,-33.18134],[25.07366,-33.12155333333333],[24.8234,-33.06176666666667],[24.57314,-33.00198],[24.286569999999998,-32.89582],[24,-32.78966],[23.752775,-32.673005],[23.50555,-32.55635],[23.287053333333333,-32.42047],[23.068556666666666,-32.28459],[22.85006,-32.14871],[22.650816666666667,-31.985903333333333],[22.451573333333332,-31.823096666666668],[22.25233,-31.66029],[22.075636666666668,-31.47325],[21.89894333333333,-31.28621],[21.72225,-31.09917],[21.539006666666666,-30.865356666666667],[21.355763333333332,-30.631543333333333],[21.17252,-30.39773],[20.999457142857143,-30.156771428571428],[20.826394285714283,-29.915812857142857],[20.653331428571427,-29.674854285714286],[20.48026857142857,-29.433895714285715],[20.307205714285715,-29.192937142857144],[20.134142857142855,-28.951978571428572],[19.96108,-28.71102],[19.794282857142857,-28.456568571428573],[19.627485714285715,-28.202117142857144],[19.460688571428573,-27.947665714285716],[19.293891428571428,-27.693214285714287],[19.127094285714286,-27.43876285714286],[18.960297142857144,-27.18431142857143],[18.7935,-26.92986],[18.63141090909091,-26.660897272727276],[18.469321818181818,-26.391934545454546],[18.30723272727273,-26.12297181818182],[18.14514363636364,-25.85400909090909],[17.983054545454547,-25.585046363636366],[17.820965454545455,-25.316083636363636],[17.658876363636363,-25.04712090909091],[17.49678727272727,-24.77815818181818],[17.334698181818183,-24.509195454545456],[17.17260909090909,-24.240232727272726],[17.01052,-23.97127],[16.854550833333334,-23.691895000000002],[16.698581666666666,-23.41252],[16.5426125,-23.133145000000003],[16.386643333333332,-22.85377],[16.230674166666667,-22.574395000000003],[16.074705,-22.29502],[15.918735833333333,-22.015645],[15.762766666666666,-21.73627],[15.6067975,-21.456895000000003],[15.450828333333334,-21.17752],[15.294859166666667,-20.898145000000003],[15.13889,-20.61877],[14.992843846153846,-20.342033846153846],[14.846797692307693,-20.065297692307695],[14.700751538461539,-19.78856153846154],[14.554705384615385,-19.511825384615385],[14.408659230769231,-19.235089230769233],[14.262613076923078,-18.95835307692308],[14.116566923076922,-18.681616923076923],[13.970520769230768,-18.404880769230772],[13.824474615384615,-18.128144615384617],[13.678428461538461,-17.851408461538462],[13.532382307692307,-17.574672307692307],[13.386336153846154,-17.297936153846155],[13.24029,-17.0212],[13.107022648477319,-16.75747894736842],[12.973755296954637,-16.49375789473684],[12.840487945431956,-16.230036842105264],[12.707220593909275,-15.966315789473683],[12.699036604107874,-15.966315789473683],[12.62761,-15.82711],[12.61525,-15.80288],[12.47049,-15.51757],[12.32573,-15.23226],[12.217866666666668,-15.019663333333334],[12.110003333333333,-14.807066666666666],[12.00214,-14.59447],[12,-14.59024],[11.99172,-14.57384],[11.84753,-14.28692],[11.70334,-14],[11.686412563421538,-13.966315789473683]]],N6=[2.063157894736843,-59.96631578947368,46.06315789473685,-15.966315789473683],F6=[[[-89.51789473684212,261.92679328518574],[-89.69612,262],[-90,262.12481],[-90.2653375,262.233795],[-90.530675,262.34278],[-90.7960125,262.451765],[-91.06135,262.56075]],[[-91.06135,262.56075],[-91.13774,262.59127],[-91.32781736842105,262.66507581694736],[-91.51789473684212,262.7388816338948],[-91.51789473684212,262.7379580601293],[-91.7692157894737,262.83550844810344],[-92.02053684210527,262.9330588360776],[-92.27185789473685,263.0306092240517],[-92.52317894736842,263.12815961202585],[-92.7745,263.22571],[-93.03471333333334,263.31995666666666],[-93.29492666666667,263.4142033333333],[-93.55514,263.50845],[-93.81535333333333,263.60269666666665],[-94.07556666666666,263.6969433333333],[-94.33578,263.79119],[-94.633952,263.890646],[-94.932124,263.990102],[-95.230296,264.089558],[-95.528468,264.189014],[-95.82664,264.28847],[-96.084614,264.366616],[-96.342588,264.444762],[-96.600562,264.522908],[-96.858536,264.601054],[-97.11651,264.6792],[-97.385462,264.751474],[-97.654414,264.82374799999997],[-97.923366,264.896022],[-98.192318,264.968296],[-98.46127,265.04057],[-98.71899,265.099494],[-98.97671,265.158418],[-99.23443,265.21734200000003],[-99.49215,265.276266],[-99.74987,265.33519],[-100.0596525,265.3919625],[-100.36943500000001,265.448735],[-100.67921750000001,265.5055075],[-100.989,265.56228],[-101.28823,265.6017175],[-101.58746,265.641155],[-101.88669,265.6805925],[-102.18592,265.72003],[-102.47649,265.74131],[-102.76706,265.76259000000005],[-103.05763,265.78387000000004],[-103.3482,265.80515],[-103.63194250000001,265.80695000000003],[-103.915685,265.80875000000003],[-104.1994275,265.81055],[-104.48317,265.81235],[-104.76455141339403,265.7889396337386],[-105.04593282678806,265.7655292674773],[-105.32731424018208,265.7421189012159],[-105.6086956535761,265.71870853495454],[-105.7598837503316,265.7099053474079],[-105.91132248886994,265.7086227011416],[-106.06263800645644,265.7148637626746],[-106.2134567445568,265.7286131244542],[-106.53940770993894,265.7665144152862],[-106.86535867532108,265.8044157061182],[-107.19130964070322,265.8423169969502],[-107.51726060608537,265.88021828778227],[-107.8432115714675,265.91811957861427],[-108.16916253684965,265.95602086944626],[-108.4951135022318,265.99392216027826],[-108.82106446761394,266.03182345111026],[-109.14701543299608,266.06972474194225],[-109.47296639837823,266.1076260327743],[-109.79891736376038,266.1455273236063],[-110.12486832914252,266.1834286144383],[-110.45081929452466,266.2213299052703],[-110.77677025990681,266.2592311961023],[-111.10272122528895,266.2971324869343],[-111.4286721906711,266.33503377776634],[-111.75462315605324,266.37293506859834],[-112.08057412143538,266.41083635943033],[-112.40652508681752,266.44873765026233],[-112.73247605219967,266.4866389410943],[-113.0584270175818,266.5245402319263],[-113.38437798296395,266.5624415227584],[-113.7103289483461,266.6003428135904],[-114.03627991372825,266.63824410442237],[-114.36223087911038,266.67614539525437],[-114.68818184449253,266.71404668608636],[-115.01413280987468,266.75194797691836],[-115.34008377525682,266.7898492677504],[-115.66603474063896,266.8277505585824],[-115.99198570602111,266.8656518494144],[-116.31793667140325,266.9035531402464],[-116.6438876367854,266.9414544310784],[-116.96983860216754,266.97935572191045],[-117.29578956754968,267.01725701274245],[-117.62174053293182,267.05515830357444],[-117.94769149831397,267.09305959440644],[-118.27364246369612,267.13096088523844],[-118.59959342907825,267.16886217607043],[-118.9255443944604,267.20676346690243],[-119.25149535984255,267.2446647577345],[-119.57744632522468,267.2825660485665],[-119.90339729060683,267.3204673393985],[-120.10898217350298,267.3373455492561],[-120.31523785850966,267.3402799053781],[-120.52121968513796,267.329256968279],[-120.72598424718294,267.3043272235159],[-121.04866009363052,267.25390918122196],[-121.3713359400781,267.20349113892803],[-121.69401178652568,267.1530730966341],[-122.01668763297326,267.1026550543402],[-122.33936347942085,267.0522370120462],[-122.66203932586843,267.00181896975226],[-122.98471517231602,266.95140092745834],[-123.3073910187636,266.9009828851644],[-123.63006686521118,266.8505648428705],[-123.95274271165876,266.80014680057656],[-124.27541855810634,266.74972875828263],[-124.59809440455392,266.6993107159887],[-124.9207702510015,266.6488926736948],[-125.2434460974491,266.5984746314008],[-125.56612194389668,266.54805658910686],[-125.88879779034426,266.49763854681294],[-126.21147363679184,266.447220504519],[-126.53414948323942,266.3968024622251],[-126.856825329687,266.34638441993116],[-127.17950117613458,266.2959663776372],[-127.50217702258216,266.2455483353433],[-127.82485286902974,266.1951302930494],[-128.14752871547734,266.1447122507554],[-128.4702045619249,266.09429420846146],[-128.7928804083725,266.04387616616754],[-129.11555625482006,265.9934581238736],[-129.43823210126766,265.9430400815797],[-129.76090794771525,265.89262203928575],[-130.08358379416282,265.8422039969918],[-130.40625964061041,265.7917859546979],[-130.72893548705798,265.741367912404],[-131.05161133350558,265.69094987011],[-131.37428717995314,265.64053182781606],[-131.69696302640074,265.59011378552214],[-132.0196388728483,265.5396957432282],[-132.3423147192959,265.4892777009343],[-132.6649905657435,265.43885965864035],[-132.98766641219106,265.3884416163464],[-133.31034225863866,265.3380235740525],[-133.63301810508622,265.2876055317586],[-133.95569395153382,265.2371874894646],[-134.27836979798138,265.18676944717066],[-134.60104564442898,265.13635140487673],[-134.92372149087655,265.0859333625828],[-135.24639733732414,265.0355153202889],[-135.3165021363918,265.0269103299946],[-135.387020729875,265.0229282848632],[-135.45764859704025,265.0235863805766],[-135.528080745277,265.0288817752774],[-135.59801302714857,265.0387916018407],[-135.66714345379327,265.0532730666216],[-135.7351734990042,265.0722636342509],[-135.80180938835605,265.0956812976819],[-135.86676336781258,265.12342493232194],[-135.929754946336,265.15537473271894],[-135.99051210713256,265.1913927299178],[-136.04877248230383,265.2313233872526],[-136.10428448583102,265.27499427200064],[-136.1568084,265.3222168],[-136.3197889333333,265.47873119999997],[-136.48276946666667,265.6352456],[-136.64575,265.79176],[-136.89821,265.99894666666665],[-137.15067,266.20613333333336],[-137.40313,266.41332],[-137.66860333333332,266.6035566666667],[-137.93407666666667,266.7937933333333],[-138.19955,266.98403],[-138.47689333333332,267.15649333333334],[-138.75423666666666,267.32895666666667],[-139.03158,267.50142],[-139.26786249999998,267.626065],[-139.504145,267.75071],[-139.7404275,267.875355],[-139.97671,268],[-140.24718,268.12254666666666],[-140.51765,268.24509333333333],[-140.78812,268.36764],[-141.09377999999998,268.48268333333334],[-141.39944,268.59772666666663],[-141.7051,268.71277],[-142.01763,268.80757666666665],[-142.33015999999998,268.9023833333333],[-142.64269,268.99719],[-142.96075333333332,269.07135],[-143.27881666666667,269.14551],[-143.59688,269.21967],[-143.91911,269.27287333333334],[-144.24134,269.32607666666667],[-144.56357,269.37928],[-144.88859333333332,269.41129],[-145.21361666666667,269.44329999999997],[-145.53864,269.47531],[-145.86505666666665,269.48599666666667],[-146.19147333333333,269.4966833333333],[-146.51789,269.50737],[-146.84431,269.4966833333333],[-147.17073,269.48599666666667],[-147.49715,269.47531],[-147.82217333333332,269.44329999999997],[-148.14719666666667,269.41129],[-148.47222,269.37928],[-148.79444999999998,269.32607666666667],[-149.11668,269.27287333333334],[-149.43891,269.21967],[-149.75697333333332,269.14551],[-150.07503666666668,269.07135],[-150.3931,268.99719],[-150.70563,268.9023833333333],[-151.01816,268.80757666666665],[-151.33069,268.71277],[-151.63635,268.59772666666663],[-151.94201,268.48268333333334],[-152.24767,268.36764],[-152.54515333333333,268.2328533333333],[-152.84263666666666,268.0980666666667],[-153.14012,267.96328],[-153.42815,267.80932666666666],[-153.71618,267.65537333333333],[-154.00421,267.50142],[-154.28155333333333,267.32895666666667],[-154.55889666666667,267.15649333333334],[-154.83624,266.98403],[-155.10171333333332,266.7937933333333],[-155.36718666666667,266.6035566666667],[-155.63266,266.41332],[-155.88512,266.20613333333336],[-156.13757999999999,265.99894666666665],[-156.39004,265.79176],[-156.62840666666668,265.56850333333335],[-156.86677333333333,265.34524666666664],[-157.10514,265.12199],[-157.32840000000002,264.88362],[-157.55166,264.64525],[-157.77492,264.40688],[-157.98210666666668,264.15442],[-158.18929333333332,263.90196],[-158.39648,263.6495],[-158.58671333333334,263.38403],[-158.77694666666667,263.11856],[-158.96718,262.85309],[-159.13964333333334,262.5757433333333],[-159.31210666666666,262.2983966666667],[-159.48457,262.02105],[-159.63852666666665,261.73302],[-159.79248333333334,261.44499],[-159.94644,261.15696],[-160.07242,260.86772],[-160.1984,260.57848],[-160.32438,260.28924],[-160.45036,260],[-160.53221666666667,259.78251],[-160.61407333333332,259.56502],[-160.69593,259.34753],[-160.79073666666667,259.035],[-160.88554333333332,258.72247],[-160.98035,258.40994],[-161.05451,258.0918766666667],[-161.12867,257.77381333333335],[-161.20283,257.45575],[-161.25603,257.13352000000003],[-161.30922999999999,256.81129],[-161.36243,256.48906],[-161.39444333333333,256.1640366666667],[-161.42645666666667,255.83901333333333],[-161.45847,255.51399],[-161.46915666666666,255.18757333333335],[-161.47984333333335,254.86115666666666],[-161.49053,254.53474],[-161.47984333333335,254.20832],[-161.46915666666666,253.8819],[-161.45847,253.55548],[-161.42645666666667,253.23046],[-161.39444333333333,252.90544],[-161.36243,252.58042],[-161.31452,252.29021],[-161.26661,252],[-161.23471999999998,251.80686],[-161.20283,251.61372],[-161.12867,251.29565666666667],[-161.05451,250.97759333333332],[-160.98035,250.65953],[-160.88554333333332,250.34699999999998],[-160.79073666666667,250.03447],[-160.69593,249.72194],[-160.58088666666666,249.41628],[-160.46584333333334,249.11061999999998],[-160.3508,248.80496],[-160.21601333333334,248.50747666666666],[-160.08122666666665,248.20999333333333],[-159.94644,247.91251],[-159.79248333333334,247.62448],[-159.63852666666665,247.33644999999999],[-159.48457,247.04842],[-159.31645749999998,246.786315],[-159.148345,246.52420999999998],[-158.9802325,246.262105],[-158.81212,246],[-158.67357333333334,245.80666],[-158.53502666666665,245.61332000000002],[-158.39648,245.41998],[-158.18929333333332,245.16751666666667],[-157.98210666666668,244.91505333333333],[-157.77492,244.66259],[-157.55166,244.42422333333332],[-157.32840000000002,244.18585666666667],[-157.10514,243.94749],[-156.86677333333333,243.72423333333333],[-156.62840666666668,243.50097666666665],[-156.39004,243.27772],[-156.13757999999999,243.07053],[-155.88512,242.86334],[-155.63266,242.65615],[-155.3992025,242.4921125],[-155.165745,242.328075],[-154.93228749999997,242.1640375],[-154.69883,242],[-154.46729,241.85602],[-154.23575,241.71204],[-154.00421,241.56806],[-153.71618,241.41410333333334],[-153.42815,241.26014666666666],[-153.14012,241.10619],[-152.84263666666666,240.97140333333334],[-152.54515333333333,240.83661666666666],[-152.24767,240.70183],[-151.94201,240.58678666666665],[-151.63635,240.47174333333334],[-151.33069,240.3567],[-151.01816,240.26189666666667],[-150.70563,240.16709333333333],[-150.3931,240.07229],[-150.07503666666668,239.99812666666668],[-149.75697333333332,239.92396333333332],[-149.43891,239.8498],[-149.11668,239.79659999999998],[-148.79444999999998,239.7434],[-148.47222,239.6902],[-148.14719666666667,239.65818666666667],[-147.82217333333332,239.62617333333333],[-147.49715,239.59416],[-147.17073,239.58347666666666],[-146.84431,239.57279333333332],[-146.51789,239.56211],[-146.19147333333333,239.57279333333332],[-145.86505666666665,239.58347666666666],[-145.53864,239.59416],[-145.21361666666667,239.62617333333333],[-144.88859333333332,239.65818666666667],[-144.56357,239.6902],[-144.281785,239.73672],[-144,239.78324],[-143.79844,239.81652],[-143.59688,239.8498],[-143.27881666666667,239.92396333333332],[-142.96075333333332,239.99812666666668],[-142.64269,240.07229],[-142.33015999999998,240.16709333333333],[-142.01763,240.26189666666667],[-141.7051,240.3567],[-141.39944,240.47174333333334],[-141.09377999999998,240.58678666666665],[-140.78812,240.70183],[-140.49063666666666,240.83661666666666],[-140.19315333333333,240.97140333333334],[-139.89567,241.10619],[-139.60764,241.26014666666666],[-139.31960999999998,241.41410333333334],[-139.03158,241.56806],[-138.80004,241.71204],[-138.5685,241.85602],[-138.33696,242],[-138.1035025,242.1640375],[-137.870045,242.328075],[-137.63658750000002,242.4921125],[-137.40313,242.65615],[-137.15067,242.86334],[-136.89821,243.07053],[-136.64575,243.27772],[-136.40738333333334,243.50097666666665],[-136.16901666666666,243.72423333333333],[-135.93065,243.94749],[-135.70739,244.18585666666667],[-135.48413000000002,244.42422333333332],[-135.26087,244.66259],[-135.05368333333334,244.91505333333333],[-134.84649666666667,245.16751666666667],[-134.63931,245.41998],[-134.50076333333334,245.61332000000002],[-134.36221666666665,245.80666],[-134.22367,246],[-134.0555575,246.262105],[-133.887445,246.52420999999998],[-133.7193325,246.786315],[-133.55122,247.04842],[-133.39726333333334,247.33644999999999],[-133.24330666666665,247.62448],[-133.08935,247.91251],[-132.95456333333334,248.20999333333333],[-132.81977666666666,248.50747666666666],[-132.68499,248.80496],[-132.606422,249.02275333333333],[-132.527854,249.24054666666666],[-132.449286,249.45834],[-132.4103634868777,249.55599376150673],[-132.36507324483787,249.6508621605664],[-132.3136132430059,249.742530515933],[-132.25620841927355,249.8305981341387],[-132.193109697068,249.9146800609732],[-132.1245928885354,249.99440876416517],[-132.05095748893237,250.0694357399104],[-131.9725253674963,250.13943303622392],[-131.88963936051573,250.20409468645795],[-131.8026617727516,250.2631380467189],[-131.52826393220082,250.43644176325236],[-131.25386609165002,250.60974547978583],[-130.97946825109926,250.78304919631927],[-130.70507041054847,250.95635291285274],[-130.43067256999768,251.1296566293862],[-130.15627472944692,251.30296034591967],[-129.88187688889613,251.47626406245314],[-129.60747904834534,251.64956777898658],[-129.33308120779455,251.82287149552005],[-129.05868336724376,251.99617521205352],[-128.784285526693,252.16947892858698],[-128.5098876861422,252.34278264512045],[-128.23548984559142,252.51608636165392],[-127.96109200504064,252.68939007818736],[-127.68669416448986,252.86269379472083],[-127.41229632393907,253.0359975112543],[-127.24289684498733,253.13549803421137],[-127.06743923765023,253.22387883283525],[-126.88665243998277,253.30077272938757],[-126.7012875301437,253.36586026842696],[-126.51211460604377,253.41887104398566],[-126.31991958597654,253.45958482297027],[-126.12550094352333,253.48783246011936],[-125.92966639029741,253.5034966007169],[-125.60308500203215,253.51904819233795],[-125.27650361376686,253.534599783959],[-124.94992222550158,253.55015137558007],[-124.62334083723631,253.56570296720113],[-124.29675944897103,253.5812545588222],[-123.97017806070576,253.59680615044326],[-123.64359667244048,253.61235774206432],[-123.3170152841752,253.6279093336854],[-122.99043389590993,253.64346092530647],[-122.66385250764465,253.65901251692753],[-122.33727111937938,253.6745641085486],[-122.0106897311141,253.69011570016966],[-121.68410834284882,253.70566729179072],[-121.35752695458355,253.72121888341178],[-121.03094556631827,253.73677047503284],[-120.704364178053,253.7523220666539],[-120.37778278978772,253.76787365827497],[-120.05120140152243,253.78342524989603],[-119.72462001325717,253.7989768415171],[-119.39803862499188,253.81452843313815],[-119.07145723672662,253.8300800247592],[-118.74487584846133,253.84563161638027],[-118.41829446019607,253.86118320800134],[-118.09171307193078,253.87673479962243],[-117.7651316836655,253.8922863912435],[-117.43855029540023,253.90783798286455],[-117.11196890713495,253.9233895744856],[-116.78538751886968,253.93894116610667],[-116.4588061306044,253.95449275772773],[-116.13222474233913,253.9700443493488],[-115.80564335407385,253.98559594096986],[-115.75813843940867,253.98620764018503],[-115.7107055019782,253.9835229539849],[-115.66357300375029,253.97755481322986],[-115.6169679596196,253.96833196362397],[-115.57111484398453,253.95589882726046],[-115.52623450956047,253.94031528866168],[-115.48254312363694,253.9216564063436],[-115.4402511269024,253.90001205129477],[-115.39956221985105,253.87548647411003],[-115.36067238165431,253.84819780286523],[-115.32376892622199,253.81827747414997],[-115.28902959999999,253.7858696],[-115.23063039999998,253.7274704],[-115.19821324951084,253.6927253696485],[-115.16827957005412,253.65581922362725],[-115.14097303299332,253.6169290987405],[-115.11642470031218,253.5762416542086],[-115.0947523955624,253.5339521757678],[-115.07606013835095,253.4902636383661],[-115.06043764508189,253.44538573195305],[-115.0479598983484,253.39953385504037],[-115.03868678704211,253.3529280808631],[-115.03266281890717,253.3057921011038],[-115.0299169069182,253.2583521522494],[-115.03046223050812,253.2108359297339],[-115.04429191186411,252.91120365405763],[-115.05812159322008,252.61157137838134],[-115.07195127457607,252.31193910270508],[-115.08578095593205,252.0123068270288],[-115.09961063728804,251.71267455135253],[-115.11344031864401,251.41304227567625],[-115.12727,251.11341],[-115.12929285714286,250.79214428571427],[-115.1313157142857,250.47087857142856],[-115.13333857142857,250.14961285714284],[-115.13536142857143,249.82834714285715],[-115.13738428571429,249.50708142857144],[-115.13940714285714,249.18581571428572],[-115.14143,248.86455],[-115.13474657142856,248.539352],[-115.12806314285714,248.214154],[-115.12137971428571,247.888956],[-115.11469628571429,247.563758],[-115.10801285714285,247.23856],[-115.10132942857143,246.913362],[-115.094646,246.588164],[-115.08796257142858,246.262966],[-115.08127914285714,245.937768],[-115.07459571428572,245.61257],[-115.06791228571429,245.287372],[-115.06122885714285,244.962174],[-115.05454542857143,244.636976],[-115.047862,244.311778],[-115.04117857142857,243.98658],[-115.03449514285714,243.661382],[-115.02781171428572,243.336184],[-115.02112828571428,243.010986],[-115.01444485714286,242.685788],[-115.00776142857143,242.36059],[-115.001078,242.035392],[-114.99439457142857,241.710194],[-114.98771114285715,241.384996],[-114.98102771428572,241.059798],[-114.97434428571428,240.7346],[-114.96766085714286,240.409402],[-114.96097742857143,240.084204],[-114.954294,239.759006],[-114.94761057142857,239.433808],[-114.94092714285715,239.10861],[-114.93424371428571,238.783412],[-114.92756028571429,238.458214],[-114.92087685714286,238.133016],[-114.91419342857144,237.807818],[-114.90751,237.48262],[-114.90819666666667,237.1714088888889],[-114.90888333333334,236.86019777777778],[-114.90957,236.54898666666668],[-114.91025666666667,236.23777555555557],[-114.91094333333334,235.92656444444444],[-114.91163,235.61535333333333],[-114.91231666666667,235.30414222222223],[-114.91300333333334,234.99293111111112],[-114.91369,234.68172],[-114.92180935995289,234.36272129554658],[-114.92992871990579,234.04372259109314],[-114.93804807985867,233.72472388663968],[-114.94616743981157,233.40572518218625],[-114.95428679976446,233.0867264777328],[-114.96240615971735,232.76772777327938],[-114.97052551967025,232.4487290688259],[-114.97864487962313,232.12973036437248],[-114.98676423957602,231.81073165991904],[-114.99488359952892,231.4917329554656],[-115.0030029594818,231.17273425101214],[-115.0111223194347,230.8537355465587],[-115.01924167938759,230.53473684210527],[-115.02018956531994,230.53473684210527],[-115.02701,230.22953],[-115.0279,230.17275],[-115.02945,230],[-115.031836,229.734292],[-115.034222,229.468584],[-115.036608,229.202876],[-115.038994,228.93716799999999],[-115.04138,228.67146],[-115.04151,228.61504],[-115.04116530642423,228.53473684210527]],[[-106.54108913164481,228.53473684210527],[-106.54147,228.62332],[-106.538998,228.89865600000002],[-106.53652600000001,229.173992],[-106.534054,229.449328],[-106.531582,229.724664],[-106.52911,230],[-106.5285,230.06802],[-106.5232848001929,230.30137842105262],[-106.51806960038581,230.53473684210527],[-106.5005851642672,230.53473684210527],[-106.49397399778512,230.84381708502025],[-106.48736283130302,231.15289732793522],[-106.48075166482093,231.46197757085022],[-106.47414049833884,231.7710578137652],[-106.46752933185674,232.08013805668017],[-106.46091816537465,232.38921829959514],[-106.45430699889256,232.69829854251014],[-106.44769583241047,233.00737878542512],[-106.44108466592837,233.3164590283401],[-106.43447349944628,233.62553927125506],[-106.4278623329642,233.93461951417007],[-106.4212511664821,234.24369975708504],[-106.41464,234.55278],[-106.41385666666667,234.88272111111112],[-106.41307333333334,235.21266222222224],[-106.41229,235.54260333333335],[-106.41150666666667,235.87254444444446],[-106.41072333333334,236.20248555555557],[-106.40994,236.53242666666668],[-106.40915666666666,236.8623677777778],[-106.40837333333333,237.1923088888889],[-106.40759,237.52225],[-106.41202111111112,237.83847888888891],[-106.41645222222222,238.1547077777778],[-106.42088333333334,238.4709366666667],[-106.42531444444444,238.78716555555556],[-106.42974555555556,239.10339444444446],[-106.43417666666666,239.41962333333333],[-106.43860777777778,239.73585222222223],[-106.44303888888888,240.0520811111111],[-106.44747,240.36831],[-106.45536130434782,240.69215086956524],[-106.46325260869565,241.01599173913044],[-106.47114391304348,241.33983260869567],[-106.4790352173913,241.66367347826088],[-106.48692652173912,241.9875143478261],[-106.49481782608696,242.3113552173913],[-106.50270913043478,242.63519608695654],[-106.5106004347826,242.95903695652174],[-106.51849173913043,243.28287782608697],[-106.52638304347826,243.60671869565218],[-106.53427434782608,243.9305595652174],[-106.5421656521739,244.2544004347826],[-106.55005695652173,244.57824130434784],[-106.55794826086957,244.90208217391304],[-106.56583956521739,245.22592304347828],[-106.57373086956521,245.54976391304348],[-106.58162217391303,245.8736047826087],[-106.58951347826087,246.1974456521739],[-106.59740478260869,246.52128652173914],[-106.60529608695651,246.84512739130435],[-106.61318739130434,247.16896826086958],[-106.62107869565217,247.49280913043478],[-106.62897,247.81665],[-106.63090285714286,248.11739285714287],[-106.6328357142857,248.4181357142857],[-106.63476857142857,248.71887857142858],[-106.63670142857143,249.01962142857144],[-106.63863428571429,249.3203642857143],[-106.64056714285714,249.62110714285714],[-106.6425,249.92185],[-106.6353502,250.21462920000002],[-106.6282004,250.50740840000003],[-106.6210506,250.80018760000002],[-106.61390080000001,251.09296680000003],[-106.60390549409465,251.2704832165256],[-106.58263688201085,251.44700412298218],[-106.55018113522469,251.6218143308557],[-106.50666975077972,251.79420558266364],[-106.4522790185161,251.96347942151672],[-106.38722930681833,252.12895002097252],[-106.3117841697752,252.28994696371606],[-106.22624927936933,252.44581795780888],[-106.1309711870229,252.59593147950181],[-106.02633591951684,252.73967933190372],[-105.82712950340854,252.99580179634478],[-105.62792308730026,253.25192426078584],[-105.42871667119196,253.5080467252269],[-105.22951025508368,253.76416918966797],[-105.03030383897539,254.02029165410903],[-104.8310974228671,254.2764141185501],[-104.6318910067588,254.53253658299116],[-104.43268459065052,254.78865904743225],[-104.23347817454223,255.0447815118733],[-104.03427175843393,255.30090397631437],[-103.83506534232565,255.55702644075544],[-103.63585892621735,255.8131489051965],[-103.43665251010907,256.06927136963753],[-103.23744609400077,256.3253938340786],[-103.03823967789249,256.58151629851966],[-102.8390332617842,256.83763876296075],[-102.80603176906754,256.8772384988429],[-102.77043667631065,256.9145242464563],[-102.73240981890827,256.94932648373447],[-102.6921240884306,256.9814869800513],[-102.64976264656066,257.01085951562726],[-102.60551809233768,257.0373105463269],[-102.55959158649321,257.0607198108259],[-102.5121919368608,257.0809808773869],[-102.46353464901765,257.09800162775844],[-102.41384094647448,257.1117046759965],[-102.36333676486866,257.12202772030486],[-102.31225172473309,257.1289238262937],[-102.26081808751155,257.1323616403706],[-102.20926969956712,257.13232553229125],[-102.15784092898441,257.1288156662232],[-102.1067656,257.121848],[-101.8196228,257.072764],[-101.53248,257.02368],[-101.21311,256.9514566666667],[-100.89374000000001,256.87923333333333],[-100.57437,256.80701],[-100.3090375,256.73618999999997],[-100.043705,256.66537],[-99.7783725,256.59455],[-99.51304,256.52373],[-99.2222225,256.435635],[-98.93140500000001,256.34754],[-98.64058750000001,256.259445],[-98.34977,256.17135],[-98.05754111111112,256.06921444444447],[-97.76531222222224,255.9670788888889],[-97.47308333333334,255.86494333333334],[-97.18085444444445,255.7628077777778],[-96.88862555555556,255.66067222222222],[-96.59639666666668,255.55853666666667],[-96.30416777777778,255.45640111111112],[-96.01193888888889,255.35426555555554],[-95.71971,255.25213],[-95.426326,255.13821],[-95.132942,255.02429],[-94.83955800000001,254.91037],[-94.54617400000001,254.79645000000002],[-94.25279,254.68253],[-93.99129666666667,254.575125],[-93.72980333333334,254.46772],[-93.46831,254.360315],[-93.20681666666667,254.25290999999999],[-92.94532333333333,254.14550499999999],[-92.68383,254.0381],[-92.39234618421054,253.9117433551142],[-92.10086236842106,253.78538671022838],[-91.80937855263159,253.65903006534256],[-91.51789473684212,253.53267342045677],[-91.51789473684212,253.53582601396832],[-91.25020236842107,253.42050800698416],[-90.98251,253.30519],[-90.73688250000001,253.1994275],[-90.491255,253.093665],[-90.2456275,252.9879025],[-90,252.88214],[-89.75894736842106,252.7783467216434],[-89.51789473684212,252.6745534432868]]],z6=[-168.51789473684212,230.53473684210527,-91.51789473684212,278.5347368421053];var vo=60.96/67,$u=4.25,fi=(i,t,e)=>Math.max(t,Math.min(e,i)),ir=(i,t,e)=>i+(t-i)*e,M3=i=>Math.atan2(Math.sin(i),Math.cos(i)),k6=(i,t)=>({x:(i-693)*vo,z:(t-339)*vo}),S3=i=>({x:i.x/vo+693,y:i.z/vo+339}),Ml=60.96/114,me=(i,t)=>({x:(i-717)*Ml,z:(t-310)*Ml}),pi={...me(443,786),r:28*Ml},Sl=(i,t,e,n,s=40)=>Array.from({length:s},(r,a)=>{let o=a/s,c=1-o;return{x:c*c*c*i.x+3*c*c*o*t.x+3*c*o*o*e.x+o*o*o*n.x,z:c*c*c*i.z+3*c*c*o*t.z+3*c*o*o*e.z+o*o*o*n.z}}),ze=(i,t,e,n,s)=>Sl(me(...i),me(...t),me(...e),me(...n),s),Ku=[...ze([717,310],[668,405],[594,529],[544,614],100),...ze([544,614],[522,654],[508,699],[510,746],50)],Qu=[...ze([550,791],[620,761],[739,700],[816,657],70),...ze([816,657],[865,630],[883,610],[883,554],45),...ze([883,554],[886,508],[855,467],[850,420],45),...ze([850,420],[845,374],[845,344],[825,308],40),...ze([825,308],[810,277],[785,237],[762,239],40),...ze([762,239],[749,240],[730,285],[717,310],40)],Rn=[...Ku,...ze([510,746],[511,788],[500,813],[550,791],45),...Qu],sr=[...ze([762,239],[779,207],[799,174],[834,161],48),...ze([834,161],[851,155],[865,150],[878,148],24),me(878,148)],ju=qu,_o=ju.reduce((i,t)=>[Math.min(i[0],t.x),Math.min(i[1],t.z),Math.max(i[2],t.x),Math.max(i[3],t.z)],[1/0,1/0,-1/0,-1/0]);function b3(i,t,e){let n=Math.hypot(Math.max(_o[0]-i,0,i-_o[2]),Math.max(_o[1]-t,0,t-_o[3]));return n>0&&n>=e?1/0:El(i,t,ju)}var H6=[{name:"Blue roof",...me(784,129),roof:4940919,wall:13880768,width:17,depth:13,rotation:.85,drive:me(808,164)},{name:"Gray roof",...me(753,176),roof:8488577,wall:13157557,width:16,depth:12,rotation:.85,drive:me(783,202)},{name:"Brown roof",...me(715,217),roof:7956051,wall:13811364,width:18,depth:13,rotation:.85,drive:me(745,238)}];function T3(i,t){return wl(sr,!1).distance(i,t)-$u}var G6=[me(512,797),me(463,787)],E3=[[461,772],[480,784],[501,785],[512,774],[526,792],[535,805],[492,810],[460,805]].map(i=>me(...i)),Yu=10.8,td=.65,ed=5.64,Tl=i=>({x:pi.x+Yu*Math.cos(i),z:pi.z+Yu*Math.sin(i)}),vl=Tl(td),yl=Tl(ed),w3=[...Ku,...ze([510,746],[511,763],[513,779],[503,791],28),...Sl(me(503,791),me(490,807),{x:vl.x+5,z:vl.z-4},vl,28),...Array.from({length:110},(i,t)=>Tl(ir(td,ed,t/110))),...Sl(yl,{x:yl.x+5,z:yl.z+6},me(493,812),me(526,800),32),...ze([526,800],[534,797],[542,794.5],[550,791],20),...Qu];function nd(i){let t=0;return i.map((e,n)=>(n&&(t+=Math.hypot(e.x-i[n-1].x,e.z-i[n-1].z)),{...e,s:t}))}var De=nd(w3),ss=De.at(-1).s+Math.hypot(De.at(-1).x-De[0].x,De.at(-1).z-De[0].z),A3=[...sr].reverse().concat(ze([762,239],[749,261],[730,288],[717,310],45)),di=nd(A3),Zu=di.at(-1).s+Math.hypot(di.at(-1).x-De[0].x,di.at(-1).z-De[0].z);function C3(i){let t=sr[58],e=sr[56],n=sr[60],s=Math.hypot(n.x-e.x,n.z-e.z),r=(n.x-e.x)/s,a=(n.z-e.z)/s,o=(i.x-t.x)*r+(i.z-t.z)*a,c=Math.abs(o)<18?Math.pow(Math.cos(o/18*Math.PI/2),2):0;return{x:i.x-a*2.5*c,z:i.z+r*2.5*c}}function rs(i){if(i<0){let o=Math.max(0,i+Zu),c=0;for(;c<di.length-1&&di[c+1].s<o;)c++;let l=di[c],h=di[c+1]??{...De[0],s:Zu},d=(o-l.s)/Math.max(.001,h.s-l.s);return C3({x:ir(l.x,h.x,d),z:ir(l.z,h.z,d)})}i=(i%ss+ss)%ss;let t=0,e=De.length-1;for(;t<e;){let o=t+e+1>>1;De[o].s<=i?t=o:e=o-1}let n=De[t],s=De[(t+1)%De.length],r=t===De.length-1?ss:s.s,a=(i-n.s)/(r-n.s);return{x:ir(n.x,s.x,a),z:ir(n.z,s.z,a)}}function yo(i){let t=rs(i-.7),e=rs(i+.7);return Math.atan2(e.z-t.z,e.x-t.x)}function W6(i){return M3(yo(i+2)-yo(i-2))/4}function id(i,t){let e=S3({x:i,z:t});return-4.8*fi((e.x-690)/60,0,1)*Math.exp(-(((e.y-402)/102)**2))}function R3(i,t){let e=id(i,t),s=i>-150&&i<105&&t>0&&t<270&&El(i,t,Rn)<0?2.6*Math.exp(-(((i-3)/57)**2+((t-112)/88)**2))*fi((bl(i,t)-1)/15,0,1):0;if(i<-95||i>160||t<-185||t>45)return e+s;let r=fi(Math.min(i+95,160-i,t+185,45-t)/24,0,1),a=Math.max(0,bl(i,t)-.45),o=fi(a/16,0,1),c=o*o*(3-2*o);return e+s+r*c*(1.85+.22*Math.sin(i*.055+t*.035))}function I3(i,t){return wl(Rn).distance(i,t)}function El(i,t,e){let n=wl(e),s=n.distance(i,t);return n.contains(i,t)?-s:s}var Ju=new WeakMap;function wl(i,t=!0){let e=Ju.get(i);return e||(e=new xo(i,t),Ju.set(i,e)),e}function bl(i,t){let e=Math.min(I3(i,t)-$u,T3(i,t),El(i,t,E3),Math.hypot(i-pi.x,t-pi.z)-pi.r);return Math.min(e,b3(i,t,e))}var X6=De.find(i=>Math.hypot(i.x-pi.x,i.z-pi.z)<15)?.s??260,q6=[[782,264],[766,287],[754,334],[750,396],[750,465],[741,525],[720,568],[687,585],[648,598],[618,631],[607,673],[610,727],[630,750]].map(i=>me(...i)),Y6={DOG:{ollie:!1,grip:1,control:.8,shirt:2566187,pants:2107181,hair:3483938},SALLY:{ollie:!0,grip:1.12,control:1.12,shirt:2106928,pants:7959647,hair:4469798},BLACK:{ollie:!0,grip:1.08,control:1,shirt:3554113,pants:7110280,hair:10191966},BOSS:{ollie:!1,grip:.95,control:.92,shirt:13749695,pants:3290945,hair:3943715}},Z6={LONGBOARD:{label:"Luxury Longboard",ollie:!1,grip:4.6,steer:.62,length:1.05},CRUISER:{label:"Bowl Cruiser",ollie:!0,grip:3.8,steer:.95,length:.8},HANDMEDOWN:{label:"Hand-Me-Down Pintail",ollie:!1,grip:3.9,steer:.64,length:.98},STREET:{label:"Element Street Deck",ollie:!0,grip:3.5,steer:.9,length:.79}};function J6(i,t){return bl(i,t)<3.2?id(i,t)-.48:R3(i,t)-.035}var Mo=Object.freeze({LONGBOARD:Object.freeze({cornerGrip:1.035,response:.984,turn:.992,rolling:.6944444444444444,bump:.72,recovery:1,fastLoad:0,ollieImpulse:0,slideGrip:1}),HANDMEDOWN:Object.freeze({cornerGrip:1,response:1.016,turn:1.012,rolling:.925925925925926,bump:.93,recovery:1,fastLoad:.04,ollieImpulse:0,slideGrip:.6}),CRUISER:Object.freeze({cornerGrip:1.08,response:1.064,turn:1.02,rolling:1.1574074074074074,bump:1.02,recovery:1.08,fastLoad:.07,ollieImpulse:2.15,slideGrip:1}),STREET:Object.freeze({cornerGrip:1.03,response:1.112,turn:1.008,rolling:1.3888888888888888,bump:1.18,recovery:.96,fastLoad:.12,ollieImpulse:2.75,slideGrip:1})}),P3=Object.freeze({minimumSpeed:5,minimumInput:.7,holdSpeed:3.8,holdInput:.48,holdSeconds:.14,maximumAmount:.7,engageRate:4,releaseRate:4.5,controlledSlipAllowance:1.4});function K6(i,t,e,n,s,r){let a=P3,o=Math.sign(e),c=t.slideGrip<1&&!i.dirt&&i.height<=0,l=o===(i.slideSign??o);l||(i.slideActive=!1,i.slideHold=0),(!c||n<a.holdSpeed||Math.abs(e)<a.holdInput)&&(i.slideActive=!1);let h=c&&n>=a.minimumSpeed&&Math.abs(e)>=a.minimumInput;i.slideHold=h&&l?(i.slideHold??0)+r:0,i.slideHold>=a.holdSeconds&&(i.slideActive=!0),i.slideSign=o;let d=i.slideActive?a.maximumAmount:0;return i.slide=(i.slide??0)+(d-(i.slide??0))*(1-Math.exp(-r*(d?a.engageRate:a.releaseRate))),1-i.slide*(1-t.slideGrip)}var L3=Object.freeze({carveRetention:.064,springFrequency:32,dampingRatio:.684});function Q6(i,t){if(i.dirt||i.height>0)return;let e=Math.hypot(i.vx,i.vz);if(e>.001&&e<t){let n=e+(t-e)*L3.carveRetention*(1-(i.slide??0));i.vx*=n/e,i.vz*=n/e}}function bo(i){let t=Rn[i],e=Rn[(i+Rn.length-1)%Rn.length],n=Rn[(i+1)%Rn.length],s=Math.atan2(n.z-e.z,n.x-e.x);return{...t,h:s,co:Math.cos(s),si:Math.sin(s)}}function In(i,t,e){let n=t-i.x,s=e-i.z;return{u:-n*i.si+s*i.co,v:n*i.co+s*i.si}}function Ll(i,t,e){return{x:i.x-i.si*t+i.co*e,z:i.z+i.co*t+i.si*e}}var D3=i=>(i=fi(i,0,1),i*i*(3-2*i)),Rl=(i,t,e)=>1-D3((Math.abs(i)-t+e)/e),Ce={...bo(105),id:"DIVOT",u:-2.03,halfWidth:2.08,halfLength:.95,depth:.19},rd=[{...bo(221),id:"PATCH-A",u:-2.1,v:-4,halfWidth:1.56,halfLength:1.75,rise:.045},{...bo(221),id:"PATCH-B",u:2.1,v:4,halfWidth:1.56,halfLength:1.55,rise:.045}],Dl=bo(270),U3=Ll(Dl,2.9,0),N3=Ll(Dl,2.9-.1524,0),Al=Dl.h-.15,ad=.0762,F3=.194,Il=1.2192,z3=(.19+.013-.003)*Il/(Il-ad-F3),ye={...N3,uprightAnchor:U3,h:Al,co:Math.cos(Al),si:Math.sin(Al),id:"PLYWOOD",width:.6096,length:Il,rise:z3,thickness:.013,supportLip:ad};function od(i,t){let e=In(Ce,i,t),n=e.v/Ce.halfLength;return Math.abs(n)>=1?0:-Ce.depth*Rl(e.u-Ce.u,Ce.halfWidth,.4)*Math.cos(n*Math.PI/2)**2}function Pl(i,t,e){let n=In(i,t,e);return Rl(n.u-i.u,i.halfWidth,.22)*Rl(n.v-i.v,i.halfLength,.24)}function So(i,t){return od(i,t)+rd.reduce((e,n)=>e+n.rise*Pl(n,i,t),0)}function nx(i,t){return{x:(So(i+.02,t)-So(i-.02,t))/.04,z:(So(i,t+.02)-So(i,t-.02))/.04}}function ix(i,t){let e=In(ye,i,t);return Math.abs(e.u)>ye.width/2||Math.abs(e.v)>ye.length/2?null:.003+(e.v/ye.length+.5)*ye.rise}function sd(i){let t=rs(i),e=In(Ce,t.x,t.z);if(Math.abs(e.v)>15||Math.abs(e.u)>7)return t;let n=1.8*Math.cos(e.v/15*Math.PI/2)**4;return Ll(Ce,e.u+n,e.v)}function sx(i){let t=rs(i),e=In(Ce,t.x,t.z);if(Math.abs(e.v)>16||Math.abs(e.u)>7)return yo(i);let n=sd(i-.25),s=sd(i+.25);return Math.atan2(s.z-n.z,s.x-n.x)}function rx(i){let t=1/0,e=0;for(let n=0;n<ss;n+=.25){let s=rs(n),r=Math.hypot(s.x-i.x,s.z-i.z);r<t&&(t=r,e=n)}return e}function Cl(i,t,e,n){i.hazards?.event(i,t,e,n)}function ax(i,t,e){let n=i.rider;if(!["riding","coasting"].includes(i.phase))return;let s=Math.hypot(n.vx,n.vz),r=Mo[i.options.board];if(n.height<=.01)for(let p of rd){let f=Pl(p,t.x,t.z),g=Pl(p,n.x,n.z);if(f<.05!=g<.05){let x=g>=.05;x&&(n.bumpVelocity=(n.bumpVelocity??0)+Math.min(.18,s*.02)*r.bump,n.wobble+=Math.min(.025,s*.002)*r.bump),Cl(i,"PATCH",.34,{edge:x?"entry":"exit",patch:p.id})}}let a=In(Ce,t.x,t.z),o=In(Ce,n.x,n.z),c=od(n.x,n.z);if(n.height<=.01&&c<-.065&&(n.divotLoaded=!0),n.divotLoaded&&Math.abs(o.v)>=Ce.halfLength*.88&&(n.divotLoaded=!1,n.height<=.01&&Math.abs(o.u-Ce.u)<Ce.halfWidth-.35&&Math.abs(a.v)<Ce.halfLength)){let p=Math.abs(n.vx*Ce.co+n.vz*Ce.si);p>2.2&&(n.up=Math.min(2.35,p*.24),n.height=.008,n.trick=null,n.divotDeparture={time:i.time,up:n.up,height:n.height},Cl(i,"DIVOT_POP",n.up))}let l=In(ye,t.x,t.z),h=In(ye,n.x,n.z),d=ye.length/2;if(n.rampApproach=n.height<=.01&&Math.abs(h.u)<ye.width/2&&h.v>=-d-.3&&h.v<=d&&n.vx*ye.co+n.vz*ye.si>.5?fi((h.v+d+.3)/(ye.length+.3),0,1):null,l.v<d&&h.v>=d&&Math.abs(h.u)<ye.width/2+.015&&n.height<=.035){let p=n.vx*ye.co+n.vz*ye.si;p>.5&&(n.height=ye.rise+.003,n.up=Math.min(3.2,p*ye.rise/ye.length),n.trick=null,n.rampDeparture={time:i.time,up:n.up,height:n.height},Cl(i,"RAMP_LAUNCH",n.up))}}var cd=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Gn=(i,t,e)=>(i=cd((i-t)/(e-t)),i*i*(3-2*i));function To(i){let t=i.rider,e=Math.max(0,i.phaseTime),n=t.crashMotion??{},s=n.speed??Math.hypot(t.vx??0,t.vz??0),r=n.reason??i.stats?.crashReason,a=n.side??1,o=["WOBBLE","BALANCE","SLIDE"].includes(r),c=cd((Math.max(s,n.impactSpeed??0)-2)/9),l=!o&&(s>=8||(n.impactSpeed??0)>=5.5),h=t.groundContactAt??.5,d=Math.max(0,e-h),p=l?2.4+c*.6:o?1.45+c*.55:1.9+c*.5,f=Gn(e,0,.22),g=Gn(d,p-.5,p+.35),x=Gn(d,0,.3),m=1-g,u=2*Math.PI*(l?2:1)*Gn(d,.04,p),M=l?(Math.sin(u*1.5+.7)*.5+.5)*.65*m*Gn(e,.12,.45):0,v=(1-Gn(e,.13,.36))*f+M*.4,_=o?f*m:M*.6,A=o?0:Gn(e,.12,.36)*m*(1-M),w=g,C=v+_+A+w;C>1&&(v/=C,_/=C,A/=C,w/=C);let R=Gn(e,.04,o?.52:.65),S=o||!l&&s<4.5?0:u,b=l?a*(.42*x+.48*Math.sin(u*.75)*m):a*(o?.18:.42)*x*(1-g*.35);return{family:l?"UNCONTROLLED_TUMBLE":o?"HIP_SLIDE":"FORWARD_TUMBLE",severity:c,duration:p,weights:[v,_,A,w],pitch:o?-.2*R:-.72*R*(1-g*.65)+(l?.32*Math.sin(u)*m:0),roll:a*(1.55*R+S),yaw:-(n.heading??t.heading)-Math.PI/2+(t.impactTurn??0)+b}}function hx(i,t){for(let e of Object.values(i.surfaces)){let n=t?e.userData.crashGeometry:e.userData.rideGeometry;n&&e.geometry!==n&&(e.geometry=n,e.updateMorphTargets(),t||i.weights.forEach((s,r)=>{r<e.morphTargetInfluences.length&&(e.morphTargetInfluences[r]=s)}))}}function ux(i){return To(i).weights}var ld=new WeakSet;async function dx(i){let t=i.human;if(ld.has(t.surfaces))return;let e=i.renderer,n=new Ps;n.fog=i.scene.fog;let s=new Te(55,1,.01,20);s.position.set(0,1,4),s.lookAt(0,1,0);let r=new Je(32,32),a=e.getRenderTarget();try{for(let o of[t.surfaces]){n.clear();for(let c of Object.values(o)){let l=new we(c.userData.crashGeometry,c.material);l.frustumCulled=!1,n.add(l)}e.compileAsync&&await e.compileAsync(n,s,i.scene),e.setRenderTarget(r),e.render(n,s)}}finally{e.setRenderTarget(a),r.dispose()}ld.add(t.surfaces)}var Ul=class{constructor(t){this.vertices=t,this.size=4,this.cells=new Map,this.meta=new Float64Array(t.length/9*10);let e=[];for(let n=0;n<t.length;n+=9){let s=t.subarray(n,n+9),r=(s[5]-s[8])*(s[0]-s[6])+(s[6]-s[3])*(s[2]-s[8]);if(Math.abs(r)<1e-10)continue;let a=n/9,o=a*10,c=((s[1]-s[7])*(s[5]-s[8])+(s[4]-s[7])*(s[8]-s[2]))/r,l=((s[1]-s[7])*(s[6]-s[3])+(s[4]-s[7])*(s[0]-s[6]))/r,h=Math.min(s[0],s[3],s[6]),d=Math.max(s[0],s[3],s[6]),p=Math.min(s[2],s[5],s[8]),f=Math.max(s[2],s[5],s[8]);this.meta.set([r,c,l,s[7]-c*s[6]-l*s[8],Math.max(s[1],s[4],s[7]),h,d,p,f,0],o),e.push(a);for(let g=Math.floor(h/4);g<=Math.floor(d/4);g++)for(let x=Math.floor(p/4);x<=Math.floor(f/4);x++){let m=g+","+x;this.cells.has(m)||this.cells.set(m,[]),this.cells.get(m).push(a)}}this.ids=Uint32Array.from(e);for(let[n,s]of this.cells)this.cells.set(n,Uint32Array.from(s))}get triangles(){let t=this.vertices;return Array.from(this.ids,e=>({p:Array.from(t.subarray(e*9,e*9+9))}))}height(t,e){let n=this.vertices,s=this.meta;for(let r of this.cells.get(Math.floor(t/4)+","+Math.floor(e/4))??[]){let a=r*9,o=s[r*10],c=((n[a+5]-n[a+8])*(t-n[a+6])+(n[a+6]-n[a+3])*(e-n[a+8]))/o,l=((n[a+8]-n[a+2])*(t-n[a+6])+(n[a]-n[a+6])*(e-n[a+8]))/o,h=1-c-l;if(c>=-1e-6&&l>=-1e-6&&h>=-1e-6)return c*n[a+1]+l*n[a+4]+h*n[a+7]}}prepare(t,e,n,s){let r=new Map,a=this.meta;for(let c=Math.floor(t/4);c<=Math.floor(e/4);c++)for(let l=Math.floor(n/4);l<=Math.floor(s/4);l++){let h=c+","+l;r.set(h,(this.cells.get(h)??new Uint32Array).filter(d=>{let p=d*10;return a[p+5]<=e+.001&&a[p+6]>=t-.001&&a[p+7]<=s+.001&&a[p+8]>=n-.001}))}let o=Object.create(this);return o.cells=r,o}upperBound(t,e,n,s){let r=-1/0,a=this.meta;for(let o=Math.floor(t/4);o<=Math.floor(e/4);o++)for(let c=Math.floor(n/4);c<=Math.floor(s/4);c++)for(let l of this.cells.get(o+","+c)??[]){let h=l*10;a[h+5]>e+.001||a[h+6]<t-.001||a[h+7]>s+.001||a[h+8]<n-.001||(r=Math.max(r,Math.min(a[h+4],a[h+3]+a[h+1]*(a[h+1]>0?e:t)+a[h+2]*(a[h+2]>0?s:n))))}return r+.001}planeBound(t,e,n,s,r,a){let o=-1/0,c=this.meta,l=this.vertices;for(let h=Math.floor(t/4);h<=Math.floor(e/4);h++)for(let d=Math.floor(n/4);d<=Math.floor(s/4);d++)for(let p of this.cells.get(h+","+d)??[]){let f=p*10,g=p*9;if(c[f+5]>e+.001||c[f+6]<t-.001||c[f+7]>s+.001||c[f+8]<n-.001)continue;let x=c[f+1]-r,m=c[f+2]-a,u=Math.max(l[g+1]-r*l[g]-a*l[g+2],l[g+4]-r*l[g+3]-a*l[g+5],l[g+7]-r*l[g+6]-a*l[g+8]);o=Math.max(o,Math.min(u,c[f+3]+x*(x>0?e:t)+m*(m>0?s:n)))}return o+.001*(1+Math.abs(r)+Math.abs(a))}};function mx(i,t,e,n,s){i.rotation.set(0,i.rotation.y,0);let r=i.rotation.y,a=Math.cos(r),o=Math.sin(r),c=[];for(let g of e){let[x,,m]=g.pivot,u=i.position.x+a*x+o*m,M=i.position.z-o*x+a*m,v=n.height(u,M);if(v===void 0)continue;let _=r+g.steering.rotation.y,A=Math.cos(_),w=Math.sin(_),C=-1/0;for(let R of[-.075,0,.075])for(let S=-4;S<=4;S++){let b=S*.125,P=Math.sin(b)*g.radius,U=-Math.cos(b)*g.radius,O=n.height(u+A*R+w*P,M-w*R+A*P);O!==void 0&&(C=Math.max(C,O-U))}c.push({w:g,ground:v,center:C+.002})}if(c.length!==4)return;let l=c.filter(g=>g.w.front),h=c.filter(g=>!g.w.front),d=c.filter(g=>g.w.pivot[0]<0),p=c.filter(g=>g.w.pivot[0]>0),f=g=>g.reduce((x,m)=>x+m.ground,0)/g.length;i.position.y=f(c),t.rotation.set(Math.atan2(f(l)-f(h),2.8)+s,0,Math.atan2(f(p)-f(d),1.496));for(let g of c)g.w.steering.position.set(g.w.pivot[0],g.center-i.position.y,g.w.pivot[2])}var mi={roadShadowData:{value:null},roadShadowGrid:{value:null},roadShadowGridInfo:{value:new ae},roadShadowTextureSize:{value:new ae},roadShadowsReady:{value:0}};function _x(i){let t=[],e=[];i.scene.updateMatrixWorld(!0);function n(u,M,v,_,A,w=0){let C=new Me(M.clone(),v.clone()).applyMatrix4(u),R=u.clone().invert(),S=C.getCenter(new L);t.push({matrix:u,inv:R,lo:M,hi:v,type:_,bounds:C,center:S,name:A,softHeight:w}),e.push(A)}function s(u,M=0){u.geometry.computeBoundingBox();let v=u.geometry.boundingBox;n(u.matrixWorld,v.min,v.max,M,u.name||u.geometry.type)}function r(u,M,v,_,A=0){let w=new Qt().compose(u,new nn().setFromAxisAngle(new L(0,1,0),v),new L(1,1,1));n(w,M.clone().multiplyScalar(-.5),M.clone().multiplyScalar(.5),A,_)}for(let u of i.site.children){let M=u.userData.assetKind;if(!M)continue;let v=new Me().setFromObject(u),_=v.getCenter(new L),A=v.getSize(new L);if(M!=="water_manhole_cover"){if(M==="fire_hydrant"){let w=[];u.traverse(S=>{if(!S.isMesh)return;let b=S.geometry.attributes.position;for(let P=0;P<b.count;P++)w.push(new L().fromBufferAttribute(b,P))});let C=new Me().setFromPoints(w),R=C.max.y-C.min.y;for(let S=0;S<8;S++){let b=C.min.y+R*S/8,P=b+R/8,U=new Me;for(let O=0;O<w.length;O+=3)for(let k=0;k<3;k++){let G=w[O+k],W=w[O+(k+1)%3];G.y>=b&&G.y<=P&&U.expandByPoint(G);for(let et of[b,P])(G.y-et)*(W.y-et)<0&&U.expandByPoint(G.clone().lerp(W,(et-G.y)/(W.y-G.y)))}U.isEmpty()||(U.min.y=b,U.max.y=P,n(u.matrixWorld,U.min,U.max,1,"Hydrant fitted band",R*u.scale.y))}continue}if(M==="utility_box_02"){let w=new Me;u.traverse(C=>{C.isMesh&&(C.geometry.computeBoundingBox(),w.union(C.geometry.boundingBox))}),n(u.matrixWorld,w.min,w.max,0,"Utility cabinet")}}}for(let u of i.streetlights??[])r(u.position.clone().add(new L(0,2.1,0)),new L(.16,4.2,.16),0,"Lamp post",1),r(u.position.clone().add(new L(0,.12,0)),new L(.44,.24,.44),0,"Lamp base",1);i.detailRoot.traverse(u=>{if(!(!u.isMesh||u.name==="Barrier ground contact")){if(u.geometry.type==="ExtrudeGeometry"){s(u,3);return}if(!u.name.startsWith("Chamfered")){if(u.geometry.type==="SphereGeometry"||u.geometry.type==="IcosahedronGeometry"){s(u,2);return}if(u.geometry.type==="CylinderGeometry"){s(u,1);return}if(u.name==="Accumulated construction grit"){s(u,2);return}s(u)}}});for(let u of i.site.children)u.name.startsWith("Construction spoil pile")&&s(u,2);for(let u of i.contactAudit?.cabinets??[])r(new L(u.x,u.padTop-.055,u.z),new L(1.2,.11,.72),0,"Utility footing");let a=16,o=new Me;for(let u of t)o.union(u.bounds);o.expandByScalar(42);let c=Math.floor(o.min.x/a)*a,l=Math.floor(o.min.z/a)*a,h=Math.ceil((o.max.x-c)/a),d=Math.ceil((o.max.z-l)/a),p=Array.from({length:h*d},()=>[]);t.forEach((u,M)=>{let v=Math.min(40,Math.max(2,(u.bounds.max.y-u.bounds.min.y)*28)),_=Math.max(0,Math.floor((u.bounds.min.x-v-c)/a)),A=Math.min(h-1,Math.floor((u.bounds.max.x+v-c)/a)),w=Math.max(0,Math.floor((u.bounds.min.z-v-l)/a)),C=Math.min(d-1,Math.floor((u.bounds.max.z+v-l)/a));for(let R=w;R<=C;R++)for(let S=_;S<=A;S++)p[R*h+S].push(M)});let f=Math.max(...p.map(u=>u.length));if(f>192)throw Error("Road shadow spatial cell exceeds budget");let g=new Float32Array((f+1)*p.length*4);p.forEach((u,M)=>{g[M*(f+1)*4]=u.length,u.forEach((v,_)=>g[(M*(f+1)+_+1)*4]=v)});let x=new Float32Array(t.length*6*4);t.forEach((u,M)=>{let v=M*24,_=u.inv.elements;x.set([u.center.x,u.center.y,u.center.z,u.bounds.getSize(new L).length()/2],v),x.set([_[0],_[4],_[8],_[12]],v+4),x.set([_[1],_[5],_[9],_[13]],v+8),x.set([_[2],_[6],_[10],_[14]],v+12),x.set([...u.lo.toArray(),u.type],v+16),x.set([...u.hi.toArray(),u.softHeight],v+20)});function m(u,M,v){let _=new Xi(u,M,v,Fe,Xe);return _.needsUpdate=!0,_}mi.roadShadowData.value?.dispose(),mi.roadShadowGrid.value?.dispose(),mi.roadShadowData.value=m(x,6,t.length),mi.roadShadowGrid.value=m(g,f+1,p.length),mi.roadShadowGridInfo.value.set(c,l,h,d),mi.roadShadowTextureSize.value.set(f+1,p.length,t.length,a),mi.roadShadowsReady.value=1,i.roadShadowAudit={primitives:t.length,maxCellCandidates:f,textureBytes:x.byteLength+g.byteLength,types:e.reduce((u,M)=>(u[M]=(u[M]||0)+1,u),{})}}var vx=`
uniform sampler2D roadShadowData;uniform sampler2D roadShadowGrid;uniform vec4 roadShadowGridInfo;uniform vec4 roadShadowTextureSize;uniform float roadShadowsReady;
vec4 roadData(float id,float col){return texture2D(roadShadowData,vec2((col+.5)/6.,(id+.5)/roadShadowTextureSize.z));}
bool roadBox(vec3 o,vec3 d,vec3 lo,vec3 hi,float reach){vec3 sd=mix(vec3(-1.),vec3(1.),step(vec3(0.),d))*max(abs(d),vec3(.00001));vec3 a=(lo-o)/sd,b=(hi-o)/sd,mn=min(a,b),mx=max(a,b);float entry=max(max(mn.x,mn.y),mn.z),leave=min(min(mx.x,mx.y),mx.z);return leave>max(.009,entry)&&entry<reach;}
float roadOcclusion(vec3 p,vec3 direction,float reach){
 if(roadShadowsReady<.5)return 0.;vec2 cell=floor((p.xz-roadShadowGridInfo.xy)/roadShadowTextureSize.w);if(min(cell.x,cell.y)<0.||cell.x>=roadShadowGridInfo.z||cell.y>=roadShadowGridInfo.w)return 0.;float row=cell.y*roadShadowGridInfo.z+cell.x;float count=texture2D(roadShadowGrid,vec2(.5/roadShadowTextureSize.x,(row+.5)/roadShadowTextureSize.y)).r;
 for(int i=0;i<192;i++){if(float(i)>=count)break;float id=texture2D(roadShadowGrid,vec2((float(i)+1.5)/roadShadowTextureSize.x,(row+.5)/roadShadowTextureSize.y)).r;vec4 bound=roadData(id,0.);vec3 delta=bound.xyz-p;float along=dot(delta,direction);if(along< -bound.w||along>reach+bound.w||dot(delta,delta)-along*along>bound.w*bound.w+.01)continue;
 vec4 r0=roadData(id,1.),r1=roadData(id,2.),r2=roadData(id,3.),low=roadData(id,4.),high=roadData(id,5.);vec4 origin=vec4(p+vec3(0.,.004,0.)+direction*.003,1.);vec3 o=vec3(dot(r0,origin),dot(r1,origin),dot(r2,origin)),d=vec3(dot(r0.xyz,direction),dot(r1.xyz,direction),dot(r2.xyz,direction));
 if(!roadBox(o,d,low.xyz,high.xyz,reach))continue;
 if(low.w>2.5){if(roadBox(o,d,vec3(-.192,-.095,0.),vec3(-.156,.095,.192),reach)||roadBox(o,d,vec3(-.034,-.095,0.),vec3(.034,.095,.192),reach)||roadBox(o,d,vec3(.156,-.095,0.),vec3(.192,.095,.192),reach)||roadBox(o,d,vec3(-.192,-.095,0.),vec3(.192,-.055,.192),reach)||roadBox(o,d,vec3(-.192,.055,0.),vec3(.192,.095,.192),reach))return 1.;continue;}
 if(low.w>.5){vec3 center=(low.xyz+high.xyz)*.5,radius=max((high.xyz-low.xyz)*.5,vec3(.001)),q=(o-center)/radius,v=d/radius;
 if(low.w<1.5){float aa=dot(v.xz,v.xz),bb=dot(q.xz,v.xz),cc=dot(q.xz,q.xz)-1.;float enter=-1e6,leave=1e6;if(aa<.000001){if(cc>0.)continue;}else{float disc=bb*bb-aa*cc;if(disc<0.)continue;enter=(-bb-sqrt(disc))/aa;leave=(-bb+sqrt(disc))/aa;}if(abs(v.y)<.000001){if(abs(q.y)>1.)continue;}else{float t0=(-1.-q.y)/v.y,t1=(1.-q.y)/v.y;enter=max(enter,min(t0,t1));leave=min(leave,max(t0,t1));}if(leave<=max(.009,enter)||enter>=reach)continue;
 }else{float aa=dot(v,v),bb=dot(q,v),cc=dot(q,q)-1.,disc=bb*bb-aa*cc;if(disc<0.)continue;float t=(-bb-sqrt(disc))/max(aa,.00001);if(t<.004)t=(-bb+sqrt(disc))/max(aa,.00001);if(t<.004||t>reach)continue;}}

 // Keep contact anchored; distant hydrant projections lose contrast instead of a solid black cutout.
 return high.w>0.?.65*(1.-smoothstep(high.w*.5,high.w*3.,length(p.xz-bound.xz))):1.;
 }return 0.;
}
`;var Wn=(i,t,e)=>Math.max(t,Math.min(e,i)),Eo={LONGBOARD:{length:1.05,wheels:[[-.13503,-.41115],[-.13503,.41115],[.13503,-.41115],[.13503,.41115]]},HANDMEDOWN:{length:.98,wheels:[[-.08854,-.35328],[-.08854,.25767],[.08777,-.35328],[.08777,.25767]]},CRUISER:{length:.8,wheels:[[-.07109,-.2289],[-.07152,.21061],[.07108,-.22891],[.07066,.2106]]},STREET:{length:.79,wheels:[[-.05389,-.21487],[-.05389,.21487],[.05454,-.21487],[.05454,.21487]]}};function O3(i){return To(i)}function hd(i,t,e,n){let s=i.x-e.x,r=i.z-e.z,a=t.x-i.x,o=t.z-i.z,c=n+(e.radius??0),l=s*s+r*r-c*c;if(l<=0){let g=Math.hypot(s,r)||1;return{t:0,nx:s/g||1,nz:r/g,depth:c-Math.hypot(s,r)}}let h=a*a+o*o,d=s*a+r*o,p=d*d-h*l;if(h<1e-12||p<0)return null;let f=(-d-Math.sqrt(p))/h;return f<0||f>1?null:{t:f,nx:(s+a*f)/c,nz:(r+o*f)/c,depth:0}}function Nl(i,t,e,n=0){let s=Math.cos(e.yaw??0),r=Math.sin(e.yaw??0),a=M=>({x:(M.x-e.x)*s+(M.z-e.z)*r,z:-(M.x-e.x)*r+(M.z-e.z)*s}),o=a(i),c=a(t),l=c.x-o.x,h=c.z-o.z,d=e.hx+n,p=e.hz+n,f=0,g=1,x=0,m=0,u=0;if(Math.abs(o.x)<=d&&Math.abs(o.z)<=p){let M=d-Math.abs(o.x),v=p-Math.abs(o.z);M<v?(x=Math.sign(o.x)||1,u=M):(m=Math.sign(o.z)||1,u=v)}else for(let[M,v,_,A]of[[o.x,l,d,0],[o.z,h,p,1]]){if(Math.abs(v)<1e-12){if(Math.abs(M)>_)return null;continue}let w=(-_-M)/v,C=(_-M)/v,R=-1;if(w>C&&([w,C]=[C,w],R=1),w>f&&(f=w,x=A===0?R:0,m=A===1?R:0),g=Math.min(g,C),f>g)return null}return f<0||f>1?null:{t:f,nx:x*s-m*r,nz:x*r+m*s,depth:u}}var ud=class{constructor(t,{surface:e=()=>0,curb:n=()=>{}}={}){this.layout=t,this.surface=e,this.curb=n,this.cells=new Map;for(let[s,r]of Object.entries(t))for(let[a,o]of r.entries()){o.type=s,o.id=s+a;let c=o.radius??Math.hypot(o.hx,o.hz);for(let l=Math.floor((o.x-c)/8);l<=Math.floor((o.x+c)/8);l++)for(let h=Math.floor((o.z-c)/8);h<=Math.floor((o.z+c)/8);h++){let d=l+","+h,p=this.cells.get(d)??[];p.push(o),this.cells.set(d,p)}}}nearby(t,e,n=1.2){let s=new Set;for(let r=Math.floor((Math.min(t.x,e.x)-n)/8);r<=Math.floor((Math.max(t.x,e.x)+n)/8);r++)for(let a=Math.floor((Math.min(t.z,e.z)-n)/8);a<=Math.floor((Math.max(t.z,e.z)+n)/8);a++)for(let o of this.cells.get(r+","+a)??[])s.add(o);return[...s]}attach(t){return t.hazards=this,t.hazardEvents=[],t.hazardSerial=0,t.hazardCooldown=new Map,t.rider.bump=0,t.rider.bumpVelocity=0,t.rider.bumpRoll=0,t.rider.bumpPitch=0,t}event(t,e,n=1,s={}){t.hazardEvents.push({serial:++t.hazardSerial,time:t.time,kind:e,strength:n,...s}),t.hazardEvents.length>24&&t.hazardEvents.shift()}tick(t,e){let n=t.rider;n.bumpVelocity+=(-n.bump*240-n.bumpVelocity*18)*e,n.bump+=n.bumpVelocity*e,n.bumpRoll*=Math.exp(-e*12),n.bumpPitch*=Math.exp(-e*12),t.phase==="crashed"&&(n.impactFlex=Math.max(0,(n.impactFlex??0)-e*2.5))}bump(t,e,n,s,r,a){let o=t.rider;if((t.hazardCooldown.get(a)??-1)>t.time)return;t.hazardCooldown.set(a,t.time+.16);let c=e==="MANHOLE",l=Wn(n/7,.12,1.8)*Mo[t.options.board].bump,h=(c?.115:.025)*l;o.bumpVelocity=Math.min(1.1,o.bumpVelocity+(c?.3:.105)*l),o.bumpRoll+=s*(c?.032:.01)*l,o.bumpPitch+=r*(c?.025:.009)*l;let d=s||1;o.heading+=d*h,o.vx+=-Math.sin(o.heading)*d*h*.65,o.vz+=Math.cos(o.heading)*d*h*.65,o.wobble=Wn(o.wobble+(c?.11:.018)*l,0,1.3),this.event(t,e,l,{id:a})}wheels(t,e){let n=Eo[e]??Eo.LONGBOARD,s=Math.cos(t.heading),r=Math.sin(t.heading);return n.wheels.map(([a,o])=>({x:t.x-s*o-r*a,z:t.z-r*o+s*a,side:Math.sign(a),front:-Math.sign(o)}))}riding(t,e,n){let s=t.rider,r={x:s.x,z:s.z,heading:s.heading},a=Math.hypot(s.vx,s.vz),o=this.wheels(e,t.options.board),c=this.wheels(r,t.options.board),l=this.nearby(e,r);if(s.height<.035){let p=null;for(let f of l)if(f.type==="drains")for(let g=0;g<4;g++){let x=Nl(o[g],c[g],f,.015);x&&(!p||x.t<p.t)&&(p={...x,o:f})}if(p){let f=p,g=e.x+(s.x-e.x)*f.t,x=e.z+(s.z-e.z)*f.t;t.crash("GRATE"),t.board.x=g,t.board.z=x,t.board.vx=t.board.vz=0,t.board.pinned=!0,t.board.catchId=f.o.id,t.board.pinYaw=t.board.heading,t.rider.fallLift=Math.max(.02,s.height),t.rider.fallUp=Wn(a*.18,.15,1.8),t.rider.throwForward=!0,this.event(t,"GRATE",Wn(a/7,.2,2));return}for(let f=0;f<4;f++){let g=o[f],x=c[f];for(let M of l)if(M.type==="covers"){let v=Math.hypot(g.x-M.x,g.z-M.z)<M.radius,_=Math.hypot(x.x-M.x,x.z-M.z)<M.radius;(v!==_||!v&&hd(g,x,M,0))&&this.bump(t,"MANHOLE",a,g.side,g.front,M.id+"-"+f+(_?"in":"out"))}let m=this.curb(g.x,g.z),u=this.curb(x.x,x.z);m===void 0!=(u===void 0)&&this.bump(t,"SEAM",a,g.side,g.front,"seam-"+f)}}let h={x:s.x,z:s.z,heading:s.heading,vx:s.vx,vz:s.vz,height:s.height},d=this.solids(t,h,e,!0,!1,n);if(d){t.crash(d.o.kind),Object.assign(t.board,{x:h.x,z:h.z,vx:h.vx,vz:h.vz,heading:h.heading}),s.fallLift=Math.max(.01,s.height),s.fallUp=Wn(a*.12,.1,1.3),s.throwForward=!0;return}this.solids(t,s,e,!1,!1,n)}solids(t,e,n,s,r,a){if(s&&e.pinned)return;let o=this.nearby(n,e,1.6).filter(R=>R.type==="solids"&&(r||!R.rideOverBoards?.includes(t.options.board)));if(!o.length)return;let c=this.surface(e.x,e.z),l=s?e.height??0:r?e.fallLift??0:e.height,h=Eo[t.options.board]??Eo.LONGBOARD,d=e.heading,p=Math.cos(d),f=Math.sin(d),g=s?[-h.length*.4,0,h.length*.4].map(R=>({dx:p*R,dz:f*R,r:.12,lo:c+l+.015,hi:c+l+.2})):r?this.bodyProbes(t,c,l):[{dx:0,dz:0,r:.25,lo:c+l+.1,hi:c+l+1.75}],x=null;for(let R of o)for(let S of g){let b={x:n.x+S.dx,z:n.z+S.dz},P={x:e.x+S.dx,z:e.z+S.dz},U=R.radius?hd(b,P,R,S.r):Nl(b,P,R,S.r);if(!U)continue;let O=this.surface(n.x+(e.x-n.x)*U.t,n.z+(e.z-n.z)*U.t),k=O-c;S.hi+k<R.bottom||S.lo+k>R.top||(!x||U.t<x.t)&&(x={...U,o:R})}if(!x)return;let m=x,u=e.x-n.x,M=e.z-n.z,v=e.vx*m.nx+e.vz*m.nz;if(e.x=n.x+u*m.t+m.nx*(m.depth+.008),e.z=n.z+M*m.t+m.nz*(m.depth+.008),v>=0)return;let _=-v,A=s?.28:.12;e.vx-=(1+A)*v*m.nx,e.vz-=(1+A)*v*m.nz;let w=e.vx*-m.nz+e.vz*m.nx;if(e.vx+=m.nz*w*.2,e.vz-=m.nx*w*.2,!r&&!s){let R=e.vx,S=e.vz;t.crash(m.o.kind,_),t.board.vx=R*.7,t.board.vz=S*.7,e.fallUp=Math.min(1,_*.12),e.fallLift=.01}e.impactFlex=Math.min(1,_/5),e.impactTurn=Wn((e.impactTurn??0)+(m.nx*f-m.nz*p)*_*.1,-1.2,1.2),e.heading+=Wn((m.nx*f-m.nz*p)*_*.045,-.35,.35);let C=m.o.id+(s?"board":"body");return(t.hazardCooldown.get(C)??-1)<t.time&&(this.event(t,s?"BOARD_IMPACT":"BODY_IMPACT",Wn(_/6,.1,2),{obstacle:m.o.kind}),t.hazardCooldown.set(C,t.time+.18)),m}bodyProbes(t,e,n){let s=O3(t),r=Math.cos(s.yaw),a=Math.sin(s.yaw),o=Math.cos(s.roll),c=Math.sin(s.roll),l=Math.cos(s.pitch),h=Math.sin(s.pitch),d=[[-.6,.22],[-.24,.28],[.16,.3],[.62,.2]].map(([f,g])=>{let x=-c*f,m=o*f*l,u=o*f*h;return{dx:r*x+a*u,dz:-a*x+r*u,y:m,r:g}}),p=Math.min(...d.map(f=>f.y-f.r));return d.map(f=>({...f,lo:e+n+f.y-p-f.r,hi:e+n+f.y-p+f.r}))}crashed(t,e,n,s){this.solids(t,t.rider,e,!1,!0,s),this.solids(t,t.board,n,!0,!0,s);let r=t.board;if(!r.pinned){for(let a of this.nearby(n,r))if(a.type==="drains"){let o=Nl(n,r,a,.08);if(o){r.x=n.x+(r.x-n.x)*o.t,r.z=n.z+(r.z-n.z)*o.t,r.vx=r.vz=0,r.pinned=!0,r.catchId=a.id,this.event(t,"GRATE",.5);break}}}}};var dd=Object.freeze({reference:{pixelRatio:1.5,paintSamples:8},resolution:{pixelRatio:1.25,paintSamples:8},paint:{pixelRatio:1.5,paintSamples:4},balanced:{pixelRatio:1.25,paintSamples:4},mobile:{pixelRatio:1,paintSamples:4}});function B3(i=globalThis.location?.search??"",t=globalThis.matchMedia?.("(pointer: coarse)").matches??globalThis.innerWidth<=700){let e=new URLSearchParams(i),n=e.get("quality")??(t?"mobile":"reference"),s=Object.hasOwn(dd,n)?n:"balanced";return{...dd[s],name:s,mobile:t,powerPreference:e.get("power")==="default"?"default":"low-power"}}var Tx=B3();export{Le as a,fn as b,Or as c,Cn as d,He as e,ei as f,Nd as g,at as h,nn as i,L as j,ae as k,Je as l,Me as m,Qt as n,ve as o,Wt as p,ws as q,Pe as r,Ht as s,fe as t,we as u,Gi as v,rn as w,Te as x,Qn as y,rc as z,Ps as A,Zr as B,ac as C,oc as D,Jr as E,cc as F,lc as G,hc as H,Qr as I,uc as J,ea as K,na as L,ks as M,Hs as N,mc as O,gc as P,qs as Q,xc as R,_c as S,vc as T,yc as U,Mc as V,Sc as W,bc as X,Tc as Y,Js as Z,Ac as _,Rc as $,Vu as aa,I6 as ba,y3 as ca,P6 as da,Ul as ea,mx as fa,U6 as ga,N6 as ha,F6 as ia,z6 as ja,$u as ka,fi as la,ir as ma,M3 as na,k6 as oa,me as pa,pi as qa,Rn as ra,sr as sa,ju as ta,H6 as ua,E3 as va,De as wa,ss as xa,rs as ya,yo as za,W6 as Aa,R3 as Ba,bl as Ca,X6 as Da,q6 as Ea,Y6 as Fa,Z6 as Ga,J6 as Ha,mi as Ia,_x as Ja,vx as Ka,To as La,Mo as Ma,P3 as Na,K6 as Oa,L3 as Pa,Q6 as Qa,Eo as Ra,O3 as Sa,Nl as Ta,ud as Ua,In as Va,Ll as Wa,Ce as Xa,rd as Ya,ye as Za,Pl as _a,So as $a,nx as ab,ix as bb,sd as cb,sx as db,rx as eb,ax as fb,hx as gb,ux as hb,dx as ib,Tx as jb};
