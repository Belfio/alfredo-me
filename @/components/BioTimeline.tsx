import { useEffect, useMemo, useState } from "react";
import {
  BIO_CHAPTERS,
  BIO_LINES,
  type BioEntry,
  type BioLineMeta,
  type BioPhoto,
  type LineId,
} from "@/data/bio";
import { cn } from "@/lib/utils";

const LINE_MAP: Record<LineId, BioLineMeta> = Object.fromEntries(
  BIO_LINES.map((l) => [l.id, l])
) as Record<LineId, BioLineMeta>;

const LINE_INDEX: Record<LineId, number> = {
  "act-1": 0,
  "place-1": 1,
  "place-2": 2,
  "people-1": 3,
  "people-2": 4,
  "people-3": 5,
};

// Desktop rail X offsets (px from left edge of each column)
// Slightly wider spacing so hand-drawn wobble never collides cleanly
const DESKTOP_RAILS = {
  activities: {
    gutterWidth: 28,
    paddingLeft: 30,
    coords: { "act-1": 9 } as Record<string, number>,
  },
  places: {
    gutterWidth: 42,
    paddingLeft: 44,
    coords: { "place-1": 9, "place-2": 24 } as Record<string, number>,
  },
  people: {
    gutterWidth: 56,
    paddingLeft: 58,
    coords: {
      "people-1": 9,
      "people-2": 24,
      "people-3": 39,
    } as Record<string, number>,
  },
};

// Mobile 6-line hand-drawn stave in left gutter
const MOBILE_GUTTER_WIDTH = 68;
const MOBILE_PADDING_LEFT = 72;
const MOBILE_RAIL_X: Record<LineId, number> = {
  "act-1": 7,
  "place-1": 19,
  "place-2": 28,
  "people-1": 40,
  "people-2": 49,
  "people-3": 58,
};

// Deterministic rounded pseudo-random in [-1, 1] (SSR-safe, zero hydration drift)
function jitter(seed: number): number {
  const raw = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  const frac = raw - Math.floor(raw);
  return Math.round((frac * 2 - 1) * 100) / 100;
}

function f(n: number): string {
  return (Math.round(n * 100) / 100).toString();
}

// Continuous C1-matched boundary X & slope so adjacent rows join seamlessly
function railBoundaryX(
  lineId: LineId,
  boundaryIdx: number,
  baseX: number,
  amp = 2.4
): number {
  const li = LINE_INDEX[lineId] + 1;
  return baseX + jitter(li * 97 + boundaryIdx * 31) * amp;
}

function railBoundarySlope(lineId: LineId, boundaryIdx: number): number {
  const li = LINE_INDEX[lineId] + 1;
  return jitter(li * 193 + boundaryIdx * 53 + 17) * 0.075;
}

// Generates multi-point fountain-pen stroke + secondary fine re-stroke in 0..100 Y space
function buildSketchSegment(
  lineId: LineId,
  rowIdx: number,
  baseX: number,
  amp = 2.4
): { main: string; whisper: string; nodeXFirst: string; nodeXLater: string } {
  const li = LINE_INDEX[lineId] + 1;
  const x0 = railBoundaryX(lineId, rowIdx, baseX, amp);
  const x4 = railBoundaryX(lineId, rowIdx + 1, baseX, amp);
  const s0 = railBoundarySlope(lineId, rowIdx);
  const s4 = railBoundarySlope(lineId, rowIdx + 1);

  // Three interior hand-tremor waypoints so even tall rows look genuinely freehand
  const y1 = 24 + jitter(li * 31 + rowIdx * 59) * 3.5;
  const y2 = 50 + jitter(li * 41 + rowIdx * 71) * 4.5;
  const y3 = 76 + jitter(li * 53 + rowIdx * 83) * 3.5;

  const x1 = baseX + jitter(li * 61 + rowIdx * 97 + 2) * (amp * 1.15);
  const x2 = baseX + jitter(li * 67 + rowIdx * 89 + 5) * (amp * 1.25);
  const x3 = baseX + jitter(li * 73 + rowIdx * 101 + 8) * (amp * 1.15);

  const s1 = jitter(li * 109 + rowIdx * 43 + 3) * 0.09;
  const s2 = jitter(li * 131 + rowIdx * 37 + 9) * 0.095;
  const s3 = jitter(li * 139 + rowIdx * 47 + 14) * 0.09;

  const main = [
    `M ${f(x0)} 0`,
    `C ${f(x0 + s0 * 8)} ${f(y1 * 0.36)}, ${f(x1 - s1 * 8)} ${f(y1 * 0.68)}, ${f(x1)} ${f(y1)}`,
    `C ${f(x1 + s1 * 8)} ${f(y1 + (y2 - y1) * 0.36)}, ${f(x2 - s2 * 8)} ${f(y1 + (y2 - y1) * 0.68)}, ${f(x2)} ${f(y2)}`,
    `C ${f(x2 + s2 * 8)} ${f(y2 + (y3 - y2) * 0.36)}, ${f(x3 - s3 * 8)} ${f(y2 + (y3 - y2) * 0.68)}, ${f(x3)} ${f(y3)}`,
    `C ${f(x3 + s3 * 8)} ${f(y3 + (100 - y3) * 0.36)}, ${f(x4 - s4 * 8)} ${f(y3 + (100 - y3) * 0.68)}, ${f(x4)} 100`,
  ].join(" ");

  // Subtle second nib pass weaving ~1px beside the primary stroke
  const d0 = jitter(li * 149 + rowIdx * 23) * 1.05;
  const d1 = jitter(li * 151 + rowIdx * 27 + 1) * 1.25;
  const d2 = jitter(li * 157 + rowIdx * 29 + 3) * 1.3;
  const d3 = jitter(li * 163 + rowIdx * 31 + 6) * 1.25;
  const d4 = jitter(li * 149 + (rowIdx + 1) * 23) * 1.05;

  const whisper = [
    `M ${f(x0 + d0)} 0`,
    `C ${f(x0 + d0 + s0 * 7)} ${f(y1 * 0.38)}, ${f(x1 + d1 - s1 * 7)} ${f(y1 * 0.66)}, ${f(x1 + d1)} ${f(y1)}`,
    `C ${f(x1 + d1 + s1 * 7)} ${f(y1 + (y2 - y1) * 0.38)}, ${f(x2 + d2 - s2 * 7)} ${f(y1 + (y2 - y1) * 0.66)}, ${f(x2 + d2)} ${f(y2)}`,
    `C ${f(x2 + d2 + s2 * 7)} ${f(y2 + (y3 - y2) * 0.38)}, ${f(x3 + d3 - s3 * 7)} ${f(y2 + (y3 - y2) * 0.66)}, ${f(x3 + d3)} ${f(y3)}`,
    `C ${f(x3 + d3 + s3 * 7)} ${f(y3 + (100 - y3) * 0.38)}, ${f(x4 + d4 - s4 * 7)} ${f(y3 + (100 - y3) * 0.66)}, ${f(x4 + d4)} 100`,
  ].join(" ");

  // Approximate X near top of cell (entry 0, ~y=16) and middle of cell (entry 1+, ~y=58)
  const nodeX0 = x0 * 0.35 + x1 * 0.65;
  const nodeX1 = x2 * 0.65 + x3 * 0.35;

  return {
    main,
    whisper,
    nodeXFirst: f(nodeX0),
    nodeXLater: f(nodeX1),
  };
}

// Hand-drawn horizontal rule for section/row dividers
function HandRule({
  seed = 1,
  className,
  subtle = false,
}: {
  seed?: number;
  className?: string;
  subtle?: boolean;
}) {
  const y0 = 3 + jitter(seed * 13) * 0.9;
  const y1 = 3 + jitter(seed * 29 + 4) * 1.2;
  const y2 = 3 + jitter(seed * 47 + 9) * 1.1;
  const y3 = 3 + jitter(seed * 61 + 2) * 0.9;
  const d = `M 0 ${f(y0)} C 240 ${f(y1)}, 520 ${f(y2)}, 780 ${f(y1)} S 940 ${f(y3)}, 1000 ${f(y2)}`;
  const d2 = `M 4 ${f(y0 + 0.7)} C 310 ${f(y2 + 0.5)}, 670 ${f(y1 - 0.5)}, 996 ${f(y3 + 0.4)}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 6"
      preserveAspectRatio="none"
      className={cn("pointer-events-none block h-[6px] w-full overflow-visible", className)}
    >
      <path
        d={d}
        fill="none"
        stroke={subtle ? "#e7e5e4" : "#d6d3d1"}
        strokeWidth={subtle ? "1" : "1.25"}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {!subtle && (
        <path
          d={d2}
          fill="none"
          stroke="#a8a29e"
          strokeOpacity="0.35"
          strokeWidth="0.7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

// Column background SVG drawing all hand-sketched rails in that column for one chapter
function ColumnRailsSvg({
  lineIds,
  coords,
  gutterWidth,
  rowIdx,
  activeLinesInChapter,
  isRailHighlighted,
  amp = 2.4,
}: {
  lineIds: LineId[];
  coords: Record<string, number>;
  gutterWidth: number;
  rowIdx: number;
  activeLinesInChapter: LineId[];
  isRailHighlighted: (id: LineId, active: boolean) => boolean;
  amp?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${gutterWidth} 100`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[1px] top-0 left-0 z-10 overflow-visible"
      style={{ width: `${gutterWidth}px`, height: "calc(100% + 1px)" }}
    >
      {lineIds.map((id) => {
        const active = isRailHighlighted(id, activeLinesInChapter.includes(id));
        const seg = buildSketchSegment(id, rowIdx, coords[id], amp);
        const color = LINE_MAP[id].color;

        if (!active) {
          // Light pencil-sketch guideline when a track hasn't started yet or is filtered out
          return (
            <path
              key={id}
              d={seg.main}
              fill="none"
              stroke="#d6d3d1"
              strokeWidth="1.05"
              strokeDasharray="3 4.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          );
        }

        return (
          <g key={id}>
            <path
              d={seg.main}
              fill="none"
              stroke={color}
              strokeOpacity="0.9"
              strokeWidth="1.95"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={seg.whisper}
              fill="none"
              stroke={color}
              strokeOpacity="0.32"
              strokeWidth="0.85"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}

// Hand-sketched header rail starter connecting seamlessly into row 0
function HeaderRailsSvg({
  lineIds,
  coords,
  gutterWidth,
  amp = 2.4,
}: {
  lineIds: LineId[];
  coords: Record<string, number>;
  gutterWidth: number;
  amp?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${gutterWidth} 44`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[11px] top-1 left-0 overflow-visible"
      style={{ width: `${gutterWidth}px`, height: "calc(100% + 7px)" }}
    >
      {lineIds.map((id) => {
        const li = LINE_INDEX[id] + 1;
        const xEnd = railBoundaryX(id, 0, coords[id], amp);
        const xStart = coords[id] + jitter(li * 43 + 7) * 1.4;
        const xCtrl = (xStart + xEnd) / 2 + jitter(li * 79 + 3) * 1.5;
        const color = LINE_MAP[id].color;
        return (
          <g key={id}>
            <path
              d={`M ${f(xStart)} 4 Q ${f(xCtrl)} 24 ${f(xEnd)} 44`}
              fill="none"
              stroke={color}
              strokeWidth="1.9"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Tiny ink nib dot at the very top of each stave line */}
            <circle cx={f(xStart)} cy="4" r="2.1" fill={color} />
          </g>
        );
      })}
    </svg>
  );
}

// Hand-drawn 2026 terminal arrow/loop cap starting seamlessly at final boundary
function TerminalRailsSvg({
  lineIds,
  coords,
  gutterWidth,
  finalBoundaryIdx,
  amp = 2.4,
}: {
  lineIds: LineId[];
  coords: Record<string, number>;
  gutterWidth: number;
  finalBoundaryIdx: number;
  amp?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${gutterWidth} 22`}
      className="pointer-events-none absolute top-0 left-0 overflow-visible"
      style={{ width: `${gutterWidth}px`, height: "22px" }}
    >
      {lineIds.map((id) => {
        const li = LINE_INDEX[id] + 1;
        const x0 = railBoundaryX(id, finalBoundaryIdx, coords[id], amp);
        const xTip = x0 + jitter(li * 59 + 11) * 1.1;
        const color = LINE_MAP[id].color;
        return (
          <g key={id}>
            <path
              d={`M ${f(x0)} 0 Q ${f(x0 + 0.6)} 8 ${f(xTip)} 15`}
              fill="none"
              stroke={color}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Hand-sketched small V arrowhead */}
            <path
              d={`M ${f(xTip - 3.3)} 10.8 L ${f(xTip)} 16.2 L ${f(xTip + 3.4)} 10.5`}
              fill="none"
              stroke={color}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

type LightboxState = {
  photo: BioPhoto;
  year: number;
  title: string;
  line: BioLineMeta;
} | null;

function EntryBlock({
  entry,
  year,
  seed,
  railNodeOffsetPx,
  tickWidthPx,
  dimmed,
  eagerImage,
  onOpenPhoto,
  showCategoryBadge = false,
}: {
  entry: BioEntry;
  year: number;
  seed: number;
  railNodeOffsetPx: number;
  tickWidthPx: number;
  dimmed: boolean;
  eagerImage?: boolean;
  onOpenPhoto: (item: NonNullable<LightboxState>) => void;
  showCategoryBadge?: boolean;
}) {
  const line = LINE_MAP[entry.lineId];
  const rotDeg = Math.round(jitter(seed * 37 + 19) * 28);
  const archY = 9 + jitter(seed * 23 + 5) * 2.1;
  const tiltClass =
    jitter(seed * 41 + 3) >= 0 ? "rotate-[0.45deg]" : "-rotate-[0.45deg]";

  return (
    <div
      className={cn(
        "relative transition-opacity duration-200",
        dimmed ? "opacity-20" : "opacity-100"
      )}
    >
      {/* Hand-sketched ink loop node + curved pen tick connecting rail to entry */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 z-20 overflow-visible"
        style={{
          left: `${railNodeOffsetPx}px`,
          width: `${Math.max(tickWidthPx, 6)}px`,
          height: "18px",
        }}
      >
        {/* Curved fountain-pen connector tick */}
        <path
          d={`M 3.6 9.2 Q ${f(tickWidthPx * 0.52)} ${f(archY)} ${f(tickWidthPx)} 9.4`}
          fill="none"
          stroke={line.color}
          strokeOpacity="0.62"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Tiny nib stop dot at entry end */}
        <circle
          cx={f(tickWidthPx)}
          cy="9.4"
          r="1.2"
          fill={line.color}
          fillOpacity="0.55"
        />
        {/* Hand-drawn overdrawn 1.2-turn ink loop node */}
        <g transform={`translate(0, 9.2) rotate(${rotDeg})`}>
          <circle cx="0" cy="0" r="3.6" fill="#ffffff" />
          <path
            d="M -3.5 -1.1 C -3.8 -4.1 0.8 -4.6 3.4 -2.3 C 4.7 -0.1 3.6 3.6 0.2 3.9 C -3.2 4.1 -4.4 0.9 -3.0 -2.1 C -2.1 -3.5 -0.2 -4.0 1.6 -3.4"
            fill="none"
            stroke={line.color}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      <div className="leading-snug">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {showCategoryBadge && (
            <span
              className="inline-block rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
              style={{
                color: line.color,
                backgroundColor: line.softBg,
              }}
            >
              {line.shortLabel}
            </span>
          )}
          <span className="text-[13.5px] font-medium text-stone-900">
            {entry.title}
          </span>
          {entry.span && (
            <span className="font-mono text-[11px] text-stone-400">
              {entry.span}
            </span>
          )}
        </div>

        <div className="mt-1 text-[12.5px] leading-relaxed text-stone-600">
          {entry.detail}
          {entry.link && (
            <>
              {" "}
              <a
                href={entry.link.href}
                target={entry.link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  entry.link.href.startsWith("http")
                    ? "noreferrer noopener"
                    : undefined
                }
                className="inline-flex items-center font-mono text-[11px] text-stone-500 underline decoration-stone-300 underline-offset-2 hover:text-stone-900 hover:decoration-stone-700 visited:text-stone-500"
              >
                {entry.link.label}↗
              </a>
            </>
          )}
        </div>

        {entry.photo && (
          <button
            type="button"
            onClick={() =>
              onOpenPhoto({
                photo: entry.photo!,
                year,
                title: entry.title,
                line,
              })
            }
            className="group mt-2.5 block w-full max-w-[228px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
          >
            <div
              className={cn(
                "overflow-hidden rounded-[2px] border border-stone-300/90 bg-[#fcfcfa] p-1.5 shadow-[1px_2px_0px_rgba(28,25,23,0.07)] transition-transform duration-300 group-hover:rotate-0",
                tiltClass,
                entry.photo.aspect === "portrait"
                  ? "max-w-[168px]"
                  : ""
              )}
            >
              <div
                className={cn(
                  "overflow-hidden rounded-[1px] bg-stone-100",
                  entry.photo.aspect === "portrait"
                    ? "aspect-[4/4] bg-white"
                    : "aspect-[16/10]"
                )}
              >
                <img
                  src={entry.photo.src}
                  alt={entry.photo.alt}
                  loading={eagerImage ? "eager" : "lazy"}
                  decoding="async"
                  className={cn(
                    "h-full w-full transition-all duration-300 group-hover:scale-[1.02]",
                    entry.photo.aspect === "portrait"
                      ? "object-contain"
                      : "object-cover grayscale-[18%] contrast-[1.02] group-hover:grayscale-0"
                  )}
                />
              </div>
            </div>
            <span className="mt-1.5 block font-mono text-[10.5px] leading-tight text-stone-400 group-hover:text-stone-700">
              {entry.photo.caption}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function BioTimeline() {
  const [selectedLine, setSelectedLine] = useState<LineId | "photos" | null>(
    null
  );
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  const chaptersToRender = useMemo(() => {
    if (selectedLine !== "photos") return BIO_CHAPTERS;
    return BIO_CHAPTERS.filter((ch) =>
      [...ch.activities, ...ch.places, ...ch.people].some((e) => Boolean(e.photo))
    );
  }, [selectedLine]);

  const isLineDimmed = (lineId: LineId, hasPhoto?: boolean) => {
    if (!selectedLine) return false;
    if (selectedLine === "photos") return !hasPhoto;
    return selectedLine !== lineId;
  };

  const isRailHighlighted = (lineId: LineId, isActiveInChapter: boolean) => {
    if (!isActiveInChapter) return false;
    if (!selectedLine || selectedLine === "photos") return true;
    return selectedLine === lineId;
  };

  return (
    <section aria-label="Life timeline 1988 to 2026" className="pb-12">
      {/* Intro header */}
      <div className="mb-5 pb-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-950">
            Bio in Six Lines
          </h1>
          <span className="font-mono text-xs tabular-nums text-stone-400">
            1988 — 2026 · Cagliari → London
          </span>
        </div>
        <p className="mt-2 max-w-[680px] text-[13.5px] leading-relaxed text-stone-600">
          Thirty-eight years sketched across six parallel lines —{" "}
          <span className="font-medium text-stone-900">1 line</span> for
          activities &amp; achievements,{" "}
          <span className="font-medium text-stone-900">2 lines</span> for
          places, and{" "}
          <span className="font-medium text-stone-900">3 lines</span> for the
          people (and dog) met along the way.
        </p>

        {/* Interactive line legend / filter */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedLine(null)}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors",
              selectedLine === null
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 bg-white text-stone-600 hover:border-stone-400"
            )}
          >
            All 6 lines
          </button>

          {BIO_LINES.map((line, idx) => {
            const active = selectedLine === line.id;
            return (
              <button
                key={line.id}
                type="button"
                onClick={() => setSelectedLine(active ? null : line.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors",
                  active
                    ? "border-stone-900 bg-stone-950 text-white"
                    : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                )}
              >
                {/* Tiny hand-drawn squiggle swatch */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 14 8"
                  className="h-2 w-3.5 overflow-visible"
                >
                  <path
                    d="M 1 5.2 Q 4.5 1.8 7.5 4.6 T 13 3.4"
                    fill="none"
                    stroke={active ? "#ffffff" : line.color}
                    strokeWidth="2.1"
                    strokeLinecap="round"
                  />
                </svg>
                <span>
                  {idx + 1}. {line.label}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() =>
              setSelectedLine(selectedLine === "photos" ? null : "photos")
            }
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors",
              selectedLine === "photos"
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-400"
            )}
          >
            Photos only
          </button>
        </div>

        <HandRule seed={3} className="mt-5" />
      </div>

      {/* DESKTOP STAVE (md and up): 3 synchronized columns with 1 + 2 + 3 hand-drawn vertical lines */}
      <div className="hidden md:block">
        {/* Sticky stave header aligned seamlessly with row 0 */}
        <div className="sticky top-0 z-30 bg-white/95 pt-3 pb-2.5 backdrop-blur-sm">
          <div className="grid grid-cols-[54px_minmax(0,1.25fr)_minmax(0,0.98fr)_minmax(0,1.06fr)] gap-x-6">
            <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400">
              Year
            </div>

            {/* Column 1 Header (1 line) */}
            <div
              className="relative"
              style={{ paddingLeft: `${DESKTOP_RAILS.activities.paddingLeft}px` }}
            >
              <HeaderRailsSvg
                lineIds={["act-1"]}
                coords={DESKTOP_RAILS.activities.coords}
                gutterWidth={DESKTOP_RAILS.activities.gutterWidth}
              />
              <div className="text-xs font-semibold tracking-tight text-stone-900">
                Activities &amp; Achievements
              </div>
              <div className="font-mono text-[10px] text-stone-400">
                1 line · craft &amp; obsessions
              </div>
            </div>

            {/* Column 2 Header (2 lines) */}
            <div
              className="relative"
              style={{ paddingLeft: `${DESKTOP_RAILS.places.paddingLeft}px` }}
            >
              <HeaderRailsSvg
                lineIds={["place-1", "place-2"]}
                coords={DESKTOP_RAILS.places.coords}
                gutterWidth={DESKTOP_RAILS.places.gutterWidth}
              />
              <div className="text-xs font-semibold tracking-tight text-stone-900">
                Places
              </div>
              <div className="font-mono text-[10px] text-stone-400">
                2 lines · home base &amp; stints
              </div>
            </div>

            {/* Column 3 Header (3 lines) */}
            <div
              className="relative"
              style={{ paddingLeft: `${DESKTOP_RAILS.people.paddingLeft}px` }}
            >
              <HeaderRailsSvg
                lineIds={["people-1", "people-2", "people-3"]}
                coords={DESKTOP_RAILS.people.coords}
                gutterWidth={DESKTOP_RAILS.people.gutterWidth}
              />
              <div className="text-xs font-semibold tracking-tight text-stone-900">
                People
              </div>
              <div className="font-mono text-[10px] text-stone-400">
                3 lines · roots, builders, crew
              </div>
            </div>
          </div>
          <HandRule seed={11} className="mt-2.5" />
        </div>

        {/* Chronological rows */}
        <div>
          {chaptersToRender.map((chapter, chapterIdx) => (
            <div key={chapter.year} className="group/row relative">
              <div className="grid grid-cols-[54px_minmax(0,1.25fr)_minmax(0,0.98fr)_minmax(0,1.06fr)] gap-x-6 hover:bg-stone-50/55 transition-colors">
                {/* Year column */}
                <div className="py-5 pr-2">
                  <span className="sticky top-14 font-mono text-xs font-medium tabular-nums text-stone-400 transition-colors group-hover/row:text-stone-900">
                    {chapter.year}
                  </span>
                </div>

                {/* Column 1: Activities & Achievements (1 hand-drawn vertical line) */}
                <div
                  className="relative space-y-4 py-5"
                  style={{
                    paddingLeft: `${DESKTOP_RAILS.activities.paddingLeft}px`,
                  }}
                >
                  <ColumnRailsSvg
                    lineIds={["act-1"]}
                    coords={DESKTOP_RAILS.activities.coords}
                    gutterWidth={DESKTOP_RAILS.activities.gutterWidth}
                    rowIdx={chapterIdx}
                    activeLinesInChapter={chapter.activeLines}
                    isRailHighlighted={isRailHighlighted}
                  />

                  {chapter.activities.map((entry, idx) => {
                    const pad = DESKTOP_RAILS.activities.paddingLeft;
                    const seg = buildSketchSegment(
                      entry.lineId,
                      chapterIdx,
                      DESKTOP_RAILS.activities.coords[entry.lineId]
                    );
                    const nodeX = Number(
                      idx === 0 ? seg.nodeXFirst : seg.nodeXLater
                    );
                    return (
                      <EntryBlock
                        key={`${chapter.year}-act-${idx}`}
                        entry={entry}
                        year={chapter.year}
                        seed={chapter.year * 7 + idx + 1}
                        railNodeOffsetPx={nodeX - pad}
                        tickWidthPx={pad - nodeX - 6}
                        dimmed={isLineDimmed(entry.lineId, Boolean(entry.photo))}
                        eagerImage={chapterIdx < 2}
                        onOpenPhoto={setLightbox}
                      />
                    );
                  })}
                </div>

                {/* Column 2: Places (2 parallel hand-drawn vertical lines) */}
                <div
                  className="relative space-y-4 py-5"
                  style={{ paddingLeft: `${DESKTOP_RAILS.places.paddingLeft}px` }}
                >
                  <ColumnRailsSvg
                    lineIds={["place-1", "place-2"]}
                    coords={DESKTOP_RAILS.places.coords}
                    gutterWidth={DESKTOP_RAILS.places.gutterWidth}
                    rowIdx={chapterIdx}
                    activeLinesInChapter={chapter.activeLines}
                    isRailHighlighted={isRailHighlighted}
                  />

                  {chapter.places.map((entry, idx) => {
                    const pad = DESKTOP_RAILS.places.paddingLeft;
                    const seg = buildSketchSegment(
                      entry.lineId,
                      chapterIdx,
                      DESKTOP_RAILS.places.coords[entry.lineId]
                    );
                    const nodeX = Number(
                      idx === 0 ? seg.nodeXFirst : seg.nodeXLater
                    );
                    return (
                      <EntryBlock
                        key={`${chapter.year}-place-${idx}`}
                        entry={entry}
                        year={chapter.year}
                        seed={chapter.year * 11 + idx + 3}
                        railNodeOffsetPx={nodeX - pad}
                        tickWidthPx={pad - nodeX - 6}
                        dimmed={isLineDimmed(entry.lineId, Boolean(entry.photo))}
                        eagerImage={chapterIdx === 0}
                        onOpenPhoto={setLightbox}
                      />
                    );
                  })}
                </div>

                {/* Column 3: People (3 parallel hand-drawn vertical lines) */}
                <div
                  className="relative space-y-4 py-5"
                  style={{ paddingLeft: `${DESKTOP_RAILS.people.paddingLeft}px` }}
                >
                  <ColumnRailsSvg
                    lineIds={["people-1", "people-2", "people-3"]}
                    coords={DESKTOP_RAILS.people.coords}
                    gutterWidth={DESKTOP_RAILS.people.gutterWidth}
                    rowIdx={chapterIdx}
                    activeLinesInChapter={chapter.activeLines}
                    isRailHighlighted={isRailHighlighted}
                  />

                  {chapter.people.map((entry, idx) => {
                    const pad = DESKTOP_RAILS.people.paddingLeft;
                    const seg = buildSketchSegment(
                      entry.lineId,
                      chapterIdx,
                      DESKTOP_RAILS.people.coords[entry.lineId]
                    );
                    const nodeX = Number(
                      idx === 0 ? seg.nodeXFirst : seg.nodeXLater
                    );
                    return (
                      <EntryBlock
                        key={`${chapter.year}-people-${idx}`}
                        entry={entry}
                        year={chapter.year}
                        seed={chapter.year * 13 + idx + 5}
                        railNodeOffsetPx={nodeX - pad}
                        tickWidthPx={pad - nodeX - 6}
                        dimmed={isLineDimmed(entry.lineId, Boolean(entry.photo))}
                        onOpenPhoto={setLightbox}
                      />
                    );
                  })}
                </div>
              </div>

              {chapterIdx < chaptersToRender.length - 1 && (
                <HandRule seed={chapter.year} subtle />
              )}
            </div>
          ))}
        </div>

        {/* End-of-line 2026 hand-sketched arrowheads */}
        <div className="grid grid-cols-[54px_minmax(0,1.25fr)_minmax(0,0.98fr)_minmax(0,1.06fr)] gap-x-6">
          <div className="pt-1 font-mono text-[10px] text-stone-300">2026+</div>
          <div
            className="relative h-6"
            style={{ paddingLeft: `${DESKTOP_RAILS.activities.paddingLeft}px` }}
          >
            <TerminalRailsSvg
              lineIds={["act-1"]}
              coords={DESKTOP_RAILS.activities.coords}
              gutterWidth={DESKTOP_RAILS.activities.gutterWidth}
              finalBoundaryIdx={chaptersToRender.length}
            />
          </div>
          <div
            className="relative h-6"
            style={{ paddingLeft: `${DESKTOP_RAILS.places.paddingLeft}px` }}
          >
            <TerminalRailsSvg
              lineIds={["place-1", "place-2"]}
              coords={DESKTOP_RAILS.places.coords}
              gutterWidth={DESKTOP_RAILS.places.gutterWidth}
              finalBoundaryIdx={chaptersToRender.length}
            />
          </div>
          <div
            className="relative h-6"
            style={{ paddingLeft: `${DESKTOP_RAILS.people.paddingLeft}px` }}
          >
            <TerminalRailsSvg
              lineIds={["people-1", "people-2", "people-3"]}
              coords={DESKTOP_RAILS.people.coords}
              gutterWidth={DESKTOP_RAILS.people.gutterWidth}
              finalBoundaryIdx={chaptersToRender.length}
            />
          </div>
        </div>
      </div>

      {/* MOBILE STAVE (< md): All 6 hand-drawn vertical lines in left margin */}
      <div className="md:hidden">
        {chaptersToRender.map((chapter, chapterIdx) => {
          const combined = [
            ...chapter.activities,
            ...chapter.places,
            ...chapter.people,
          ];
          return (
            <div
              key={`mob-${chapter.year}`}
              className="relative pb-7"
              style={{ paddingLeft: `${MOBILE_PADDING_LEFT}px` }}
            >
              <ColumnRailsSvg
                lineIds={BIO_LINES.map((l) => l.id)}
                coords={MOBILE_RAIL_X}
                gutterWidth={MOBILE_GUTTER_WIDTH}
                rowIdx={chapterIdx}
                activeLinesInChapter={chapter.activeLines}
                isRailHighlighted={isRailHighlighted}
                amp={1.45}
              />

              <div className="mb-2.5 font-mono text-xs font-semibold tabular-nums text-stone-900">
                {chapter.year}
              </div>

              <div className="space-y-4">
                {combined.map((entry, idx) => {
                  const seg = buildSketchSegment(
                    entry.lineId,
                    chapterIdx,
                    MOBILE_RAIL_X[entry.lineId],
                    1.45
                  );
                  const nodeX = Number(
                    idx === 0 ? seg.nodeXFirst : seg.nodeXLater
                  );
                  return (
                    <EntryBlock
                      key={`mob-${chapter.year}-${idx}`}
                      entry={entry}
                      year={chapter.year}
                      seed={chapter.year * 17 + idx + 9}
                      railNodeOffsetPx={nodeX - MOBILE_PADDING_LEFT}
                      tickWidthPx={MOBILE_PADDING_LEFT - nodeX - 8}
                      dimmed={isLineDimmed(entry.lineId, Boolean(entry.photo))}
                      eagerImage={chapterIdx < 2}
                      onOpenPhoto={setLightbox}
                      showCategoryBadge
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        <div
          className="relative h-6"
          style={{ paddingLeft: `${MOBILE_PADDING_LEFT}px` }}
        >
          <TerminalRailsSvg
            lineIds={BIO_LINES.map((l) => l.id)}
            coords={MOBILE_RAIL_X}
            gutterWidth={MOBILE_GUTTER_WIDTH}
            finalBoundaryIdx={chaptersToRender.length}
            amp={1.45}
          />
        </div>
      </div>

      {/* Minimal fast photo lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.photo.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px]"
        >
          <button
            type="button"
            aria-label="Close image preview"
            onClick={() => setLightbox(null)}
            className="absolute inset-0 h-full w-full cursor-zoom-out"
          />
          <div className="relative z-10 w-full max-w-[640px] rounded bg-[#fcfcfa] p-3 shadow-2xl">
            <div className="overflow-hidden rounded-[2px] bg-stone-100">
              <img
                src={lightbox.photo.src}
                alt={lightbox.photo.alt}
                className="max-h-[72vh] w-full object-contain"
              />
            </div>
            <div className="mt-2.5 flex items-baseline justify-between gap-4 px-0.5">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: lightbox.line.color }}
                  />
                  <span className="font-mono text-xs font-medium text-stone-900">
                    {lightbox.year} · {lightbox.title}
                  </span>
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-stone-500">
                  {lightbox.photo.caption}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="shrink-0 rounded border border-stone-200 px-2 py-0.5 font-mono text-[11px] text-stone-600 hover:border-stone-400 hover:text-stone-900"
              >
                ESC
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
