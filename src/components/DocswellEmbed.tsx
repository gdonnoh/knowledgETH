'use client';

import { useEffect, useRef } from 'react';

interface DocswellEmbedProps {
  src: string;
  aspect?: string;
  linkUrl?: string;
  linkText?: string;
}

export function DocswellEmbed({ 
  src, 
  aspect = '0.5625',
  linkUrl,
  linkText 
}: DocswellEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const embedScriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Carica lo script principale di Docswell solo una volta
    const loadMainScript = () => {
      const existingMainScript = document.querySelector('script[src*="docswell-embed.min.js"]');
      if (existingMainScript) return Promise.resolve();

      return new Promise<void>((resolve) => {
        const mainScript = document.createElement('script');
        mainScript.src = 'https://www.docswell.com/assets/libs/docswell-embed/docswell-embed.min.js';
        mainScript.async = true;
        mainScript.onload = () => resolve();
        mainScript.onerror = () => resolve(); // Continua anche se fallisce
        document.head.appendChild(mainScript);
      });
    };

    // Crea lo script tag per questo embed specifico
    const createEmbedScript = () => {
      if (embedScriptRef.current) return; // Già creato

      const embedScript = document.createElement('script');
      embedScript.className = 'docswell-embed';
      embedScript.setAttribute('data-src', src);
      embedScript.setAttribute('data-aspect', aspect);
      embedScript.async = true;
      
      container.appendChild(embedScript);
      embedScriptRef.current = embedScript;
    };

    // Carica lo script principale e poi crea l'embed
    loadMainScript().then(() => {
      createEmbedScript();
    });

    return () => {
      // Cleanup
      const currentEmbedScript = embedScriptRef.current;
      if (currentEmbedScript && container.contains(currentEmbedScript)) {
        container.removeChild(currentEmbedScript);
      }
    };
  }, [src, aspect]);

  return (
    <div ref={containerRef} className="my-6">
      {linkUrl && linkText && (
        <div className="docswell-link mt-2">
          <a 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            {linkText}
          </a>
        </div>
      )}
    </div>
  );
}
