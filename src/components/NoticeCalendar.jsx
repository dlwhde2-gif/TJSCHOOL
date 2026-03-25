'use client';
import React, { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Bell, Plus, Loader2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'

const MONTH_KR = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
const WEEKDAYS = ['일','월','화','수','목','금','토']

const NoticeCalendar = () => {
  const [notices, setNotices] = useState([])
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const today = new Date()

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true)
      try {
        const supabase = getSupabase()

        // Fetch latest 3 notices
        const { data: noticeData } = await supabase
          .from('posts')
          .select('id, title, date')
          .eq('boardType', '공지사항')
          .order('createdAt', { ascending: false })
          .limit(3)
        setNotices(noticeData || [])

        // Fetch upcoming 3 calendar events from today
        const todayStr = today.toISOString().split('T')[0]
        const { data: eventData } = await supabase
          .from('calendar_events')
          .select('*')
          .gte('event_date', todayStr)
          .order('event_date', { ascending: true })
          .limit(3)
        setEvents(eventData || [])
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAll()
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return dateStr.replace(/-/g, '.')
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Notices */}
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
              {isLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" size={28} /></div>
              ) : notices.length === 0 ? (
                <p className="text-center text-gray-400 py-8 font-medium">등록된 공지사항이 없습니다.</p>
              ) : (
                notices.map((notice) => (
                  <Link key={notice.id} href={`/community/notice/${notice.id}`} className="flex items-center justify-between p-6 bg-white rounded-3xl group hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                    <span className="font-bold text-gray-700 group-hover:text-primary transition-colors line-clamp-1">{notice.title}</span>
                    <span className="text-sm text-gray-400 font-medium shrink-0 ml-4">{formatDate(notice.date)}</span>
                  </Link>
                ))
              )}
            </div>
            <Link href="/community/notice" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors pt-2">
              전체보기 <ChevronRight size={16} />
            </Link>
          </div>

          {/* Calendar Events */}
          <div className="space-y-10">
            <div className="flex justify-between items-center border-b border-gray-200 pb-6">
              <h3 className="text-3xl font-black text-gray-800 flex items-center">
                <CalendarIcon className="mr-3 text-secondary" /> 학사일정
              </h3>
              <Link href="/curriculum/calendar" className="text-gray-400 hover:text-primary transition-colors">
                <Plus size={24} />
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="animate-spin text-secondary" size={28} /></div>
            ) : events.length === 0 ? (
              <div className="bg-white rounded-[40px] shadow-sm p-10 border border-gray-100 flex flex-col items-center justify-center py-10 text-center">
                <CalendarIcon size={40} className="text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold">예정된 학사일정이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((ev) => {
                  const d = new Date(ev.event_date)
                  return (
                    <Link key={ev.id} href="/curriculum/calendar" className="flex items-center gap-6 p-6 bg-white rounded-3xl group hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                      <div className="flex-shrink-0 w-16 text-center">
                        <p className="text-xs font-bold text-gray-400">{MONTH_KR[d.getMonth()]}</p>
                        <p className="text-3xl font-black text-secondary">{d.getDate()}</p>
                        <p className="text-xs font-bold text-gray-300">{WEEKDAYS[d.getDay()]}요일</p>
                      </div>
                      <div className="w-px h-12 bg-gray-100 flex-shrink-0" />
                      <p className="font-bold text-gray-700 group-hover:text-primary transition-colors line-clamp-1">{ev.title}</p>
                    </Link>
                  )
                })}
              </div>
            )}
            <Link href="/curriculum/calendar" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors pt-2">
              학사일정 전체보기 <ChevronRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default NoticeCalendar

