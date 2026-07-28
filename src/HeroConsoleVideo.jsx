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
      const currentF = Math.floor(elapsed * 30) // 30 FPS tick
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
  const typingEnd = 85
  const typedCount = Math.max(
    0,
    Math.min(
      inputPrompt.length,
      Math.floor(interpolate(loopFrame, [typingStart, typingEnd], [0, inputPrompt.length]))
    )
  )
  const currentTypedText = inputPrompt.substring(0, typedCount)

  // 2. Cursor movement to Send Button
  const isSendClicked = loopFrame >= 100
  const sendClickScale = isSendClicked
    ? spring({
        frame: loopFrame - 100,
        fps,
        config: { damping: 10, mass: 0.3, stiffness: 250 }
      })
    : 1

  const cursorX = interpolate(loopFrame, [80, 100], [520, 720], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })
  const cursorY = interpolate(loopFrame, [80, 100], [380, 420], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  // 3. User message sent (frame >= 100) with Remotion Spring Physics
  const userMsgProgress = loopFrame >= 100 ? loopFrame - 100 : 0
  const userMsgScale = loopFrame >= 100
    ? spring({
        frame: userMsgProgress,
        fps,
        config: { damping: 12, mass: 0.5, stiffness: 180 }
      })
    : 0

  const userMsgOpacity = interpolate(userMsgProgress, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  // Blue tick progression for second user message
  const userTickState = loopFrame >= 140 ? 'blue' : (loopFrame >= 115 ? 'double' : 'single')

  // 4. AI typing status & bouncing dots indicator (frame 115 to 150)
  const isAiTyping = loopFrame >= 115 && loopFrame < 150
  const dot1Scale = Math.sin((loopFrame * 0.4)) * 0.3 + 1
  const dot2Scale = Math.sin((loopFrame * 0.4 + 1.2)) * 0.3 + 1
  const dot3Scale = Math.sin((loopFrame * 0.4 + 2.4)) * 0.3 + 1

  // 5. AI WhatsApp Response (frame >= 150) with Spring physics
  const isAiResponded = loopFrame >= 150
  const aiMsgProgress = isAiResponded ? loopFrame - 150 : 0
  const aiMsgScale = isAiResponded
    ? spring({
        frame: aiMsgProgress,
        fps,
        config: { damping: 13, mass: 0.5, stiffness: 170 }
      })
    : 0

  const aiMsgOpacity = interpolate(aiMsgProgress, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  // Action buttons stagger animation
  const btn1Scale = isAiResponded
    ? spring({
        frame: Math.max(0, aiMsgProgress - 10),
        fps,
        config: { damping: 10, mass: 0.4, stiffness: 200 }
      })
    : 0

  const btn2Scale = isAiResponded
    ? spring({
        frame: Math.max(0, aiMsgProgress - 18),
        fps,
        config: { damping: 10, mass: 0.4, stiffness: 200 }
      })
    : 0

  // 6. Action PDF attachment card (frame >= 205) with Spring physics
  const isPdfVisible = loopFrame >= 205
  const pdfProgress = isPdfVisible ? loopFrame - 205 : 0
  const pdfScale = isPdfVisible
    ? spring({
        frame: pdfProgress,
        fps,
        config: { damping: 12, mass: 0.5, stiffness: 180 }
      })
    : 0

  const pdfOpacity = interpolate(pdfProgress, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#EFEAE2',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px)',
        backgroundSize: '20px 20px'
      }}
    >
      {/* WHATSAPP LIGHT MODE APP BAR */}
      <div
        style={{
          backgroundColor: '#F0F2F5',
          borderBottom: '1px solid #D1D7DB',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          zIndex: 20,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        {/* LEFT: BACK ARROW & BOT PROFILE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ color: '#54656F', fontSize: '18px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 700 }}>
            ←
          </div>
          
          {/* BOT PROFILE AVATAR - PERFECTLY CENTERED BUBBLE */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '2px solid #25D366',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                overflow: 'hidden',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                padding: '0'
              }}
            >
              <img
                src="/assets/logo_mascot.png"
                alt="Actionpackd Bot Mascot"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  display: 'block'
                }}
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
                border: '2px solid #F0F2F5'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#111B21', fontWeight: 800, fontSize: '15px', fontFamily: 'Outfit, sans-serif' }}>
                Actionpackd AI Business Assistant
              </span>
              {/* META OFFICIAL GREEN VERIFIED BADGE */}
              <span
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justify: 'center',
                  fontSize: '10px',
                  fontWeight: 900
                }}
              >
                ✓
              </span>
            </div>
            <div style={{ color: '#008069', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, marginTop: '2px' }}>
              {isAiTyping ? 'typing...' : 'online · Meta Verified API'}
            </div>
          </div>
        </div>

        {/* RIGHT: OFFICIAL WHATSAPP LOGO BADGE & ACTION ICONS */}
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
              style={{ width: '16px', height: '16px', filter: 'invert(45%) sepia(85%) saturate(800%) hue-rotate(100deg)' }}
            />
            <span style={{ color: '#008069', fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
              WhatsApp API v20.0
            </span>
          </div>

          <span style={{ color: '#54656F', fontSize: '18px', cursor: 'pointer' }}>📞</span>
          <span style={{ color: '#54656F', fontSize: '18px', cursor: 'pointer' }}>🎥</span>
          <span style={{ color: '#54656F', fontSize: '18px', cursor: 'pointer' }}>⋮</span>
        </div>
      </div>

      {/* WHATSAPP LIGHT MODE CHAT AREA */}
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
            margin: '0 auto 10px auto',
            backgroundColor: '#FFEECD',
            border: '1px solid #FFE082',
            color: '#54656F',
            fontSize: '11px',
            fontFamily: 'JetBrains Mono, monospace',
            padding: '6px 14px',
            borderRadius: '8px',
            textAlign: 'center',
            maxWidth: '420px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          🔒 Messages are end-to-end encrypted. Official Meta Cloud API.
        </div>

        {/* INITIAL INCOMING USER MESSAGE (LEFT ALIGNED) */}
        <div
          style={{
            alignSelf: 'flex-start',
            backgroundColor: '#FFFFFF',
            color: '#111B21',
            borderRadius: '0px 12px 12px 12px',
            padding: '10px 14px',
            fontSize: '13px',
            maxWidth: '75%',
            boxShadow: '0 1px 2px rgba(11,20,26,0.13)',
            position: 'relative'
          }}
        >
          <span>"Hi! I want to check order #4821 status and request delivery reschedule."</span>
          <span
            style={{
              display: 'inline-block',
              marginLeft: '12px',
              fontSize: '10px',
              color: '#667781',
              fontFamily: 'JetBrains Mono, monospace'
            }}
          >
            10:41 AM
          </span>
        </div>

        {/* SECOND USER MESSAGE (SLIDES IN WITH REMOTION SPRING PHYSICS) */}
        {isSendClicked && (
          <div
            style={{
              opacity: userMsgOpacity,
              transform: `scale(${userMsgScale})`,
              transformOrigin: 'bottom left',
              alignSelf: 'flex-start',
              backgroundColor: '#FFFFFF',
              borderLeft: '4px solid #FF003C',
              color: '#111B21',
              borderRadius: '0px 12px 12px 12px',
              padding: '10px 14px',
              fontSize: '13px',
              maxWidth: '75%',
              boxShadow: '0 2px 8px rgba(11,20,26,0.12)',
              position: 'relative'
            }}
          >
            <span>"{inputPrompt}"</span>
            <span
              style={{
                display: 'inline-block',
                marginLeft: '12px',
                fontSize: '10px',
                color: '#667781',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            >
              10:42 AM
              {userTickState === 'single' && <span style={{ color: '#8696A0', marginLeft: '4px' }}>✓</span>}
              {userTickState === 'double' && <span style={{ color: '#8696A0', marginLeft: '4px' }}>✓✓</span>}
              {userTickState === 'blue' && <span style={{ color: '#53BDEB', marginLeft: '4px', fontWeight: 900 }}>✓✓</span>}
            </span>
          </div>
        )}

        {/* AI TYPING INDICATOR BUBBLE (LIGHT MODE) */}
        {isAiTyping && (
          <div
            style={{
              alignSelf: 'flex-end',
              backgroundColor: '#D9FDD3',
              color: '#075E54',
              borderRadius: '12px 0px 12px 12px',
              padding: '10px 16px',
              fontSize: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ fontWeight: 700 }}>Actionpackd AI is typing</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#008069', transform: `scale(${dot1Scale})` }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#008069', transform: `scale(${dot2Scale})` }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#008069', transform: `scale(${dot3Scale})` }} />
            </div>
          </div>
        )}

        {/* ACTIONPACKD AI OUTGOING WHATSAPP RESPONSE BUBBLE (AUTHENTIC LIGHT GREEN #D9FDD3) */}
        {isAiResponded && (
          <div
            style={{
              opacity: aiMsgOpacity,
              transform: `scale(${aiMsgScale})`,
              transformOrigin: 'bottom right',
              alignSelf: 'flex-end',
              backgroundColor: '#D9FDD3',
              color: '#111B21',
              borderRadius: '14px 0px 14px 14px',
              padding: '14px 16px',
              fontSize: '13px',
              maxWidth: '82%',
              boxShadow: '0 2px 8px rgba(11,20,26,0.12)',
              border: '1px solid #B4E6B0'
            }}
          >
            {/* AGENT HEADER BADGE */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                fontSize: '10px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#008069',
                fontWeight: 800,
                borderBottom: '1px solid rgba(0,128,105,0.15)',
                paddingBottom: '6px',
                marginBottom: '8px'
              }}
            >
              <span>⚡ ACTIONPACKD AI AGENT</span>
              <span style={{ backgroundColor: '#008069', color: '#FFFFFF', padding: '2px 8px', borderRadius: '999px', fontSize: '9px', fontWeight: 800 }}>
                0.38s LATENCY
              </span>
            </div>

            <p style={{ margin: 0, lineHeight: 1.5, color: '#111B21' }}>
              "Return request for <strong>Order #4821</strong> approved! 📦 Pre-paid return shipping label generated and refund of <strong>$149.00</strong> initialized to your payment method."
            </p>

            {/* QUICK ACTION INTERACTIVE BUTTONS WITH REMOTION STAGGER SPRINGS */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div
                style={{
                  transform: `scale(${btn1Scale})`,
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #008069',
                  padding: '6px 14px',
                  borderRadius: '18px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#008069',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
                }}
              >
                📄 Download Return Label
              </div>
              <div
                style={{
                  transform: `scale(${btn2Scale})`,
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #008069',
                  padding: '6px 14px',
                  borderRadius: '18px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#008069',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
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
                color: '#667781',
                fontFamily: 'JetBrains Mono, monospace',
                marginTop: '8px'
              }}
            >
              <span>10:42 AM</span>
              <span style={{ color: '#53BDEB', fontWeight: 900 }}>✓✓</span>
            </div>
          </div>
        )}

        {/* AUTOMATED ATTACHMENT CARD (LIGHT MODE) */}
        {isPdfVisible && (
          <div
            style={{
              opacity: pdfOpacity,
              transform: `scale(${pdfScale})`,
              transformOrigin: 'bottom right',
              alignSelf: 'flex-end',
              backgroundColor: '#FFFFFF',
              border: '1px solid #25D366',
              borderRadius: '12px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              maxWidth: '360px',
              boxShadow: '0 3px 10px rgba(37,211,102,0.15)'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#FF3B30',
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
              <div style={{ color: '#111B21', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                PrePaid_Return_Label_4821.pdf
              </div>
              <div style={{ color: '#008069', fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                1.4 MB · Ready for print & dropoff
              </div>
            </div>
            <span style={{ color: '#53BDEB', fontSize: '11px', fontWeight: 900 }}>✓✓</span>
          </div>
        )}
      </div>

      {/* WHATSAPP LIGHT MODE BOTTOM INPUT BAR */}
      <div
        style={{
          backgroundColor: '#F0F2F5',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderTop: '1px solid #D1D7DB',
          position: 'relative'
        }}
      >
        <span style={{ color: '#54656F', fontSize: '20px', cursor: 'pointer' }}>😊</span>
        <span style={{ color: '#54656F', fontSize: '20px', cursor: 'pointer' }}>📎</span>

        {/* INPUT FIELD */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#111B21',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          {isSendClicked ? (
            <span style={{ color: '#667781' }}>Type a message...</span>
          ) : (
            <span>
              {currentTypedText}
              <span style={{ color: '#008069', opacity: Math.sin(frame / 3) > 0 ? 1 : 0, fontWeight: 700 }}>|</span>
            </span>
          )}
        </div>

        {/* WHATSAPP GREEN SEND BUTTON (WITH REMOTION SCALE CLICK ANIMATION) */}
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
            transform: `scale(${sendClickScale})`
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" style={{ transform: 'translateX(2.5px)', display: 'block' }}>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>
      </div>

      {/* ANIMATED MOUSE CURSOR MOVING TO SEND BUTTON */}
      {loopFrame >= 70 && loopFrame < 115 && (
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

