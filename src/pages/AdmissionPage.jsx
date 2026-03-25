'use client';
import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { FileText, Calendar, CheckCircle, Info } from 'lucide-react'

const AdmissionPage = ({ subCategory = "초등입학안내", navItems: propNavItems }) => {
  const defaultNavItems = [
    { name: '초등입학안내', path: '/about/admission' },
    { name: '중등입학안내', path: '/about/admission/middle' },
    { name: '입학상담', path: '/about/admission/qna' },
  ]
  const navItems = propNavItems || defaultNavItems;

  const steps = [
    { icon: <FileText />, title: '원서 접수', desc: '홈페이지 또는 방문 접수' },
    { icon: <Calendar />, title: '입학 전형', desc: '서류 심사 및 면접 전형' },
    { icon: <CheckCircle />, title: '합격 발표', desc: '개별 통보 및 홈페이지 공지' },
    { icon: <Info />, title: '등록 안내', desc: '입학 등록 및 오리엔테이션' },
  ]

  const isMiddle = subCategory.includes('중등');

  return (
    <SubPageLayout 
      mainCategory="입학안내" 
      subCategory={subCategory} 
      navItems={navItems}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-lg mb-4 tracking-widest uppercase">Admission Guide</h2>
          <h3 className="text-4xl font-bold text-gray-800">TJSCHOOL {subCategory} 절차 안내</h3>
          <p className="mt-4 text-gray-500">글로벌 인재를 향한 첫 걸음, TJSCHOOL과 함께하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-gray-500 text-sm">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gray-100" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-[40px] p-12 border border-gray-100">
          <h4 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-secondary pl-6">모집 요강</h4>
          <div className="space-y-6">
            <div className="flex bg-white p-6 rounded-2xl shadow-sm items-center justify-between">
              <span className="font-bold text-gray-700">모집 대상</span>
              <span className="text-gray-600">
                {isMiddle ? '중학교 1학년 ~ 3학년' : '초등학교 1학년 ~ 6학년'}
              </span>
            </div>
            <div className="flex bg-white p-6 rounded-2xl shadow-sm items-center justify-between">
              <span className="font-bold text-gray-700">전형 방법</span>
              <span className="text-gray-600">서류전형 50% + 학생 면접 50%</span>
            </div>
            <div className="flex bg-white p-6 rounded-2xl shadow-sm items-center justify-between">
              <span className="font-bold text-gray-700">제출 서류</span>
              <span className="text-gray-600">입학원서, 주민등록등본, 생활기록부 사본</span>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default AdmissionPage
