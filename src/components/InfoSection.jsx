import React from 'react'
import { BookOpen, Users, Globe, Award } from 'lucide-react'

const infoItems = [
  { icon: <BookOpen size={40} />, title: '맞춤형 교육', desc: '학생 개개인의 잠재력을 발견하는 커리큘럼' },
  { icon: <Globe size={40} />, title: '글로벌 역량', desc: '세계와 소통하는 언어와 문화를 배웁니다' },
  { icon: <Users size={40} />, title: '인성 교육', desc: '하나님의 사랑을 실천하는 따뜻한 리더' },
  { icon: <Award size={40} />, title: '창의 영재', desc: '미래 사회를 주도하는 혁신적인 인재 양성' }
]

const InfoSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {infoItems.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 shadow-sm">
                {item.icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h4>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InfoSection
