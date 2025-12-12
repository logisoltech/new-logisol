'use client';

import { useGLTF, OrbitControls, useAnimations } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useState } from 'react';

function Model({ isDragging, scrollProgress = 0 }) {
  const { scene, animations } = useGLTF('/flying_robot.glb');
  const groupRef = useRef();
  const { actions } = useAnimations(animations, groupRef);

  // Play animations if they exist
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Play the first animation (usually the main animation like wing flapping)
      const actionNames = Object.keys(actions);
      actionNames.forEach(name => {
        if (actions[name]) {
          actions[name].play();
        }
      });
    }
  }, [actions]);

  // Calculate rotation based on scroll progress
  // At progress 0 (Hero): look left (-55 degrees)
  // At progress 0.5 (About): look at About content (facing right, 50 degrees)
  useFrame(() => {
    if (groupRef.current && !isDragging) {
      // Rotation angles in radians
      // In Three.js: 0 = forward, positive = right, negative = left
      // Looking left: -55 degrees or 305 degrees (125 degrees from forward, which is 180-55 = 125, so -55 or 305)
      // Looking right: 50 degrees (forward-right)
      const leftRotation = (-55 * Math.PI) / 180; // Looking left (~-0.96 radians)
      const rightRotation = (50 * Math.PI) / 180; // Looking forward/right (~0.87 radians)
      
      // Ensure scrollProgress is a valid number, default to 0
      const safeProgress = (typeof scrollProgress === 'number' && !isNaN(scrollProgress)) 
        ? scrollProgress 
        : 0;
      
      // Clamp scrollProgress to ensure it's between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, safeProgress));
      
      let targetRotationY;
      
      if (clampedProgress <= 0.5) {
        // From Hero (0) to About (0.5): look left to right
        const localProgress = clampedProgress / 0.5; // 0 to 1
        targetRotationY = leftRotation + (rightRotation - leftRotation) * localProgress;
      } else {
        // From About (0.5) to fly-out (1.0+): continue rotating right and add spin
        const flyOutProgress = (clampedProgress - 0.5) / 0.5; // 0 to 1 (when clampedProgress = 1.0)
        // Rotate from right (50 degrees) to spinning out (multiple rotations)
        // Add extra rotation for dramatic fly-out effect
        const extraRotation = flyOutProgress * Math.PI * 2; // One full rotation
        targetRotationY = rightRotation + extraRotation;
      }
      
      // Smooth interpolation for natural movement
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;
      
      // Keep X and Z rotations at 0
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
    }
  });
  
  // Set initial rotation to look left
  useEffect(() => {
    if (groupRef.current) {
      const initialRotationY = (-55 * Math.PI) / 180; // Looking left
      groupRef.current.rotation.y = initialRotationY;
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
    }
  }, []);
  
  return (
    <group ref={groupRef} rotation={[0, (-55 * Math.PI) / 180, 0]}>
      <primitive 
        object={scene} 
        scale={7} 
        position={[0, -3.5, 0]} 
      />
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
      <div className="w-full h-full bg-transparent pointer-events-none" style={{ backgroundColor: 'transparent' }}>
        <Canvas
          camera={{ position: [0, 0.2, 10], fov: 60 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false
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

useGLTF.preload('/bird_model.glb');
