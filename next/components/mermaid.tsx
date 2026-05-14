'use client';

import { useEffect, useId, useRef } from 'react';

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { default: mermaid } = await import('mermaid');
      if (cancelled) return;
      mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' });
      try {
        const { svg } = await mermaid.render(`m-${id}`, chart);
        if (cancelled || !ref.current) return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');
        const node = doc.documentElement;
        ref.current.replaceChildren(node);
      } catch (err) {
        if (cancelled || !ref.current) return;
        const pre = document.createElement('pre');
        pre.textContent = `Mermaid render error: ${String(err)}`;
        ref.current.replaceChildren(pre);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return <div ref={ref} className="my-4 flex justify-center" />;
}
