'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AdmissionSection = () => {
  const router = useRouter()
  
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative rounded-[60px] overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-all duration-700">
              <img 
                src="/admission_students.png" 
                alt="Students" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-primary font-bold text-lg tracking-widest uppercase">Admission</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight">
              TJSCHOOL의 새로운<br />가족을 기다립니다
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed">
              TJSCHOOL은 단순한 학교를 넘어, 꿈을 현실로 만드는 도전의 장입니다. 
              최고의 환경에서 글로벌 리더로 성장할 준비가 된 여러분을 초대합니다.
            </p>
            
            <ul className="space-y-4">
              {['2026학년도 신입생 및 편입생 모집', '글로벌 역량 강화를 위한 전문 커리큘럼', '맞춤형 개별 진학 지도 시스템'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-gray-700 font-bold">
                  <CheckCircle2 className="text-secondary" size={24} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => router.push('/about/admission')}
              className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all flex items-center group"
            >
              입학 안내 바로가기 <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdmissionSection
