'use client';
import React, { useState, useEffect, Suspense } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Save, X, Camera, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

const GalleryWriteContent = ({ mainCategory, subCategory, navItems }) => {
  const [title, setTitle] = useState('')
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
          setTitle(data.title)
          setExistingPost(data)
        }
      }
      fetchPost()
    }
  }, [editId])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!title || (!imageFile && !existingPost)) return window.alert('?쒕ぉ怨??대?吏瑜??좏깮?댁＜?몄슂.')
    
    setIsLoading(true)
    const supabase = getSupabase()

    try {
      let publicUrl = null

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `gallery/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('yujung-storage')
          .upload(filePath, imageFile)

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('yujung-storage').getPublicUrl(filePath)
        publicUrl = data.publicUrl
      } else if (existingPost) {
        publicUrl = existingPost.image
      }

      const payload = {
        title,
        content: title, // Posts table requires content, so using title as placeholder
        image: publicUrl,
        author: user.name,
        boardType: subCategory,
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

      window.alert('?ъ쭊???깅줉?섏뿀?듬땲??')
      router.back()
    } catch (err) {
      window.alert('?깅줉 ?ㅽ뙣: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{editId ? '?ъ쭊 ?섏젙?섍린' : '?ъ쭊 ?깅줉?섍린'}</h2>
          <form onSubmit={handleSave} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-4">?쒕ぉ</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-8 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all text-xl font-bold"
                placeholder="?ъ쭊 ?쒕ぉ???낅젰?섏꽭??
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-4">?뚯씪 ?좏깮</label>
              <div className="relative group">
                <input 
                  type="file" 
                  accept="*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="hidden"
                  id="gallery-upload"
                />
                <label 
                  htmlFor="gallery-upload"
                  className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded-[32px] cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group min-h-[300px]"
                >
                  {imageFile ? (
                    <div className="text-center">
                      <p className="text-primary font-bold mb-2">?좏깮???뚯씪:</p>
                      <p className="text-gray-500">{imageFile.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Camera size={64} className="text-gray-300 group-hover:text-primary transition-colors mb-4" />
                      <span className="text-gray-500 font-medium">?대┃?섏뿬 ?ъ쭊???좏깮?섏꽭??/span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                <X size={20} className="mr-2" /> 痍⑥냼
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="flex-[2] py-4 bg-primary text-white scale-100 font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Save size={20} className="mr-2" />}
                ?ъ쭊 ?깅줉?꾨즺
              </button>
            </div>
          </form>
        </div>
      </div>
    </SubPageLayout>
  )
}

const GalleryWritePage = (props) => {
  return (
    <Suspense fallback={<div>遺덈윭?ㅻ뒗 以?..</div>}>
      <GalleryWriteContent {...props} />
    </Suspense>
  )
}

export default GalleryWritePage

