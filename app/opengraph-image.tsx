import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Short Links";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/image/svg+xml";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
        }}
      >
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 288 179.04"
        >
          <polygon
            fill="#1a75bb"
            className="cls-1"
            points="90.34 119.32 69.89 133.83 69.71 9.12 133.16 54.56 113.85 67.93 90.51 50.63 90.34 119.32"
          />
          <polygon
            fill="#1a75bb"
            className="cls-1"
            points="101.9 86.77 218.02 9.2 218.29 133.74 196.53 118.97 196.44 50.02 122.24 97.04 122.33 114.86 184.73 74.23 184.46 141.35 143.91 169.92 120.4 153.76 139.02 140.47 143.3 143.62 164.01 129.72 164.1 114.17 111.05 147.55 101.9 141.52 101.9 86.77"
          />
        </svg>
      </div>
    )
  );
}
