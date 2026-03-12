"use client";

import { SlabResult, TileSpec } from "@/lib/cutting-algorithm";

interface SlabCanvasProps {
  result: SlabResult;
  tiles: TileSpec[];
  scale?: number;
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function darkenHex(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  const r = Math.max(0, parseInt(clean.substring(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(clean.substring(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(clean.substring(4, 6), 16) - amount);
  return `rgb(${r},${g},${b})`;
}

export function generateSlabSVGString(result: SlabResult, tiles: TileSpec[]): string {
  const { slab, placed } = result;
  const MAX_WIDTH = 800;
  const PADDING = 32;
  const LABEL_SPACE = 28;

  const slabDisplayW = MAX_WIDTH - PADDING * 2 - LABEL_SPACE;
  const scaleX = slabDisplayW / slab.width;
  const slabDisplayH = slab.height * scaleX;

  const svgWidth = MAX_WIDTH;
  const svgHeight = slabDisplayH + PADDING * 2 + LABEL_SPACE;

  const offsetX = PADDING + LABEL_SPACE;
  const offsetY = PADDING;

  const tileMap: Record<string, TileSpec> = {};
  for (const t of tiles) {
    tileMap[t.id] = t;
  }

  const patternId = `waste-hatch-${result.slabIndex}`;

  let tilesMarkup = "";
  for (const p of placed) {
    const px = offsetX + p.x * scaleX;
    const py = offsetY + p.y * scaleX;
    const pw = p.width * scaleX;
    const ph = p.height * scaleX;
    const tileSpec = tileMap[p.tileId];
    const label = tileSpec ? tileSpec.label : `${p.width}×${p.height}`;
    const fillColor = hexToRgba(p.color, 0.8);
    const strokeColor = darkenHex(p.color, 40);
    const fontSize = Math.max(8, Math.min(12, pw / 6));

    tilesMarkup += `
    <rect x="${px.toFixed(2)}" y="${py.toFixed(2)}" width="${pw.toFixed(2)}" height="${ph.toFixed(2)}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="1"/>
    <text x="${(px + pw / 2).toFixed(2)}" y="${(py + ph / 2).toFixed(2)}" font-family="Inter, sans-serif" font-size="${fontSize}" fill="#1C1C1C" text-anchor="middle" dominant-baseline="middle" clip-path="url(#clip-${result.slabIndex}-${p.tileId}-${p.x}-${p.y})">${label}</text>`;
  }

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth.toFixed(2)} ${svgHeight.toFixed(2)}" width="${svgWidth}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <pattern id="${patternId}" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#C4B8A8" stroke-width="0.8" opacity="0.5"/>
    </pattern>
  </defs>

  <!-- Slab background -->
  <rect x="${offsetX}" y="${offsetY}" width="${slabDisplayW.toFixed(2)}" height="${slabDisplayH.toFixed(2)}" fill="#FAF8F5" stroke="#C4B8A8" stroke-width="1"/>

  <!-- Waste hatching -->
  <rect x="${offsetX}" y="${offsetY}" width="${slabDisplayW.toFixed(2)}" height="${slabDisplayH.toFixed(2)}" fill="url(#${patternId})"/>

  <!-- Tiles -->
  ${tilesMarkup}

  <!-- Width label -->
  <text x="${(offsetX + slabDisplayW / 2).toFixed(2)}" y="${(offsetY + slabDisplayH + 18).toFixed(2)}" font-family="Inter, sans-serif" font-size="11" fill="#1C1C1C" text-anchor="middle">${slab.width} cm</text>

  <!-- Height label -->
  <text x="${(offsetX - 8).toFixed(2)}" y="${(offsetY + slabDisplayH / 2).toFixed(2)}" font-family="Inter, sans-serif" font-size="11" fill="#1C1C1C" text-anchor="middle" transform="rotate(-90, ${(offsetX - 8).toFixed(2)}, ${(offsetY + slabDisplayH / 2).toFixed(2)})">${slab.height} cm</text>
</svg>`;

  return svgString;
}

export default function SlabCanvas({ result, tiles }: SlabCanvasProps) {
  const { slab, placed } = result;
  const MAX_WIDTH = 800;
  const PADDING = 32;
  const LABEL_SPACE = 28;

  const slabDisplayW = MAX_WIDTH - PADDING * 2 - LABEL_SPACE;
  const scaleX = slabDisplayW / slab.width;
  const slabDisplayH = slab.height * scaleX;

  const svgWidth = MAX_WIDTH;
  const svgHeight = slabDisplayH + PADDING * 2 + LABEL_SPACE;

  const offsetX = PADDING + LABEL_SPACE;
  const offsetY = PADDING;

  const tileMap: Record<string, TileSpec> = {};
  for (const t of tiles) {
    tileMap[t.id] = t;
  }

  const patternId = `waste-hatch-${result.slabIndex}`;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      className="block"
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            stroke="#C4B8A8"
            strokeWidth="0.8"
            opacity="0.5"
          />
        </pattern>
      </defs>

      {/* Slab background */}
      <rect
        x={offsetX}
        y={offsetY}
        width={slabDisplayW}
        height={slabDisplayH}
        fill="#FAF8F5"
        stroke="#C4B8A8"
        strokeWidth="1"
      />

      {/* Waste hatching */}
      <rect
        x={offsetX}
        y={offsetY}
        width={slabDisplayW}
        height={slabDisplayH}
        fill={`url(#${patternId})`}
      />

      {/* Placed tiles */}
      {placed.map((p, idx) => {
        const px = offsetX + p.x * scaleX;
        const py = offsetY + p.y * scaleX;
        const pw = p.width * scaleX;
        const ph = p.height * scaleX;
        const tileSpec = tileMap[p.tileId];
        const label = tileSpec ? tileSpec.label : `${p.width}×${p.height}`;
        const fillColor = hexToRgba(p.color, 0.8);
        const strokeColor = darkenHex(p.color, 40);
        const fontSize = Math.max(8, Math.min(12, pw / 6));
        const clipId = `clip-${result.slabIndex}-${idx}`;

        return (
          <g key={idx}>
            <clipPath id={clipId}>
              <rect x={px} y={py} width={pw} height={ph} />
            </clipPath>
            <rect
              x={px}
              y={py}
              width={pw}
              height={ph}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1"
            />
            <text
              x={px + pw / 2}
              y={py + ph / 2}
              fontFamily="Inter, sans-serif"
              fontSize={fontSize}
              fill="#1C1C1C"
              textAnchor="middle"
              dominantBaseline="middle"
              clipPath={`url(#${clipId})`}
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Width dimension label */}
      <text
        x={offsetX + slabDisplayW / 2}
        y={offsetY + slabDisplayH + 18}
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fill="#1C1C1C"
        textAnchor="middle"
      >
        {slab.width} cm
      </text>

      {/* Height dimension label */}
      <text
        x={offsetX - 8}
        y={offsetY + slabDisplayH / 2}
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fill="#1C1C1C"
        textAnchor="middle"
        transform={`rotate(-90, ${offsetX - 8}, ${offsetY + slabDisplayH / 2})`}
      >
        {slab.height} cm
      </text>
    </svg>
  );
}
