import React, { useState, useEffect, useRef } from 'react'

// ===================== SCROLL ANIMATION HOOK =====================
const useInView = (options = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.15, ...options })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

// ===================== ANIMATED COMPONENTS =====================

const AnimatedSection = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`
      }}
    >
      {children}
    </div>
  )
}

const CounterUp = ({ target, suffix = '', duration = 2000 }) => {
  const [ref, inView] = useInView()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>
}

// ===================== MAIN APP =====================

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modal, setModal] = useState({ open: false, title: '', body: '' })
  const [botModal, setBotModal] = useState({ open: false, template: null })
  const [botMessages, setBotMessages] = useState([])
  const [botInput, setBotInput] = useState('')
  const [channel, setChannel] = useState('whatsapp')
  const [heroInput, setHeroInput] = useState('')
  const [heroResponse, setHeroResponse] = useState('"Hi! Your order #4821 is out for delivery. I can schedule a delivery window for tomorrow between 10 AM – 12 PM. Shall I confirm?"')

  const openModal = (title, body) => setModal({ open: true, title, body })
  const closeModal = () => setModal({ open: false, title: '', body: '' })

  const botTemplates = {
    'lead-gen': {
      name: 'Lead Qualification Bot', avatar: '🎯',
      welcome: "Hi! 👋 I'm your AI lead qualification assistant. What's your name and what are you looking for today?",
      responses: {
        default: "Great! Based on what you've shared, I can qualify this lead and sync it to your CRM instantly. Would you like me to schedule a follow-up call?",
        budget: "Thanks! What's your approximate budget range? (Under $1k / $1k-$10k / $10k+)",
        timeline: "Perfect. What's your timeline for getting started? (ASAP / 1-3 months / Just exploring)"
      }
    },
    'support': {
      name: 'Customer Support Bot', avatar: '🎧',
      welcome: "Hello! 👋 I'm here to help. What issue can I assist you with today?",
      responses: {
        default: "I understand. Let me look into that for you... I found a solution! Would you like me to walk you through the steps?",
        refund: "I can help with refunds. Could you share your order number? I'll process it immediately.",
        tracking: "I can track your order! Please share your order number and I'll get the latest status."
      }
    },
    'booking': {
      name: 'Appointment Booking Bot', avatar: '📅',
      welcome: "Hi! 👋 I can help you book an appointment. What date works best for you?",
      responses: {
        default: "Great! I have these available slots: 10:00 AM, 12:00 PM, 2:00 PM, or 4:00 PM. Which one works for you?",
        confirm: "Perfect! Your appointment is confirmed. I've sent a calendar invite and a WhatsApp reminder for the day before."
      }
    },
    'ecommerce': {
      name: 'E-Commerce Bot', avatar: '🛒',
      welcome: "Welcome to our store! 👋 I can help you find products, track orders, or process returns. What do you need?",
      responses: {
        default: "I found some great options for you! Would you like to see product recommendations based on your preferences?",
        track: "I can track your order! Just share your order number and I'll give you real-time updates.",
        cart: "I noticed you left items in your cart. I can apply a 10% discount if you complete your purchase now! 🎉"
      }
    },
    'faq': {
      name: 'FAQ Bot', avatar: '❓',
      welcome: "Hi! 👋 Ask me anything about our product, pricing, or policies. I'm here to help!",
      responses: {
        default: "Great question! Based on our knowledge base, here's the answer: Yes, we support WhatsApp Business API with Meta verification. Anything else?",
        pricing: "Our pricing starts at $0 (Free Sandbox), $99/mo (Pro), and Custom (Enterprise). Would you like to start free?",
        integrations: "We integrate with 200+ tools including Stripe, HubSpot, Salesforce, Shopify, and Twilio. Want me to set one up?"
      }
    },
    'feedback': {
      name: 'Feedback & Survey Bot', avatar: '⭐',
      welcome: "Hi! 👋 We'd love your feedback. On a scale of 1-10, how likely are you to recommend us?",
      responses: {
        default: "Thank you! What's the main reason for your score? (Product quality / Support / Price / Other)",
        followup: "Thanks for sharing! Your feedback helps us improve. Would you like to leave a review on our website?"
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
      if (lower.includes('budget') || lower.includes('price') || lower.includes('cost')) response = r.budget || r.pricing || r.default
      else if (lower.includes('time') || lower.includes('when') || lower.includes('timeline')) response = r.timeline || r.default
      else if (lower.includes('refund') || lower.includes('return')) response = r.refund || r.default
      else if (lower.includes('track') || lower.includes('order') || lower.includes('where')) response = r.tracking || r.track || r.default
      else if (lower.includes('cart') || lower.includes('buy') || lower.includes('purchase')) response = r.cart || r.default
      else if (lower.includes('integrat') || lower.includes('connect') || lower.includes('api')) response = r.integrations || r.default
      else if (lower.includes('yes') || lower.includes('confirm') || lower.includes('sure')) response = r.confirm || r.followup || r.default
      setBotMessages(prev => [...prev, { type: 'bot', text: response }])
    }, 600)
  }

  const channelResponses = {
    whatsapp: '"Hi! Your order #4821 is out for delivery. I can schedule a delivery window for tomorrow between 10 AM – 12 PM. Shall I confirm?"',
    web: '"Welcome! I\'m your AI assistant. How can I help you today? I can answer questions about products, track orders, or connect you with support."',
    voice: '"Voice dispatch active. Connecting you to an AI agent. Please say your account number or describe your issue after the beep."',
    email: '"Email automation running. Your ticket #4821 has been received. An AI agent will respond within 0.38 seconds with a resolution."'
  }

  const switchChannel = (ch) => { setChannel(ch); setHeroResponse(channelResponses[ch]) }
  const sendHeroMessage = () => {
    if (!heroInput.trim()) return
    setHeroResponse(`"${heroInput.trim()}" — Got it! I'm processing your request with 99.2% confidence. An AI agent will handle this instantly across all connected channels.`)
    setHeroInput('')
  }

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') { closeModal(); closeBotModal() } }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [botModal])

  const features = [
    { img: '/assets/hermes_cockpit_hud.png', title: 'Omni-Channel', desc: 'Every channel, one platform — WhatsApp, web chat, Twilio voice, and email webhooks unified in a single inbox.', tag: 'Connect', tagColor: '#3B82F6', metric: [{ label: 'WhatsApp API', value: 'Active', color: '#25D366' }, { label: 'Web Live Chat', value: 'Active', color: '#3B82F6' }, { label: 'Twilio Voice', value: 'Active', color: '#FF003C' }] },
    { img: '/assets/hermes_telemetry_matrix.png', title: 'No-Code Bot Builder', desc: 'Drag-and-drop visual flow builder. Connect knowledge bases, PDFs, and APIs with zero code.', tag: 'Build', tagColor: '#FFB703', metric: [{ label: 'Knowledge Base Sync', value: '100%', color: '#FF003C' }, { label: '18,400 Vectors', value: 'Ready', color: '#25D366' }] },
    { img: '/assets/f1_hud_panel.png', title: 'Broadcast Campaigns', desc: 'Send mass personalized messages, trigger automated follow-ups, and recover abandoned carts.', tag: 'Automate', tagColor: '#3B82F6', metric: [{ label: '⚡ Trigger: Cart Abandoned', value: '', color: '#FF003C' }, { label: '↪ Action: WhatsApp Follow-up', value: '', color: '#3B82F6' }, { label: '✔ 89.4% Recovery Rate', value: '', color: '#25D366' }] },
    { img: '/assets/hermes_cockpit_hud.png', title: 'Shared Team Inbox', desc: 'Assign conversations, leave internal notes, and let AI handle the rest. One inbox for your whole team.', tag: 'Collaborate', tagColor: '#FFB703', metric: [{ label: 'Active Conversations', value: '1,240', color: '#3B82F6' }, { label: 'AI Handled', value: '94.2%', color: '#25D366' }, { label: 'Avg Response', value: '0.38s', color: '#FF003C' }] },
    { img: '/assets/hermes_telemetry_matrix.png', title: 'Real-Time Analytics', desc: 'Granular insights on response times, sentiment, conversion rates, and agent performance.', tag: 'Analyze', tagColor: '#3B82F6', metric: [{ label: 'Sentiment Index', value: '+98.2%', color: '#25D366' }, { label: 'Conversion Rate', value: '34.6%', color: '#FFB703' }, { label: 'Avg Latency', value: '0.38s', color: '#3B82F6' }] },
    { img: '/assets/f1_hud_panel.png', title: 'API Mesh', desc: 'Plug into Stripe, HubSpot, Salesforce, Shopify, and custom database webhooks in minutes.', tag: 'Integrate', tagColor: '#FFB703', metric: [{ label: 'Stripe', value: '', color: '#635BFF' }, { label: 'HubSpot', value: '', color: '#FF7A59' }, { label: 'Salesforce', value: '', color: '#00A1E0' }] },
  ]

  const solutions = [
    { img: '/assets/hermes_exotic_car.png', title: 'E-Commerce', desc: 'Order tracking, product recommendations, 24/7 cart recovery automations on WhatsApp.' },
    { img: '/assets/f1_speed_car.png', title: 'Real Estate', desc: 'Property inquiries, tour scheduling, instant buyer pre-qualification via WhatsApp.' },
    { img: '/assets/hermes_cockpit_hud.png', title: 'Education', desc: 'Student onboarding, 24/7 course Q&A, automated assignment alerts and reminders.' },
    { img: '/assets/hermes_telemetry_matrix.png', title: 'Healthcare', desc: 'Appointment booking, patient intake triage, automated follow-up reminders.' },
    { img: '/assets/f1_speed_cockpit.png', title: 'Events & Tickets', desc: 'VIP ticket assistance, schedule updates, real-time venue guidance.' },
    { img: '/assets/f1_hud_panel.png', title: 'Custom Enterprise', desc: 'Finance, Logistics, SaaS, Hospitality, Professional Legal Services.' },
  ]

  const integrations = [
    { name: 'WhatsApp', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg', color: '#25D366' },
    { name: 'Stripe', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg', color: '#635BFF' },
    { name: 'HubSpot', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hubspot.svg', color: '#FF7A59' },
    { name: 'Salesforce', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/salesforce.svg', color: '#00A1E0' },
    { name: 'Twilio', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/twilio.svg', color: '#F22F46' },
    { name: 'Shopify', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg', color: '#7AB55C' },
    { name: 'Google Analytics', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googleanalytics.svg', color: '#E37400' },
    { name: 'Notion', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg', color: '#000000' },
    { name: 'Mailchimp', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mailchimp.svg', color: '#FFE01B' },
    { name: 'Calendly', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/calendly.svg', color: '#006BFF' },
    { name: 'Airtable', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/airtable.svg', color: '#FCB400' },
    { name: '+200 more', logo: '/assets/logo.png', color: '#FF003C' },
  ]

  const templates = [
    { id: 'lead-gen', img: '/assets/hermes_cockpit_hud.png', title: 'Lead Qualification Bot', desc: 'Automatically qualify inbound leads, score them, and sync to your CRM. 24/7 lead capture on WhatsApp.', gradient: 'from-[#FF003C] to-[#3B82F6]' },
    { id: 'support', img: '/assets/hermes_telemetry_matrix.png', title: 'Customer Support Bot', desc: 'Answer FAQs, resolve tickets, and escalate complex issues to human agents automatically.', gradient: 'from-[#3B82F6] to-[#25D366]' },
    { id: 'booking', img: '/assets/f1_hud_panel.png', title: 'Appointment Booking Bot', desc: 'Let customers book, reschedule, and cancel appointments via WhatsApp with calendar sync.', gradient: 'from-[#FFB703] to-[#FF003C]' },
    { id: 'ecommerce', img: '/assets/hermes_exotic_car.png', title: 'E-Commerce Bot', desc: 'Product recommendations, order tracking, cart recovery, and payment links — all on WhatsApp.', gradient: 'from-[#FF003C] to-[#FFB703]' },
    { id: 'faq', img: '/assets/f1_speed_car.png', title: 'FAQ Bot', desc: 'Upload your knowledge base and let AI answer customer questions instantly with 99% accuracy.', gradient: 'from-[#3B82F6] to-[#FF003C]' },
    { id: 'feedback', img: '/assets/f1_speed_cockpit.png', title: 'Feedback & Survey Bot', desc: 'Collect NPS scores, customer feedback, and reviews through interactive WhatsApp surveys.', gradient: 'from-[#25D366] to-[#3B82F6]' },
  ]

  const testimonials = [
    { text: "We replaced 3 legacy chatbot tools and cut response latency from 14 minutes to 0.38 seconds. Actionpackd's AI agents are fundamentally built different.", name: 'Alex Mercer', role: 'VP of Operations at ScaleDrive', color: '#FF003C' },
    { text: "Actionpackd feels like having an entire support team that never sleeps. Deployment took 5 minutes without writing a single line of code.", name: 'Elena Rostova', role: 'Head of Growth at KineticLabs', color: '#3B82F6' },
    { text: "The WhatsApp Business API integration was seamless. We scaled from 1,000 to 80,000 conversations a day with zero system degradation.", name: 'Marcus Vance', role: 'CTO at HyperStream', color: '#25D366' },
  ]

  const navDropdowns = {
    features: [
      { icon: '📡', title: 'Omni-Channel', desc: 'WhatsApp, Web, Voice, Email' },
      { icon: '🤖', title: 'Bot Builder', desc: 'No-code visual flow builder' },
      { icon: '📢', title: 'Broadcast', desc: 'Mass campaign messaging' },
      { icon: '📥', title: 'Shared Inbox', desc: 'Team collaboration inbox' },
      { icon: '📊', title: 'Analytics', desc: 'Real-time insights & reports' },
      { icon: '🔌', title: 'API Mesh', desc: 'Stripe, HubSpot, Salesforce' },
    ],
    solutions: [
      { icon: '🛒', title: 'E-Commerce' }, { icon: '🏠', title: 'Real Estate' }, { icon: '🎓', title: 'Education' },
      { icon: '🏥', title: 'Healthcare' }, { icon: '🎫', title: 'Events' }, { icon: '🏢', title: 'Enterprise' },
    ],
    integrations: [
      { icon: '💬', title: 'WhatsApp Business' }, { icon: '💳', title: 'Stripe' }, { icon: '🟠', title: 'HubSpot' },
      { icon: '☁️', title: 'Salesforce' }, { icon: '📞', title: 'Twilio Voice' }, { icon: '🔗', title: '+200 more' },
    ],
    resources: [
      { icon: '🤖', title: 'Bot Templates', badge: 'TRY NOW', desc: 'Pre-built WhatsApp bots' },
      { icon: '📚', title: 'Documentation', desc: '' }, { icon: '⚙️', title: 'API Reference', desc: '' },
      { icon: '✍️', title: 'Blog', desc: '' }, { icon: '❓', title: 'Help Center', desc: '' }, { icon: '🟢', title: 'System Status', desc: '' },
    ],
    partners: [
      { icon: '🤝', title: 'Partner Program', desc: 'Join the network' },
      { icon: '💰', title: '30% Lifetime Commission', desc: 'Recurring payouts' },
      { icon: '🏢', title: 'Agency Portal', desc: 'Manage client accounts' },
    ],
  }

  const CheckIcon = ({ color = '#25D366', size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
  )

  const ChevronDown = () => (
    <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
  )

  return (
    <div className="min-h-screen bg-white text-slate-900 bg-grid">
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[#FF003C]/5 blur-[160px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-[#1D4ED8]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* NAV */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-[#FF003C] p-0.5 overflow-hidden shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src="/assets/logo.png" alt="Actionpackd Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-extrabold text-xl tracking-tight text-slate-900 uppercase">ACTION<span className="gradient-text">PACKD</span></span>
              <span className="text-[9px] font-mono text-slate-400 tracking-widest uppercase -mt-1">AI AGENT PLATFORM</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#F0FDF4] border border-[#25D366]/40 rounded-full ml-2">
            <CheckIcon color="#25D366" size={16} />
            <span className="text-[11px] font-mono text-[#25D366] font-bold uppercase tracking-wider">Meta Approved</span>
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            {Object.entries(navDropdowns).map(([key, items]) => (
              <div key={key} className="nav-dropdown">
                <button className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1 capitalize">{key}<ChevronDown /></button>
                <div className="dropdown-panel" style={{ width: key === 'partners' ? 360 : key === 'features' ? 480 : 420 }}>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl shadow-slate-300/50 grid grid-cols-2 gap-2">
                    {items.map((item, i) => (
                      <a key={i} href={key === 'resources' && item.title === 'Bot Templates' ? '#bot-templates' : key === 'features' ? '#features' : key === 'solutions' ? '#solutions' : key === 'integrations' ? '#integrations' : key === 'partners' ? '#partners' : '#'} onClick={key === 'resources' && item.title !== 'Bot Templates' ? (e) => { e.preventDefault(); openModal(item.title, `${item.title} content goes here.`) } : undefined} className={`flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors ${item.title === 'Bot Templates' ? 'border border-[#25D366]/20' : ''}`}>
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-lg">{item.icon}</div>
                        <div>
                          <div className="text-slate-900 text-sm font-semibold flex items-center gap-1.5">{item.title}{item.badge && <span className="text-[9px] bg-[#25D366] text-white px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>}</div>
                          {item.desc && <div className="text-slate-400 text-xs">{item.desc}</div>}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#login" onClick={(e) => { e.preventDefault(); openModal('Login', 'Access your Actionpackd dashboard.') }} className="hidden sm:block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Login</a>
            <button onClick={() => openModal('Start Free', 'Get instant access to Actionpackd. No credit card required.')} className="btn-primary px-5 py-2.5 rounded-lg bg-[#FF003C] text-white font-outfit font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-[#FF003C]">
              <span>Start Free</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <button className="lg:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-2 text-sm">
              <a href="#features" className="block py-2 text-slate-600 hover:text-slate-900">Features</a>
              <a href="#solutions" className="block py-2 text-slate-600 hover:text-slate-900">Solutions</a>
              <a href="#integrations" className="block py-2 text-slate-600 hover:text-slate-900">Integrations</a>
              <a href="#bot-templates" className="block py-2 text-slate-600 hover:text-slate-900">Bot Templates</a>
              <a href="#partners" className="block py-2 text-slate-600 hover:text-slate-900">Partners</a>
              <a href="#pricing" className="block py-2 text-slate-600 hover:text-slate-900">Pricing</a>
              <div className="flex items-center gap-2 py-2"><CheckIcon color="#25D366" size={14} /><span className="text-[#25D366] text-xs font-mono">Meta Approved</span></div>
            </div>
          </div>
        )}
      </header>

      {/* Announcement */}
      <div className="w-full bg-gradient-to-r from-[#1D4ED8] via-[#FF003C] to-[#1D4ED8] text-white py-1.5 px-4 text-center font-mono text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
        <span className="px-1.5 py-0.5 bg-black/20 rounded text-[#25D366] font-bold flex items-center gap-1"><CheckIcon color="#25D366" size={12} /> META APPROVED</span>
        <span>WhatsApp Business API Now Live — Deploy AI Agents in Minutes</span>
        <a href="#bot-templates" className="underline hover:text-[#FFB703] ml-2 hidden sm:inline">Try a Bot Template →</a>
      </div>

      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-slate-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            <div className="lg:col-span-6 flex flex-col items-start">
              <AnimatedSection delay={0}>
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F0FDF4] border border-[#25D366]/40 text-xs font-mono text-slate-600 mb-8">
                  <CheckIcon color="#25D366" size={16} />
                  <span className="text-slate-400 uppercase tracking-wider text-[11px]">WhatsApp Business API:</span>
                  <span className="text-[#25D366] font-bold text-[11px]">META APPROVED</span>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-outfit font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
                  Build AI agents<br />that actually <span className="gradient-text">convert.</span>
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="text-lg sm:text-xl text-slate-500 max-w-xl font-sans leading-relaxed mb-8">
                  Actionpackd lets you build, deploy, and scale AI agents across WhatsApp, web chat, voice, and email — live in minutes. No code required. Meta-approved for WhatsApp Business API.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <div className="w-full max-w-xl bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 font-mono text-xs text-slate-600 grid grid-cols-3 gap-3 divide-x divide-slate-200 text-center">
                  <div className="px-2"><div className="text-[10px] text-slate-400 uppercase tracking-widest">Deploy Time</div><div className="text-[#3B82F6] font-extrabold text-base sm:text-lg mt-1">5 min</div></div>
                  <div className="px-2"><div className="text-[10px] text-slate-400 uppercase tracking-widest">Uptime</div><div className="text-[#FFB703] font-extrabold text-base sm:text-lg mt-1">99.99%</div></div>
                  <div className="px-2"><div className="text-[10px] text-slate-400 uppercase tracking-widest">Agents Live</div><div className="text-[#FF003C] font-extrabold text-base sm:text-lg mt-1">18,400+</div></div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <button onClick={() => openModal('Start Free', 'Get instant access to Actionpackd. No credit card required.')} className="btn-primary px-8 py-4 rounded-xl bg-[#FF003C] text-white font-outfit font-bold text-base uppercase tracking-wider flex items-center justify-center gap-3 border border-[#FF003C] shadow-lg shadow-[#FF003C]/20 w-full sm:w-auto">
                    <span>Start Free</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </button>
                  <a href="#bot-templates" className="btn-outline px-8 py-4 rounded-xl bg-transparent text-slate-700 font-outfit font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-200 hover:text-slate-900 w-full sm:w-auto">
                    <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C22 6.45 17.5 2 12.04 2z"/></svg>
                    <span>Try a Bot Template</span>
                  </a>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-6">
              <AnimatedSection delay={0.3}>
                <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FF003C]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#FFB703]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#25D366]"></span>
                      <span className="ml-2 text-slate-600 font-bold">actionpackd_dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#25D366]"><span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>LIVE</div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1.5 text-[11px] font-mono">
                    {['whatsapp', 'web', 'voice', 'email'].map(ch => (
                      <button key={ch} onClick={() => switchChannel(ch)} className={`px-3 py-1.5 rounded-lg border whitespace-nowrap flex items-center gap-1.5 transition-all ${channel === ch ? 'bg-slate-50 text-slate-900 border-[#25D366]/40' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#3B82F6]'}`}>
                        <span>{ch === 'whatsapp' ? '💬' : ch === 'web' ? '🌐' : ch === 'voice' ? '🎙️' : '✉️'}</span> {ch === 'whatsapp' ? 'WhatsApp' : ch === 'web' ? 'Web Chat' : ch === 'voice' ? 'Voice' : 'Email'}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3 font-sans text-xs min-h-[270px] flex flex-col justify-end">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-mono font-bold text-slate-400 shrink-0">USR</div>
                      <div className="bg-slate-100 border border-slate-200 text-slate-700 rounded-xl p-3.5 max-w-[85%] font-mono text-[11px]">"I want to track my order #4821 and schedule a delivery."</div>
                    </div>
                    <div className="flex items-start gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF003C] to-[#1D4ED8] flex items-center justify-center text-[10px] font-mono font-bold text-white shrink-0">AI</div>
                      <div className="bg-white border border-[#FF003C]/30 text-slate-700 rounded-xl p-4 max-w-[90%] shadow-sm">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#3B82F6] mb-2 border-b border-slate-100 pb-1.5">
                          <span>AI AGENT · ORDER BOT</span>
                          <span className="bg-[#25D366] text-white px-2 py-0.5 rounded-full text-[9px] font-bold">META VERIFIED</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-xs">{heroResponse}</p>
                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>⚡ Response: 0.38s</span><span>Confidence: 99.2%</span><span className="text-[#25D366] font-bold">● WhatsApp Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2">
                    <span className="text-[#FF003C] font-mono font-bold text-sm">{'>'}</span>
                    <input value={heroInput} onChange={(e) => setHeroInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendHeroMessage()} type="text" placeholder="Type a message to test the AI agent..." className="bg-transparent border-none text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-mono" />
                    <button onClick={sendHeroMessage} className="px-4 py-1.5 bg-[#FF003C] text-white text-[11px] font-bold rounded-lg hover:bg-[#E60036] transition-colors uppercase font-mono">Send</button>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-14 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-8">Trusted by 18,000+ teams shipping AI agents daily</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60 hover:opacity-100 transition-all">
            {['APEXSCALE', 'KINETIC.AI', 'TURBOSTACK', 'QUANTUMOPS', 'HYPERDRIVE', 'NEXTGEN'].map((name, i) => (
              <div key={name} className={`font-extrabold text-lg tracking-wider font-mono ${i % 2 === 0 ? 'hover:text-[#FF003C]' : 'hover:text-[#3B82F6]'} transition-colors`}>{name}</div>
            ))}
          </div>
          <div className="mt-10 w-full h-px bg-slate-200 relative flex items-center justify-center">
            <div className="w-40 h-0.5 bg-gradient-to-r from-[#FF003C] to-[#3B82F6] absolute"></div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// PLATFORM FEATURES</div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">Everything you need to <span className="gradient-text">scale conversations.</span></h2>
              </div>
              <p className="text-slate-500 text-sm md:text-base max-w-md font-mono">Six powerful modules to build, automate, and analyze AI agent conversations across every channel.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="card-hover relative bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between shadow-sm h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center">
                        <img src={f.img} alt={f.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="px-2.5 py-1 text-[10px] font-mono bg-slate-50 border border-slate-200 rounded-lg uppercase" style={{ color: f.tagColor }}>{f.tag}</span>
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{f.desc}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-[11px] space-y-2">
                    {f.metric.map((m, j) => (
                      <div key={j} className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }}></span> {m.label}</span>
                        {m.value && <span className="font-bold" style={{ color: m.color }}>{m.value}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* BOT TEMPLATES */}
      <section id="bot-templates" className="py-24 border-b border-slate-200 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#25D366]/30 mb-4">
                <CheckIcon color="#25D366" size={16} />
                <span className="text-[#25D366] font-mono text-xs font-bold uppercase tracking-wider">Meta Approved · WhatsApp Business</span>
              </div>
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// BOT TEMPLATES</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">Pre-built WhatsApp bots. <span className="gradient-text">Try now.</span></h2>
              <p className="text-slate-500 text-sm font-mono mt-3 max-w-xl mx-auto">Launch a production-ready WhatsApp bot in seconds. Click "Try Now" to test any template live.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.08}>
                <div className="card-hover relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm h-full">
                  <div className={`h-2 bg-gradient-to-r ${t.gradient}`}></div>
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center">
                        <img src={t.img} alt={t.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="px-2 py-1 text-[9px] font-mono bg-[#F0FDF4] text-[#25D366] border border-[#25D366]/30 rounded-lg uppercase font-bold flex items-center gap-1"><CheckIcon color="#25D366" size={12} /> Meta Verified</span>
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-slate-900 mb-2">{t.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{t.desc}</p>
                    <button onClick={() => tryBotTemplate(t.id)} className="w-full py-3 rounded-xl bg-[#25D366] text-white font-outfit font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-colors shadow-md shadow-[#25D366]/30">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C22 6.45 17.5 2 12.04 2z"/></svg>
                      Try Now
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* META APPROVED */}
      <section className="py-20 border-b border-slate-200 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#25D366]/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="rounded-2xl bg-white border border-[#25D366]/30 p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-[#25D366]/5">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0FDF4] border border-[#25D366]/40 mb-4">
                  <CheckIcon color="#25D366" size={20} />
                  <span className="text-[#25D366] font-mono text-xs font-bold uppercase tracking-wider">Meta Business Partner</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-900 tracking-tight mb-4">Officially Meta-Approved for WhatsApp Business API.</h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">Actionpackd is a verified Meta Business Partner. Deploy WhatsApp Business API with confidence — official templates, green badge verification, and enterprise-grade security built in.</p>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-[#F0FDF4] border-4 border-[#25D366]/40 flex items-center justify-center shadow-lg shadow-[#25D366]/20 animate-float">
                  <CheckIcon color="#25D366" size={64} />
                </div>
                <div className="text-center">
                  <div className="text-[#25D366] font-mono text-sm font-bold uppercase tracking-wider">Verified</div>
                  <div className="text-slate-400 text-xs font-mono">Meta Business Partner</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// INDUSTRY SOLUTIONS</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">Built for <span className="gradient-text">every sector.</span></h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="card-hover relative bg-white border border-slate-200 rounded-2xl p-7 h-full">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center mb-5">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  {s.title === 'Custom Enterprise' && (
                    <button onClick={() => openModal('Custom Solution', 'Tell us about your specific workflow to see a custom agent demo.')} className="mt-4 text-xs font-mono text-[#FF003C] hover:underline uppercase font-bold">Explore Custom Solutions →</button>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" className="py-24 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// INTEGRATIONS</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">Connect <span className="gradient-text">everything.</span></h2>
              <p className="text-slate-500 text-sm font-mono mt-3 max-w-xl mx-auto">200+ native integrations. Plug into your existing stack in minutes.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {integrations.map((int, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <div className="card-hover relative bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center gap-2 h-full">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                    <img src={int.logo} alt={int.name} className="w-7 h-7 object-contain" style={{ filter: int.name === 'Notion' ? 'brightness(0)' : 'none' }} />
                  </div>
                  <span className="text-slate-600 text-xs font-mono font-bold">{int.name}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// HOW IT WORKS</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">From idea to <span className="gradient-text">deployment.</span></h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Build', desc: 'Pick a template or describe your workflow in plain English. No code needed.' },
              { num: '02', title: 'Customize', desc: 'Connect knowledge bases, CRM APIs, and custom tool rules.' },
              { num: '03', title: 'Deploy', desc: '1-click launch to WhatsApp, Web, Voice, or Email.' },
              { num: '04', title: 'Scale', desc: 'Handle thousands of parallel conversations with real-time analytics.' },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 text-slate-900 font-mono font-bold flex items-center justify-center text-lg mb-4 group-hover:border-[#FF003C] transition-colors">{step.num}</div>
                  <h4 className="text-lg font-outfit font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// PRICING</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">Simple, <span className="gradient-text">transparent tiers.</span></h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'FREE SANDBOX', price: '$0', period: '/ month', desc: 'Perfect for building and testing AI agents on local channels.', features: ['2 Active AI Agents', '1,000 Messages / mo', 'Web & Chat Webhooks', 'Bot Template Access'], featured: false, cta: 'Start Building Free' },
              { name: 'PRO', price: '$99', period: '/ month', desc: 'Full multi-channel deployment with WhatsApp Business API.', features: ['15 Active AI Agents', '50,000 Messages / mo', 'WhatsApp Business API', 'Twilio Voice API', 'Real-Time Analytics', 'Meta Verified Badge'], featured: true, cta: 'Get Pro Access →' },
              { name: 'ENTERPRISE', price: 'Custom', period: '', desc: 'Dedicated infrastructure, custom SLAs, and zero-retention privacy.', features: ['Unlimited AI Agents', 'Dedicated GPU Nodes', '99.99% Guaranteed SLA', 'Custom Integrations', 'SOC2 / HIPAA Compliance'], featured: false, cta: 'Contact Sales' },
            ].map((tier, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`rounded-2xl p-8 flex flex-col justify-between relative h-full ${tier.featured ? 'bg-white border-2 border-[#FF003C] shadow-xl shadow-[#FF003C]/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
                  {tier.featured && <div className="absolute -top-3.5 right-6 bg-[#FF003C] text-white px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">MOST POPULAR</div>}
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase mb-2">{tier.name}</div>
                    <div className="text-4xl font-outfit font-extrabold text-slate-900 mb-4">{tier.price} <span className="text-xs font-mono text-slate-400 font-normal">{tier.period}</span></div>
                    <p className="text-slate-500 text-xs mb-6">{tier.desc}</p>
                    <ul className="space-y-3.5 text-xs text-slate-600 font-sans mb-8">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2.5"><span style={{ color: f === 'Meta Verified Badge' ? '#25D366' : '#FF003C' }}>✔</span> {f}</li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => openModal(tier.cta, 'Get started with Actionpackd.')} className={`w-full py-3.5 font-outfit font-bold text-xs uppercase tracking-wider rounded-xl border ${tier.featured ? 'btn-primary bg-[#FF003C] text-white border-[#FF003C]' : 'btn-outline bg-transparent text-slate-900 border-slate-200'}`}>{tier.cta}</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="py-24 border-b border-slate-200 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// PLATFORM METRICS</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">Numbers that <span className="gradient-text">speak.</span></h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Conversations', target: 18450200, suffix: '+', color: '#3B82F6', sub: 'Total automated dialogues' },
              { label: 'Uptime', target: 99, suffix: '.99%', color: '#FFB703', sub: 'Zero-downtime cluster' },
              { label: 'Sectors', target: 52, suffix: '+', color: '#FF003C', sub: 'Fintech, E-com, Healthcare' },
              { label: 'Availability', value: '24/7/365', color: '#25D366', sub: 'Continuous execution' },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="card-hover p-7 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-4">
                    <span>{s.label}</span>
                    <span className="flex items-center gap-1.5" style={{ color: s.color }}><span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.color }}></span>LIVE</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tighter my-2" style={{ color: s.color }}>
                    {s.value ? s.value : <CounterUp target={s.target} suffix={s.suffix} />}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">{s.sub}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// CUSTOMER STORIES</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight">Loved by <span className="gradient-text">teams worldwide.</span></h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white border-l-4 border border-slate-200 rounded-r-2xl p-7 flex flex-col justify-between shadow-sm h-full" style={{ borderLeftColor: t.color }}>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase mb-4 tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: t.color }}></span> STORY #{String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                  </div>
                  <div>
                    <div className="font-outfit font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs font-mono text-slate-400">{t.role}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl bg-white border border-slate-200 p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-slate-200/50">
              <div className="max-w-xl">
                <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-3">// PARTNER PROGRAM</div>
                <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-900 tracking-tight mb-4">Earn 30% Lifetime Recurring Payouts.</h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">Partner with Actionpackd. Earn 30% commission on every sale, every month, for life when you introduce agencies or enterprise clients to our AI agent platform.</p>
              </div>
              <button onClick={() => openModal('Partner Program', 'Apply for the Actionpackd Partner Network & start earning 30% lifetime recurring payouts.')} className="btn-primary px-8 py-4 rounded-xl bg-[#FF003C] text-white font-outfit font-bold text-base uppercase tracking-wider border border-[#FF003C]">Become a Partner →</button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white relative pt-1 border-t-2 border-[#FF003C]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#FF003C] p-0.5 overflow-hidden shadow-md flex items-center justify-center">
                  <img src="/assets/logo.png" alt="Actionpackd Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="font-outfit font-extrabold text-lg tracking-tight text-slate-900 uppercase">ACTION<span className="gradient-text">PACKD</span></span>
              </div>
              <p className="text-slate-500 text-xs font-mono max-w-sm">AI Agent Platform for WhatsApp, Web, Voice, and Email. Build, deploy, and scale conversations in minutes. Meta-approved WhatsApp Business API.</p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#25D366] pt-2">
                <CheckIcon color="#25D366" size={16} />
                <span>Meta Business Partner · WhatsApp API Approved</span>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4">Features</h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-sans">
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Omni-Channel</a></li>
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Bot Builder</a></li>
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Broadcast</a></li>
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Shared Inbox</a></li>
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-sans">
                <li><a href="#bot-templates" className="hover:text-slate-900 transition-colors">Bot Templates</a></li>
                <li><a href="#docs" onClick={(e) => { e.preventDefault(); openModal('Documentation', 'Access complete developer documentation.') }} className="hover:text-slate-900 transition-colors">Documentation</a></li>
                <li><a href="#api" onClick={(e) => { e.preventDefault(); openModal('API Reference', 'Explore webhooks and REST endpoints.') }} className="hover:text-slate-900 transition-colors">API Reference</a></li>
                <li><a href="#blog" onClick={(e) => { e.preventDefault(); openModal('Blog', 'Read the latest articles.') }} className="hover:text-slate-900 transition-colors">Blog</a></li>
                <li><a href="#help" onClick={(e) => { e.preventDefault(); openModal('Help Center', 'Browse guides and tutorials.') }} className="hover:text-slate-900 transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-sans">
                <li><a href="#partners" className="hover:text-slate-900 transition-colors">Partners</a></li>
                <li><a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a></li>
                <li><a href="#privacy" onClick={(e) => { e.preventDefault(); openModal('Privacy Policy', 'SOC2 Type II compliance.') }} className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" onClick={(e) => { e.preventDefault(); openModal('Terms of Service', 'Enterprise SLA details.') }} className="hover:text-slate-900 transition-colors">Terms of Service</a></li>
                <li><a href="#security" onClick={(e) => { e.preventDefault(); openModal('Security', 'Zero retention option available.') }} className="hover:text-slate-900 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-4">
            <div>© 2026 Actionpackd Inc. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span className="text-[#25D366]">● Meta Approved</span>
              <span>●</span>
              <span className="text-[#3B82F6]">99.99% Uptime</span>
            </div>
          </div>
        </div>
      </footer>

      {/* CTA MODAL */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white border border-[#FF003C] overflow-hidden flex items-center justify-center">
                  <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-outfit font-extrabold text-lg text-slate-900">{modal.title}</h3>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-900 font-mono">✕</button>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">{modal.body}</p>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); alert('⚡ Welcome to Actionpackd! Your account is ready.') }} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">WORK EMAIL</label>
                <input type="email" placeholder="you@company.com" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF003C] font-mono" />
              </div>
              <button type="submit" className="btn-primary w-full py-3.5 bg-[#FF003C] text-white font-outfit font-bold text-xs uppercase tracking-wider rounded-xl border border-[#FF003C]">Get Started →</button>
            </form>
          </div>
        </div>
      )}

      {/* BOT TEMPLATE MODAL */}
      {botModal.open && botModal.template && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeBotModal()}>
          <div className="bg-[#EFEAE2] border border-[#25D366]/30 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-slide-in">
            <div className="bg-[#1F2C34] p-4 flex items-center gap-3">
              <button onClick={closeBotModal} className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-lg">{botModal.template.avatar}</div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">{botModal.template.name}</div>
                <div className="text-[#25D366] text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>online · Meta Verified
                </div>
              </div>
              <CheckIcon color="#25D366" size={20} />
            </div>
            <div className="p-4 min-h-[320px] max-h-[400px] overflow-y-auto flex flex-col gap-2" style={{ backgroundImage: 'linear-gradient(rgba(239,234,226,0.95), rgba(239,234,226,0.95))' }}>
              {botMessages.map((msg, i) => (
                <div key={i} className={`wa-bubble ${msg.type === 'bot' ? 'wa-bubble-bot' : 'wa-bubble-user'} animate-slide-in`}>
                  {msg.text}<span className="wa-tick">✓✓</span>
                </div>
              ))}
            </div>
            <div className="p-3 bg-[#1F2C34] flex items-center gap-2">
              <input value={botInput} onChange={(e) => setBotInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendBotMessage()} type="text" placeholder="Type a message..." className="flex-1 bg-[#2A3942] text-white text-sm rounded-full px-4 py-2.5 border-none focus:outline-none placeholder-gray-500" />
              <button onClick={sendBotMessage} className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#1ebe5d] transition-colors shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}