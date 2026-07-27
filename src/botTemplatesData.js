export const botTemplates = {
  'wismo-order-tracking': {
    id: 'wismo-order-tracking',
    name: 'Order Tracking / WISMO Bot',
    category: 'E-Commerce & Orders',
    views: 2420,
    icon: '📦',
    accentColor: '#FF003C',
    welcome: "Hi! 📦 Want to check your order status? Enter your Order ID or registered phone number below!",
    description: "Resolves 'where is my order' (WISMO) inquiries automatically without human involvement. Provides real-time carrier tracking & ETA delivery updates.",
    liveMsg: "📦 Order #4821 Out for Delivery!",
    responses: {
      default: "Order #4821 is currently in transit with FedEx! Estimated delivery: Tomorrow by 2:00 PM. Tracking link: https://fedex.com/track/4821",
      status: "Your package has arrived at the local distribution facility in Chicago, IL.",
      change: "Need to change your delivery address or request a hold? I can update carrier instructions instantly."
    }
  },
  'abandoned-cart-recovery': {
    id: 'abandoned-cart-recovery',
    name: 'Abandoned Cart Recovery Bot',
    category: 'E-Commerce & Orders',
    views: 2140,
    icon: '🛒',
    accentColor: '#F43F5E',
    welcome: "Hey! 🛒 We noticed you left item(s) in your checkout cart. Need help completing your order?",
    description: "Re-engage shoppers who left items at checkout. Automate 1-click checkout discounts and recover up to 34% of lost revenue on WhatsApp.",
    liveMsg: "🛒 15% OFF Checkout Link Sent!",
    responses: {
      default: "Your cart items are reserved for the next 30 minutes! Use code SAVE15 for 15% OFF + Free Express Shipping.",
      checkout: "Click here for instant 1-click WhatsApp checkout: https://actionpackd.com/checkout?code=SAVE15",
      support: "Have questions about product sizing or shipping methods? I can answer right now!"
    }
  },
  'product-qa-catalog': {
    id: 'product-qa-catalog',
    name: 'Product Q&A & Catalog Browsing Bot',
    category: 'E-Commerce & Orders',
    views: 1350,
    icon: '🛍️',
    accentColor: '#8B5CF6',
    welcome: "Welcome! 🛍️ Ask me any product specification question or browse our interactive new arrivals catalog!",
    description: "Answers product specifications, stock availability, and enables interactive catalog browsing directly inside WhatsApp.",
    liveMsg: "🛍️ Interactive Catalog Sent!",
    responses: {
      default: "Our Pro Wireless Headphones feature active noise cancellation, 30-hour battery life, and Bluetooth 5.3! Stock is available.",
      specs: "Dimensions: 180 x 170 mm | Weight: 250g | Fast Charge: 10 mins gives 4 hours playback.",
      catalog: "Here is our summer collection interactive catalog card. Tap any item to add to your WhatsApp bag!"
    }
  },
  'returns-refund-automation': {
    id: 'returns-refund-automation',
    name: 'Returns & Refund Automation Bot',
    category: 'E-Commerce & Orders',
    views: 1890,
    icon: '🔄',
    accentColor: '#3B82F6',
    welcome: "Hello! 🔄 I can assist with instant returns and refund requests. What is your order number?",
    description: "Automates return requests, pre-paid shipping label generation, and refund status tracking while cutting human support tickets.",
    liveMsg: "🔄 Return Label #882 Generated!",
    responses: {
      default: "Order #882 is eligible for return! I have generated your pre-paid shipping label PDF. Download and attach to your parcel.",
      refund: "Once your item is dropped at UPS, your refund of $129.00 will credit back to your card within 24 hours.",
      policy: "We offer hassle-free 30-day returns on all unused items with original packaging."
    }
  },
  'post-purchase-upsell': {
    id: 'post-purchase-upsell',
    name: 'Post-Purchase Review & Upsell Flow Bot',
    category: 'E-Commerce & Orders',
    views: 980,
    icon: '⭐',
    accentColor: '#F59E0B',
    welcome: "Hi! 👋 Hope you loved your recent purchase! How would you rate your experience from 1 to 5 stars?",
    description: "Collect CSAT feedback ratings, drive Google reviews, and present personalized cross-sell recommendations after delivery.",
    liveMsg: "⭐ 5-Star Review & Upsell Saved!",
    responses: {
      default: "Thank you for the 5-star rating! ⭐ As a thank-you, here is an exclusive 20% OFF voucher for matching accessories.",
      review: "Would you mind sharing your review on Google? We'll credit $10 store points to your account!",
      upsell: "Customers who bought your item also love our Leather Carrying Case (now $19 instead of $35)."
    }
  },
  'lead-qualification-bant': {
    id: 'lead-qualification-bant',
    name: 'Lead Qualification Bot (BANT Scoring)',
    category: 'Sales & Lead Gen',
    views: 1940,
    icon: '🎯',
    accentColor: '#FF003C',
    welcome: "Hi! 👋 I'm your AI lead qualification specialist. What service are you looking for and what is your team size?",
    description: "Pre-qualifies prospects using BANT (Budget, Authority, Need, Timeline) framework before seamless handoff to sales reps.",
    liveMsg: "🎯 BANT Score: 95% Qualified!",
    responses: {
      default: "Based on your company size (50+ employees) and timeline (Immediate), your lead score is 95%! Let's book a call with an Enterprise AE.",
      budget: "What is your estimated annual software budget range? ($5k-$20k / $20k-$100k / $100k+)",
      timeline: "When are you planning to deploy your AI communication infrastructure?"
    }
  },
  'drip-nurture-sequence': {
    id: 'drip-nurture-sequence',
    name: 'Drip Nurture Sequence Bot',
    category: 'Sales & Lead Gen',
    views: 1620,
    icon: '📬',
    accentColor: '#10B981',
    welcome: "Welcome to Actionpackd Academy! 📬 Ready for Day 1 of your WhatsApp automation masterclass?",
    description: "Personalizes broadcast timing and message content based on funnel stage with ~98% open rates and automated follow-ups.",
    liveMsg: "📬 Stage 2 Nurture Message Sent!",
    responses: {
      default: "Lesson 1: How top DTC brands achieve 45% WhatsApp checkout conversion rates. Click to read the 2-minute breakdown!",
      next: "Great! Tomorrow at 10 AM, I will send Lesson 2: Setting up automated Comment Auto-DMs on Instagram.",
      unsub: "You can pause or adjust your lesson frequency anytime by replying 'PAUSE'."
    }
  },
  'click-to-whatsapp-ad': {
    id: 'click-to-whatsapp-ad',
    name: 'Click-to-WhatsApp Ad Responder Bot',
    category: 'Sales & Lead Gen',
    views: 2810,
    icon: '⚡',
    accentColor: '#EC4899',
    welcome: "Hey there! ⚡ Thanks for clicking our Meta ad! Here is your exclusive 20% OFF coupon code.",
    description: "Connects Meta Facebook/Instagram Ads to instant WhatsApp AI responses for 0.38s latency lead capturing.",
    liveMsg: "⚡ Meta Ad Lead Instant DM Sent!",
    responses: {
      default: "Welcome! Your code META20 is active. Would you like me to show our top 3 best-selling products for this offer?",
      claim: "Offer claimed! Here is your direct 1-click checkout link with coupon pre-applied.",
      agent: "Want to speak with a specialist right now? Tap 'Connect Agent' to chat live."
    }
  },
  'crm-sync-lead-capture': {
    id: 'crm-sync-lead-capture',
    name: 'CRM Sync & Lead Capture Bot',
    category: 'Sales & Lead Gen',
    views: 1470,
    icon: '🔗',
    accentColor: '#06B6D4',
    welcome: "Hello! 🔗 What's your business email and phone number? I will sync your profile to our VIP sales database.",
    description: "Captures customer details and pushes full conversation history to HubSpot, Salesforce, or Zoho CRM so agents get full context.",
    liveMsg: "🔗 Synced to Salesforce CRM!",
    responses: {
      default: "Profile created! Your contact details & chat logs have been synced to Salesforce CRM ID #8841. An account executive will follow up.",
      hubspot: "HubSpot deal created under stage 'Qualified Prospect'. All tags updated.",
      notes: "Internal notes logged: High-intent enterprise inquiry with 500+ seat requirement."
    }
  },
  'appointment-booking-reminder': {
    id: 'appointment-booking-reminder',
    name: 'Appointment Booking & Reminder Bot',
    category: 'Appointments & Services',
    views: 1530,
    icon: '📅',
    accentColor: '#6366F1',
    welcome: "Hi! 📅 I can schedule your consultation or strategy session. What day works best?",
    description: "Interactive calendar selection, preparation materials delivery, and 1-tap WhatsApp reminders to eliminate no-shows.",
    liveMsg: "📅 Consultation Booked 10:00 AM!",
    responses: {
      default: "We have openings tomorrow at 10:00 AM EST and 3:00 PM EST. Tap a slot to confirm your calendar invite!",
      confirm: "Appointment confirmed for tomorrow at 10:00 AM EST. Calendar invite & Zoom link sent to your chat.",
      prep: "Here is your 2-minute pre-meeting prep sheet PDF so we can make the most of our call."
    }
  },
  'clinic-healthcare-intake': {
    id: 'clinic-healthcare-intake',
    name: 'Clinic & Healthcare Intake Bot',
    category: 'Appointments & Services',
    views: 1180,
    icon: '🩺',
    accentColor: '#14B8A6',
    welcome: "Hello. 🩺 Welcome to City Health Clinic. Would you like to schedule a doctor visit or complete your intake form?",
    description: "Automated patient intake screening, appointment scheduling, pre-visit instructions, and lab report notifications.",
    liveMsg: "🩺 Patient Intake Verified!",
    responses: {
      default: "Intake form verified! Please remember to fast for 8 hours prior to your 9:00 AM appointment tomorrow.",
      doctor: "Dr. Roberts is available tomorrow at 11:30 AM for General Consultation. Shall I lock this slot?",
      location: "Clinic address: 450 Medical Parkway, Suite 300. Free parking available in Garage B."
    }
  },
  'salon-repair-booking': {
    id: 'salon-repair-booking',
    name: 'Salon, Spa & Repair Service Booking Bot',
    category: 'Appointments & Services',
    views: 890,
    icon: '✂️',
    accentColor: '#F43F5E',
    welcome: "Hi! ✂️ Ready to book a haircut, spa package, or device repair service appointment?",
    description: "Service selection, stylist/technician assignment, time-slot selection, and automated booking deposit collection.",
    liveMsg: "✂️ Spa Package Confirmed!",
    responses: {
      default: "Our Deluxe Spa & Facial Package has slots available today at 4:00 PM with Master Stylist Sarah!",
      price: "Deluxe Package is $85. A $20 deposit locks your reservation with free cancellation up to 2h prior.",
      confirm: "Booking confirmed! Reservation code #SP-992 saved. See you at 4:00 PM!"
    }
  },
  'faq-deflection-tier1': {
    id: 'faq-deflection-tier1',
    name: 'FAQ Deflection & Tier-1 Support Bot',
    category: 'Support',
    views: 2290,
    icon: '🎧',
    accentColor: '#3B82F6',
    welcome: "Hello! 🎧 Welcome to 24/7 Support. Ask me any question about shipping, refunds, billing, or features!",
    description: "Resolves repetitive Tier-1 support questions 24/7 using AI knowledge bases, deflecting up to 70% of support tickets.",
    liveMsg: "🎧 Tier-1 Ticket Auto-Resolved!",
    responses: {
      default: "Based on our knowledge base: Standard shipping takes 2-4 business days. Orders over $50 qualify for Free Shipping!",
      billing: "Invoices can be downloaded anytime from your account billing tab or requested via WhatsApp.",
      solved: "Glad I could resolve your question! Need help with anything else today?"
    }
  },
  'multilingual-support-router': {
    id: 'multilingual-support-router',
    name: 'Multilingual Support Router Bot',
    category: 'Support',
    views: 1120,
    icon: '🌐',
    accentColor: '#8B5CF6',
    welcome: "Hello! / ¡Hola! / Bonjour! 🌐 I speak 40+ languages. How can I assist you today?",
    description: "Auto-detects customer language (Spanish, French, Arabic, German, etc.) and routes inquiries to language-specific human teams.",
    liveMsg: "🌐 Auto-Routed to Spanish Desk!",
    responses: {
      default: "¡Hola! He detectado que hablas español. Te estoy conectando con nuestro equipo de atención en español.",
      french: "Bonjour! J'ai détecté que vous parlez français. Transfert vers notre équipe francophone en cours...",
      german: "Guten Tag! Ich habe Deutsch erkannt. Ich verbinde Sie mit unserem deutschen Support-Team."
    }
  },
  'human-handoff-escalation': {
    id: 'human-handoff-escalation',
    name: 'Human Handoff & Escalation Bot',
    category: 'Support',
    views: 1760,
    icon: '👥',
    accentColor: '#FF003C',
    welcome: "Hi! 👋 I'm your AI assistant. If your query requires specialized human attention, I will transfer you seamlessly.",
    description: "Invisible transition layer that transfers complex queries to live team inboxes with full conversation summary and AI notes.",
    liveMsg: "👥 Live Agent Handoff Active!",
    responses: {
      default: "I understand this is a complex technical question. Transferring you to Senior Engineer Alex now with full conversation history!",
      wait: "Average wait time: 14 seconds. Agent Alex has joined the chat.",
      notes: "Internal AI summary: Customer requesting custom webhook payload debugging for API v2."
    }
  },
  'kyc-authentication-otp': {
    id: 'kyc-authentication-otp',
    name: 'KYC & Authentication OTP Bot',
    category: 'Finance, HR & Ops',
    views: 2650,
    icon: '🔐',
    accentColor: '#10B981',
    welcome: "Hello! 🔐 Please enter your 6-digit OTP code or upload your government ID for identity verification.",
    description: "High-utility security template for instant OTP verification, ID document collection, and identity verification over WhatsApp.",
    liveMsg: "🔐 2FA OTP Code Verified!",
    responses: {
      default: "OTP verified! 🔐 Your 2-Factor Authentication request for account #9941 is approved.",
      kyc: "Government ID photo received and validated! KYC Tier 2 verification status: APPROVED.",
      security: "All verification codes expire in 5 minutes. Never share your OTP with anyone."
    }
  },
  'hr-recruitment-onboarding': {
    id: 'hr-recruitment-onboarding',
    name: 'HR Recruitment & Onboarding Bot',
    category: 'Finance, HR & Ops',
    views: 1240,
    icon: '💼',
    accentColor: '#A855F7',
    welcome: "Hi applicant! 💼 Welcome to Careers. Which open position are you applying for today?",
    description: "Pre-built industry template for candidate screening, resume uploads, interview scheduling, and employee onboarding flows.",
    liveMsg: "💼 Applicant Screened & Scheduled!",
    responses: {
      default: "Great! Please attach your Resume PDF. Our AI candidate screener will analyze your skills match in 10 seconds.",
      match: "Resume parsed! Skill match score: 92%. Would you like to pick an interview slot with HR?",
      onboard: "Welcome aboard! Here is your Day 1 orientation portal link and team Slack invite."
    }
  },
  'payment-reminder-invoice': {
    id: 'payment-reminder-invoice',
    name: 'Payment Reminder & Invoice Follow-up Bot',
    category: 'Finance, HR & Ops',
    views: 1980,
    icon: '💳',
    accentColor: '#F59E0B',
    welcome: "Hello! 💳 Friendly reminder regarding Invoice #INV-904 ($249.00) due tomorrow.",
    description: "Automated billing reminders, PDF invoice links, and instant WhatsApp payment links to shorten payment collection cycles.",
    liveMsg: "💳 Invoice #904 Paid via Stripe!",
    responses: {
      default: "Click here to pay Invoice #INV-904 with 1-click Apple Pay / Credit Card: https://pay.actionpackd.com/inv904",
      receipt: "Payment received! Receipt #REC-904 generated and emailed to your address.",
      extension: "Need a 7-day payment extension? Tap 'Request Extension' to apply automatically."
    }
  }
}

export const botCategories = [
  'All',
  'E-Commerce & Orders',
  'Sales & Lead Gen',
  'Appointments & Services',
  'Support',
  'Finance, HR & Ops'
]
