import{_ as e,a as t,c as n,i as r,l as i,n as a,o,r as s,s as c,u as l,x as u}from"./index-BL266arE.js";var d=u(e(),1),f=l(),ee={mixed:0,squares:1,circles:2,triangles:3},p=2,te=1024,ne=32,re=.1,ie=1/60,ae=.42,oe=.94,se=.972,ce=.01,m=.2,h=.3,g=.16,_=1.66,le=`
struct Params {
  resolution: vec4f,
  placement: vec4f,
  grid: vec4f,
  field: vec4f,
  motion: vec4f,
  color: vec4f,
  hover: vec4f,
  background: vec4f,
}
@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var maskTexture: texture_2d<f32>;
@group(0) @binding(2) var maskSampler: sampler;
@group(0) @binding(3) var<storage, read> charges: array<f32>;

const SEED = vec2f(12.9898, 78.233);
const GLOW_THRESHOLD = 0.6;

fn mod289v3(x: vec3f) -> vec3f { return x - floor(x * (1.0 / 289.0)) * 289.0; }
fn mod289v4(x: vec4f) -> vec4f { return x - floor(x * (1.0 / 289.0)) * 289.0; }
fn permute(x: vec4f) -> vec4f { return mod289v4(((x * 34.0) + 10.0) * x); }
fn taylorInvSqrt(r: vec4f) -> vec4f { return 1.79284291400159 - 0.85373472095314 * r; }
fn fadeCurve(t: vec3f) -> vec3f { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

fn cnoise(P: vec3f) -> f32 {
  var Pi0 = floor(P);
  var Pi1 = Pi0 + vec3f(1.0);
  Pi0 = mod289v3(Pi0);
  Pi1 = mod289v3(Pi1);
  let Pf0 = fract(P);
  let Pf1 = Pf0 - vec3f(1.0);
  let ix = vec4f(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  let iy = vec4f(Pi0.yy, Pi1.yy);
  let iz0 = Pi0.zzzz;
  let iz1 = Pi1.zzzz;

  let ixy = permute(permute(ix) + iy);
  let ixy0 = permute(ixy + iz0);
  let ixy1 = permute(ixy + iz1);

  var gx0 = ixy0 * (1.0 / 7.0);
  var gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  let gz0 = vec4f(0.5) - abs(gx0) - abs(gy0);
  let sz0 = step(gz0, vec4f(0.0));
  gx0 -= sz0 * (step(vec4f(0.0), gx0) - 0.5);
  gy0 -= sz0 * (step(vec4f(0.0), gy0) - 0.5);

  var gx1 = ixy1 * (1.0 / 7.0);
  var gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  let gz1 = vec4f(0.5) - abs(gx1) - abs(gy1);
  let sz1 = step(gz1, vec4f(0.0));
  gx1 -= sz1 * (step(vec4f(0.0), gx1) - 0.5);
  gy1 -= sz1 * (step(vec4f(0.0), gy1) - 0.5);

  var g000 = vec3f(gx0.x, gy0.x, gz0.x);
  var g100 = vec3f(gx0.y, gy0.y, gz0.y);
  var g010 = vec3f(gx0.z, gy0.z, gz0.z);
  var g110 = vec3f(gx0.w, gy0.w, gz0.w);
  var g001 = vec3f(gx1.x, gy1.x, gz1.x);
  var g101 = vec3f(gx1.y, gy1.y, gz1.y);
  var g011 = vec3f(gx1.z, gy1.z, gz1.z);
  var g111 = vec3f(gx1.w, gy1.w, gz1.w);

  let norm0 = taylorInvSqrt(vec4f(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  let norm1 = taylorInvSqrt(vec4f(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  let n000 = dot(g000, Pf0);
  let n100 = dot(g100, vec3f(Pf1.x, Pf0.yz));
  let n010 = dot(g010, vec3f(Pf0.x, Pf1.y, Pf0.z));
  let n110 = dot(g110, vec3f(Pf1.xy, Pf0.z));
  let n001 = dot(g001, vec3f(Pf0.xy, Pf1.z));
  let n101 = dot(g101, vec3f(Pf1.x, Pf0.y, Pf1.z));
  let n011 = dot(g011, vec3f(Pf0.x, Pf1.yz));
  let n111 = dot(g111, Pf1);

  let f = fadeCurve(Pf0);
  let nz = mix(vec4f(n000, n100, n010, n110), vec4f(n001, n101, n011, n111), f.z);
  let ny = mix(nz.xy, nz.zw, f.y);
  return 2.2 * mix(ny.x, ny.y, f.x);
}

fn fbm(p: vec3f) -> f32 {
  var total = 0.0;
  var amplitude = 1.0;
  var weight = 0.0;
  var frequency = 1.0;
  for (var i = 0; i < 2; i++) {
    total += amplitude * cnoise(p * frequency);
    weight += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return total / weight;
}


fn sdIsoscelesTriangle(point: vec2f, q: vec2f) -> f32 {
  let p = vec2f(abs(point.x), point.y);
  let a = p - q * clamp(dot(p, q) / dot(q, q), 0.0, 1.0);
  let b = p - q * vec2f(clamp(p.x / q.x, 0.0, 1.0), 1.0);
  let s = -sign(q.y);
  let d = min(vec2f(dot(a, a), s * (p.x * q.y - p.y * q.x)), vec2f(dot(b, b), s * (p.y - q.y)));
  return -sqrt(d.x) * sign(d.y);
}

fn shapeDistance(p: vec2f, shape: i32, c: f32) -> f32 {
  if (shape == 0) { return max(abs(p.x), abs(p.y)) - c; }
  if (shape == 1) { return length(p) - c; }
  return sdIsoscelesTriangle(vec2f(p.x, p.y + c), vec2f(c, 2.0 * c));
}

fn hash21(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let resolution = params.resolution.xy;
  let cellPx = params.grid.x;
  let dotSize = params.grid.y;
  let mode = i32(params.grid.z + 0.5);
  let cols = i32(params.grid.w + 0.5);
  let background = params.background.rgb;
  let toSurface = params.hover.w < 0.5;

  let pixel = uv * resolution;
  let origin = params.placement.xy;
  let rows = i32(params.placement.z + 0.5);
  let cell = floor((pixel - origin) / cellPx);
  if (cell.y < 0.0 || i32(cell.y) >= rows || cell.x < 0.0 || i32(cell.x) >= cols) {
    return vec4f(background, select(0.0, 1.0, toSurface));
  }
  let center = origin + (cell + 0.5) * cellPx;
  let local = (pixel - center) / (cellPx * 0.5);
  let cellUv = center / resolution;

  if (params.motion.z > 0.5 && textureSampleLevel(maskTexture, maskSampler, cellUv, 0.0).r > 0.5) {
    return vec4f(background, select(0.0, 1.0, toSurface));
  }

  var level = 1.0;
  let fade = params.motion.w;
  if (fade > 0.0) {
    let q = abs(uv * 2.0 - 1.0);
    let radius = pow(pow(q.x, 2.5) + pow(q.y, 2.5), 1.0 / 2.5) / pow(2.0, 1.0 / 2.5);
    level = 1.0 - smoothstep(max(0.0, 1.0 - fade * 2.2), 1.0, radius);
  }
  let noise = fbm(vec3f((center + params.motion.xy) / params.field.x + SEED, params.field.w));
  let tone = clamp((noise * 0.5 + 0.5 - params.field.y) * params.field.z + 0.5, 0.0, 1.0);
  let band = i32(min(tone, 0.999999) * 3.0);

  var charge = 0.0;
  let index = i32(cell.y) * cols + i32(cell.x);
  if (index >= 0 && index < i32(arrayLength(&charges))) { charge = charges[index]; }
  let stepped = (band + i32(clamp(charge, 0.0, 0.999) * 3.0)) % 3;

  var shape = 2 - stepped;
  var size = dotSize;
  if (mode != 0) {
    shape = mode - 1;
    size = dotSize * mix(0.45, 1.0, f32(stepped) / 2.0);
  }
  let introProgress = params.placement.w;
  var front = 0.0;
  if (introProgress < ${_.toFixed(2)}) {
    let radial = length((center - resolution * 0.5) / (resolution * 0.5)) * 0.70710678;
    let warp = cnoise(vec3f(cellUv * vec2f(3.2, 2.4) + SEED, 4.7)) * ${h.toFixed(2)};
    let jitter = hash21(cell) * ${g.toFixed(2)};
    let spread = radial + warp + jitter + ${h.toFixed(2)};
    let band = ${m.toFixed(2)} * (0.6 + 0.8 * hash21(cell + vec2f(17.0, 9.0)));
    let t = clamp((introProgress - spread) / band, 0.0, 1.0);
    if (t <= 0.0) {
      return vec4f(background, select(0.0, 1.0, toSurface));
    }
    let back = t - 1.0;
    size = max(size * (1.0 + 2.70158 * back * back * back + 1.70158 * back * back), 0.02);
    front = 1.0 - smoothstep(0.0, 1.0, abs(introProgress - spread) / band);
  }
  let aa = 2.0 / cellPx;
  let coverage = smoothstep(aa, -aa, shapeDistance(local, shape, size));

  let tint = mix(params.color.rgb, params.hover.rgb, max(smoothstep(0.15, 0.85, charge), front * 0.35));

  let rgb = mix(background, tint, coverage * level);
  if (toSurface) { return vec4f(rgb, 1.0); }
  let luminance = dot(tint * level, vec3f(0.2126, 0.7152, 0.0722));
  let glow = max(0.0, (luminance - GLOW_THRESHOLD) / (1.0 - GLOW_THRESHOLD)) * coverage;
  return vec4f(rgb, glow);
}
`,ue=`
struct Blur { direction: vec4f }
@group(0) @binding(0) var<uniform> blur: Blur;
@group(0) @binding(1) var sourceTexture: texture_2d<f32>;
@group(0) @binding(2) var sourceSampler: sampler;

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let sigma = blur.direction.z;
  let radius = i32(ceil(3.0 * sigma));
  var sum = vec3f(0.0);
  var weight = 0.0;
  for (var i = -radius; i <= radius; i++) {
    let offset = f32(i);
    let w = exp(-(offset * offset) / (2.0 * sigma * sigma));
    let sample = textureSampleLevel(sourceTexture, sourceSampler, uv + offset * blur.direction.xy, 0.0);
    sum += select(sample.rgb, sample.rgb * sample.a, blur.direction.w > 0.5) * w;
    weight += w;
  }
  return vec4f(sum / weight, 1.0);
}
`,de=`
struct Composite { strength: vec4f }
@group(0) @binding(0) var<uniform> composite: Composite;
@group(0) @binding(1) var sceneTexture: texture_2d<f32>;
@group(0) @binding(2) var glowTexture: texture_2d<f32>;
@group(0) @binding(3) var linearSampler: sampler;

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let scene = textureSampleLevel(sceneTexture, linearSampler, uv, 0.0).rgb;
  let glow = textureSampleLevel(glowTexture, linearSampler, uv, 0.0).rgb;
  return vec4f(scene + glow * composite.strength.x, 1.0);
}
`,fe=(e,t)=>{let n=typeof e==`string`?e.trim():``,r=(/^#?([\da-f]{3}|[\da-f]{6})$/i.exec(n)||/^#?([\da-f]{6})$/i.exec(t))[1];return r.length===3&&(r=r.replace(/./g,e=>e+e)),[0,2,4].map(e=>parseInt(r.slice(e,e+2),16)/255)};function v({text:e=``,fontFamily:l=`Geist, "Geist Sans", system-ui, sans-serif`,fontWeight:u=500,textSize:m=.6,shapes:h=`mixed`,cellSize:g=10,dotSize:v=.75,color:y=`#929292`,hoverColor:b=`#ffffff`,backgroundColor:x=`#000000`,speed:S=1,scale:C=1,contrast:w=1,brightness:T=.4,flow:E=0,direction:D=0,fade:O=.25,interactive:k=!0,splashRadius:A=40,splashStrength:j=.4,glow:M=.35,intro:N=!0,introDuration:P=1.6,introKey:F=0,paused:I=!1,onError:L,className:R=``}){let z=(0,d.useRef)(null),B=(0,d.useRef)(null),[V,pe]=(0,d.useState)(!1),H=(0,d.useRef)(null),U=(0,d.useRef)(()=>{}),W=(0,d.useRef)(()=>{}),G=(0,d.useRef)(L);H.current={text:String(e??``),fontFamily:l,fontWeight:u,textSize:m,shapes:h,cellSize:Math.max(2,g),dotSize:v,color:y,hoverColor:b,backgroundColor:x,speed:S,scale:Math.max(.05,C),contrast:w,brightness:T,flow:E,direction:D,fade:O,interactive:k,splashRadius:A,splashStrength:j,glow:M,intro:N,introDuration:Math.max(.1,P),introKey:F,paused:I},G.current=L;let K=[h,g,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,I].join(`|`),q=[e,l,u,m].join(`|`),me=(0,d.useRef)(()=>{});return(0,d.useEffect)(()=>{U.current()},[K]),(0,d.useEffect)(()=>{W.current()},[q]),(0,d.useEffect)(()=>{F&&me.current()},[F]),(0,d.useEffect)(()=>{let e=z.current,l=B.current;if(!e||!l)return;let u=!1,d=!1,f,m,h,g=0,v=0,y=0,b=[0,0],x=1,S=!0,C=!1,w=1,T=1,E=10,D=[0,0],O=new Float32Array(1),k=new Float32Array(1),A=new Float32Array(1),j=0,M=0,N=_,P=!1,F=!1,I=null,L,R,V,K=()=>{},q={x:0,y:0,at:0,inside:!1},J=window.matchMedia(`(prefers-reduced-motion: reduce)`),Y=document.createElement(`canvas`),X=Y.getContext(`2d`),Z=()=>K(),he=()=>{I=null},Q=(e,t,n)=>{let r=H.current,i=Math.max(.5,r.splashRadius*x/E*.5),a=Math.ceil(i*2.5),o=(e*x-D[0])/E-.5,s=(t*x-D[1])/E-.5,c=Math.max(0,Math.floor(s-a)),l=Math.min(T-1,Math.ceil(s+a)),u=Math.max(0,Math.floor(o-a)),d=Math.min(w-1,Math.ceil(o+a));for(let e=c;e<=l;e++){let t=e-s;for(let r=u;r<=d;r++){let a=r-o,s=n*Math.exp(-(a*a+t*t)/(2*i*i)),c=e*w+r;k[c]=Math.min(1.2,k[c]+s)}}F=!0},ge=t=>{if(!H.current.interactive)return;I||=e.getBoundingClientRect();let n=performance.now(),r=t.clientX-I.left,i=t.clientY-I.top,a=r>=0&&i>=0&&r<=I.width&&i<=I.height;if(a){let e=q.inside?Math.max(8,n-q.at):16,t=(q.inside?Math.hypot(r-q.x,i-q.y):0)/e*1e3;Q(r,i,Math.min(1,.22+t*6e-4)*H.current.splashStrength),K()}q.x=r,q.y=i,q.at=n,q.inside=a},_e=e=>{if(u||d)return;d=!0,g&&cancelAnimationFrame(g),g=0,R?.disconnect(),V?.disconnect(),L?.(),U.current=()=>{},W.current=()=>{};let t=f;f=void 0,t?.dispose(),pe(!1),G.current?.(e instanceof Error?e:Error(String(e)))},ve=()=>(x=Math.min(window.devicePixelRatio||1,p),[Math.max(1,Math.round(l.clientWidth*x)),Math.max(1,Math.round(l.clientHeight*x))]);return(async()=>{try{if(f=await a({powerPreference:`low-power`}),u)return f.dispose();L=f.onError(_e);let p=ve(),I=navigator.gpu.getPreferredCanvasFormat(),z=i(f,l,{dpr:x,size:p,autoResize:!1,format:I}),B=s(f,{resolution:[p[0],p[1],1/p[0],1/p[1]],placement:[0,0,1,0],grid:[10,.75,0,1],field:[320,.5,2.8,0],motion:[0,0,0,.25],color:[.573,.573,.573,1],hover:[1,1,1,0],background:[0,0,0,1]}),G=n(f,{minFilter:`linear`,magFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`}),q=(e,t)=>f.device.createTexture({size:[e,t],format:`rgba8unorm`,usage:[`texture_binding`,`copy_dst`,`render_attachment`],label:`shape-waves-mask`});m=q(1,1),h=r(f,4,`read`),h.write(O);let Q=c(f,le,{label:`shape-waves-scene`,set:{params:B,maskTexture:m,maskSampler:G,charges:h}}),$=t(f,{size:p,format:`rgba8unorm`,label:`shape-waves-scene`}),ye=e=>[Math.max(1,Math.ceil(e[0]/2)),Math.max(1,Math.ceil(e[1]/2))],be=t(f,{size:ye(p),format:`rgba8unorm`,label:`shape-waves-glow-a`}),xe=t(f,{size:ye(p),format:`rgba8unorm`,label:`shape-waves-glow-b`}),Se=s(f,{direction:[0,0,4,1]}),Ce=s(f,{direction:[0,0,4,0]}),we=c(f,ue,{label:`shape-waves-glow-x`,set:{blur:Se,sourceTexture:$,sourceSampler:G}}),Te=c(f,ue,{label:`shape-waves-glow-y`,set:{blur:Ce,sourceTexture:be,sourceSampler:G}}),Ee=s(f,{strength:[2,0,0,0]}),De=c(f,de,{label:`shape-waves-composite`,set:{composite:Ee,sceneTexture:$,glowTexture:xe,linearSampler:G}});if(await Promise.all([Q.compile({colors:[I]}),Q.compile($),we.compile(be),Te.compile(xe),De.compile({colors:[I]})]),u)return;let Oe=()=>H.current.glow>0,ke=!1,Ae=()=>{let e=H.current,[t,n]=z.size,i=Math.max(1,Math.round(t/(e.cellSize*x)));E=t/i;let a=Math.max(1,Math.floor(n/E));if(D=[0,(n-a*E)/2],i===w&&a===T&&O.length===w*T)return;w=i,T=a,O=new Float32Array(w*T),k=new Float32Array(w*T),A=new Float32Array(w*T),F=!1;let o=r(f,O.byteLength,`read`);o.write(O),Q.set({charges:o}),h.destroy(),h=o},je=()=>{let e=w-1,t=T-1,n=0;for(let r=0;r<T;r++){let i=(r===0?r:r-1)*w,a=(r===t?r:r+1)*w,o=r*w;for(let t=0;t<w;t++){let r=o+t,s=o+(t===0?t:t-1),c=o+(t===e?t:t+1),l=k[r],u=k[s]+k[c]+k[i+t]+k[a+t]-4*l,d=(l+(l-A[r])*oe+ae*u)*se;A[r]=d;let f=Math.min(1,Math.max(0,d));O[r]=f,f>n&&(n=f)}}let r=k;return k=A,A=r,n},Me=e=>{if(!F)return!1;j=Math.min(j+e,ie*4);let t=1;for(;j>=ie;)j-=ie,t=je();return t<ce&&(k.fill(0),A.fill(0),O.fill(0),F=!1),h.write(O),F},Ne=()=>{let e=H.current;return S&&!document.hidden&&!e.paused&&e.speed>0&&!J.matches},Pe=e=>{if(g=0,u||d)return;let t=H.current,n=v?Math.min(.1,(e-v)/1e3):0;v=e;let r=Ne();if(r){y+=n*re*t.speed;let e=t.direction*Math.PI/180,r=t.flow*E*n;b=[b[0]+Math.cos(e)*r,b[1]+Math.sin(e)*r]}let i=S&&!document.hidden&&Me(n);P&&(P=!1,M=e,N=0);let a=N<_;a&&(N=Math.min(_,(e-M)/1e3/t.introDuration*_)),B.set({placement:[D[0],D[1],T,N]}),B.set({field:[ne*E*t.scale,.5-(t.brightness-.5)*.4,2.8*t.contrast,y]}),B.set({motion:[b[0],b[1],+!!t.text.trim(),t.fade]});try{o(f,e=>{if(!Oe()){e.pass(z,Q);return}e.pass($,Q),e.pass(be,we),e.pass(xe,Te),e.pass(z,De)})}catch(e){_e(e);return}C||(C=!0,pe(!0)),r||i||a?g=requestAnimationFrame(Pe):v=0};K=()=>{u||d||g||(g=requestAnimationFrame(Pe))};let Fe=()=>{let e=H.current,t=e.text.trim(),[n,r]=z.size,i=t.length>0,a=i?Math.min(1,te/Math.max(n,r)):0,o=i?Math.max(1,Math.round(n*a)):1,s=i?Math.max(1,Math.round(r*a)):1;if(Y.width=o,Y.height=s,X.fillStyle=`#000`,X.fillRect(0,0,o,s),i){let n=Math.max(1,e.textSize*s);X.font=`${e.fontWeight} ${n}px ${e.fontFamily}`;let r=X.measureText(t).width,i=o*.9;r>i&&(n=Math.max(1,n*i/r),X.font=`${e.fontWeight} ${n}px ${e.fontFamily}`),X.textAlign=`center`,X.textBaseline=`middle`,X.fillStyle=`#fff`,X.fillText(t,o/2,s/2)}let c=q(o,s);f.gpu.queue.copyExternalImageToTexture({source:Y},{texture:c.gpu},[o,s]),Q.set({maskTexture:c}),m.destroy(),m=c},Ie=()=>{if(u||d)return;let e=H.current;Ae(),B.set({placement:[D[0],D[1],T,N],grid:[E,Math.min(1,Math.max(.1,e.dotSize)),ee[e.shapes]??0,w],color:[...fe(e.color,`#929292`),1],hover:[...fe(e.hoverColor,`#ffffff`),+!!Oe()],background:[...fe(e.backgroundColor,`#000000`),1]}),Ee.set({strength:[2*e.glow,0,0,0]}),e.intro!==ke&&(ke=e.intro,e.intro&&!J.matches&&(P=!0)),!e.interactive&&F&&(k.fill(0),A.fill(0),O.fill(0),F=!1,h.write(O)),K()},Le=()=>{if(u||d)return;Fe(),Ie();let e=H.current;!e.text.trim()||!document.fonts?.load||document.fonts.load(`${e.fontWeight} 32px ${e.fontFamily}`).then(()=>{u||d||(Fe(),K())}).catch(()=>{})},Re=()=>{if(u||d)return;he();let e=ve();(e[0]!==z.size[0]||e[1]!==z.size[1])&&z.resize(e);let[t,n]=z.size;$.resize([t,n]);let r=ye([t,n]);be.resize(r),xe.resize(r),Se.set({direction:[1/r[0],0,4,1]}),Ce.set({direction:[0,1/r[1],4,0]}),B.set({resolution:[t,n,1/t,1/n]}),Fe(),Ie()};U.current=Ie,W.current=Le,me.current=()=>{u||d||!H.current.intro||J.matches||(P=!0,K())},R=new ResizeObserver(Re),R.observe(e),V=new IntersectionObserver(e=>{S=e.some(e=>e.isIntersecting),S&&K()},{threshold:0}),V.observe(e),document.addEventListener(`visibilitychange`,Z),J.addEventListener(`change`,Z),window.addEventListener(`pointermove`,ge,{passive:!0}),window.addEventListener(`scroll`,he,{capture:!0,passive:!0}),Re(),Le()}catch(e){_e(e)}})(),()=>{u=!0,K=()=>{},U.current=()=>{},W.current=()=>{},me.current=()=>{},document.removeEventListener(`visibilitychange`,Z),J.removeEventListener(`change`,Z),window.removeEventListener(`pointermove`,ge),window.removeEventListener(`scroll`,he,{capture:!0}),R?.disconnect(),V?.disconnect(),L?.(),g&&cancelAnimationFrame(g),m?.destroy(),h?.destroy(),f?.dispose()}},[]),(0,f.jsx)(`div`,{ref:z,className:`shape-waves ${R}`,"data-ready":V,style:{backgroundColor:x},"aria-hidden":`true`,children:(0,f.jsx)(`canvas`,{ref:B,className:`shape-waves__canvas`})})}export{v as default};