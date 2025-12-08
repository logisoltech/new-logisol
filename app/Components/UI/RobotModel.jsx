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
  // At progress 0 (Hero): look left (120-130 degrees = ~2.09-2.27 radians)
  // At progress 1 (About): look at About content (rotate to face right, ~0 radians or slightly positive)
  useFrame(() => {
    if (groupRef.current && !isDragging) {
      // Start rotation: looking left (125 degrees = ~2.18 radians)
      // End rotation: looking at About content (0 radians = forward/right)
      const startRotationY = (330 * Math.PI) / 180; // ~2.18 radians (looking left)
      const endRotationY = (50 * Math.PI) / 180; // Looking forward/right at About content
      
      // Interpolate rotation based on scroll progress
      const targetRotationY = startRotationY + (endRotationY - startRotationY) * scrollProgress;
      
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
      const initialRotationY = (125 * Math.PI) / 180; // ~2.18 radians (looking left)
      groupRef.current.rotation.y = initialRotationY;
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
    }
  }, []);
  
  return (
    <group ref={groupRef} rotation={[0, (125 * Math.PI) / 180, 0]}>
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
      <div className="w-full h-full bg-transparent pointer-events-none">
        <Canvas
          camera={{ position: [0, 0.2, 10], fov: 60 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false
          }}
          dpr={[1, 2]}
          style={{ 
            background: 'transparent', 
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
