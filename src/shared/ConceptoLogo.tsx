import React from 'react';
import { inter } from './fonts';
import { C } from './theme';

export const ConceptoLogo: React.FC<{
  bottom?: number;
  left?: number;
  scale?: number;
}> = ({ bottom = 52, left = 72, scale = 1 }) => (
  <div
    style={{
      position: 'absolute',
      bottom,
      left,
      display: 'flex',
      alignItems: 'center',
      gap: 10 * scale,
      fontFamily: inter,
    }}
  >
    <svg
      width={28 * scale}
      height={28 * scale}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2L28.5 8.5V23.5L16 30L3.5 23.5V8.5Z"
        stroke="#7B3FFF"
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
      />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fill="#7B3FFF"
        fontSize="14"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
      >
        C
      </text>
    </svg>
    <div>
      <div
        style={{
          color: C.white,
          fontSize: 11 * scale,
          fontWeight: 700,
          letterSpacing: '0.12em',
          lineHeight: 1,
          marginBottom: 3,
        }}
      >
        CONCEPTO
      </div>
      <div
        style={{
          color: C.gray,
          fontSize: 10 * scale,
          fontWeight: 400,
          letterSpacing: '0.15em',
          lineHeight: 1,
        }}
      >
        DEVELOPMENT
      </div>
    </div>
  </div>
);
