import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence } from 'remotion'

// ===================== SCENE 1: SELECT BOT TEMPLATE (Sequence 0-75) =====================
const Scene1SelectTemplate = () => {
  const frame = useCurrentFrame() // frame starts at 0 inside Sequence
  const { fps } = useVideoConfig()

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })
  const titleY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' })

  const cursorX = interpolate(frame, [15, 40], [520, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const cursorY = interpolate(frame, [15, 40], [420, 250], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const isClicked = frame >= 40

  const cardScale = isClicked
    ? spring({ frame: frame - 40, fps, config: { damping: 10, mass: 0.5, stiffness: 150 } })
    : 1

  return (
    <AbsoluteFill style={{
      backgroundColor: '#EFEAE2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'center',
      color: '#111B21',
      fontFamily: 'Outfit, sans-serif',
      padding: 40,
      backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px)',
      backgroundSize: '20px 20px'
    }}>
      
      {/* AMBIENT GREEN GLOW */}
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,211,102,0.2) 0%, rgba(0,168,132,0.1) 50%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* HEADER */}
      <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: 'center', marginBottom: 30, zIndex: 10 }}>
        <div style={{ background: '#E8F5E9', border: '1px solid #25D366', padding: '6px 16px', borderRadius: 999, color: '#008069', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.1em', display: 'inline-block', marginBottom: 12 }}>
          STEP 01 · CHOOSE TEMPLATE
        </div>
        <h2 style={{ fontSize: 44, fontWeight: 900, margin: 0, color: '#111B21' }}>
          Select a Pre-Built <span style={{ color: '#008069' }}>WhatsApp Bot</span>
        </h2>
      </div>

      {/* TEMPLATE CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, width: 880, zIndex: 10 }}>
        
        {/* CARD 1 (CLICKED) */}
        <div style={{ transform: `scale(${isClicked ? 1.05 : 1})`, background: '#FFFFFF', border: isClicked ? '2.5px solid #25D366' : '1px solid #E2E8F0', borderRadius: 20, padding: 24, boxShadow: isClicked ? '0 10px 30px rgba(37, 211, 102, 0.3)' : '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🎯</span>
            <span style={{ background: '#E8F5E9', color: '#008069', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>READY ●</span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px 0', color: '#111B21' }}>Lead Qualification Bot</h3>
          <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px 0', lineHeight: 1.4 }}>Qualify leads 24/7 on WhatsApp & sync directly to CRM.</p>
          <div style={{ background: isClicked ? '#00A884' : '#F1F5F9', color: isClicked ? '#FFFFFF' : '#64748B', textAlign: 'center', padding: '10px 0', borderRadius: 12, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {isClicked ? '✓ SELECTED' : 'Use Template'}
          </div>
        </div>

        {/* CARD 2 */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 24, opacity: 0.85, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🎧</span>
            <span style={{ background: '#F1F5F9', color: '#64748B', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>READY</span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px 0', color: '#111B21' }}>Customer Support Bot</h3>
          <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px 0', lineHeight: 1.4 }}>Auto-resolve FAQs and order tracking inquiries.</p>
          <div style={{ background: '#F1F5F9', color: '#64748B', textAlign: 'center', padding: '10px 0', borderRadius: 12, fontSize: 13, fontWeight: 800 }}>Use Template</div>
        </div>

        {/* CARD 3 */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 24, opacity: 0.85, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>📅</span>
            <span style={{ background: '#F1F5F9', color: '#64748B', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>READY</span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px 0', color: '#111B21' }}>Appointment Booking</h3>
          <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px 0', lineHeight: 1.4 }}>Book calendar meetings via WhatsApp chat flows.</p>
          <div style={{ background: '#F1F5F9', color: '#64748B', textAlign: 'center', padding: '10px 0', borderRadius: 12, fontSize: 13, fontWeight: 800 }}>Use Template</div>
        </div>

      </div>

      {/* MOUSE CURSOR */}
      <div style={{ position: 'absolute', left: cursorX, top: cursorY, zIndex: 100, pointerEvents: 'none' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF003C" stroke="#FFFFFF" strokeWidth="2">
          <path d="M3 3l7 18 3-7 7-3L3 3z" />
        </svg>
      </div>

    </AbsoluteFill>
  )
}

// ===================== SCENE 2: CONNECT WHATSAPP BUSINESS API (Sequence 75-150) =====================
const Scene2ConnectWhatsApp = () => {
  const frame = useCurrentFrame() // frame starts at 0 inside Sequence!
  const { fps } = useVideoConfig()

  const modalScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 120 }
  })

  // Simulated typing phone number
  const fullText = "+1 (555) 019-2834"
  const typedLength = Math.min(fullText.length, Math.max(1, Math.floor(interpolate(frame, [5, 35], [1, fullText.length]))))
  const currentTyped = fullText.substring(0, typedLength)

  // Meta verified badge pop up
  const isVerified = frame >= 35
  const checkScale = isVerified
    ? spring({ frame: frame - 35, fps, config: { damping: 10, mass: 0.5, stiffness: 160 } })
    : 0

  return (
    <AbsoluteFill style={{
      backgroundColor: '#EFEAE2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'center',
      color: '#111B21',
      fontFamily: 'Outfit, sans-serif',
      padding: 40,
      backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px)',
      backgroundSize: '20px 20px'
    }}>
      
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,211,102,0.25) 0%, rgba(0,168,132,0.15) 50%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 24, zIndex: 10 }}>
        <div style={{ background: '#E8F5E9', border: '1px solid #25D366', padding: '6px 16px', borderRadius: 999, color: '#008069', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.1em', display: 'inline-block', marginBottom: 12 }}>
          STEP 02 · LINK WHATSAPP NUMBER
        </div>
        <h2 style={{ fontSize: 44, fontWeight: 900, margin: 0, color: '#111B21' }}>
          Connect <span style={{ color: '#008069' }}>WhatsApp Business API</span>
        </h2>
      </div>

      {/* WHATSAPP LIGHT MODE MODAL WINDOW */}
      <div style={{ transform: `scale(${modalScale})`, width: 660, background: '#FFFFFF', border: '2px solid #25D366', borderRadius: 24, padding: 32, boxShadow: '0 20px 50px rgba(0,0,0,0.08), 0 0 30px rgba(37, 211, 102, 0.2)', zIndex: 10 }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: '0 4px 12px rgba(37,211,102,0.3)' }}>
            💬
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#111B21' }}>Meta Cloud API Integration</div>
            <div style={{ fontSize: 13, color: '#008069', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>Actionpackd Official Business Partner</div>
          </div>
        </div>

        {/* INPUT FIELD */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#64748B', marginBottom: 8, textTransform: 'uppercase', fontWeight: 700 }}>
            WhatsApp Phone Number
          </label>
          <div style={{ background: '#F0F2F5', border: '1.5px solid #CBD5E1', borderRadius: 14, padding: '14px 18px', fontSize: 20, fontFamily: 'JetBrains Mono, monospace', color: '#111B21', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}>
            <span>{currentTyped}<span style={{ opacity: Math.sin(frame / 3) > 0 ? 1 : 0, color: '#008069', fontWeight: 800 }}>|</span></span>
            {isVerified && (
              <span style={{ transform: `scale(${checkScale})`, background: '#25D366', color: '#FFFFFF', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, boxShadow: '0 2px 6px rgba(37,211,102,0.3)' }}>
                ✓ VERIFIED
              </span>
            )}
          </div>
        </div>

        {/* VERIFICATION BADGE */}
        {isVerified ? (
          <div style={{ background: '#E8F5E9', border: '1.5px solid #25D366', borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>✅</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#008069' }}>Meta Business Verification Active</div>
              <div style={{ fontSize: 13, color: '#334155' }}>WhatsApp Bot linked & ready for instant messaging.</div>
            </div>
          </div>
        ) : (
          <div style={{ background: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20, color: '#64748B' }}>⏳</span>
            <div style={{ fontSize: 13, color: '#64748B', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>Validating Meta Business credentials...</div>
          </div>
        )}

      </div>

    </AbsoluteFill>
  )
}

// ===================== SCENE 3: TEST & DEPLOY WHATSAPP BOT (Sequence 150-225) =====================
const Scene3TestBot = () => {
  const frame = useCurrentFrame() // frame starts at 0 inside Sequence!
  const { fps } = useVideoConfig()

  const chatScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 120 }
  })

  // User msg opacity & position
  const msg1Opacity = interpolate(frame, [5, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const msg1Y = interpolate(frame, [5, 18], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Bot typing state (frames 18 to 32)
  const isTyping = frame >= 18 && frame < 32

  // Bot msg opacity & position (from frame 32 onwards)
  const msg2Visible = frame >= 32
  const msg2Opacity = interpolate(frame, [32, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const msg2Y = interpolate(frame, [32, 45], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{
      backgroundColor: '#EFEAE2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'center',
      color: '#111B21',
      fontFamily: 'Outfit, sans-serif',
      padding: 40,
      backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px)',
      backgroundSize: '20px 20px'
    }}>
      
      <div style={{ position: 'absolute', width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,211,102,0.25) 0%, rgba(0,168,132,0.15) 50%, transparent 70%)', filter: 'blur(90px)' }} />

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 20, zIndex: 10 }}>
        <div style={{ background: '#E8F5E9', border: '1px solid #25D366', padding: '6px 16px', borderRadius: 999, color: '#008069', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.1em', display: 'inline-block', marginBottom: 12 }}>
          STEP 03 · LIVE AI BOT REPLIES
        </div>
        <h2 style={{ fontSize: 44, fontWeight: 900, margin: 0, color: '#111B21' }}>
          Your <span style={{ color: '#008069' }}>AI Bot</span> Replying Messages Live
        </h2>
      </div>

      {/* WHATSAPP LIGHT MODE CHAT PHONE MOCKUP */}
      <div style={{ transform: `scale(${chatScale})`, width: 700, background: '#EFEAE2', border: '2px solid #25D366', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.12), 0 0 30px rgba(37, 211, 102, 0.2)', zIndex: 10 }}>
        
        {/* WHATSAPP TOP BAR (LIGHT MODE) */}
        <div style={{ background: '#F0F2F5', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #D1D7DB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#FFFFFF', border: '2px solid #25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <img src="/assets/logo_mascot.png" alt="Mascot" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#111B21' }}>Lead Qualification Bot</div>
              <div style={{ fontSize: 12, color: '#008069', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>● online · Actionpackd AI</div>
            </div>
          </div>
          <div style={{ background: '#25D366', color: '#FFFFFF', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, boxShadow: '0 2px 6px rgba(37,211,102,0.3)' }}>
            LIVE
          </div>
        </div>

        {/* CHAT MESSAGES BODY (LIGHT MODE) */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 230, background: '#EFEAE2', backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px)', backgroundSize: '20px 20px' }}>
          
          {/* USER MESSAGE (LEFT - PURE WHITE) */}
          <div style={{ opacity: msg1Opacity, transform: `translateY(${msg1Y}px)`, alignSelf: 'flex-start', background: '#FFFFFF', color: '#111B21', padding: '14px 18px', borderRadius: '0px 14px 14px 14px', maxWidth: '78%', fontSize: 15, fontFamily: 'Inter, sans-serif', boxShadow: '0 1px 2px rgba(11,20,26,0.13)' }}>
            "Hi! I want to book a product demo for our team."
            <span style={{ fontSize: 11, color: '#667781', marginLeft: 10, fontFamily: 'JetBrains Mono, monospace' }}>10:42 AM</span>
          </div>

          {/* BOT TYPING INDICATOR */}
          {isTyping && (
            <div style={{ alignSelf: 'flex-end', background: '#D9FDD3', color: '#075E54', padding: '12px 18px', borderRadius: '14px 0px 14px 14px', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              Actionpackd AI is typing... ⚡ 0.38s
            </div>
          )}

          {/* BOT RESPONSE (RIGHT - LIGHT GREEN #D9FDD3) */}
          {msg2Visible && (
            <div style={{ opacity: msg2Opacity, transform: `translateY(${msg2Y}px)`, alignSelf: 'flex-end', background: '#D9FDD3', color: '#111B21', padding: '16px 20px', borderRadius: '14px 0px 14px 14px', maxWidth: '88%', fontSize: 15, fontFamily: 'Inter, sans-serif', border: '1px solid #B4E6B0', boxShadow: '0 2px 8px rgba(11,20,26,0.12)' }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#008069', marginBottom: 6, fontWeight: 800 }}>
                ⚡ ACTIONPACKD AI AGENT · CONFIDENCE 99.4%
              </div>
              "Great! I can qualify your team & schedule a demo call. What date & time works best for you?"
              <div style={{ fontSize: 11, color: '#667781', marginTop: 6, textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>
                10:42 AM <span style={{ color: '#53BDEB', fontWeight: 900 }}>✓✓</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </AbsoluteFill>
  )
}

// ===================== SCENE 4: CTA OUTRO (Sequence 225-300) =====================
const Scene4Outro = () => {
  const frame = useCurrentFrame() // frame starts at 0 inside Sequence!
  const { fps } = useVideoConfig()

  const buttonScale = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.6, stiffness: 140 }
  })

  return (
    <AbsoluteFill style={{
      backgroundColor: '#EFEAE2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'center',
      color: '#111B21',
      fontFamily: 'Outfit, sans-serif',
      backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px)',
      backgroundSize: '20px 20px'
    }}>
      
      {/* BURSTING WHATSAPP GREEN ENERGY */}
      <div style={{ position: 'absolute', width: 750, height: 750, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,211,102,0.3) 0%, rgba(0,168,132,0.1) 50%, transparent 70%)', filter: 'blur(90px)', transform: `scale(${1 + Math.sin(frame / 8) * 0.15})` }} />

      <div style={{ zIndex: 10, textAlign: 'center' }}>
        <div style={{ background: '#E8F5E9', border: '1px solid #25D366', padding: '6px 16px', borderRadius: 999, color: '#008069', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.1em', display: 'inline-block', marginBottom: 16 }}>
          ⚡ LAUNCH IN 60 SECONDS
        </div>

        <h2 style={{ fontSize: 54, fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 16px 0', color: '#111B21' }}>
          Build Your <span style={{ color: '#008069' }}>WhatsApp Bot</span> Today.
        </h2>
        <p style={{ fontSize: 20, color: '#64748B', margin: '0 0 36px 0', fontFamily: 'Inter, sans-serif' }}>
          Choose a template · Link Meta API · Start converting leads 24/7
        </p>

        <div style={{ transform: `scale(${buttonScale})`, display: 'inline-block' }}>
          <div style={{ background: 'linear-gradient(135deg, #00A884 0%, #008069 100%)', padding: '20px 48px', borderRadius: 999, color: '#FFFFFF', fontSize: 22, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 12px 35px rgba(0, 168, 132, 0.4)', border: '2px solid #25D366' }}>
            BUILD YOUR WHATSAPP BOT FREE →
          </div>
        </div>
      </div>

    </AbsoluteFill>
  )
}

// ===================== MAIN COMPOSITION =====================
export const ActionpackdPromoVideo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#EFEAE2' }}>
      <Sequence from={0} durationInFrames={75}>
        <Scene1SelectTemplate />
      </Sequence>
      <Sequence from={75} durationInFrames={75}>
        <Scene2ConnectWhatsApp />
      </Sequence>
      <Sequence from={150} durationInFrames={75}>
        <Scene3TestBot />
      </Sequence>
      <Sequence from={225} durationInFrames={75}>
        <Scene4Outro />
      </Sequence>
    </AbsoluteFill>
  )
}

export default ActionpackdPromoVideo

