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

export type MetricData = {
  value: string;
  label: string;
  trend?: string;
  trendUp?: boolean;
  color?: ColorName;
};

export type TimelineStep = {
  date: string;
  text: string;
  status?: 'neutral' | 'bad' | 'good';
};

export type TipoCProps = {
  headline: string;
  headlineAccent?: string;
  subtitle?: string;
  bodyLines?: Array<{ text: string; color?: ColorName }>;
  metrics?: MetricData[];
  timeline?: TimelineStep[];
  maxSrc?: string;
  ctaText?: string;
  format?: '1:1' | '4:5';
  slideNumber?: string;
  metricsColumns?: 1 | 2;
};

const spr = (fps: number, frame: number, sf: number) =>
  spring({
    fps,
    frame: Math.max(0, frame - sf),
    config: { damping: 14, stiffness: 110 },
    durationInFrames: 22,
  });

export const TipoC: React.FC<TipoCProps> = ({
  headline,
  headlineAccent,
  subtitle,
  bodyLines,
  metrics,
  timeline,
  maxSrc,
  ctaText,
  slideNumber,
  metricsColumns = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const pad = Math.round(width * 0.08);

  const statusColor = (s?: TimelineStep['status']) =>
    s === 'bad' ? C.red : s === 'good' ? C.green : C.muted;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: inter }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 45% at 50% 100%, rgba(91,94,244,0.14) 0%, transparent 70%)',
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
          padding: `${pad}px ${pad}px ${pad + 30}px`,
          gap: 0,
        }}
      >
        {/* Headline */}
        <div
          style={{
            opacity: spr(fps, frame, 6),
            transform: `translateY(${8 * (1 - spr(fps, frame, 6))}px)`,
            marginBottom: headlineAccent ? 0 : 12,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: C.white,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
            }}
          >
            {headline}
          </div>
        </div>

        {headlineAccent && (
          <div
            style={{
              opacity: spr(fps, frame, 10),
              transform: `translateY(${8 * (1 - spr(fps, frame, 10))}px)`,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: C.violet,
                lineHeight: 0.95,
                letterSpacing: '-0.025em',
              }}
            >
              {headlineAccent}
            </div>
          </div>
        )}

        {subtitle && (
          <div
            style={{
              opacity: spr(fps, frame, 18),
              transform: `translateY(${8 * (1 - spr(fps, frame, 18))}px)`,
              fontSize: 18,
              fontWeight: 400,
              color: C.gray,
              lineHeight: 1.5,
              marginBottom: 20,
            }}
          >
            {subtitle}
          </div>
        )}

        {bodyLines?.map((line, i) => (
          <div
            key={i}
            style={{
              opacity: spr(fps, frame, 20 + i * 8),
              transform: `translateY(${8 * (1 - spr(fps, frame, 20 + i * 8))}px)`,
              fontSize: 18,
              color: getColor(line.color ?? 'gray'),
              lineHeight: 1.5,
              marginBottom: 4,
            }}
          >
            {line.text}
          </div>
        ))}

        {/* Metrics grid */}
        {metrics && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${metricsColumns}, 1fr)`,
              gap: 12,
              marginTop: 'auto',
              paddingBottom: maxSrc ? '10%' : 0,
            }}
          >
            {metrics.map((m, i) => {
              const p = spr(fps, frame, 28 + i * 7);
              return (
                <div
                  key={i}
                  style={{
                    opacity: p,
                    transform: `translateY(${8 * (1 - p)}px)`,
                    backgroundColor: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: '16px 20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 42,
                        fontWeight: 800,
                        color: m.color ? getColor(m.color) : C.white,
                        lineHeight: 1,
                        letterSpacing: '-0.035em',
                      }}
                    >
                      {m.value}
                    </div>
                    {m.trend && (
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: m.trendUp !== false ? C.green : C.red,
                        }}
                      >
                        {m.trend}
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: C.muted,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginTop: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Timeline */}
        {timeline && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              marginTop: 16,
              flex: 1,
            }}
          >
            {timeline.map((step, i) => {
              const p = spr(fps, frame, 22 + i * 8);
              return (
                <div
                  key={i}
                  style={{
                    opacity: p,
                    transform: `translateX(${-10 * (1 - p)}px)`,
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: 16,
                    marginBottom: 0,
                  }}
                >
                  {/* Connector */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: 20,
                      minWidth: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: statusColor(step.status),
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                    {i < timeline.length - 1 && (
                      <div
                        style={{
                          width: 1,
                          flex: 1,
                          backgroundColor: C.border,
                          minHeight: 20,
                        }}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ paddingBottom: 20 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: C.muted,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: 3,
                      }}
                    >
                      {step.date}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        color: getColor(
                          step.status === 'bad'
                            ? 'red'
                            : step.status === 'good'
                              ? 'green'
                              : 'white',
                        ),
                        lineHeight: 1.4,
                      }}
                    >
                      {step.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {ctaText && (
          <div
            style={{
              opacity: spr(fps, frame, 55),
              transform: `translateY(${8 * (1 - spr(fps, frame, 55))}px)`,
              fontSize: 18,
              fontWeight: 600,
              color: C.gray,
              marginTop: 16,
              lineHeight: 1.5,
            }}
          >
            {ctaText}
          </div>
        )}
      </AbsoluteFill>

      {/* MAX small, bottom right */}
      {maxSrc && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '32%',
            height: '38%',
            opacity: spr(fps, frame, 24),
          }}
        >
          <Img
            src={staticFile(maxSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom right',
            }}
          />
        </div>
      )}

      <LensFlare startFrame={62} />
      <ConceptoLogo />
    </AbsoluteFill>
  );
};
