'use client';
import React, { useState, useEffect } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Calendar, Eye, User, ArrowLeft, Trash2, Edit } from 'lucide-react'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

const BoardDetailPage = ({ mainCategory, subCategory, navItems }) => {
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const params = useParams()
  const id = params?.id

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      const supabase = getSupabase()
      try {
        const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
        if (error) throw error
        setPost(data)
        // Increment views
        await supabase.from('posts').update({ views: (data.views || 0) + 1 }).eq('id', id)
      } catch (err) {
        console.error('글 불러오기 에러:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
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
  if (!post) return <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}><div className="py-20 text-center">글을 찾을 수 없습니다.</div></SubPageLayout>

  const isAuthor = user && (user.name === post.author || user.role === 'admin')

  return (
    <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center text-gray-400 hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft size={20} className="mr-2" /> 목록으로 돌아가기
        </button>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-50 bg-gray-50/30">
            {post.isNotice && <span className="inline-block bg-primary text-white px-3 py-1 rounded-md text-xs font-black tracking-widest uppercase mb-4">Notice</span>}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{post.title}</h2>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center"><User size={16} className="mr-2" /> {post.author}</span>
              <span className="flex items-center"><Calendar size={16} className="mr-2" /> {new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center"><Eye size={16} className="mr-2" /> {post.views || 0}</span>
            </div>
          </div>

          <div className="p-8 md:p-12 min-h-[400px]">
             {post.image && (
               <div className="mb-10 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                 {post.fileType?.startsWith('image/') ? (
                   <img src={post.image} alt="Post Content" className="w-full h-auto" />
                 ) : (
                   <div className="p-12 bg-gray-50 flex flex-col items-center">
                     <p className="text-gray-400 mb-4 font-bold">{post.fileName || '첨부파일'}</p>
                     <a href={post.image} download className="bg-primary text-white px-8 py-3 rounded-xl font-bold">파일 다운로드</a>
                   </div>
                 )}
               </div>
             )}
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {(isAuthor || user?.role === 'admin') && (
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

export default BoardDetailPage
