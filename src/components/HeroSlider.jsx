'use client';
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const slides = [
  {
    image: '/hero1.png',
    title: '세상을 변화시키는\n글로벌 리더 TJSCHOOL',
    subtitle: '배움이 즐겁고 성장이 기쁜 기독교 사학의 중심'
  },
  {
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80',
    title: '미래를 디자인하는\n창의적 인재 양성',
    subtitle: '개개인의 잠재력을 발견하고 키워나가는 맞춤형 교육'
  },
  {
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&w=1920&q=80',
    title: '하나님의 사랑으로\n꿈꾸는 비전 공동체',
    subtitle: '따뜻한 인성과 실력을 겸비한 미래의 지도자'
  }
]

const HeroSlider = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen bg-gray-900 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img src={slides[current].image} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col justify-center container mx-auto px-4">
        <motion.div
          key={`text-${current}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-white text-6xl md:text-8xl font-black leading-tight mb-8 whitespace-pre-wrap tracking-tighter">
            {slides[current].title}
          </h1>
          <p className="text-white/80 text-xl md:text-2xl font-medium mb-12 max-w-2xl leading-relaxed">
            {slides[current].subtitle}
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
              입학 안내 보기
            </button>
            <button className="bg-white/10 text-white backdrop-blur-md px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-primary transition-all">
              자세히 보기
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 z-20 flex items-center space-x-4">
        <div className="flex space-x-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${current === i ? 'w-12 bg-secondary' : 'w-2 bg-white/30'}`} />
          ))}
        </div>
        <div className="flex space-x-2 ml-8">
           <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all"><ChevronLeft /></button>
           <button onClick={() => setCurrent((current + 1) % slides.length)} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all"><ChevronRight /></button>
        </div>
      </div>
    </section>
  )
}

export default HeroSlider
