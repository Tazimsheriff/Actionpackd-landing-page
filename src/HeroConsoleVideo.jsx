import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion'

export const HeroConsoleVideo = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // 1. Channel Tab switching animation (whatsapp selected initially, switching to web live chat or staying on whatsapp)
  const channelTab = frame < 120 ? 'whatsapp' : (frame < 240 ? 'web' : 'voice')

  // 2. Typing in input field: "Can you process my refund and return order #4821?"
  const inputPrompt = "Can you process my return and order refund?"
  const typingStartFrame = 30
  const typingEndFrame = 110
  const typedCharCount = Math.max(0, Math.min(inputPrompt.length, Math.floor(interpolate(frame, [typingStartFrame, typingEndFrame], [0, inputPrompt.length]))))
  const currentTypedText = inputPrompt.substring(0, typedCharCount)

  // 3. Animated Cursor moving to "SEND" button & clicking
  const cursorX = interpolate(frame, [110, 135], [400, 640], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const cursorY = interpolate(frame, [110, 135], [350, 365], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const isSendClicked = frame >= 135

  const sendBtnScale = isSendClicked && frame < 150
    ? spring({ frame: frame - 135, fps, config: { damping: 8, mass: 0.4, stiffness: 180 } })
    : 1

  // 4. Sent User Message sliding in after SEND click
  const userMsgOpacity = isSendClicked
    ? interpolate(frame - 135, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0
  const userMsgY = isSendClicked
    ? interpolate(frame - 135, [0, 15], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 20

  // 5. AI Response sliding in after 0.38s latency delay (frame >= 155)
  const aiResponseVisible = frame >= 155
  const aiMsgOpacity = aiResponseVisible
    ? interpolate(frame - 155, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0
  const aiMsgY = aiResponseVisible
    ? interpolate(frame - 155, [0, 18], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 20

  const responseText = isSendClicked
    ? '"Return request for order #4821 processed! A pre-paid shipping label has been generated and sent to your email. Refund of $149.00 will credit within 24h."'
    : '"Hi! Your order #4821 is out for delivery. I can schedule a delivery window for tomorrow between 10 AM – 12 PM. Shall I confirm?"'

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', padding: 24, fontFamily: 'Inter, sans-serif', color: '#0F172A', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {/* WINDOW HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: 12, marginBottom: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF003C' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFB703' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#25D366' }} />
          <span style={{ color: '#334155', fontWeight: 800, marginLeft: 6 }}>actionpackd_ai_console.v2</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#25D366', fontWeight: 800, fontSize: 11 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#25D366', opacity: Math.sin(frame / 4) > 0 ? 1 : 0.4 }} />
          META CLOUD LIVE
        </div>
      </div>

      {/* CHANNEL SWITCHER TABS */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'hidden' }}>
        {[
          { id: 'whatsapp', name: 'WhatsApp API', icon: '💬', badge: 'Meta Verified' },
          { id: 'web', name: 'Web Live Chat', icon: '🌐', badge: 'Instant SDK' },
          { id: 'voice', name: 'Twilio Voice', icon: '🎙️', badge: '0.38s Latency' }
        ].map(tab => (
          <div
            key={tab.id}
            style={{
              padding: '8px 14px',
              borderRadius: 12,
              fontSize: 12,
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: channelTab === tab.id ? '#0F172A' : '#F8FAFC',
              color: channelTab === tab.id ? '#FFFFFF' : '#475569',
              border: channelTab === tab.id ? '1px solid #0F172A' : '1px solid #E2E8F0',
              transition: 'all 0.2s'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
            <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 999, background: channelTab === tab.id ? '#25D366' : '#E2E8F0', color: channelTab === tab.id ? '#FFFFFF' : '#475569', fontWeight: 800 }}>
              {tab.badge}
            </span>
          </div>
        ))}
      </div>

      {/* CHAT MESSAGES CONTAINER */}
      <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 16, padding: 18, display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'flex-end', marginBottom: 16, overflow: 'hidden' }}>
        
        {/* INITIAL USER MSG */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#E2E8F0', color: '#475569', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            USR
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: '10px 14px', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: '#1E293B', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', maxWidth: '85%' }}>
            "I want to check order #4821 status and request delivery reschedule."
          </div>
        </div>

        {/* NEW SENT USER MSG (SLIDES IN AFTER CLICK) */}
        {isSendClicked && (
          <div style={{ opacity: userMsgOpacity, transform: `translateY(${userMsgY}px)`, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#E2E8F0', color: '#475569', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              USR
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #FF003C', borderRadius: 14, padding: '10px 14px', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: '#1E293B', boxShadow: '0 2px 8px rgba(255,0,60,0.1)', maxWidth: '85%' }}>
              "{inputPrompt}"
            </div>
          </div>
        )}

        {/* AI RESPONSE MSG CARD */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexDirection: 'row-reverse' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #FF003C 0%, #7C3AED 100%)', color: '#FFFFFF', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            AI
          </div>
          <div style={{ opacity: isSendClicked ? aiMsgOpacity : 1, transform: `translateY(${isSendClicked ? aiMsgY : 0}px)`, background: '#FFFFFF', border: '1px solid rgba(255, 0, 60, 0.3)', borderRadius: 16, padding: 16, maxWidth: '90%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#3B82F6', marginBottom: 6, borderBottom: '1px solid #F1F5F9', paddingBottom: 6 }}>
              <span style={{ fontWeight: 800 }}>ACTIONPACKD AI AGENT</span>
              <span style={{ background: '#F0FDF4', color: '#25D366', border: '1px solid rgba(37,211,102,0.4)', padding: '2px 8px', borderRadius: 999, fontWeight: 800 }}>META VERIFIED</span>
            </div>
            <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.5, margin: 0, fontFamily: 'Inter, sans-serif' }}>
              {responseText}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#94A3B8', marginTop: 10, pt: 6, borderTop: '1px solid #F1F5F9' }}>
              <span>⚡ Latency: 0.38s</span>
              <span>Confidence: 99.4%</span>
              <span style={{ color: '#25D366', fontWeight: 800 }}>● Connected</span>
            </div>
          </div>
        </div>

      </div>

      {/* INPUT BAR WITH TYPING & ANIMATED SEND BUTTON */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
        <span style={{ color: '#FF003C', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, fontSize: 16 }}>{'>'}</span>
        <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: '10px 14px', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#0F172A', display: 'flex', alignItems: 'center' }}>
          {isSendClicked ? (
            <span style={{ color: '#94A3B8' }}>Test live AI response (e.g. Can you process my return?)...</span>
          ) : (
            <span>
              {currentTypedText}
              <span style={{ color: '#FF003C', opacity: Math.sin(frame / 3) > 0 ? 1 : 0 }}>|</span>
            </span>
          )}
        </div>

        {/* SEND BUTTON */}
        <div style={{ transform: `scale(${sendBtnScale})`, background: '#FF003C', color: '#FFFFFF', padding: '10px 20px', borderRadius: 12, fontSize: 12, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', boxShadow: '0 4px 14px rgba(255, 0, 60, 0.35)', cursor: 'pointer' }}>
          SEND
        </div>
      </div>

      {/* ANIMATED MOUSE CURSOR MOVING TO SEND */}
      {frame >= 100 && frame < 160 && (
        <div style={{ position: 'absolute', left: cursorX, top: cursorY, zIndex: 100, pointerEvents: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF003C" stroke="#FFFFFF" strokeWidth="2">
            <path d="M3 3l7 18 3-7 7-3L3 3z" />
          </svg>
        </div>
      )}

    </AbsoluteFill>
  )
}

export default HeroConsoleVideo
