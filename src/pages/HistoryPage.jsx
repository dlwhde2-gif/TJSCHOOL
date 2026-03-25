'use client';
import React, { useState, useEffect } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { getSupabase } from '@/lib/supabase'

const HistoryPage = ({ mainCategory = '학교소개', subCategory = '학교연혁', navItems = [
  { name: '인사말', path: '/about/greetings' },
  { name: '교육목표', path: '/about/goals' },
  { name: '학교연혁', path: '/about/history' },
  { name: '오시는길', path: '/about/map' },
] }) => {
  const [histories, setHistories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const supabase = getSupabase()
        const { data, error } = await supabase.from('histories').select('*')
        if (error) throw error

        if (data && data.length > 0) {
          const grouped = data.reduce((acc, curr) => {
            const year = curr.year
            if (!acc[year]) acc[year] = []
            acc[year].push({ month: curr.month, content: curr.content })
            return acc
          }, {})

          const formatted = Object.keys(grouped)
            .sort((a, b) => b - a)
            .map(year => ({      
              year,
              events: grouped[year]
                .sort((a, b) => b.month - a.month)
                .map(e => `${e.month}월 ${e.content}`)
            }))

          setHistories(formatted)
        }
      } catch (e) {
        console.error(e)       
      } finally {
        setIsLoading(false)
      }
    }
    fetchHistory()
  }, [])

  return (
    <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-800 mb-12 translate-x-4">연혁</h2>
        
        {isLoading ? (
          <div className="py-20 text-center text-gray-400">데이터를 불러오는 중입니다...</div>
        ) : histories.length === 0 ? (
          <div className="py-20 text-center text-gray-400">등록된 연혁이 없습니다.</div>
        ) : (
          <div className="relative border-l-4 border-gray-100 ml-4 md:ml-12 space-y-16 pb-12">
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
        )}
      </div>
    </SubPageLayout>
  )
}

export default HistoryPage