"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const MAX_W = 600;
const ASPECT = 300 / 600;

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
      const h = Math.round(w * ASPECT);
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
              className="block border-0"
              style={{ width: dims.w, height: dims.h, maxWidth: "100%" }}
              frameBorder={0}
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
            className="aspect-[2/1] w-full rounded-md border border-white/10 bg-white/[0.04]"
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
