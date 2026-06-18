import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

interface SplashCanvasProps {
  /** 0..100 — drives the orb's inner glow. */
  progress: number;
  /** Completion → orb pulse + brighten. */
  isReady: boolean;
}

const COLORS = {
  indigo: "#4F46E5",
  purple: "#7C3AED",
  cyan: "#06B6D4",
  emerald: "#10B981",
};

const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

/* ------------------------------------------------------------------ Aurora */

const AURORA_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const AURORA_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uA, uB, uC, uD;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float t = uTime * 0.05;
    vec2 q = vec2(fbm(uv * 2.0 + t), fbm(uv * 2.0 - t + 5.2));
    float n = fbm(uv * 3.0 + q * 1.6 + vec2(0.0, t * 1.4));
    vec3 col = mix(uA, uB, smoothstep(0.0, 0.65, n));
    col = mix(col, uC, smoothstep(0.45, 1.0, q.x));
    col = mix(col, uD, smoothstep(0.7, 1.0, q.y) * 0.5);
    float band = smoothstep(0.15, 0.95, n + uv.y * 0.25);
    float vig = smoothstep(1.25, 0.15, length(uv - 0.5) * 1.7);
    gl_FragColor = vec4(col * 1.25, band * vig * 0.55);
  }
`;

function Aurora() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uA: { value: new THREE.Color(COLORS.indigo) },
      uB: { value: new THREE.Color(COLORS.purple) },
      uC: { value: new THREE.Color(COLORS.cyan) },
      uD: { value: new THREE.Color(COLORS.emerald) },
    }),
    [],
  );
  useFrame((state: RootState) => {
    if (ref.current) ref.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh position={[0, 0, -3]} scale={[20, 13, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={AURORA_VERT}
        fragmentShader={AURORA_FRAG}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* --------------------------------------------------------------- Particles */

function GlassParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = isMobile() ? 90 : 240;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 11;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return arr;
  }, [count]);

  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.35, "rgba(196,214,255,0.55)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(c);
  }, []);

  useEffect(() => () => sprite.dispose(), [sprite]);

  useFrame((state: RootState) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.03;
    ref.current.position.y = Math.sin(t * 0.25) * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.06}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.9}
        color="#cfe0ff"
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* --------------------------------------------------------------- Glass orb */

function GlassOrb({ progress, isReady }: SplashCanvasProps) {
  const orb = useRef<THREE.Group>(null);
  const glow = useRef<THREE.MeshBasicMaterial>(null);
  const pulse = useRef({ v: 0 });

  // Entrance: scale up 0.6 -> 1.
  useEffect(() => {
    if (orb.current) {
      gsap.fromTo(
        orb.current.scale,
        { x: 0.6, y: 0.6, z: 0.6 },
        { x: 1, y: 1, z: 1, duration: 1.6, ease: "power3.out" },
      );
    }
  }, []);

  // Completion: brighten + pop.
  useEffect(() => {
    if (!isReady) return;
    if (orb.current) {
      gsap.to(orb.current.scale, {
        x: 1.12,
        y: 1.12,
        z: 1.12,
        duration: 0.7,
        ease: "back.out(2)",
      });
    }
    gsap.fromTo(
      pulse.current,
      { v: 0 },
      { v: 1, duration: 0.8, ease: "power2.out", yoyo: true, repeat: 1 },
    );
  }, [isReady]);

  useFrame((state: RootState) => {
    const t = state.clock.elapsedTime;
    if (orb.current) {
      orb.current.position.y = Math.sin(t * 0.6) * 0.12;
      orb.current.rotation.y = t * 0.12;
      orb.current.rotation.x = Math.sin(t * 0.4) * 0.08;
    }
    if (glow.current) {
      glow.current.opacity = Math.min(
        1,
        0.12 + (progress / 100) * 0.3 + pulse.current.v * 0.5,
      );
    }
  });

  return (
    <group ref={orb}>
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <MeshTransmissionMaterial
          samples={isMobile() ? 3 : 5}
          resolution={isMobile() ? 128 : 256}
          thickness={1.3}
          roughness={0.12}
          transmission={1}
          ior={1.35}
          chromaticAberration={0.06}
          distortion={0.45}
          distortionScale={0.35}
          temporalDistortion={0.2}
          color="#dfe4ff"
        />
      </mesh>
      {/* Inner light core — brightens with progress, pops on ready. */}
      <mesh scale={0.55}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          ref={glow}
          color="#8aa0ff"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------- Parallax rig */

function Rig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      target.current.x = e.clientX / window.innerWidth - 0.5;
      target.current.y = e.clientY / window.innerHeight - 0.5;
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma != null && e.beta != null) {
        target.current.x = Math.max(-0.5, Math.min(0.5, e.gamma / 45));
        target.current.y = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 45));
      }
    };
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("deviceorientation", onTilt);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, []);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y +=
      (target.current.x * 0.5 - group.current.rotation.y) * 0.05;
    group.current.rotation.x +=
      (target.current.y * 0.3 - group.current.rotation.x) * 0.05;
  });

  return <group ref={group}>{children}</group>;
}

/* ------------------------------------------------------------------- Canvas */

export default function SplashCanvas({ progress, isReady }: SplashCanvasProps) {
  const dprMax = isMobile() ? 1.5 : 2;
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, dprMax]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 5]} intensity={6} color={COLORS.indigo} />
      <pointLight position={[-5, -2, 3]} intensity={5} color={COLORS.cyan} />
      <pointLight position={[0, 4, -2]} intensity={4} color={COLORS.purple} />

      <Aurora />
      <Rig>
        <GlassParticles />
        <GlassOrb progress={progress} isReady={isReady} />
      </Rig>

      {/* Procedural environment (no HDR download) for glass reflections. */}
      <Environment resolution={64}>
        <Lightformer form="circle" intensity={2.5} position={[0, 2, 4]} scale={6} color={COLORS.purple} />
        <Lightformer form="rect" intensity={1.6} position={[-4, 0, 2]} scale={4} color={COLORS.cyan} />
        <Lightformer form="rect" intensity={1.6} position={[4, 0, 2]} scale={4} color={COLORS.indigo} />
        <Lightformer form="circle" intensity={1.2} position={[0, -3, 2]} scale={5} color={COLORS.emerald} />
      </Environment>
    </Canvas>
  );
}
