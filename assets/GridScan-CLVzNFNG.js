const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/es6-DHz64Ghl.js","assets/chunk-aKtaBQYM.js"])))=>i.map(i=>d[i]);
import{i as e}from"./chunk-aKtaBQYM.js";import{_ as t,t as n,u as r}from"./index-B1HdRPAR.js";import{A as i,B as a,H as o,I as s,N as c,O as l,V as u,X as d,Z as f,d as p,n as ee,o as te,s as ne,t as m,u as h,y as g}from"./build-m8WTGXcF.js";var _=e(t(),1),v=r(),y=`
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,re=`
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uTilt;
uniform float uYaw;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uLineStyle;
uniform float uLineJitter;
uniform float uScanOpacity;
uniform float uScanDirection;
uniform float uNoise;
uniform float uBloomOpacity;
uniform float uScanGlow;
uniform float uScanSoftness;
uniform float uPhaseTaper;
uniform float uScanDuration;
uniform float uScanDelay;
uniform float uLightMode;
varying vec2 vUv;

uniform float uScanStarts[8];
uniform float uScanCount;

const int MAX_SCANS = 8;

float smoother01(float a, float b, float x){
  float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    vec3 ro = vec3(0.0);
    vec3 rd = normalize(vec3(p, 2.0));

    float cR = cos(uTilt), sR = sin(uTilt);
    rd.xy = mat2(cR, -sR, sR, cR) * rd.xy;

    float cY = cos(uYaw), sY = sin(uYaw);
    rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;

    vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
    rd.xy += skew * rd.z;

    vec3 color = vec3(0.0);
  float minT = 1e20;
  float gridScale = max(1e-5, uGridScale);
    float fadeStrength = 2.0;
    vec2 gridUV = vec2(0.0);

  float hitIsY = 1.0;
    for (int i = 0; i < 4; i++)
    {
        float isY = float(i < 2);
        float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
        float num = pos - (isY * ro.y + (1.0 - isY) * ro.x);
        float den = isY * rd.y + (1.0 - isY) * rd.x;
        float t = num / den;
        vec3 h = ro + rd * t;

        float depthBoost = smoothstep(0.0, 3.0, h.z);
        h.xy += skew * 0.15 * depthBoost;

    bool use = t > 0.0 && t < minT;
    gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
    minT = use ? t : minT;
    hitIsY = use ? isY : hitIsY;
    }

    vec3 hit = ro + rd * minT;
    float dist = length(hit - ro);

  float jitterAmt = clamp(uLineJitter, 0.0, 1.0);
  if (jitterAmt > 0.0) {
    vec2 j = vec2(
      sin(gridUV.y * 2.7 + iTime * 1.8),
      cos(gridUV.x * 2.3 - iTime * 1.6)
    ) * (0.15 * jitterAmt);
    gridUV += j;
  }
  float fx = fract(gridUV.x);
  float fy = fract(gridUV.y);
  float ax = min(fx, 1.0 - fx);
  float ay = min(fy, 1.0 - fy);
  float wx = fwidth(gridUV.x);
  float wy = fwidth(gridUV.y);
  float halfPx = max(0.0, uLineThickness) * 0.5;

  float tx = halfPx * wx;
  float ty = halfPx * wy;

  float aax = wx;
  float aay = wy;

  float lineX = 1.0 - smoothstep(tx, tx + aax, ax);
  float lineY = 1.0 - smoothstep(ty, ty + aay, ay);
  if (uLineStyle > 0.5) {
    float dashRepeat = 4.0;
    float dashDuty = 0.5;
    float vy = fract(gridUV.y * dashRepeat);
    float vx = fract(gridUV.x * dashRepeat);
    float dashMaskY = step(vy, dashDuty);
    float dashMaskX = step(vx, dashDuty);
    if (uLineStyle < 1.5) {
      lineX *= dashMaskY;
      lineY *= dashMaskX;
    } else {
      float dotRepeat = 6.0;
      float dotWidth = 0.18;
      float cy = abs(fract(gridUV.y * dotRepeat) - 0.5);
      float cx = abs(fract(gridUV.x * dotRepeat) - 0.5);
      float dotMaskY = 1.0 - smoothstep(dotWidth, dotWidth + fwidth(gridUV.y * dotRepeat), cy);
      float dotMaskX = 1.0 - smoothstep(dotWidth, dotWidth + fwidth(gridUV.x * dotRepeat), cx);
      lineX *= dotMaskY;
      lineY *= dotMaskX;
    }
  }
  float primaryMask = max(lineX, lineY);

  vec2 gridUV2 = (hitIsY > 0.5 ? hit.xz : hit.zy) / gridScale;
  if (jitterAmt > 0.0) {
    vec2 j2 = vec2(
      cos(gridUV2.y * 2.1 - iTime * 1.4),
      sin(gridUV2.x * 2.5 + iTime * 1.7)
    ) * (0.15 * jitterAmt);
    gridUV2 += j2;
  }
  float fx2 = fract(gridUV2.x);
  float fy2 = fract(gridUV2.y);
  float ax2 = min(fx2, 1.0 - fx2);
  float ay2 = min(fy2, 1.0 - fy2);
  float wx2 = fwidth(gridUV2.x);
  float wy2 = fwidth(gridUV2.y);
  float tx2 = halfPx * wx2;
  float ty2 = halfPx * wy2;
  float aax2 = wx2;
  float aay2 = wy2;
  float lineX2 = 1.0 - smoothstep(tx2, tx2 + aax2, ax2);
  float lineY2 = 1.0 - smoothstep(ty2, ty2 + aay2, ay2);
  if (uLineStyle > 0.5) {
    float dashRepeat2 = 4.0;
    float dashDuty2 = 0.5;
    float vy2m = fract(gridUV2.y * dashRepeat2);
    float vx2m = fract(gridUV2.x * dashRepeat2);
    float dashMaskY2 = step(vy2m, dashDuty2);
    float dashMaskX2 = step(vx2m, dashDuty2);
    if (uLineStyle < 1.5) {
      lineX2 *= dashMaskY2;
      lineY2 *= dashMaskX2;
    } else {
      float dotRepeat2 = 6.0;
      float dotWidth2 = 0.18;
      float cy2 = abs(fract(gridUV2.y * dotRepeat2) - 0.5);
      float cx2 = abs(fract(gridUV2.x * dotRepeat2) - 0.5);
      float dotMaskY2 = 1.0 - smoothstep(dotWidth2, dotWidth2 + fwidth(gridUV2.y * dotRepeat2), cy2);
      float dotMaskX2 = 1.0 - smoothstep(dotWidth2, dotWidth2 + fwidth(gridUV2.x * dotRepeat2), cx2);
      lineX2 *= dotMaskY2;
      lineY2 *= dotMaskX2;
    }
  }
    float altMask = max(lineX2, lineY2);

    float edgeDistX = min(abs(hit.x - (-0.5)), abs(hit.x - 0.5));
    float edgeDistY = min(abs(hit.y - (-0.2)), abs(hit.y - 0.2));
    float edgeDist = mix(edgeDistY, edgeDistX, hitIsY);
    float edgeGate = 1.0 - smoothstep(gridScale * 0.5, gridScale * 2.0, edgeDist);
    altMask *= edgeGate;

  float lineMask = max(primaryMask, altMask);

    float fade = exp(-dist * fadeStrength);

    float dur = max(0.05, uScanDuration);
    float del = max(0.0, uScanDelay);
    float scanZMax = 2.0;
    float widthScale = max(0.1, uScanGlow);
    float sigma = max(0.001, 0.18 * widthScale * uScanSoftness);
    float sigmaA = sigma * 2.0;

    float combinedPulse = 0.0;
    float combinedAura = 0.0;

    float cycle = dur + del;
    float tCycle = mod(iTime, cycle);
    float scanPhase = clamp((tCycle - del) / dur, 0.0, 1.0);
    float phase = scanPhase;
    if (uScanDirection > 0.5 && uScanDirection < 1.5) {
      phase = 1.0 - phase;
    } else if (uScanDirection > 1.5) {
      float t2 = mod(max(0.0, iTime - del), 2.0 * dur);
      phase = (t2 < dur) ? (t2 / dur) : (1.0 - (t2 - dur) / dur);
    }
    float scanZ = phase * scanZMax;
    float dz = abs(hit.z - scanZ);
    float lineBand = exp(-0.5 * (dz * dz) / (sigma * sigma));
    float taper = clamp(uPhaseTaper, 0.0, 0.49);
    float headW = taper;
    float tailW = taper;
    float headFade = smoother01(0.0, headW, phase);
    float tailFade = 1.0 - smoother01(1.0 - tailW, 1.0, phase);
    float phaseWindow = headFade * tailFade;
    float pulseBase = lineBand * phaseWindow;
    combinedPulse += pulseBase * clamp(uScanOpacity, 0.0, 1.0);
    float auraBand = exp(-0.5 * (dz * dz) / (sigmaA * sigmaA));
    combinedAura += (auraBand * 0.25) * phaseWindow * clamp(uScanOpacity, 0.0, 1.0);

    for (int i = 0; i < MAX_SCANS; i++) {
      if (float(i) >= uScanCount) break;
      float tActiveI = iTime - uScanStarts[i];
      float phaseI = clamp(tActiveI / dur, 0.0, 1.0);
      if (uScanDirection > 0.5 && uScanDirection < 1.5) {
        phaseI = 1.0 - phaseI;
      } else if (uScanDirection > 1.5) {
        phaseI = (phaseI < 0.5) ? (phaseI * 2.0) : (1.0 - (phaseI - 0.5) * 2.0);
      }
      float scanZI = phaseI * scanZMax;
      float dzI = abs(hit.z - scanZI);
      float lineBandI = exp(-0.5 * (dzI * dzI) / (sigma * sigma));
      float headFadeI = smoother01(0.0, headW, phaseI);
      float tailFadeI = 1.0 - smoother01(1.0 - tailW, 1.0, phaseI);
      float phaseWindowI = headFadeI * tailFadeI;
      combinedPulse += lineBandI * phaseWindowI * clamp(uScanOpacity, 0.0, 1.0);
      float auraBandI = exp(-0.5 * (dzI * dzI) / (sigmaA * sigmaA));
      combinedAura += (auraBandI * 0.25) * phaseWindowI * clamp(uScanOpacity, 0.0, 1.0);
    }

  float lineVis = lineMask;
  vec3 gridCol = uLinesColor * lineVis * fade;
  vec3 scanCol = uScanColor * combinedPulse;
  vec3 scanAura = uScanColor * combinedAura;

    color = gridCol + scanCol + scanAura;

  float n = fract(sin(dot(gl_FragCoord.xy + vec2(iTime * 123.4), vec2(12.9898,78.233))) * 43758.5453123);
  color += (n - 0.5) * uNoise;
  color = clamp(color, 0.0, 1.0);
  float alpha = clamp(max(lineVis, combinedPulse), 0.0, 1.0);
  float gx = 1.0 - smoothstep(tx * 2.0, tx * 2.0 + aax * 2.0, ax);
  float gy = 1.0 - smoothstep(ty * 2.0, ty * 2.0 + aay * 2.0, ay);
  float halo = max(gx, gy) * fade;
  alpha = max(alpha, halo * clamp(uBloomOpacity, 0.0, 1.0));
  if (uLightMode > 0.5) {
    float energy = max(max(color.r, color.g), color.b);
    float coverage = clamp(max(alpha, smoothstep(0.0, 0.55, energy) * 0.82), 0.0, 0.9);
    coverage *= smoothstep(0.015, 0.12, energy);
    vec3 chroma = clamp(color / max(energy, 0.0001), 0.0, 1.0);
    chroma = pow(chroma, vec3(1.2));
    fragColor = vec4(mix(vec3(1.0), chroma, coverage * 0.94), 1.0);
  } else {
    fragColor = vec4(color, alpha);
  }
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`,b=({enableWebcam:e=!1,showPreview:t=!1,modelsPath:r=`https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights`,sensitivity:g=.55,lineThickness:b=1,linesColor:T=`#2F293A`,scanColor:E=`#FF9FFC`,scanOpacity:D=.4,gridScale:se=.1,lineStyle:O=`solid`,lineJitter:k=.1,scanDirection:A=`pingpong`,enablePost:ce=!0,bloomIntensity:j=0,bloomThreshold:M=0,bloomSmoothing:N=0,chromaticAberration:P=.002,noiseIntensity:F=.01,scanGlow:I=.5,scanSoftness:L=2,scanPhaseTaper:R=.9,scanDuration:z=2,scanDelay:B=2,enableGyro:V=!1,scanOnClick:H=!1,snapBackDelay:le=250,lightMode:U=!1,className:ue,style:de})=>{let fe=(0,_.useRef)(null),pe=(0,_.useRef)(null),me=(0,_.useRef)(null),he=(0,_.useRef)(null),W=(0,_.useRef)(null),G=(0,_.useRef)(null),K=(0,_.useRef)(null),ge=(0,_.useRef)(null),q=(0,_.useRef)(null),[_e,ve]=(0,_.useState)(!1),[J,ye]=(0,_.useState)(!1),Y=(0,_.useRef)(new d(0,0)),X=(0,_.useRef)(0),be=(0,_.useRef)(0),Z=(0,_.useRef)(new d(0,0)),xe=(0,_.useRef)(new d(0,0)),Se=(0,_.useRef)(0),Ce=(0,_.useRef)(0),we=(0,_.useRef)(0),Te=(0,_.useRef)(0),Ee=(0,_.useRef)([]),De=e=>{let t=Ee.current.slice();if(t.length>=8&&t.shift(),t.push(e),Ee.current=t,W.current){let e=W.current.uniforms,n=Array(8).fill(0);for(let e=0;e<t.length&&e<8;e++)n[e]=t[e];e.uScanStarts.value=n,e.uScanCount.value=t.length}},Oe=(0,_.useRef)([]),ke=(0,_.useRef)([]),Ae=(0,_.useRef)([]),je=(0,_.useRef)([]),Q=l.clamp(g,0,1),Me=l.lerp(.06,.2,Q),Ne=l.lerp(.12,.3,Q),Pe=l.lerp(.1,.28,Q),Fe=l.lerp(.25,.45,Q),Ie=l.lerp(.45,.12,Q),$=1/0,Le=l.lerp(1.2,1.6,Q);return(0,_.useEffect)(()=>{let e=fe.current;if(!e)return;let t=null,n=n=>{if(J)return;t&&=(clearTimeout(t),null);let r=e.getBoundingClientRect(),i=(n.clientX-r.left)/r.width*2-1,a=-((n.clientY-r.top)/r.height*2-1);Y.current.set(i,a)},r=async()=>{let e=performance.now()/1e3;if(H&&De(e),V&&typeof window<`u`&&window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission)try{await DeviceOrientationEvent.requestPermission()}catch{}},i=()=>{t&&=(clearTimeout(t),null)},a=()=>{J||(t&&clearTimeout(t),t=window.setTimeout(()=>{Y.current.set(0,0),X.current=0,be.current=0},Math.max(0,le||0)))};return e.addEventListener(`mousemove`,n),e.addEventListener(`mouseenter`,i),H&&e.addEventListener(`click`,r),e.addEventListener(`mouseleave`,a),()=>{e.removeEventListener(`mousemove`,n),e.removeEventListener(`mouseenter`,i),e.removeEventListener(`mouseleave`,a),H&&e.removeEventListener(`click`,r),t&&clearTimeout(t)}},[J,le,H,V]),(0,_.useEffect)(()=>{let e=fe.current;if(!e)return;let t=new p({antialias:!0,alpha:!0});he.current=t,t.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.setSize(e.clientWidth,e.clientHeight),t.outputColorSpace=a,t.toneMapping=0,t.autoClear=!1,t.setClearColor(0,0),e.appendChild(t.domElement);let n=new o({uniforms:{iResolution:{value:new f(e.clientWidth,e.clientHeight,t.getPixelRatio())},iTime:{value:0},uSkew:{value:new d(0,0)},uTilt:{value:0},uYaw:{value:0},uLineThickness:{value:b},uLinesColor:{value:x(T)},uScanColor:{value:x(E)},uGridScale:{value:se},uLineStyle:{value:O===`dashed`?1:O===`dotted`?2:0},uLineJitter:{value:Math.max(0,Math.min(1,k||0))},uScanOpacity:{value:D},uNoise:{value:F},uBloomOpacity:{value:j},uScanGlow:{value:I},uScanSoftness:{value:L},uPhaseTaper:{value:R},uScanDuration:{value:z},uScanDelay:{value:B},uScanDirection:{value:A===`backward`?1:A===`pingpong`?2:0},uScanStarts:{value:Array(8).fill(0)},uScanCount:{value:0},uLightMode:{value:+!!U}},vertexShader:y,fragmentShader:re,transparent:!0,depthWrite:!1,depthTest:!1});W.current=n;let r=new u,g=new c(-1,1,1,-1,0,1),_=new i(new s(2,2),n);r.add(_);let v=null;if(ce){v=new te(t),G.current=v;let e=new h(r,g);v.addPass(e);let n=new m({intensity:1,luminanceThreshold:M,luminanceSmoothing:N});n.blendMode.opacity.value=Math.max(0,j),K.current=n;let i=new ee({offset:new d(P,P),radialModulation:!0,modulationOffset:0});ge.current=i;let a=new ne(g,n,i);a.renderToScreen=!0,v.addPass(a)}let S=()=>{t.setSize(e.clientWidth,e.clientHeight),n.uniforms.iResolution.value.set(e.clientWidth,e.clientHeight,t.getPixelRatio()),G.current&&G.current.setSize(e.clientWidth,e.clientHeight)};window.addEventListener(`resize`,S);let C=performance.now(),w=()=>{let e=performance.now(),i=Math.max(0,Math.min(.1,(e-C)/1e3));C=e,Z.current.copy(ie(Z.current,Y.current,xe.current,Ie,$,i));let a=ae(Se.current,X.current,{v:Ce.current},Ie,$,i);Se.current=a.value,Ce.current=a.v;let o=ae(we.current,be.current,{v:Te.current},Ie,$,i);we.current=o.value,Te.current=o.v;let s=new d(Z.current.x*Me,-Z.current.y*Le*Me);n.uniforms.uSkew.value.set(s.x,s.y),n.uniforms.uTilt.value=Se.current*Ne,n.uniforms.uYaw.value=l.clamp(we.current*Pe,-.6,.6),n.uniforms.iTime.value=e/1e3,t.clear(!0,!0,!0),G.current?G.current.render(i):t.render(r,g),q.current=requestAnimationFrame(w)};return q.current=requestAnimationFrame(w),()=>{q.current&&cancelAnimationFrame(q.current),window.removeEventListener(`resize`,S),n.dispose(),_.geometry.dispose(),G.current&&=(G.current.dispose(),null),t.dispose(),t.forceContextLoss(),e.removeChild(t.domElement)}},[g,b,T,E,D,se,O,k,A,ce,F,j,I,L,R,z,B,M,N,P,Ie,$,Me,Le,Ne,Pe,U]),(0,_.useEffect)(()=>{let e=W.current;if(e){let t=e.uniforms;t.uLineThickness.value=b,t.uLinesColor.value.copy(x(T)),t.uScanColor.value.copy(x(E)),t.uGridScale.value=se,t.uLineStyle.value=O===`dashed`?1:O===`dotted`?2:0,t.uLineJitter.value=Math.max(0,Math.min(1,k||0)),t.uBloomOpacity.value=Math.max(0,j),t.uNoise.value=Math.max(0,F),t.uScanGlow.value=I,t.uScanOpacity.value=Math.max(0,Math.min(1,D)),t.uScanDirection.value=A===`backward`?1:A===`pingpong`?2:0,t.uScanSoftness.value=L,t.uPhaseTaper.value=R,t.uScanDuration.value=Math.max(.05,z),t.uScanDelay.value=Math.max(0,B),t.uLightMode.value=+!!U}K.current&&(K.current.blendMode.opacity.value=Math.max(0,j),K.current.luminanceMaterial.threshold=M,K.current.luminanceMaterial.smoothing=N),ge.current&&ge.current.offset.set(P,P)},[b,T,E,se,O,k,j,M,N,P,F,I,D,A,L,R,z,B,U]),(0,_.useEffect)(()=>{if(!V)return;let e=e=>{if(J)return;let t=e.gamma??0,n=e.beta??0,r=l.clamp(t/45,-1,1),i=l.clamp(-n/30,-1,1);Y.current.set(r,i),X.current=l.degToRad(t)*.4};return window.addEventListener(`deviceorientation`,e),()=>{window.removeEventListener(`deviceorientation`,e)}},[V,J]),(0,_.useEffect)(()=>{if(!e){ve(!1);return}let t=!1;return(async()=>{try{let e=await n(()=>import(`./es6-DHz64Ghl.js`),__vite__mapDeps([0,1]));me.current=e,await Promise.all([e.nets.tinyFaceDetector.loadFromUri(r),e.nets.faceLandmark68TinyNet.loadFromUri(r)]),t||ve(!0)}catch{t||ve(!1)}})(),()=>{t=!0}},[e,r]),(0,_.useEffect)(()=>{let t=!1,n=0,r=pe.current;return(async()=>{if(!e||!_e||!r)return;let i=me.current;if(!i)return;try{r.srcObject=await navigator.mediaDevices.getUserMedia({video:{facingMode:`user`,width:{ideal:1280},height:{ideal:720}},audio:!1}),await r.play()}catch{return}let a=new i.TinyFaceDetectorOptions({inputSize:320,scoreThreshold:.5}),o=async e=>{if(!t){if(e-n>=33){n=e;try{let e=await i.detectSingleFace(r,a).withFaceLandmarks(!0);if(e&&e.detection){let t=e.detection.box,n=r.videoWidth||1,i=r.videoHeight||1,a=t.x+t.width*.5,o=t.y+t.height*.5,s=a/n*2-1,c=o/i*2-1;S(Oe.current,s,5),S(ke.current,c,5);let u=C(Oe.current),f=C(ke.current),p=new d(Math.tanh(u),Math.tanh(f)),ee=1+Fe*(Math.min(1,Math.hypot(t.width/n,t.height/i))-.25);Y.current.copy(p.multiplyScalar(ee));let te=e.landmarks.getLeftEye(),ne=e.landmarks.getRightEye(),m=w(te),h=w(ne),g=Math.atan2(h.y-m.y,h.x-m.x);S(Ae.current,g,5),X.current=C(Ae.current);let _=e.landmarks.getNose(),v=_[_.length-1]||_[Math.floor(_.length/2)],y=e.landmarks.getJawOutline(),re=y[3]||y[2],b=y[13]||y[14],x=oe(v,re),ie=oe(v,b),ae=Math.hypot(h.x-m.x,h.y-m.y)+1e-6,T=l.clamp((ie-x)/(ae*1.6),-1,1);T=Math.tanh(T),S(je.current,T,5),be.current=C(je.current),ye(!0)}else ye(!1)}catch{ye(!1)}}`requestVideoFrameCallback`in HTMLVideoElement.prototype?r.requestVideoFrameCallback(()=>o(performance.now())):requestAnimationFrame(o)}};requestAnimationFrame(o)})(),()=>{if(t=!0,r){let e=r.srcObject;e&&e.getTracks().forEach(e=>e.stop()),r.pause(),r.srcObject=null}}},[e,_e,Fe]),(0,v.jsx)(`div`,{ref:fe,className:`gridscan${ue?` ${ue}`:``}`,style:de,children:t&&(0,v.jsxs)(`div`,{className:`gridscan__preview`,children:[(0,v.jsx)(`video`,{ref:pe,muted:!0,playsInline:!0,autoPlay:!0,className:`gridscan__video`}),(0,v.jsx)(`div`,{className:`gridscan__badge`,children:e?_e?J?`Face: tracking`:`Face: searching`:`Loading models`:`Webcam disabled`})]})})};function x(e){return new g(e).convertSRGBToLinear()}function ie(e,t,n,r,i,a){let o=e.clone();r=Math.max(1e-4,r);let s=2/r,c=s*a,l=1/(1+c+.48*c*c+.235*c*c*c),u=e.clone().sub(t),d=t.clone(),f=i*r;u.length()>f&&u.setLength(f),t=e.clone().sub(u);let p=n.clone().addScaledVector(u,s).multiplyScalar(a);n.sub(p.clone().multiplyScalar(s)),n.multiplyScalar(l),o.copy(t.clone().add(u.add(p).multiplyScalar(l)));let ee=d.clone().sub(e),te=o.clone().sub(d);return ee.dot(te)>0&&(o.copy(d),n.set(0,0)),o}function ae(e,t,n,r,i,a){r=Math.max(1e-4,r);let o=2/r,s=o*a,c=1/(1+s+.48*s*s+.235*s*s*s),l=e-t,u=t,d=i*r;l=Math.sign(l)*Math.min(Math.abs(l),d),t=e-l;let f=(n.v+o*l)*a;n.v=(n.v-o*f)*c;let p=t+(l+f)*c;return(u-e)*(p-u)>0&&(p=u,n.v=0),{value:p,v:n.v}}function S(e,t,n){e.push(t),e.length>n&&e.shift()}function C(e){if(e.length===0)return 0;let t=[...e].sort((e,t)=>e-t),n=Math.floor(t.length/2);return t.length%2?t[n]:(t[n-1]+t[n])*.5}function w(e){let t=0,n=0,r=e.length||1;for(let r of e)t+=r.x,n+=r.y;return{x:t/r,y:n/r}}function oe(e,t){return Math.hypot(e.x-t.x,e.y-t.y)}export{b as GridScan};