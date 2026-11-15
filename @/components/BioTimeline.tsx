import { Fragment, useEffect, useState } from "react";
import {
  BIO_LINES,
  BIO_STOPS,
  type BioLineMeta,
  type BioPhoto,
  type BioStopItem,
  type LineId,
  type TextSegment,
} from "@/data/bio";
import { cn } from "@/lib/utils";

const LINE_MAP: Record<LineId, BioLineMeta> = Object.fromEntries(
  BIO_LINES.map((l) => [l.id, l])
) as Record<LineId, BioLineMeta>;

const LINE_INDEX: Record<LineId, number> = {
  activities: 0,
  places: 1,
  people: 2,
};

// Three hand-drawn vertical lines in the left stave gutter
const STAVE_GUTTER_WIDTH = 72;
const RAIL_X: Record<LineId, number> = {
  activities: 12,
  places: 35,
  people: 58,
};
const RAIL_AMP = 3.8;

// Deterministic rounded pseudo-random in [-1, 1] (SSR-safe, zero hydration drift)
function jitter(seed: number): number {
  const raw = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  const frac = raw - Math.floor(raw);
  return Math.round((frac * 2 - 1) * 100) / 100;
}

function f(n: number): string {
  return (Math.round(n * 100) / 100).toString();
}

function railBoundaryX(
  lineId: LineId,
  boundaryIdx: number,
  baseX: number,
  amp = RAIL_AMP
): number {
  const li = LINE_INDEX[lineId] + 1;
  return baseX + jitter(li * 97 + boundaryIdx * 31) * amp;
}

function railBoundarySlope(lineId: LineId, boundaryIdx: number): number {
  const li = LINE_INDEX[lineId] + 1;
  return jitter(li * 193 + boundaryIdx * 53 + 17) * 0.14;
}

type CubicSeg = {
  y0: number;
  y1: number;
  x0: number;
  cx1: number;
  cx2: number;
  x1: number;
};

function evalCubic(p0: number, p1: number, p2: number, p3: number, t: number) {
  const u = 1 - t;
  return (
    u * u * u * p0 +
    3 * u * u * t * p1 +
    3 * u * t * t * p2 +
    t * t * t * p3
  );
}

// Multi-waypoint C1-continuous freehand pen stroke + rough second pass in 0..100 Y space
function buildSketchSegment(
  lineId: LineId,
  rowIdx: number,
  baseX: number,
  amp = RAIL_AMP
): {
  main: string;
  whisper: string;
  xAtY: (yPct: number) => number;
} {
  const li = LINE_INDEX[lineId] + 1;
  const x0 = railBoundaryX(lineId, rowIdx, baseX, amp);
  const x5 = railBoundaryX(lineId, rowIdx + 1, baseX, amp);
  const s0 = railBoundarySlope(lineId, rowIdx);
  const s5 = railBoundarySlope(lineId, rowIdx + 1);

  const y1 = 19 + jitter(li * 31 + rowIdx * 59) * 3.2;
  const y2 = 39 + jitter(li * 37 + rowIdx * 67) * 3.8;
  const y3 = 61 + jitter(li * 41 + rowIdx * 71) * 3.8;
  const y4 = 81 + jitter(li * 53 + rowIdx * 83) * 3.2;

  const x1 = baseX + jitter(li * 61 + rowIdx * 97 + 2) * (amp * 1.18);
  const x2 = baseX + jitter(li * 67 + rowIdx * 89 + 5) * (amp * 1.28);
  const x3 = baseX + jitter(li * 73 + rowIdx * 101 + 8) * (amp * 1.24);
  const x4 = baseX + jitter(li * 79 + rowIdx * 107 + 11) * (amp * 1.15);

  const s1 = jitter(li * 109 + rowIdx * 43 + 3) * 0.15;
  const s2 = jitter(li * 127 + rowIdx * 39 + 6) * 0.16;
  const s3 = jitter(li * 131 + rowIdx * 37 + 9) * 0.16;
  const s4 = jitter(li * 139 + rowIdx * 47 + 14) * 0.15;

  const ys = [0, y1, y2, y3, y4, 100];
  const xs = [x0, x1, x2, x3, x4, x5];
  const ss = [s0, s1, s2, s3, s4, s5];

  const cubics: CubicSeg[] = [];
  const mainParts = [`M ${f(x0)} 0`];

  for (let i = 0; i < 5; i++) {
    const ya = ys[i];
    const yb = ys[i + 1];
    const xa = xs[i];
    const xb = xs[i + 1];
    const sa = ss[i];
    const sb = ss[i + 1];
    const cx1 = xa + sa * 7;
    const cx2 = xb - sb * 7;
    const cy1 = ya + (yb - ya) * 0.36;
    const cy2 = ya + (yb - ya) * 0.68;
    cubics.push({ y0: ya, y1: yb, x0: xa, cx1, cx2, x1: xb });
    mainParts.push(
      `C ${f(cx1)} ${f(cy1)}, ${f(cx2)} ${f(cy2)}, ${f(xb)} ${f(yb)}`
    );
  }

  const d0 = jitter(li * 149 + rowIdx * 23) * 1.85;
  const d1 = jitter(li * 151 + rowIdx * 27 + 1) * 2.15;
  const d2 = jitter(li * 157 + rowIdx * 29 + 3) * -2.05;
  const d3 = jitter(li * 163 + rowIdx * 31 + 6) * 2.1;
  const d4 = jitter(li * 167 + rowIdx * 35 + 9) * -1.9;
  const d5 = jitter(li * 149 + (rowIdx + 1) * 23) * 1.85;
  const ds = [d0, d1, d2, d3, d4, d5];

  const whisperParts = [`M ${f(x0 + d0)} 0`];
  for (let i = 0; i < 5; i++) {
    const ya = ys[i];
    const yb = ys[i + 1];
    const xa = xs[i] + ds[i];
    const xb = xs[i + 1] + ds[i + 1];
    const sa = ss[i];
    const sb = ss[i + 1];
    whisperParts.push(
      `C ${f(xa + sa * 6)} ${f(ya + (yb - ya) * 0.38)}, ${f(xb - sb * 6)} ${f(
        ya + (yb - ya) * 0.66
      )}, ${f(xb)} ${f(yb)}`
    );
  }

  const xAtY = (yPct: number) => {
    const clamped = Math.max(0, Math.min(100, yPct));
    const seg =
      cubics.find((c) => clamped >= c.y0 && clamped <= c.y1) ??
      cubics[cubics.length - 1];
    const span = seg.y1 - seg.y0 || 1;
    const t = (clamped - seg.y0) / span;
    return evalCubic(seg.x0, seg.cx1, seg.cx2, seg.x1, t);
  };

  return {
    main: mainParts.join(" "),
    whisper: whisperParts.join(" "),
    xAtY,
  };
}

// Hand-sketched top starter (present / 2026) with upward pen arrowheads
function TopRailsCapSvg() {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${STAVE_GUTTER_WIDTH} 24`}
      className="pointer-events-none absolute top-0 left-0 overflow-visible"
      style={{ width: `${STAVE_GUTTER_WIDTH}px`, height: "24px" }}
    >
      {BIO_LINES.map((line) => {
        const li = LINE_INDEX[line.id] + 1;
        const xEnd = railBoundaryX(line.id, 0, RAIL_X[line.id]);
        const xTip = RAIL_X[line.id] + jitter(li * 43 + 7) * 2.0;
        const xCtrl = (xTip + xEnd) / 2 + jitter(li * 79 + 3) * 2.2;
        return (
          <g key={line.id}>
            <path
              d={`M ${f(xTip)} 5 Q ${f(xCtrl)} 14 ${f(xEnd)} 24`}
              fill="none"
              stroke={line.color}
              strokeWidth="2.05"
              strokeLinecap="round"
            />
            <path
              d={`M ${f(xTip + 1.0)} 6 Q ${f(xCtrl - 1.2)} 15 ${f(xEnd + 0.9)} 24`}
              fill="none"
              stroke={line.color}
              strokeOpacity="0.42"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
            {/* Hand-drawn upward V arrowhead for 'now' */}
            <path
              d={`M ${f(xTip - 3.8)} 10.6 Q ${f(xTip - 1.7)} 7.3 ${f(xTip)} 4.2 Q ${f(
                xTip + 1.8
              )} 7.6 ${f(xTip + 3.7)} 10.9`}
              fill="none"
              stroke={line.color}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

// Hand-drawn 3-line stave segment for one chronological row
function RowThreeRailsSvg({ rowIdx }: { rowIdx: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${STAVE_GUTTER_WIDTH} 100`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[1px] top-0 left-0 z-10 overflow-visible"
      style={{ width: `${STAVE_GUTTER_WIDTH}px`, height: "calc(100% + 1px)" }}
    >
      {BIO_LINES.map((line) => {
        const seg = buildSketchSegment(line.id, rowIdx, RAIL_X[line.id]);
        return (
          <g key={line.id}>
            <path
              d={seg.main}
              fill="none"
              stroke={line.color}
              strokeOpacity="0.9"
              strokeWidth="2.05"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={seg.whisper}
              fill="none"
              stroke={line.color}
              strokeOpacity="0.45"
              strokeWidth="0.95"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}

// Hand-drawn 1988 origin nib dots at the bottom of the 3 lines
function BottomOriginCapSvg({ finalBoundaryIdx }: { finalBoundaryIdx: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${STAVE_GUTTER_WIDTH} 20`}
      className="pointer-events-none absolute top-0 left-0 overflow-visible"
      style={{ width: `${STAVE_GUTTER_WIDTH}px`, height: "20px" }}
    >
      {BIO_LINES.map((line) => {
        const li = LINE_INDEX[line.id] + 1;
        const x0 = railBoundaryX(line.id, finalBoundaryIdx, RAIL_X[line.id]);
        const xEnd = x0 + jitter(li * 59 + 11) * 1.8;
        return (
          <g key={line.id}>
            <path
              d={`M ${f(x0)} 0 Q ${f(x0 + jitter(li * 23) * 1.5)} 7 ${f(xEnd)} 13`}
              fill="none"
              stroke={line.color}
              strokeWidth="1.95"
              strokeLinecap="round"
            />
            <circle cx={f(xEnd)} cy="13.5" r="2.5" fill={line.color} />
          </g>
        );
      })}
    </svg>
  );
}

// Subtle hand-sketched horizontal divider between stops
function HandRule({ seed }: { seed: number }) {
  const y0 = 5 + jitter(seed * 13) * 1.7;
  const y1 = 5 + jitter(seed * 29 + 4) * 2.2;
  const y2 = 5 + jitter(seed * 47 + 9) * -2.0;
  const y3 = 5 + jitter(seed * 61 + 2) * 1.9;
  const y4 = 5 + jitter(seed * 73 + 6) * -1.6;
  const d = `M 0 ${f(y0)} C 200 ${f(y1)}, 420 ${f(y2)}, 620 ${f(y3)} S 840 ${f(
    y4
  )}, 1000 ${f(y1)}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 10"
      preserveAspectRatio="none"
      className="pointer-events-none block h-[8px] w-full overflow-visible"
    >
      <path
        d={d}
        fill="none"
        stroke="#e5e0d8"
        strokeWidth="1.1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function RichSegments({ segments }: { segments: TextSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (typeof seg === "string") {
          return <Fragment key={i}>{seg}</Fragment>;
        }
        const isExternal = seg.href.startsWith("http");
        return (
          <a
            key={i}
            href={seg.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer noopener" : undefined}
            className="text-stone-900 underline decoration-stone-400 decoration-[1.2px] underline-offset-[3px] transition-colors visited:text-stone-900 hover:text-blue-700 hover:decoration-blue-700"
          >
            {seg.text}
          </a>
        );
      })}
    </>
  );
}

function segmentsToPlainText(segments: TextSegment[]): string {
  return segments.map((s) => (typeof s === "string" ? s : s.text)).join("");
}

type NodeAnchor = {
  lineId: LineId;
  xPx: number;
};

function StopItemRow({
  item,
  seed,
  nodes,
  contentPaddingLeftPx,
}: {
  item: BioStopItem;
  seed: number;
  nodes: NodeAnchor[];
  contentPaddingLeftPx: number;
}) {
  const firstNode = nodes[0];
  const lastNode = nodes[nodes.length - 1];
  const lastLine = LINE_MAP[lastNode.lineId];
  const archY = 10 + jitter(seed * 23 + 5) * 2.2;
  const railNodeOffsetPx = firstNode.xPx - contentPaddingLeftPx;
  const tickWidthPx = contentPaddingLeftPx - firstNode.xPx - 8;

  const localLastX = lastNode.xPx - firstNode.xPx;
  const tailStartX = localLastX + 4.2;
  const tailSpan = Math.max(tickWidthPx - tailStartX, 4);
  const tailPath = `M ${f(tailStartX)} 10.2 C ${f(
    tailStartX + tailSpan * 0.34
  )} ${f(archY)}, ${f(tailStartX + tailSpan * 0.72)} ${f(
    20.4 - archY
  )}, ${f(tickWidthPx)} 10.4`;

  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 z-20 overflow-visible"
        style={{
          left: `${railNodeOffsetPx}px`,
          width: `${Math.max(tickWidthPx, 6)}px`,
          height: "20px",
        }}
      >
        {/* Bridge strokes between multiple connected rails (e.g. activities + people) */}
        {nodes.slice(0, -1).map((node, idx) => {
          const nextNode = nodes[idx + 1];
          const segColor = LINE_MAP[node.lineId].color;
          const startX = node.xPx - firstNode.xPx + 4.2;
          const endX = nextNode.xPx - firstNode.xPx - 4.2;
          const span = Math.max(endX - startX, 2);
          const bridgeArchY = 10 + jitter((seed + idx * 11) * 29 + 3) * 2.1;
          const bridgePath = `M ${f(startX)} 10.2 C ${f(
            startX + span * 0.34
          )} ${f(bridgeArchY)}, ${f(startX + span * 0.72)} ${f(
            20.4 - bridgeArchY
          )}, ${f(endX)} 10.2`;

          return (
            <Fragment key={`bridge-${node.lineId}-${nextNode.lineId}`}>
              <path
                d={bridgePath}
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.9"
                strokeWidth="3.8"
                strokeLinecap="round"
              />
              <path
                d={bridgePath}
                fill="none"
                stroke={segColor}
                strokeOpacity="0.76"
                strokeWidth="1.45"
                strokeLinecap="round"
              />
              <path
                d={`M ${f(startX + 0.4)} 10.9 Q ${f(
                  startX + span * 0.55
                )} ${f(bridgeArchY + 1.1)} ${f(endX - 0.4)} 9.8`}
                fill="none"
                stroke={segColor}
                strokeOpacity="0.32"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </Fragment>
          );
        })}

        {/* Crisp white sketch halo so ticks crossing adjacent rails hop cleanly */}
        <path
          d={tailPath}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.9"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        {/* Double-pass freehand fountain-pen connector tick */}
        <path
          d={tailPath}
          fill="none"
          stroke={lastLine.color}
          strokeOpacity="0.76"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <path
          d={`M ${f(tailStartX + 0.4)} 10.9 Q ${f(
            tailStartX + tailSpan * 0.55
          )} ${f(archY + 1.1)} ${f(tickWidthPx - 0.6)} 9.8`}
          fill="none"
          stroke={lastLine.color}
          strokeOpacity="0.32"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <circle
          cx={f(tickWidthPx)}
          cy="10.4"
          r="1.35"
          fill={lastLine.color}
          fillOpacity="0.68"
        />

        {/* Hand-drawn overdrawn 1.4-turn sketchy ink loop node on each connected rail */}
        {nodes.map((node, idx) => {
          const localX = node.xPx - firstNode.xPx;
          const nodeColor = LINE_MAP[node.lineId].color;
          const rotDeg = Math.round(jitter((seed + idx * 17) * 37 + 19) * 28);
          return (
            <g
              key={`node-${node.lineId}`}
              transform={`translate(${f(localX)}, 10.2) rotate(${rotDeg})`}
            >
              <circle cx="0" cy="0" r="4.2" fill="#ffffff" />
              <path
                d="M -3.9 -1.2 C -4.3 -4.6 1.1 -5.1 3.9 -2.5 C 5.2 -0.1 4.0 4.1 0.3 4.3 C -3.6 4.6 -4.9 1.0 -3.3 -2.4 C -2.2 -4.0 0.2 -4.5 2.4 -3.6"
                fill="none"
                stroke={nodeColor}
                strokeWidth="1.85"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </svg>

      <div className="text-[14.5px] leading-[1.42] text-stone-900">
        <RichSegments segments={item.segments} />
      </div>
    </div>
  );
}

type LightboxState = {
  photo: BioPhoto;
  year: string;
  title: string;
} | null;

const CONTENT_PADDING_LEFT = 92;

export default function BioTimeline() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <section aria-label="Bio timeline" className="pb-14">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-stone-950">
        Bio
      </h1>

      {/* Top cap of the 3 hand-drawn lines (2026 / present) */}
      <div className="flex items-start">
        <div className="w-[44px] shrink-0 sm:w-[52px]" />
        <div
          className="relative h-6 flex-1"
          style={{ paddingLeft: `${CONTENT_PADDING_LEFT}px` }}
        >
          <TopRailsCapSvg />
        </div>
      </div>

      {/* Reverse-chronological stops: 2026 -> 1988 */}
      <div>
        {BIO_STOPS.map((stop, rowIdx) => {
          const hasPhoto = Boolean(stop.photo);
          const itemCount = stop.items.length;
          const tiltClass =
            jitter((rowIdx + 1) * 41 + 3) >= 0
              ? "rotate-[0.6deg]"
              : "-rotate-[0.6deg]";

          return (
            <div key={stop.id} className="group/row flex items-stretch">
              {/* Year on the far left */}
              <div className="flex w-[44px] shrink-0 items-center py-4 pr-2 font-mono text-xs tabular-nums text-stone-400 transition-colors group-hover/row:text-stone-900 sm:w-[52px]">
                {stop.year}
              </div>

              {/* 3 hand-drawn lines on the left + stop at the center + optional era photo */}
              <div
                className="relative flex-1"
                style={{ paddingLeft: `${CONTENT_PADDING_LEFT}px` }}
              >
                <RowThreeRailsSvg rowIdx={rowIdx} />

                <div className="flex items-center justify-between gap-3 py-4 sm:gap-6">
                  {/* Stop text at the center */}
                  <div className="min-w-0 flex-1 space-y-2.5">
                    {stop.items.map((item, itemIdx) => {
                      // Match item vertical center in 0..100 row Y-space
                      const approxY =
                        itemCount === 1
                          ? 50
                          : itemCount === 2
                            ? itemIdx === 0
                              ? 36
                              : 64
                            : Math.round(((itemIdx + 1) / (itemCount + 1)) * 100);

                      const lineIds = [
                        item.lineId,
                        ...(item.alsoLineIds ?? []),
                      ].sort((a, b) => LINE_INDEX[a] - LINE_INDEX[b]);

                      const nodes: NodeAnchor[] = lineIds.map((lid) => ({
                        lineId: lid,
                        xPx: buildSketchSegment(
                          lid,
                          rowIdx,
                          RAIL_X[lid]
                        ).xAtY(approxY),
                      }));

                      return (
                        <StopItemRow
                          key={`${stop.id}-${itemIdx}`}
                          item={item}
                          seed={rowIdx * 37 + itemIdx * 13 + 5}
                          nodes={nodes}
                          contentPaddingLeftPx={CONTENT_PADDING_LEFT}
                        />
                      );
                    })}
                  </div>

                  {/* Compact era photo without text description */}
                  {hasPhoto && stop.photo && (
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox({
                          photo: stop.photo!,
                          year: stop.year,
                          title: segmentsToPlainText(stop.items[0].segments),
                        })
                      }
                      aria-label={`${stop.year} — ${stop.photo.alt}`}
                      className={cn(
                        "group block shrink-0 rounded-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900",
                        stop.photo.aspect === "portrait"
                          ? "w-[72px] sm:w-[96px]"
                          : "w-[92px] sm:w-[140px]"
                      )}
                    >
                      <div
                        className={cn(
                          "overflow-hidden rounded-[2px] border border-stone-300/90 bg-[#fcfcfa] p-1 shadow-[1px_2px_0px_rgba(28,25,23,0.07)] transition-transform duration-300 group-hover:rotate-0",
                          tiltClass
                        )}
                      >
                        <div
                          className={cn(
                            "overflow-hidden rounded-[1px] bg-stone-100",
                            stop.photo.aspect === "portrait"
                              ? "aspect-square bg-white"
                              : "aspect-[16/10]"
                          )}
                        >
                          <img
                            src={stop.photo.src}
                            alt={stop.photo.alt}
                            loading={rowIdx < 3 ? "eager" : "lazy"}
                            decoding="async"
                            className={cn(
                              "h-full w-full transition-all duration-300 group-hover:scale-[1.03]",
                              stop.photo.aspect === "portrait"
                                ? "object-contain"
                                : "object-cover grayscale-[15%] contrast-[1.02] group-hover:grayscale-0"
                            )}
                          />
                        </div>
                      </div>
                    </button>
                  )}
                </div>

                {rowIdx < BIO_STOPS.length - 1 && (
                  <HandRule seed={rowIdx * 19 + 7} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom origin cap of the 3 hand-drawn lines (1988) */}
      <div className="flex items-start">
        <div className="w-[44px] shrink-0 sm:w-[52px]" />
        <div
          className="relative h-5 flex-1"
          style={{ paddingLeft: `${CONTENT_PADDING_LEFT}px` }}
        >
          <BottomOriginCapSvg finalBoundaryIdx={BIO_STOPS.length} />
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
                className="max-h-[74vh] w-full object-contain"
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between gap-4 px-0.5">
              <span className="font-mono text-xs font-medium text-stone-900">
                {lightbox.year} · {lightbox.title}
              </span>
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
