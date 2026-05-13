import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = SITE.ogImageAlt;

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
          background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0c4a6e 100%)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, Inter, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              fontWeight: 800,
              color: '#0c4a6e',
            }}
          >
            AI
          </div>
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, textAlign: 'center', lineHeight: 1.1 }}>
          {SITE.name}
        </div>
        <div
          style={{
            fontSize: 30,
            color: '#cbd5e1',
            marginTop: 24,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
