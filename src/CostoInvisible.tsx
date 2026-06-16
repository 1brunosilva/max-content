import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { loadFont as loadSyne } from "@remotion/google-fonts/Syne";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: syneFont } = loadSyne();
const { fontFamily: interFont } = loadInter();

export type CostoInvisibleProps = {
  // Imagen de fondo
  imageSrc: string;       // ej: "renders-dark/max-dashboard.png"
  // Líneas de texto
  linea1: string;         // dato de pérdida — blanco grande
  linea2: string;         // cálculo — violeta
  linea3?: string;        // contraste MAX — blanco más chico
  cta: string;            // pregunta final — gris claro
  // Formato
  formato?: "1:1" | "9:16"; // default 1:1
};

const FadeUp: React.FC<{
  children: React.ReactNode;
  delay: number;
  style?: React.CSSProperties;
}> = ({ children, delay, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [delay * fps, delay * fps + fps * 0.6],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  const translateY = interpolate(
    frame,
    [delay * fps, delay * fps + fps * 0.6],
    [30, 0],
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

export const CostoInvisible: React.FC<CostoInvisibleProps> = ({
  imageSrc,
  linea1,
  linea2,
  linea3,
  cta,
  formato = "1:1",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ken Burns: zoom suave de 1.0 a 1.08 durante toda la duración
  const scale = interpolate(frame, [0, fps * 15], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d0d0d",
        fontFamily: syneFont,
        overflow: "hidden",
      }}
    >
      {/* Imagen background con Ken Burns */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Overlay oscuro 65% */}
      <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.65)" }} />

      {/* Borde violeta inferior */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: "#a855f7",
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 60,
          color: "rgba(255,255,255,0.6)",
          fontFamily: syneFont,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        CONCEPTO<span style={{ color: "#a855f7" }}> DEV</span>
      </div>

      {/* Contenido */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: formato === "9:16" ? "0 80px" : "0 90px",
          gap: 24,
        }}
      >
        {/* Línea 1 — dato grande */}
        <FadeUp delay={0.3}>
          <div
            style={{
              fontFamily: syneFont,
              fontWeight: 800,
              fontSize: formato === "9:16" ? 60 : 72,
              color: "#ffffff",
              lineHeight: 1.15,
            }}
          >
            {linea1}
          </div>
        </FadeUp>

        {/* Separador */}
        <Sequence from={Math.floor(fps * 0.8)} layout="none">
          <div
            style={{
              width: 50,
              height: 3,
              backgroundColor: "#a855f7",
              borderRadius: 2,
            }}
          />
        </Sequence>

        {/* Línea 2 — cálculo violeta */}
        <FadeUp delay={1.0}>
          <div
            style={{
              fontFamily: interFont,
              fontWeight: 400,
              fontSize: formato === "9:16" ? 44 : 52,
              color: "#a855f7",
              lineHeight: 1.35,
            }}
          >
            {linea2}
          </div>
        </FadeUp>

        {/* Línea 3 — contraste MAX (opcional) */}
        {linea3 && (
          <FadeUp delay={2.0}>
            <div
              style={{
                fontFamily: interFont,
                fontWeight: 400,
                fontSize: formato === "9:16" ? 36 : 42,
                color: "#ffffff",
                lineHeight: 1.35,
                opacity: 0.9,
              }}
            >
              {linea3}
            </div>
          </FadeUp>
        )}

        {/* CTA final — pregunta */}
        <FadeUp delay={linea3 ? 3.2 : 2.5}>
          <div
            style={{
              fontFamily: interFont,
              fontWeight: 400,
              fontSize: formato === "9:16" ? 30 : 34,
              color: "#cccccc",
              lineHeight: 1.4,
              marginTop: 8,
            }}
          >
            {cta}
          </div>
        </FadeUp>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
