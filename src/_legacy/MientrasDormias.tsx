import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { Video } from "@remotion/media";
import { staticFile } from "remotion";
import { loadFont as loadSyne } from "@remotion/google-fonts/Syne";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: syneFont } = loadSyne();
const { fontFamily: interFont } = loadInter();

export type MientrasDormiasProps = {
  // Textos configurables
  hora: string;           // "3:47 AM"
  accion: string;         // "MAX respondió 47 consultas de clientes"
  accion2?: string;       // "Capturó 3 leads que llegaron de madrugada" (opcional)
  cierre: string;         // "Vos dormías."
  videoSrc?: string;      // ruta al video background (default: MaxTyping)
};

const FadeIn: React.FC<{
  children: React.ReactNode;
  delay: number; // en segundos
  style?: React.CSSProperties;
}> = ({ children, delay, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [delay * fps, delay * fps + fps * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  const translateY = interpolate(
    frame,
    [delay * fps, delay * fps + fps * 0.5],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)`, ...style }}>
      {children}
    </div>
  );
};

export const MientrasDormias: React.FC<MientrasDormiasProps> = ({
  hora,
  accion,
  accion2,
  cierre,
  videoSrc = "videos/MaxTyping.mp4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Overlay oscuro que se intensifica levemente con el tiempo
  const overlayOpacity = interpolate(frame, [0, fps * 2], [0.3, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", fontFamily: syneFont }}>
      {/* Video background en loop */}
      <Video
        src={staticFile(videoSrc)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        loop
        muted
      />

      {/* Overlay oscuro */}
      <AbsoluteFill
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      />

      {/* Logo Concepto — esquina inferior izquierda */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          color: "rgba(255,255,255,0.7)",
          fontFamily: syneFont,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        CONCEPTO
        <span style={{ color: "#a855f7" }}> DEV</span>
      </div>

      {/* Contenido central */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          gap: 32,
        }}
      >
        {/* Hora */}
        <FadeIn delay={0}>
          <div
            style={{
              fontFamily: syneFont,
              fontWeight: 800,
              fontSize: 96,
              color: "#ffffff",
              textAlign: "center",
              letterSpacing: -2,
            }}
          >
            {hora}
          </div>
        </FadeIn>

        {/* Línea separadora */}
        <Sequence from={fps * 1.5} layout="none">
          <div
            style={{
              width: 60,
              height: 3,
              backgroundColor: "#a855f7",
              borderRadius: 2,
            }}
          />
        </Sequence>

        {/* Acción principal */}
        <FadeIn delay={2}>
          <div
            style={{
              fontFamily: interFont,
              fontWeight: 400,
              fontSize: 44,
              color: "#a855f7",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {accion}
          </div>
        </FadeIn>

        {/* Acción secundaria (opcional) */}
        {accion2 && (
          <FadeIn delay={3.5}>
            <div
              style={{
                fontFamily: interFont,
                fontWeight: 400,
                fontSize: 40,
                color: "#a855f7",
                textAlign: "center",
                lineHeight: 1.3,
                opacity: 0.85,
              }}
            >
              {accion2}
            </div>
          </FadeIn>
        )}

        {/* Cierre */}
        <FadeIn delay={accion2 ? 5.5 : 4.5}>
          <div
            style={{
              fontFamily: syneFont,
              fontWeight: 700,
              fontSize: 56,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            {cierre}
          </div>
        </FadeIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
