'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const activities = [
  {
    title: '창의 과학 캠프',
    image: 'https://images.unsplash.com/photo-1564066341723-63624d3db24d?auto=format&fit=crop&w=800&q=80',
    category: 'STEM'
  },
  {
    title: '글로벌 문화 축제',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
    category: 'CULTURE'
  },
  {
    title: '코딩 경진 대회',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    category: 'TECH'
  },
  {
    title: '오케스트라 정기공연',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    category: 'ARTS'
  }
]

const ActivityGallery = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-primary font-bold text-lg mb-4 tracking-widest uppercase">Gallery</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-800">활동 갤러리</h3>
          </div>
          <Link href="/life/gallery" className="hidden md:flex items-center text-gray-400 hover:text-primary font-bold transition-colors group">
            전체보기 <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-[40px] overflow-hidden mb-6 shadow-xl">
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-secondary font-bold text-xs tracking-widest mb-2 uppercase">{activity.category}</p>
              <h4 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">{activity.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ActivityGallery
