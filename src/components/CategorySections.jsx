'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, UserCheck, Star } from 'lucide-react'

const sections = [
  {
    title: '교육과정',
    desc: 'TJSCHOOL만의 특별한 글로벌 커리큘럼을 소개합니다.',
    icon: <BookOpen className="text-primary" />,
    link: '/curriculum/primary'
  },
  {
    title: '입학안내',
    desc: '미래를 향한 첫 걸음, 입학 절차와 모집 요강을 확인하세요.',
    icon: <UserCheck className="text-secondary" />,
    link: '/about/admission'
  },
  {
    title: '학교소개',
    desc: '세상을 변화시키는 인재들의 요람, TJSCHOOL의 비전을 공유합니다.',
    icon: <Star className="text-yellow-500" />,
    link: '/about/greetings'
  }
]

const CategorySections = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {section.icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h4>
              <p className="text-gray-500 leading-relaxed mb-8">{section.desc}</p>
              <a href={section.link} className="inline-flex items-center font-bold text-primary group-hover:translate-x-2 transition-transform">
                자세히 보기 <ArrowRight size={18} className="ml-2" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySections
