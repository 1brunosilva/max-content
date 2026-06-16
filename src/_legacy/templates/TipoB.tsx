import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  staticFile,
} from 'remotion';
import { inter } from '../shared/fonts';
import { C, ColorName, getColor } from '../shared/theme';
import { ConceptoLogo } from '../shared/ConceptoLogo';
import { LensFlare } from '../shared/LensFlare';
import { TextLine, ListItem } from './TipoA';

export type StatsCard = {
  value: string;
  label: string;
  highlight?: boolean;
};

export type ChatMessage = {
  from: 'client' | 'max';
  text: string;
  meta?: string;
};

export type TipoBProps = {
  maxSrc: string;
  maxPosition?: 'right' | 'left';
  maxScale?: number;
  format?: '1:1' | '4:5';
  preheadline?: string;
  lines: TextLine[];
  listItems?: ListItem[];
  ctaLine?: string;
  ctaColor?: ColorName;
  statsCards?: StatsCard[];
  timestamp?: string;
  timestampSub?: string;
  chatMessages?: ChatMessage[];
  slideNumber?: string;
  textWidthPct?: number;
};

const spr = (fps: number, frame: number, sf: number) =>
  spring({
    fps,
    frame: Math.max(0, frame - sf),
    config: { damping: 14, stiffness: 110 },
    durationInFrames: 22,
  });

export const TipoB: React.FC<TipoBProps> = ({
  maxSrc,
  maxPosition = 'right',
  maxScale = 0.9,
  preheadline,
  lines,
  listItems,
  ctaLine,
  ctaColor = 'violet',
  statsCards,
  timestamp,
  timestampSub,
  chatMessages,
  slideNumber,
  textWidthPct = 47,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const padH = Math.round(width * 0.09);

  const maxProgress = spring({
    fps,
    frame: Math.max(0, frame - 6),
    config: { damping: 13, stiffness: 75 },
    durationInFrames: 30,
  });

  const maxDir = maxPosition === 'right' ? 1 : -1;
  const maxX = 50 * maxDir * (1 - maxProgress);

  let delay = 18;
  type Elem =
    | { type: 'pre'; text: string; delay: number }
    | { type: 'ts'; text: string; sub?: string; delay: number }
    | { type: 'line'; line: TextLine; delay: number }
    | { type: 'list'; item: ListItem; delay: number }
    | { type: 'stats'; cards: StatsCard[]; delay: number }
    | { type: 'chat'; msgs: ChatMessage[]; delay: number }
    | { type: 'cta'; text: string; delay: number };

  const elems: Elem[] = [];

  if (preheadline) {
    elems.push({ type: 'pre', text: preheadline, delay: 14 });
    delay = 26;
  }
  if (timestamp) {
    elems.push({ type: 'ts', text: timestamp, sub: timestampSub, delay });
    delay += 15;
  }
  lines.forEach((line) => {
    elems.push({ type: 'line', line, delay });
    delay += 11;
  });
  if (listItems) {
    listItems.forEach((item) => {
      elems.push({ type: 'list', item, delay });
      delay += 9;
    });
  }
  if (statsCards) {
    elems.push({ type: 'stats', cards: statsCards, delay });
    delay += 12;
  }
  if (chatMessages) {
    elems.push({ type: 'chat', msgs: chatMessages, delay });
    delay += 16;
  }
  if (ctaLine) {
    elems.push({ type: 'cta', text: ctaLine, delay: delay + 6 });
  }

  const textSide = maxPosition === 'right' ? 'left' : 'right';

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: inter, overflow: 'hidden' }}>
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 45% at 50% 100%, rgba(91,94,244,0.14) 0%, transparent 70%)',
        }}
      />

      {/* Violet underlight for MAX */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          [maxPosition === 'right' ? 'right' : 'left']: 0,
          width: `${100 - textWidthPct}%`,
          height: '45%',
          background:
            'radial-gradient(ellipse 65% 30% at 50% 95%, rgba(123,47,255,0.35) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* MAX image */}
      <div
        style={{
          position: 'absolute',
          [maxPosition]: 0,
          bottom: 0,
          width: `${100 - textWidthPct + 4}%`,
          height: `${maxScale * 96}%`,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          transform: `translateX(${maxX}px)`,
          opacity: Math.min(1, maxProgress * 1.1),
        }}
      >
        <Img
          src={staticFile(maxSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
          }}
        />
      </div>

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
          }}
        >
          {slideNumber}
        </div>
      )}

      {/* Text zone */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          [textSide === 'left' ? 'paddingLeft' : 'paddingRight']: padH,
          [textSide === 'left' ? 'paddingRight' : 'paddingLeft']: 20,
          width: `${textWidthPct}%`,
          [textSide === 'right' ? 'marginLeft' : 'marginRight']: 'auto',
        }}
      >
        {elems.map((elem, i) => {
          const p = spr(fps, frame, elem.delay);
          const anim: React.CSSProperties = {
            opacity: p,
            transform: `translateY(${10 * (1 - p)}px)`,
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
                  marginBottom: 16,
                  letterSpacing: '0.01em',
                }}
              >
                {elem.text}
              </div>
            );
          }

          if (elem.type === 'ts') {
            return (
              <div key={i} style={{ ...anim, marginBottom: 24 }}>
                <div
                  style={{
                    fontSize: 80,
                    fontWeight: 900,
                    color: C.white,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {elem.text}
                </div>
                {elem.sub && (
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: C.gray,
                      marginTop: 8,
                    }}
                  >
                    {elem.sub}
                  </div>
                )}
              </div>
            );
          }

          if (elem.type === 'line') {
            const { line } = elem;
            const size = line.size ?? 56;
            const color = line.color ?? 'white';
            const weight = line.weight ?? 900;
            return (
              <div
                key={i}
                style={{
                  ...anim,
                  fontSize: size,
                  fontWeight: weight,
                  color: getColor(color),
                  lineHeight: size > 40 ? 0.92 : 1.4,
                  letterSpacing: size > 40 ? '-0.025em' : '-0.01em',
                  marginTop: line.marginTop ?? (i > 0 ? 4 : 0),
                  marginBottom: line.marginBottom ?? 0,
                }}
              >
                {line.text}
              </div>
            );
          }

          if (elem.type === 'list') {
            const { item } = elem;
            return (
              <div
                key={i}
                style={{
                  ...anim,
                  fontSize: item.size ?? 18,
                  fontWeight: 400,
                  color: getColor(item.color ?? 'white'),
                  lineHeight: 1.55,
                  marginTop: 7,
                }}
              >
                <span style={{ color: C.violet, marginRight: 10 }}>
                  {item.bullet ?? '▸'}
                </span>
                {item.text}
              </div>
            );
          }

          if (elem.type === 'stats') {
            return (
              <div
                key={i}
                style={{
                  ...anim,
                  display: 'flex',
                  gap: 12,
                  marginTop: 20,
                  flexWrap: 'wrap',
                }}
              >
                {elem.cards.map((card, j) => (
                  <div
                    key={j}
                    style={{
                      backgroundColor: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 12,
                      padding: '14px 18px',
                      minWidth: 80,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 34,
                        fontWeight: 800,
                        color: card.highlight ? C.violet : C.white,
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {card.value}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: C.muted,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginTop: 5,
                        lineHeight: 1.3,
                      }}
                    >
                      {card.label}
                    </div>
                  </div>
                ))}
              </div>
            );
          }

          if (elem.type === 'chat') {
            return (
              <div
                key={i}
                style={{
                  ...anim,
                  marginTop: 20,
                  backgroundColor: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 16,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {elem.msgs.map((msg, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.from === 'max' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '88%',
                        backgroundColor:
                          msg.from === 'max' ? C.violet : C.bgSec,
                        border: `1px solid ${msg.from === 'max' ? 'transparent' : C.border}`,
                        borderRadius: 12,
                        padding: '8px 12px',
                        fontSize: 13,
                        fontWeight: 400,
                        color:
                          msg.from === 'max' ? '#fff' : C.white,
                        lineHeight: 1.45,
                      }}
                    >
                      {msg.text}
                    </div>
                    {msg.meta && (
                      <div
                        style={{
                          fontSize: 11,
                          color: C.muted,
                          marginTop: 3,
                        }}
                      >
                        {msg.meta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          }

          if (elem.type === 'cta') {
            return (
              <div
                key={i}
                style={{
                  ...anim,
                  fontSize: 20,
                  fontWeight: 600,
                  color: getColor(ctaColor),
                  marginTop: 20,
                  lineHeight: 1.5,
                }}
              >
                {elem.text}
              </div>
            );
          }

          return null;
        })}
      </AbsoluteFill>

      <LensFlare startFrame={62} />
      <ConceptoLogo />
    </AbsoluteFill>
  );
};
