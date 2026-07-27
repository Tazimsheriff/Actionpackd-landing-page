import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion'

export const PartnerProgramVideo = ({
  activeTab = 'overview',
  customHandle = 'alex-growth',
  copied = false,
  payoutClaimed = false
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Remotion Frame Interpolations for Realistic Dashboard Telemetry
  // 1. Animated Typewriter for Referral Link Handle
  const defaultHandle = "alex-growth"
  const typedLength = Math.floor(interpolate(frame, [10, 45], [0, defaultHandle.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))
  const animatedHandleText = customHandle !== 'alex-growth' ? customHandle : defaultHandle.substring(0, typedLength)

  // 2. Click Counter Ramping up (12 -> 2,840)
  const clickCount = Math.floor(interpolate(frame, [20, 90], [12, 2840], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))

  // 3. Client Signups Pop-in Spring Physics
  const client1Scale = frame >= 85 ? spring({ frame: frame - 85, fps, config: { damping: 10, mass: 0.4 } }) : 0
  const client2Scale = frame >= 120 ? spring({ frame: frame - 120, fps, config: { damping: 10, mass: 0.4 } }) : 0

  // 4. Monthly Commission Payout Ramping ($0 -> $3,840)
  const payoutAmount = Math.floor(interpolate(frame, [85, 170], [0, 3840], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))

  // 5. Tier Level Upgrade Spring
  const tierUpgradeScale = frame >= 240 ? spring({ frame: frame - 240, fps, config: { damping: 8, mass: 0.5 } }) : 0

  // 6. SVG Dynamic Smooth Area Chart Points
  const chartProgress = interpolate(frame, [30, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Active Tab driven by timeline or props
  const currentTab = frame > 260 ? 'payouts' : (frame > 160 ? 'referrals' : (frame > 80 ? 'links' : activeTab))

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFFFFF',
        padding: 0,
        fontFamily: 'Inter, sans-serif',
        color: '#090A0F',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 20px 40px -15px rgba(9, 10, 15, 0.08)'
      }}
    >
      {/* MAC OS REALISTIC BROWSER NAVBAR */}
      <div style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '10px 18px', display: 'flex', alignItems: 'center', justify: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF003C' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div style={{ height: 14, width: 1, background: '#CBD5E1', margin: '0 4px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '3px 12px', borderRadius: 999, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#64748B' }}>
            <span style={{ color: '#FF003C', fontWeight: 800 }}>🔒 https://</span>
            <span style={{ color: '#090A0F', fontWeight: 700 }}>act.pk/partners/dashboard</span>
          </div>
        </div>

        {/* TOP STATUS BADGE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '3px 10px', borderRadius: 999, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#166534', fontWeight: 800 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#25D366' }} />
            <span>LIVE STRIPE CONNECT</span>
          </div>
          <div style={{ transform: `scale(${tierUpgradeScale > 0 ? tierUpgradeScale : 1})`, transition: 'transform 0.3s' }}>
            <span style={{ background: frame >= 240 ? '#FF003C' : '#090A0F', color: '#FFFFFF', padding: '3px 10px', borderRadius: 999, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
              {frame >= 240 ? '👑 AGENCY TIER (30%)' : '⚡ CREATOR (20%)'}
            </span>
          </div>
        </div>
      </div>

      {/* DASHBOARD HEADER & TABS */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '12px 24px', display: 'flex', alignItems: 'center', justify: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: '#090A0F', color: '#FF003C', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 900, fontSize: 16 }}>
            📊
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 15, color: '#090A0F', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>Actionpackd Partner Portal</span>
              <span style={{ fontSize: 9, background: '#FF003C', color: '#FFF', padding: '1px 6px', borderRadius: 4, fontFamily: 'JetBrains Mono, monospace' }}>v2.4</span>
            </div>
            <div style={{ fontSize: 11, color: '#64748B' }}>First-Party Attribution & Lifetime 30% Recurring Engine</div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div style={{ display: 'flex', gap: 4, background: '#F1F5F9', padding: 4, borderRadius: 12 }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'links', label: 'Link Generator' },
            { id: 'referrals', label: 'Referred Signups' },
            { id: 'payouts', label: 'Global Payouts' }
          ].map(tab => (
            <div
              key={tab.id}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 11,
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                background: currentTab === tab.id ? '#FFFFFF' : 'transparent',
                color: currentTab === tab.id ? '#FF003C' : '#64748B',
                boxShadow: currentTab === tab.id ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* DASHBOARD BODY CANVAS (LIGHT MODE SURFACE) */}
      <div style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 20, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        
        {/* TOP ROW: SHORT LINK BUILDER BAR */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', justify: 'space-between', gap: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>
              YOUR FIRST-PARTY BRANDED SHORT DOMAIN
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: 10, padding: '6px 12px' }}>
              <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#94A3B8' }}>https://act.pk/</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, fontSize: 13, color: '#FF003C' }}>
                {animatedHandleText}
              </span>
              <span style={{ opacity: Math.sin(frame / 3) > 0 ? 1 : 0, color: '#FF003C' }}>|</span>
              <span style={{ fontSize: 9, background: '#FF003C', color: '#FFF', padding: '2px 6px', borderRadius: 4, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', marginLeft: 'auto' }}>
                60D COOKIE
              </span>
            </div>
          </div>

          <div
            style={{
              background: (copied || frame > 300) ? '#10B981' : '#090A0F',
              color: '#FFFFFF',
              borderRadius: 10,
              padding: '10px 18px',
              fontSize: 11,
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 12px rgba(9,10,15,0.15)',
              whiteSpace: 'nowrap'
            }}
          >
            {(copied || frame > 300) ? '✓ COPIED LINK' : 'COPY SHORT LINK'}
          </div>
        </div>

        {/* MIDDLE ROW: 3 KEY METRICS CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          
          {/* METRIC 1: CLICKS */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', justify: 'space-between', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>ATTRIBUTED CLICKS</span>
              <span style={{ fontSize: 14 }}>📈</span>
            </div>
            <div style={{ fontSize: 28, fontFamily: 'Outfit, sans-serif', fontWeight: 900, color: '#090A0F', marginTop: 8 }}>
              {clickCount.toLocaleString()}
            </div>
            <div style={{ fontSize: 10, color: '#10B981', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, marginTop: 4 }}>
              ● 100% First-Party Verified
            </div>
          </div>

          {/* METRIC 2: RECURRING COMMISSION */}
          <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #FF003C', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', justify: 'space-between', boxShadow: '0 4px 16px rgba(255,0,60,0.12)' }}>
            <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>YOUR MONTHLY RECURRING</span>
              <span style={{ fontSize: 9, background: '#FF003C', color: '#FFF', padding: '2px 6px', borderRadius: 999, fontWeight: 800 }}>30% SHARE</span>
            </div>
            <div style={{ fontSize: 28, fontFamily: 'Outfit, sans-serif', fontWeight: 900, color: '#FF003C', marginTop: 8 }}>
              ${payoutAmount.toLocaleString()} <span style={{ fontSize: 12, color: '#64748B', fontWeight: 400 }}>/ mo</span>
            </div>
            <div style={{ fontSize: 10, color: '#FF003C', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginTop: 4 }}>
              ⚡ Lifetime Auto-Credit
            </div>
          </div>

          {/* METRIC 3: PENDING PAYOUT */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', justify: 'space-between', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>DISBURSABLE BALANCE</span>
              <span style={{ fontSize: 14 }}>💳</span>
            </div>
            <div style={{ fontSize: 28, fontFamily: 'Outfit, sans-serif', fontWeight: 900, color: '#090A0F', marginTop: 8 }}>
              ${(payoutAmount + 500).toLocaleString()}.00
            </div>
            <div
              style={{
                marginTop: 6,
                background: (payoutClaimed || frame > 260) ? '#10B981' : '#FF003C',
                color: '#FFFFFF',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 10,
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800,
                textTransform: 'uppercase',
                textAlign: 'center'
              }}
            >
              {(payoutClaimed || frame > 260) ? '✓ INSTANT PAYOUT DISBURSED' : 'AUTO PAYOUT ON 1ST →'}
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: REALISTIC REFERRED CLIENT FEED & REVENUE CHART */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14, flex: 1 }}>
          
          {/* REALISTIC REFERRED CUSTOMERS TABLE */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#090A0F' }}>RECENT REFERRED ACCOUNTS</span>
                <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#10B981', fontWeight: 700 }}>● Live Sync</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* CLIENT 1 */}
                <div style={{ transform: `scale(${client1Scale})`, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', justify: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FF003C', color: '#FFF', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 800, fontSize: 11 }}>
                      A
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#090A0F', fontFamily: 'Outfit, sans-serif' }}>Acme SaaS (Ref: alex-growth)</div>
                      <div style={{ fontSize: 9, color: '#64748B', fontFamily: 'JetBrains Mono, monospace' }}>Plan: Pro ($99/mo) · Auto-Credited</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#FF003C' }}>+$29.70/mo</div>
                    <div style={{ fontSize: 8, color: '#10B981', fontWeight: 800 }}>ACTIVE ●</div>
                  </div>
                </div>

                {/* CLIENT 2 */}
                <div style={{ transform: `scale(${client2Scale})`, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', justify: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#090A0F', color: '#FFF', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 800, fontSize: 11 }}>
                      N
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#090A0F', fontFamily: 'Outfit, sans-serif' }}>Nexus Enterprise Suite</div>
                      <div style={{ fontSize: 9, color: '#64748B', fontFamily: 'JetBrains Mono, monospace' }}>Plan: Enterprise ($999/mo)</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#FF003C' }}>+$299.70/mo</div>
                    <div style={{ fontSize: 8, color: '#10B981', fontWeight: 800 }}>ACTIVE ●</div>
                  </div>
                </div>

                {/* 2-TIER SUB-PARTNER BONUS OVERRIDE */}
                <div style={{ background: '#FFF5F5', border: '1px solid #FECDD3', borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', justify: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FF003C', color: '#FFF', display: 'flex', alignItems: 'center', justify: 'center', fontSize: 12 }}>
                      👑
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#090A0F', fontFamily: 'Outfit, sans-serif' }}>2-Tier Sub-Partner Referral Override</div>
                      <div style={{ fontSize: 9, color: '#E11D48', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>Sophia L. (Generated $10k MRR)</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>
                    <div style={{ fontSize: 12, fontWeight: 900, color: '#10B981' }}>+$500.00/mo</div>
                    <div style={{ fontSize: 8, color: '#64748B' }}>+5% Bonus</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* REALISTIC VECTOR REVENUE GROWTH SVG GRAPH */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
            <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', fontSize: 11, fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#090A0F' }}>
              <span>REVENUE GROWTH TRAJECTORY</span>
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#FF003C', background: '#FFF1F2', padding: '2px 8px', borderRadius: 999 }}>+340% YOY</span>
            </div>

            <div style={{ position: 'relative', height: 100, marginTop: 10 }}>
              <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradientRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF003C" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FF003C" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 Q50,75 100,50 T200,30 T300,10 L300,100 L0,100 Z"
                  fill="url(#gradientRed)"
                />
                <path
                  d="M0,80 Q50,75 100,50 T200,30 T300,10"
                  fill="none"
                  stroke="#FF003C"
                  strokeWidth="3"
                  strokeDasharray="400"
                  strokeDashoffset={400 * (1 - chartProgress)}
                />
              </svg>
            </div>

            <div style={{ display: 'flex', justify: 'space-between', fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#94A3B8', borderTop: '1px solid #F1F5F9', paddingTop: 8 }}>
              <span>JAN</span>
              <span>MAR</span>
              <span>MAY</span>
              <span>JUL</span>
              <span>SEP</span>
              <span style={{ color: '#FF003C', fontWeight: 800 }}>NOW</span>
            </div>
          </div>

        </div>

      </div>

    </AbsoluteFill>
  )
}

export default PartnerProgramVideo
