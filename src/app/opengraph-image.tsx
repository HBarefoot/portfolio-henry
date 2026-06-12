import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export const alt = 'Henry Barefoot — Senior Full-Stack Engineer · Next.js · Node.js · AI Infra';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#000000',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top row: brand mark + tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 22,
              letterSpacing: '0.04em',
              color: '#A1A1AA',
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                background: '#7C5CFF',
                borderRadius: 3,
              }}
            />
            <span style={{ fontWeight: 600, color: '#ffffff' }}>BAREFOOT</span>
            <span style={{ color: '#A1A1AA' }}>DIGITAL</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              border: '1px solid #00FFA3',
              color: '#00FFA3',
              borderRadius: 4,
              fontSize: 14,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: '#00FFA3',
                boxShadow: '0 0 8px #00FFA3',
              }}
            />
            Available for senior roles
          </div>
        </div>

        {/* Middle: headline + sub */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 1000 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            Engineering that ships
            <br />
            <span style={{ color: '#00FFA3' }}>$500K+ of measured impact.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.3,
              color: '#A1A1AA',
              maxWidth: 920,
            }}
          >
            Senior full-stack engineer · Next.js · Node.js · AI infrastructure.
            <br />
            6 years shipping production systems. 95% efficiency gains. Days to minutes.
          </div>
        </div>

        {/* Bottom row: proof points */}
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { label: 'PIPELINE EFFICIENCY', value: '95%' },
            { label: 'OPS TIME ELIMINATED', value: '40+ hrs/mo' },
            { label: 'QUOTE TURNAROUND', value: '3d → 4h' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                padding: '20px 28px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                background: '#0A0A0A',
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: '0.14em',
                  color: '#A1A1AA',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 700,
                  color: '#7C5CFF',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
