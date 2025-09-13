"use client";

type Props = { url: string; title: string };

export function TwitterShare({ url, title }: Props) {
  const text = `check this articles about ${title}`;
  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center rounded bg-foreground text-background px-4 py-2 hover:opacity-90"
    >
      Share on X
    </a>
  );
}

