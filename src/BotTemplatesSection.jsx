import React, { useState, useEffect } from 'react'
import { Player } from '@remotion/player'
import { BotTemplateCardVideo } from './BotTemplateCardVideo'
import { botTemplates, botCategories } from './botTemplatesData'

export const BotTemplatesSection = ({ onTryBot }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 9
  const allTemplatesList = Object.values(botTemplates)

  // Reset to Page 1 when search or category filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery])

  // Filter templates by category and search term
  const filteredTemplates = allTemplatesList.filter(template => {
    const matchesCategory =
      selectedCategory === 'All' ||
      template.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, filteredTemplates.length)
  const displayedTemplates = filteredTemplates.slice(startIndex, endIndex)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      const sectionEl = document.getElementById('bot-templates')
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <section id="bot-templates" className="py-24 border-b border-slate-800 bg-[#090A0F] text-white bg-grid-dark relative overflow-hidden">
      
      {/* GLOWING AMBIENT ACCENTS */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FF003C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#14161C] border border-[#FF003C]/40 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF003C] animate-pulse" />
            <span className="text-[#FF003C] font-mono text-xs font-bold uppercase tracking-wider">
              18+ Remotion Animated Templates
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-outfit font-extrabold text-white tracking-tight leading-tight">
            Production-Ready WhatsApp <span className="gradient-text-red">Bot Templates</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base font-sans mt-3 leading-relaxed">
            Deploy pre-built, Meta-verified AI workflows with dynamic Remotion frame animations. Click <span className="text-white font-semibold">"Try Bot"</span> to launch an interactive live chat preview!
          </p>
        </div>

        {/* SEARCH BAR & CATEGORY FILTER TABS */}
        <div className="mb-10 space-y-6">
          {/* SEARCH INPUT & METRIC */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12141A] border border-slate-800 p-3 sm:px-6 rounded-2xl">
            
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 18+ bot templates (e.g., rental, lead, refund, retreat)..."
                className="w-full bg-[#181A22] border border-slate-700 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#FF003C] placeholder-slate-500 font-sans"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="px-3 py-1 bg-[#181A22] border border-slate-800 rounded-full font-bold text-white">
                SHOWING {filteredTemplates.length > 0 ? `${startIndex + 1}–${endIndex}` : '0'} OF {filteredTemplates.length} TEMPLATES
              </span>
              <span className="hidden lg:inline text-[#25D366] font-bold">● Page {currentPage} of {totalPages}</span>
            </div>
          </div>

          {/* CATEGORY PILL TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {botCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[#FF003C] text-white shadow-lg shadow-rose-500/25 border border-[#FF003C]'
                    : 'bg-[#12141A] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* BOT TEMPLATES GRID (9 PER PAGE) */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16 bg-[#12141A] border border-slate-800 rounded-3xl">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-outfit font-bold text-white mb-1">No matching templates found</h3>
            <p className="text-slate-400 text-xs font-sans mb-4">Try clearing your search query or picking a different category filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery('') }}
              className="px-5 py-2 rounded-xl bg-[#FF003C] text-white font-mono text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {displayedTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white text-[#090A0F] border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#FF003C] transition-all group flex flex-col justify-between"
                >
                  {/* TOP REMOTION ANIMATION DISPLAY HEADER */}
                  <div className="relative aspect-[2/1] w-full bg-[#F8FAFC] border-b border-slate-200 overflow-hidden">
                    <Player
                      component={BotTemplateCardVideo}
                      inputProps={{
                        icon: template.icon,
                        name: template.name,
                        accentColor: template.accentColor || '#FF003C',
                        liveMsg: template.liveMsg
                      }}
                      durationInFrames={90}
                      compositionWidth={400}
                      compositionHeight={200}
                      fps={30}
                      autoPlay
                      loop
                      controls={false}
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    
                    {/* TOP CORNER META BADGE */}
                    <div className="absolute top-3 right-3 bg-[#090A0F]/80 backdrop-blur-md text-white border border-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 z-10 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                      <span>Meta Cloud</span>
                    </div>
                  </div>

                  {/* CARD BODY CONTENT */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* TITLE */}
                      <h3 className="text-lg font-outfit font-extrabold text-[#090A0F] leading-snug mb-2 group-hover:text-[#FF003C] transition-colors">
                        {template.name}
                      </h3>

                      {/* CATEGORY TAG PILL */}
                      <div className="mb-3">
                        <span className="inline-block px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-mono font-bold rounded-md">
                          {template.category}
                        </span>
                      </div>

                      {/* DESCRIPTION */}
                      <p className="text-slate-600 text-xs leading-relaxed font-sans line-clamp-3 mb-5">
                        {template.description}
                      </p>
                    </div>

                    {/* BOTTOM ACTION BAR */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      {/* TRY BUTTON */}
                      <button
                        onClick={() => onTryBot(template.id)}
                        className="px-4 py-1.5 rounded-lg border-2 border-[#090A0F] text-[#090A0F] font-outfit font-bold text-xs uppercase tracking-wider hover:bg-[#FF003C] hover:border-[#FF003C] hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Try</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>

                      {/* VIEWS COUNTER WITH EYE ICON */}
                      <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs font-semibold">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{template.views}</span>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* PAGINATION CONTROLS (9 PER PAGE) */}
            {totalPages > 1 && (
              <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12141A] border border-slate-800 p-4 rounded-2xl">
                
                <div className="text-xs font-mono text-slate-400">
                  Showing <span className="text-white font-bold">{startIndex + 1}–{endIndex}</span> of <span className="text-white font-bold">{filteredTemplates.length}</span> templates
                </div>

                {/* PAGE BUTTONS */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                      currentPage === 1
                        ? 'bg-[#181A22] text-slate-600 border border-slate-800 cursor-not-allowed'
                        : 'bg-[#181A22] text-white border border-slate-700 hover:border-[#FF003C] hover:text-[#FF003C]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Prev</span>
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-[#FF003C] text-white shadow-lg shadow-rose-500/25 border border-[#FF003C]'
                            : 'bg-[#181A22] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                      currentPage === totalPages
                        ? 'bg-[#181A22] text-slate-600 border border-slate-800 cursor-not-allowed'
                        : 'bg-[#181A22] text-white border border-slate-700 hover:border-[#FF003C] hover:text-[#FF003C]'
                    }`}
                  >
                    <span>Next</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

              </div>
            )}
          </>
        )}

      </div>
    </section>
  )
}

export default BotTemplatesSection
