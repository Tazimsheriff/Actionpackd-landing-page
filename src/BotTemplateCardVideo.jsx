import React, { useState, useEffect } from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion'

export const BotTemplateCardVideo = ({
  icon = '👤',
  name = 'Lead Validation Bot',
  accentColor = '#FF003C',
  liveMsg = '⚡ Qualified Lead #942 captured!'
}) => {
  // 1. Try Remotion frame if player is actively driving canvas
  let remotionFrame = 0
  try {
    remotionFrame = useCurrentFrame()
  } catch (e) {
    remotionFrame = 0
  }

  // 2. High-performance 60fps fallback loop so the card NEVER freezes under browser autoplay policies
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

  // Use live frame if remotion frame is 0 or paused by browser media autoplay policies
  const frame = remotionFrame > 0 ? remotionFrame : liveFrame
  const fps = 30

  // Loop every 90 frames (3 seconds at 30fps)
  const loopFrame = frame % 90
  const progress = interpolate(loopFrame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  // Pulsing scale for node icons
  const nodePulse = Math.sin(frame / 5) * 0.08 + 1
  const cardFloat = Math.sin(frame / 8) * 3

  // Dash offset animation for flow path
  const dashOffset = -frame * 2.5

  // Spring animation for floating tooltip message popping up
  const msgScale = spring({
    frame: loopFrame > 20 ? loopFrame - 20 : 0,
    fps,
    config: { damping: 9, mass: 0.4, stiffness: 200 }
  })

  const msgOpacity = interpolate(loopFrame, [20, 30, 80, 88], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  // Particle positions along flow originating from WhatsApp node center (47,41) to Mascot node center (333,41)
  const particleX = 47 + progress * 286
  const particleY = 41 + Math.sin(progress * Math.PI) * -18

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        padding: '14px',
        overflow: 'hidden',
        backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px)',
        backgroundSize: '16px 16px'
      }}
    >
      {/* FLOW LINES & NODES HEADER */}
      <div style={{ position: 'relative', width: '100%', height: '95px', marginTop: '8px' }}>
        
        {/* SVG CONNECTING PATHS */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          {/* Main Curved Connector Path */}
          <path
            d="M 47 41 C 140 10, 240 10, 333 41"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            strokeDashoffset={dashOffset}
          />
          {/* Vertical path down to card node */}
          <path
            d="M 190 28 L 190 75"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Glowing Animated Signal Particle Traveling Along Path */}
          <circle
            cx={particleX}
            cy={particleY}
            r="5"
            fill={accentColor}
            style={{
              filter: `drop-shadow(0 0 8px ${accentColor})`
            }}
          />
        </svg>

        {/* TOP LEFT NODE: OFFICIAL WHATSAPP LOGO (PERFECTLY CENTERED) */}
        <div
          style={{
            position: 'absolute',
            left: '28px',
            top: '22px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#25D366',
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 4px 14px rgba(37,211,102,0.4)',
            transform: `scale(${nodePulse})`,
            transformOrigin: 'center center',
            zIndex: 2
          }}
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg"
            alt="Official WhatsApp Logo"
            style={{
              width: '20px',
              height: '20px',
              display: 'block',
              margin: 'auto',
              filter: 'brightness(0) invert(1)',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* CENTER NODE: FLOW STEP INDICATOR */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '12px',
            transform: 'translateX(-50%)',
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '20px',
            padding: '2px 10px',
            fontSize: '9px',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 800,
            color: '#0F172A',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor, display: 'inline-block' }} />
          <span>AUTO-FLOW</span>
        </div>

        {/* TOP RIGHT NODE: ACTIONPACKD BOT MASCOT LOGO (PERFECTLY CENTERED) */}
        <div
          style={{
            position: 'absolute',
            right: '28px',
            top: '22px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#090A0F',
            border: `2px solid ${accentColor}`,
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 4px 14px rgba(9,10,15,0.3)',
            transformOrigin: 'center center',
            zIndex: 2,
            padding: '4px'
          }}
        >
          <img
            src="/assets/logo_mascot.png"
            alt="Actionpackd Bot Mascot Logo"
            style={{
              width: '24px',
              height: '24px',
              display: 'block',
              margin: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* ANIMATED FLOATING LIVE TOOLTIP MSG */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '42px',
            transform: `translateX(-50%) scale(${msgScale})`,
            opacity: msgOpacity,
            backgroundColor: '#090A0F',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '5px 12px',
            fontSize: '10px',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
            boxShadow: '0 8px 22px rgba(0,0,0,0.3)',
            border: `1.5px solid ${accentColor}`,
            zIndex: 10,
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}
        >
          {liveMsg}
        </div>
      </div>

      {/* BOTTOM CARD NODE BOX (MATCHES SCREENSHOT WITH REMOTION FLOAT) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '16px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
          position: 'relative',
          transform: `translateY(${cardFloat}px)`,
          zIndex: 5
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            backgroundColor: '#F1F5F9',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontSize: '20px',
            flexShrink: 0
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '12px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              color: '#090A0F',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: '10px',
              fontFamily: 'JetBrains Mono, monospace',
              color: '#64748B',
              marginTop: '1px'
            }}
          >
            Template
          </div>
        </div>
        <div
          style={{
            fontSize: '9px',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 800,
            color: accentColor,
            backgroundColor: 'rgba(255, 0, 60, 0.08)',
            padding: '3px 8px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 0, 60, 0.2)',
            whiteSpace: 'nowrap'
          }}
        >
          ● LIVE
        </div>
      </div>
    </AbsoluteFill>
  )
}

export default BotTemplateCardVideo
