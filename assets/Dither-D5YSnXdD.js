import{_ as e,u as t,x as n}from"./index-Da3YUQbu.js";import{B as r,L as i,c as a,m as o}from"./three.module-D_NQwzCV.js";import{a as s,n as c,r as l,t as u}from"./react-three-fiber.esm-keitgBEZ.js";import{a as d,c as f,i as p,l as m,o as ee,r as h,s as g,u as _}from"./build-CuaUMjk8.js";var v=n(e(),1),y=t();function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}new r,new r;function x(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)}var S=function e(t,n,r){var i=this;x(this,e),b(this,`dot2`,function(e,t){return i.x*e+i.y*t}),b(this,`dot3`,function(e,t,n){return i.x*e+i.y*t+i.z*n}),this.x=t,this.y=n,this.z=r},C=[new S(1,1,0),new S(-1,1,0),new S(1,-1,0),new S(-1,-1,0),new S(1,0,1),new S(-1,0,1),new S(1,0,-1),new S(-1,0,-1),new S(0,1,1),new S(0,-1,1),new S(0,1,-1),new S(0,-1,-1)],w=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],T=Array(512),E=Array(512);(function(e){e>0&&e<1&&(e*=65536),e=Math.floor(e),e<256&&(e|=e<<8);for(var t=0;t<256;t++){var n=t&1?w[t]^e&255:w[t]^e>>8&255;T[t]=T[t+256]=n,E[t]=E[t+256]=C[n%12]}})(0),.5*(Math.sqrt(3)-1),(3-Math.sqrt(3))/6,Math.PI*2;function D(e){if(typeof e==`number`)e=Math.abs(e);else if(typeof e==`string`){var t=e;e=0;for(var n=0;n<t.length;n++)e=(e+(n+1)*(t.charCodeAt(n)%96))%2147483647}return e===0&&(e=311),e}function O(e){var t=D(e);return function(){var e=t*48271%2147483647;return t=e,e/2147483647}}new function e(t){var n=this;x(this,e),b(this,`seed`,0),b(this,`init`,function(e){n.seed=e,n.value=O(e)}),b(this,`value`,O(this.seed)),this.init(t)}(Math.random());function k(e){return e&&e.__esModule?e.default:e}var A={};A=JSON.parse(`{"architecture":"attention-v3-int8","formatVersion":3,"globalBias":[-0.32877659797668457,0.4370867609977722,-0.05251404270529747,1.3072023391723633,0.0477047860622406,0.24477416276931763,0.009111796505749226,-0.17459993064403534],"globalFeatureInverseStandardDeviation":[10.771836280822754,1.9548665285110474,1.612365484237671],"globalFeatureMean":[0.9198138117790222,-0.49808526039123535,0.03374629095196724],"globalWeights":[101,-4,7,-127,6,-11,3,1,0,-16,-7,8,-8,-1,7,-4,0,0,-12,-3,-13,1,0,2],"headBias":[-0.15895532071590424,0.007501596584916115,-0.47742825746536255,0.01632097363471985,-0.48355796933174133,-0.1052703931927681,-0.8414919376373291,-0.21046382188796997],"headWeights":[-45,-7,-45,-20,7,-13,120,-24,-15,-26,-19,1,27,-48,-4,-10,1,-5,-24,64,91,-1,-68,39,54,39,101,-40,-127,64,-41,-17,-23,-19,3,35,-2,33,3,9,-64,-32,30,42,-112,12,28,-11,15,2,-4,-7,7,-3,-5,1,76,48,-34,-67,103,-40,-26,1,58,-11,46,-41,5,-6,-17,-8,13,17,-35,45,27,-17,-28,7,-53,12,-51,6,-32,-5,58,-9,-28,-21,37,-12,1,20,2,2,11,7,-4,-9,2,-15,-1,-8,16,12,-27,-1,61,-5,-1,4,-7,-2,7,4,1,4,-2,4,-18,-16,28,6,-65,16,3,-3,-5,-2,0,-40,-21,-22,14,30,-21,49,15,-64,43,19,23,18,5,-15,21,21,30,17,-11,-6,22,-38,-20,97,-46,-5,-13,-59,26,-13,11,-2,-10,-8,2,-15,-17,-27,-9,26,7,-7,6,9,-32,5,-9,12,49,17,-1,24,20,35,14,-33,-50,-1,-4,-26,11,11,9,-80,30,9,36,6,-12,-4,-7,39,-10,-30,-49,1,-43,-20,-34,76,-36,-10,15,-8,43,31,38,-42,39,37,-7,7,8,16,28,-83,32,9,23,-13,39,119,23,-127,-24,8,-48,-29,-7,-33,-12,58,-24,-29,-19,12,-55,-90,0,126,26,42,54,22],"keyProjectionWeights":[0,-1,-1,1,1,1,1,1,-64,32,49,23,-25,4,27,-22,0,1,-1,-1,-1,1,1,0,-34,38,64,88,13,-53,-41,58,-7,-4,79,-41,27,26,14,2,-2,1,1,1,-1,-1,1,1,1,-1,-1,-1,-1,-1,1,1,4,-3,126,42,-40,-116,35,20],"name":"residual-attention-v3-50m-qat-int8-epoch-25-zo-278w","outputBias":-0.0005526235327124596,"outputWeights":[11,11,14,-27,9,-22,127,6],"quantization":{"scales":{"globalWeight":0.021090541950849095,"headWeight":0.04935851140909355,"keyWeight":0.1733924937791441,"outputWeight":0.0030087142047955295,"tapInputWeight":0.1096231754049479,"tapOutputWeight":0.017949438644286102,"valueWeight":0.013986751242596301},"scheme":"symmetric-int8-per-tensor","zeroPoint":0},"summaryQueries":[0.0038647791370749474,0.09565000981092453,0.002756686182692647,-0.08183622360229492,-0.15209506452083588,-0.0006105066277086735,0.0010439646430313587,-0.03020688332617283,0.005065929610282183,0.14488759636878967,0.003160916268825531,-0.0855727270245552,-0.3123375475406647,0.00039022407145239413,0.0037786494940519333,0.1451321840286255,-0.002009483054280281,0.0597594790160656,0.0045239729806780815,-0.08765853196382523,-0.13884992897510529,-0.0021647117100656033,0.003985927440226078,0.09727758169174194,0.007170629221946001,0.0786278173327446,0.004103775601834059,-0.1198369711637497,-0.2925199568271637,-0.002055276418104768,0.0030450925696641207,0.14401987195014954],"supportedDenoiseSamples":[4,8,16],"tapFeatureInverseStandardDeviation":[2.283243417739868,0.8810898065567017,0.8210930228233337,3.752316474914551,3.6375720500946045,2.670454978942871,10.249449729919434,0.12639354169368744,100],"tapFeatureMean":[0.010318092070519924,0.01364430133253336,0.13411010801792145,-0.004725644364953041,0.10053129494190216,0.8384788632392883,0.9203217625617981,1.7139031887054443,1],"tapInputBias":[0.4780646860599518,-0.45214661955833435,0.289407879114151,0.34804567694664,-0.1320028454065323,0.17722633481025696,0.011480014771223068,-0.26692497730255127],"tapInputWeights":[0,1,7,0,-1,-7,0,31,-2,-1,14,-126,0,0,-1,2,26,-2,0,66,-73,0,0,0,-12,22,-3,0,-76,-90,0,-1,-7,-3,58,-1,0,2,6,0,0,3,4,-40,0,0,3,-13,0,0,1,-7,-13,0,0,-7,10,0,-2,-7,0,-39,-2,0,-13,-19,0,-2,20,-1,3,-1],"tapOutputBias":[-0.3867710530757904,0.1349504142999649,0.35706064105033875,-0.5938405394554138,-0.031154220923781395,1.4079623222351074,-1.9221038818359375,0.6029739379882812],"tapOutputWeights":[18,-4,47,19,74,-94,-21,-9,73,-59,88,-10,-3,71,-7,24,20,74,24,-31,-12,-10,-15,-45,-126,2,-4,27,-5,24,35,-11,-4,9,-8,26,-10,27,26,-20,17,-50,5,-35,0,-5,12,-71,89,-58,22,-83,-115,7,-16,-89,89,22,1,-20,-22,-25,-26,44],"valueProjectionWeights":[-16,-6,40,-17,84,-76,59,51,-10,-2,-10,-1,-23,74,-70,23,-5,4,4,-7,-77,127,20,-48,-36,4,-17,-12,-4,10,29,-27,-2,11,-47,-50,-54,-3,14,11,-23,-1,109,31,4,-100,-33,-36,-19,0,-8,20,-35,-24,79,2,44,2,5,7,22,-70,-67,-35]}`);var j=[[`tapInputWeight`,`tapInputWeights`,8,9],[`tapOutputWeight`,`tapOutputWeights`,8,8],[`globalWeight`,`globalWeights`,8,3],[`keyWeight`,`keyProjectionWeights`,8,8],[`valueWeight`,`valueProjectionWeights`,8,8],[`headWeight`,`headWeights`,8,32],[`outputWeight`,`outputWeights`,1,8]],M=e=>{let t=k(A).quantization?.scales?.[e];if(!(t>0)||!Number.isFinite(t))throw Error(`The bundled N8AO neural model has no valid ${e} scale.`);return t};if(k(A).architecture!==`attention-v3-int8`||k(A).formatVersion!==3||k(A).quantization?.scheme!==`symmetric-int8-per-tensor`||k(A).quantization?.zeroPoint!==0||k(A).supportedDenoiseSamples?.join(`,`)!==`4,8,16`||j.some(([,e,t,n])=>k(A)[e]?.length!==t*n||k(A)[e].some(e=>!Number.isInteger(e)||e<-127||e>127)))throw Error(`The bundled N8AO neural denoise model has an unsupported layout.`);var N=e=>{if(!Number.isFinite(e))throw Error(`The bundled N8AO neural model contains a non-finite value.`);if(Object.is(e,-0))return`0.0`;let t=Number(e).toString();return/[.eE]/.test(t)?t:`${t}.0`},P=[`x`,`y`,`z`,`w`],F=e=>[...P.map(t=>`${e}.lo.${t}`),...P.map(t=>`${e}.hi.${t}`)],I=(e,t)=>e===0?null:e===1?t:e===-1?`(-${t})`:e<0?`(-${N(-e)} * ${t})`:`${N(e)} * ${t}`,L=(e,t)=>e===0?null:`${N(e)} * ${t}`,R=e=>e.filter(Boolean).join(` + `)||`0.0`,z=(e,t,n,r,i,a)=>{let o=r.map((r,i)=>I(e[t*n+i],r));return`${N(i)} * (${R(o)}) + ${N(a[t])}`},B=(e,t=`        `)=>`vec4(\n${e.map(e=>`${t}    ${e}`).join(`,
`)}\n${t})`,V=({functionName:e,scaleName:t,weights:n,bias:r,width:i=8,relu:a=!1})=>{let o=F(`inputToken`),s=M(t),c=Array.from({length:8},(e,t)=>z(n,t,i,o,s,r)),l=B(c.slice(0,4)),u=B(c.slice(4)),d=e=>a?`max(${e}, vec4(0.0))`:e;return`
    NeuralToken neural${e[0].toUpperCase()}${e.slice(1)}(NeuralToken inputToken) {
        return NeuralToken(
            ${d(l)},
            ${d(u)}
        );
    }
`},H=(e,t,n,r,i,a,o,s={})=>Array.from({length:i},(i,c)=>{let l=t[c];for(let t=0;t<a;t++){let i=e[c*a+t]*o;l-=i*r[t]*n[t],Object.hasOwn(s,t)&&(l+=i*r[t]*s[t])}return l}),U=M(`tapInputWeight`),te=H(k(A).tapInputWeights,k(A).tapInputBias,k(A).tapFeatureMean,k(A).tapFeatureInverseStandardDeviation,8,9,U,{8:1}),ne=F(`scaledInput`),W=Array.from({length:8},(e,t)=>z(k(A).tapInputWeights,t,9,ne,U,te)),re=`
    NeuralToken neuralTapInput(NeuralToken raw) {
        NeuralToken scaledInput = NeuralToken(
            raw.lo * ${B(k(A).tapFeatureInverseStandardDeviation.slice(0,4),`            `)},
            raw.hi * ${B(k(A).tapFeatureInverseStandardDeviation.slice(4,8),`            `)}
        );
        return NeuralToken(
            max(${B(W.slice(0,4))}, vec4(0.0)),
            max(${B(W.slice(4))}, vec4(0.0))
        );
    }
`,G=M(`globalWeight`),ie=H(k(A).globalWeights,k(A).globalBias,k(A).globalFeatureMean,k(A).globalFeatureInverseStandardDeviation,8,3,G),ae=P.slice(0,3).map(e=>`scaledInput.${e}`),K=Array.from({length:8},(e,t)=>z(k(A).globalWeights,t,3,ae,G,ie)),oe=`
    NeuralToken neuralEncodeGlobal(vec4 raw) {
        vec3 scaledInput = raw.xyz * vec3(
            ${k(A).globalFeatureInverseStandardDeviation.map(N).join(`, `)}
        );
        return NeuralToken(
            max(${B(K.slice(0,4))}, vec4(0.0)),
            max(${B(K.slice(4))}, vec4(0.0))
        );
    }
`,se=F(`key`),ce=`
    vec4 neuralQueryScores(NeuralToken key) {
        return ${B(Array.from({length:4},(e,t)=>R(se.map((e,n)=>L(k(A).summaryQueries[t*8+n],e)))))};
    }
`,q=[];for(let e=0;e<4;e++)q.push(...P.map(t=>`runningSummaryLo[${e}].${t}`),...P.map(t=>`runningSummaryHi[${e}].${t}`));var le=M(`headWeight`),J=Array.from({length:8},(e,t)=>z(k(A).headWeights,t,32,q,le,k(A).headBias)),ue=`
    NeuralToken neuralHead(
        vec4 runningSummaryLo[4],
        vec4 runningSummaryHi[4]
    ) {
        return NeuralToken(
            max(${B(J.slice(0,4))}, vec4(0.0)),
            max(${B(J.slice(4))}, vec4(0.0))
        );
    }
`,de=`
    float neuralOutput(NeuralToken head) {
        return ${z(k(A).outputWeights,0,8,F(`head`),M(`outputWeight`),[k(A).outputBias])};
    }
`,fe=[re,V({functionName:`tapOutput`,scaleName:`tapOutputWeight`,weights:k(A).tapOutputWeights,bias:k(A).tapOutputBias,relu:!0}),oe,V({functionName:`keyProject`,scaleName:`keyWeight`,weights:k(A).keyProjectionWeights,bias:Array(8).fill(0)}),V({functionName:`valueProject`,scaleName:`valueWeight`,weights:k(A).valueProjectionWeights,bias:Array(8).fill(0)}),ce,ue,de].join(`
`);j.reduce((e,[,t])=>e+k(A)[t].length,0),j.reduce((e,[,t])=>e+k(A)[t].filter(e=>e!==0).length,0),`${fe}`;function pe(e,t){let n=e.__r3f;return n?n.children.map(e=>e.object).filter(t):[]}function me(e,t){let n=e.current;return t.length===n.length&&t.every((e,t)=>e===n[t])?!1:(e.current=t,!0)}var he=(0,v.createContext)(null),Y=e=>(e.getAttributes()&2)==2,X=e=>/mainUv/.test(e.getFragmentShader()??``);function ge(e){let t=new WeakMap;return{acquire(n,r){let i=t.get(n);i?(i.count++,i.forcedValue=r):t.set(n,{count:1,original:n[e],forcedValue:r})},release(n){let r=t.get(n);r&&--r.count<=0&&(n[e]===r.forcedValue&&(n[e]=r.original),t.delete(n))}}}var _e=ge(`autoClear`),ve=ge(`toneMapping`),Z=new r,ye=(e,t)=>new _(e,t),Q=new WeakSet,be=new WeakSet;function xe(e){e instanceof g&&e.setEffects([]),m.prototype.dispose.call(e)}function Se(e){Q.has(e)&&xe(e)}function Ce(e,t,n){let r=[];for(let i=0;i<e.length;i++){let a=e[i];if(a instanceof d){let o=[a],s=Y(a),c=X(a);if(n!==`none`){let t;for(;(t=e[i+1])instanceof d;){let e=Y(t),r=X(t);if(n===`auto`&&(s&&e||s&&r||c&&e))break;o.push(t),s||=e,c||=r,i++}}let l=new g(t,...o);Q.add(l),r.push(l)}else a instanceof m&&r.push(a)}return r}var we=(0,v.memo)(function({children:e,camera:t,scene:n,resolutionScale:r,enabled:i=!0,renderPriority:a=1,autoClear:c=!0,autoRenderToScreen:u=!0,depthBuffer:g,enableNormalPass:_,stencilBuffer:b,multisampling:x=8,frameBufferType:S=o,renderPass:C=ye,mergeMode:w=`auto`,ref:T}){let{gl:E,scene:D,camera:O}=s(),k=n||D,A=t||O;E.getSize(Z);let[j,M]=(0,v.useState)(null),[,N]=(0,v.useReducer)(e=>e+1,0);(0,v.useEffect)(()=>{_e.acquire(E,!1);let e=new ee(E,{depthBuffer:g,stencilBuffer:b,multisampling:x,frameBufferType:S});e.autoRenderToScreen=u,e.addPass(C(k,A));let t=null,n=null;return _&&(t=new f(k,A),t.enabled=!1,e.addPass(t),r!==void 0&&(n=new p({normalBuffer:t.texture,resolutionScale:r}),n.enabled=!1,e.addPass(n))),e.setSize(Z.width,Z.height),M({composer:e,normalPass:t,downSamplingPass:n}),()=>{for(let t of e.passes)Se(t);e.dispose(),_e.release(E)}},[A,E,g,b,x,S,u,C,k,_,r]);let P=(0,v.useRef)({width:-1,height:-1});l((e,t)=>{if(!i||!j)return;let{composer:n}=j;E.getSize(Z),(Z.width!==P.current.width||Z.height!==P.current.height)&&(n.setSize(Z.width,Z.height),P.current.width=Z.width,P.current.height=Z.height);let r=E.autoClear;E.autoClear=c,b&&!c&&E.clearStencil(),n.render(t),E.autoClear=r},i?a:0);let F=(0,v.useRef)(null),I=(0,v.useRef)([]),[L,R]=(0,v.useState)(0);(0,v.useLayoutEffect)(()=>{j&&me(I,pe(F.current,e=>e instanceof d||e instanceof m))&&R(e=>e+1)}),(0,v.useLayoutEffect)(()=>{if(!j)return;let{composer:e,normalPass:t,downSamplingPass:n}=j,r=Ce(I.current,A,w);if(r.some(e=>be.has(e))){let e=new h;Q.add(e),r.push(e)}for(let t of r)e.addPass(t);return r.length&&(t&&(t.enabled=!0),n&&(n.enabled=!0)),()=>{for(let t of r)e.removePass(t),Se(t);t&&(t.enabled=!1),n&&(n.enabled=!1)}},[j,L,A,w]),(0,v.useEffect)(()=>(ve.acquire(E,0),E.toneMapping=0,()=>{ve.release(E)}),[E]);let z=(0,v.useMemo)(()=>j?{composer:j.composer,normalPass:j.normalPass,downSamplingPass:j.downSamplingPass,resolutionScale:r,camera:A,scene:k,requestRebuild:N,autoClear:c}:null,[j,r,A,k,N,c]);return(0,v.useImperativeHandle)(T,()=>j?.composer,[j]),z?(0,y.jsx)(he.Provider,{value:z,children:(0,y.jsx)(`group`,{ref:F,children:e})}):null}),Te=0,Ee=new WeakMap,De=new WeakMap,Oe=0;function ke(e){let t=De.get(e);return t===void 0&&(t=Oe++,De.set(e,t)),t}function $(e,t){if(typeof e!=`object`||!e)return e;if(t.has(e))return`[Circular]`;if(ArrayBuffer.isView(e)||e instanceof ArrayBuffer)return ke(e);if(t.add(e),Array.isArray(e))return e.map(e=>$(e,t));let n={};for(let r of Object.keys(e).sort())n[r]=$(e[r],t);return n}function Ae(e){return JSON.stringify($(e,new WeakSet))}function je(e,t){return function({ref:n,blendFunction:r=t?.blendFunction,opacity:i=t?.opacity,...a}){let o=Ee.get(e);if(!o){let t=`@react-three/postprocessing/${e.name}-${Te++}`;c({[t]:e}),Ee.set(e,o=t)}let l=s(e=>e.camera),u=(0,v.useMemo)(()=>[...t?.args??[],...a.args??[{...t,...a}]],[Ae(a)]);return(0,y.jsx)(o,{camera:l,"blendMode-blendFunction":r,"blendMode-opacity-value":i,...a,args:u,ref:n})}}var Me=`
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`,Ne=`
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
`,Pe=`
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
`,Fe=je(class extends d{constructor(){let e=new Map([[`colorNum`,new i(4)],[`pixelSize`,new i(2)]]);super(`RetroEffect`,Pe,{uniforms:e}),this.uniforms=e}set colorNum(e){this.uniforms.get(`colorNum`).value=e}get colorNum(){return this.uniforms.get(`colorNum`).value}set pixelSize(e){this.uniforms.get(`pixelSize`).value=e}get pixelSize(){return this.uniforms.get(`pixelSize`).value}}),Ie=(0,v.forwardRef)((e,t)=>{let{colorNum:n,pixelSize:r}=e;return(0,y.jsx)(Fe,{ref:t,colorNum:n,pixelSize:r})});Ie.displayName=`RetroEffect`;function Le({waveSpeed:e,waveFrequency:t,waveAmplitude:n,waveColor:o,backgroundColor:c,colorNum:u,pixelSize:d,disableAnimation:f,enableMouseInteraction:p,mouseRadius:m}){let ee=(0,v.useRef)(null),h=(0,v.useRef)(new r),{viewport:g,size:_,gl:b}=s(),x=(0,v.useRef)({time:new i(0),resolution:new i(new r(0,0)),waveSpeed:new i(e),waveFrequency:new i(t),waveAmplitude:new i(n),waveColor:new i(new a(...o)),backgroundColor:new i(new a(...c)),mousePos:new i(new r(0,0)),enableMouseInteraction:new i(+!!p),mouseRadius:new i(m)});(0,v.useEffect)(()=>{let e=b.getPixelRatio(),t=Math.floor(_.width*e),n=Math.floor(_.height*e),r=x.current.resolution.value;(r.x!==t||r.y!==n)&&r.set(t,n)},[_,b]);let S=(0,v.useRef)([...o]),C=(0,v.useRef)([...c]);return l(({clock:r})=>{let i=x.current;f||(i.time.value=r.getElapsedTime()),i.waveSpeed.value!==e&&(i.waveSpeed.value=e),i.waveFrequency.value!==t&&(i.waveFrequency.value=t),i.waveAmplitude.value!==n&&(i.waveAmplitude.value=n),S.current.every((e,t)=>e===o[t])||(i.waveColor.value.set(...o),S.current=[...o]),C.current.every((e,t)=>e===c[t])||(i.backgroundColor.value.set(...c),C.current=[...c]),i.enableMouseInteraction.value=+!!p,i.mouseRadius.value=m,p&&i.mousePos.value.copy(h.current)}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(`mesh`,{ref:ee,scale:[g.width,g.height,1],children:[(0,y.jsx)(`planeGeometry`,{args:[1,1]}),(0,y.jsx)(`shaderMaterial`,{vertexShader:Me,fragmentShader:Ne,uniforms:x.current})]}),(0,y.jsx)(we,{children:(0,y.jsx)(Ie,{colorNum:u,pixelSize:d})}),(0,y.jsxs)(`mesh`,{onPointerMove:e=>{if(!p)return;let t=b.domElement.getBoundingClientRect(),n=b.getPixelRatio();h.current.set((e.clientX-t.left)*n,(e.clientY-t.top)*n)},position:[0,0,.01],scale:[g.width,g.height,1],visible:!1,children:[(0,y.jsx)(`planeGeometry`,{args:[1,1]}),(0,y.jsx)(`meshBasicMaterial`,{transparent:!0,opacity:0})]})]})}function Re({waveSpeed:e=.05,waveFrequency:t=3,waveAmplitude:n=.3,waveColor:r=[.5,.5,.5],backgroundColor:i=[0,0,0],colorNum:a=4,pixelSize:o=2,disableAnimation:s=!1,enableMouseInteraction:c=!0,mouseRadius:l=1}){return(0,y.jsx)(u,{className:`dither-container`,camera:{position:[0,0,6]},dpr:1,gl:{antialias:!0,preserveDrawingBuffer:!0},children:(0,y.jsx)(Le,{waveSpeed:e,waveFrequency:t,waveAmplitude:n,waveColor:r,backgroundColor:i,colorNum:a,pixelSize:o,disableAnimation:s,enableMouseInteraction:c,mouseRadius:l})})}export{Re as default};