'use client';
import React, { useState, useEffect } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { getSupabase } from '@/lib/supabase';

const HistoryPage = () => {
  const [histories, setHistories] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      const supabase = getSupabase()
      try {
        const { data, error } = await supabase.from('histories').select('*')
        if (error) throw error
        
        // ?°ë„ë³„ë¡œ ê·¸ë£¹??        const grouped = data.reduce((acc, curr) => {
          const year = curr.year
          if (!acc[year]) acc[year] = []
          acc[year].push({ month: curr.month, content: curr.content })
          return acc
        }, {})

        // ?´ë¦¼ì°¨ìˆœ ?•ë ¬ ë°?êµ¬ì¡° ë³€??        const formatted = Object.keys(grouped)
          .sort((a, b) => b - a)
          .map(year => ({
            year,
            events: grouped[year]
              .sort((a, b) => b.month - a.month)
              .map(e => `${e.month}?? ${e.content}`)
          }))
          
        setHistories(formatted)
      } catch (e) {
        console.error(e)
      }
    }
    fetchHistory()
  }, [])

  const navItems = [
    { name: '?¸ì‚¬ë§?, path: '/about/greetings' },
    { name: 'êµìœ¡ëª©í‘œ', path: '/about/goals' },
    { name: '?™êµ?°í˜', path: '/about/history' },
    { name: '?¤ì‹œ??ê¸?, path: '/about/map' },
  ]

  return (
    <SubPageLayout mainCategory="?™êµ?Œê°œ" subCategory="?™êµ?°í˜" navItems={navItems}>
      <div className="max-w-4xl mx-auto py-10">
        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-20 space-y-16">
          {histories.map((item, i) => (
            <div key={i} className="relative pl-10 md:pl-20">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
              <div className="md:absolute md:-left-32 md:top-0">
                <span className="text-3xl font-black text-primary/30">{item.year}</span>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <ul className="space-y-4">
                  {item.events.map((event, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-700 text-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-3 shrink-0" />
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  )
}

export default HistoryPage
