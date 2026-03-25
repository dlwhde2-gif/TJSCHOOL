'use client';
import React, { useState, useEffect } from 'react'
import { X, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

const Popup = () => {
  const [popups, setPopups] = useState([])
  const [closedPopups, setClosedPopups] = useState([])

  useEffect(() => {
    const fetchPopups = async () => {
      const supabase = getSupabase()
      try {
        const { data, error } = await supabase.from('popups').select('*').eq('isActive', true)
        if (error) throw error
        setPopups(data || [])
      } catch (err) { console.error('팝업 불러오기 에러:', err) }
    }
    fetchPopups()
  }, [])

  const closePopup = (id) => {
    setClosedPopups([...closedPopups, id])
  }

  const hideToday = (id) => {
    const expiry = new Date().getTime() + 24 * 60 * 60 * 1000
    localStorage.setItem(`hide_popup_${id}`, expiry)
    closePopup(id)
  }

  useEffect(() => {
    const checkHidden = () => {
      const now = new Date().getTime()
      const hidden = popups.filter(p => {
        const hideUntil = localStorage.getItem(`hide_popup_${p.id}`)
        return hideUntil && now < parseInt(hideUntil)
      }).map(p => p.id)
      setClosedPopups(prev => [...new Set([...prev, ...hidden])])
    }
    if (popups.length > 0) checkHidden()
  }, [popups])

  const activePopups = popups.filter(p => !closedPopups.includes(p.id))

  if (activePopups.length === 0) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 pointer-events-none">
      {/* Dimmed Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto transition-opacity duration-700 animate-in fade-in" 
      />
      
      {/* Popup Container (Horizontal and Centered) */}
      <div className="relative z-10 flex flex-row flex-wrap gap-10 items-center justify-center pointer-events-auto max-w-full max-h-full overflow-y-auto no-scrollbar p-6">
        {activePopups.map((popup) => (
          <div 
            key={popup.id} 
            className="w-[360px] bg-white rounded-3xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20 flex flex-col group shrink-0"
          >
            {/* Image Container with Fixed Height */}
            <div className="relative h-[480px] w-full overflow-hidden bg-gray-50 flex items-center justify-center">
              {popup.image ? (
                <img 
                  src={popup.image} 
                  alt={popup.title} 
                  className="w-full h-full object-contain" 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1544717297-fa154daaf76e'
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                  <ImageIcon size={64} className="text-primary/20" />
                </div>
              )}
              
              {/* Subtle hover overlay for clarity */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Content Container with Fixed Height for uniformity */}
            <div className="p-7 bg-white flex flex-col justify-between h-[130px]">
              <div className="overflow-hidden">
                <h4 className="text-gray-900 text-lg font-bold leading-tight line-clamp-2 mb-1">
                  {popup.title || '공지사항'}
                </h4>
              </div>
              
              <div>
                <a 
                  href={popup.link || '#'} 
                  target="_blank"
                  className="inline-flex items-center text-primary font-bold text-sm hover:underline tracking-tight"
                >
                  자세히 보기 <ExternalLink size={14} className="ml-1.5" />
                </a>
              </div>
            </div>

            {/* Footer buttons with fixed height */}
            <div className="flex border-t border-gray-100 bg-gray-50/80">
              <button 
                onClick={() => hideToday(popup.id)}
                className="flex-1 py-5 text-gray-500 hover:text-gray-900 hover:bg-gray-100/50 transition-colors text-[13px] font-medium border-r border-gray-100"
              >
                오늘 하루 보지 않기
              </button>
              <button 
                onClick={() => closePopup(popup.id)} 
                className="px-10 py-5 bg-primary text-white text-[13px] font-bold hover:bg-primary/90 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Popup
