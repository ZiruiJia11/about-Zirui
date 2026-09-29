import{_ as e,u as t,x as n}from"./index-B_kd6iZH.js";import{X as r,a as i,q as a,y as o}from"./build-ZsO7ED-F.js";import{c as s,i as c,n as l,o as u,r as d}from"./dist-Dw9CsEck.js";var f=n(e(),1),p=t(),m=`
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`,h=`
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec3 backgroundColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2)); 
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = pattern(uv);
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  vec3 col = mix(backgroundColor, waveColor, clamp(f, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`,g=`
precision highp float;
uniform float colorNum;
uniform float pixelSize;
const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  color += threshold * step;
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float bias = mix(0.2, 0.0, smoothstep(0.45, 0.8, luminance));
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = texture2D(inputBuffer, uvPixel);
  color.rgb = dither(uv, color.rgb);
  outputColor = color;
}
`,_=d(class extends i{constructor(){let e=new Map([[`colorNum`,new a(4)],[`pixelSize`,new a(2)]]);super(`RetroEffect`,g,{uniforms:e}),this.uniforms=e}set colorNum(e){this.uniforms.get(`colorNum`).value=e}get colorNum(){return this.uniforms.get(`colorNum`).value}set pixelSize(e){this.uniforms.get(`pixelSize`).value=e}get pixelSize(){return this.uniforms.get(`pixelSize`).value}}),v=(0,f.forwardRef)((e,t)=>{let{colorNum:n,pixelSize:r}=e;return(0,p.jsx)(_,{ref:t,colorNum:n,pixelSize:r})});v.displayName=`RetroEffect`;function y({waveSpeed:e,waveFrequency:t,waveAmplitude:n,waveColor:i,backgroundColor:c,colorNum:d,pixelSize:g,disableAnimation:_,enableMouseInteraction:y,mouseRadius:b}){let x=(0,f.useRef)(null),S=(0,f.useRef)(new r),{viewport:C,size:w,gl:T}=s(),E=(0,f.useRef)({time:new a(0),resolution:new a(new r(0,0)),waveSpeed:new a(e),waveFrequency:new a(t),waveAmplitude:new a(n),waveColor:new a(new o(...i)),backgroundColor:new a(new o(...c)),mousePos:new a(new r(0,0)),enableMouseInteraction:new a(+!!y),mouseRadius:new a(b)});(0,f.useEffect)(()=>{let e=T.getPixelRatio(),t=Math.floor(w.width*e),n=Math.floor(w.height*e),r=E.current.resolution.value;(r.x!==t||r.y!==n)&&r.set(t,n)},[w,T]);let D=(0,f.useRef)([...i]),O=(0,f.useRef)([...c]);return u(({clock:r})=>{let a=E.current;_||(a.time.value=r.getElapsedTime()),a.waveSpeed.value!==e&&(a.waveSpeed.value=e),a.waveFrequency.value!==t&&(a.waveFrequency.value=t),a.waveAmplitude.value!==n&&(a.waveAmplitude.value=n),D.current.every((e,t)=>e===i[t])||(a.waveColor.value.set(...i),D.current=[...i]),O.current.every((e,t)=>e===c[t])||(a.backgroundColor.value.set(...c),O.current=[...c]),a.enableMouseInteraction.value=+!!y,a.mouseRadius.value=b,y&&a.mousePos.value.copy(S.current)}),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(`mesh`,{ref:x,scale:[C.width,C.height,1],children:[(0,p.jsx)(`planeGeometry`,{args:[1,1]}),(0,p.jsx)(`shaderMaterial`,{vertexShader:m,fragmentShader:h,uniforms:E.current})]}),(0,p.jsx)(l,{children:(0,p.jsx)(v,{colorNum:d,pixelSize:g})}),(0,p.jsxs)(`mesh`,{onPointerMove:e=>{if(!y)return;let t=T.domElement.getBoundingClientRect(),n=T.getPixelRatio();S.current.set((e.clientX-t.left)*n,(e.clientY-t.top)*n)},position:[0,0,.01],scale:[C.width,C.height,1],visible:!1,children:[(0,p.jsx)(`planeGeometry`,{args:[1,1]}),(0,p.jsx)(`meshBasicMaterial`,{transparent:!0,opacity:0})]})]})}function b({waveSpeed:e=.05,waveFrequency:t=3,waveAmplitude:n=.3,waveColor:r=[.5,.5,.5],backgroundColor:i=[0,0,0],colorNum:a=4,pixelSize:o=2,disableAnimation:s=!1,enableMouseInteraction:l=!0,mouseRadius:u=1}){return(0,p.jsx)(c,{className:`dither-container`,camera:{position:[0,0,6]},dpr:1,gl:{antialias:!0,preserveDrawingBuffer:!0},children:(0,p.jsx)(y,{waveSpeed:e,waveFrequency:t,waveAmplitude:n,waveColor:r,backgroundColor:i,colorNum:a,pixelSize:o,disableAnimation:s,enableMouseInteraction:l,mouseRadius:u})})}export{b as default};