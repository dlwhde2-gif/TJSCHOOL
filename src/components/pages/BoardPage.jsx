'use client';
import React, { useState, useEffect } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Search, ChevronLeft, ChevronRight, PenTool } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';

const BoardPage = ({ mainCategory, subCategory, navItems }) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const currentPath = pathname

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      const supabase = getSupabase()
      try {
        // subCategory based filtering
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('boardType', subCategory)
          .order('isNotice', { ascending: false })
          .order('createdAt', { ascending: false })

        if (error) throw error
        setPosts(data || [])
      } catch (err) {
        console.error('寃뚯떆湲 遺덈윭?ㅺ린 ?먮윭:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [subCategory])

  const navigate = (path) => router.push(path)

  return (
    <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <p className="text-gray-500 font-medium">珥?<span className="text-primary font-bold">{posts.length}</span>嫄댁쓽 寃뚯떆臾쇱씠 ?덉뒿?덈떎.</p>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="寃?됱뼱瑜??낅젰?섏꽭??
                className="w-full pl-6 pr-12 py-3 bg-gray-50 rounded-full border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {user && (
              <button 
                onClick={() => navigate(`${currentPath}/write`)}
                className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center shrink-0 shadow-lg shadow-primary/20"
              >
                <PenTool size={18} className="mr-2" />
                湲?곌린
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-800 text-gray-800 bg-gray-50">
                <th className="px-2 py-5 text-center font-bold w-16 whitespace-nowrap">No</th>
                <th className="px-6 py-5 text-left font-bold">?쒕ぉ</th>
                <th className="px-6 py-5 text-center font-bold w-28">?묒꽦??/th>
                <th className="px-6 py-5 text-center font-bold w-32">?묒꽦??/th>
                <th className="px-6 py-5 text-center font-bold w-24">議고쉶??/th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-600">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-gray-400 font-medium italic">
                    ?곗씠?곕? 遺덈윭?ㅻ뒗 以묒엯?덈떎...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-gray-400 font-medium">
                    ?깅줉??寃뚯떆湲???놁뒿?덈떎.
                  </td>
                </tr>
              ) : (
                posts.map((post, index) => (
                  <tr 
                    key={post.id} 
                    onClick={() => navigate(`${currentPath}/${post.id}`)}
                    className={`hover:bg-gray-50 transition-colors group cursor-pointer ${post.isNotice ? 'bg-primary/5' : ''}`}
                  >
                    <td className="px-2 py-6 text-center whitespace-nowrap">
                      {post.isNotice ? (
                        <span className="bg-primary text-white px-3 py-1 rounded-md text-xs font-black tracking-widest uppercase">Notice</span>
                      ) : (
                        <span className="font-medium text-gray-400">{posts.length - index}</span>
                      )}
                    </td>
                    <td className="px-6 py-6 font-bold text-gray-800 group-hover:text-primary transition-colors text-lg">
                      {post.title}
                    </td>
                    <td className="px-6 py-6 text-center text-sm font-medium">{post.author}</td>
                    <td className="px-6 py-6 text-center text-sm text-gray-400 font-medium">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-6 text-center text-sm font-bold text-gray-400">{post.views || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-all">
            <ChevronLeft size={20} />
          </button>
          {[1, 2, 3].map((p) => (
            <button key={p} className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all ${
              p === 1 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:bg-gray-100'
            }`}>
              {p}
            </button>
          ))}
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default BoardPage

