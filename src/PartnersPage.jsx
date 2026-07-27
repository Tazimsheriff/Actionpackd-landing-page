import React, { useState, useEffect, useRef } from 'react'
import { Player } from '@remotion/player'
import { PartnerProgramVideo } from './PartnerProgramVideo'


// Custom intersection observer hook for smooth scroll animations
const useInView = (options = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.1, ...options })
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
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`
      }}
    >
      {children}
    </div>
  )
}

export function PartnersPage({ onBackToHome }) {
  // Application Modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [applyForm, setApplyForm] = useState({ name: '', email: '', website: '', type: 'Creator / Affiliate' })
  const [applySubmitted, setApplySubmitted] = useState(false)

  // Interactive Calculator State
  const [referredClients, setReferredClients] = useState(25)
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(99) // $99 Pro, $299 Agency, $999 Enterprise
  const [commissionRate, setCommissionRate] = useState(0.30) // 30% default

  // Dashboard Simulator State
  const [customHandle, setCustomHandle] = useState('alex-growth')
  const [copied, setCopied] = useState(false)
  const [simulatedClicks, setSimulatedClicks] = useState(1420)
  const [simulatedConversions, setSimulatedConversions] = useState(84)
  const [simulatedUnpaid, setSimulatedUnpaid] = useState(2494.80)
  const [liveToast, setLiveToast] = useState(null)

  // Enterprise Concierge Migration Modal State
  const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false)
  const [enterpriseForm, setEnterpriseForm] = useState({ company: '', volume: '$50,000+/mo', platform: 'Rewardful', email: '' })
  const [enterpriseSubmitted, setEnterpriseSubmitted] = useState(false)

  const handleSimulateClick = () => {
    setSimulatedClicks(prev => prev + 1)
    setLiveToast(`⚡ Live Telemetry Event: Click captured via act.pk/${customHandle || 'partner'} (100% Attribution)`)
    setTimeout(() => setLiveToast(null), 3000)
  }

  const handleSimulateConversion = () => {
    setSimulatedClicks(prev => prev + 1)
    setSimulatedConversions(prev => prev + 1)
    setSimulatedUnpaid(prev => prev + 29.70)
    setLiveToast(`💰 Live Conversion Event: $99 Pro Plan Signup Tracked! +$29.70 Commission Auto-Credited.`)
    setTimeout(() => setLiveToast(null), 3500)
  }

  const handleEnterpriseSubmit = (e) => {
    e.preventDefault()
    setEnterpriseSubmitted(true)
    setTimeout(() => {
      setEnterpriseSubmitted(false)
      setEnterpriseModalOpen(false)
      alert(`🚀 Dedicated Migration Concierge Request Received! Our migration team will contact ${enterpriseForm.email} within 2 hours to begin zero-downtime transfer.`)
      setEnterpriseForm({ company: '', volume: '$50,000+/mo', platform: 'Rewardful', email: '' })
    }, 1000)
  }

  // FAQ state
  const [openFaq, setOpenFaq] = useState(0)

  // Simulated live partners for marquee
  const globalPartners = [
    { name: 'Lauren Anderson', flag: '🇺🇸', country: 'United States', revenue: '$18.4K', payout: '$5,520', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    { name: 'Mia Taylor', flag: '🇺🇸', country: 'United States', revenue: '$22.6K', payout: '$6,780', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' },
    { name: 'Sophie Laurent', flag: '🇨🇦', country: 'Canada', revenue: '$11.0K', payout: '$3,300', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' },
    { name: 'Hiroshi Tanaka', flag: '🇯🇵', country: 'Japan', revenue: '$19.2K', payout: '$5,760', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { name: 'Elias Weber', flag: '🇩🇪', country: 'Germany', revenue: '$14.8K', payout: '$4,440', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
    { name: 'Liam Carter', flag: '🇺🇸', country: 'United States', revenue: '$30.0K', payout: '$9,000', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80' },
    { name: 'Lucia Gonzalez', flag: '🇦🇷', country: 'Argentina', revenue: '$24.0K', payout: '$7,200', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80' },
    { name: 'Derek Forbes', flag: '🇬🇧', country: 'United Kingdom', revenue: '$16.5K', payout: '$4,950', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80' },
    { name: 'Diego Alvarez', flag: '🇪🇸', country: 'Spain', revenue: '$13.2K', payout: '$3,960', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80' },
    { name: 'Priya Sharma', flag: '🇮🇳', country: 'India', revenue: '$28.5K', payout: '$8,550', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80' }
  ]

  // Case study modal state
  const [caseStudyModal, setCaseStudyModal] = useState({ open: false, company: null })
  const [migrationFilter, setMigrationFilter] = useState('all')

  const migratedPlatforms = [
    {
      id: 'rewardful',
      name: 'Rewardful',
      text: 'Switched from Rewardful',
      fromLogo: '🔄',
      volume: '$5.8M/mo',
      savings: 'Saved $42,000/yr in fees',
      timeframe: '< 24h Setup Time',
      highlight: false,
      companies: [
        { 
          name: 'Beehiiv', 
          tagline: 'Newsletter Growth Platform',
          caseStudy: true, 
          accent: '#FFD600',
          textColor: '#090A0F',
          logoIcon: '🐝',
          stat: 'Migrated 42,000+ active newsletter creators with zero broken links.',
          metricBefore: 'Rewardful (3.2% dropoff on Safari)',
          metricAfter: 'Actionpackd (99.8% first-party capture)',
          timeToMigrate: '14 Hours',
          quote: 'We moved 42,000 creator referral links overnight without missing a single payout cycle.'
        },
        { 
          name: 'Chatbase', 
          tagline: 'AI Customer Bot Builder',
          caseStudy: true, 
          accent: '#3B82F6',
          logoIcon: '🤖',
          stat: '14,000+ affiliates migrated in 24 hours · 99.4% tracking accuracy.',
          metricBefore: 'Third-party cookies blocked by Brave',
          metricAfter: 'Custom CNAME tracking (act.pk/chatbase)',
          timeToMigrate: '18 Hours',
          quote: 'Ad-blocker dropoff disappeared instantly when we switched to custom short links.'
        },
        { 
          name: 'Anything', 
          tagline: 'Full-stack AI App Creator',
          caseStudy: false, 
          accent: '#A855F7',
          logoIcon: '✨',
          stat: 'Direct API webhook sync for instant multi-tier affiliate rewards.'
        },
        { 
          name: 'Tella', 
          tagline: 'Screen & Video Recorder',
          caseStudy: true, 
          accent: '#EC4899',
          logoIcon: '🎥',
          stat: '100% first-party domain attribution with zero ad-blocker dropoff.',
          metricBefore: 'High churn from delayed attribution reports',
          metricAfter: 'Sub-second real-time webhooks & Stripe Sync',
          timeToMigrate: '12 Hours',
          quote: 'Our creators love seeing their payouts update in real-time right after a signup.'
        }
      ]
    },
    {
      id: 'partnerstack',
      name: 'PartnerStack',
      text: 'Switched from PartnerStack',
      fromLogo: '⚡',
      volume: '$4.9M/mo',
      savings: 'Saved $85,000/yr in fees',
      timeframe: '< 36h Setup Time',
      highlight: true,
      companies: [
        { 
          name: 'Kick', 
          tagline: 'Streaming & Creator Platform',
          caseStudy: true, 
          accent: '#22C55E',
          logoIcon: '🟢',
          stat: 'Tracked 180,000+ creator affiliate signups with sub-second latency.',
          metricBefore: '$85k/mo platform override fees',
          metricAfter: '$0 markup fees on partner payouts',
          timeToMigrate: '32 Hours',
          quote: 'Eliminating PartnerStack’s commission markups saved our treasury over $100k annually.'
        },
        { 
          name: 'Privy', 
          tagline: 'E-commerce Conversion Engine',
          caseStudy: true, 
          accent: '#06B6D4',
          logoIcon: '🛍️',
          stat: 'Eliminated platform fee overhead with zero commission markups.',
          metricBefore: 'Manual monthly CSV wire payouts',
          metricAfter: 'Automated 1st-of-month Stripe Connect',
          timeToMigrate: '24 Hours',
          quote: 'Stripe Connect automated payouts cut our partner ops workload to virtually zero.'
        }
      ]
    },
    {
      id: 'firstpromoter',
      name: 'FirstPromoter',
      text: 'Switched from FirstPromoter',
      fromLogo: '🚀',
      volume: '$2.8M/mo',
      savings: 'Saved $24,000/yr in fees',
      timeframe: '< 18h Setup Time',
      highlight: false,
      companies: [
        { 
          name: 'Framer', 
          tagline: 'Interactive Website Builder',
          caseStudy: true, 
          accent: '#000000',
          logoIcon: '📐',
          stat: '28,000 creators onboarded automatically via act.pk custom short links.',
          metricBefore: 'Outdated partner dashboard UI',
          metricAfter: 'Custom branded partner portal',
          timeToMigrate: '16 Hours',
          quote: 'The partner portal experience is night and day compared to FirstPromoter.'
        },
        { 
          name: 'Copper', 
          tagline: 'Google Workspace CRM',
          caseStudy: false, 
          accent: '#F97316',
          logoIcon: '🤝',
          stat: 'Seamless CRM deal-stage syncing with referral payouts.'
        }
      ]
    },
    {
      id: 'topteams',
      name: 'Top Teams',
      text: 'Top SaaS Teams on Actionpackd',
      fromLogo: '👑',
      volume: '$1.7M/mo',
      savings: 'Maximum Growth Scale',
      timeframe: 'Native Integration',
      highlight: false,
      companies: [
        { 
          name: 'Superhuman', 
          tagline: 'Fastest Email Experience',
          caseStudy: true, 
          accent: '#6366F1',
          logoIcon: '⚡',
          stat: 'Seamless 1-click email referral engine powered by Actionpackd API.',
          metricBefore: 'Custom built in-house tracker',
          metricAfter: 'Actionpackd Partner API',
          timeToMigrate: '8 Hours',
          quote: 'Actionpackd handles our global partner referral volume effortlessly.'
        },
        { 
          name: 'Granola', 
          tagline: 'AI Meeting Notepad',
          caseStudy: false, 
          accent: '#10B981',
          logoIcon: '🥣',
          stat: 'Viral meeting referral loops integrated directly into app onboarding.'
        },
        { 
          name: 'Polymarket', 
          tagline: 'Prediction Markets Platform',
          caseStudy: true, 
          accent: '#38BDF8',
          logoIcon: '📊',
          stat: '$4.2M in referral volume tracked with sub-second latency.',
          metricBefore: 'Complex Web3 wallet tracking issues',
          metricAfter: 'Hybrid Web3 + First-party cookie tracking',
          timeToMigrate: '20 Hours',
          quote: 'Sub-second referral volume tracking across decentralized wallets and web links.'
        },
        { 
          name: 'Wispr Flow', 
          tagline: 'Voice Dictation Workspace',
          caseStudy: false, 
          accent: '#8B5CF6',
          logoIcon: '🎙️',
          stat: 'Instant affiliate links for top voice tech creators.'
        }
      ]
    }
  ]


  const partnerFaqs = [
    {
      q: "What is the commission rate and cookie attribution window?",
      a: "Actionpackd Partners earn 30% recurring monthly commission for up to 24 months on every paid subscription referred. Our first-party tracking links use a 60-day attribution window with cookie-less fallback."
    },
    {
      q: "How and when do I get paid?",
      a: "Payouts are disbursed automatically on the 1st of every month via Stripe Connect, direct PayPal, or SWIFT bank transfer in over 120 supported currencies once you reach a minimum payout threshold of $50."
    },
    {
      q: "How does the 2-Tier Partner Referral program work?",
      a: "When you refer other creators, agencies, or partners to the Actionpackd Partner Network, you earn an extra 5% recurring override on all sales generated by their referred accounts!"
    },
    {
      q: "Can I use custom short domains for my affiliate links?",
      a: "Yes! Every partner gets access to instant custom alias links like act.pk/yourname or branded custom short domains with complete UTM parameter passing."
    },
    {
      q: "Is there any cost or minimum requirement to join?",
      a: "Zero cost. Actionpackd Partners is 100% free to join. Approval is instant for verified content creators, agencies, SaaS reviewers, and growth marketers."
    }
  ]

  const handleCopyLink = () => {
    const link = `https://act.pk/${customHandle || 'partner'}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleApplySubmit = (e) => {
    e.preventDefault()
    setApplySubmitted(true)
    setTimeout(() => {
      setApplySubmitted(false)
      setApplyModalOpen(false)
      alert(`🚀 Application submitted successfully! Welcome to Actionpackd Partners, ${applyForm.name}. Check your email for login credentials.`)
      setApplyForm({ name: '', email: '', website: '', type: 'Creator / Affiliate' })
    }, 1000)
  }

  // Calculated ROI values
  const monthlyTotalRevenue = referredClients * selectedPlanPrice
  const monthlyCommission = monthlyTotalRevenue * commissionRate
  const annualCommission = monthlyCommission * 12

  return (
    <div className="min-h-screen bg-white text-[#090A0F] font-sans relative overflow-x-hidden">
      
      {/* TOP DEEP OBSIDIAN ANNOUNCEMENT BAR */}
      <div className="bg-[#090A0F] text-white py-2.5 px-4 text-center text-xs font-mono border-b border-slate-800 flex items-center justify-center gap-3">
        <span className="bg-[#FF003C] text-white px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
          ⚡ ACTIONPACKD PARTNERS 2.0
        </span>
        <span className="text-slate-300">Earn 30% Lifetime Recurring Revenue + 5% Sub-Partner Bonus</span>
        <button
          onClick={() => setApplyModalOpen(true)}
          className="text-[#FF003C] font-bold underline hover:text-[#FF2A55] transition-colors"
        >
          Apply Now →
        </button>
      </div>

      {/* HERO SECTION WITH DUB-STYLE SUBTLE GRID & GRADIENTS */}
      <section className="relative pt-16 pb-20 border-b border-slate-200 bg-grid-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white border border-slate-800 text-xs font-mono mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF003C] animate-pulse"></span>
              <span className="font-semibold text-[#FF003C]">DUB.CO PARTNERS ARCHITECTURE</span>
              <span className="text-slate-400">· Official Program</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-extrabold tracking-tight text-[#090A0F] leading-[1.08] max-w-4xl mx-auto mb-6">
              Grow your revenue with <br className="hidden sm:inline" />
              <span className="gradient-text-red">Actionpackd Partnerships.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed mb-8">
              Actionpackd is the modern affiliate marketing platform & network for partnering with affiliates, creators, agencies, and developers.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <button
                onClick={() => setApplyModalOpen(true)}
                className="btn-primary px-8 py-4 rounded-full font-outfit font-bold text-sm uppercase tracking-wider shadow-xl shadow-rose-500/25 flex items-center gap-2"
              >
                <span>Join Partner Program</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <a
                href="#partner-calculator"
                className="btn-black px-8 py-4 rounded-full font-outfit font-bold text-sm uppercase tracking-wider shadow-md"
              >
                Calculate Earnings ↓
              </a>
            </div>
          </AnimatedSection>

        </div>

        {/* LIVE PARTNER EARNINGS INFINITE CAROUSEL (DUB STYLE) */}
        <div className="relative mt-4 overflow-hidden py-4 border-y border-slate-200 bg-slate-50/80">
          <div className="animate-marquee flex gap-4">
            {[...globalPartners, ...globalPartners].map((partner, idx) => (
              <div
                key={idx}
                className="w-72 shrink-0 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-[#FF003C] hover:shadow-md transition-all flex items-center gap-3.5"
              >
                <img
                  src={partner.avatar}
                  alt={partner.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#090A0F] truncate">
                    <span>{partner.flag}</span>
                    <span className="truncate">{partner.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono mt-1 pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Revenue: <strong className="text-slate-900">{partner.revenue}</strong></span>
                    <span className="text-[#FF003C] font-bold">Payout: {partner.payout}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* REMOTION DYNAMIC MOTION SHOWCASE (LIGHT MODE / WHITE THEME) */}
      <section className="py-20 bg-slate-50/80 border-b border-slate-200 text-[#090A0F] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#090A0F] text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-3 shadow-md">
                🎬 INTERACTIVE REMOTION CONSOLE · LIGHT THEME
              </div>
              <h2 className="text-3xl sm:text-5xl font-outfit font-extrabold text-[#090A0F] tracking-tight">
                Experience the Partner Portal in <span className="gradient-text-red">motion & live interaction.</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl mx-auto mt-3">
                Programmatic keyframes, spring physics, and real-time interactive telemetry. Try clicking tabs, typing custom link handles, or claiming instant payouts right inside the console!
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-300 hover:border-[#FF003C] transition-all shadow-2xl bg-white aspect-[16/10] sm:aspect-[16/9.2] max-w-5xl mx-auto">
              <Player
                component={PartnerProgramVideo}
                durationInFrames={360}
                compositionWidth={1280}
                compositionHeight={700}
                fps={30}
                controls={false}
                clickToPlay={false}
                doubleClickToFullscreen={false}
                autoPlay
                loop
                muted
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />

            </div>
          </AnimatedSection>
        </div>
      </section>



      {/* CREATIVE CATEGORY LEADER MIGRATION SECTION */}
      <section className="py-24 bg-[#090A0F] text-white border-b border-slate-800 relative overflow-hidden">
        {/* Ambient Red Blur & Grid Mesh Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#FF003C]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid-dark opacity-35 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181A22] text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest border border-[#FF003C]/30 shadow-lg shadow-rose-500/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FF003C] animate-pulse"></span>
                <span>⚡ MIGRATION COMMAND CENTER · $14.2M+ MOVED</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-extrabold tracking-tight text-white leading-tight">
                Category leaders are moving to <br className="hidden sm:inline" />
                <span className="gradient-text-red">Actionpackd.</span>
              </h2>
              <p className="mt-4 text-slate-400 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
                Over <strong className="text-white">$14.2M in monthly referral volume</strong> migrated seamlessly from Rewardful, PartnerStack, & FirstPromoter with zero link breakages, zero downtime, and 100% first-party attribution fidelity.
              </p>
            </div>

            {/* LIVE METRICS DASHBOARD BANNER */}
            <div className="bg-[#12141A]/90 border border-slate-800 backdrop-blur-xl rounded-2xl p-4 sm:p-6 mb-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono text-xs shadow-2xl">
              <div className="p-3 bg-[#181A22] rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase font-bold">MIGRATED VOLUME</div>
                <div className="text-xl font-bold text-white mt-1">$14.28M <span className="text-xs font-normal text-[#FF003C]">/ mo</span></div>
              </div>
              <div className="p-3 bg-[#181A22] rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase font-bold">MIGRATION DOWNTIME</div>
                <div className="text-xl font-bold text-green-400 mt-1">0.00ms</div>
              </div>
              <div className="p-3 bg-[#181A22] rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase font-bold">AVG MIGRATION TIME</div>
                <div className="text-xl font-bold text-white mt-1">&lt; 24 Hours</div>
              </div>
              <div className="p-3 bg-[#181A22] rounded-xl border border-[#FF003C]/40">
                <div className="text-slate-500 text-[10px] uppercase font-bold">ATTRIBUTION ACCURACY</div>
                <div className="text-xl font-bold text-[#FF003C] mt-1">99.8%</div>
              </div>
            </div>

            {/* PLATFORM FILTER TABS */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 font-mono text-xs">
              {[
                { id: 'all', label: 'All Platforms ($14.2M)' },
                { id: 'rewardful', label: 'Rewardful Migrations' },
                { id: 'partnerstack', label: 'PartnerStack Migrations' },
                { id: 'firstpromoter', label: 'FirstPromoter Migrations' },
                { id: 'topteams', label: 'Native Actionpackd Teams' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMigrationFilter(tab.id)}
                  className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                    migrationFilter === tab.id
                      ? 'bg-[#FF003C] border-[#FF003C] text-white font-bold shadow-lg shadow-rose-500/25 scale-105'
                      : 'bg-[#181A22] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* GRID OF REALISTIC ENTERPRISE MIGRATION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {migratedPlatforms
              .filter(item => migrationFilter === 'all' || item.id === migrationFilter)
              .map((item, idx) => (
                <AnimatedSection key={item.id} delay={idx * 0.08}>
                  <div
                    className={`rounded-3xl p-6 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group relative overflow-hidden ${
                      item.highlight
                        ? 'bg-gradient-to-b from-[#181B26] via-[#12141C] to-[#0F1117] border-2 border-[#FF003C]/70 shadow-xl shadow-rose-500/10'
                        : 'bg-[#12141C]/90 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 shadow-lg'
                    }`}
                  >
                    {/* Highlight Pill for Featured Migration */}
                    {item.highlight && (
                      <div className="absolute top-0 right-0 bg-[#FF003C] text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-sm">
                        FEATURED MIGRATION
                      </div>
                    )}

                    <div>
                      {/* CARD HEADER */}
                      <div className="flex items-center justify-between mb-3 pt-1">
                        <span className="text-xl">{item.fromLogo}</span>
                        <span className="text-[11px] font-mono font-semibold text-slate-300 bg-[#1A1D27] px-2.5 py-1 rounded-full border border-slate-700/60">
                          {item.volume}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h3 className="text-base font-outfit font-extrabold text-white tracking-tight mb-1">
                        {item.text}
                      </h3>

                      {/* SAVINGS BADGE */}
                      <div className="text-xs font-sans text-emerald-400 font-semibold mb-5 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item.savings}</span>
                      </div>

                      {/* COMPANIES / BRANDS LIST */}
                      <div className="space-y-2.5">
                        {item.companies.map((comp, cIdx) => (
                          <div
                            key={cIdx}
                            onClick={() => comp.caseStudy && setCaseStudyModal({ open: true, company: comp })}
                            className={`p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between group/company ${
                              comp.caseStudy
                                ? 'bg-[#1A1D27] border-slate-700/60 hover:border-[#FF003C]/80 hover:bg-[#212533] cursor-pointer shadow-sm'
                                : 'bg-[#151720] border-slate-800/80 text-slate-400 cursor-default'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-md shrink-0 border border-white/10"
                                style={{ backgroundColor: comp.accent || '#FF003C', color: comp.textColor || '#FFFFFF' }}
                              >
                                {comp.logoIcon || comp.name[0]}
                              </div>
                              <div className="min-w-0">
                                <div className="font-outfit font-extrabold text-sm text-white truncate group-hover/company:text-[#FF003C] transition-colors">
                                  {comp.name}
                                </div>
                                <div className="text-[10px] font-sans text-slate-400 truncate">
                                  {comp.tagline}
                                </div>
                              </div>
                            </div>

                            {/* CASE STUDY LINK OR VERIFIED CHECK */}
                            {comp.caseStudy ? (
                              <div className="shrink-0 text-[11px] font-sans font-semibold text-slate-300 bg-slate-800/90 border border-slate-700 px-2.5 py-1 rounded-lg group-hover/company:border-[#FF003C] group-hover/company:text-[#FF003C] transition-all flex items-center gap-1">
                                <span>Case Study</span>
                                <span className="text-[10px]">→</span>
                              </div>
                            ) : (
                              <span className="text-emerald-400 text-xs font-bold shrink-0">✓</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CARD FOOTER MIGRATION STATUS */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-sans text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-emerald-400 font-semibold">100% Migrated</span>
                      </div>
                      <span className="text-slate-400 font-medium">{item.timeframe}</span>
                    </div>

                  </div>
                </AnimatedSection>
              ))}
          </div>

          {/* INTERACTIVE COMPARISON TABLE CALLOUT */}
          <div className="mt-16 bg-[#12141A] border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-6 mb-6">
              <div>
                <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-wider mb-1">
                  ⚡ WHY 400+ HIGH-GROWTH SAAS TEAMS SWITCHED
                </div>
                <h3 className="text-2xl font-outfit font-extrabold text-white">
                  Actionpackd Partners vs. Legacy Platforms
                </h3>
              </div>
              <button
                onClick={() => setEnterpriseModalOpen(true)}
                className="btn-primary px-6 py-3 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider shrink-0 shadow-lg shadow-rose-500/20"
              >
                Schedule Free 1-Click Migration →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-4 bg-[#181A22] rounded-2xl border border-slate-800">
                <div className="text-slate-400 uppercase text-[10px] font-bold mb-2">1ST-PARTY LINK ATTRIBUTION</div>
                <div className="text-white font-bold text-sm mb-1">Custom Short Link Domains</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Legacy platforms use 3rd-party query params (<code className="text-[#FF003C]">?aff=123</code>) blocked by Brave & Safari. Actionpackd uses clean custom CNAME links (<code className="text-[#FF003C]">act.pk/brand</code>) with 99.8% capture.
                </p>
              </div>

              <div className="p-4 bg-[#181A22] rounded-2xl border border-slate-800">
                <div className="text-slate-400 uppercase text-[10px] font-bold mb-2">GLOBAL PAYOUT AUTOMATION</div>
                <div className="text-white font-bold text-sm mb-1">Instant Stripe Connect & SWIFT</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  No manual PayPal CSV exports or delayed monthly wires. Automated payouts disburse on the 1st of every month in 120+ currencies with zero fee markups.
                </p>
              </div>

              <div className="p-4 bg-[#181A22] rounded-2xl border border-[#FF003C]/40">
                <div className="text-slate-400 uppercase text-[10px] font-bold mb-2">WHITE-GLOVE MIGRATION</div>
                <div className="text-[#FF003C] font-bold text-sm mb-1">Zero Broken Affiliate Links</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Our dedicated migration team transfers your existing affiliate databases, referral URLs, custom commission tiers, and historical tracking without taking down your portal for even a single second.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ENHANCED CASE STUDY DETAIL MODAL */}
      {caseStudyModal.open && caseStudyModal.company && (
        <div
          className="fixed inset-0 bg-[#090A0F]/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setCaseStudyModal({ open: false, company: null })}
        >
          <div className="bg-[#12141A] border-2 border-[#FF003C] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-slide-up text-left text-white relative overflow-hidden">
            
            <button
              onClick={() => setCaseStudyModal({ open: false, company: null })}
              className="absolute top-6 right-6 text-slate-400 hover:text-white font-mono text-xl"
            >
              ✕
            </button>

            <div className="flex items-center gap-3.5 border-b border-slate-800 pb-5 mb-5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-outfit font-extrabold text-xl shadow-lg shrink-0 border border-white/10"
                style={{ backgroundColor: caseStudyModal.company.accent || '#FF003C', color: caseStudyModal.company.textColor || '#FFFFFF' }}
              >
                {caseStudyModal.company.logoIcon || caseStudyModal.company.name[0]}
              </div>
              <div>
                <h3 className="font-outfit font-extrabold text-xl text-white flex items-center gap-2">
                  <span>{caseStudyModal.company.name} Case Study</span>
                  <span className="bg-[#FF003C]/20 text-[#FF003C] text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-[#FF003C]/30 font-bold uppercase">VERIFIED</span>
                </h3>
                <div className="text-[11px] font-mono text-slate-400">{caseStudyModal.company.tagline || 'Category Leader Migration Breakdown'}</div>
              </div>
            </div>

            <div className="space-y-4 font-sans text-xs">
              {/* KEY STAT HIGHLIGHT */}
              <div className="bg-[#181A22] border border-[#FF003C]/40 p-4 rounded-2xl">
                <div className="text-[10px] font-mono font-bold text-[#FF003C] uppercase mb-1">⚡ PRIMARY MIGRATION IMPACT</div>
                <div className="text-sm sm:text-base font-outfit font-extrabold text-white leading-snug">
                  "{caseStudyModal.company.stat}"
                </div>
              </div>

              {/* BEFORE VS AFTER SPECS */}
              {caseStudyModal.company.metricBefore && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
                  <div className="p-3 bg-[#181A22] rounded-xl border border-red-500/30">
                    <div className="text-red-400 font-bold mb-1">BEFORE (Legacy):</div>
                    <div className="text-slate-300">{caseStudyModal.company.metricBefore}</div>
                  </div>
                  <div className="p-3 bg-[#181A22] rounded-xl border border-green-500/30">
                    <div className="text-green-400 font-bold mb-1">AFTER (Actionpackd):</div>
                    <div className="text-white font-bold">{caseStudyModal.company.metricAfter}</div>
                  </div>
                </div>
              )}

              {/* QUOTE IF AVAILABLE */}
              {caseStudyModal.company.quote && (
                <div className="p-4 bg-[#14161C] border border-slate-800 rounded-2xl italic text-slate-300 text-xs leading-relaxed">
                  "{caseStudyModal.company.quote}"
                </div>
              )}

              {/* MIGRATION TIME */}
              <div className="flex items-center justify-between text-[11px] font-mono py-2 px-3 bg-[#181A22] rounded-xl border border-slate-800 text-slate-400">
                <span>Migration Execution Duration:</span>
                <span className="text-green-400 font-bold">{caseStudyModal.company.timeToMigrate || '< 24 Hours'} (Zero Downtime)</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setCaseStudyModal({ open: false, company: null })
                    setApplyModalOpen(true)
                  }}
                  className="btn-primary flex-1 py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/20"
                >
                  Start Your Migration →
                </button>
                <button
                  onClick={() => setCaseStudyModal({ open: false, company: null })}
                  className="btn-black px-6 py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider border border-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* CORE PLATFORM FEATURES ("REVENUE ON AUTOPILOT") */}
      <section className="py-24 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#090A0F] text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-3">
                // PARTNER ENGINE
              </div>
              <h2 className="text-3xl sm:text-5xl font-outfit font-extrabold text-[#090A0F] tracking-tight">
                Revenue on <span className="gradient-text-red">autopilot.</span>
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Build scalable referral streams with high-converting attribution, custom short links, and instant global payouts.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* FEATURE 1 */}
            <AnimatedSection delay={0.05}>
              <div className="bento-card-light p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#090A0F] text-[#FF003C] font-mono font-bold text-xl flex items-center justify-center mb-6">
                    30%
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-[#090A0F] mb-3">
                    Recurring Lifetime Revenue
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Earn 30% recurring monthly commission on every referred customer for up to 24 months. Build predictable passive income.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs text-[#090A0F]">
                  <div className="flex justify-between mb-1">
                    <span>Commission Model:</span>
                    <span className="text-[#FF003C] font-bold">30% Monthly Recurring</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Auto-credited every 30 days</div>
                </div>
              </div>
            </AnimatedSection>

            {/* FEATURE 2 */}
            <AnimatedSection delay={0.1}>
              <div className="bento-card-dark p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF003C] text-white font-mono font-bold text-xl flex items-center justify-center mb-6">
                    🔗
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-white mb-3">
                    Branded Short Links & 60-Day Cookie
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    First-party short domains like <code className="text-[#FF003C]">act.pk/yourbrand</code> ensure zero cookie blocking and maximum conversion credit.
                  </p>
                </div>
                <div className="bg-[#14161C] border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-white">
                  <div className="flex justify-between mb-1">
                    <span>Attribution Window:</span>
                    <span className="text-[#FF003C] font-bold">60 Days Active</span>
                  </div>
                  <div className="text-[10px] text-slate-400">First-party server attribution</div>
                </div>
              </div>
            </AnimatedSection>

            {/* FEATURE 3 */}
            <AnimatedSection delay={0.15}>
              <div className="bento-card-light p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#090A0F] text-white font-mono font-bold text-xl flex items-center justify-center mb-6">
                    💸
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-[#090A0F] mb-3">
                    Automated Global Payouts
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Direct bank deposits, SWIFT, PayPal, and Stripe Connect payouts in 120+ countries on the 1st of every month.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs text-[#090A0F]">
                  <div className="flex justify-between mb-1">
                    <span>Supported Countries:</span>
                    <span className="text-[#FF003C] font-bold">120+ Worldwide</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Zero payout transaction fees</div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* INTERACTIVE EARNINGS CALCULATOR SECTION */}
      <section id="partner-calculator" className="py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#090A0F] text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-3">
                // ROI & EARNINGS CALCULATOR
              </div>
              <h2 className="text-3xl sm:text-5xl font-outfit font-extrabold text-[#090A0F]">
                Calculate your partner revenue.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-2">
                Estimate your monthly and annual recurring income based on referred clients.
              </p>
            </div>
          </AnimatedSection>

          <div className="bg-[#090A0F] text-white border-2 border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
            
            {/* PLAN SELECTION */}
            <div className="mb-8">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 font-semibold">
                SELECT AVERAGE REFERRED CLIENT PLAN:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Pro ($99/mo)', price: 99 },
                  { label: 'Agency ($299/mo)', price: 299 },
                  { label: 'Enterprise ($999/mo)', price: 999 }
                ].map((plan) => (
                  <button
                    key={plan.price}
                    onClick={() => setSelectedPlanPrice(plan.price)}
                    className={`py-3 px-4 rounded-xl border text-xs font-mono font-bold transition-all ${
                      selectedPlanPrice === plan.price
                        ? 'bg-[#FF003C] border-[#FF003C] text-white shadow-lg shadow-rose-500/30'
                        : 'bg-[#14161C] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {plan.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CLIENT COUNT SLIDER */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="text-slate-400 uppercase">REFERRED ACTIVE CUSTOMERS:</span>
                <span className="text-[#FF003C] font-extrabold text-2xl">{referredClients} Clients</span>
              </div>
              <input
                type="range"
                min="1"
                max="200"
                step="1"
                value={referredClients}
                onChange={(e) => setReferredClients(Number(e.target.value))}
                className="w-full accent-[#FF003C] cursor-pointer"
              />
            </div>

            {/* CALCULATED OUTPUT METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-800 text-center">
              <div className="p-4 bg-[#14161C] rounded-2xl border border-slate-800">
                <div className="text-slate-400 text-xs font-mono uppercase mb-1">Total Client MRR Generated</div>
                <div className="text-2xl sm:text-3xl font-outfit font-extrabold text-white">
                  ${monthlyTotalRevenue.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ mo</span>
                </div>
              </div>
              <div className="p-4 bg-[#14161C] rounded-2xl border border-[#FF003C]/40">
                <div className="text-slate-400 text-xs font-mono uppercase mb-1">Your Monthly Payout (30%)</div>
                <div className="text-2xl sm:text-3xl font-outfit font-extrabold text-[#FF003C]">
                  ${Math.round(monthlyCommission).toLocaleString()} <span className="text-xs font-normal text-slate-400">/ mo</span>
                </div>
              </div>
              <div className="p-4 bg-[#14161C] rounded-2xl border border-slate-800">
                <div className="text-slate-400 text-xs font-mono uppercase mb-1">Projected Annual Earnings</div>
                <div className="text-2xl sm:text-3xl font-outfit font-extrabold text-white">
                  ${Math.round(annualCommission).toLocaleString()} <span className="text-xs font-normal text-slate-400">/ yr</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setApplyModalOpen(true)}
                className="btn-primary px-10 py-4 rounded-full font-outfit font-bold text-xs uppercase tracking-wider shadow-xl shadow-rose-500/20"
              >
                Claim Your 30% Partner Link Now →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE LIVE PARTNER DASHBOARD SIMULATOR */}
      <section className="py-24 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#090A0F] text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-3">
                // PARTNER DASHBOARD SIMULATOR
              </div>
              <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-[#090A0F]">
                Experience the Actionpackd Partner Portal.
              </h2>
              <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto mt-2">
                Create a custom short link and watch real-time click and payout telemetry in action.
              </p>
            </div>
          </AnimatedSection>

          {/* DASHBOARD MOCKUP CONTAINER */}
          <div className="rounded-3xl border-2 border-[#090A0F] bg-[#090A0F] text-white shadow-2xl overflow-hidden">
            
            {/* TOP DASHBOARD NAVIGATION */}
            <div className="px-6 py-4 bg-[#14161C] border-b border-slate-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-slate-400 font-bold ml-2">actionpackd.com/partners/dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#FF003C] animate-pulse"></span>
                <span className="text-[#FF003C] font-bold">● LIVE TELEMETRY</span>
              </div>
            </div>

            {/* DASHBOARD BODY */}
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* LINK CREATOR BAR */}
              <div className="bg-[#181A22] border border-slate-800 rounded-2xl p-4 sm:p-6">
                <label className="block text-xs font-mono text-slate-400 uppercase font-bold mb-2">
                  GENERATE CUSTOM REFERRAL SHORT LINK:
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center bg-[#090A0F] border border-slate-700 rounded-xl px-4 py-3 font-mono text-xs">
                    <span className="text-slate-500 select-none">https://act.pk/</span>
                    <input
                      type="text"
                      value={customHandle}
                      onChange={(e) => setCustomHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="bg-transparent text-[#FF003C] font-bold focus:outline-none flex-1 ml-0.5"
                    />
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="btn-primary px-6 py-3 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>{copied ? '✓ COPIED LINK!' : 'COPY SHORT LINK'}</span>
                  </button>
                </div>
              </div>

              {/* LIVE TEST SIMULATION CONTROLS */}
              <div className="bg-[#181A22] border border-[#FF003C]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping"></span>
                  <span className="text-white font-bold">Interactive Telemetry Tester:</span>
                  <span className="text-slate-400 hidden sm:inline">Test live clicks & payouts</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleSimulateClick}
                    className="flex-1 sm:flex-initial bg-[#12141A] hover:bg-[#1f222d] border border-slate-700 hover:border-slate-500 text-white font-bold py-2 px-3.5 rounded-xl transition-all text-[11px]"
                  >
                    ⚡ Simulate Test Click (+1)
                  </button>
                  <button
                    onClick={handleSimulateConversion}
                    className="flex-1 sm:flex-initial bg-[#FF003C] hover:bg-[#FF2A55] text-white font-bold py-2 px-3.5 rounded-xl transition-all shadow-md text-[11px]"
                  >
                    💰 Simulate Pro Signup (+$29.70)
                  </button>
                </div>
              </div>

              {/* LIVE TOAST BANNER */}
              {liveToast && (
                <div className="bg-green-500/20 border border-green-500/40 text-green-300 px-4 py-2.5 rounded-xl font-mono text-xs flex items-center justify-between animate-slide-up shadow-lg">
                  <span>{liveToast}</span>
                  <span className="text-green-400 font-bold">REAL-TIME TELEMETRY ✓</span>
                </div>
              )}

              {/* ANALYTICS CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
                <div className="bg-[#14161C] border border-slate-800 rounded-xl p-4">
                  <div className="text-slate-400 text-[10px] uppercase">TOTAL CLICKS</div>
                  <div className="text-2xl font-bold text-white mt-1">{simulatedClicks.toLocaleString()}</div>
                </div>
                <div className="bg-[#14161C] border border-slate-800 rounded-xl p-4">
                  <div className="text-slate-400 text-[10px] uppercase">PAID CONVERSIONS</div>
                  <div className="text-2xl font-bold text-green-400 mt-1">{simulatedConversions} Signups</div>
                </div>
                <div className="bg-[#14161C] border border-slate-800 rounded-xl p-4">
                  <div className="text-slate-400 text-[10px] uppercase">CONVERSION RATE</div>
                  <div className="text-2xl font-bold text-white mt-1">{((simulatedConversions / simulatedClicks) * 100).toFixed(2)}%</div>
                </div>
                <div className="bg-[#14161C] border border-[#FF003C]/40 rounded-xl p-4">
                  <div className="text-slate-400 text-[10px] uppercase">UNPAID COMMISSION</div>
                  <div className="text-2xl font-bold text-[#FF003C] mt-1">${simulatedUnpaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              </div>

              {/* RECENT REFERRALS TABLE MOCKUP */}
              <div className="bg-[#14161C] border border-slate-800 rounded-2xl p-4 font-mono text-xs overflow-x-auto">
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-3">RECENT REFERRED ACCOUNTS</div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500">
                      <th className="pb-2">ACCOUNT</th>
                      <th className="pb-2">PLAN</th>
                      <th className="pb-2">STATUS</th>
                      <th className="pb-2 text-right">COMMISSION / MO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-2.5 font-bold text-white">Acme Corp (Ref: {customHandle})</td>
                      <td>Pro ($99)</td>
                      <td><span className="text-green-400 font-bold">Active ●</span></td>
                      <td className="text-right text-[#FF003C] font-bold">$29.70</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white">Vortex Studio</td>
                      <td>Agency ($299)</td>
                      <td><span className="text-green-400 font-bold">Active ●</span></td>
                      <td className="text-right text-[#FF003C] font-bold">$89.70</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white">Nexus Global</td>
                      <td>Enterprise ($999)</td>
                      <td><span className="text-green-400 font-bold">Active ●</span></td>
                      <td className="text-right text-[#FF003C] font-bold">$299.70</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* PARTNER TIERS MATRIX SECTION */}
      <section className="py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#090A0F] text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-3">
                // PARTNER TIERS
              </div>
              <h2 className="text-3xl sm:text-5xl font-outfit font-extrabold text-[#090A0F] tracking-tight">
                Designed for <span className="gradient-text-red">every partner type.</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* TIER 1 */}
            <AnimatedSection delay={0.05}>
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase font-bold mb-2">CREATOR & AFFILIATE</div>
                  <div className="text-3xl font-outfit font-black text-[#090A0F] mb-3">
                    20% <span className="text-xs font-mono font-normal text-slate-500">Recurring</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-6">
                    For YouTubers, bloggers, newsletter writers, and SaaS influencers looking to monetize content.
                  </p>
                  <ul className="space-y-3 text-xs font-sans mb-8 text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> Instant Link Generation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> 60-Day Cookie Window
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> Real-Time Analytics Portal
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="btn-black w-full py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider"
                >
                  Apply as Creator
                </button>
              </div>
            </AnimatedSection>

            {/* TIER 2 (FEATURED) */}
            <AnimatedSection delay={0.1}>
              <div className="bg-[#090A0F] text-white border-2 border-[#FF003C] rounded-3xl p-8 flex flex-col justify-between h-full shadow-2xl shadow-rose-500/20 relative">
                <div className="absolute -top-3.5 right-6 bg-[#FF003C] text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                  MOST POPULAR
                </div>
                <div>
                  <div className="text-xs font-mono text-[#FF003C] uppercase font-bold mb-2">AGENCY PARTNER</div>
                  <div className="text-3xl font-outfit font-black text-white mb-3">
                    30% <span className="text-xs font-mono font-normal text-slate-400">Recurring</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-6">
                    For digital agencies, automation consultants, and WhatsApp service providers implementing client setups.
                  </p>
                  <ul className="space-y-3 text-xs font-sans mb-8">
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> 30% Lifetime MRR Share
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> White-Label Client Workspaces
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> Priority Co-Selling Support
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> Shared Agency Slack Channel
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="btn-primary w-full py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/30"
                >
                  Apply as Agency
                </button>
              </div>
            </AnimatedSection>

            {/* TIER 3 */}
            <AnimatedSection delay={0.15}>
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase font-bold mb-2">STRATEGIC TECH PARTNER</div>
                  <div className="text-3xl font-outfit font-black text-[#090A0F] mb-3">
                    35% <span className="text-xs font-mono font-normal text-slate-500">Custom Tier</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-6">
                    For software platforms, CRM tools, and enterprise ecosystem integrators building joint solutions.
                  </p>
                  <ul className="space-y-3 text-xs font-sans mb-8 text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> Custom Revenue Sharing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> Joint Press Releases & PR
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> Co-Marketing Budget & Fund
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#FF003C] font-bold">✓</span> Dedicated Partner Engineer
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="btn-black w-full py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider"
                >
                  Contact Ecosystem Team
                </button>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* PARTNER MARKETPLACE HIGHLIGHT SECTION */}
      <section className="py-20 bg-[#090A0F] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#14161C] border border-[#FF003C]/40 mb-4 font-mono text-xs text-[#FF003C] font-bold uppercase">
              ⚡ ACTIONPACKD PARTNER NETWORK
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-white mb-4">
              Access 10,000+ Active Affiliates in our Marketplace.
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8 font-sans">
              Already running a SaaS product? Host your partner program on Actionpackd to instantly recruit top-tier creators, reviewers, and agencies.
            </p>
            <button
              onClick={() => setApplyModalOpen(true)}
              className="btn-primary px-8 py-3.5 rounded-full font-outfit font-bold text-xs uppercase tracking-wider"
            >
              List Your Program on Marketplace →
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-24 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-widest mb-2">// PROGRAM DETAILS</div>
              <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-[#090A0F]">
                Partner Program FAQs.
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {partnerFaqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bento-card-light overflow-hidden bg-white border-2 border-slate-200">
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

      {/* FINAL HIGH-IMPACT CONVERSION BANNER */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#FF003C] text-white p-10 sm:p-16 shadow-2xl border-4 border-[#090A0F] relative overflow-hidden">
            <h2 className="text-3xl sm:text-5xl font-outfit font-black uppercase tracking-tight mb-4 text-white">
              Ready to build monthly recurring revenue?
            </h2>
            <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto mb-8 font-sans">
              Join thousands of partners earning up to 30% lifetime recurring commissions with Actionpackd.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setApplyModalOpen(true)}
                className="btn-black px-10 py-4 rounded-full font-outfit font-black text-sm uppercase tracking-widest shadow-2xl"
              >
                Apply as a Partner Free →
              </button>
              <button
                onClick={onBackToHome}
                className="btn-outline px-8 py-4 rounded-full font-outfit font-bold text-sm uppercase tracking-widest"
              >
                Back to Main Landing Page
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION MODAL */}
      {applyModalOpen && (
        <div
          className="fixed inset-0 bg-[#090A0F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setApplyModalOpen(false)}
        >
          <div className="bg-white border-2 border-[#090A0F] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <img src="/assets/logo_mascot.png" alt="Mascot" className="w-8 h-8 object-contain" />
                <div>
                  <h3 className="font-outfit font-extrabold text-base text-[#090A0F]">Apply to Actionpackd Partners</h3>
                  <div className="text-[10px] font-mono text-[#FF003C] font-bold">Instant 30% Commission Account</div>
                </div>
              </div>
              <button onClick={() => setApplyModalOpen(false)} className="text-slate-400 hover:text-[#090A0F] font-mono text-lg">✕</button>
            </div>

            {applySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-2xl mx-auto">✓</div>
                <div className="font-outfit font-bold text-lg text-[#090A0F]">Application Received!</div>
                <p className="text-xs text-slate-600 font-sans">Setting up your partner portal & short link generator...</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-[11px] font-mono text-slate-500 mb-1 uppercase font-bold">FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={applyForm.name}
                    onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                    placeholder="Alex Mercer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-[#090A0F] focus:outline-none focus:border-[#FF003C] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-500 mb-1 uppercase font-bold">WORK EMAIL</label>
                  <input
                    type="email"
                    required
                    value={applyForm.email}
                    onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-[#090A0F] focus:outline-none focus:border-[#FF003C] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-500 mb-1 uppercase font-bold">WEBSITE / SOCIAL LINK</label>
                  <input
                    type="url"
                    required
                    value={applyForm.website}
                    onChange={(e) => setApplyForm({ ...applyForm, website: e.target.value })}
                    placeholder="https://youtube.com/@alexgrowth"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-[#090A0F] focus:outline-none focus:border-[#FF003C] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-500 mb-1 uppercase font-bold">PARTNER TYPE</label>
                  <select
                    value={applyForm.type}
                    onChange={(e) => setApplyForm({ ...applyForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-[#090A0F] focus:outline-none focus:border-[#FF003C] font-mono"
                  >
                    <option value="Creator / Affiliate">Creator / Affiliate (20% Share)</option>
                    <option value="Agency Partner">Agency Partner (30% Share)</option>
                    <option value="Strategic Tech Partner">Strategic Tech Partner (35% Share)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider mt-2 shadow-md shadow-rose-500/20"
                >
                  Submit Application →
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ENTERPRISE CONCIERGE MIGRATION MODAL */}
      {enterpriseModalOpen && (
        <div
          className="fixed inset-0 bg-[#090A0F]/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setEnterpriseModalOpen(false)}
        >
          <div className="bg-[#12141A] border-2 border-[#FF003C] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-slide-up text-white relative">
            <button onClick={() => setEnterpriseModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white font-mono text-xl">✕</button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF003C] text-white font-mono font-bold text-lg flex items-center justify-center shadow-lg">⚡</div>
              <div>
                <h3 className="font-outfit font-extrabold text-lg text-white">Enterprise Concierge Migration</h3>
                <div className="text-[10px] font-mono text-green-400 font-bold uppercase">● 0ms Downtime SLA Guarantee</div>
              </div>
            </div>

            {enterpriseSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500 text-green-400 flex items-center justify-center font-bold text-2xl mx-auto">✓</div>
                <div className="font-outfit font-bold text-lg text-white">Migration Request Received!</div>
                <p className="text-xs text-slate-400 font-sans">Our migration engineers will reach out within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleEnterpriseSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 uppercase font-bold">COMPANY NAME</label>
                  <input
                    type="text"
                    required
                    value={enterpriseForm.company}
                    onChange={(e) => setEnterpriseForm({ ...enterpriseForm, company: e.target.value })}
                    placeholder="Acme SaaS Inc."
                    className="w-full bg-[#181A22] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FF003C] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 uppercase font-bold">WORK EMAIL</label>
                  <input
                    type="email"
                    required
                    value={enterpriseForm.email}
                    onChange={(e) => setEnterpriseForm({ ...enterpriseForm, email: e.target.value })}
                    placeholder="growth@acme.com"
                    className="w-full bg-[#181A22] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FF003C] font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1 uppercase font-bold">CURRENT PLATFORM</label>
                    <select
                      value={enterpriseForm.platform}
                      onChange={(e) => setEnterpriseForm({ ...enterpriseForm, platform: e.target.value })}
                      className="w-full bg-[#181A22] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FF003C] font-mono"
                    >
                      <option value="Rewardful">Rewardful</option>
                      <option value="PartnerStack">PartnerStack</option>
                      <option value="FirstPromoter">FirstPromoter</option>
                      <option value="In-House / Other">In-House / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1 uppercase font-bold">MONTHLY VOLUME</label>
                    <select
                      value={enterpriseForm.volume}
                      onChange={(e) => setEnterpriseForm({ ...enterpriseForm, volume: e.target.value })}
                      className="w-full bg-[#181A22] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FF003C] font-mono"
                    >
                      <option value="$10,000+">$10k - $50k/mo</option>
                      <option value="$50,000+">$50k - $250k/mo</option>
                      <option value="$250,000+">$250k+/mo</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-[#181A22] border border-slate-800 rounded-xl text-[10px] font-mono text-slate-400">
                  🔒 Includes free migration audit, custom CNAME setup, and dedicated Slack/Teams channel.
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25"
                >
                  Request Concierge Migration Call →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
