'use client';
import React, { useState, useEffect } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Youtube, Calendar, Eye, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { getSupabase } from '@/lib/supabase';

const VideoPage = ({ mainCategory, subCategory, navItems }) => {
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
    const fetchVideos = async () => {
      setIsLoading(true)
      const supabase = getSupabase()
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('boardType', subCategory)
          .order('createdAt', { ascending: false })
        
        if (error) throw error
        setItems(data || [])
      } catch (err) {
        console.error('?곸긽 遺덈윭?ㅺ린 ?ㅻ쪟:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideos()
  }, [subCategory])

  const currentPath = pathname

  return (
    <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <p className="text-gray-500 font-medium">珥?<span className="text-primary font-bold">{items.length}</span>媛쒖쓽 ?곸긽???깅줉?섏뼱 ?덉뒿?덈떎.</p>
          
          {user && (
            <button 
              onClick={() => router.push(`${currentPath}/write`)}
              className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center"
            >
              <Youtube size={18} className="mr-2" />
              ?곸긽 ?깅줉?섍린
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-gray-400 italic">?곸긽??遺덈윭?ㅻ뒗 以묒엯?덈떎...</div>
          ) : items.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-400 italic">?깅줉???곸긽???놁뒿?덈떎.</div>
          ) : (
            items.map((item) => (
              <a 
                key={item.id} 
                href={item.content || '#'} 
                target="_blank"
                className="group relative bg-white rounded-[40px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col"
              >
                <div className="aspect-video overflow-hidden relative">
                  {/* Thumbnail */}
                  <img 
                    src={item.image || `https://img.youtube.com/vi/${(item.content || '').split('v=')[1]?.split('&')[0] || ''}/maxresdefault.jpg`} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl">
                        <Play size={32} fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* YouTube Tag */}
                  <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center shadow-lg">
                    <Youtube size={14} className="mr-2" /> YouTube
                  </div>
                </div>
                
                <div className="p-10 flex-1">
                  <h4 className="text-2xl font-black text-gray-800 mb-6 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-gray-400 pt-6 border-t border-gray-50">
                    <div className="flex items-center space-x-6 font-medium">
                      <span className="flex items-center"><Calendar size={16} className="mr-2" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center"><Eye size={16} className="mr-2" /> {item.views || 0}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-20 flex justify-center items-center gap-2">
           {/* ... simpler pagination if needed ... */}
        </div>
      </div>
    </SubPageLayout>
  )
}

export default VideoPage

