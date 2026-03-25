"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const MAX_W = 600;
/** Polymarket’s default embed is 600×300; narrow widths must not use proportional height or the chart collapses (~160px). */
const ASPECT = 300 / 600;
const MIN_H_NARROW = 360;
const NARROW_MAX_W = 520;

type Props = {
  market: string;
  eventUrl: string;
  title: string;
  srCaption: string;
  srDetails?: string;
  theme?: "dark" | "light";
};

export function PolymarketEmbed({
  market,
  eventUrl,
  title,
  srCaption,
  srDetails,
  theme = "dark",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const wRaw = el.getBoundingClientRect().width;
      const w = Math.min(
        MAX_W,
        Math.max(260, Math.floor(wRaw > 0 ? wRaw : MAX_W))
      );
      const proportional = Math.round(w * ASPECT);
      const h =
        w <= NARROW_MAX_W
          ? Math.max(proportional, MIN_H_NARROW)
          : proportional;
      setDims((prev) =>
        prev && prev.w === w && prev.h === h ? prev : { w, h }
      );
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounted]);

  const ready = mounted && dims !== null;
  const src =
    ready &&
    `https://embed.polymarket.com/market?market=${encodeURIComponent(
      market
    )}&theme=${theme}&liveactivity=true&border=true&width=${dims.w}&height=${dims.h}`;

  return (
    <figure
      className="not-prose my-8 mx-auto block w-full max-w-[600px]"
      aria-label={srCaption}
    >
      <div ref={containerRef} className="relative w-full">
        {ready && src && dims ? (
          <>
            <iframe
              title={title}
              src={src}
              width={dims.w}
              height={dims.h}
              className="block max-w-full border-0"
              style={{ width: dims.w, height: dims.h, maxWidth: "100%" }}
              frameBorder={0}
              loading="eager"
              allow="clipboard-write; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <a
              href={eventUrl}
              aria-label="View on Polymarket"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute z-10"
              style={{
                top: "5.33%",
                right: "3.33%",
                width: "20%",
                height: "8%",
              }}
            />
          </>
        ) : (
          <div
            className="h-[360px] w-full rounded-md border border-white/10 bg-white/[0.04]"
            aria-hidden
          />
        )}
      </div>
      {ready && (
        <figcaption className="sr-only">
          <strong>{srCaption}</strong>
          {srDetails != null && srDetails !== "" && (
            <>
              <br />
              {srDetails}
            </>
          )}
          <br />
          <a href={eventUrl}>View full market on Polymarket</a>
        </figcaption>
      )}
    </figure>
  );
}
