import React, { useState, useEffect, useRef } from 'react'
import { Player } from '@remotion/player'
import { ActionpackdPromoVideo } from './ActionpackdPromoVideo'
import { HeroConsoleVideo } from './HeroConsoleVideo'

// ===================== SCROLL ANIMATION HOOK =====================
const useInView = (options = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.12, ...options })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

const AnimatedSection = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`
      }}
    >
      {children}
    </div>
  )
}

const CounterUp = ({ target, suffix = '', duration = 1800 }) => {
  const [ref, inView] = useInView()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.max(1, Math.floor(target / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>
}

// ===================== MANYCHAT-STYLE: "TURN COMMENTS INTO CONVERSATIONS" SECTION =====================
const TurnCommentsToSalesSection = ({ onStartFree }) => {
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = [
    {
      title: "Turn comments into conversations that sell.",
      quote: '"How much is this?" or "Do you ship to Mars?" — Instant reply. Boom — wallets open, money lands, and you didn\'t even blink.',
      userComment: "Jessica Peel: I\'ll be watching 👀",
      botReply: "Hey Jessica! Sent you a direct message with the instant video link & discount code! 🚀",
      badge: "Auto-reply on every comment (1/2)"
    },
    {
      title: "Convert Instagram & WhatsApp DMs automatically.",
      quote: '"Can I see your price list?" — AI Bot auto-triggers interactive product cards & 1-click WhatsApp checkout.',
      userComment: "Marcus V.: Sent you a DM about pricing!",
      botReply: "Hi Marcus! Here is our 2026 catalog + 15% VIP discount link valid for 2 hours! 🎁",
      badge: "Instant 0.38s DM dispatch (2/2)"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const current = slides[activeSlide]

  return (
    <section className="py-20 bg-[#FF003C] text-white overflow-hidden relative border-y-4 border-[#090A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SLIDE PROGRESS BARS */}
        <div className="flex justify-center gap-2 mb-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${activeSlide === idx ? 'w-12 bg-white' : 'w-4 bg-white/40'}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT DISPLAY TEXT */}
          <div className="lg:col-span-7 text-left space-y-6">
            <h2 className="text-4xl sm:text-6xl font-outfit font-black tracking-tight text-white leading-[1.05] uppercase">
              {current.title}
            </h2>
            <p className="text-lg sm:text-xl font-sans text-white/90 leading-relaxed max-w-xl">
              {current.quote}
            </p>
            <div className="pt-4">
              <button
                onClick={onStartFree}
                className="btn-black px-10 py-4 rounded-full font-outfit font-black text-sm uppercase tracking-widest shadow-2xl"
              >
                GET STARTED FREE →
              </button>
            </div>
          </div>

          {/* RIGHT PHONE INTERACTIVE MOCKUP */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-[36px] bg-[#090A0F] border-4 border-white shadow-2xl p-4 overflow-hidden relative text-left">
              
              {/* PHONE MOCKUP HEADER */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800 mb-4">
                <img src="/assets/logo_mascot.png" alt="Mascot" className="w-8 h-8 rounded-full bg-white p-0.5 object-contain" />
                <div>
                  <div className="text-xs font-bold text-white font-mono">actionpackd.bot</div>
                  <div className="text-[10px] text-[#25D366] font-mono">● Auto-DM Active</div>
                </div>
              </div>

              {/* POST MOCKUP IMAGE */}
              <div className="rounded-2xl overflow-hidden bg-slate-900 aspect-video relative mb-4 border border-slate-800 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <span className="relative z-10 font-outfit font-extrabold text-sm text-white bg-[#FF003C]/90 px-3 py-1.5 rounded-full shadow-lg">
                  🔥 New Product Drop! Comment "LINK"
                </span>
              </div>

              {/* COMMENT & BOT AUTO-DM */}
              <div className="space-y-3 font-sans text-xs">
                <div className="bg-[#181A22] border border-slate-800 p-3 rounded-xl text-slate-200 font-mono">
                  <span className="text-[#FF003C] font-bold">● User Comment:</span> {current.userComment}
                </div>
                <div className="bg-[#FF003C] text-white p-3.5 rounded-xl font-sans font-semibold shadow-md animate-slide-up">
                  <div className="text-[10px] font-mono opacity-80 mb-1">⚡ INSTANT AUTO-DM</div>
                  {current.botReply}
                </div>
              </div>

              {/* BADGE */}
              <div className="mt-4 pt-3 border-t border-slate-800 bg-[#FF003C] text-white text-center text-[10px] font-mono font-bold uppercase tracking-wider py-2 rounded-xl">
                {current.badge}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

// ===================== MANYCHAT-STYLE: "SEE IT IN ACTION..." INTERACTIVE FLOW SWITCHER =====================
const SeeItInActionSection = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      id: 0,
      label: "Auto-DM from Comments",
      subLabel: "CHECK IT OUT →",
      phoneHeader: "Instagram & WhatsApp Auto-DM",
      messages: [
        { type: 'user', text: "Commented: 'Where can I order this?'" },
        { type: 'bot', text: "Hey! Thanks for commenting. Here is your direct 1-click checkout link with 15% OFF applied!" }
      ]
    },
    {
      id: 1,
      label: "Send Welcome Messages",
      subLabel: "CHECK IT OUT →",
      phoneHeader: "WhatsApp Welcome Automation",
      messages: [
        { type: 'user', text: "Hey! Just subscribed to your WhatsApp channel." },
        { type: 'bot', text: "Welcome to Actionpackd VIP! 🚀 Here is your instant onboarding guide and instant support link." }
      ]
    },
    {
      id: 2,
      label: "Automate FAQs 24/7",
      subLabel: "CHECK IT OUT →",
      phoneHeader: "24/7 Knowledge Base Bot",
      messages: [
        { type: 'user', text: "What is your refund policy & shipping timeline?" },
        { type: 'bot', text: "We offer 30-day money-back guarantee with instant 2-day delivery! Want me to start a return?" }
      ]
    },
    {
      id: 3,
      label: "Abandoned Cart Recovery",
      subLabel: "CHECK IT OUT →",
      phoneHeader: "Cart Recovery Automation",
      messages: [
        { type: 'user', text: "[Left items in checkout cart]" },
        { type: 'bot', text: "Your cart is waiting! Use code SAVE10 for an extra 10% discount valid for the next 30 minutes. 🛒" }
      ]
    },
    {
      id: 4,
      label: "Book Appointments",
      subLabel: "CHECK IT OUT →",
      phoneHeader: "Calendar Appointment Booking",
      messages: [
        { type: 'user', text: "I'd like to book a 1-on-1 strategy call." },
        { type: 'bot', text: "I have open slots tomorrow at 10 AM & 3 PM. Tap a slot to confirm your calendar invite!" }
      ]
    }
  ]

  const current = tabs[activeTab]

  return (
    <section className="py-24 bg-[#090A0F] text-white border-b border-slate-800 bg-grid-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection>
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#14161C] text-[#FF003C] border border-[#FF003C]/40 font-mono text-xs font-bold uppercase tracking-widest mb-3">
              // INTERACTIVE FLOW SIMULATOR
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-outfit font-extrabold text-white tracking-tight">
              See it in <span className="gradient-text-red">action...</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT SELECTOR TABS */}
          <div className="lg:col-span-5 space-y-3">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between ${
                  activeTab === idx
                    ? 'bg-[#181A22] border-[#FF003C] text-white shadow-xl shadow-rose-500/10'
                    : 'bg-[#12141A] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-outfit font-bold text-lg sm:text-xl text-white">{tab.label}</div>
                  <div className="text-[10px] font-mono text-[#FF003C] font-bold tracking-widest mt-1">{tab.subLabel}</div>
                </div>
                {activeTab === idx && <span className="text-[#FF003C] font-mono font-bold text-xl">→</span>}
              </button>
            ))}
          </div>

          {/* RIGHT ANIMATED PHONE CONTAINER */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md rounded-[40px] bg-[#12141A] border-4 border-slate-800 p-6 shadow-2xl text-left relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              
              {/* PHONE HEADER */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF003C] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      🤖
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{current.phoneHeader}</div>
                      <div className="text-[10px] font-mono text-[#25D366]">● Meta Verified Bot</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono bg-[#FF003C] text-white px-2.5 py-1 rounded-full font-bold">
                    LIVE FLOW
                  </span>
                </div>

                {/* MESSAGES ANIMATION */}
                <div className="space-y-4 font-sans text-sm min-h-[260px] flex flex-col justify-end">
                  {current.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl max-w-[88%] animate-slide-up ${
                        msg.type === 'user'
                          ? 'bg-[#181A22] border border-slate-800 text-slate-200 self-start font-mono text-xs'
                          : 'bg-[#FF003C] text-white self-end font-medium shadow-lg shadow-rose-500/20'
                      }`}
                    >
                      {msg.type === 'bot' && <div className="text-[10px] font-mono opacity-80 mb-1">ACTIONPACKD AI AGENT</div>}
                      {msg.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTTOM ACTION CTA */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>⚡ Latency: 0.38s</span>
                <span className="text-[#FF003C] font-bold">● Active Workflow</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

// ===================== MANYCHAT-STYLE: "BEFORE VS AFTER ACTIONPACKD" OVERLAPPING CARDS =====================
const BeforeAfterComparisonSection = ({ onStartFree }) => {
  return (
    <section className="py-24 bg-white text-[#090A0F] relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#090A0F] text-[#FF003C] border border-slate-800 font-mono text-xs font-bold uppercase tracking-widest mb-3">
              // THE ACTIONPACKD EFFECT
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-outfit font-extrabold tracking-tight text-[#090A0F]">
              Stop grinding. <span className="gradient-text-red">Start scaling.</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* OVERLAPPING COMPARISON CARDS */}
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* CARD 1: BEFORE ACTIONPACKD (SLATE / GREY CARD) */}
          <div className="md:col-span-6 bento-card-light p-8 sm:p-10 bg-slate-100/90 border-2 border-slate-300 rounded-3xl text-left shadow-lg">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">BEFORE ACTIONPACKD</div>
            <h3 className="text-3xl font-outfit font-black text-slate-900 mb-6 leading-tight">
              All grind and <br />no pay.
            </h3>
            
            <ul className="space-y-4 font-mono text-xs text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-base">✕</span>
                <span>Copy-pasting the same reply 417 times per day manually.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-base">✕</span>
                <span>Losing hot qualified leads buried in endless unanswered DMs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-base">✕</span>
                <span>Missed revenue & sales opportunities while you sleep.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-base">✕</span>
                <span>Every comment & inquiry left unattended for hours.</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-300">
              <button
                onClick={onStartFree}
                className="btn-outline w-full py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider"
              >
                Old Way (Slow)
              </button>
            </div>
          </div>

          {/* CARD 2: AFTER ACTIONPACKD (OVERLAPPING CRIMSON RED / OBSIDIAN CARD) */}
          <div className="md:col-span-6 bento-card-dark p-8 sm:p-10 bg-[#FF003C] text-white border-2 border-white rounded-3xl text-left shadow-2xl md:-ml-6 md:-mt-4 relative z-10">
            <div className="text-xs font-mono font-bold text-white/80 uppercase tracking-widest mb-2">AFTER ACTIONPACKD</div>
            <h3 className="text-3xl sm:text-4xl font-outfit font-black text-white mb-6 leading-tight">
              Less grind and <br />10x more pay.
            </h3>
            
            <ul className="space-y-4 font-sans text-sm text-white font-medium">
              <li className="flex items-start gap-3">
                <span className="bg-white text-[#FF003C] w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Smart AI replies handle FAQs instantly in 0.38s.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-white text-[#FF003C] w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Organized, auto-tagged leads synced to CRM 24/7.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-white text-[#FF003C] w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Automated WhatsApp sales going off while you sleep.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-white text-[#FF003C] w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Every interaction automatically converted into revenue.</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-white/20">
              <button
                onClick={onStartFree}
                className="btn-black w-full py-4 rounded-xl font-outfit font-black text-xs uppercase tracking-wider shadow-2xl"
              >
                GET STARTED FREE NOW →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modal, setModal] = useState({ open: false, title: '', body: '' })
  const [botModal, setBotModal] = useState({ open: false, template: null })
  const [botMessages, setBotMessages] = useState([])
  const [botInput, setBotInput] = useState('')
  
  // Interactive Calculator State
  const [monthlyVolume, setMonthlyVolume] = useState(25000)

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0)

  const openModal = (title, body) => setModal({ open: true, title, body })
  const closeModal = () => setModal({ open: false, title: '', body: '' })

  const botTemplates = {
    'lead-gen': {
      id: 'lead-gen',
      name: 'Lead Qualification Bot',
      avatar: '🎯',
      welcome: "Hi! 👋 I'm your AI lead qualification assistant. What's your name and what service are you looking for today?",
      responses: {
        default: "Great! I can qualify this inquiry and sync it to your HubSpot/Salesforce CRM instantly. Would you like me to book a demo call with our sales director?",
        budget: "Understood. What is your approximate monthly budget range? ($1k-$5k / $5k-$20k / $20k+)",
        timeline: "Perfect. When are you looking to launch your AI agents? (ASAP / This month / Next quarter)"
      }
    },
    'support': {
      id: 'support',
      name: 'Customer Support Bot',
      avatar: '🎧',
      welcome: "Hello! 👋 Welcome to Support. What issue can I resolve for you right now?",
      responses: {
        default: "I've checked our knowledge base and found a solution! I can walk you through step-by-step or issue an instant resolution.",
        refund: "I can process returns directly via WhatsApp. Could you share your order ID?",
        tracking: "Order tracking active! Please enter your tracking or order number."
      }
    },
    'booking': {
      id: 'booking',
      name: 'Appointment Booking Bot',
      avatar: '📅',
      welcome: "Hi! 👋 I can schedule your consultation or appointment. What day works best?",
      responses: {
        default: "I have available slots tomorrow at 10:00 AM, 2:00 PM, and 4:30 PM. Which one would you prefer?",
        confirm: "Confirmed! Calendar invite sent with a WhatsApp reminder 1 hour prior to the meeting."
      }
    },
    'ecommerce': {
      id: 'ecommerce',
      name: 'E-Commerce Bot',
      avatar: '🛒',
      welcome: "Welcome to our store! 👋 Looking for product recommendations or order assistance?",
      responses: {
        default: "Here are top-rated items matching your query! I can also offer a 10% instant WhatsApp checkout code.",
        track: "Your package is in transit! Estimated delivery: Tomorrow by 2:00 PM.",
        cart: "I see items remaining in your cart. Would you like me to generate a 1-click WhatsApp checkout link?"
      }
    },
    'faq': {
      id: 'faq',
      name: 'Knowledge Base FAQ Bot',
      avatar: '❓',
      welcome: "Hi! 👋 Ask me anything about our API, Meta verification, pricing, or SLAs.",
      responses: {
        default: "Actionpackd connects directly to Meta's Cloud API with official WhatsApp green badge support, 0.38s average response latency, and SOC2 compliance.",
        pricing: "Plans start at $0 for Sandbox, $99/mo for Pro, and custom Enterprise SLAs with dedicated GPU nodes.",
        integrations: "We support 200+ tools including Stripe, HubSpot, Salesforce, Twilio, Shopify, and Webhooks."
      }
    },
    'feedback': {
      id: 'feedback',
      name: 'NPS & Survey Bot',
      avatar: '⭐',
      welcome: "Hi! 👋 On a scale of 1-10, how likely are you to recommend Actionpackd to a colleague?",
      responses: {
        default: "Thank you for the rating! What was the main reason for your score?",
        followup: "We appreciate your feedback! A representative will reach out shortly."
      }
    }
  }

  const tryBotTemplate = (id) => {
    const template = botTemplates[id]
    if (!template) return
    setBotModal({ open: true, template })
    setBotMessages([{ type: 'bot', text: template.welcome }])
  }

  const closeBotModal = () => {
    setBotModal({ open: false, template: null })
    setBotMessages([])
    setBotInput('')
  }

  const sendBotMessage = () => {
    if (!botInput.trim() || !botModal.template) return
    const userMsg = botInput.trim()
    setBotMessages(prev => [...prev, { type: 'user', text: userMsg }])
    setBotInput('')
    setTimeout(() => {
      const lower = userMsg.toLowerCase()
      const r = botModal.template.responses
      let response = r.default
      if (lower.includes('budget') || lower.includes('cost') || lower.includes('price')) response = r.budget || r.pricing || r.default
      else if (lower.includes('time') || lower.includes('when') || lower.includes('schedule')) response = r.timeline || r.confirm || r.default
      else if (lower.includes('refund') || lower.includes('return')) response = r.refund || r.default
      else if (lower.includes('track') || lower.includes('order') || lower.includes('where')) response = r.tracking || r.track || r.default
      else if (lower.includes('cart') || lower.includes('buy') || lower.includes('discount')) response = r.cart || r.default
      else if (lower.includes('integrat') || lower.includes('api') || lower.includes('connect')) response = r.integrations || r.default
      setBotMessages(prev => [...prev, { type: 'bot', text: response }])
    }, 550)
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal()
        closeBotModal()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  const CheckIcon = ({ color = '#FF003C', size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className="shrink-0">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  )

  const integrations = [
    { name: 'WhatsApp', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg' },
    { name: 'Stripe', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg' },
    { name: 'HubSpot', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hubspot.svg' },
    { name: 'Salesforce', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/salesforce.svg' },
    { name: 'Twilio', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/twilio.svg' },
    { name: 'Shopify', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg' },
    { name: 'Notion', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg' },
    { name: 'Calendly', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/calendly.svg' },
    { name: 'Airtable', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/airtable.svg' },
    { name: 'Google', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googleanalytics.svg' },
    { name: 'Mailchimp', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mailchimp.svg' },
    { name: '+200 More', logo: '/assets/logo_mascot.png' }
  ]

  const faqs = [
    {
      q: "What is the approval process for Meta WhatsApp Business API?",
      a: "Actionpackd is an official Meta Business Partner. We provide instantaneous sandbox provisioning and guided 1-click Meta verification for your business profile, phone number, and message templates."
    },
    {
      q: "Can I connect my existing knowledge bases and CRMs?",
      a: "Yes! Actionpackd offers 200+ native integrations (HubSpot, Salesforce, Stripe, Shopify, Zendesk, Notion) plus direct vector synchronization for PDFs, website URLs, and custom API webhooks."
    },
    {
      q: "How does human agent handoff work?",
      a: "When an AI agent detects complex customer queries or low confidence scores, it automatically transfers the chat to your shared team inbox with full conversation history and internal AI notes."
    },
    {
      q: "Do I need coding knowledge to build AI agents?",
      a: "Zero coding is required. You can choose from pre-built bot templates or construct custom agent workflows using our drag-and-drop visual builder."
    },
    {
      q: "Is customer data secure and SOC2 compliant?",
      a: "Yes, we adhere to strict enterprise security standards including SOC2 Type II compliance, TLS 1.3 encryption in transit, AES-256 at rest, and zero data-retention privacy options."
    }
  ]

  return (
    <div className="min-h-screen bg-white text-[#090A0F] bg-grid-light relative overflow-x-hidden">
      
      {/* AMBIENT BACKGROUND BLOBS */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[900px] h-[500px] blob-red-glow rounded-full pointer-events-none z-0 animate-blob"></div>
      <div className="fixed bottom-20 right-10 w-[600px] h-[600px] blob-black-glow rounded-full pointer-events-none z-0 animate-blob" style={{ animationDelay: '4s' }}></div>

      {/* FLOATING PILL NAVBAR */}
      <header className="fixed top-4 left-4 right-4 max-w-6xl mx-auto z-50">
        <div className="floating-nav rounded-full px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img src="/assets/logo_horizontal.png" alt="Actionpackd Logo" className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform" />
          </a>

          {/* NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#090A0F]">
            <a href="#see-in-action" className="px-3.5 py-1.5 rounded-full hover:text-[#FF003C] hover:bg-slate-100/80 transition-colors">Interactive Demo</a>
            <a href="#features" className="px-3.5 py-1.5 rounded-full hover:text-[#FF003C] hover:bg-slate-100/80 transition-colors">Features</a>
            <a href="#bot-templates" className="px-3.5 py-1.5 rounded-full hover:text-[#FF003C] hover:bg-slate-100/80 transition-colors flex items-center gap-1.5">
              <span>Bot Templates</span>
              <span className="bg-[#FF003C] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">LIVE</span>
            </a>
            <a href="#pricing" className="px-3.5 py-1.5 rounded-full hover:text-[#FF003C] hover:bg-slate-100/80 transition-colors">Pricing</a>
            <a href="#faq" className="px-3.5 py-1.5 rounded-full hover:text-[#FF003C] hover:bg-slate-100/80 transition-colors">FAQ</a>
          </nav>

          {/* META VERIFIED & CTA BUTTONS */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#090A0F] border border-slate-800 rounded-full">
              <CheckIcon color="#FF003C" size={14} />
              <span className="text-[10px] font-mono text-white font-bold uppercase tracking-wider">Meta Approved</span>
            </div>
            <button
              onClick={() => openModal('Start Free Sandbox', 'Get instant access to Actionpackd AI Agent Builder. No credit card required.')}
              className="btn-primary px-6 py-2.5 rounded-full font-outfit font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-rose-500/20"
            >
              <span>Start Free</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <button className="lg:hidden p-1.5 text-[#090A0F]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-2xl bg-white border-2 border-[#090A0F] p-4 shadow-2xl lg:hidden text-xs font-semibold space-y-2 animate-slide-up">
            <a href="#see-in-action" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-[#090A0F] hover:bg-rose-50 rounded-lg">Interactive Demo</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-[#090A0F] hover:bg-rose-50 rounded-lg">Features</a>
            <a href="#bot-templates" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-[#090A0F] hover:bg-rose-50 rounded-lg">Bot Templates</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-[#090A0F] hover:bg-rose-50 rounded-lg">Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-[#090A0F] hover:bg-rose-50 rounded-lg">FAQ</a>
          </div>
        )}
      </header>

      {/* TOP BLACK & RED ANNOUNCEMENT BANNER */}
      <div className="pt-24 pb-2 bg-[#090A0F] text-white border-b border-slate-800 text-center text-xs font-mono flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 bg-[#FF003C] text-white rounded-full font-bold text-[10px] uppercase flex items-center gap-1">
          <CheckIcon color="#FFFFFF" size={12} /> META PARTNER
        </span>
        <span className="text-slate-300">WhatsApp Business API Cloud v20.0 Released</span>
        <a href="#bot-templates" className="text-[#FF003C] font-bold underline hover:text-[#FF2A55] ml-1">Explore Templates →</a>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* EYEBROW BADGE */}
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#090A0F] text-white border border-slate-800 text-xs font-mono mb-8 shadow-md">
              <CheckIcon color="#FF003C" size={16} />
              <span className="text-slate-400 uppercase tracking-wider text-[11px]">WhatsApp Business API:</span>
              <span className="text-[#FF003C] font-extrabold text-[11px] uppercase">META APPROVED & VERIFIED</span>
            </div>
          </AnimatedSection>

          {/* MAIN HERO HEADLINE */}
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-extrabold tracking-tight text-[#090A0F] leading-[1.08] max-w-4xl mx-auto mb-6">
              Build AI agents that<br className="hidden sm:inline" /> actually <span className="gradient-text-red">convert customers.</span>
            </h1>
          </AnimatedSection>

          {/* SUB-HEAD */}
          <AnimatedSection delay={0.2}>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed mb-8">
              Actionpackd lets you build, deploy, and scale intelligent AI agents across WhatsApp, Web Chat, Voice, and Email in minutes. No code required.
            </p>
          </AnimatedSection>

          {/* HERO CTA BUTTONS */}
          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <button
                onClick={() => openModal('Start Free Sandbox', 'Deploy your first AI agent on WhatsApp in under 5 minutes.')}
                className="btn-primary px-8 py-4 rounded-full font-outfit font-bold text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-rose-500/25"
              >
                <span>Start Building Free</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <a
                href="#bot-templates"
                className="btn-black px-8 py-4 rounded-full font-outfit font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <img src="/assets/logo_mascot.png" alt="Mascot" className="w-5 h-5 object-contain" />
                <span>Try Bot Templates</span>
              </a>
            </div>
          </AnimatedSection>

          {/* HERO METRICS STRIP */}
          <AnimatedSection delay={0.4}>
            <div className="max-w-3xl mx-auto bg-[#090A0F] text-white border border-slate-800 rounded-2xl p-4 mb-12 font-mono text-xs grid grid-cols-3 gap-4 divide-x divide-slate-800 text-center shadow-xl">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Deploy Time</div>
                <div className="text-[#FF003C] font-extrabold text-base sm:text-xl mt-1">5 Minutes</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Global Uptime</div>
                <div className="text-white font-extrabold text-base sm:text-xl mt-1">99.99%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Live AI Agents</div>
                <div className="text-[#FF003C] font-extrabold text-base sm:text-xl mt-1">18,400+</div>
              </div>
            </div>
          </AnimatedSection>

          {/* INTERACTIVE HERO AI MOCKUP WINDOW WITH REMOTION */}
          <AnimatedSection delay={0.5}>
            <div className="max-w-4xl mx-auto rounded-3xl border-2 border-[#090A0F] bg-white shadow-2xl shadow-rose-500/10 overflow-hidden relative text-left aspect-[16/10] sm:aspect-[16/9]">
              <Player
                component={HeroConsoleVideo}
                durationInFrames={300}
                compositionWidth={1280}
                compositionHeight={760}
                fps={30}
                controls
                autoPlay
                loop
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          </AnimatedSection>

          {/* REMOTION VIDEO DEMO SHOWCASE */}
          <AnimatedSection delay={0.6} className="mt-20">
            <div className="max-w-4xl mx-auto text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#090A0F] text-[#FF003C] border border-[#FF003C]/40 font-mono text-xs font-bold uppercase tracking-widest mb-3 shadow-md">
                🎬 REMOTION DYNAMIC MOTION SHOWCASE
              </div>
              <h3 className="text-2xl sm:text-3xl font-outfit font-extrabold text-[#090A0F] tracking-tight">
                Watch Actionpackd in Motion.
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-lg mx-auto mt-2">
                Programmatic frame animations, dynamic physics, and Black, Red & White brand color system.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border-2 border-[#FF003C] shadow-2xl shadow-rose-500/30 bg-[#090A0F] aspect-video max-w-4xl mx-auto group">
              <Player
                component={ActionpackdPromoVideo}
                durationInFrames={300}
                compositionWidth={1280}
                compositionHeight={720}
                fps={30}
                controls
                autoPlay
                loop
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* MANYCHAT-STYLE: "TURN COMMENTS INTO CONVERSATIONS THAT SELL" SECTION */}
      <TurnCommentsToSalesSection onStartFree={() => openModal('Start Free Sandbox', 'Get instant access to Actionpackd Comment Auto-DM & AI Bot builder.')} />

      {/* LOGO STRIP / INTEGRATIONS OVERVIEW */}
      <section className="py-14 border-b border-slate-200 bg-[#090A0F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-8 font-semibold">
            Seamlessly Integrated with 200+ Enterprise Tools
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center">
            {integrations.map((int, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#14161C] border border-slate-700/80 shadow-md hover:border-[#FF003C] hover:bg-[#1C1F28] transition-all w-full justify-center group">
                <img
                  src={int.logo}
                  alt={int.name}
                  className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                  style={{ filter: int.name === '+200 More' ? 'none' : 'brightness(0) invert(1)' }}
                />
                <span className="text-xs font-mono font-bold text-white tracking-wide">{int.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANYCHAT-STYLE: "SEE IT IN ACTION..." INTERACTIVE FLOW SWITCHER */}
      <div id="see-in-action">
        <SeeItInActionSection />
      </div>

      {/* BENTO GRID FEATURE SECTION */}
      <section id="features" className="py-24 border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#090A0F] text-[#FF003C] border border-slate-800 font-mono text-xs font-bold uppercase tracking-widest mb-3">
                  // PLATFORM CAPABILITIES
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-[#090A0F] tracking-tight">
                  Everything required to <span className="gradient-text-red">scale conversations.</span>
                </h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base max-w-md font-sans leading-relaxed">
                A unified AI infrastructure designed for WhatsApp automation, omni-channel customer support, and instant lead conversions.
              </p>
            </div>
          </AnimatedSection>

          {/* BENTO GRID 12-COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* FEATURE 1 (LARGE SPAN 8 COLS - DARK OBSIDIAN BENTO) */}
            <div className="md:col-span-8">
              <AnimatedSection delay={0.05}>
                <div className="bento-card-dark p-8 h-full flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#FF003C] text-white border border-[#FF003C] flex items-center justify-center text-2xl shadow-lg shadow-rose-500/30">
                        📡
                      </div>
                      <span className="px-3 py-1 text-xs font-mono bg-[#FF003C] text-white rounded-full font-bold uppercase">
                        Meta Approved API
                      </span>
                    </div>
                    <h3 className="text-2xl font-outfit font-bold text-white mb-3">
                      Omni-Channel AI Hub & WhatsApp Business API
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl">
                      Connect your official WhatsApp Business number alongside Web Chat, Twilio Voice, and Email webhooks in a single unified control center. Zero complex webhook configuration.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 bg-[#14161C] border border-slate-800 rounded-xl p-4 font-mono text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase">WhatsApp API</div>
                      <div className="text-[#FF003C] font-bold mt-1">Active ●</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase">Web Chat</div>
                      <div className="text-white font-bold mt-1">Active ●</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase">Voice Dispatch</div>
                      <div className="text-[#FF003C] font-bold mt-1">Active ●</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* FEATURE 2 (SPAN 4 COLS - LIGHT BENTO) */}
            <div className="md:col-span-4">
              <AnimatedSection delay={0.1}>
                <div className="bento-card-light p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#090A0F] text-white flex items-center justify-center text-2xl mb-6">
                      🤖
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-[#090A0F] mb-2">Visual Bot Builder</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      Drag-and-drop conversational logic. Sync knowledge bases, PDFs, and internal databases with zero code.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs text-[#090A0F]">
                    <div className="flex items-center justify-between mb-1">
                      <span>Vector Sync:</span>
                      <span className="text-[#FF003C] font-bold">100% Ready</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#FF003C] h-full w-full"></div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* FEATURE 3 (SPAN 4 COLS - LIGHT BENTO) */}
            <div className="md:col-span-4">
              <AnimatedSection delay={0.15}>
                <div className="bento-card-light p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#090A0F] text-white flex items-center justify-center text-2xl mb-6">
                      📢
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-[#090A0F] mb-2">Broadcast Campaigns</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      Send segmented, personalized WhatsApp broadcasts with automated abandoned cart recovery flows.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs">
                    <div className="text-slate-500 text-[10px] uppercase">Cart Recovery Rate</div>
                    <div className="text-2xl font-extrabold text-[#FF003C] mt-1">89.4%</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* FEATURE 4 (SPAN 4 COLS - DARK BENTO) */}
            <div className="md:col-span-4">
              <AnimatedSection delay={0.2}>
                <div className="bento-card-dark p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#FF003C] text-white flex items-center justify-center text-2xl mb-6">
                      📥
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-white mb-2">Shared Team Inbox</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Let AI handle initial support triage, then pass off to human team members with internal notes.
                    </p>
                  </div>
                  <div className="bg-[#14161C] border border-slate-800 rounded-xl p-3.5 font-mono text-xs">
                    <div className="text-slate-400 text-[10px] uppercase">AI Resolution Rate</div>
                    <div className="text-2xl font-extrabold text-white mt-1">94.2%</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* FEATURE 5 (SPAN 4 COLS - LIGHT BENTO) */}
            <div className="md:col-span-4">
              <AnimatedSection delay={0.25}>
                <div className="bento-card-light p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#090A0F] text-white flex items-center justify-center text-2xl mb-6">
                      📊
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-[#090A0F] mb-2">Real-Time Analytics</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      Deep telemetry on response times, customer sentiment index, and automated conversion rates.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs">
                    <div className="text-slate-500 text-[10px] uppercase">Average Response Latency</div>
                    <div className="text-2xl font-extrabold text-[#FF003C] mt-1">0.38 Seconds</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* MANYCHAT-STYLE: "BEFORE VS AFTER ACTIONPACKD" OVERLAPPING CARDS */}
      <BeforeAfterComparisonSection onStartFree={() => openModal('Start Free Sandbox', 'Deploy Actionpackd AI agents today.')} />

      {/* INTERACTIVE PRE-BUILT BOT TEMPLATES (DARK OBSIDIAN SECTION) */}
      <section id="bot-templates" className="py-24 border-b border-slate-800 bg-[#090A0F] text-white bg-grid-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#14161C] border border-[#FF003C]/40 mb-4 shadow-sm">
                <CheckIcon color="#FF003C" size={16} />
                <span className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-wider">
                  Meta Verified Bot Templates
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-white tracking-tight">
                Pre-built WhatsApp bots. <span className="gradient-text-red">Try live.</span>
              </h2>
              <p className="text-slate-400 text-sm font-sans mt-3 max-w-xl mx-auto">
                Launch production-ready WhatsApp AI agents in seconds. Click "Try Bot Live" to open a live interactive chat simulator!
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(botTemplates).map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.08}>
                <div className="bento-card-dark overflow-hidden flex flex-col justify-between h-full hover:border-[#FF003C] transition-all">
                  <div className="h-2 bg-[#FF003C]"></div>
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#14161C] flex items-center justify-center text-2xl border border-slate-800">
                        {t.avatar}
                      </div>
                      <span className="px-2.5 py-1 text-[10px] font-mono bg-[#FF003C]/20 text-[#FF003C] border border-[#FF003C]/40 rounded-full uppercase font-bold flex items-center gap-1">
                        <CheckIcon color="#FF003C" size={12} /> Meta Ready
                      </span>
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-white mb-2">{t.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{t.welcome}</p>
                    <button
                      onClick={() => tryBotTemplate(t.id)}
                      className="btn-primary w-full py-3 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C22 6.45 17.5 2 12.04 2z"/></svg>
                      Try Bot Live
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* META PARTNER HIGHLIGHT SECTION */}
      <section className="py-20 border-b border-slate-200 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="rounded-3xl bg-[#090A0F] text-white border-2 border-slate-800 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14161C] border border-[#FF003C]/40 mb-4 shadow-sm">
                  <CheckIcon color="#FF003C" size={20} />
                  <span className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-wider">
                    Official Meta Business Partner
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-white tracking-tight mb-4">
                  Officially Approved for WhatsApp Business API.
                </h2>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Actionpackd is a verified Meta Business Partner. Deploy enterprise WhatsApp messaging with official templates, green badge verification, and compliance out of the box.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full bg-[#14161C] border-4 border-[#FF003C] flex items-center justify-center shadow-lg shadow-rose-500/30">
                  <img src="/assets/logo_mascot.png" alt="Mascot" className="w-20 h-20 object-contain" />
                </div>
                <div className="text-center">
                  <div className="text-[#FF003C] font-mono text-sm font-bold uppercase tracking-wider">Verified Partner</div>
                  <div className="text-slate-400 text-xs font-mono">Meta Cloud API</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SOLUTIONS BY INDUSTRY */}
      <section id="solutions" className="py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// INDUSTRY SOLUTIONS</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-[#090A0F] tracking-tight">
                Tailored for <span className="gradient-text-red">every industry sector.</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🛒', title: 'E-Commerce & Retail', desc: 'Automated order tracking, product upsells, and 24/7 cart recovery automations on WhatsApp.' },
              { icon: '🏠', title: 'Real Estate & Property', desc: 'Property inquiry filtering, tour scheduling, and instant lead pre-qualification.' },
              { icon: '🎓', title: 'Education & Academies', desc: 'Student onboarding, 24/7 course FAQ resolution, and assignment reminders.' },
              { icon: '🏥', title: 'Healthcare & Clinics', desc: 'Automated appointment booking, patient intake triage, and SMS/WhatsApp follow-ups.' },
              { icon: '🎫', title: 'Events & Entertainment', desc: 'Ticket inquiries, schedule announcements, and venue guidance.' },
              { icon: '🏢', title: 'Custom Enterprise', desc: 'Custom API mesh, dedicated GPU nodes, SOC2 compliance, and zero data retention.' }
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="bento-card-light p-7 bg-white h-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#090A0F] text-white flex items-center justify-center text-2xl mb-4">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-[#090A0F] mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE VOLUME / SAVINGS CALCULATOR */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#090A0F] text-[#FF003C] border border-slate-800 font-mono text-xs font-bold uppercase tracking-widest mb-4">
              // ROI CALCULATOR
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-[#090A0F] mb-4">
              Calculate your support cost savings.
            </h2>
            <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto mb-10">
              Drag the slider to match your monthly customer conversation volume:
            </p>

            <div className="bg-[#090A0F] text-white border-2 border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
              <div className="flex items-center justify-between mb-4 font-mono text-xs text-slate-300">
                <span>Monthly Conversations:</span>
                <span className="text-[#FF003C] font-extrabold text-xl">{monthlyVolume.toLocaleString()} msgs</span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="w-full accent-[#FF003C] cursor-pointer mb-8"
              />

              <div className="grid grid-cols-2 gap-4 text-center divide-x divide-slate-800 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-slate-400 text-xs font-mono uppercase">Human Support Hours Saved</div>
                  <div className="text-3xl sm:text-4xl font-outfit font-extrabold text-white mt-1">
                    {Math.round(monthlyVolume * 0.08).toLocaleString()} hrs
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-mono uppercase">Est. Monthly Cost Saved</div>
                  <div className="text-3xl sm:text-4xl font-outfit font-extrabold text-[#FF003C] mt-1">
                    ${Math.round(monthlyVolume * 0.42).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section id="pricing" className="py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// PRICING</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-[#090A0F] tracking-tight">
                Simple, <span className="gradient-text-red">transparent tiers.</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'FREE SANDBOX',
                price: '$0',
                period: '/ month',
                desc: 'Perfect for building and testing AI agents on web chat and test channels.',
                features: ['2 Active AI Agents', '1,000 Messages / mo', 'Web Chat & API Webhooks', 'Bot Template Access'],
                featured: false,
                cta: 'Start Building Free'
              },
              {
                name: 'PRO AUTOMATION',
                price: '$99',
                period: '/ month',
                desc: 'Full multi-channel deployment with official WhatsApp Business API.',
                features: ['15 Active AI Agents', '50,000 Messages / mo', 'WhatsApp Business API', 'Twilio Voice API', 'Real-Time Analytics', 'Meta Verified Partner Badge'],
                featured: true,
                cta: 'Get Started with Pro'
              },
              {
                name: 'ENTERPRISE SLA',
                price: 'Custom',
                period: '',
                desc: 'Dedicated infrastructure, custom SLAs, and zero data-retention privacy.',
                features: ['Unlimited AI Agents', 'Dedicated GPU Nodes', '99.99% Guaranteed SLA', 'Custom API Integrations', 'SOC2 / HIPAA Compliance'],
                featured: false,
                cta: 'Contact Sales'
              }
            ].map((tier, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`rounded-3xl p-8 flex flex-col justify-between relative h-full transition-all ${
                  tier.featured ? 'bg-[#090A0F] text-white border-2 border-[#FF003C] shadow-2xl shadow-rose-500/20' : 'bg-white text-[#090A0F] border-2 border-slate-200 shadow-sm'
                }`}>
                  {tier.featured && (
                    <div className="absolute -top-3.5 right-6 bg-[#FF003C] text-white px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                      MOST POPULAR
                    </div>
                  )}
                  <div>
                    <div className={`text-xs font-mono uppercase mb-2 font-bold ${tier.featured ? 'text-[#FF003C]' : 'text-slate-500'}`}>{tier.name}</div>
                    <div className="text-4xl font-outfit font-extrabold mb-3">
                      {tier.price} <span className={`text-xs font-mono font-normal ${tier.featured ? 'text-slate-400' : 'text-slate-500'}`}>{tier.period}</span>
                    </div>
                    <p className={`text-xs mb-6 ${tier.featured ? 'text-[#090A0F]' : 'text-slate-600'}`}>{tier.desc}</p>
                    <ul className="space-y-3 text-xs font-sans mb-8">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2.5">
                          <CheckIcon color="#FF003C" size={16} />
                          <span className={f.includes('Meta') ? 'font-bold' : ''}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => openModal(tier.cta, `Get started with the Actionpackd ${tier.name} plan.`)}
                    className={`w-full py-3.5 font-outfit font-bold text-xs uppercase tracking-wider rounded-xl ${
                      tier.featured
                        ? 'btn-primary shadow-lg shadow-rose-500/30'
                        : 'btn-black'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="py-24 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-[#090A0F] tracking-tight">
                Got questions? <span className="gradient-text-red">We've got answers.</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="bento-card-light overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full p-6 text-left font-outfit font-bold text-[#090A0F] flex items-center justify-between text-base sm:text-lg"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#FF003C] font-mono text-xl font-bold">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed font-sans border-t border-slate-100 pt-4 animate-slide-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER (DEEP OBSIDIAN BLACK) */}
      <footer className="bg-[#090A0F] text-white border-t border-slate-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img src="/assets/logo_horizontal.png" alt="Actionpackd" className="h-10 w-auto object-contain" style={{ filter: 'brightness(1.1)' }} />
              </div>
              <p className="text-slate-400 text-xs font-sans max-w-sm leading-relaxed">
                Modern AI Agent Automation Platform for WhatsApp Business API, Web Chat, Voice, and Email workflows.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF003C] pt-2 font-bold">
                <CheckIcon color="#FF003C" size={16} />
                <span>Meta Business Partner · Official WhatsApp API</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-sans">
                <li><a href="#features" className="hover:text-white transition-colors">Omni-Channel Hub</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Visual Flow Builder</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Broadcast Campaigns</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Shared Inbox</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-sans">
                <li><a href="#bot-templates" className="hover:text-white transition-colors">Bot Templates</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Support</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Tiers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">Security</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-sans">
                <li><span className="text-[#FF003C] font-bold">Meta Approved</span></li>
                <li><span>SOC2 Type II</span></li>
                <li><span>Zero Retention Option</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
            <div>© 2026 Actionpackd Inc. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span className="text-[#FF003C]">● Meta Verified</span>
              <span>●</span>
              <span className="text-white">99.99% Uptime SLA</span>
            </div>
          </div>
        </div>
      </footer>

      {/* CTA MODAL */}
      {modal.open && (
        <div className="fixed inset-0 bg-[#090A0F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white border-2 border-[#090A0F] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <img src="/assets/logo_mascot.png" alt="Mascot" className="w-8 h-8 object-contain" />
                <h3 className="font-outfit font-extrabold text-base text-[#090A0F]">{modal.title}</h3>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-[#090A0F] font-mono text-lg">✕</button>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-6 font-sans">{modal.body}</p>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); alert('⚡ Welcome to Actionpackd! Account setup complete.') }} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase font-bold">WORK EMAIL</label>
                <input type="email" placeholder="you@company.com" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-[#090A0F] placeholder-slate-400 focus:outline-none focus:border-[#FF003C] font-mono" />
              </div>
              <button type="submit" className="btn-primary w-full py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider">
                Get Started →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WHATSAPP BOT TEMPLATE SIMULATOR MODAL */}
      {botModal.open && botModal.template && (
        <div className="fixed inset-0 bg-[#090A0F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeBotModal()}>
          <div className="bg-[#EFEAE2] border-2 border-[#FF003C] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            
            {/* WHATSAPP APP BAR */}
            <div className="bg-[#1F2C34] p-4 flex items-center gap-3">
              <button onClick={closeBotModal} className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF003C] to-[#090A0F] flex items-center justify-center text-white font-bold text-lg shadow-sm border border-[#FF003C]">
                {botModal.template.avatar}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">{botModal.template.name}</div>
                <div className="text-[#FF003C] text-xs flex items-center gap-1 font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF003C] animate-pulse"></span>online · Meta Verified
                </div>
              </div>
              <CheckIcon color="#FF003C" size={20} />
            </div>

            {/* CHAT BUBBLES */}
            <div className="p-4 min-h-[320px] max-h-[400px] overflow-y-auto flex flex-col gap-2.5">
              {botMessages.map((msg, i) => (
                <div key={i} className={`wa-bubble ${msg.type === 'bot' ? 'wa-bubble-bot' : 'wa-bubble-user'} animate-slide-up`}>
                  {msg.text}
                  <span className="wa-tick">✓✓</span>
                </div>
              ))}
            </div>

            {/* CHAT INPUT BAR */}
            <div className="p-3 bg-[#1F2C34] flex items-center gap-2">
              <input
                value={botInput}
                onChange={(e) => setBotInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendBotMessage()}
                type="text"
                placeholder="Type a test message to the AI bot..."
                className="flex-1 bg-[#2A3942] text-white text-xs rounded-full px-4 py-2.5 border-none focus:outline-none placeholder-gray-400 font-sans"
              />
              <button
                onClick={sendBotMessage}
                className="w-10 h-10 rounded-full bg-[#FF003C] flex items-center justify-center hover:bg-[#E60036] transition-colors shrink-0 shadow-sm"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}