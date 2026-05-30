import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const LensFlare: React.FC<{
  startFrame?: number;
  topPercent?: number;
}> = ({ startFrame = 60, topPercent = 65 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: { damping: 20, stiffness: 60 },
    durationInFrames: 20,
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: `${topPercent}%`,
        height: '1px',
        background:
          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.8) 70%, transparent 100%)',
        opacity: progress * 0.35,
        filter: 'blur(1.5px)',
        pointerEvents: 'none',
      }}
    />
  );
};
