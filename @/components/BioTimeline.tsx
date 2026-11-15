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

// Desktop rail X offsets (px from left edge of each column)
const DESKTOP_RAILS = {
  activities: { paddingLeft: 24, coords: { "act-1": 6 } as Record<string, number> },
  places: {
    paddingLeft: 36,
    coords: { "place-1": 6, "place-2": 18 } as Record<string, number>,
  },
  people: {
    paddingLeft: 48,
    coords: {
      "people-1": 6,
      "people-2": 18,
      "people-3": 30,
    } as Record<string, number>,
  },
};

// Mobile 6-line metro stave (1 + 2 + 3 grouped rails in left gutter)
const MOBILE_PADDING_LEFT = 64;
const MOBILE_RAIL_X: Record<LineId, number> = {
  "act-1": 6,
  "place-1": 18,
  "place-2": 25,
  "people-1": 37,
  "people-2": 44,
  "people-3": 51,
};

type LightboxState = {
  photo: BioPhoto;
  year: number;
  title: string;
  line: BioLineMeta;
} | null;

function EntryBlock({
  entry,
  year,
  railOffsetPx,
  tickWidthPx,
  dimmed,
  eagerImage,
  onOpenPhoto,
  showCategoryBadge = false,
}: {
  entry: BioEntry;
  year: number;
  railOffsetPx: number;
  tickWidthPx: number;
  dimmed: boolean;
  eagerImage?: boolean;
  onOpenPhoto: (item: NonNullable<LightboxState>) => void;
  showCategoryBadge?: boolean;
}) {
  const line = LINE_MAP[entry.lineId];

  return (
    <div
      className={cn(
        "relative transition-opacity duration-200",
        dimmed ? "opacity-20" : "opacity-100"
      )}
    >
      {/* Horizontal tick from active rail to text */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[9px] z-10 h-[1px]"
        style={{
          left: `${railOffsetPx}px`,
          width: `${tickWidthPx}px`,
          backgroundColor: line.color,
          opacity: 0.45,
        }}
      />
      {/* Node on the exact vertical line */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[9px] z-20 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white"
        style={{
          left: `${railOffsetPx}px`,
          backgroundColor: line.color,
        }}
      />

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
          <span className="text-[13.5px] font-medium text-neutral-900">
            {entry.title}
          </span>
          {entry.span && (
            <span className="font-mono text-[11px] text-neutral-400">
              {entry.span}
            </span>
          )}
        </div>

        <div className="mt-1 text-[12.5px] leading-relaxed text-neutral-600">
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
                className="inline-flex items-center font-mono text-[11px] text-neutral-500 underline decoration-neutral-300 underline-offset-2 hover:text-neutral-900 hover:decoration-neutral-700 visited:text-neutral-500"
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
            className="group mt-2.5 block w-full max-w-[230px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm"
          >
            <div
              className={cn(
                "overflow-hidden rounded-[3px] border border-neutral-200 bg-neutral-50",
                entry.photo.aspect === "portrait"
                  ? "aspect-[4/4] max-w-[168px] bg-white p-1.5"
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
                    : "object-cover grayscale-[25%] contrast-[1.02] group-hover:grayscale-0"
                )}
              />
            </div>
            <span className="mt-1 block font-mono text-[10.5px] leading-tight text-neutral-400 group-hover:text-neutral-700">
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
      <div className="mb-6 border-b border-neutral-200 pb-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Bio in Six Lines
          </h1>
          <span className="font-mono text-xs tabular-nums text-neutral-400">
            1988 — 2026 · 38 yrs
          </span>
        </div>
        <p className="mt-2 max-w-[680px] text-[13.5px] leading-relaxed text-neutral-600">
          Six parallel vertical lines trace thirty-eight years from the Adriatic
          coast to London —{" "}
          <span className="font-medium text-neutral-900">1 line</span> for
          activities &amp; achievements,{" "}
          <span className="font-medium text-neutral-900">2 lines</span> for
          overlapping places, and{" "}
          <span className="font-medium text-neutral-900">3 lines</span> for the
          people (and dog) along the way.
        </p>

        {/* Interactive line legend / filter */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedLine(null)}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors",
              selectedLine === null
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
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
                    ? "border-neutral-900 bg-neutral-950 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                )}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: line.color }}
                />
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
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-400"
            )}
          >
            Photos only
          </button>
        </div>
      </div>

      {/* DESKTOP STAVE (md and up): 3 synchronized columns with 1 + 2 + 3 vertical lines */}
      <div className="hidden md:block">
        {/* Sticky stave header aligned pixel-for-pixel with the 6 rails below */}
        <div className="sticky top-0 z-30 grid grid-cols-[56px_minmax(0,1.22fr)_minmax(0,1fr)_minmax(0,1.08fr)] gap-x-6 border-b border-neutral-200 bg-white/95 pt-3 pb-2.5 backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
            Year
          </div>

          {/* Column 1 Header (1 line) */}
          <div
            className="relative"
            style={{ paddingLeft: `${DESKTOP_RAILS.activities.paddingLeft}px` }}
          >
            <span
              aria-hidden="true"
              className="absolute bottom-[-11px] top-1 w-[2px] -translate-x-1/2"
              style={{
                left: `${DESKTOP_RAILS.activities.coords["act-1"]}px`,
                backgroundColor: LINE_MAP["act-1"].color,
              }}
            />
            <div className="text-xs font-semibold tracking-tight text-neutral-900">
              Activities &amp; Achievements
            </div>
            <div className="font-mono text-[10px] text-neutral-400">
              1 line · craft &amp; work
            </div>
          </div>

          {/* Column 2 Header (2 lines) */}
          <div
            className="relative"
            style={{ paddingLeft: `${DESKTOP_RAILS.places.paddingLeft}px` }}
          >
            {(["place-1", "place-2"] as LineId[]).map((id) => (
              <span
                key={id}
                aria-hidden="true"
                className="absolute bottom-[-11px] top-1 w-[2px] -translate-x-1/2"
                style={{
                  left: `${DESKTOP_RAILS.places.coords[id]}px`,
                  backgroundColor: LINE_MAP[id].color,
                }}
              />
            ))}
            <div className="text-xs font-semibold tracking-tight text-neutral-900">
              Places
            </div>
            <div className="font-mono text-[10px] text-neutral-400">
              2 lines · base &amp; stints
            </div>
          </div>

          {/* Column 3 Header (3 lines) */}
          <div
            className="relative"
            style={{ paddingLeft: `${DESKTOP_RAILS.people.paddingLeft}px` }}
          >
            {(["people-1", "people-2", "people-3"] as LineId[]).map((id) => (
              <span
                key={id}
                aria-hidden="true"
                className="absolute bottom-[-11px] top-1 w-[2px] -translate-x-1/2"
                style={{
                  left: `${DESKTOP_RAILS.people.coords[id]}px`,
                  backgroundColor: LINE_MAP[id].color,
                }}
              />
            ))}
            <div className="text-xs font-semibold tracking-tight text-neutral-900">
              People
            </div>
            <div className="font-mono text-[10px] text-neutral-400">
              3 lines · roots, builders, friends
            </div>
          </div>
        </div>

        {/* Chronological rows */}
        <div>
          {chaptersToRender.map((chapter, chapterIdx) => (
            <div
              key={chapter.year}
              className="group/row grid grid-cols-[56px_minmax(0,1.22fr)_minmax(0,1fr)_minmax(0,1.08fr)] gap-x-6 border-b border-neutral-100/90 last:border-b-0 hover:bg-neutral-50/50 transition-colors"
            >
              {/* Year column */}
              <div className="py-5 pr-2">
                <span className="sticky top-14 font-mono text-xs font-medium tabular-nums text-neutral-400 transition-colors group-hover/row:text-neutral-900">
                  {chapter.year}
                </span>
              </div>

              {/* Column 1: Activities & Achievements (1 vertical line) */}
              <div
                className="relative py-5 space-y-4"
                style={{
                  paddingLeft: `${DESKTOP_RAILS.activities.paddingLeft}px`,
                }}
              >
                {(() => {
                  const id: LineId = "act-1";
                  const active = isRailHighlighted(
                    id,
                    chapter.activeLines.includes(id)
                  );
                  return (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-[1px] top-0 z-10 -translate-x-1/2 transition-opacity duration-200"
                      style={{
                        left: `${DESKTOP_RAILS.activities.coords[id]}px`,
                        width: active ? "2px" : "1px",
                        backgroundColor: active
                          ? LINE_MAP[id].color
                          : "#e5e5e5",
                      }}
                    />
                  );
                })()}

                {chapter.activities.map((entry, idx) => {
                  const railX = DESKTOP_RAILS.activities.coords[entry.lineId];
                  const pad = DESKTOP_RAILS.activities.paddingLeft;
                  return (
                    <EntryBlock
                      key={`${chapter.year}-act-${idx}`}
                      entry={entry}
                      year={chapter.year}
                      railOffsetPx={railX - pad}
                      tickWidthPx={pad - railX - 6}
                      dimmed={isLineDimmed(entry.lineId, Boolean(entry.photo))}
                      eagerImage={chapterIdx === 0}
                      onOpenPhoto={setLightbox}
                    />
                  );
                })}
              </div>

              {/* Column 2: Places (2 parallel vertical lines) */}
              <div
                className="relative py-5 space-y-4"
                style={{ paddingLeft: `${DESKTOP_RAILS.places.paddingLeft}px` }}
              >
                {(["place-1", "place-2"] as LineId[]).map((id) => {
                  const active = isRailHighlighted(
                    id,
                    chapter.activeLines.includes(id)
                  );
                  return (
                    <span
                      key={id}
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-[1px] top-0 z-10 -translate-x-1/2 transition-opacity duration-200"
                      style={{
                        left: `${DESKTOP_RAILS.places.coords[id]}px`,
                        width: active ? "2px" : "1px",
                        backgroundColor: active
                          ? LINE_MAP[id].color
                          : "#ebebeb",
                      }}
                    />
                  );
                })}

                {chapter.places.map((entry, idx) => {
                  const railX = DESKTOP_RAILS.places.coords[entry.lineId];
                  const pad = DESKTOP_RAILS.places.paddingLeft;
                  return (
                    <EntryBlock
                      key={`${chapter.year}-place-${idx}`}
                      entry={entry}
                      year={chapter.year}
                      railOffsetPx={railX - pad}
                      tickWidthPx={pad - railX - 6}
                      dimmed={isLineDimmed(entry.lineId, Boolean(entry.photo))}
                      eagerImage={chapterIdx === 0}
                      onOpenPhoto={setLightbox}
                    />
                  );
                })}
              </div>

              {/* Column 3: People (3 parallel vertical lines) */}
              <div
                className="relative py-5 space-y-4"
                style={{ paddingLeft: `${DESKTOP_RAILS.people.paddingLeft}px` }}
              >
                {(["people-1", "people-2", "people-3"] as LineId[]).map(
                  (id) => {
                    const active = isRailHighlighted(
                      id,
                      chapter.activeLines.includes(id)
                    );
                    return (
                      <span
                        key={id}
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-[1px] top-0 z-10 -translate-x-1/2 transition-opacity duration-200"
                        style={{
                          left: `${DESKTOP_RAILS.people.coords[id]}px`,
                          width: active ? "2px" : "1px",
                          backgroundColor: active
                            ? LINE_MAP[id].color
                            : "#ebebeb",
                        }}
                      />
                    );
                  }
                )}

                {chapter.people.map((entry, idx) => {
                  const railX = DESKTOP_RAILS.people.coords[entry.lineId];
                  const pad = DESKTOP_RAILS.people.paddingLeft;
                  return (
                    <EntryBlock
                      key={`${chapter.year}-people-${idx}`}
                      entry={entry}
                      year={chapter.year}
                      railOffsetPx={railX - pad}
                      tickWidthPx={pad - railX - 6}
                      dimmed={isLineDimmed(entry.lineId, Boolean(entry.photo))}
                      onOpenPhoto={setLightbox}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* End-of-line 2026 terminal caps */}
        <div className="grid grid-cols-[56px_minmax(0,1.22fr)_minmax(0,1fr)_minmax(0,1.08fr)] gap-x-6 pt-1">
          <div className="font-mono text-[10px] text-neutral-300">→</div>
          <div
            className="relative h-3"
            style={{ paddingLeft: `${DESKTOP_RAILS.activities.paddingLeft}px` }}
          >
            <span
              aria-hidden="true"
              className="absolute top-0 h-2 w-2 -translate-x-1/2 rounded-full border-2 bg-white"
              style={{
                left: `${DESKTOP_RAILS.activities.coords["act-1"]}px`,
                borderColor: LINE_MAP["act-1"].color,
              }}
            />
          </div>
          <div
            className="relative h-3"
            style={{ paddingLeft: `${DESKTOP_RAILS.places.paddingLeft}px` }}
          >
            {(["place-1", "place-2"] as LineId[]).map((id) => (
              <span
                key={id}
                aria-hidden="true"
                className="absolute top-0 h-2 w-2 -translate-x-1/2 rounded-full border-2 bg-white"
                style={{
                  left: `${DESKTOP_RAILS.places.coords[id]}px`,
                  borderColor: LINE_MAP[id].color,
                }}
              />
            ))}
          </div>
          <div
            className="relative h-3"
            style={{ paddingLeft: `${DESKTOP_RAILS.people.paddingLeft}px` }}
          >
            {(["people-1", "people-2", "people-3"] as LineId[]).map((id) => (
              <span
                key={id}
                aria-hidden="true"
                className="absolute top-0 h-2 w-2 -translate-x-1/2 rounded-full border-2 bg-white"
                style={{
                  left: `${DESKTOP_RAILS.people.coords[id]}px`,
                  borderColor: LINE_MAP[id].color,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE STAVE (< md): All 6 grouped vertical lines on the left margin */}
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
              {/* All 6 continuous vertical lines in the left gutter */}
              {BIO_LINES.map((line) => {
                const active = isRailHighlighted(
                  line.id,
                  chapter.activeLines.includes(line.id)
                );
                return (
                  <span
                    key={line.id}
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 top-0 -translate-x-1/2"
                    style={{
                      left: `${MOBILE_RAIL_X[line.id]}px`,
                      width: active ? "2px" : "1px",
                      backgroundColor: active ? line.color : "#ebebeb",
                    }}
                  />
                );
              })}

              <div className="mb-2.5 font-mono text-xs font-semibold tabular-nums text-neutral-900">
                {chapter.year}
              </div>

              <div className="space-y-4">
                {combined.map((entry, idx) => {
                  const railX = MOBILE_RAIL_X[entry.lineId];
                  return (
                    <EntryBlock
                      key={`mob-${chapter.year}-${idx}`}
                      entry={entry}
                      year={chapter.year}
                      railOffsetPx={railX - MOBILE_PADDING_LEFT}
                      tickWidthPx={MOBILE_PADDING_LEFT - railX - 8}
                      dimmed={isLineDimmed(entry.lineId, Boolean(entry.photo))}
                      eagerImage={chapterIdx === 0}
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
          className="relative h-3"
          style={{ paddingLeft: `${MOBILE_PADDING_LEFT}px` }}
        >
          {BIO_LINES.map((line) => (
            <span
              key={`mob-cap-${line.id}`}
              aria-hidden="true"
              className="absolute top-0 h-2 w-2 -translate-x-1/2 rounded-full border-2 bg-white"
              style={{
                left: `${MOBILE_RAIL_X[line.id]}px`,
                borderColor: line.color,
              }}
            />
          ))}
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
          <div className="relative z-10 w-full max-w-[640px] rounded bg-white p-3 shadow-2xl">
            <div className="overflow-hidden rounded-[2px] bg-neutral-100">
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
                  <span className="font-mono text-xs font-medium text-neutral-900">
                    {lightbox.year} · {lightbox.title}
                  </span>
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-neutral-500">
                  {lightbox.photo.caption}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="shrink-0 rounded border border-neutral-200 px-2 py-0.5 font-mono text-[11px] text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
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
