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

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modal, setModal] = useState({ open: false, title: '', body: '' })
  const [botModal, setBotModal] = useState({ open: false, template: null })
  const [botMessages, setBotMessages] = useState([])
  const [botInput, setBotInput] = useState('')
  const [channel, setChannel] = useState('whatsapp')
  const [heroInput, setHeroInput] = useState('')
  const [heroResponse, setHeroResponse] = useState('"Hi! Your order #4821 is out for delivery. I can schedule a delivery window for tomorrow between 10 AM – 12 PM. Shall I confirm?"')
  
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

  const channelResponses = {
    whatsapp: '"Hi! Your order #4821 is out for delivery. I can schedule a delivery window for tomorrow between 10 AM – 12 PM. Shall I confirm?"',
    web: '"Welcome to Actionpackd! I\'m your AI agent. How can I assist you today? I can answer questions, resolve tickets, or route you to sales."',
    voice: '"[Voice Agent Connected]: Please state your inquiry or account number. I can transfer you or handle your booking in real time."',
    email: '"[Email Automation Active]: Re: Ticket #4821 — Resolution details have been auto-generated with 99.4% confidence score."'
  }

  const switchChannel = (ch) => {
    setChannel(ch)
    setHeroResponse(channelResponses[ch])
  }

  const sendHeroMessage = () => {
    if (!heroInput.trim()) return
    setHeroResponse(`"${heroInput.trim()}" — Request logged. Executing workflow across ${channel.toUpperCase()} with 0.38s latency.`)
    setHeroInput('')
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

  const CheckIcon = ({ color = '#25D366', size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className="shrink-0">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  )

  const ChevronDown = () => (
    <svg className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
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
    { name: '+200 More', logo: '/assets/logo.png' }
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
    <div className="min-h-screen bg-white text-slate-900 bg-grid relative overflow-x-hidden">
      
      {/* AMBIENT BACKGROUND GLOW BLOBS */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[900px] h-[500px] blob-glow-1 rounded-full pointer-events-none z-0 animate-blob"></div>
      <div className="fixed bottom-20 right-10 w-[600px] h-[600px] blob-glow-2 rounded-full pointer-events-none z-0 animate-blob" style={{ animationDelay: '4s' }}></div>
      <div className="fixed top-1/3 left-10 w-[550px] h-[550px] blob-glow-3 rounded-full pointer-events-none z-0 animate-blob" style={{ animationDelay: '8s' }}></div>

      {/* FLOATING PILL NAVBAR */}
      <header className="fixed top-4 left-4 right-4 max-w-6xl mx-auto z-50">
        <div className="floating-nav rounded-full px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img src="/assets/logo_horizontal.png" alt="Actionpackd Logo" className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform" />
          </a>

          {/* NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
            <a href="#features" className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/80 transition-colors">Features</a>
            <a href="#bot-templates" className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/80 transition-colors flex items-center gap-1.5">
              <span>Bot Templates</span>
              <span className="bg-[#25D366] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">LIVE</span>
            </a>
            <a href="#solutions" className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/80 transition-colors">Solutions</a>
            <a href="#pricing" className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/80 transition-colors">Pricing</a>
            <a href="#faq" className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/80 transition-colors">FAQ</a>
          </nav>

          {/* META VERIFIED & CTA BUTTONS */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#F0FDF4] border border-[#25D366]/40 rounded-full">
              <CheckIcon color="#25D366" size={14} />
              <span className="text-[10px] font-mono text-[#25D366] font-bold uppercase tracking-wider">Meta Approved</span>
            </div>
            <button
              onClick={() => openModal('Start Free Sandbox', 'Get instant access to Actionpackd AI Agent Builder. No credit card required.')}
              className="btn-primary px-5 py-2 rounded-full bg-[#FF003C] text-white font-outfit font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 border border-[#FF003C]"
            >
              <span>Start Free</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <button className="lg:hidden p-1.5 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 p-4 shadow-xl lg:hidden text-xs font-semibold space-y-2 animate-slide-up">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-slate-700 hover:bg-slate-50 rounded-lg">Features</a>
            <a href="#bot-templates" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-slate-700 hover:bg-slate-50 rounded-lg">Bot Templates</a>
            <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-slate-700 hover:bg-slate-50 rounded-lg">Solutions</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-slate-700 hover:bg-slate-50 rounded-lg">Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-slate-700 hover:bg-slate-50 rounded-lg">FAQ</a>
          </div>
        )}
      </header>

      {/* TOP ANNOUNCEMENT BANNER */}
      <div className="pt-24 pb-2 bg-gradient-to-r from-slate-100 via-emerald-50 to-blue-50 border-b border-slate-200 text-center text-xs font-mono text-slate-600 flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 bg-[#25D366] text-white rounded-full font-bold text-[10px] uppercase flex items-center gap-1">
          <CheckIcon color="#FFFFFF" size={12} /> META PARTNER
        </span>
        <span>WhatsApp Business API Cloud v20.0 Released</span>
        <a href="#bot-templates" className="text-[#FF003C] font-bold underline hover:text-[#B00028] ml-1">Explore Templates →</a>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* EYEBROW BADGE */}
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F0FDF4] border border-[#25D366]/40 text-xs font-mono text-slate-700 mb-8 shadow-sm">
              <CheckIcon color="#25D366" size={16} />
              <span className="text-slate-500 uppercase tracking-wider text-[11px]">WhatsApp Business API:</span>
              <span className="text-[#25D366] font-extrabold text-[11px] uppercase">META APPROVED & VERIFIED</span>
            </div>
          </AnimatedSection>

          {/* MAIN HERO HEADLINE */}
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-extrabold tracking-tight text-slate-900 leading-[1.08] max-w-4xl mx-auto mb-6">
              Build AI agents that<br className="hidden sm:inline" /> actually <span className="gradient-text">convert customers.</span>
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
                className="btn-primary px-8 py-4 rounded-full bg-[#FF003C] text-white font-outfit font-bold text-base uppercase tracking-wider flex items-center justify-center gap-3 border border-[#FF003C] shadow-lg shadow-[#FF003C]/20"
              >
                <span>Start Building Free</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <a
                href="#bot-templates"
                className="btn-outline px-8 py-4 rounded-full bg-white text-slate-800 font-outfit font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-200 shadow-sm hover:text-[#25D366]"
              >
                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C22 6.45 17.5 2 12.04 2z"/></svg>
                <span>Try Bot Templates</span>
              </a>
            </div>
          </AnimatedSection>

          {/* HERO METRICS STRIP */}
          <AnimatedSection delay={0.4}>
            <div className="max-w-3xl mx-auto bg-slate-50/80 border border-slate-200/80 backdrop-blur-md rounded-2xl p-4 mb-12 font-mono text-xs text-slate-600 grid grid-cols-3 gap-4 divide-x divide-slate-200 text-center shadow-sm">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Deploy Time</div>
                <div className="text-[#3B82F6] font-extrabold text-base sm:text-xl mt-1">5 Minutes</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Global Uptime</div>
                <div className="text-[#FFB703] font-extrabold text-base sm:text-xl mt-1">99.99%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Live AI Agents</div>
                <div className="text-[#FF003C] font-extrabold text-base sm:text-xl mt-1">18,400+</div>
              </div>
            </div>
          </AnimatedSection>

          {/* INTERACTIVE HERO AI MOCKUP WINDOW WITH REMOTION */}
          <AnimatedSection delay={0.5}>
            <div className="max-w-4xl mx-auto rounded-3xl border-2 border-slate-200 bg-white shadow-2xl shadow-slate-200/80 overflow-hidden relative text-left aspect-[16/10] sm:aspect-[16/9]">
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
          <AnimatedSection delay={0.6} className="mt-16">
            <div className="max-w-4xl mx-auto text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-3">
                🎬 REMOTION DYNAMIC MOTION SHOWCASE
              </div>
              <h3 className="text-2xl sm:text-3xl font-outfit font-extrabold text-slate-900 tracking-tight">
                Watch Actionpackd in Motion.
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-lg mx-auto mt-2">
                Powered by Remotion with programmatic frame animations, dynamic physics, and brand color system.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border-2 border-[#FF003C]/40 shadow-2xl shadow-rose-500/20 bg-[#0A0B0F] aspect-video max-w-4xl mx-auto group">
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

      {/* LOGO STRIP / INTEGRATIONS OVERVIEW */}
      <section className="py-12 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-8 font-semibold">
            Seamlessly Integrated with 200+ Enterprise Tools
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center justify-items-center">
            {integrations.map((int, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#FF003C]/40 transition-all w-full justify-center">
                <img src={int.logo} alt={int.name} className="w-5 h-5 object-contain" />
                <span className="text-xs font-mono font-bold text-slate-700">{int.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURE SECTION */}
      <section id="features" className="py-24 border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-3">
                  // PLATFORM CAPABILITIES
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">
                  Everything required to <span className="gradient-text">scale conversations.</span>
                </h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base max-w-md font-sans leading-relaxed">
                A unified AI infrastructure designed for WhatsApp automation, omni-channel customer support, and instant lead conversions.
              </p>
            </div>
          </AnimatedSection>

          {/* BENTO GRID 12-COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* FEATURE 1 (LARGE SPAN 8 COLS) */}
            <div className="md:col-span-8">
              <AnimatedSection delay={0.05}>
                <div className="bento-card p-8 h-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white to-slate-50">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl">
                        📡
                      </div>
                      <span className="px-3 py-1 text-xs font-mono bg-[#F0FDF4] text-[#25D366] border border-[#25D366]/40 rounded-full font-bold uppercase">
                        Meta Approved API
                      </span>
                    </div>
                    <h3 className="text-2xl font-outfit font-bold text-slate-900 mb-3">
                      Omni-Channel AI Hub & WhatsApp Business API
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-xl">
                      Connect your official WhatsApp Business number alongside Web Chat, Twilio Voice, and Email webhooks in a single unified control center. Zero complex webhook configuration.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 bg-white border border-slate-200 rounded-xl p-4 font-mono text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase">WhatsApp API</div>
                      <div className="text-[#25D366] font-bold mt-1">Active ●</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase">Web Chat</div>
                      <div className="text-[#3B82F6] font-bold mt-1">Active ●</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase">Voice Dispatch</div>
                      <div className="text-[#FF003C] font-bold mt-1">Active ●</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* FEATURE 2 (SPAN 4 COLS) */}
            <div className="md:col-span-4">
              <AnimatedSection delay={0.1}>
                <div className="bento-card p-8 h-full flex flex-col justify-between bg-white">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl mb-6">
                      🤖
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-slate-900 mb-2">Visual Bot Builder</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      Drag-and-drop conversational logic. Sync knowledge bases, PDFs, and internal databases with zero code.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs text-slate-600">
                    <div className="flex items-center justify-between mb-1">
                      <span>Vector Sync:</span>
                      <span className="text-[#25D366] font-bold">100% Ready</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#25D366] h-full w-full"></div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* FEATURE 3 (SPAN 4 COLS) */}
            <div className="md:col-span-4">
              <AnimatedSection delay={0.15}>
                <div className="bento-card p-8 h-full flex flex-col justify-between bg-white">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl mb-6">
                      📢
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-slate-900 mb-2">Broadcast Campaigns</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      Send segmented, personalized WhatsApp broadcasts with automated abandoned cart recovery flows.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs">
                    <div className="text-slate-500 text-[10px] uppercase">Cart Recovery Rate</div>
                    <div className="text-2xl font-extrabold text-[#25D366] mt-1">89.4%</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* FEATURE 4 (SPAN 4 COLS) */}
            <div className="md:col-span-4">
              <AnimatedSection delay={0.2}>
                <div className="bento-card p-8 h-full flex flex-col justify-between bg-white">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-2xl mb-6">
                      📥
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-slate-900 mb-2">Shared Team Inbox</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      Let AI handle initial support triage, then pass off to human team members with internal notes.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs">
                    <div className="text-slate-500 text-[10px] uppercase">AI Resolution Rate</div>
                    <div className="text-2xl font-extrabold text-[#7C3AED] mt-1">94.2%</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* FEATURE 5 (SPAN 4 COLS) */}
            <div className="md:col-span-4">
              <AnimatedSection delay={0.25}>
                <div className="bento-card p-8 h-full flex flex-col justify-between bg-white">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-2xl mb-6">
                      📊
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-slate-900 mb-2">Real-Time Analytics</h3>
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

      {/* INTERACTIVE PRE-BUILT BOT TEMPLATES */}
      <section id="bot-templates" className="py-24 border-b border-slate-200 bg-slate-50/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#25D366]/40 mb-4 shadow-sm">
                <CheckIcon color="#25D366" size={16} />
                <span className="text-[#25D366] font-mono text-xs font-bold uppercase tracking-wider">
                  Meta Verified Bot Templates
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">
                Pre-built WhatsApp bots. <span className="gradient-text">Try live.</span>
              </h2>
              <p className="text-slate-600 text-sm font-sans mt-3 max-w-xl mx-auto">
                Launch production-ready WhatsApp AI agents in seconds. Click "Try Now" to open a live interactive chat simulator!
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(botTemplates).map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.08}>
                <div className="bento-card overflow-hidden bg-white flex flex-col justify-between h-full shadow-sm hover:shadow-xl">
                  <div className="h-2 bg-gradient-to-r from-[#FF003C] via-[#7C3AED] to-[#25D366]"></div>
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl border border-slate-200">
                        {t.avatar}
                      </div>
                      <span className="px-2.5 py-1 text-[10px] font-mono bg-[#F0FDF4] text-[#25D366] border border-[#25D366]/40 rounded-full uppercase font-bold flex items-center gap-1">
                        <CheckIcon color="#25D366" size={12} /> Meta Ready
                      </span>
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-slate-900 mb-2">{t.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{t.welcome}</p>
                    <button
                      onClick={() => tryBotTemplate(t.id)}
                      className="w-full py-3 rounded-xl bg-[#25D366] text-white font-outfit font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-colors shadow-md shadow-[#25D366]/20"
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
            <div className="rounded-3xl bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80 border border-[#25D366]/30 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-emerald-500/5">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0FDF4] border border-[#25D366]/40 mb-4 shadow-sm">
                  <CheckIcon color="#25D366" size={20} />
                  <span className="text-[#25D366] font-mono text-xs font-bold uppercase tracking-wider">
                    Official Meta Business Partner
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-900 tracking-tight mb-4">
                  Officially Approved for WhatsApp Business API.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Actionpackd is a verified Meta Business Partner. Deploy enterprise WhatsApp messaging with official templates, green badge verification, and compliance out of the box.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full bg-[#F0FDF4] border-4 border-[#25D366]/50 flex items-center justify-center shadow-lg shadow-[#25D366]/20 animate-pulse-soft">
                  <CheckIcon color="#25D366" size={64} />
                </div>
                <div className="text-center">
                  <div className="text-[#25D366] font-mono text-sm font-bold uppercase tracking-wider">Verified Partner</div>
                  <div className="text-slate-400 text-xs font-mono">Meta Cloud API</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SOLUTIONS BY INDUSTRY */}
      <section id="solutions" className="py-24 border-b border-slate-200 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// INDUSTRY SOLUTIONS</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">
                Tailored for <span className="gradient-text">every industry sector.</span>
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
                <div className="bento-card p-7 bg-white h-full">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl mb-4 border border-slate-200">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-slate-900 mb-2">{s.title}</h3>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#3B82F6] font-mono text-xs font-bold uppercase tracking-widest mb-4">
              // ROI CALCULATOR
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-900 mb-4">
              Calculate your support cost savings.
            </h2>
            <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto mb-10">
              Drag the slider to match your monthly customer conversation volume:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 max-w-2xl mx-auto shadow-md">
              <div className="flex items-center justify-between mb-4 font-mono text-xs text-slate-600">
                <span>Monthly Conversations:</span>
                <span className="text-[#FF003C] font-extrabold text-lg">{monthlyVolume.toLocaleString()} msgs</span>
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

              <div className="grid grid-cols-2 gap-4 text-center divide-x divide-slate-200 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-slate-400 text-xs font-mono uppercase">Human Support Hours Saved</div>
                  <div className="text-3xl sm:text-4xl font-outfit font-extrabold text-[#25D366] mt-1">
                    {Math.round(monthlyVolume * 0.08).toLocaleString()} hrs
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-mono uppercase">Est. Monthly Cost Saved</div>
                  <div className="text-3xl sm:text-4xl font-outfit font-extrabold text-[#3B82F6] mt-1">
                    ${Math.round(monthlyVolume * 0.42).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section id="pricing" className="py-24 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// PRICING</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">
                Simple, <span className="gradient-text">transparent tiers.</span>
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
                <div className={`rounded-3xl p-8 flex flex-col justify-between relative h-full bg-white transition-all ${
                  tier.featured ? 'border-2 border-[#FF003C] shadow-xl shadow-rose-500/10' : 'border border-slate-200 shadow-sm'
                }`}>
                  {tier.featured && (
                    <div className="absolute -top-3.5 right-6 bg-[#FF003C] text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                      MOST POPULAR
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase mb-2 font-bold">{tier.name}</div>
                    <div className="text-4xl font-outfit font-extrabold text-slate-900 mb-3">
                      {tier.price} <span className="text-xs font-mono text-slate-400 font-normal">{tier.period}</span>
                    </div>
                    <p className="text-slate-600 text-xs mb-6">{tier.desc}</p>
                    <ul className="space-y-3 text-xs text-slate-700 font-sans mb-8">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2.5">
                          <CheckIcon color={f.includes('Meta') ? '#25D366' : '#FF003C'} size={16} />
                          <span className={f.includes('Meta') ? 'font-bold text-slate-900' : ''}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => openModal(tier.cta, `Get started with the Actionpackd ${tier.name} plan.`)}
                    className={`w-full py-3.5 font-outfit font-bold text-xs uppercase tracking-wider rounded-xl border ${
                      tier.featured
                        ? 'btn-primary bg-[#FF003C] text-white border-[#FF003C]'
                        : 'btn-outline bg-transparent text-slate-900 border-slate-200'
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

      {/* PLATFORM TELEMETRY COUNTER */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Conversations Processed', target: 18450200, suffix: '+', color: '#3B82F6' },
              { label: 'Platform Uptime', target: 99, suffix: '.99%', color: '#FFB703' },
              { label: 'Supported Sectors', target: 52, suffix: '+', color: '#FF003C' },
              { label: 'Availability', value: '24/7/365', color: '#25D366' }
            ].map((s, i) => (
              <div key={i} className="bento-card p-6 bg-slate-50/60 border border-slate-200">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">{s.label}</div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono" style={{ color: s.color }}>
                  {s.value ? s.value : <CounterUp target={s.target} suffix={s.suffix} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="py-24 border-b border-slate-200 bg-slate-50/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-900 tracking-tight">
                Got questions? <span className="gradient-text">We've got answers.</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="bento-card overflow-hidden bg-white border border-slate-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full p-6 text-left font-outfit font-bold text-slate-900 flex items-center justify-between text-base sm:text-lg"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#FF003C] font-mono text-xl">{openFaq === i ? '−' : '+'}</span>
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

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img src="/assets/logo_horizontal.png" alt="Actionpackd" className="h-10 w-auto object-contain" />
              </div>
              <p className="text-slate-600 text-xs font-sans max-w-sm leading-relaxed">
                Modern AI Agent Automation Platform for WhatsApp Business API, Web Chat, Voice, and Email workflows.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#25D366] pt-2">
                <CheckIcon color="#25D366" size={16} />
                <span>Meta Business Partner · Official WhatsApp API</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2 text-xs text-slate-600 font-sans">
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Omni-Channel Hub</a></li>
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Visual Flow Builder</a></li>
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Broadcast Campaigns</a></li>
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Shared Inbox</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2 text-xs text-slate-600 font-sans">
                <li><a href="#bot-templates" className="hover:text-slate-900 transition-colors">Bot Templates</a></li>
                <li><a href="#faq" className="hover:text-slate-900 transition-colors">FAQ & Support</a></li>
                <li><a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing Tiers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4">Security</h4>
              <ul className="space-y-2 text-xs text-slate-600 font-sans">
                <li><span className="text-[#25D366] font-bold">Meta Approved</span></li>
                <li><span>SOC2 Type II</span></li>
                <li><span>Zero Retention Option</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4">
            <div>© 2026 Actionpackd Inc. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span className="text-[#25D366]">● Meta Verified</span>
              <span>●</span>
              <span className="text-[#3B82F6]">99.99% Uptime SLA</span>
            </div>
          </div>
        </div>
      </footer>

      {/* CTA MODAL */}
      {modal.open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-[#FF003C] overflow-hidden flex items-center justify-center">
                  <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="font-outfit font-extrabold text-base text-slate-900">{modal.title}</h3>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-900 font-mono text-lg">✕</button>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-6 font-sans">{modal.body}</p>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); alert('⚡ Welcome to Actionpackd! Account setup complete.') }} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase font-bold">WORK EMAIL</label>
                <input type="email" placeholder="you@company.com" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF003C] font-mono" />
              </div>
              <button type="submit" className="btn-primary w-full py-3.5 bg-[#FF003C] text-white font-outfit font-bold text-xs uppercase tracking-wider rounded-xl border border-[#FF003C]">
                Get Started →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WHATSAPP BOT TEMPLATE SIMULATOR MODAL */}
      {botModal.open && botModal.template && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeBotModal()}>
          <div className="bg-[#EFEAE2] border border-[#25D366]/40 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            
            {/* WHATSAPP APP BAR */}
            <div className="bg-[#1F2C34] p-4 flex items-center gap-3">
              <button onClick={closeBotModal} className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#3B82F6] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {botModal.template.avatar}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">{botModal.template.name}</div>
                <div className="text-[#25D366] text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>online · Meta Verified
                </div>
              </div>
              <CheckIcon color="#25D366" size={20} />
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
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#1ebe5d] transition-colors shrink-0 shadow-sm"
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