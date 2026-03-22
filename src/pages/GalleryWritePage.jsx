'use client';
import React, { useState, useEffect } from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { Save, X, Camera, Loader2 } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

const GalleryWritePage = ({ mainCategory, subCategory, navItems }) => {
  const [title, setTitle] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
    else {
      window.alert('로그인이 필요합니다.')
      router.push('/login')
    }
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!title || !imageFile) return window.alert('제목과 이미지를 선택해주세요.')
    
    setIsLoading(true)
    const supabase = getSupabase()

    try {
      // 1. Image Upload
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `gallery/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('yujung-storage')
        .upload(filePath, imageFile)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('yujung-storage').getPublicUrl(filePath)

      // 2. Insert to Galleries table
      const { error: insertError } = await supabase.from('galleries').insert({
        title,
        image: publicUrl,
        author: user.name,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      })

      if (insertError) throw insertError

      window.alert('사진이 등록되었습니다.')
      router.back()
    } catch (err) {
      window.alert('등록 실패: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">사진 등록하기</h2>
          <form onSubmit={handleSave} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-4">제목</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-8 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all text-xl font-bold"
                placeholder="사진 제목을 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-4">파일 선택</label>
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
                      <p className="text-primary font-bold mb-2">선택된 파일:</p>
                      <p className="text-gray-500">{imageFile.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Camera size={64} className="text-gray-300 group-hover:text-primary transition-colors mb-4" />
                      <span className="text-gray-500 font-medium">클릭하여 사진을 선택하세요</span>
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
                <X size={20} className="mr-2" /> 취소
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="flex-[2] py-4 bg-primary text-white scale-100 font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Save size={20} className="mr-2" />}
                사진 등록완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default GalleryWritePage
