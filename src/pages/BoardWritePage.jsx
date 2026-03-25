'use client';
import React, { useState, useEffect, Suspense } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Save, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

const BoardWriteContent = ({ mainCategory, subCategory, navItems }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isNotice: false
  })
  const [imageFile, setImageFile] = useState(null)
  const [existingPost, setExistingPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
    else {
      window.alert('濡쒓렇?몄씠 ?꾩슂?⑸땲??')
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    if (editId) {
      const fetchPost = async () => {
        const supabase = getSupabase()
        const { data, error } = await supabase.from('posts').select('*').eq('id', editId).single()
        if (data && !error) {
          setFormData({
            title: data.title,
            content: data.content,
            isNotice: data.isNotice || false
          })
          setExistingPost(data)
        }
      }
      fetchPost()
    }
  }, [editId])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.content) return window.alert('?쒕ぉ怨??댁슜???낅젰?댁＜?몄슂.')
    
    setIsLoading(true)
    const supabase = getSupabase()

    try {
      let fileUrl = null
      let fileName = null
      let fileType = null

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        fileName = imageFile.name
        fileType = imageFile.type
        const storageName = `${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `posts/${storageName}`

        const { error: uploadError } = await supabase.storage
          .from('yujung-storage')
          .upload(filePath, imageFile)

        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from('yujung-storage').getPublicUrl(filePath)
        fileUrl = publicUrl
      } else if (existingPost) {
        fileUrl = existingPost.image
        fileName = existingPost.fileName
        fileType = existingPost.fileType
      }

      const payload = {
        title: formData.title,
        content: formData.content,
        author: user.name,
        boardType: subCategory,
        isNotice: formData.isNotice && user.role === 'admin',
        image: fileUrl,
        fileName: fileName,
        fileType: fileType,
        date: existingPost ? existingPost.date : new Date().toISOString().split('T')[0],
      }
      
      if (!existingPost) {
        payload.createdAt = new Date().toISOString()
      }

      const query = editId
        ? supabase.from('posts').update(payload).eq('id', editId)
        : supabase.from('posts').insert(payload)

      const { error: saveError } = await query

      if (saveError) throw saveError

      window.alert('?묒꽦?섏뿀?듬땲??')
      router.back()
    } catch (err) {
      window.alert('????ㅽ뙣: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{editId ? '湲 ?섏젙?섍린' : '湲?곌린'}</h2>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-4">?쒕ぉ</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-8 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all text-xl font-bold"
                placeholder="?쒕ぉ???낅젰?섏꽭??
              />
            </div>

            {user?.role === 'admin' && (
              <div className="flex items-center space-x-3 ml-4">
                <input 
                  type="checkbox" 
                  id="isNotice"
                  checked={formData.isNotice}
                  onChange={(e) => setFormData({...formData, isNotice: e.target.checked})}
                  className="w-5 h-5 accent-primary"
                />
                <label htmlFor="isNotice" className="text-sm font-bold text-gray-700">以묒슂 怨듭??ы빆?쇰줈 ?깅줉</label>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-4">?뚯씪 泥⑤?</label>
              <div className="relative group">
                <input 
                  type="file" 
                  accept="*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload"
                  className="flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-[32px] cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="flex flex-col items-center">
                    <ImageIcon size={48} className="text-gray-300 group-hover:text-primary transition-colors mb-4" />
                    <span className="text-gray-500 font-medium">{imageFile ? imageFile.name : '?뚯씪???좏깮?섏꽭??(紐⑤뱺 ?뺤떇 媛??'}</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-4">?댁슜</label>
              <textarea 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-8 py-6 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all min-h-[400px] resize-none leading-relaxed"
                placeholder="?댁슜???낅젰?섏꽭??.."
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-4 px-6 rounded-2xl border-2 border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                <X size={20} className="mr-2" /> 痍⑥냼
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="flex-[2] py-4 px-6 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Save size={20} className="mr-2" />}
                ??ν븯湲?
              </button>
            </div>
          </form>
        </div>
      </div>
    </SubPageLayout>
  )
}

const BoardWritePage = (props) => {
  return (
    <Suspense fallback={<div>遺덈윭?ㅻ뒗 以?..</div>}>
      <BoardWriteContent {...props} />
    </Suspense>
  )
}

export default BoardWritePage

