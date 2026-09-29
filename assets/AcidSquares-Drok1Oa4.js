import{_ as e,u as t,x as n}from"./index-B_kd6iZH.js";import{i as r,n as i,r as a,t as o}from"./Triangle-DhN_NCV1.js";var s=new Uint8Array(4);function c(e){return(e&e-1)==0}var l=1,u=class{constructor(e,{image:t,target:n=e.TEXTURE_2D,type:r=e.UNSIGNED_BYTE,format:i=e.RGBA,internalFormat:a=i,wrapS:o=e.CLAMP_TO_EDGE,wrapT:s=e.CLAMP_TO_EDGE,wrapR:c=e.CLAMP_TO_EDGE,generateMipmaps:u=n===(e.TEXTURE_2D||e.TEXTURE_CUBE_MAP),minFilter:d=u?e.NEAREST_MIPMAP_LINEAR:e.LINEAR,magFilter:f=e.LINEAR,premultiplyAlpha:p=!1,unpackAlignment:m=4,flipY:h=n==(e.TEXTURE_2D||e.TEXTURE_3D),anisotropy:g=0,level:_=0,width:v,height:y=v,length:b=1}={}){this.gl=e,this.id=l++,this.image=t,this.target=n,this.type=r,this.format=i,this.internalFormat=a,this.minFilter=d,this.magFilter=f,this.wrapS=o,this.wrapT=s,this.wrapR=c,this.generateMipmaps=u,this.premultiplyAlpha=p,this.unpackAlignment=m,this.flipY=h,this.anisotropy=Math.min(g,this.gl.renderer.parameters.maxAnisotropy),this.level=_,this.width=v,this.height=y,this.length=b,this.texture=this.gl.createTexture(),this.store={image:null},this.glState=this.gl.renderer.state,this.state={},this.state.minFilter=this.gl.NEAREST_MIPMAP_LINEAR,this.state.magFilter=this.gl.LINEAR,this.state.wrapS=this.gl.REPEAT,this.state.wrapT=this.gl.REPEAT,this.state.anisotropy=0}bind(){this.glState.textureUnits[this.glState.activeTextureUnit]!==this.id&&(this.gl.bindTexture(this.target,this.texture),this.glState.textureUnits[this.glState.activeTextureUnit]=this.id)}update(e=0){let t=!(this.image===this.store.image&&!this.needsUpdate);if((t||this.glState.textureUnits[e]!==this.id)&&(this.gl.renderer.activeTexture(e),this.bind()),t){if(this.needsUpdate=!1,this.flipY!==this.glState.flipY&&(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,this.flipY),this.glState.flipY=this.flipY),this.premultiplyAlpha!==this.glState.premultiplyAlpha&&(this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),this.glState.premultiplyAlpha=this.premultiplyAlpha),this.unpackAlignment!==this.glState.unpackAlignment&&(this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,this.unpackAlignment),this.glState.unpackAlignment=this.unpackAlignment),this.minFilter!==this.state.minFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MIN_FILTER,this.minFilter),this.state.minFilter=this.minFilter),this.magFilter!==this.state.magFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MAG_FILTER,this.magFilter),this.state.magFilter=this.magFilter),this.wrapS!==this.state.wrapS&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_S,this.wrapS),this.state.wrapS=this.wrapS),this.wrapT!==this.state.wrapT&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_T,this.wrapT),this.state.wrapT=this.wrapT),this.wrapR!==this.state.wrapR&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_R,this.wrapR),this.state.wrapR=this.wrapR),this.anisotropy&&this.anisotropy!==this.state.anisotropy&&(this.gl.texParameterf(this.target,this.gl.renderer.getExtension(`EXT_texture_filter_anisotropic`).TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropy),this.state.anisotropy=this.anisotropy),this.image){if(this.image.width&&(this.width=this.image.width,this.height=this.image.height),this.target===this.gl.TEXTURE_CUBE_MAP)for(let e=0;e<6;e++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+e,this.level,this.internalFormat,this.format,this.type,this.image[e]);else if(ArrayBuffer.isView(this.image))this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,this.image):(this.target===this.gl.TEXTURE_2D_ARRAY||this.target===this.gl.TEXTURE_3D)&&this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);else if(this.image.isCompressedTexture)for(let e=0;e<this.image.length;e++)this.gl.compressedTexImage2D(this.target,e,this.internalFormat,this.image[e].width,this.image[e].height,0,this.image[e].data);else this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.format,this.type,this.image):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);this.generateMipmaps&&(!this.gl.renderer.isWebgl2&&(!c(this.image.width)||!c(this.image.height))?(this.generateMipmaps=!1,this.wrapS=this.wrapT=this.gl.CLAMP_TO_EDGE,this.minFilter=this.gl.LINEAR):this.gl.generateMipmap(this.target)),this.onUpdate&&this.onUpdate()}else if(this.target===this.gl.TEXTURE_CUBE_MAP)for(let e=0;e<6;e++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,s);else this.width?this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,null):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,null):this.gl.texImage2D(this.target,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,s);this.store.image=this.image}}},d=class{constructor(e,{width:t=e.canvas.width,height:n=e.canvas.height,target:r=e.FRAMEBUFFER,color:i=1,depth:a=!0,stencil:o=!1,depthTexture:s=!1,wrapS:c=e.CLAMP_TO_EDGE,wrapT:l=e.CLAMP_TO_EDGE,wrapR:d=e.CLAMP_TO_EDGE,minFilter:f=e.LINEAR,magFilter:p=f,type:m=e.UNSIGNED_BYTE,format:h=e.RGBA,internalFormat:g=h,unpackAlignment:_,premultiplyAlpha:v}={}){this.gl=e,this.width=t,this.height=n,this.depth=a,this.stencil=o,this.buffer=this.gl.createFramebuffer(),this.target=r,this.gl.renderer.bindFramebuffer(this),this.textures=[];let y=[];for(let r=0;r<i;r++)this.textures.push(new u(e,{width:t,height:n,wrapS:c,wrapT:l,wrapR:d,minFilter:f,magFilter:p,type:m,format:h,internalFormat:g,unpackAlignment:_,premultiplyAlpha:v,flipY:!1,generateMipmaps:!1})),this.textures[r].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+r,this.gl.TEXTURE_2D,this.textures[r].texture,0),y.push(this.gl.COLOR_ATTACHMENT0+r);y.length>1&&this.gl.renderer.drawBuffers(y),this.texture=this.textures[0],s&&(this.gl.renderer.isWebgl2||this.gl.renderer.getExtension(`WEBGL_depth_texture`))?(this.depthTexture=new u(e,{width:t,height:n,minFilter:this.gl.NEAREST,magFilter:this.gl.NEAREST,format:this.stencil?this.gl.DEPTH_STENCIL:this.gl.DEPTH_COMPONENT,internalFormat:e.renderer.isWebgl2?this.stencil?this.gl.DEPTH24_STENCIL8:this.gl.DEPTH_COMPONENT16:this.gl.DEPTH_COMPONENT,type:this.stencil?this.gl.UNSIGNED_INT_24_8:this.gl.UNSIGNED_INT}),this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.stencil?this.gl.DEPTH_STENCIL_ATTACHMENT:this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(a&&!o&&(this.depthBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,t,n),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,this.depthBuffer)),o&&!a&&(this.stencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,t,n),this.gl.framebufferRenderbuffer(this.target,this.gl.STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.stencilBuffer)),a&&o&&(this.depthStencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,t,n),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.depthStencilBuffer))),this.gl.renderer.bindFramebuffer({target:this.target})}setSize(e,t){if(!(this.width===e&&this.height===t)){this.width=e,this.height=t,this.gl.renderer.bindFramebuffer(this);for(let n=0;n<this.textures.length;n++)this.textures[n].width=e,this.textures[n].height=t,this.textures[n].needsUpdate=!0,this.textures[n].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+n,this.gl.TEXTURE_2D,this.textures[n].texture,0);this.depthTexture?(this.depthTexture.width=e,this.depthTexture.height=t,this.depthTexture.needsUpdate=!0,this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(this.depthBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,e,t)),this.stencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,e,t)),this.depthStencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,e,t))),this.gl.renderer.bindFramebuffer({target:this.target})}}},f=n(e(),1),p=t(),m=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},h={low:20,medium:32,high:48},g=e=>h[e]||h.medium,_=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,v=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uWaveDepth;
uniform float uZoom;
uniform float uDensity;
uniform float uSpread;
uniform float uStepSize;
uniform float uGlow;
uniform float uExposure;
uniform float uColorShift;
uniform float uContrast;
uniform float uBrightness;
uniform float uOpacity;
uniform float uSteps;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uMouseRadius;
uniform float uEnableMouse;
uniform float uMouseActive;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uLightMode;
out vec4 fragColor;

void main() {
  vec2 frag = gl_FragCoord.xy;
  float zoom = max(uZoom, 0.05);
  float aspect = iResolution.x / iResolution.y;
  vec2 ndc = (2.0 * frag - iResolution.xy) / iResolution.y;
  vec2 dir = ndc * (0.5 / zoom);

  vec2 mouseNdc = vec2(uMouse.x * aspect, uMouse.y);
  float mr = max(uMouseRadius, 0.01);
  vec2 md = ndc - mouseNdc;
  float dent = exp(-dot(md, md) / (mr * mr)) * (3.0 * uMouseStrength * uEnableMouse * uMouseActive);

  float travel = sin(iTime * uSpeed) * uWaveDepth;
  float density = max(uDensity, 1.0);
  float spread = clamp(uSpread, 0.05, 0.6);
  float stepSize = max(uStepSize, 0.0005);
  float glowGain = max(uGlow, 0.0);

  vec3 tOffset = vec3(0.0, dent, travel);
  vec3 p = vec3(0.0);
  float s = 0.0;
  float glow = 0.0;

  for (int i = 0; i < 64; i++) {
    if (float(i) >= uSteps) break;
    p += vec3(dir * s, s);
    vec3 q = p + tOffset;
    s += density - length(q.xz) + length(ceil(q).xy);
    s = stepSize + abs(s) * spread;
    glow += glowGain / s;
  }

  float e = glow / max(uExposure, 1.0);
  float shimmer = 0.5 + 0.5 * dot(cos(iTime * uColorShift + p), vec3(0.3333));
  float v = tanh(e * uBrightness * mix(0.7, 1.05, shimmer));
  v = clamp((v - 0.5) * uContrast + 0.5, 0.0, 1.0);

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 0.55, v));
  col = mix(col, uColor3, smoothstep(0.55, 1.0, v));
  col *= v;

  float a = clamp(v, 0.0, 1.0) * uOpacity;
  vec3 outRgb = col * a;
  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    a = clamp(a + gv, 0.0, 1.0);
  }
  if (uLightMode > 0.5) {
    float peak = max(col.r, max(col.g, col.b));
    vec3 chroma = pow(clamp(col / max(peak, 0.0001), 0.0, 1.0), vec3(1.16));
    fragColor = vec4(mix(vec3(1.0), chroma, a * 0.94), 1.0);
  } else {
    fragColor = vec4(outRgb, a);
  }
}
`,y=`#version 300 es
precision highp float;
uniform sampler2D tMap;
uniform vec2 iResolution;
uniform vec2 uDirection;
uniform float uRadius;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float iTime;
out vec4 fragColor;

vec4 samp(vec2 uv) {
  return texture(tMap, uv);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution;
  vec2 texel = uDirection / iResolution;
  float st = uRadius * 0.25;
  vec4 sum = samp(uv) * 0.2026;
  sum += (samp(uv + texel * st) + samp(uv - texel * st)) * 0.179;
  sum += (samp(uv + texel * (st * 2.0)) + samp(uv - texel * (st * 2.0))) * 0.124;
  sum += (samp(uv + texel * (st * 3.0)) + samp(uv - texel * (st * 3.0))) * 0.0672;
  sum += (samp(uv + texel * (st * 4.0)) + samp(uv - texel * (st * 4.0))) * 0.0285;
  vec4 col = sum;
  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    col.rgb = clamp(col.rgb + gv, 0.0, 1.0);
    col.a = clamp(col.a + gv, 0.0, 1.0);
  }
  fragColor = col;
}
`,b=new WeakMap,x=({color1:e=`#5227FF`,color2:t=`#A855F7`,color3:n=`#FFFFFF`,detail:s=`medium`,speed:c=.7,waveDepth:l=1,zoom:u=1.3,density:h=10,glow:x=1,exposure:S=2700,spread:C=.3,stepSize:w=.002,colorShift:T=0,contrast:E=1,brightness:D=1,opacity:O=1,mouseInteraction:k=!0,mouseStrength:A=.1,mouseRadius:j=.35,blur:M=0,grain:N=!0,grainIntensity:P=.05,lightMode:F=!1,className:I=``})=>{let L=(0,f.useRef)(null),R=(0,f.useRef)([0,0]),z=(0,f.useRef)([0,0]),B=(0,f.useRef)(k),V=(0,f.useRef)(A),H=(0,f.useRef)(0),U=(0,f.useRef)(0),W=(0,f.useRef)(M),G=(0,f.useRef)(N),K=(0,f.useRef)(P);return(0,f.useEffect)(()=>{let e=L.current;if(!e)return;let t=new a({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl;n.clearColor(0,0,0,0);let s=n.canvas;s.style.width=`100%`,s.style.height=`100%`,s.style.display=`block`,e.appendChild(s);let c=new o(n),l=new r(n,{vertex:_,fragment:v,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.7},uWaveDepth:{value:1},uZoom:{value:1.3},uDensity:{value:10},uSpread:{value:.3},uStepSize:{value:.002},uGlow:{value:1},uExposure:{value:2700},uColorShift:{value:0},uContrast:{value:1},uBrightness:{value:1},uOpacity:{value:1},uSteps:{value:32},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])},uMouse:{value:new Float32Array([0,0])},uMouseStrength:{value:.1},uMouseRadius:{value:.35},uEnableMouse:{value:1},uMouseActive:{value:0},uGrain:{value:1},uGrainIntensity:{value:.05},uLightMode:{value:0}}}),u=new i(n,{geometry:c,program:l}),f=new r(n,{vertex:_,fragment:y,uniforms:{tMap:{value:null},iResolution:{value:new Float32Array([1,1])},uDirection:{value:new Float32Array([1,0])},uRadius:{value:0},uGrain:{value:0},uGrainIntensity:{value:.05},iTime:{value:0}}}),p=new i(n,{geometry:c,program:f}),m=null,h=null,g=()=>{if(!m){let e=n.drawingBufferWidth,t=n.drawingBufferHeight;m=new d(n,{width:e,height:t,depth:!1}),h=new d(n,{width:e,height:t,depth:!1})}},x=()=>{let e=+!!G.current,n=K.current;if(l.uniforms.uGrainIntensity.value=n,f.uniforms.uGrainIntensity.value=n,W.current>0){g(),l.uniforms.uGrain.value=0,t.render({scene:u,target:m});let n=f.uniforms;n.uRadius.value=W.current*14,n.tMap.value=m.texture,n.uDirection.value[0]=1,n.uDirection.value[1]=0,n.uGrain.value=0,t.render({scene:p,target:h}),n.tMap.value=h.texture,n.uDirection.value[0]=0,n.uDirection.value[1]=1,n.uGrain.value=e,t.render({scene:p})}else l.uniforms.uGrain.value=e,t.render({scene:u})};b.set(e,{renderer:t,program:l,mesh:u});let S=()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.floor(r.width)),a=Math.max(1,Math.floor(r.height));t.setSize(i,a);let o=n.drawingBufferWidth,s=n.drawingBufferHeight,c=l.uniforms.iResolution.value;c[0]=o,c[1]=s;let u=f.uniforms.iResolution.value;u[0]=o,u[1]=s,m&&(m.setSize(o,s),h.setSize(o,s)),x()},C=new ResizeObserver(S);C.observe(e),S();let w=t=>{let n=e.getBoundingClientRect();R.current=[((t.clientX-n.left)/n.width-.5)*2,-((t.clientY-n.top)/n.height-.5)*2],U.current=1},T=()=>{U.current=0};e.addEventListener(`mousemove`,w),e.addEventListener(`mouseleave`,T);let E=0,D=!0,O=!document.hidden,k=performance.now(),A=e=>{l.uniforms.iTime.value=(e-k)*.001;let t=z.current,n=R.current;t[0]+=.05*(n[0]-t[0]),t[1]+=.05*(n[1]-t[1]);let r=l.uniforms.uMouse.value;r[0]=t[0],r[1]=t[1];let i=B.current?U.current:0;H.current+=.05*(i-H.current),l.uniforms.uMouseActive.value=H.current,l.uniforms.uEnableMouse.value=+!!B.current,l.uniforms.uMouseStrength.value=V.current,f.uniforms.iTime.value=l.uniforms.iTime.value,x(),E=requestAnimationFrame(A)},j=()=>{D&&O&&E===0&&(E=requestAnimationFrame(A))},M=()=>{E!==0&&(cancelAnimationFrame(E),E=0)},N=new IntersectionObserver(([e])=>{D=e.isIntersecting,D?j():M()},{threshold:0});N.observe(e);let P=()=>{O=!document.hidden,O?j():M()};return document.addEventListener(`visibilitychange`,P),j(),()=>{M(),C.disconnect(),N.disconnect(),document.removeEventListener(`visibilitychange`,P),e.removeEventListener(`mousemove`,w),e.removeEventListener(`mouseleave`,T),b.delete(e),m&&(n.deleteFramebuffer(m.buffer),n.deleteFramebuffer(h.buffer),m.textures.forEach(e=>n.deleteTexture(e.texture)),h.textures.forEach(e=>n.deleteTexture(e.texture)));try{e.removeChild(s)}catch{}n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,f.useEffect)(()=>{let r=L.current;if(!r)return;let i=b.get(r);if(!i)return;let{program:a}=i,o=a.uniforms;o.uSpeed.value=c,o.uWaveDepth.value=l,o.uZoom.value=u,o.uDensity.value=h,o.uSpread.value=C,o.uStepSize.value=w,o.uGlow.value=x,o.uExposure.value=S,o.uColorShift.value=T,o.uContrast.value=E,o.uBrightness.value=D,o.uOpacity.value=O,o.uLightMode.value=+!!F,o.uSteps.value=g(s),o.uMouseRadius.value=j;let d=m(e),f=o.uColor1.value;f[0]=d[0],f[1]=d[1],f[2]=d[2];let p=m(t),_=o.uColor2.value;_[0]=p[0],_[1]=p[1],_[2]=p[2];let v=m(n),y=o.uColor3.value;y[0]=v[0],y[1]=v[1],y[2]=v[2],B.current=k,V.current=A,W.current=M,G.current=N,K.current=P},[e,t,n,s,c,l,u,h,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F]),(0,p.jsx)(`div`,{ref:L,className:`acid-squares-container ${I}`.trim()})};export{x as default};