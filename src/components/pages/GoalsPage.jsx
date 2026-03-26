import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Target, Heart, Globe, Lightbulb } from 'lucide-react'

const GoalsPage = () => {
  const navItems = [
    { name: '?몄궗留?, path: '/about/greetings' },
    { name: '援먯쑁紐⑺몴', path: '/about/goals' },
    { name: '?숆탳?고쁺', path: '/about/history' },
    { name: '?ㅼ떆??湲?, path: '/about/map' },
  ]

  const goals = [
    { icon: <Heart size={40} />, title: '?좎븰??, desc: '?섎굹?섏쓣 ?щ옉?섍퀬 ?댁썐???ш린??湲곕룆援먯쟻 媛移섍? ?뺣┰' },
    { icon: <Target size={40} />, title: '吏?깆씤', desc: '李쎌쓽???ш퀬? ?먭린二쇰룄???숈뒿 ?λ젰??寃몃퉬??湲濡쒕쾶 ?몄옱' },
    { icon: <Globe size={40} />, title: '?멸퀎??, desc: '?ㅼ뼇??臾명솕瑜??댄빐?섍퀬 ?뚰넻?섎뒗 ?대┛ 留덉쓬???멸퀎 ?쒕?' },
    { icon: <Lightbulb size={40} />, title: '李쎌“??, desc: '誘몃옒 ?ы쉶瑜?二쇰룄?섎뒗 ?곸떊?곸씤 ?ш퀬? ?ㅼ쿇?섎뒗 吏?? },
  ]

  return (
    <SubPageLayout 
      mainCategory="?숆탳?뚭컻" 
      subCategory="援먯쑁紐⑺몴" 
      navItems={navItems}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-primary font-bold text-lg mb-4 tracking-widest uppercase">Educational Goals</h2>
          <h3 className="text-4xl font-bold text-gray-800">TJSCHOOL??吏?ν븯??媛移?/h3>
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
              "?멸퀎? ?뚰넻?섎ŉ 轅덉쓣 ?붿옄?명븯??湲濡쒕쾶 ?몄옱 ?묒꽦 ?붾엺"
            </p>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default GoalsPage

