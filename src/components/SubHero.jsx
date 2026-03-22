'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { getSupabase } from '@/lib/supabase'

const SubHero = ({ mainCategory, subCategory }) => {
  const [bgImage, setBgImage] = React.useState('')
  const supabase = getSupabase()

  React.useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await supabase.from('settings').select('value').eq('key', `hero_${mainCategory}`).maybeSingle()
        if (data && data.value) setBgImage(data.value)
      } catch (err) { console.error(err) }
    }
    fetchHero()
  }, [mainCategory])

  const bgImages = {
    '학교소개': 'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&w=1920&q=80',
    '입학안내': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
    '교육과정': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1920&q=80',
    '학교생활': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80',
    '커뮤니티': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80',
  }

  const currentBg = bgImage || bgImages[mainCategory] || bgImages['학교소개']

  return (
    <section className="relative h-[350px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={currentBg} 
          alt="Hero background" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = bgImages[mainCategory] || bgImages['학교소개']
          }}
        />
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-secondary font-bold tracking-[0.3em] uppercase">{mainCategory}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">{subCategory}</h1>
          <div className="w-12 h-1.5 bg-secondary mx-auto rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}

export default SubHero
