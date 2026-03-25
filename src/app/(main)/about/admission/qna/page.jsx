'use client';
import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Phone, MessageSquare, ArrowRight, Clock, MapPin } from 'lucide-react'

export default function AdmissionQna() {
  const navItems = [
    { name: '초등입학안내', path: '/about/admission' },
    { name: '중등입학안내', path: '/about/admission/middle' },
    { name: '입학상담', path: '/about/admission/qna' },
  ]

  return (
    <SubPageLayout 
      mainCategory="입학안내" 
      subCategory="입학상담" 
      navItems={navItems} 
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-lg mb-4 tracking-widest uppercase">Admission Counseling</h2>
          <h3 className="text-4xl font-bold text-gray-800">TJSCHOOL 입학 상담 안내</h3>
          <p className="mt-4 text-gray-500">궁금하신 사항은 언제든 문의해 주시기 바랍니다. 친절히 안내해 드리겠습니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Counseling Form Button Card */}
          <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-300">
            <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
              <MessageSquare size={36} />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">입학 상담 신청</h4>
            <p className="text-gray-500 mb-8 leading-relaxed">
              온라인으로 상담을 신청하시면<br />
              담당 선생님께서 직접 연락 드립니다.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              상담 신청 바로가기 <ArrowRight size={18} />
            </a>
          </div>

          {/* Contact Info Card */}
          <div className="bg-primary rounded-[32px] p-10 text-white flex flex-col items-center text-center shadow-xl shadow-primary/20">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-white mb-8">
              <Phone size={36} />
            </div>
            <h4 className="text-2xl font-bold mb-4">행정실 전화 상담</h4>
            <p className="text-white/70 mb-8 leading-relaxed">
              업무 시간 내 전화 주시면<br />
              빠른 안내가 가능합니다.
            </p>
            <div className="text-3xl font-black mb-8 tracking-tighter">
              02-123-4567
            </div>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Clock size={14} /> <span>평일 09:00 - 17:00 (주말/공휴일 제외)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Box */}
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-primary" /> 방문 상담 안내
              </h5>
              <p className="text-sm text-gray-500 leading-relaxed">
                방문 상담은 사전 예약제로 운영됩니다. 위의 상담 신청 또는 전화로 미리 일정을 잡아주시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

