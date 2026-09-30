import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, ContactShadows, Float, MeshReflectorMaterial, RoundedBox, Stars, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import profileImage from "../../../image/profile.jpg";
import tourScenes from "./tourScenes.js";

const zoneThemes = {
  intro: { background: "#090711", grid: "#52236f", floor: "#110b18" },
  experience: { background: "#080912", grid: "#63235f", floor: "#120b17" },
  projects: { background: "#070a13", grid: "#312978", floor: "#0b0c19" },
  skills: { background: "#080a15", grid: "#29377e", floor: "#0b0d1c" },
  hobbies: { background: "#050b12", grid: "#164e63", floor: "#07131d" },
  contact: { background: "#0b0712", grid: "#59316f", floor: "#120b18" },
};

function getWrappedLines(context, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function drawWrappedText(context, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const lines = getWrappedLines(context, text, maxWidth).slice(0, maxLines);
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
}

function smoothstep(value) {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
}

function useRevealScale(ref, enabled, delay, duration) {
  const startedAt = useRef(null);
  useFrame((state) => {
    if (!enabled || !ref.current) return;
    if (startedAt.current === null) startedAt.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startedAt.current;
    const progress = smoothstep((elapsed - delay) / duration);
    ref.current.scale.setScalar(Math.max(0.001, progress));
  });
}

function makeInfoPanelTexture(scene, isLast) {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1120;
  const context = canvas.getContext("2d");
  const panelGradient = context.createLinearGradient(0, 0, 900, 1120);
  const isHologram = scene.id === "intro";
  const accent = isHologram ? "#6f7cff" : scene.color;
  panelGradient.addColorStop(0, isHologram ? "rgba(24, 30, 65, 0.78)" : "rgba(36, 25, 46, 0.98)");
  panelGradient.addColorStop(1, isHologram ? "rgba(8, 12, 32, 0.7)" : "rgba(17, 12, 22, 0.99)");
  context.fillStyle = panelGradient;
  context.beginPath();
  context.roundRect(10, 10, 880, 1100, 44);
  context.fill();
  context.strokeStyle = accent;
  context.lineWidth = 4;
  context.globalAlpha = 0.72;
  context.stroke();
  context.globalAlpha = 1;
  context.fillStyle = accent;
  context.shadowColor = accent;
  context.shadowBlur = 22;
  context.fillRect(72, 50, 150, 6);
  context.shadowBlur = 0;
  context.fillStyle = "rgba(255,255,255,0.1)";
  context.beginPath();
  context.roundRect(68, 84, 96, 42, 12);
  context.fill();
  context.strokeStyle = accent;
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = "#ffffff";
  context.font = "800 20px Inter, Arial, sans-serif";
  context.fillText("LIVE", 91, 112);
  context.fillStyle = "rgba(242,234,247,0.55)";
  context.font = "800 22px Inter, Arial, sans-serif";
  context.fillText(scene.eyebrow.toUpperCase(), 190, 113);
  context.textAlign = "right";
  context.fillText(scene.number, 828, 113);
  context.textAlign = "left";
  context.fillStyle = "#ffffff";
  context.font = "800 72px Inter, Arial, sans-serif";
  let cursorY = drawWrappedText(context, scene.title, 68, 214, 764, 76, 3);
  context.fillStyle = "rgba(242,234,247,0.66)";
  context.font = "500 29px Inter, Arial, sans-serif";
  cursorY = drawWrappedText(context, scene.summary, 68, cursorY + 32, 764, 40, 4) + 22;
  context.font = "600 25px Inter, Arial, sans-serif";
  scene.facts.forEach((fact) => {
    const factLines = getWrappedLines(context, fact, 690).slice(0, 2);
    const cardHeight = Math.max(78, 38 + factLines.length * 31);
    context.fillStyle = "rgba(255,255,255,0.045)";
    context.strokeStyle = "rgba(255,255,255,0.12)";
    context.lineWidth = 2;
    context.beginPath();
    context.roundRect(68, cursorY, 764, cardHeight, 18);
    context.fill();
    context.stroke();
    context.fillStyle = accent;
    context.beginPath();
    context.arc(94, cursorY + cardHeight / 2, 6, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "rgba(255,255,255,0.82)";
    factLines.forEach((line, index) => context.fillText(line, 116, cursorY + 32 + index * 31));
    cursorY += cardHeight + 15;
  });
  const buttonY = 982;
  const buttonGradient = context.createLinearGradient(510, buttonY, 832, buttonY + 84);
  buttonGradient.addColorStop(0, accent);
  buttonGradient.addColorStop(1, "#7c3aed");
  context.fillStyle = buttonGradient;
  context.beginPath();
  context.roundRect(442, buttonY, 390, 82, 18);
  context.fill();
  context.strokeStyle = "rgba(255,255,255,0.34)";
  context.stroke();
  context.fillStyle = "#ffffff";
  context.font = "800 25px Inter, Arial, sans-serif";
  context.textAlign = "center";
  context.fillText(isLast ? "FINISH TOUR  →" : "NEXT SCENE  →", 637, buttonY + 51);
  context.textAlign = "left";
  context.fillStyle = "rgba(255,255,255,0.3)";
  context.font = "700 18px SFMono-Regular, Consolas, monospace";
  context.fillText("CYBER TERMINAL / CLICK TO CONTINUE", 68, 1043);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  return texture;
}

function InfoTerminal({ scene, isLast, onTrigger }) {
  const texture = useMemo(() => makeInfoPanelTexture(scene, isLast), [isLast, scene]);
  const revealRef = useRef();
  const { size } = useThree();
  const compact = size.width <= 820;
  const isHologram = scene.id === "intro";
  const desktopX = isHologram ? -0.9 : scene.id === "contact" ? -1.2 : -2;
  const desktopY = isHologram ? 1.72 : 1.5;
  const desktopZ = isHologram ? 0.88 : 2.2;
  const desktopScale = isHologram ? 0.65 : 0.5;
  useRevealScale(revealRef, isHologram && !compact, 1.05, 1.55);
  useEffect(() => () => texture.dispose(), [texture]);
  const terminal = (
    <Billboard position={compact ? [0, 1.25, 2.2] : [desktopX, desktopY, desktopZ]} follow>
      <group
        scale={compact ? 0.5 : desktopScale}
        onClick={(event) => { event.stopPropagation(); onTrigger(); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = ""; }}
      >
        <RoundedBox args={[3.24, 4.02, 0.18]} radius={0.16} smoothness={5}>
          <meshStandardMaterial
            color={isHologram ? "#101936" : "#21172b"}
            emissive={isHologram ? "#6f7cff" : scene.color}
            emissiveIntensity={isHologram ? 0.46 : 0.12}
            metalness={0.38}
            opacity={isHologram ? 0.46 : 1}
            roughness={0.28}
            transparent={isHologram}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.096]}>
          <planeGeometry args={[3.11, 3.87]} />
          <meshBasicMaterial map={texture} opacity={isHologram ? 0.94 : 1} toneMapped={false} transparent={isHologram} />
        </mesh>
        {!isHologram ? (
          <mesh position={[0, -2.18, -0.08]}>
            <boxGeometry args={[1.12, 0.2, 0.3]} />
            <meshStandardMaterial color={scene.color} emissive={scene.color} emissiveIntensity={0.48} metalness={0.55} roughness={0.25} />
          </mesh>
        ) : null}
      </group>
    </Billboard>
  );
  if (!isHologram || compact) return terminal;
  return (
    <Float speed={0.85} rotationIntensity={0.018} floatIntensity={0.1}>
      <group ref={revealRef} scale={0.001}>{terminal}</group>
    </Float>
  );
}

function makeExperienceFileTexture(record, color) {
  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 900;
  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 720, 900);
  gradient.addColorStop(0, "#2b1835");
  gradient.addColorStop(1, "#100c17");
  context.fillStyle = gradient;
  context.beginPath();
  context.roundRect(10, 10, 700, 880, 34);
  context.fill();
  context.strokeStyle = color;
  context.lineWidth = 5;
  context.stroke();

  context.fillStyle = color;
  context.fillRect(54, 54, 150, 7);
  context.fillStyle = "rgba(255,255,255,0.5)";
  context.font = "800 21px SFMono-Regular, Consolas, monospace";
  context.fillText(`EXPERIENCE FILE / ${record.number}`, 54, 108);
  context.textAlign = "right";
  context.fillText(record.tag, 666, 108);
  context.textAlign = "left";

  context.fillStyle = "#ffffff";
  context.font = "800 58px Inter, Arial, sans-serif";
  drawWrappedText(context, record.company, 54, 216, 610, 64, 2);
  context.fillStyle = "rgba(255,255,255,0.78)";
  context.font = "700 31px Inter, Arial, sans-serif";
  const roleBottom = drawWrappedText(context, record.role, 54, 326, 610, 42, 3);

  context.fillStyle = "rgba(255,255,255,0.48)";
  context.font = "600 23px Inter, Arial, sans-serif";
  context.fillText(record.period, 54, roleBottom + 42);
  context.fillText(record.location, 54, roleBottom + 80);

  context.fillStyle = "rgba(255,255,255,0.05)";
  context.strokeStyle = "rgba(255,255,255,0.12)";
  context.beginPath();
  context.roundRect(54, 630, 612, 92, 18);
  context.fill();
  context.stroke();
  context.fillStyle = color;
  context.beginPath();
  context.arc(86, 676, 7, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgba(255,255,255,0.82)";
  context.font = "700 24px Inter, Arial, sans-serif";
  context.fillText("Open detailed record", 112, 684);

  context.fillStyle = color;
  context.beginPath();
  context.roundRect(356, 778, 310, 70, 16);
  context.fill();
  context.fillStyle = "#ffffff";
  context.font = "800 23px Inter, Arial, sans-serif";
  context.textAlign = "center";
  context.fillText("OPEN FILE  →", 511, 821);
  context.textAlign = "left";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  return texture;
}

function ExperienceFile({ record, color, position, scale, tilt, onSelect }) {
  const texture = useMemo(() => makeExperienceFileTexture(record, color), [color, record]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <Billboard position={position} follow>
      <group
        scale={scale}
        rotation={[0, 0, tilt]}
        onClick={(event) => { event.stopPropagation(); onSelect(); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = ""; }}
      >
        <RoundedBox args={[2.58, 3.3, 0.1]} radius={0.14} smoothness={4} position={[0.12, -0.1, -0.12]} rotation={[0, 0, 0.025]}>
          <meshStandardMaterial color="#75667d" metalness={0.15} roughness={0.72} />
        </RoundedBox>
        <RoundedBox args={[2.62, 3.34, 0.15]} radius={0.15} smoothness={5}>
          <meshStandardMaterial color="#17101f" emissive={color} emissiveIntensity={0.14} metalness={0.34} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0, 0.081]}>
          <planeGeometry args={[2.5, 3.2]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        <pointLight position={[0, -0.8, 1]} color={color} intensity={2.2} distance={3.5} />
      </group>
    </Billboard>
  );
}

function ExperienceFiles({ records, color, onSelect }) {
  const { size } = useThree();
  const compact = size.width <= 820;
  const positions = compact
    ? [[0, 2.65, 1.35], [0, 1.65, 1.4], [0, 0.65, 1.45]]
    : [[-2.35, 1.38, 0.9], [0, 1.68, 0.35], [2.35, 1.38, 0.9]];
  return records.map((record, index) => (
    <ExperienceFile
      key={record.id}
      record={record}
      color={color}
      position={positions[index]}
      scale={compact ? 0.29 : 0.64}
      tilt={compact ? 0 : (index - 1) * 0.035}
      onSelect={() => onSelect(index)}
    />
  ));
}

function ZonePlatform({ color, shape = "octagon", scale = 1 }) {
  const segments = shape === "circle" ? 64 : shape === "hex" ? 6 : 8;
  return (
    <group scale={scale}>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[2.7, 3, 0.46, segments]} />
        <meshStandardMaterial color="#11101a" metalness={0.72} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[2.55, 2.66, 0.09, segments]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.62} metalness={0.35} roughness={0.25} />
      </mesh>
      {[1.05, 1.75, 2.35].map((radius) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
          <torusGeometry args={[radius, 0.018, 8, 72]} />
          <meshBasicMaterial color={color} transparent opacity={0.34} />
        </mesh>
      ))}
    </group>
  );
}

const skylineBuildings = [
  { x: -7.4, z: -7.8, width: 1.5, depth: 1.3, height: 5.8, accent: "#22d3ee" },
  { x: -5.6, z: -6.4, width: 1.2, depth: 1.1, height: 3.9, accent: "#a855f7" },
  { x: -4.1, z: -8.4, width: 1.7, depth: 1.5, height: 7.4, accent: "#ec4899" },
  { x: -2.1, z: -6.9, width: 1.25, depth: 1.2, height: 4.8, accent: "#22d3ee" },
  { x: 0.2, z: -8.8, width: 1.9, depth: 1.55, height: 7.9, accent: "#8b5cf6" },
  { x: 2.5, z: -6.8, width: 1.3, depth: 1.2, height: 4.5, accent: "#22d3ee" },
  { x: 4.2, z: -8.1, width: 1.7, depth: 1.4, height: 6.7, accent: "#ec4899" },
  { x: 6.3, z: -6.5, width: 1.2, depth: 1.1, height: 4.2, accent: "#a855f7" },
  { x: 7.9, z: -8.3, width: 1.55, depth: 1.35, height: 6.1, accent: "#22d3ee" },
];

function makeNeonSignTexture(title, subtitle, color) {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 384;
  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 768, 384);
  gradient.addColorStop(0, "rgba(4, 9, 20, 0.98)");
  gradient.addColorStop(1, "rgba(20, 7, 29, 0.98)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 768, 384);
  context.strokeStyle = color;
  context.lineWidth = 10;
  context.strokeRect(16, 16, 736, 352);
  context.strokeStyle = "rgba(255,255,255,0.14)";
  context.lineWidth = 2;
  for (let y = 48; y < 360; y += 24) context.beginPath(), context.moveTo(28, y), context.lineTo(740, y), context.stroke();
  context.shadowColor = color;
  context.shadowBlur = 28;
  context.fillStyle = color;
  context.font = "900 72px Inter, Arial, sans-serif";
  context.fillText(title, 54, 174);
  context.shadowBlur = 12;
  context.fillStyle = "#f8fbff";
  context.font = "700 26px SFMono-Regular, Consolas, monospace";
  context.fillText(subtitle, 58, 234);
  context.fillStyle = "rgba(255,255,255,0.48)";
  context.font = "600 18px SFMono-Regular, Consolas, monospace";
  context.fillText("SECTOR 01  /  IDENTITY NETWORK", 58, 306);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  return texture;
}

function NeonBillboard({ position, color }) {
  const texture = useMemo(() => makeNeonSignTexture("OPEN TO WORK", "SOFTWARE / WEB / DATA", color), [color]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <Billboard position={position} follow>
      <group scale={0.62}>
        <mesh position={[0, 0, -0.08]}>
          <boxGeometry args={[3.7, 1.92, 0.16]} />
          <meshStandardMaterial color="#070912" metalness={0.82} roughness={0.26} />
        </mesh>
        <mesh>
          <planeGeometry args={[3.52, 1.72]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        <pointLight color={color} distance={4.5} intensity={2.8} position={[0, -0.2, 0.8]} />
      </group>
    </Billboard>
  );
}

function CyberpunkSkyline() {
  return (
    <group position={[0, -0.42, 0]}>
      {skylineBuildings.map((building, index) => (
        <group key={`${building.x}-${building.z}`} position={[building.x, building.height / 2, building.z]}>
          <mesh castShadow>
            <boxGeometry args={[building.width, building.height, building.depth]} />
            <meshStandardMaterial
              color={index % 2 ? "#0a0e18" : "#0c0b15"}
              emissive={building.accent}
              emissiveIntensity={0.035}
              metalness={0.72}
              roughness={0.42}
            />
          </mesh>
          {Array.from({ length: Math.max(3, Math.floor(building.height / 0.72)) }, (_, row) => (
            <mesh key={row} position={[0, -building.height / 2 + 0.56 + row * 0.72, building.depth / 2 + 0.008]}>
              <planeGeometry args={[building.width * 0.62, 0.055]} />
              <meshBasicMaterial color={row % 3 === 0 ? building.accent : "#17253d"} toneMapped={false} transparent opacity={row % 3 === 0 ? 0.72 : 0.46} />
            </mesh>
          ))}
          <mesh position={[0, building.height / 2 + 0.42, 0]}>
            <cylinderGeometry args={[0.025, 0.04, 0.84, 8]} />
            <meshBasicMaterial color={building.accent} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <NeonBillboard position={[3.9, 3.25, -4.65]} color="#22d3ee" />
    </group>
  );
}

function CyberStreetInfrastructure({ color }) {
  const cables = useMemo(() => [
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.3, 3.4, -1.7),
      new THREE.Vector3(-1.8, 2.82, -2.1),
      new THREE.Vector3(1.8, 2.96, -2.15),
      new THREE.Vector3(4.35, 3.52, -1.8),
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.3, 3.12, -1.62),
      new THREE.Vector3(-1.3, 2.5, -1.84),
      new THREE.Vector3(2.2, 2.72, -1.92),
      new THREE.Vector3(4.35, 3.22, -1.72),
    ]),
  ], []);
  return (
    <group>
      {[-4.3, 4.35].map((x) => (
        <group key={x} position={[x, 1.45, -1.7]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.09, 0.13, 3.8, 10]} />
            <meshStandardMaterial color="#10131b" metalness={0.86} roughness={0.34} />
          </mesh>
          <mesh position={[0, 1.56, 0]}>
            <boxGeometry args={[0.24, 0.7, 0.2]} />
            <meshStandardMaterial color="#111827" emissive={color} emissiveIntensity={1.8} metalness={0.72} roughness={0.24} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {cables.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 48, 0.018, 8, false]} />
          <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      {[-3.1, 3.15].map((x, index) => (
        <group key={x} position={[x, -0.18, 0.25 + index * 0.18]}>
          <RoundedBox args={[0.72, 0.52, 0.76]} radius={0.06} smoothness={3}>
            <meshStandardMaterial color="#10131b" metalness={0.78} roughness={0.38} />
          </RoundedBox>
          <mesh position={[0, 0.05, 0.39]}>
            <planeGeometry args={[0.42, 0.08]} />
            <meshBasicMaterial color={index ? "#ec4899" : "#22d3ee"} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CyberRain({ reducedMotion }) {
  const pointsRef = useRef();
  const { size } = useThree();
  const count = size.width <= 820 ? 260 : 620;
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      data[index * 3] = (Math.random() - 0.5) * 18;
      data[index * 3 + 1] = Math.random() * 10 - 0.4;
      data[index * 3 + 2] = (Math.random() - 0.5) * 13 - 1;
    }
    return data;
  }, [count]);
  useFrame((_, delta) => {
    if (reducedMotion || !pointsRef.current) return;
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    for (let index = 0; index < count; index += 1) {
      const yIndex = index * 3 + 1;
      positionAttribute.array[yIndex] -= delta * 5.6;
      if (positionAttribute.array[yIndex] < -0.45) positionAttribute.array[yIndex] = 9.6;
    }
    positionAttribute.needsUpdate = true;
  });
  if (reducedMotion) return null;
  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8be9ff" size={0.028} sizeAttenuation transparent opacity={0.48} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function makeWetNeonTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, 1024, 1024);
  context.globalCompositeOperation = "screen";

  const reflections = [
    { x: 118, width: 72, start: 170, end: 970, color: "34, 211, 238", alpha: 0.58 },
    { x: 272, width: 42, start: 360, end: 900, color: "168, 85, 247", alpha: 0.42 },
    { x: 502, width: 94, start: 130, end: 990, color: "236, 72, 153", alpha: 0.56 },
    { x: 704, width: 54, start: 310, end: 930, color: "34, 211, 238", alpha: 0.48 },
    { x: 876, width: 78, start: 210, end: 982, color: "139, 92, 246", alpha: 0.52 },
  ];

  context.filter = "blur(20px)";
  reflections.forEach(({ x, width, start, end, color, alpha }) => {
    const gradient = context.createLinearGradient(0, start, 0, end);
    gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
    gradient.addColorStop(0.22, `rgba(${color}, ${alpha * 0.7})`);
    gradient.addColorStop(0.72, `rgba(${color}, ${alpha * 0.2})`);
    gradient.addColorStop(1, `rgba(${color}, 0)`);
    context.fillStyle = gradient;
    context.fillRect(x - width / 2, start, width, end - start);
  });

  context.filter = "blur(5px)";
  reflections.forEach(({ x, width, start, end, color, alpha }) => {
    context.fillStyle = `rgba(${color}, ${alpha * 0.48})`;
    for (let y = start + 80; y < end; y += 68) {
      const spread = width * (0.68 + ((y / 68) % 3) * 0.18);
      context.fillRect(x - spread / 2, y, spread, 3 + (y % 5));
    }
  });

  context.filter = "none";
  context.globalCompositeOperation = "source-over";
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  return texture;
}

function WetNeonReflections({ compact }) {
  const texture = useMemo(() => makeWetNeonTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.405, -1.45]} renderOrder={2}>
      <planeGeometry args={[compact ? 15 : 19, 15]} />
      <meshBasicMaterial
        map={texture}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={compact ? 0.58 : 0.76}
        toneMapped={false}
        transparent
      />
    </mesh>
  );
}

function WetStreet({ compact }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.43, -1.8]} receiveShadow>
      <planeGeometry args={[21, 18]} />
      <MeshReflectorMaterial
        blur={compact ? [72, 22] : [150, 48]}
        color="#07111a"
        depthScale={0.42}
        maxDepthThreshold={1.45}
        metalness={0.88}
        minDepthThreshold={0.28}
        mirror={0.82}
        mixBlur={1.2}
        mixStrength={2.35}
        resolution={compact ? 256 : 512}
        roughness={0.3}
      />
    </mesh>
  );
}

function CyberpunkIdentityEnvironment({ color, reducedMotion }) {
  const { size } = useThree();
  const compact = size.width <= 820;
  return (
    <group>
      <WetStreet compact={compact} />
      <WetNeonReflections compact={compact} />
      <CyberpunkSkyline />
      {!compact ? <CyberStreetInfrastructure color={color} /> : null}
      <CyberRain reducedMotion={reducedMotion} />
      <ContactShadows position={[0, -0.405, 0]} scale={9} blur={2.4} opacity={0.48} far={5} frames={1} color="#03040a" />
    </group>
  );
}

function HologramCurtain({ color }) {
  const revealRef = useRef();
  const startedAt = useRef(null);
  useFrame((state) => {
    if (!revealRef.current) return;
    if (startedAt.current === null) startedAt.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startedAt.current;
    const heightProgress = smoothstep((elapsed - 0.35) / 1.15);
    revealRef.current.scale.y = Math.max(0.001, heightProgress);
  });
  return (
    <group>
      <group ref={revealRef} scale={[1, 0.001, 1]}>
        <mesh position={[0, 1.55, 0.02]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.95, 3.05, 4, 1, true]} />
          <meshBasicMaterial
            blending={THREE.AdditiveBlending}
            color={color}
            depthWrite={false}
            opacity={0.07}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
        <mesh position={[0, 1.72, 0.02]}>
          <planeGeometry args={[4.12, 3.45]} />
          <meshBasicMaterial
            blending={THREE.AdditiveBlending}
            color={color}
            depthWrite={false}
            opacity={0.058}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
        <mesh position={[0.35, 1.78, -0.2]}>
          <planeGeometry args={[3.65, 3.18]} />
          <meshBasicMaterial color="#9db2ff" depthWrite={false} opacity={0.025} transparent />
        </mesh>
        {Array.from({ length: 11 }, (_, index) => (
          <mesh key={index} position={[0, 0.36 + index * 0.29, 0.08]}>
            <boxGeometry args={[3.98, 0.012, 0.012]} />
            <meshBasicMaterial color={color} opacity={0.14 - index * 0.006} transparent />
          </mesh>
        ))}
      </group>
      <group position={[0, 0.16, 0.12]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.27, 0.28, 20]} />
          <meshStandardMaterial color="#0b1024" emissive={color} emissiveIntensity={0.72} metalness={0.75} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 0.08, 20]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>
        <pointLight color={color} distance={4.2} intensity={2.4} position={[0, 0.42, 0]} />
      </group>
    </group>
  );
}

function IdentityDock({ color, reducedMotion }) {
  const portrait = useTexture(profileImage);
  const portraitRevealRef = useRef();
  const { size } = useThree();
  const compact = size.width <= 820;
  useRevealScale(portraitRevealRef, !compact, 1.35, 1.55);
  useEffect(() => {
    portrait.colorSpace = THREE.SRGBColorSpace;
    portrait.needsUpdate = true;
  }, [portrait]);
  return (
    <>
      <CyberpunkIdentityEnvironment color={color} reducedMotion={reducedMotion} />
      <ZonePlatform color={color} scale={0.56} />
      {!compact ? <HologramCurtain color={color} /> : null}
      <Float speed={1.2} rotationIntensity={0.025} floatIntensity={0.12}>
        <group ref={portraitRevealRef} scale={compact ? 1 : 0.001}>
          <Billboard position={compact ? [2.6, 1.25, -0.2] : [1.22, 1.78, 0.18]} scale={compact ? 1 : 1.1} follow>
            <RoundedBox args={[1.5, 2.12, 0.16]} radius={0.1} smoothness={4}>
              <meshStandardMaterial color="#101936" emissive={color} emissiveIntensity={0.5} metalness={0.48} opacity={0.58} roughness={0.22} transparent />
            </RoundedBox>
            <mesh position={[0, 0, 0.086]}>
              <planeGeometry args={[1.3, 1.86]} />
              <meshBasicMaterial map={portrait} toneMapped={false} />
            </mesh>
            <mesh position={[0, -1.02, 0.1]}>
              <boxGeometry args={[1.35, 0.025, 0.025]} />
              <meshBasicMaterial color={color} transparent opacity={0.8} />
            </mesh>
          </Billboard>
        </group>
      </Float>
      <pointLight position={[0, 2.2, 0]} color={color} intensity={4.5} distance={7} />
    </>
  );
}

function MemoryVault({ color }) {
  const archiveRef = useRef();
  const scannerRef = useRef();
  const orbitRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (archiveRef.current) {
      archiveRef.current.position.y = Math.sin(time * 0.72) * 0.035;
      archiveRef.current.rotation.y = Math.sin(time * 0.28) * 0.035;
    }
    if (scannerRef.current) {
      scannerRef.current.position.y = 0.42 + ((time * 0.42) % 1) * 2.35;
      scannerRef.current.material.opacity = 0.1 + Math.sin(time * 2.6) * 0.035;
    }
    if (orbitRef.current) orbitRef.current.rotation.z -= delta * 0.09;
  });

  return (
    <>
      <ZonePlatform color={color} shape="hex" scale={0.56} />
      <HologramCurtain color={color} />
      <group ref={archiveRef}>
        {[-2.25, 2.25].map((x) => (
          <group key={x} position={[x, 1.02, -0.72]}>
            {[0, 1, 2].map((level) => (
              <RoundedBox key={level} args={[0.72, 0.5, 0.64]} radius={0.06} smoothness={3} position={[0, level * 0.61, 0]}>
                <meshStandardMaterial color="#17121f" emissive={color} emissiveIntensity={0.13 + level * 0.055} metalness={0.7} roughness={0.28} />
              </RoundedBox>
            ))}
            <pointLight position={[0, 0.92, 0.6]} color={color} intensity={2.1} distance={3.2} />
          </group>
        ))}
        <mesh position={[0, 1.45, -1.5]}>
          <boxGeometry args={[2.65, 1.92, 0.1]} />
          <meshStandardMaterial color="#15101d" emissive={color} emissiveIntensity={0.12} transparent opacity={0.76} />
        </mesh>
        <mesh ref={scannerRef} position={[0, 0.45, -1.42]}>
          <planeGeometry args={[2.42, 0.055]} />
          <meshBasicMaterial blending={THREE.AdditiveBlending} color={color} depthWrite={false} opacity={0.12} transparent />
        </mesh>
      </group>
      <mesh ref={orbitRef} position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.72, 0.012, 6, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.26} />
      </mesh>
      <Float speed={1.35} rotationIntensity={0.12} floatIntensity={0.18}>
        <mesh position={[0, 2.55, -1.22]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshBasicMaterial color={color} transparent opacity={0.72} />
        </mesh>
      </Float>
    </>
  );
}

function BuildDistrict({ color }) {
  return (
    <>
      <ZonePlatform color={color} shape="circle" scale={0.56} />
      <HologramCurtain color={color} />
      {[-2.2, -1.2, 0, 1.25, 2.2].map((x, index) => (
        <group key={x} position={[x, 0.35 + index % 2 * 0.25, -1.1 + Math.abs(x) * 0.12]}>
          <RoundedBox args={[0.72, 1.4 + (index % 3) * 0.45, 0.72]} radius={0.05} smoothness={3} position={[0, 0.7, 0]}>
            <meshStandardMaterial color="#131321" emissive={color} emissiveIntensity={0.1 + index * 0.025} metalness={0.76} roughness={0.24} />
          </RoundedBox>
          {[0.45, 0.85, 1.25].map((y) => (
            <mesh key={y} position={[0, y, 0.37]}>
              <planeGeometry args={[0.42, 0.06]} />
              <meshBasicMaterial color={color} />
            </mesh>
          ))}
        </group>
      ))}
      <pointLight position={[0, 2.5, 1]} color={color} intensity={4} distance={7} />
    </>
  );
}

function StackForgeLandmark({ color, reducedMotion }) {
  const coreRef = useRef();
  const ringRef = useRef();
  const crownRef = useRef();
  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.34;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.22;
    if (crownRef.current) {
      crownRef.current.rotation.y += delta * 0.16;
      crownRef.current.position.y = 2.72 + Math.sin(state.clock.elapsedTime * 1.1) * 0.08;
    }
  });
  return (
    <>
      <ZonePlatform color={color} shape="circle" scale={0.76} />
      <group ref={coreRef} position={[0, 1.18, -0.55]}>
        <mesh>
          <cylinderGeometry args={[0.62, 0.82, 2.35, 12]} />
          <meshStandardMaterial color="#0d1222" emissive={color} emissiveIntensity={0.34} metalness={0.86} roughness={0.22} />
        </mesh>
        {[-0.72, -0.2, 0.32, 0.82].map((y, index) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, index * 0.16]}>
            <torusGeometry args={[0.72 + index * 0.04, 0.035, 8, 56]} />
            <meshBasicMaterial color={index % 2 ? "#22d3ee" : color} toneMapped={false} transparent opacity={0.82} />
          </mesh>
        ))}
        <pointLight color={color} distance={7} intensity={4.2} position={[0, 0.25, 0.8]} />
      </group>
      <group ref={ringRef} position={[0, 1.32, -0.55]} rotation={[Math.PI / 2.8, 0.15, 0]}>
        <mesh>
          <torusGeometry args={[1.45, 0.045, 8, 84]} />
          <meshBasicMaterial color="#22d3ee" toneMapped={false} transparent opacity={0.66} />
        </mesh>
        <mesh rotation={[0.35, 0.2, 0.5]}>
          <torusGeometry args={[1.82, 0.018, 6, 96]} />
          <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.42} />
        </mesh>
      </group>
      <group ref={crownRef} position={[0, 2.72, -0.55]}>
        <mesh>
          <octahedronGeometry args={[0.32, 1]} />
          <meshStandardMaterial color="#dbeafe" emissive="#22d3ee" emissiveIntensity={2.4} metalness={0.3} roughness={0.16} toneMapped={false} />
        </mesh>
      </group>
      {[-2.15, -1.35, 1.35, 2.15].map((x, index) => (
        <group key={x} position={[x, 0.66 + (index % 2) * 0.18, -1.18 + Math.abs(x) * 0.1]}>
          <RoundedBox args={[0.48, 1.5 + (index % 2) * 0.34, 0.58]} radius={0.055} smoothness={3}>
            <meshStandardMaterial color="#111827" emissive={index % 2 ? "#22d3ee" : color} emissiveIntensity={0.12} metalness={0.8} roughness={0.3} />
          </RoundedBox>
          {[0.18, 0.48, 0.78].map((y) => (
            <mesh key={y} position={[0, y - 0.62, 0.3]}>
              <planeGeometry args={[0.3, 0.035]} />
              <meshBasicMaterial color={index % 2 ? "#22d3ee" : color} toneMapped={false} />
            </mesh>
          ))}
        </group>
      ))}
    </>
  );
}

function LeisureObservatory({ color, reducedMotion }) {
  const orbitRef = useRef();
  const satelliteRef = useRef();
  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (orbitRef.current) orbitRef.current.rotation.z += delta * 0.11;
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y -= delta * 0.24;
      satelliteRef.current.position.y = 2.34 + Math.sin(state.clock.elapsedTime * 0.82) * 0.1;
    }
  });
  return (
    <>
      <ZonePlatform color={color} shape="hex" scale={0.74} />
      <group position={[0, 0.02, -0.72]}>
        <mesh position={[0, 0.78, 0]}>
          <sphereGeometry args={[1.22, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#081622" emissive={color} emissiveIntensity={0.12} metalness={0.76} opacity={0.58} roughness={0.24} transparent wireframe />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[1.32, 1.48, 0.24, 32]} />
          <meshStandardMaterial color="#101923" metalness={0.82} roughness={0.32} />
        </mesh>
        <group position={[0.35, 1.16, 0.1]} rotation={[0.22, -0.58, -0.16]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.3, 1.45, 16]} />
            <meshStandardMaterial color="#152433" emissive="#22d3ee" emissiveIntensity={0.24} metalness={0.84} roughness={0.24} />
          </mesh>
          <mesh position={[0.72, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.08, 24]} />
            <meshBasicMaterial color="#67e8f9" toneMapped={false} transparent opacity={0.86} />
          </mesh>
        </group>
      </group>
      <group ref={orbitRef} position={[0, 1.68, -0.65]} rotation={[0.72, 0.15, 0]}>
        <mesh>
          <torusGeometry args={[2.05, 0.018, 6, 96]} />
          <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.42} />
        </mesh>
        {[0, Math.PI * 0.72, Math.PI * 1.38].map((angle) => (
          <mesh key={angle} position={[Math.cos(angle) * 2.05, Math.sin(angle) * 2.05, 0]}>
            <sphereGeometry args={[0.085, 12, 12]} />
            <meshBasicMaterial color={angle > 3 ? "#ec4899" : "#67e8f9"} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <group ref={satelliteRef} position={[0, 2.34, -0.68]}>
        <mesh>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial color="#dff8ff" emissive={color} emissiveIntensity={1.9} metalness={0.46} roughness={0.18} toneMapped={false} />
        </mesh>
      </group>
      <pointLight color={color} distance={7} intensity={3.4} position={[0, 2.1, 0.6]} />
    </>
  );
}

function SignalGate({ color, reducedMotion, onActivate, active }) {
  const gateRef = useRef();
  const innerRef = useRef();
  const portalMaterialRef = useRef();
  const portalLightRef = useRef();
  const activationStartedAt = useRef(null);
  const [activated, setActivated] = useState(false);
  useFrame((state, delta) => {
    if (activated || active) {
      if (activationStartedAt.current === null) activationStartedAt.current = state.clock.elapsedTime;
      const progress = smoothstep((state.clock.elapsedTime - activationStartedAt.current) / 0.95);
      if (gateRef.current) gateRef.current.rotation.z += delta * (0.9 + progress * 3.8);
      if (innerRef.current) {
        innerRef.current.rotation.z -= delta * (1.8 + progress * 5.2);
        innerRef.current.scale.setScalar(1 + progress * 0.58 + Math.sin(state.clock.elapsedTime * 14) * 0.025);
      }
      if (portalMaterialRef.current) portalMaterialRef.current.opacity = 0.12 + progress * 0.8;
      if (portalLightRef.current) portalLightRef.current.intensity = 5.2 + progress * 12;
      return;
    }
    if (reducedMotion) return;
    if (gateRef.current) gateRef.current.rotation.z += delta * 0.055;
    if (innerRef.current) {
      innerRef.current.rotation.z -= delta * 0.12;
      innerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.35) * 0.025);
    }
  });
  useEffect(() => () => { document.body.style.cursor = ""; }, []);
  const activatePortal = (event) => {
    event.stopPropagation();
    if (activated) return;
    setActivated(true);
    document.body.style.cursor = "";
    onActivate?.();
  };
  return (
    <>
      <ZonePlatform color={color} shape="circle" scale={0.82} />
      <group
        position={[0, 2.12, -0.95]}
        onClick={activatePortal}
        onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = ""; }}
      >
        <group ref={gateRef}>
          <mesh>
            <torusGeometry args={[1.72, 0.16, 12, 96]} />
            <meshStandardMaterial color="#131022" emissive={color} emissiveIntensity={0.72} metalness={0.88} roughness={0.2} />
          </mesh>
          {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => (
            <mesh key={angle} position={[Math.cos(angle) * 1.72, Math.sin(angle) * 1.72, 0.02]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.62, 0.13, 0.22]} />
              <meshBasicMaterial color={angle % Math.PI ? "#22d3ee" : color} toneMapped={false} />
            </mesh>
          ))}
        </group>
        <group ref={innerRef}>
          <mesh>
            <torusGeometry args={[1.34, 0.035, 8, 96]} />
            <meshBasicMaterial color="#67e8f9" toneMapped={false} transparent opacity={0.92} />
          </mesh>
          <mesh position={[0, 0, -0.08]}>
            <circleGeometry args={[1.28, 64]} />
            <meshBasicMaterial ref={portalMaterialRef} blending={THREE.AdditiveBlending} color="#8b5cf6" depthWrite={false} opacity={0.12} transparent />
          </mesh>
        </group>
        <mesh position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.045, 2.34]} />
          <meshBasicMaterial blending={THREE.AdditiveBlending} color="#67e8f9" depthWrite={false} opacity={0.54} transparent toneMapped={false} />
        </mesh>
        <pointLight ref={portalLightRef} color={color} distance={9} intensity={5.2} position={[0, 0, 1.1]} />
      </group>
      {[-2.2, 2.2].map((x, index) => (
        <group key={x} position={[x, 1.18, -1]}>
          <RoundedBox args={[0.48, 2.7, 0.62]} radius={0.07} smoothness={3}>
            <meshStandardMaterial color="#11101c" emissive={index ? "#22d3ee" : color} emissiveIntensity={0.18} metalness={0.84} roughness={0.28} />
          </RoundedBox>
          <mesh position={[0, 0.72, 0.33]}>
            <planeGeometry args={[0.26, 0.62]} />
            <meshBasicMaterial color={index ? "#22d3ee" : color} toneMapped={false} transparent opacity={0.82} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function CyberLocation({ scene, index, onNext, reducedMotion, portalExiting }) {
  const group = useRef();
  const environmentColor = index === 0 ? "#6f7cff" : scene.color;
  const verticalOffset = index === 1 ? -1.62 : 0;
  const baseY = scene.position[1] + verticalOffset;
  useFrame((state) => {
    if (group.current) group.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.65 + index) * 0.035;
  });
  return (
    <group
      ref={group}
      position={[scene.position[0], baseY, scene.position[2]]}
      scale={index === 0 ? 1.18 : index === 1 ? 0.78 : 1}
    >
      {index === 0 ? <IdentityDock color={environmentColor} reducedMotion={reducedMotion} /> : null}
      {index === 1 ? <MemoryVault color={scene.color} /> : null}
      {index === 2 ? <BuildDistrict color={scene.color} /> : null}
      {index === 3 ? <StackForgeLandmark color={scene.color} reducedMotion={reducedMotion} /> : null}
      {index === 4 ? <LeisureObservatory color={scene.color} reducedMotion={reducedMotion} /> : null}
      {index === 5 ? <SignalGate color={scene.color} reducedMotion={reducedMotion} onActivate={onNext} active={portalExiting} /> : null}
      {index === 0 ? <InfoTerminal scene={scene} isLast={false} onTrigger={onNext} /> : null}
    </group>
  );
}

function CinematicCamera({ scene, reducedMotion }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(...tourScenes[0].position));
  const desiredPosition = useMemo(() => new THREE.Vector3(...scene.camera), [scene.camera]);
  const desiredLookAt = useMemo(
    () => new THREE.Vector3(
      scene.position[0],
      scene.id === "intro" ? 1.2 : scene.id === "experience" ? -0.12 : 0.75,
      scene.position[2],
    ),
    [scene.id, scene.position],
  );
  useFrame((_, delta) => {
    const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 1.85);
    camera.position.lerp(desiredPosition, ease);
    lookAt.current.lerp(desiredLookAt, ease);
    camera.lookAt(lookAt.current);
  });
  return null;
}

function TransitGate({ scene, moving, reducedMotion }) {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current && moving && !reducedMotion) group.current.rotation.z += delta * 0.7;
  });
  if (!moving || reducedMotion) return null;
  return (
    <group ref={group} position={[scene.position[0], 1.2, scene.position[2] + 2.8]}>
      {[0, 1, 2, 3].map((ring) => (
        <mesh key={ring} position={[0, 0, ring * 0.5]}>
          <torusGeometry args={[2.8 - ring * 0.34, 0.025, 8, 72]} />
          <meshBasicMaterial color={scene.color} transparent opacity={0.42 - ring * 0.07} />
        </mesh>
      ))}
    </group>
  );
}

function World({ activeIndex, reducedMotion, moving, onNext, portalExiting, liteMode }) {
  const scene = tourScenes[activeIndex];
  const theme = zoneThemes[scene.id];
  const isContact = activeIndex === tourScenes.length - 1;
  const hasAnimatedBackground = [0, 1, 2, 3, 4, 5].includes(activeIndex);
  return (
    <>
      {!hasAnimatedBackground ? <color attach="background" args={[theme.background]} /> : null}
      <fog attach="fog" args={[theme.background, 8, 24]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 9, 6]} color="#efe7ff" intensity={1.3} />
      {!isContact ? <Stars radius={52} depth={32} count={liteMode ? 420 : 1100} factor={2.2} saturation={0.6} fade speed={reducedMotion ? 0 : 0.18} /> : null}
      <CinematicCamera scene={scene} reducedMotion={reducedMotion} />
      <CyberLocation key={scene.id} scene={scene} index={activeIndex} onNext={onNext} reducedMotion={reducedMotion} portalExiting={portalExiting} />
      {!isContact ? <TransitGate scene={scene} moving={moving} reducedMotion={reducedMotion} /> : null}
      {!hasAnimatedBackground ? (
        <>
          <gridHelper args={[38, 38, scene.color, theme.grid]} position={[scene.position[0], -0.5, scene.position[2]]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[scene.position[0], -0.52, scene.position[2]]}>
            <circleGeometry args={[19, 80]} />
            <meshBasicMaterial color={theme.floor} transparent opacity={0.94} />
          </mesh>
        </>
      ) : null}
      {!liteMode ? <EffectComposer multisampling={0}>
        <Bloom intensity={activeIndex === 0 ? 0.72 : 0.34} luminanceThreshold={0.72} luminanceSmoothing={0.22} mipmapBlur radius={0.58} />
      </EffectComposer> : null}
    </>
  );
}

export default function CyberWorld({ activeIndex, reducedMotion, moving, onNext, portalExiting, liteMode = false }) {
  return (
    <Canvas
      camera={{ position: tourScenes[0].camera, fov: 46 }}
      dpr={liteMode ? [0.75, 1] : [1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.92;
      }}
      shadows={!liteMode}
    >
      <Suspense fallback={null}>
        <World activeIndex={activeIndex} reducedMotion={reducedMotion} moving={moving} onNext={onNext} portalExiting={portalExiting} liteMode={liteMode} />
      </Suspense>
    </Canvas>
  );
}
