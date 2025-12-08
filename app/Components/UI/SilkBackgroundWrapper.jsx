'use client';

import dynamic from 'next/dynamic';

// Dynamically import SilkBackground to avoid SSR issues with WebGL
const SilkBackground = dynamic(() => import('./SilkBackground'), {
  ssr: false,
});

export default function SilkBackgroundWrapper() {
  return <SilkBackground />;
}

