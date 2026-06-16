import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { inter } from '../shared/fonts';
import { C, ColorName, getColor } from '../shared/theme';
import { ConceptoLogo } from '../shared/ConceptoLogo';
import { LensFlare } from '../shared/LensFlare';

export type TextLine = {
  text: string;
  color?: ColorName;
  size?: number;
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  marginTop?: number;
  marginBottom?: number;
  letterSpacing?: string;
  lineHeight?: number;
  isLabel?: boolean;
};

export type ListItem = {
  text: string;
  bullet?: string;
  color?: ColorName;
  size?: number;
};

export type NumberBlock = {
  value: string;
  label: string;
  sublabel?: string;
  color?: ColorName;
  size?: number;
};

export type TipoAProps = {
  preheadline?: string;
  lines: TextLine[];
  numberBlock?: NumberBlock;
  divider?: boolean;
  listItems?: ListItem[];
  ctaLine?: string;
  ctaColor?: ColorName;
  format?: '1:1' | '4:5';
  glowHigh?: boolean;
  slideNumber?: string;
  noLensFlare?: boolean;
  lensFlareTop?: number;
  valign?: 'top' | 'center' | 'bottom';
  paddingTopExtra?: number;
};

const spr = (fps: number, frame: number, sf: number) =>
  spring({
    fps,
    frame: Math.max(0, frame - sf),
    config: { damping: 14, stiffness: 110 },
    durationInFrames: 22,
  });

export const TipoA: React.FC<TipoAProps> = ({
  preheadline,
  lines,
  numberBlock,
  divider,
  listItems,
  ctaLine,
  ctaColor = 'violet',
  glowHigh = false,
  slideNumber,
  noLensFlare = false,
  lensFlareTop = 65,
  valign = 'center',
  paddingTopExtra = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const padH = Math.round(width * 0.09);
  const padV = Math.round(height * 0.07) + paddingTopExtra;

  const bgFade = Math.min(1, frame / 12);

  // Build element queue with staggered delays
  type Elem =
    | { type: 'pre'; text: string; delay: number }
    | { type: 'number'; nb: NumberBlock; delay: number }
    | { type: 'line'; line: TextLine; delay: number }
    | { type: 'divider'; delay: number }
    | { type: 'list'; item: ListItem; delay: number }
    | { type: 'cta'; text: string; delay: number };

  const elems: Elem[] = [];
  let delay = 5;

  if (preheadline) {
    elems.push({ type: 'pre', text: preheadline, delay });
    delay += 13;
  }
  if (numberBlock) {
    elems.push({ type: 'number', nb: numberBlock, delay });
    delay += 15;
  }
  lines.forEach((line) => {
    elems.push({ type: 'line', line, delay });
    delay += line.marginTop ? Math.max(10, line.marginTop / 6) : 11;
  });
  if (divider) {
    elems.push({ type: 'divider', delay });
    delay += 8;
  }
  if (listItems) {
    listItems.forEach((item) => {
      elems.push({ type: 'list', item, delay });
      delay += 9;
    });
  }
  if (ctaLine) {
    elems.push({ type: 'cta', text: ctaLine, delay: delay + 6 });
  }

  const justContent =
    valign === 'top'
      ? 'flex-start'
      : valign === 'bottom'
        ? 'flex-end'
        : 'center';

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: inter }}>
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: bgFade,
          background: `radial-gradient(ellipse 70% 45% at 50% 100%, rgba(91,94,244,${glowHigh ? 0.23 : 0.15}) 0%, transparent 70%)`,
        }}
      />

      {/* Slide number for carousels */}
      {slideNumber && (
        <div
          style={{
            position: 'absolute',
            top: 48,
            right: 72,
            fontSize: 14,
            fontWeight: 400,
            color: C.muted,
            letterSpacing: '0.08em',
            fontFamily: inter,
          }}
        >
          {slideNumber}
        </div>
      )}

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: justContent,
          padding: `${padV}px ${padH}px`,
          gap: 0,
        }}
      >
        {elems.map((elem, i) => {
          const p = spr(fps, frame, elem.delay);
          const anim: React.CSSProperties = {
            opacity: p,
            transform: `translateY(${11 * (1 - p)}px)`,
          };

          if (elem.type === 'pre') {
            return (
              <div
                key={i}
                style={{
                  ...anim,
                  fontSize: 15,
                  fontWeight: 400,
                  color: C.gray,
                  letterSpacing: '0.01em',
                  lineHeight: 1.4,
                  marginBottom: 18,
                }}
              >
                {elem.text}
              </div>
            );
          }

          if (elem.type === 'number') {
            const nb = elem.nb;
            const numSize = nb.size ?? 104;
            return (
              <div key={i} style={{ ...anim, marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: numSize,
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: nb.color ? getColor(nb.color) : C.violet,
                  }}
                >
                  {nb.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: C.muted,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginTop: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {nb.label}
                </div>
                {nb.sublabel && (
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.muted,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      lineHeight: 1.3,
                    }}
                  >
                    {nb.sublabel}
                  </div>
                )}
              </div>
            );
          }

          if (elem.type === 'line') {
            const { line } = elem;
            const isLabel = line.isLabel ?? false;
            const size = line.size ?? (isLabel ? 12 : 72);
            const color = line.color ?? 'white';
            const weight =
              line.weight ??
              (isLabel ? 600 : color === 'gray' || color === 'muted' ? 800 : 900);
            return (
              <div
                key={i}
                style={{
                  ...anim,
                  fontSize: size,
                  fontWeight: weight,
                  color: getColor(color),
                  lineHeight: isLabel
                    ? 1.3
                    : (line.lineHeight ?? (size > 40 ? 0.92 : 1.4)),
                  letterSpacing: isLabel
                    ? '0.12em'
                    : (line.letterSpacing ?? (size > 40 ? '-0.025em' : '-0.01em')),
                  textTransform: isLabel ? 'uppercase' : undefined,
                  marginTop: line.marginTop ?? (i > 0 ? 4 : 0),
                  marginBottom: line.marginBottom ?? 0,
                }}
              >
                {line.text}
              </div>
            );
          }

          if (elem.type === 'divider') {
            return (
              <div
                key={i}
                style={{
                  ...anim,
                  height: '1px',
                  backgroundColor: C.border,
                  width: '60%',
                  margin: '22px 0',
                }}
              />
            );
          }

          if (elem.type === 'list') {
            const { item } = elem;
            return (
              <div
                key={i}
                style={{
                  ...anim,
                  fontSize: item.size ?? 19,
                  fontWeight: 400,
                  color: getColor(item.color ?? 'white'),
                  lineHeight: 1.5,
                  marginTop: 5,
                }}
              >
                <span style={{ color: C.violet, marginRight: 10 }}>
                  {item.bullet ?? '→'}
                </span>
                {item.text}
              </div>
            );
          }

          if (elem.type === 'cta') {
            return (
              <div
                key={i}
                style={{
                  ...anim,
                  fontSize: 22,
                  fontWeight: 600,
                  color: getColor(ctaColor),
                  lineHeight: 1.5,
                  marginTop: 22,
                }}
              >
                {elem.text}
              </div>
            );
          }

          return null;
        })}
      </AbsoluteFill>

      {!noLensFlare && <LensFlare startFrame={62} topPercent={lensFlareTop} />}
      <ConceptoLogo />
    </AbsoluteFill>
  );
};
