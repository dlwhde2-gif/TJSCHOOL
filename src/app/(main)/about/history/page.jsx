import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'

export default function HistoryPage() {
  const navItems = [
    { name: '인사말', path: '/about/greetings' },
    { name: '교육목표', path: '/about/goals' },
    { name: '학교연혁', path: '/about/history' },
    { name: '오시는 길', path: '/about/map' },
  ]

  const historyData = [
    { year: '2026', events: ['TJSCHOOL 글로벌 캠퍼스 개교', '초등/중등 과정 인가 취득'] },
    { year: '2025', events: ['학교 건물 기공식', '글로벌 교육 파트너십 체결'] },
    { year: '2024', events: ['TJSCHOOL 법인 설립', '교육 비전 및 발전 계획 수립'] },
  ]

  return (
    <SubPageLayout mainCategory="학교소개" subCategory="학교연혁" navItems={navItems}>
      <div className="max-w-4xl mx-auto py-12">
        <div className="relative border-l-2 border-primary/20 ml-4 space-y-16">
          {historyData.map((item, index) => (
            <div key={index} className="relative pl-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
              <div className="inline-block px-6 py-2 bg-primary text-white rounded-2xl font-black text-xl mb-6 shadow-lg shadow-primary/20">
                {item.year}
              </div>
              <div className="space-y-4">
                {item.events.map((event, i) => (
                  <p key={i} className="text-xl font-bold text-gray-700 leading-relaxed">
                    {event}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  )
}
