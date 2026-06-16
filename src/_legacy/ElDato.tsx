import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont as loadSyne } from "@remotion/google-fonts/Syne";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadDMMono } from "@remotion/google-fonts/DMMono";

const { fontFamily: syneFont } = loadSyne();
const { fontFamily: interFont } = loadInter();
const { fontFamily: dmMonoFont } = loadDMMono();

export type ElDatoProps = {
  numero: string;       // "68%"
  descripcion: string;  // "de las consultas son siempre las mismas preguntas"
  fuente?: string;      // "Fuente: McKinsey 2024"
};

export const ElDato: React.FC<ElDatoProps> = ({
  numero,
  descripcion,
  fuente,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Número entra con scale
  const numeroScale = interpolate(
    frame,
    [0, fps * 0.8],
    [0.6, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    }
  );

  const numeroOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Descripción entra después
  const descOpacity = interpolate(
    frame,
    [fps * 0.8, fps * 1.4],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  const descY = interpolate(
    frame,
    [fps * 0.8, fps * 1.4],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Fuente
  const fuenteOpacity = interpolate(
    frame,
    [fps * 1.8, fps * 2.4],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Línea decorativa que crece
  const lineaWidth = interpolate(
    frame,
    [fps * 0.4, fps * 1.0],
    [0, 80],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        gap: 32,
      }}
    >
      {/* Número grande */}
      <div
        style={{
          fontFamily: syneFont,
          fontWeight: 800,
          fontSize: 200,
          color: "#a855f7",
          lineHeight: 1,
          textAlign: "center",
          opacity: numeroOpacity,
          transform: `scale(${numeroScale})`,
        }}
      >
        {numero}
      </div>

      {/* Línea decorativa */}
      <div
        style={{
          width: lineaWidth,
          height: 4,
          backgroundColor: "#a855f7",
          borderRadius: 2,
        }}
      />

      {/* Descripción */}
      <div
        style={{
          fontFamily: interFont,
          fontWeight: 400,
          fontSize: 42,
          color: "#ffffff",
          textAlign: "center",
          lineHeight: 1.4,
          opacity: descOpacity,
          transform: `translateY(${descY}px)`,
          maxWidth: 800,
        }}
      >
        {descripcion}
      </div>

      {/* Fuente */}
      {fuente && (
        <div
          style={{
            fontFamily: dmMonoFont,
            fontSize: 22,
            color: "#666666",
            textAlign: "center",
            opacity: fuenteOpacity,
            marginTop: 8,
          }}
        >
          {fuente}
        </div>
      )}

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.5)",
          fontFamily: syneFont,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 2,
          opacity: fuenteOpacity,
        }}
      >
        CONCEPTO<span style={{ color: "#a855f7" }}> DEV</span>
      </div>
    </AbsoluteFill>
  );
};
