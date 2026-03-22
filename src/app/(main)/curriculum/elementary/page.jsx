import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { BookOpen, Star, Sun, Heart } from 'lucide-react'

export default function ElementaryPage() {
  const navItems = [
    { name: '초등과정', path: '/curriculum/elementary' },
    { name: '중등과정', path: '/curriculum/middle' },
    { name: '언어/방과후', path: '/curriculum/language' },
  ]

  const features = [
    { icon: <BookOpen className="text-primary" />, title: '기초 학력 중심', desc: '국어, 수학 등 기초 교과의 탄탄한 내실화' },
    { icon: <Star className="text-secondary" />, title: '글로벌 인재 양성', desc: '원어민 교사와 함께하는 몰입형 영어 교육' },
    { icon: <Sun className="text-yellow-500" />, title: '창의 영성 교육', desc: '기독교 가치관을 바탕으로 한 인성 교육' },
    { icon: <Heart className="text-red-500" />, title: '1인 1악기', desc: '감성을 풍부하게 하는 예술 교육 프로그램' },
  ]

  return (
    <SubPageLayout mainCategory="교육과정" subCategory="초등과정" navItems={navItems}>
      <div className="max-w-5xl mx-auto py-12">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-black text-gray-800 mb-6 underline decoration-secondary decoration-8 underline-offset-8">초등 교육 목표</h3>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            사랑으로 가르치고 실력으로 증명하는 TJSCHOOL 초등 교육입니다.<br />
            학생들의 무한한 잠재력을 발견하고 꿈을 향한 첫 걸음을 함께합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 flex items-start space-x-6">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-800 mb-3">{f.title}</h4>
                <p className="text-gray-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-[50px] p-12 md:p-16 border border-primary/10">
           <h4 className="text-2xl font-black text-primary mb-8">주요 교육 활동</h4>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                 <h5 className="font-bold text-lg mb-4 text-gray-800">영어 몰입 교육</h5>
                 <p className="text-gray-500 text-sm leading-relaxed">매일 원어민 교사와 함께하는 테마별 프로젝트 수업</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                 <h5 className="font-bold text-lg mb-4 text-gray-800">독서 토론 활동</h5>
                 <p className="text-gray-500 text-sm leading-relaxed">비판적 사고와 공감 능력을 키우는 독서 나눔 시간</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                 <h5 className="font-bold text-lg mb-4 text-gray-800">체험형 과학 캠프</h5>
                 <p className="text-gray-500 text-sm leading-relaxed">실험과 탐구를 통해 일상 속 과학을 배우는 캠프</p>
              </div>
           </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
