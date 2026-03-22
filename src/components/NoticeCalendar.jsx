'use client';
import React from 'react'
import { Calendar as CalendarIcon, Bell, Plus } from 'lucide-react'
import Link from 'next/link'

const notices = [
  { title: '2026학년도 신입생 입학 설명회 안내', date: '2026.03.22' },
  { title: '여름 방학 방과후 활동 수강 신청 안내', date: '2026.03.15' },
  { title: 'TJSCHOOL 글로벌 캠프 참가자 모집', date: '2026.03.10' }
]

const NoticeCalendar = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="flex justify-between items-center border-b border-gray-200 pb-6">
              <h3 className="text-3xl font-black text-gray-800 flex items-center">
                <Bell className="mr-3 text-primary" /> 공지사항
              </h3>
              <Link href="/community/notice" className="text-gray-400 hover:text-primary transition-colors">
                <Plus size={24} />
              </Link>
            </div>
            <div className="space-y-4">
              {notices.map((notice, i) => (
                <Link key={i} href="/community/notice" className="flex items-center justify-between p-6 bg-white rounded-3xl group hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                  <span className="font-bold text-gray-700 group-hover:text-primary transition-colors line-clamp-1">{notice.title}</span>
                  <span className="text-sm text-gray-400 font-medium shrink-0 ml-4">{notice.date}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex justify-between items-center border-b border-gray-200 pb-6">
              <h3 className="text-3xl font-black text-gray-800 flex items-center">
                <CalendarIcon className="mr-3 text-secondary" /> 학사일정
              </h3>
              <Link href="/curriculum/calendar" className="text-gray-400 hover:text-primary transition-colors">
                <Plus size={24} />
              </Link>
            </div>
            <div className="bg-white rounded-[40px] shadow-sm p-10 border border-gray-100">
               <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="text-6xl font-black text-primary mb-2">22</div>
                  <div className="text-xl font-bold text-gray-400 uppercase tracking-[0.3em]">March 2026</div>
                  <div className="w-10 h-1 bg-secondary mt-6 rounded-full" />
                  <p className="mt-8 font-bold text-gray-800">오늘은 신입생 정기 면접일입니다.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NoticeCalendar
