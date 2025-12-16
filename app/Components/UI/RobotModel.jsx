'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function Model({ isDragging, scrollProgress = 0 }) {
  const { scene, animations } = useGLTF('/flying_robot.glb');
  const groupRef = useRef();
  const { actions } = useAnimations(animations, groupRef);

  // Play animations if they exist (wings, hover etc.)
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((action) => {
        if (action) action.play();
      });
    }
  }, [actions]);

  // Initial orientation: Hero pose (looking left)
  useEffect(() => {
    if (groupRef.current) {
      const leftRotationY = (-55 * Math.PI) / 180;
      groupRef.current.rotation.set(0, leftRotationY, 0);
    }
  }, []);

  useFrame(() => {
    if (!groupRef.current || isDragging) return;

    const heroYaw = (-55 * Math.PI) / 180;   // Hero: looking left
    const aboutYaw = (50 * Math.PI) / 180;   // About: looking right

    // Gap section ke liye: Horizontal rotation (no tilt, no pitch)
    // Same as hero/about section - just horizontal
    const rollDeg = 0;                       // No side tilt
    const rollRad = (rollDeg * Math.PI) / 180;

    // No forward tilt - horizontal like hero/about
    const pitchDeg = 0;                      // No pitch, horizontal
    const pitchRad = (pitchDeg * Math.PI) / 180;

    const safeProgress =
      typeof scrollProgress === 'number' && !isNaN(scrollProgress)
        ? scrollProgress
        : 0;
    const p = Math.max(0, Math.min(1, safeProgress));

    const rot = groupRef.current.rotation;

    if (p <= 0.5) {
      // 0 → 0.5 : Hero → About (yaw only, no tilt)
      const local = p / 0.5; // 0 → 1
      const targetY = heroYaw + (aboutYaw - heroYaw) * local;

      const lerp = 0.18;
      rot.y += (targetY - rot.y) * lerp;
      rot.x += (0 - rot.x) * lerp;
      rot.z += (0 - rot.z) * lerp;
      return;
    }

    // 0.5 → 1 : About pose → Hero direction (left side dekhne lage)
    const t = (p - 0.5) / 0.5; // 0 → 1

    // About ke liye quaternion (seedha, right ki taraf dekh raha hai)
    const aboutEuler = new THREE.Euler(0, aboutYaw, 0, 'XYZ');
    const aboutQuat = new THREE.Quaternion().setFromEuler(aboutEuler);

    // Final fly pose: Hero section jaisi direction (left side)
    // No tilt, no pitch - just horizontal rotation like hero section
    // Euler order: XYZ (pitch, yaw, roll)
    // X (pitch): 0 (horizontal, no forward tilt)
    // Y (yaw): Hero direction (heroYaw) - left side, same as hero section
    // Z (roll): 0 (no side tilt, horizontal)
    const flyEuler = new THREE.Euler(0, heroYaw, 0, 'XYZ');
    const flyQuat = new THREE.Quaternion().setFromEuler(flyEuler);

    // About → Hero direction ke beech smooth transition
    const targetQuat = new THREE.Quaternion()
      .copy(aboutQuat)
      .slerp(flyQuat, t);

    // Current orientation ko target ki taraf slerp karo (faster for gap section)
    // Faster lerp for quick rotation in gap section
    const lerpSpeed = p > 0.5 ? 0.55 : 0.35; // Faster in gap section
    groupRef.current.quaternion.slerp(targetQuat, lerpSpeed);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={7} position={[0, -3.5, 0]} />
    </group>
  );
}

function ErrorFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center text-white/50">
      <p>Failed to load 3D model</p>
    </div>
  );
}

export default function RobotModel({ scrollProgress = 0 }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className="w-full h-full bg-transparent pointer-events-none"
      style={{ backgroundColor: 'transparent' }}
    >
      <Canvas
        camera={{ position: [0, 0.2, 10], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Transparent background
        }}
        dpr={[1, 2]}
        style={{
          background: 'transparent',
          backgroundColor: 'transparent',
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <pointLight position={[0, 10, 0]} intensity={1} />
          <Model isDragging={isDragging} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// NOTE: yahan wohi path rakha jo pehle tha
useGLTF.preload('/bird_model.glb');
