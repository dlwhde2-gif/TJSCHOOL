'use client';
import React from 'react'
import { Calendar, CheckCircle, GraduationCap, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

const QuickMenu = () => {
  const router = useRouter()
  
  const items = [
    { icon: <Calendar />, label: '학사일정', path: '/curriculum/calendar' },
    { icon: <CheckCircle />, label: '입학안내', path: '/about/admission' },
    { icon: <GraduationCap />, label: '교육과정', path: '/curriculum/primary' },
    { icon: <Phone />, label: '입학상담', path: '/about/admission/qna' }
  ]

  return (
    <div className="fixed right-8 bottom-8 z-50 flex flex-col space-y-4">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => router.push(item.path)}
          className="w-16 h-16 bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-x-2 group"
          title={item.label}
        >
          {item.icon}
          <span className="text-[10px] font-bold mt-1 group-hover:hidden">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

export default QuickMenu
