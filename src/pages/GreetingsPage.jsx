import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'

const GreetingsPage = () => {
  const navItems = [
    { name: '인사말', path: '/about/greetings' },
    { name: '교육목표', path: '/about/goals' },
    { name: '학교연혁', path: '/about/history' },
    { name: '오시는 길', path: '/about/map' },
  ]

  return (
    <SubPageLayout 
      mainCategory="학교소개" 
      subCategory="인사말" 
      navItems={navItems}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-lg mb-4 tracking-widest uppercase">Greetings</h2>
          <h3 className="text-4xl font-bold text-gray-800">배움이 즐겁고 성장이 기쁜 학교</h3>
          <div className="w-16 h-1 bg-secondary mx-auto mt-6" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50">
              <img 
                src="/principal.png" 
                alt="Principal" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:w-2/3 space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              안녕하십니까? TJSCHOOL 홈페이지를 찾아주신 여러분을 진심으로 환영합니다.
            </p>
            <p>
              우리 학교는 기독교 정신을 바탕으로, 학생들이 하나님을 경외하고 이웃을 사랑하는 글로벌 리더로 성장할 수 있도록 돕는 교육 공동체입니다. 
              오늘날의 급변하는 사회 속에서 우리 아이들에게 가장 필요한 것은 단순한 지식의 습득보다는 스스로 생각하고 문제를 해결해 나가는 '창의적 잠재력'과 타인과 소통하며 협력하는 '따뜻한 인성'입니다.
            </p>
            <p>
              TJSCHOOL의 모든 교직원은 아이들이 자신의 소중한 가치를 깨닫고, 배움의 즐거움 속에서 자신의 꿈을 마음껏 펼칠 수 있는 안전하고 행복한 터전이 되도록 최선을 다하고 있습니다.
            </p>
            <p className="font-bold text-gray-800 pt-10">
              TJSCHOOL 교장 <span className="text-2xl ml-4 font-serif italic text-primary">홍 길 동</span>
            </p>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default GreetingsPage
