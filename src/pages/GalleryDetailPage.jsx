'use client';
import React, { useState, useEffect } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Calendar, Eye, User, ArrowLeft, Trash2, Camera, Edit } from 'lucide-react'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

const GalleryDetailPage = ({ mainCategory, subCategory, navItems }) => {
  const [item, setItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const params = useParams()
  const id = params.id

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  useEffect(() => {
    const fetchItem = async () => {
      const supabase = getSupabase()
      try {
        const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
        if (error) throw error
        setItem(data)
        // Increment views
        await supabase.from('posts').update({ views: (data.views || 0) + 1 }).eq('id', id)
      } catch (err) {
        console.error('갤러리 불러오기 에러:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchItem()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    const supabase = getSupabase()
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id)
      if (error) throw error
      window.alert('삭제되었습니다.')
      router.back()
    } catch (err) {
      window.alert('삭제 실패: ' + err.message)
    }
  }

  if (isLoading) return <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}><div className="py-20 text-center">로딩 중...</div></SubPageLayout>
  if (!item) return <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}><div className="py-20 text-center">사진을 찾을 수 없습니다.</div></SubPageLayout>

  const isAuthor = user && (user.name === item.author || user.role === 'admin')

  return (
    <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}>
      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center text-gray-400 hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft size={20} className="mr-2" /> 목록으로 돌아가기
        </button>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-50 bg-gray-50/30">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{item.title}</h2>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center"><User size={16} className="mr-2" /> {item.author || 'TJSCHOOL'}</span>
              <span className="flex items-center"><Calendar size={16} className="mr-2" /> {new Date(item.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center"><Eye size={16} className="mr-2" /> {item.views || 0}</span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 mb-10">
              {item.image?.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
                <img src={item.image} alt={item.title} className="w-full h-auto" />
              ) : (
                <div className="p-20 bg-gray-50 flex flex-col items-center">
                  <p className="text-gray-400 mb-6 font-bold">첨부 파일</p>
                  <a href={item.image} download className="bg-primary text-white px-10 py-4 rounded-[20px] font-bold shadow-xl">파일 다운로드</a>
                </div>
              )}
            </div>
            {item.content && (
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                {item.content}
              </div>
            )}
          </div>

          {isAuthor && (
            <div className="p-8 bg-gray-50 flex justify-end space-x-4">
              <button 
                onClick={() => router.push(`${window.location.pathname.replace(id, '')}write?edit=${id}`)}
                className="flex items-center px-6 py-3 text-primary hover:bg-primary/10 rounded-2xl font-bold transition-all"
              >
                <Edit size={20} className="mr-2" /> 수정하기
              </button>
              <button 
                onClick={handleDelete}
                className="flex items-center px-6 py-3 text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-all"
              >
                <Trash2 size={20} className="mr-2" /> 삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  )
}

export default GalleryDetailPage
