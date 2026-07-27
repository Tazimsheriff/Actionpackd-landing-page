import React, { useState, useEffect } from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion'

export const HeroConsoleVideo = () => {
  // 1. Try Remotion frame
  let remotionFrame = 0
  try {
    remotionFrame = useCurrentFrame()
  } catch (e) {
    remotionFrame = 0
  }

  // 2. High-performance fallback frame loop (30 FPS)
  const [liveFrame, setLiveFrame] = useState(0)

  useEffect(() => {
    let animId
    const startTime = performance.now()
    const update = (now) => {
      const elapsed = (now - startTime) / 1000
      const currentF = Math.floor(elapsed * 30) // 30 FPS
      setLiveFrame(currentF)
      animId = requestAnimationFrame(update)
    }
    animId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animId)
  }, [])

  const frame = remotionFrame > 0 ? remotionFrame : liveFrame
  const fps = 30

  // 300 frames total loop (10 seconds)
  const loopFrame = frame % 300

  // 1. Typing in WhatsApp input: "Can you process my return and order refund #4821?"
  const inputPrompt = "Can you process my return and refund order #4821?"
  const typingStart = 20
  const typingEnd = 90
  const typedCount = Math.max(
    0,
    Math.min(
      inputPrompt.length,
      Math.floor(interpolate(loopFrame, [typingStart, typingEnd], [0, inputPrompt.length]))
    )
  )
  const currentTypedText = inputPrompt.substring(0, typedCount)

  // 2. Cursor movement to Send Button
  const isSendClicked = loopFrame >= 105
  const cursorX = interpolate(loopFrame, [85, 105], [520, 720], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const cursorY = interpolate(loopFrame, [85, 105], [380, 420], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  // 3. User message sent (frame >= 105)
  const userMsgOpacity = isSendClicked
    ? interpolate(loopFrame - 105, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      })
    : 0
  const userMsgY = isSendClicked
    ? interpolate(loopFrame - 105, [0, 15], [20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      })
    : 20

  // 4. AI typing indicator (frame 120 to 155)
  const isAiTyping = loopFrame >= 120 && loopFrame < 155

  // 5. AI WhatsApp Response (frame >= 155)
  const isAiResponded = loopFrame >= 155
  const aiMsgOpacity = isAiResponded
    ? interpolate(loopFrame - 155, [0, 18], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      })
    : 0
  const aiMsgY = isAiResponded
    ? interpolate(loopFrame - 155, [0, 18], [20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      })
    : 20

  // 6. Action PDF attachment card (frame >= 210)
  const isPdfVisible = loopFrame >= 210
  const pdfOpacity = isPdfVisible
    ? interpolate(loopFrame - 210, [0, 18], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      })
    : 0

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0B141A',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        overflow: 'hidden',
        backgroundImage: 'radial-gradient(#182229 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* WHATSAPP TOP NAVIGATION APP BAR */}
      <div
        style={{
          backgroundColor: '#1F2C34',
          borderBottom: '1px solid #2A3942',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          zIndex: 20
        }}
      >
        {/* LEFT: BACK ARROW & BOT PROFILE */}
        <div style={{ display: 'flex', items: 'center', gap: '14px' }}>
          <div style={{ color: '#AEBAC1', fontSize: '18px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            ←
          </div>
          
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#090A0F',
                border: '2px solid #25D366',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(37,211,102,0.3)'
              }}
            >
              <img
                src="/assets/logo_mascot.png"
                alt="Actionpackd Bot Mascot"
                style={{ width: '30px', height: '30px', objectFit: 'contain' }}
              />
            </div>
            {/* ONLINE GREEN BADGE */}
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#25D366',
                border: '2px solid #1F2C34'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#E9EDEF', fontWeight: 800, fontSize: '14px', fontFamily: 'Outfit, sans-serif' }}>
                Actionpackd AI Business Assistant
              </span>
              {/* META OFFICIAL GREEN VERIFIED BADGE */}
              <span
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '15px',
                  height: '15px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justify: 'center',
                  fontSize: '9px',
                  fontWeight: 900
                }}
              >
                ✓
              </span>
            </div>
            <div style={{ color: '#25D366', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, marginTop: '2px' }}>
              {isAiTyping ? 'typing...' : 'online · Meta Verified API'}
            </div>
          </div>
        </div>

        {/* RIGHT: OFFICIAL WHATSAPP LOGO & ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(37,211,102,0.12)',
              border: '1px solid rgba(37,211,102,0.3)',
              padding: '4px 10px',
              borderRadius: '999px'
            }}
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg"
              alt="Official WhatsApp Logo"
              style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)' }}
            />
            <span style={{ color: '#25D366', fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
              WhatsApp API v20.0
            </span>
          </div>

          <span style={{ color: '#AEBAC1', fontSize: '18px', cursor: 'pointer' }}>📞</span>
          <span style={{ color: '#AEBAC1', fontSize: '18px', cursor: 'pointer' }}>🎥</span>
          <span style={{ color: '#AEBAC1', fontSize: '18px', cursor: 'pointer' }}>⋮</span>
        </div>
      </div>

      {/* WHATSAPP CHAT AREA */}
      <div
        style={{
          flex: 1,
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          justify: 'flex-end',
          overflowY: 'hidden'
        }}
      >
        {/* ENCRYPTED BANNER */}
        <div
          style={{
            margin: '0 auto 12px auto',
            backgroundColor: '#182229',
            border: '1px solid #222D34',
            color: '#FFE169',
            fontSize: '10px',
            fontFamily: 'JetBrains Mono, monospace',
            padding: '6px 14px',
            borderRadius: '8px',
            textAlign: 'center',
            maxWidth: '380px'
          }}
        >
          🔒 Messages are end-to-end encrypted. Official Meta Cloud API.
        </div>

        {/* INITIAL INCOMING USER MESSAGE */}
        <div
          style={{
            alignSelf: 'flex-start',
            backgroundColor: '#202C33',
            color: '#E9EDEF',
            borderRadius: '12px 12px 12px 2px',
            padding: '10px 14px',
            fontSize: '13px',
            maxWidth: '75%',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            position: 'relative'
          }}
        >
          <span>"Hi! I want to check order #4821 status and request delivery reschedule."</span>
          <span
            style={{
              display: 'inline-block',
              marginLeft: '12px',
              fontSize: '10px',
              color: '#8696A0',
              fontFamily: 'JetBrains Mono, monospace'
            }}
          >
            10:41 AM
          </span>
        </div>

        {/* SECOND USER MESSAGE (SLIDES IN AFTER CLICK) */}
        {isSendClicked && (
          <div
            style={{
              opacity: userMsgOpacity,
              transform: `translateY(${userMsgY}px)`,
              alignSelf: 'flex-start',
              backgroundColor: '#202C33',
              border: '1px solid #FF003C',
              color: '#E9EDEF',
              borderRadius: '12px 12px 12px 2px',
              padding: '10px 14px',
              fontSize: '13px',
              maxWidth: '75%',
              boxShadow: '0 4px 12px rgba(255,0,60,0.2)',
              position: 'relative'
            }}
          >
            <span>"{inputPrompt}"</span>
            <span
              style={{
                display: 'inline-block',
                marginLeft: '12px',
                fontSize: '10px',
                color: '#8696A0',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            >
              10:42 AM
            </span>
          </div>
        )}

        {/* AI TYPING INDICATOR BUBBLE */}
        {isAiTyping && (
          <div
            style={{
              alignSelf: 'flex-end',
              backgroundColor: '#005C4B',
              color: '#E9EDEF',
              borderRadius: '12px 12px 2px 12px',
              padding: '10px 16px',
              fontSize: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Actionpackd AI is typing</span>
            <span style={{ fontSize: '14px', color: '#25D366' }}>• • •</span>
          </div>
        )}

        {/* ACTIONPACKD AI OUTGOING WHATSAPP RESPONSE BUBBLE */}
        {isAiResponded && (
          <div
            style={{
              opacity: aiMsgOpacity,
              transform: `translateY(${aiMsgY}px)`,
              alignSelf: 'flex-end',
              backgroundColor: '#005C4B',
              color: '#E9EDEF',
              borderRadius: '14px 14px 2px 14px',
              padding: '14px 16px',
              fontSize: '13px',
              maxWidth: '82%',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              border: '1px solid rgba(37,211,102,0.3)'
            }}
          >
            {/* AGENT BADGE */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                fontSize: '10px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#25D366',
                fontWeight: 800,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '6px',
                marginBottom: '8px'
              }}
            >
              <span>⚡ ACTIONPACKD AI AGENT</span>
              <span style={{ backgroundColor: '#25D366', color: '#0B141A', padding: '1px 6px', borderRadius: '999px', fontSize: '9px' }}>
                0.38s LATENCY
              </span>
            </div>

            <p style={{ margin: 0, lineHeight: 1.5 }}>
              "Return request for <strong>Order #4821</strong> approved! 📦 Pre-paid return shipping label generated and refund of <strong>$149.00</strong> initialized to your payment method."
            </p>

            {/* QUICK ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  padding: '6px 12px',
                  borderRadius: '18px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                📄 Download Return Label
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  padding: '6px 12px',
                  borderRadius: '18px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                🚚 Track FedEx ETA
              </div>
            </div>

            {/* TIME & DOUBLE BLUE TICKS */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'flex-end',
                gap: '4px',
                fontSize: '10px',
                color: '#8696A0',
                fontFamily: 'JetBrains Mono, monospace',
                marginTop: '8px'
              }}
            >
              <span>10:42 AM</span>
              <span style={{ color: '#53BDEB', fontWeight: 900 }}>✓✓</span>
            </div>
          </div>
        )}

        {/* AUTOMATED ATTACHMENT CARD */}
        {isPdfVisible && (
          <div
            style={{
              opacity: pdfOpacity,
              alignSelf: 'flex-end',
              backgroundColor: '#1F2C34',
              border: '1px solid #25D366',
              borderRadius: '12px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              maxWidth: '360px',
              boxShadow: '0 4px 12px rgba(37,211,102,0.2)'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#FF003C',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                fontSize: '18px',
                fontWeight: 800
              }}
            >
              📄
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#E9EDEF', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                PrePaid_Return_Label_4821.pdf
              </div>
              <div style={{ color: '#25D366', fontSize: '10px', fontFamily: 'JetBrains Mono, monospace' }}>
                1.4 MB · Ready for print & dropoff
              </div>
            </div>
            <span style={{ color: '#53BDEB', fontSize: '11px', fontWeight: 900 }}>✓✓</span>
          </div>
        )}
      </div>

      {/* WHATSAPP BOTTOM INPUT BAR */}
      <div
        style={{
          backgroundColor: '#202C33',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderTop: '1px solid #2A3942',
          position: 'relative'
        }}
      >
        <span style={{ color: '#8696A0', fontSize: '20px', cursor: 'pointer' }}>😊</span>
        <span style={{ color: '#8696A0', fontSize: '20px', cursor: 'pointer' }}>📎</span>

        {/* INPUT FIELD */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#2A3942',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#E9EDEF',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isSendClicked ? (
            <span style={{ color: '#8696A0' }}>Type a message...</span>
          ) : (
            <span>
              {currentTypedText}
              <span style={{ color: '#25D366', opacity: Math.sin(frame / 3) > 0 ? 1 : 0 }}>|</span>
            </span>
          )}
        </div>

        {/* WHATSAPP GREEN SEND BUTTON */}
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#00A884',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,168,132,0.4)',
            transform: `scale(${isSendClicked ? 1.1 : 1})`,
            transition: 'transform 0.15s'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>
      </div>

      {/* ANIMATED CURSOR MOVING TO SEND BUTTON */}
      {loopFrame >= 75 && loopFrame < 125 && (
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
