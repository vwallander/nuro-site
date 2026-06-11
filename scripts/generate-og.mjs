/**
 * One-off generator for the checked-in static OG render at /public/og.png
 * (SPEC §4 Meta / card N-13): 1200×630, cream bg, aurora blobs, Nuro
 * wordmark + hero H1 line.
 *
 * Run from the repo root (needs network for the font fetch only):
 *   node scripts/generate-og.mjs
 */
import { writeFile } from "node:fs/promises";
// "next/og.js" (not "next/og") — next's package.json has no ESM export map
// entry for the bare subpath, so plain Node needs the explicit file.
import { ImageResponse } from "next/og.js";

const WIDTH = 1200;
const HEIGHT = 630;

// Tokens mirrored from src/app/globals.css (@theme).
const BG = "#faf7f2";
const INK = "#16161c";
const INK_2 = "#3a3f45";
// rgba (not 8-digit hex): satori renders `#rrggbb00` stops as black.
const BLOB_BLUE = [156, 192, 255];
const BLOB_VIOLET = [201, 170, 255];
const BLOB_PINK = [255, 182, 217];
const BLOB_PEACH = [255, 217, 194];

/** Fetch a TTF for satori from the Google Fonts CSS API. */
async function loadFont(family, weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  ).replace(/%20/g, "+")}:wght@${weight}&display=swap`;
  // A non-browser UA makes the API return TTF (satori cannot read woff2).
  const css = await (
    await fetch(cssUrl, { headers: { "User-Agent": "curl/8" } })
  ).text();
  const match = css.match(
    /src: url\((.+?)\) format\('(?:truetype|opentype)'\)/,
  );
  if (!match) throw new Error(`No TTF URL in Google Fonts CSS for ${family}`);
  return (await fetch(match[1])).arrayBuffer();
}

function blob([r, g, b], size, left, top, opacity) {
  return {
    type: "div",
    props: {
      style: {
        position: "absolute",
        width: size,
        height: size,
        left,
        top,
        // `circle` + explicit % stops: satori renders the `closest-side`
        // shorthand inverted (black core). Fade fully out by 70% so no
        // square edge from the div bounds shows.
        backgroundImage: `radial-gradient(circle, rgba(${r},${g},${b},${opacity}) 0%, rgba(${r},${g},${b},0) 70%)`,
      },
    },
  };
}

const text = (content, style) => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children: content },
});

const element = {
  type: "div",
  props: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: BG,
      position: "relative",
      padding: "0 96px",
      fontFamily: "Inter Tight",
    },
    children: [
      // Aurora blob field — radial gradients are inherently soft (satori has
      // no blur filter), matching the heavily-blurred drift field look.
      blob(BLOB_BLUE, 700, -180, -260, 0.9),
      blob(BLOB_VIOLET, 640, 720, -300, 0.85),
      blob(BLOB_PINK, 620, 760, 280, 0.8),
      blob(BLOB_PEACH, 560, -120, 330, 0.85),
      text("Nuro", {
        fontSize: 56,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: INK,
        marginBottom: 36,
      }),
      text("The missing tool for neurodivergent students.", {
        fontSize: 84,
        fontWeight: 700,
        letterSpacing: "-0.035em",
        lineHeight: 1.02,
        color: INK,
        maxWidth: 980,
      }),
      text("Inclusive education for Swedish schools", {
        fontSize: 32,
        fontWeight: 500,
        color: INK_2,
        marginTop: 36,
      }),
    ],
  },
};

const fontData = await loadFont("Inter Tight", 700);
const fontMedium = await loadFont("Inter Tight", 500);

const response = new ImageResponse(element, {
  width: WIDTH,
  height: HEIGHT,
  fonts: [
    { name: "Inter Tight", data: fontData, weight: 700, style: "normal" },
    { name: "Inter Tight", data: fontMedium, weight: 500, style: "normal" },
  ],
});

const png = Buffer.from(await response.arrayBuffer());
await writeFile(new URL("../public/og.png", import.meta.url), png);
console.log(`wrote public/og.png (${png.length} bytes, ${WIDTH}x${HEIGHT})`);
