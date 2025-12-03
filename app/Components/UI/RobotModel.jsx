'use client';

import { useGLTF, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

function Model() {
  const { scene } = useGLTF('/cute_robot.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={1} 
      position={[0, 0.5, 0]} 
    />
  );
}

function ErrorFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center text-white/50">
      <p>Failed to load 3D model</p>
    </div>
  );
}

export default function RobotModel() {
  return (
      <div className="w-full h-full bg-transparent">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            clearColor: 0x000000,
            clearAlpha: 0
          }}
          dpr={[1, 2]}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <pointLight position={[0, 10, 0]} intensity={1} />
            <OrbitControls 
              enableDamping 
              dampingFactor={0.05}
              minDistance={5}
              maxDistance={5}
              enableZoom={false}
              enablePan={true}
              enableRotate={true}
            />
            <Model />
          </Suspense>
        </Canvas>
      </div>
  );
}

useGLTF.preload('/cute_robot.glb');
