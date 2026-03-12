"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { packTiles, SlabSpec, TileSpec, PackingResult } from "@/lib/cutting-algorithm";
import ConfiguratorGate from "./ConfiguratorGate";
import SlabCanvas, { generateSlabSVGString } from "./SlabCanvas";

const TILE_COLORS = [
  "#B8956A",
  "#7BA8C4",
  "#9BBF8A",
  "#C4977B",
  "#A07BC4",
  "#7BC4B8",
  "#C47B9B",
  "#B5C47B",
  "#7B8FC4",
  "#C4B57B",
];

function genId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ConfiguratorClient() {
  const t = useTranslations("configurator");

  const [hasAccess, setHasAccess] = useState(false);
  const [slabs, setSlabs] = useState<SlabSpec[]>([
    { id: "slab-1", width: 300, height: 160 },
  ]);
  const [tiles, setTiles] = useState<TileSpec[]>([
    {
      id: "tile-1",
      label: "60×60",
      width: 60,
      height: 60,
      quantity: 10,
      color: TILE_COLORS[0],
    },
  ]);
  const [kerf, setKerf] = useState(3);
  const [results, setResults] = useState<PackingResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tirreniamarmi_configurator_access");
      if (stored) {
        JSON.parse(stored);
        setHasAccess(true);
      }
    } catch {
      // ignore
    }
  }, []);

  function handleAccess(name: string, email: string) {
    const data = { name, email, date: new Date().toISOString() };
    localStorage.setItem(
      "tirreniamarmi_configurator_access",
      JSON.stringify(data)
    );
    setHasAccess(true);
  }

  function handleCalculate() {
    const result = packTiles(slabs, tiles, kerf);
    setResults(result);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function handleExportPDF() {
    if (!results) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const tileMap: Record<string, TileSpec> = {};
    for (const t of tiles) tileMap[t.id] = t;

    let slabSections = "";
    for (const r of results.slabResults) {
      const svgStr = generateSlabSVGString(r, tiles);
      let tileRows = "";
      for (const [tileId, count] of Object.entries(r.tileCount)) {
        const tile = tileMap[tileId];
        if (!tile) continue;
        tileRows += `<tr><td>${tile.label}</td><td>${tile.width} × ${tile.height} cm</td><td>${count}</td></tr>`;
      }
      slabSections += `
        <div class="slab-section">
          <h3>Lastra ${r.slabIndex + 1} — ${r.slab.width} × ${r.slab.height} cm</h3>
          <div class="stats">
            <span>Piastrelle: <strong>${r.placed.length}</strong></span>
            <span>Scarto: <strong>${r.wastePercent.toFixed(1)}%</strong></span>
            <span>Copertura: <strong>${(100 - r.wastePercent).toFixed(1)}%</strong></span>
          </div>
          <div class="svg-container">${svgStr}</div>
          ${tileRows ? `<table class="tile-table"><thead><tr><th>Piastrella</th><th>Dimensioni</th><th>Quantità</th></tr></thead><tbody>${tileRows}</tbody></table>` : ""}
        </div>`;
    }

    let summaryRows = "";
    for (const tile of tiles) {
      const needed = results.totalTilesNeeded[tile.id] || 0;
      const placed = results.totalTilesPlaced[tile.id] || 0;
      const missing = results.totalTilesMissing[tile.id] || 0;
      summaryRows += `<tr><td>${tile.label}</td><td>${needed}</td><td>${placed}</td><td style="color:${missing > 0 ? "#c0392b" : "#27ae60"}">${missing}</td></tr>`;
    }

    const avgWaste =
      results.slabResults.length > 0
        ? results.slabResults.reduce((s, r) => s + r.wastePercent, 0) /
          results.slabResults.length
        : 0;

    const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Piano di Taglio — Tirrenia Marmi</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; color: #1C1C1C; background: #FAF8F5; padding: 32px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #C4B8A8; padding-bottom: 20px; margin-bottom: 32px; }
    .logo { font-family: 'Cormorant Garamond', serif; font-size: 18px; letter-spacing: 0.15em; text-transform: uppercase; }
    .header-right { text-align: right; }
    .header-right h1 { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 500; }
    .header-right .date { font-size: 11px; color: #C4B8A8; margin-top: 4px; }
    .summary-bar { display: flex; gap: 24px; background: #1C1C1C; color: #FAF8F5; padding: 16px 24px; margin-bottom: 32px; }
    .summary-bar .stat { display: flex; flex-direction: column; gap: 2px; }
    .summary-bar .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 22px; }
    .summary-bar .stat-label { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: #C4B8A8; }
    .slab-section { margin-bottom: 40px; page-break-inside: avoid; }
    .slab-section h3 { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 500; margin-bottom: 10px; }
    .stats { display: flex; gap: 20px; font-size: 12px; color: #C4B8A8; margin-bottom: 12px; }
    .stats span { font-size: 12px; }
    .svg-container { border: 1px solid #C4B8A8; margin-bottom: 12px; background: #FAF8F5; }
    .svg-container svg { width: 100% !important; height: auto !important; display: block; }
    .tile-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 8px; }
    .tile-table th, .tile-table td { border: 1px solid #C4B8A8; padding: 6px 10px; text-align: left; }
    .tile-table th { background: #FAF8F5; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; }
    .summary-section { margin-top: 32px; page-break-before: auto; }
    .summary-section h2 { font-family: 'Cormorant Garamond', serif; font-size: 22px; margin-bottom: 16px; }
    .summary-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .summary-table th, .summary-table td { border: 1px solid #C4B8A8; padding: 8px 12px; text-align: left; }
    .summary-table th { background: #1C1C1C; color: #FAF8F5; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; }
    @media print {
      body { padding: 16px; }
      .slab-section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Tirrenia Marmi</div>
    <div class="header-right">
      <h1>Piano di Taglio</h1>
      <p class="date">${dateStr}</p>
    </div>
  </div>

  <div class="summary-bar">
    <div class="stat">
      <span class="stat-value">${results.slabResults.length}</span>
      <span class="stat-label">Lastre utilizzate</span>
    </div>
    <div class="stat">
      <span class="stat-value">${Object.values(results.totalTilesPlaced).reduce((s, n) => s + n, 0)}</span>
      <span class="stat-label">Piastrelle posizionate</span>
    </div>
    <div class="stat">
      <span class="stat-value">${avgWaste.toFixed(1)}%</span>
      <span class="stat-label">Scarto medio</span>
    </div>
    <div class="stat">
      <span class="stat-value">${results.allTilesFit ? "✓" : "⚠"}</span>
      <span class="stat-label">${results.allTilesFit ? "Tutto rientra" : "Mancano piastrelle"}</span>
    </div>
  </div>

  ${slabSections}

  <div class="summary-section">
    <h2>Riepilogo Piastrelle</h2>
    <table class="summary-table">
      <thead>
        <tr><th>Piastrella</th><th>Necessarie</th><th>Posizionate</th><th>Mancanti</th></tr>
      </thead>
      <tbody>${summaryRows}</tbody>
    </table>
  </div>
</body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }

  // Slab management
  function addSlab() {
    const n = slabs.length + 1;
    setSlabs((prev) => [
      ...prev,
      { id: `slab-${genId()}`, width: 300, height: 160 },
    ]);
    void n;
  }

  function removeSlab(id: string) {
    setSlabs((prev) => prev.filter((s) => s.id !== id));
  }

  function updateSlab(
    id: string,
    field: keyof SlabSpec,
    value: number | string
  ) {
    setSlabs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  // Tile management
  function addTile() {
    const colorIndex = tiles.length % TILE_COLORS.length;
    const n = tiles.length + 1;
    setTiles((prev) => [
      ...prev,
      {
        id: `tile-${genId()}`,
        label: `Piastrella ${n}`,
        width: 60,
        height: 60,
        quantity: 1,
        color: TILE_COLORS[colorIndex],
      },
    ]);
  }

  function removeTile(id: string) {
    if (tiles.length <= 1) return;
    setTiles((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTile(
    id: string,
    field: keyof TileSpec,
    value: string | number
  ) {
    setTiles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }

  const tileMap: Record<string, TileSpec> = {};
  for (const tile of tiles) tileMap[tile.id] = tile;

  const avgWaste =
    results && results.slabResults.length > 0
      ? results.slabResults.reduce((s, r) => s + r.wastePercent, 0) /
        results.slabResults.length
      : 0;

  const totalPlaced = results
    ? Object.values(results.totalTilesPlaced).reduce((s, n) => s + n, 0)
    : 0;

  return (
    <>
      {!hasAccess && <ConfiguratorGate onAccess={handleAccess} />}

      {/* Hero */}
      <section className="bg-charcoal py-20 md:py-28">
        <div className="max-w-site mx-auto px-6 md:px-10">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-4">
            {t("hero_label")}
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream leading-tight whitespace-pre-line mb-6">
            {t("hero_title")}
          </h1>
          <p className="font-sans text-sm text-stone leading-relaxed max-w-lg">
            {t("hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section
        className={`bg-cream py-16 transition-opacity duration-300 ${!hasAccess ? "opacity-30 pointer-events-none select-none" : ""}`}
      >
        <div className="max-w-site mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left column: inputs */}
            <div className="w-full lg:w-2/5 flex flex-col gap-10">
              {/* Slabs */}
              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-4">
                  {t("slabs_title")}
                </p>
                <div className="flex flex-col gap-3">
                  {slabs.map((slab, idx) => (
                    <div
                      key={slab.id}
                      className="border border-stone/40 bg-white p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone">
                          Lastra {idx + 1}
                        </span>
                        {slabs.length > 1 && (
                          <button
                            onClick={() => removeSlab(slab.id)}
                            className="font-sans text-[10px] text-stone hover:text-charcoal transition-colors"
                            aria-label="Rimuovi lastra"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                            {t("slab_width")} (cm)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={slab.width}
                            onChange={(e) =>
                              updateSlab(
                                slab.id,
                                "width",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="border border-stone bg-white px-3 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                            {t("slab_height")} (cm)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={slab.height}
                            onChange={(e) =>
                              updateSlab(
                                slab.id,
                                "height",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="border border-stone bg-white px-3 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                            {t("slab_price")}
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={slab.pricePerSqm ?? ""}
                            placeholder="—"
                            onChange={(e) =>
                              updateSlab(
                                slab.id,
                                "pricePerSqm",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="border border-stone bg-white px-3 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal placeholder:text-stone/50"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addSlab}
                    className="border border-stone/40 bg-white px-4 py-3 font-sans text-[10px] tracking-[0.18em] uppercase text-stone hover:text-charcoal hover:border-stone transition-colors text-left"
                  >
                    + {t("slab_add")}
                  </button>
                </div>
              </div>

              {/* Tiles */}
              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-4">
                  {t("tiles_title")}
                </p>
                <div className="flex flex-col gap-3">
                  {tiles.map((tile) => (
                    <div
                      key={tile.id}
                      className="border border-stone/40 bg-white p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: tile.color }}
                          />
                          <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone">
                            {tile.label}
                          </span>
                        </div>
                        {tiles.length > 1 && (
                          <button
                            onClick={() => removeTile(tile.id)}
                            className="font-sans text-[10px] text-stone hover:text-charcoal transition-colors"
                            aria-label="Rimuovi piastrella"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex flex-col gap-1 col-span-2">
                          <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                            {t("tile_name")}
                          </label>
                          <input
                            type="text"
                            value={tile.label}
                            onChange={(e) =>
                              updateTile(tile.id, "label", e.target.value)
                            }
                            className="border border-stone bg-white px-3 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                            {t("tile_width")} (cm)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={tile.width}
                            onChange={(e) =>
                              updateTile(
                                tile.id,
                                "width",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="border border-stone bg-white px-3 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                            {t("tile_height")} (cm)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={tile.height}
                            onChange={(e) =>
                              updateTile(
                                tile.id,
                                "height",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="border border-stone bg-white px-3 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                            {t("tile_qty")}
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={tile.quantity}
                            onChange={(e) =>
                              updateTile(
                                tile.id,
                                "quantity",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="border border-stone bg-white px-3 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                            Colore
                          </label>
                          <input
                            type="color"
                            value={tile.color}
                            onChange={(e) =>
                              updateTile(tile.id, "color", e.target.value)
                            }
                            className="h-[38px] w-full border border-stone bg-white px-1 py-1 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addTile}
                    className="border border-stone/40 bg-white px-4 py-3 font-sans text-[10px] tracking-[0.18em] uppercase text-stone hover:text-charcoal hover:border-stone transition-colors text-left"
                  >
                    + {t("tile_add")}
                  </button>
                </div>
              </div>

              {/* Settings */}
              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-4">
                  {t("settings_title")}
                </p>
                <div className="border border-stone/40 bg-white p-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                      {t("kerf_label")} ({t("kerf_unit")})
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={kerf}
                      onChange={(e) =>
                        setKerf(parseFloat(e.target.value) || 0)
                      }
                      className="border border-stone bg-white px-3 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal"
                    />
                    <p className="font-sans text-[10px] text-stone mt-1">
                      {t("kerf_hint")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Calculate button */}
              <button
                onClick={handleCalculate}
                className="w-full bg-charcoal text-cream font-sans text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-charcoal/90 transition-colors"
              >
                {t("calculate")}
              </button>
            </div>

            {/* Right column: results */}
            <div className="w-full lg:w-3/5" ref={resultsRef}>
              {!results ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 border border-stone/40 flex items-center justify-center mb-6">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-stone"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="0" />
                      <path d="M8 7h8M8 11h5" />
                    </svg>
                  </div>
                  <p className="font-sans text-sm text-stone leading-relaxed max-w-xs">
                    {t("empty_state")}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {/* Status banner */}
                  <div
                    className={`px-5 py-3 font-sans text-sm flex items-center gap-2 ${
                      results.allTilesFit
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-amber-50 border border-amber-200 text-amber-800"
                    }`}
                  >
                    <span className="text-base">
                      {results.allTilesFit ? "✓" : "⚠"}
                    </span>
                    <span>
                      {results.allTilesFit ? t("all_fit") : t("not_all_fit")}
                    </span>
                  </div>

                  {/* Summary grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-stone/40 bg-white p-4 text-center">
                      <p className="font-display text-3xl text-charcoal mb-1">
                        {results.slabResults.length}
                      </p>
                      <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                        {t("summary_slabs")}
                      </p>
                    </div>
                    <div className="border border-stone/40 bg-white p-4 text-center">
                      <p className="font-display text-3xl text-charcoal mb-1">
                        {totalPlaced}
                      </p>
                      <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                        {t("summary_tiles")}
                      </p>
                    </div>
                    <div className="border border-stone/40 bg-white p-4 text-center">
                      <p className="font-display text-3xl text-charcoal mb-1">
                        {avgWaste.toFixed(1)}%
                      </p>
                      <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                        {t("summary_waste")}
                      </p>
                    </div>
                  </div>

                  {/* Per-slab results */}
                  {results.slabResults.map((r) => (
                    <div
                      key={r.slabIndex}
                      className="border border-stone/40 bg-white p-5"
                    >
                      <h3 className="font-display text-xl text-charcoal mb-3">
                        {t("slab_label")} {r.slabIndex + 1} — {r.slab.width} ×{" "}
                        {r.slab.height} cm
                      </h3>
                      <div className="flex gap-6 mb-4">
                        <div>
                          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone mb-0.5">
                            {t("tiles_placed")}
                          </p>
                          <p className="font-sans text-sm text-charcoal font-medium">
                            {r.placed.length}
                          </p>
                        </div>
                        <div>
                          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone mb-0.5">
                            {t("waste_pct")}
                          </p>
                          <p className="font-sans text-sm text-charcoal font-medium">
                            {r.wastePercent.toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone mb-0.5">
                            {t("coverage")}
                          </p>
                          <p className="font-sans text-sm text-charcoal font-medium">
                            {(100 - r.wastePercent).toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      <div className="border border-stone/30">
                        <SlabCanvas result={r} tiles={tiles} />
                      </div>

                      {Object.keys(r.tileCount).length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-3">
                          {Object.entries(r.tileCount).map(
                            ([tileId, count]) => {
                              const tile = tileMap[tileId];
                              if (!tile) return null;
                              return (
                                <div
                                  key={tileId}
                                  className="flex items-center gap-1.5"
                                >
                                  <div
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: tile.color }}
                                  />
                                  <span className="font-sans text-[10px] text-stone">
                                    {tile.label}: {count}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Missing tiles */}
                  {!results.allTilesFit && (
                    <div className="border border-amber-200 bg-amber-50 p-5">
                      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-amber-700 mb-3">
                        {t("missing_title")}
                      </p>
                      <div className="flex flex-col gap-2">
                        {tiles.map((tile) => {
                          const missing =
                            results.totalTilesMissing[tile.id] || 0;
                          if (missing <= 0) return null;
                          return (
                            <div
                              key={tile.id}
                              className="flex items-center justify-between font-sans text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: tile.color }}
                                />
                                <span className="text-charcoal">
                                  {tile.label}
                                </span>
                              </div>
                              <span className="text-amber-700 font-medium">
                                -{missing}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Export PDF button */}
                  <button
                    onClick={handleExportPDF}
                    className="w-full border border-charcoal text-charcoal font-sans text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-charcoal hover:text-cream transition-colors"
                  >
                    {t("export_pdf")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
