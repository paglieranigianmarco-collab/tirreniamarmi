export interface TileSpec {
  id: string;
  label: string;
  width: number;   // cm
  height: number;  // cm
  quantity: number;
  color: string;
}

export interface SlabSpec {
  id: string;
  width: number;   // cm
  height: number;  // cm
  pricePerSqm?: number; // €/m²
}

export interface PlacedTile {
  x: number;      // cm, position in slab
  y: number;      // cm
  width: number;  // cm (actual tile width)
  height: number; // cm (actual tile height)
  tileId: string;
  color: string;
  rotated: boolean;
}

export interface SlabResult {
  slab: SlabSpec;
  slabIndex: number;
  placed: PlacedTile[];
  usedArea: number;     // cm²
  totalArea: number;    // cm²
  wasteArea: number;    // cm²
  wastePercent: number;
  tileCount: Record<string, number>; // tileId -> placed count
}

export interface PackingResult {
  slabResults: SlabResult[];
  totalTilesNeeded: Record<string, number>;
  totalTilesPlaced: Record<string, number>;
  totalTilesMissing: Record<string, number>;
  allTilesFit: boolean;
}

interface FreeRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface PendingItem {
  spec: TileSpec;
  count: number;
}

function packSlab(
  slab: SlabSpec,
  slabIndex: number,
  pending: PendingItem[],
  kerfCm: number
): SlabResult {
  const placed: PlacedTile[] = [];
  const tileCount: Record<string, number> = {};

  // Sort pending by area descending (largest tile first)
  pending.sort((a, b) => {
    const areaA = a.spec.width * a.spec.height;
    const areaB = b.spec.width * b.spec.height;
    return areaB - areaA;
  });

  const freeRects: FreeRect[] = [{ x: 0, y: 0, w: slab.width, h: slab.height }];

  let madeProgress = true;
  while (madeProgress) {
    madeProgress = false;

    for (const item of pending) {
      if (item.count <= 0) continue;

      const tile = item.spec;
      const isSquare = tile.width === tile.height;

      // Orientations to try: [tileW, tileH, rotated]
      const orientations: [number, number, boolean][] = [
        [tile.width, tile.height, false],
      ];
      if (!isSquare) {
        orientations.push([tile.height, tile.width, true]);
      }

      let bestScore = Infinity;
      let bestFrIndex = -1;
      let bestTileW = 0;
      let bestTileH = 0;
      let bestRotated = false;

      for (const [tileW, tileH, rotated] of orientations) {
        const usedW = tileW + kerfCm;
        const usedH = tileH + kerfCm;

        for (let i = 0; i < freeRects.length; i++) {
          const fr = freeRects[i];
          if (fr.w >= usedW && fr.h >= usedH) {
            // Best Short Side Fits score
            const score = Math.min(fr.w - usedW, fr.h - usedH);
            if (score < bestScore) {
              bestScore = score;
              bestFrIndex = i;
              bestTileW = tileW;
              bestTileH = tileH;
              bestRotated = rotated;
            }
          }
        }
      }

      if (bestFrIndex >= 0) {
        const fr = freeRects[bestFrIndex];
        const usedW = bestTileW + kerfCm;
        const usedH = bestTileH + kerfCm;

        // Place the tile
        placed.push({
          x: fr.x,
          y: fr.y,
          width: bestTileW,
          height: bestTileH,
          tileId: tile.id,
          color: tile.color,
          rotated: bestRotated,
        });

        tileCount[tile.id] = (tileCount[tile.id] || 0) + 1;
        item.count -= 1;
        madeProgress = true;

        // Remove used free rect
        freeRects.splice(bestFrIndex, 1);

        const remainW = fr.w - usedW;
        const remainH = fr.h - usedH;

        // Guillotine split with short-axis rule
        if (remainW < remainH) {
          // Horizontal split
          if (remainW > 0 && usedH > 0) {
            freeRects.push({ x: fr.x + usedW, y: fr.y, w: remainW, h: usedH });
          }
          if (fr.w > 0 && remainH > 0) {
            freeRects.push({ x: fr.x, y: fr.y + usedH, w: fr.w, h: remainH });
          }
        } else {
          // Vertical split
          if (remainW > 0 && fr.h > 0) {
            freeRects.push({ x: fr.x + usedW, y: fr.y, w: remainW, h: fr.h });
          }
          if (usedW > 0 && remainH > 0) {
            freeRects.push({ x: fr.x, y: fr.y + usedH, w: usedW, h: remainH });
          }
        }

        // Only continue placing items in this pass — restart loop
        break;
      }
    }
  }

  const totalArea = slab.width * slab.height;
  const usedArea = placed.reduce((sum, p) => sum + p.width * p.height, 0);
  const wasteArea = totalArea - usedArea;
  const wastePercent = totalArea > 0 ? (wasteArea / totalArea) * 100 : 0;

  return {
    slab,
    slabIndex,
    placed,
    usedArea,
    totalArea,
    wasteArea,
    wastePercent,
    tileCount,
  };
}

export function packTiles(
  slabs: SlabSpec[],
  tiles: TileSpec[],
  kerfMm: number
): PackingResult {
  const kerfCm = kerfMm / 10;

  // Build pending array (mutable across slab calls)
  const pending: PendingItem[] = tiles.map((t) => ({
    spec: t,
    count: t.quantity,
  }));

  const totalTilesNeeded: Record<string, number> = {};
  for (const t of tiles) {
    totalTilesNeeded[t.id] = t.quantity;
  }

  const slabResults: SlabResult[] = [];

  for (let i = 0; i < slabs.length; i++) {
    // Check if all tiles are placed
    const allPlaced = pending.every((p) => p.count <= 0);
    if (allPlaced) break;

    const result = packSlab(slabs[i], i, pending, kerfCm);
    slabResults.push(result);
  }

  const totalTilesPlaced: Record<string, number> = {};
  for (const result of slabResults) {
    for (const [tileId, count] of Object.entries(result.tileCount)) {
      totalTilesPlaced[tileId] = (totalTilesPlaced[tileId] || 0) + count;
    }
  }

  const totalTilesMissing: Record<string, number> = {};
  let allTilesFit = true;
  for (const t of tiles) {
    const placed = totalTilesPlaced[t.id] || 0;
    const missing = t.quantity - placed;
    totalTilesMissing[t.id] = missing;
    if (missing > 0) allTilesFit = false;
  }

  return {
    slabResults,
    totalTilesNeeded,
    totalTilesPlaced,
    totalTilesMissing,
    allTilesFit,
  };
}
