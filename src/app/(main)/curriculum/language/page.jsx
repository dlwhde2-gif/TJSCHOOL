'use client';
import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Languages, Users, Palette, Music, Cpu, Trophy, BookMarked, ArrowRight } from 'lucide-react'

export default function LanguagePage() {
  const navItems = [
    { name: '초등과정', path: '/curriculum/elementary' },
    { name: '중등과정', path: '/curriculum/middle' },
    { name: '언어/방과후', path: '/curriculum/language' },
    { name: '학사일정', path: '/curriculum/calendar' },
  ]

  const programCategories = [
    {
      title: 'Global Language',
      icon: <Languages size={32} />,
      color: 'bg-blue-50 text-blue-600',
      programs: ['입문 중국어', '실용 스페인어', '영어 토론 클럽', '다문화 이해 교실']
    },
    {
      title: 'Arts & Culture',
      icon: <Music size={32} />,
      color: 'bg-purple-50 text-purple-600',
      programs: ['오케스트라', '창의 현대 미술', 'K-Pop 댄스', '도예 교실']
    },
    {
      title: 'Active Sports',
      icon: <Trophy size={32} />,
      color: 'bg-orange-50 text-orange-600',
      programs: ['유소년 축구', '방과후 테니스', '태권도 품새', '뉴스포츠']
    },
    {
      title: 'Future Tech',
      icon: <Cpu size={32} />,
      color: 'bg-emerald-50 text-emerald-600',
      programs: ['엔트리 코딩', '로봇 공학', 'AI 데이터 활용', '3D 프린팅']
    }
  ]

  return (
    <SubPageLayout mainCategory="교육과정" subCategory="언어/방과후" navItems={navItems}>
      <div className="max-w-6xl mx-auto py-12">
        {/* Intro */}
        <div className="text-center mb-24">
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
            방과후 학교<br />
            <span className="text-secondary">재능 발견의 즐거움</span>
          </h3>
          <p className="max-w-3xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
            학생들의 숨겨진 잠재력을 깨우고 다채로운 경험을 선사하는<br />
            TJSCHOOL만의 수준별 방과후 프로그램을 소개합니다.
          </p>
        </div>

        {/* Program Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-28">
          {programCategories.map((cat, i) => (
            <div key={i} className="bg-white rounded-[48px] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-6 mb-10">
                <div className={`w-20 h-20 ${cat.color} rounded-3xl flex items-center justify-center shrink-0`}>
                  {cat.icon}
                </div>
                <h4 className="text-2xl font-bold text-gray-800">{cat.title}</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {cat.programs.map((p, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-2xl text-gray-600 font-bold text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" /> {p}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline/Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-28">
          <div className="lg:col-span-2 bg-gray-50 rounded-[48px] p-12">
            <h4 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <BookMarked className="text-primary" /> 운영 안내 및 일정
            </h4>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="text-primary font-black text-xl">01</div>
                <div>
                  <h5 className="font-bold text-gray-800 mb-2">운영 기간</h5>
                  <p className="text-gray-500 text-sm">각 학기별 12주 과정으로 운영 (여름/겨울방학 특강 별도)</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-primary font-black text-xl">02</div>
                <div>
                  <h5 className="font-bold text-gray-800 mb-2">수업 시간</h5>
                  <p className="text-gray-500 text-sm">평일 오후 15:30 ~ 17:00 (프로그램별 상이)</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-primary font-black text-xl">03</div>
                <div>
                  <h5 className="font-bold text-gray-800 mb-2">상담 및 문의</h5>
                  <p className="text-gray-500 text-sm">방과후 학교 지원센터 (02-123-4568)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary rounded-[48px] p-12 text-white flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold mb-4">수강 신청</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                신나는 방과후 활동,<br />
                지금 바로 신청하세요!
              </p>
            </div>
            <a href="#" className="flex items-center justify-between bg-white text-primary p-6 rounded-3xl font-black group hover:bg-secondary transition-colors">
              신청 페이지 이동 <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

