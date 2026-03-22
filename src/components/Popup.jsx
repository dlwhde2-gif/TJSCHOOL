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
    <div className="fixed top-24 left-8 z-[100] flex flex-col space-y-8 pointer-events-none">
      {activePopups.map((popup) => (
        <div key={popup.id} className="w-[360px] bg-white rounded-[40px] shadow-2xl overflow-hidden pointer-events-auto animate-fade-in border border-gray-200 flex flex-col">
          <div className="aspect-[1.2/1.5] relative overflow-hidden bg-gray-100 flex items-center justify-center">
            {popup.image ? (
              <img 
                src={popup.image} 
                alt={popup.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1544717297-fa154daaf76e'
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                <ImageIcon size={64} className="text-primary/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <h4 className="text-white text-xl font-bold mb-4 line-clamp-2">{popup.title || '공지사항'}</h4>
               <a 
                 href={popup.link} 
                 target="_blank"
                 className="inline-flex items-center text-secondary font-black hover:text-white transition-colors tracking-tight"
               >
                 자세히 보기 <ExternalLink size={16} className="ml-2" />
               </a>
            </div>
          </div>
          <div className="flex bg-[#1a1a1a] text-white text-sm">
            <button 
              onClick={() => hideToday(popup.id)}
              className="flex-1 py-5 hover:bg-white/10 transition-colors font-bold border-r border-white/10"
            >
              다시 보지 않기
            </button>
            <button onClick={() => closePopup(popup.id)} className="px-10 py-5 bg-primary text-white font-black hover:bg-primary/90 transition-colors">닫기</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Popup
