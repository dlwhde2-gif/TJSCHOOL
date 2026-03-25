'use client';
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'

const ActivityGallery = () => {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      const supabase = getSupabase()
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, image, createdAt')
          .eq('boardType', '사진갤러리')
          .order('createdAt', { ascending: false })
          .limit(4)
        
        if (error) throw error
        setActivities(data || [])
      } catch (err) {
        console.error('활동 갤러리 불러오기 오류:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchActivities()
  }, [])

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
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-gray-400 italic">사진을 불러오는 중입니다...</div>
          ) : activities.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-400 italic">등록된 사진이 없습니다.</div>
          ) : (
            activities.map((activity) => (
              <Link href={`/life/gallery/${activity.id}`} key={activity.id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden mb-6 shadow-xl bg-gray-50 flex items-center justify-center">
                    {activity.image ? (
                      <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <ImageIcon size={48} className="text-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-secondary font-bold text-xs tracking-widest mb-2 uppercase">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-1">{activity.title}</h4>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default ActivityGallery
