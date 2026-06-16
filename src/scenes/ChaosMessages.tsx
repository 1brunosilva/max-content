/**
 * ChaosMessages — burbujas de chat que se acumulan SIN respuesta (el dolor).
 * Visualiza el caos (Stripe/Slack pain → la herramienta como alivio). Cada burbuja
 * entra con stagger + leve jitter determinista. Doble check gris = "visto, sin responder".
 */
import React from 'react';
import { useCurrentFrame, useVideoConfig, random } from 'remotion';
import { World } from '../engine';
import { springPreset, S } from '../engine';
import { useBrand } from '../brand';
import { useReveal, type Frames } from './_util';

type Msg = { text: string; time?: string };

export const ChaosMessages: React.FC<{
  at: { x: number; y: number };
  frames: Frames;
  messages: Msg[];
  width?: number;
  startDelay?: number;
  stagger?: number;
}> = ({ at, frames, messages, width = 560, startDelay = 6, stagger = 14 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = useBrand();
  const reveal = useReveal(frames);
  const gap = 22;
  const bubbleH = 96;
  const totalH = messages.length * (bubbleH + gap);

  return (
    <World x={at.x} y={at.y} w={width} h={totalH} opacity={reveal}>
      <div style={{ position: 'relative', width, height: totalH }}>
        {messages.map((m, i) => {
          const appear = springPreset(frame, fps, S.settle, frames.from + startDelay + i * stagger);
          const jitterX = (random(`cm${i}`) - 0.5) * 36;
          const rot = (random(`cr${i}`) - 0.5) * 3;
          const y = i * (bubbleH + gap);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: y,
                left: jitterX,
                width: width - 40,
                opacity: appear,
                transform: `translateY(${(1 - appear) * 28}px) scale(${0.92 + appear * 0.08}) rotate(${rot}deg)`,
                transformOrigin: 'left center',
              }}
            >
              <div
                style={{
                  background: b.surface,
                  border: `1px solid ${b.border}`,
                  borderRadius: 22,
                  borderTopLeftRadius: 6,
                  padding: '20px 26px',
                  boxShadow: `0 24px 50px -24px rgba(0,0,0,0.7)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 18,
                }}
              >
                <span style={{ fontFamily: b.font.display, fontWeight: 500, fontSize: 30, color: b.textHi }}>
                  {m.text}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <span style={{ fontFamily: b.font.mono, fontSize: 17, color: b.textLo }}>
                    {m.time ?? '23:47'}
                  </span>
                  {/* doble check gris = sin responder */}
                  <span style={{ color: b.textLo, fontSize: 20, letterSpacing: '-6px' }}>✓✓</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </World>
  );
};
