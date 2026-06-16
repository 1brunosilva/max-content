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

export type ContrastBlock = {
  label: string;
  value: string;
  sublabel: string;
  color?: ColorName;
};

export type ContrastSlideProps = {
  headline?: string;
  headlineColor?: ColorName;
  leftBlock: ContrastBlock;
  rightBlock: ContrastBlock;
  footer?: string;
  footerColor?: ColorName;
  maxSrc?: string;
  slideNumber?: string;
};

const spr = (fps: number, frame: number, sf: number) =>
  spring({
    fps,
    frame: Math.max(0, frame - sf),
    config: { damping: 14, stiffness: 110 },
    durationInFrames: 22,
  });

export const ContrastSlide: React.FC<ContrastSlideProps> = ({
  headline,
  headlineColor = 'white',
  leftBlock,
  rightBlock,
  footer,
  footerColor = 'gray',
  maxSrc,
  slideNumber,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const pad = Math.round(width * 0.09);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: inter }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 45% at 50% 100%, rgba(91,94,244,0.15) 0%, transparent 70%)',
        }}
      />

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

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: `0 ${pad}px`,
        }}
      >
        {headline && (
          <div
            style={{
              opacity: spr(fps, frame, 6),
              transform: `translateY(${8 * (1 - spr(fps, frame, 6))}px)`,
              fontSize: 40,
              fontWeight: 700,
              color: getColor(headlineColor),
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: 36,
            }}
          >
            {headline}
          </div>
        )}

        {/* Two column comparison */}
        <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
          {/* Left */}
          <div
            style={{
              flex: 1,
              paddingRight: 28,
              opacity: spr(fps, frame, 14),
              transform: `translateX(${-14 * (1 - spr(fps, frame, 14))}px)`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: leftBlock.color ? getColor(leftBlock.color) : C.muted,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              {leftBlock.label}
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: leftBlock.color ? getColor(leftBlock.color) : C.gray,
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              {leftBlock.value}
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: C.muted,
                marginTop: 10,
                lineHeight: 1.4,
              }}
            >
              {leftBlock.sublabel}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: '1px',
              backgroundColor: C.border,
              opacity: spr(fps, frame, 20),
              alignSelf: 'stretch',
            }}
          />

          {/* Right */}
          <div
            style={{
              flex: 1,
              paddingLeft: 28,
              opacity: spr(fps, frame, 22),
              transform: `translateX(${14 * (1 - spr(fps, frame, 22))}px)`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: rightBlock.color ? getColor(rightBlock.color) : C.violet,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              {rightBlock.label}
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: rightBlock.color ? getColor(rightBlock.color) : C.violet,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                textShadow: '0 0 32px rgba(139,92,246,0.4)',
              }}
            >
              {rightBlock.value}
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: C.white,
                marginTop: 10,
                lineHeight: 1.4,
              }}
            >
              {rightBlock.sublabel}
            </div>
          </div>
        </div>

        {footer && (
          <div
            style={{
              opacity: spr(fps, frame, 34),
              transform: `translateY(${8 * (1 - spr(fps, frame, 34))}px)`,
              fontSize: 18,
              fontWeight: 400,
              color: getColor(footerColor),
              lineHeight: 1.5,
              marginTop: 34,
              paddingTop: 22,
              borderTop: `1px solid ${C.border}`,
            }}
          >
            {footer}
          </div>
        )}
      </AbsoluteFill>

      {maxSrc && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '28%',
            height: '45%',
            opacity: spr(fps, frame, 10),
          }}
        >
          <Img
            src={staticFile(maxSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom',
            }}
          />
        </div>
      )}

      <LensFlare startFrame={62} />
      <ConceptoLogo />
    </AbsoluteFill>
  );
};
