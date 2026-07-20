import { ImageResponse } from "next/og";

export const alt =
  "Le Journal de la Tech — comparatifs SaaS, IA, hébergement, solaire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0b0c0f",
          color: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "#e11326",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: 4,
              color: "#e11326",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 1.05,
            }}
          >
            <span>Le Journal</span>
            <span>de la Tech</span>
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 26,
              letterSpacing: 6,
              color: "#c9cdd3",
            }}
          >
            SaaS · IA · Hébergement · Mobilité · Tech durable
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            letterSpacing: 4,
            color: "#868d98",
            textTransform: "uppercase",
          }}
        >
          lejournaldelatech.fr
        </div>
      </div>
    ),
    { ...size }
  );
}
