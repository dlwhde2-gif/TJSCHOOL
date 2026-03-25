'use client';
import React, { useState, useEffect, useCallback } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { ChevronLeft, ChevronRight, Plus, X, Trash2, Loader2 } from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

const navItems = [
  { name: '초등과정', path: '/curriculum/elementary' },
  { name: '중등과정', path: '/curriculum/middle' },
  { name: '언어/방과후', path: '/curriculum/language' },
  { name: '학사일정', path: '/curriculum/calendar' },
]

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const COLORS = [
  { bg: 'bg-primary/10', text: 'text-primary', dot: 'bg-primary' },
  { bg: 'bg-secondary/10', text: 'text-secondary', dot: 'bg-secondary' },
  { bg: 'bg-blue-100', text: 'text-blue-600', dot: 'bg-blue-500' },
  { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  { bg: 'bg-rose-100', text: 'text-rose-600', dot: 'bg-rose-500' },
]

export default function SchoolCalendar() {
  const today = new Date()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ title: '', color: 0 })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const fetchEvents = useCallback(async () => {
    setIsLoading(true)
    try {
      const supabase = getSupabase()
      const startDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`
      const endDate = new Date(currentYear, currentMonth + 1, 0)
      const endDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`
      const { data } = await supabase
        .from('calendar_events')
        .select('*')
        .gte('event_date', startDate)
        .lte('event_date', endDateStr)
        .order('event_date', { ascending: true })
      setEvents(data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [currentYear, currentMonth])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentYear(y => y - 1); setCurrentMonth(11) }
    else setCurrentMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentYear(y => y + 1); setCurrentMonth(0) }
    else setCurrentMonth(m => m + 1)
  }

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const handleDayClick = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    setSelectedDate(dateStr)
    if (user?.role === 'admin') {
      setForm({ title: '', color: 0 })
      setIsModalOpen(true)
    }
  }

  const handleSaveEvent = async () => {
    if (!form.title.trim()) return
    setIsSaving(true)
    try {
      const supabase = getSupabase()
      const { error } = await supabase.from('calendar_events').insert({
        title: form.title,
        event_date: selectedDate,
        color: form.color,
      })
      if (error) { window.alert('저장 실패: ' + error.message); return }
      setIsModalOpen(false)
      fetchEvents()
    } catch (e) {
      window.alert('오류: ' + e.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteEvent = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm('이 일정을 삭제할까요?')) return
    const supabase = getSupabase()
    const { error } = await supabase.from('calendar_events').delete().eq('id', id)
    if (error) { window.alert('삭제 실패: ' + error.message); return }
    fetchEvents()
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7

  const getEventsForDay = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(ev => ev.event_date === dateStr)
  }

  const isToday = (day) =>
    today.getFullYear() === currentYear &&
    today.getMonth() === currentMonth &&
    today.getDate() === day

  // Upcoming events list (this month)
  const upcomingEvents = events.filter(ev => {
    const d = new Date(ev.event_date)
    return d >= today || d.toDateString() === today.toDateString()
  }).slice(0, 8)

  return (
    <SubPageLayout mainCategory="교육과정" subCategory="학사일정" navItems={navItems}>
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar */}
          <div className="flex-1">
            <div className="bg-white rounded-[40px] shadow-2xl p-6 md:p-10 border border-gray-100">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <button onClick={prevMonth} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
                  <ChevronLeft size={22} className="text-gray-600" />
                </button>
                <div className="text-center">
                  <p className="text-sm font-bold text-secondary/70 tracking-widest uppercase mb-1">School Calendar</p>
                  <h2 className="text-3xl font-black text-gray-800">
                    {currentYear}년 {currentMonth + 1}월
                  </h2>
                </div>
                <button onClick={nextMonth} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
                  <ChevronRight size={22} className="text-gray-600" />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 mb-2">
                {WEEKDAYS.map((day, i) => (
                  <div key={day} className={`text-center text-xs font-black py-2 ${i === 0 ? 'text-rose-500' : i === 6 ? 'text-blue-500' : 'text-gray-400'}`}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>
              ) : (
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: totalCells }, (_, i) => {
                    const day = i - firstDay + 1
                    const isValid = day >= 1 && day <= daysInMonth
                    const dayEvents = isValid ? getEventsForDay(day) : []
                    const isAdminClickable = user?.role === 'admin' && isValid
                    const weekday = i % 7
                    return (
                      <div
                        key={i}
                        onClick={() => isValid && handleDayClick(day)}
                        className={`min-h-[72px] md:min-h-[88px] p-2 rounded-2xl transition-all relative
                          ${isValid ? 'cursor-pointer hover:bg-gray-50' : 'opacity-0 pointer-events-none'}
                          ${isToday(day) ? 'bg-primary/5 ring-2 ring-primary/30' : ''}
                          ${isAdminClickable ? 'hover:ring-2 hover:ring-primary/20' : ''}
                        `}
                      >
                        {isValid && (
                          <>
                            <span className={`text-sm font-bold inline-flex items-center justify-center w-7 h-7 rounded-full mb-1
                              ${isToday(day) ? 'bg-primary text-white' : weekday === 0 ? 'text-rose-500' : weekday === 6 ? 'text-blue-500' : 'text-gray-700'}
                            `}>
                              {day}
                            </span>
                            <div className="space-y-0.5">
                              {dayEvents.slice(0, 2).map(ev => (
                                <div key={ev.id} className="group relative flex items-center gap-1">
                                  <span className={`flex-1 truncate text-[10px] font-bold px-1.5 py-0.5 rounded-full ${COLORS[ev.color ?? 0].bg} ${COLORS[ev.color ?? 0].text}`}>
                                    {ev.title}
                                  </span>
                                  {user?.role === 'admin' && (
                                    <button
                                      onClick={(e) => handleDeleteEvent(ev.id, e)}
                                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded-full bg-red-100 text-red-500 transition-opacity absolute right-0 top-0 z-10"
                                    >
                                      <X size={9} />
                                    </button>
                                  )}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <span className="text-[10px] text-gray-400 font-bold ml-1">+{dayEvents.length - 2}개</span>
                              )}
                            </div>
                            {user?.role === 'admin' && isValid && dayEvents.length === 0 && (
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-2xl">
                                <Plus size={18} className="text-gray-300" />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {user?.role === 'admin' && (
                <p className="mt-6 text-center text-xs text-gray-400 font-medium">
                  ✏️ 날짜를 클릭하여 학사일정을 추가하세요
                </p>
              )}
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="lg:w-72">
            <div className="bg-white rounded-[40px] shadow-2xl p-6 md:p-8 border border-gray-100 sticky top-28">
              <h3 className="text-lg font-black text-gray-800 mb-6">
                다가오는 일정
                <span className="ml-2 text-xs font-bold text-gray-400">{currentMonth + 1}월</span>
              </h3>
              {isLoading ? (
                <div className="flex items-center justify-center py-8"><Loader2 className="animate-spin text-gray-300" size={24} /></div>
              ) : upcomingEvents.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-8 font-medium">등록된 일정이 없습니다.</p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map(ev => {
                    const d = new Date(ev.event_date)
                    const c = COLORS[ev.color ?? 0]
                    return (
                      <div key={ev.id} className={`flex items-start gap-3 p-4 rounded-2xl ${c.bg}`}>
                        <div className="flex-shrink-0 text-center mt-0.5">
                          <p className="text-xs font-bold text-gray-500">{d.getMonth() + 1}월</p>
                          <p className={`text-xl font-black ${c.text}`}>{d.getDate()}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm ${c.text} truncate`}>{ev.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5 font-medium">{WEEKDAYS[d.getDay()]}요일</p>
                        </div>
                        {user?.role === 'admin' && (
                          <button onClick={(e) => handleDeleteEvent(ev.id, e)} className="p-1 text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-gray-800">학사일정 추가</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={18} />
              </button>
            </div>
            <p className="text-xs font-bold text-gray-400 mb-4 tracking-widest">{selectedDate}</p>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleSaveEvent()}
              placeholder="일정 제목을 입력하세요"
              className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-medium outline-none border-2 border-transparent focus:border-primary focus:bg-white transition-all mb-5"
              autoFocus
            />
            <div className="flex gap-2 mb-6">
              {COLORS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setForm({ ...form, color: i })}
                  className={`w-8 h-8 rounded-full ${c.dot} transition-transform ${form.color === i ? 'scale-125 ring-2 ring-offset-2 ring-gray-300' : 'scale-100'}`}
                />
              ))}
            </div>
            <button
              onClick={handleSaveEvent}
              disabled={isSaving || !form.title.trim()}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isSaving ? <Loader2 className="animate-spin mx-auto" size={20} /> : '일정 추가하기'}
            </button>
          </div>
        </div>
      )}
    </SubPageLayout>
  )
}
