/**
 * Dub.co API Client & MCP Service Module
 * Official API documentation: https://dub.co/docs/api-reference
 */

const DUB_API_BASE_URL = 'https://api.dub.co'

/**
 * Creates a short link using Dub API v1
 * @param {Object} params
 * @param {string} [params.apiKey] - Optional Dub API key
 * @param {string} params.domain - Short domain (e.g. 'act.pk' or 'dub.sh')
 * @param {string} params.key - Custom handle / slug (e.g. 'alex-growth')
 * @param {string} params.url - Target destination URL
 * @param {Array<string>} [params.tags] - Tags for referral grouping
 * @returns {Promise<Object>} Created link object metadata
 */
export async function createDubLink({ apiKey, domain = 'act.pk', key, url, tags = ['partner-referral'] }) {
  const linkKey = key.toLowerCase().replace(/[^a-z0-9-]/g, '')
  const destination = url || `https://actionpackd.com?ref=${linkKey}`

  // If user provided a real Dub API Key, invoke official Dub API
  if (apiKey && apiKey.trim().length > 5) {
    try {
      const response = await fetch(`${DUB_API_BASE_URL}/links`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          domain: domain === 'act.pk' ? 'dub.sh' : domain, // dub.sh default for non-enterprise
          key: linkKey,
          url: destination,
          tags: tags,
          comments: `Created via Actionpackd Partners Portal`
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error?.message || `Dub API HTTP ${response.status}`)
      }

      const data = await response.json()
      return {
        id: data.id || `link_${Math.random().toString(36).substring(2, 9)}`,
        shortUrl: data.shortUrl || `https://${domain}/${linkKey}`,
        domain: domain,
        key: linkKey,
        destination: destination,
        qrCode: data.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://${domain}/${linkKey}`,
        clicks: data.clicks || 0,
        createdAt: data.createdAt || new Date().toISOString(),
        isLiveApi: true
      }
    } catch (err) {
      console.warn('Dub API call failed, using high-fidelity fallback response:', err.message)
    }
  }

  // Realistic Dub API Payload Simulation Response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `link_${Math.random().toString(36).substring(2, 9)}`,
        shortUrl: `https://${domain}/${linkKey}`,
        domain: domain,
        key: linkKey,
        destination: destination,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://${domain}/${linkKey}`,
        clicks: Math.floor(Math.random() * 120) + 1420,
        conversions: Math.floor(Math.random() * 10) + 84,
        earnings: 2494.80,
        createdAt: new Date().toISOString(),
        isLiveApi: false,
        apiMessage: apiKey ? 'Fallback mode active (API Key invalid)' : 'Dub API Sandbox Mode Active'
      })
    }, 400)
  })
}

/**
 * Fetch Dub Link Analytics & Telemetry
 */
export async function getDubAnalytics({ apiKey, key = 'alex-growth', domain = 'act.pk' }) {
  if (apiKey && apiKey.trim().length > 5) {
    try {
      const response = await fetch(`${DUB_API_BASE_URL}/analytics?domain=${domain}&key=${key}`, {
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        return { isLive: true, data }
      }
    } catch (e) {
      console.warn('Dub Analytics API error:', e)
    }
  }

  return {
    isLive: false,
    data: {
      clicks: 1420,
      leads: 184,
      sales: 84,
      revenue: '$8,316.00',
      commission: '$2,494.80',
      topCountries: [
        { country: 'United States', code: 'US', clicks: 680, flag: '🇺🇸' },
        { country: 'United Kingdom', code: 'GB', clicks: 240, flag: '🇬🇧' },
        { country: 'Germany', code: 'DE', clicks: 190, flag: '🇩🇪' },
        { country: 'Canada', code: 'CA', clicks: 140, flag: '🇨🇦' },
        { country: 'Japan', code: 'JP', clicks: 110, flag: '🇯🇵' }
      ]
    }
  }
}

/**
 * Dub MCP Server Installation Configuration Guide Data
 */
export const DUB_MCP_CONFIG_GUIDE = {
  name: 'Dub Model Context Protocol (MCP) Integration',
  version: '1.2.0',
  description: 'Connect Dub.co short-link creation and referral tracking directly to AI Agents (Cursor, Claude Desktop, Antigravity, ChatGPT).',
  tools: [
    {
      name: 'dub_create_partner_link',
      description: 'Creates an act.pk custom short link for partner referral tracking.',
      params: '{ domain: "act.pk", key: "partner-slug", url: "destination" }'
    },
    {
      name: 'dub_get_analytics',
      description: 'Retrieves click, country, and conversion analytics for a partner short link.',
      params: '{ key: "partner-slug", timeframe: "30d" }'
    },
    {
      name: 'dub_track_conversion',
      description: 'Records Stripe signup conversion and credits 30% recurring payout to partner.',
      params: '{ ref: "partner-slug", amount: 99, commission: 29.70 }'
    }
  ],
  setupSteps: [
    {
      step: 1,
      title: 'Get your Dub API Key',
      detail: 'Sign up at dub.co → Go to Workspace Settings → API Keys → Generate a new API Key with "links:write" scope.'
    },
    {
      step: 2,
      title: 'Add Dub MCP Server to your AI Assistant',
      detail: 'Add the JSON configuration snippet to your tool settings file (mcp.json or claude_desktop_config.json).'
    },
    {
      step: 3,
      title: 'Test AI Agent Tool Invocation',
      detail: 'Ask your AI: "Create an act.pk/mybrand short link for my referral campaign" and watch it execute via Dub MCP!'
    }
  ],
  mcpJsonSnippet: JSON.stringify({
    mcpServers: {
      dub: {
        command: "npx",
        args: ["-y", "@dub/mcp@latest"],
        env: {
          DUB_API_KEY: "DUB_API_KEY_HERE"
        }
      }
    }
  }, null, 2)
}
