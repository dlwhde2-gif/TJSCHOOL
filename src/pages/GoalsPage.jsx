import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Target, Heart, Globe, Lightbulb } from 'lucide-react'

const GoalsPage = () => {
  const navItems = [
    { name: '인사말', path: '/about/greetings' },
    { name: '교육목표', path: '/about/goals' },
    { name: '학교연혁', path: '/about/history' },
    { name: '오시는 길', path: '/about/map' },
  ]

  const goals = [
    { icon: <Heart size={40} />, title: '신앙인', desc: '하나님을 사랑하고 이웃을 섬기는 기독교적 가치관 확립' },
    { icon: <Target size={40} />, title: '지성인', desc: '창의적 사고와 자기주도적 학습 능력을 겸비한 글로벌 인재' },
    { icon: <Globe size={40} />, title: '세계인', desc: '다양한 문화를 이해하고 소통하는 열린 마음의 세계 시민' },
    { icon: <Lightbulb size={40} />, title: '창조인', desc: '미래 사회를 주도하는 혁신적인 사고와 실천하는 지성' },
  ]

  return (
    <SubPageLayout 
      mainCategory="학교소개" 
      subCategory="교육목표" 
      navItems={navItems}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-primary font-bold text-lg mb-4 tracking-widest uppercase">Educational Goals</h2>
          <h3 className="text-4xl font-bold text-gray-800">TJSCHOOL이 지향하는 가치</h3>
          <div className="w-16 h-1 bg-secondary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {goals.map((goal, i) => (
            <div key={i} className="flex gap-8 p-10 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all group border border-transparent hover:border-gray-100">
              <div className="shrink-0 w-20 h-20 bg-white shadow-md rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {goal.icon}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-800 mb-3">{goal.title}</h4>
                <p className="text-gray-500 leading-relaxed">{goal.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-primary rounded-[40px] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <h4 className="text-secondary font-bold text-xl mb-4 italic">Vision 2026</h4>
            <p className="text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
              "세계와 소통하며 꿈을 디자인하는 글로벌 인재 양성 요람"
            </p>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default GoalsPage
