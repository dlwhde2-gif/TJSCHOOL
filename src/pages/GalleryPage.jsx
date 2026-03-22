'use client';
import React, { useState, useEffect } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Camera, Calendar, Eye, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { getSupabase } from '@/lib/supabase';

const GalleryPage = ({ mainCategory, subCategory, navItems }) => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true)
      const supabase = getSupabase()
      try {
        const { data, error } = await supabase
          .from('galleries')
          .select('*')
          .order('createdAt', { ascending: false })
        
        if (error) throw error
        setItems(data || [])
      } catch (err) {
        console.error('갤러리 불러오기 오류:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGallery()
  }, [subCategory])

  const currentPath = pathname

  return (
    <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <p className="text-gray-500 font-medium">총 <span className="text-primary font-bold">{items.length}</span>장의 사진이 등록되어 있습니다.</p>
          
          {user && (
            <button 
              onClick={() => router.push(`${currentPath}/write`)}
              className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center"
            >
              <Camera size={18} className="mr-2" />
              사진 등록하기
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-gray-400 italic">사진을 불러오는 중입니다...</div>
          ) : items.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-400 italic">등록된 사진이 없습니다.</div>
          ) : (
            items.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-white rounded-[40px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
                onClick={() => router.push(`${currentPath}/${item.id}`)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1544717297-fa154daaf76e'} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <button className="bg-white text-primary w-full py-4 rounded-2xl font-bold shadow-lg">자세히 보기</button>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors line-clamp-1">{item.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center"><Eye size={14} className="mr-1.5" /> {item.views || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-20 flex justify-center items-center gap-2">
          <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 hover:border-primary hover:text-primary transition-all">
            <ChevronLeft size={24} />
          </button>
          {[1, 2, 3].map((p) => (
            <button key={p} className={`w-12 h-12 flex items-center justify-center rounded-full font-bold transition-all ${
              p === 1 ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'text-gray-400 hover:bg-gray-50'
            }`}>
              {p}
            </button>
          ))}
          <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 hover:border-primary hover:text-primary transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default GalleryPage
