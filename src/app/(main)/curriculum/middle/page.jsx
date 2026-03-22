import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { GraduationCap, Code, Globe, Zap } from 'lucide-react'

export default function MiddlePage() {
  const navItems = [
    { name: '초등과정', path: '/curriculum/elementary' },
    { name: '중등과정', path: '/curriculum/middle' },
    { name: '언어/방과후', path: '/curriculum/language' },
  ]

  return (
    <SubPageLayout mainCategory="교육과정" subCategory="중등과정" navItems={navItems}>
      <div className="max-w-5xl mx-auto py-12">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-black text-gray-800 mb-6 underline decoration-primary decoration-8 underline-offset-8">중등 교육 비전</h3>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            청소년기의 자아 정체성을 확립하고 미래 사회를 주도할 핵심 역량을 키웁니다.<br />
            TJSCHOOL 중등 과정은 자기 주도적 학습 능력을 극대화하는 맞춤형 커리큘럼을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <h4 className="text-3xl font-bold text-gray-800 border-l-8 border-secondary pl-6">Core Curriculum</h4>
            <div className="space-y-6">
               {[
                 { title: '인문학적 소양', desc: '철학, 고전 읽기를 통한 깊이 있는 사고력 함양' },
                 { title: '수리/과학 탐구', desc: '논리적 추론과 실험 중심의 탐구 역량 강화' },
                 { title: '디지털 리터러시', desc: 'AI, 데이터 사이언스 등 미래 기술 활용 능력 교육' }
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                    <h5 className="font-bold text-gray-800 mb-2">{item.title}</h5>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-3xl font-bold text-gray-800 border-l-8 border-primary pl-6">Global Leader Program</h4>
            <div className="space-y-6">
               {[
                 { title: 'Advanced English', desc: '학문적 글쓰기와 열띤 토론 중심의 심화 과정' },
                 { title: 'Global Exchange', desc: '해외 우수 자매 학교와의 정기적인 교환 프로그램' },
                 { title: 'NGO Research', desc: '국제 사회 문제에 대한 탐구와 실천 방안 제시' }
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                    <h5 className="font-bold text-gray-800 mb-2">{item.title}</h5>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
