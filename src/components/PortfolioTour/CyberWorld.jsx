import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Float, RoundedBox, Stars, useTexture } from "@react-three/drei";
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

function IdentityDock({ color }) {
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

function CyberLocation({ scene, index, onNext }) {
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
      {index === 0 ? <IdentityDock color={environmentColor} /> : null}
      {index === 1 ? <MemoryVault color={scene.color} /> : null}
      {index === 2 ? <BuildDistrict color={scene.color} /> : null}
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

function World({ activeIndex, reducedMotion, moving, onNext }) {
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
      {!isContact ? <Stars radius={52} depth={32} count={1100} factor={2.2} saturation={0.6} fade speed={reducedMotion ? 0 : 0.18} /> : null}
      <CinematicCamera scene={scene} reducedMotion={reducedMotion} />
      {!isContact ? <CyberLocation key={scene.id} scene={scene} index={activeIndex} onNext={onNext} /> : null}
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
    </>
  );
}

export default function CyberWorld({ activeIndex, reducedMotion, moving, onNext }) {
  return (
    <Canvas camera={{ position: tourScenes[0].camera, fov: 46 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
      <Suspense fallback={null}>
        <World activeIndex={activeIndex} reducedMotion={reducedMotion} moving={moving} onNext={onNext} />
      </Suspense>
    </Canvas>
  );
}
