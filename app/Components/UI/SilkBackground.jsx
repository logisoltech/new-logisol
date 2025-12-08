'use client';

import { GridScan } from '../../../components/GridScan';

export default function SilkBackground() {
  return (
    <div className="fixed inset-0 z-0 w-screen h-screen pointer-events-none bg-black">
      <GridScan
        sensitivity={0.55}
        lineThickness={1}
        linesColor="#0f0f0f"
        gridScale={0.1}
        scanColor="#00d3f3"
        scanOpacity={0.4}
        enablePost={true}
        bloomIntensity={0.6}
        chromaticAberration={0.002}
        noiseIntensity={0.01}
      />
    </div>
  );
}

