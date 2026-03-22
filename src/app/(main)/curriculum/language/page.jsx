import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Languages, Users, Palette, Music } from 'lucide-react'

export default function LanguagePage() {
  const navItems = [
    { name: '초등과정', path: '/curriculum/elementary' },
    { name: '중등과정', path: '/curriculum/middle' },
    { name: '언어/방과후', path: '/curriculum/language' },
  ]

  const programs = [
    { icon: <Languages />, title: '다국어 프로그램', desc: '중국어, 스페인어 등 제2외국어 기초 습득' },
    { icon: <Palette />, title: '창의 예술 클럽', desc: '미술, 디지털 드로잉 등 다양한 예술 활동' },
    { icon: <Music />, title: '필하모닉 오케스트라', desc: '수준별 악기 지도 및 정기 연주회 개최' },
    { icon: <Users />, title: '스포츠 리더십', desc: '축구, 테니스 등을 통한 협동심과 근성 함양' },
  ]

  return (
    <SubPageLayout mainCategory="교육과정" subCategory="언어/방과후" navItems={navItems}>
      <div className="max-w-5xl mx-auto py-12">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-black text-gray-800 mb-6 underline decoration-yellow-400 decoration-8 underline-offset-8">방과후 학교 프로그램</h3>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            정규 교육과정을 넘어 학생 개개인의 재능을 꽃피우는 풍성한 심화 활동입니다.<br />
            TJSCHOOL은 학생들의 다채로운 꿈을 지원하기 위해 매 학기 새로운 프로그램을 개설합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {programs.map((p, i) => (
            <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white mb-6 transition-colors">
                {p.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{p.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-[40px] p-12 overflow-hidden relative">
           <div className="relative z-10">
              <h4 className="text-2xl font-black text-white mb-4">현재 방과후 수강 신청 기간입니다.</h4>
              <p className="text-white/60 mb-10">2026학년도 1학기 방과후 학교 수강 신청이 진행 중입니다. </p>
              <button className="bg-secondary text-primary px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all">
                수강 신청 바로가기
              </button>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        </div>
      </div>
    </SubPageLayout>
  )
}
