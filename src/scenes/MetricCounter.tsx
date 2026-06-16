/**
 * MetricCounter — NIVEL 1: un número grande que cuenta hasta su valor + label.
 * El dato concreto del lever (loss aversion / social proof). Acento + glow.
 */
import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { World, E, springPreset, S } from '../engine';
import { useBrand } from '../brand';
import { useReveal, type Frames } from './_util';

export const MetricCounter: React.FC<{
  at: { x: number; y: number };
  frames: Frames;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  size?: number;
  startDelay?: number;
}> = ({ at, frames, value, prefix = '', suffix = '', label, size = 320, startDelay = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = useBrand();
  const reveal = useReveal(frames);

  const count = interpolate(
    frame,
    [frames.from + startDelay, frames.from + startDelay + 42],
    [0, value],
    { easing: E.expoOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const pop = springPreset(frame, fps, S.gentle, frames.from + startDelay);
  const shown = Math.round(count);

  return (
    <World x={at.x} y={at.y} w={1000} opacity={reveal}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div
          style={{
            fontFamily: b.font.display,
            fontWeight: 800,
            fontSize: size,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: b.primary,
            textShadow: `0 0 70px ${b.glow}`,
            transform: `scale(${0.9 + pop * 0.1})`,
            transformOrigin: 'left center',
          }}
        >
          {prefix}
          {shown}
          <span style={{ fontSize: size * 0.45, color: b.primaryLight }}>{suffix}</span>
        </div>
        <div
          style={{
            marginTop: 18,
            maxWidth: 720,
            fontFamily: b.font.mono,
            fontSize: 26,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: b.textLo,
            lineHeight: 1.45,
          }}
        >
          {label}
        </div>
      </div>
    </World>
  );
};
