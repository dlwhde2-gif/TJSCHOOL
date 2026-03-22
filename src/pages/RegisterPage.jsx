'use client';
import React, { useState } from 'react'
import { UserPlus, Mail, Lock, User, Phone, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    department: '초등과정'
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = getSupabase()

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // 1. Check if email exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', formData.email)
        .eq('id', formData.id)
        .single()

      if (existingUser) {
        throw new Error('이미 등록된 아이디입니다.')
      }

      // 2. Insert into custom users table
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          username: formData.id,
          name: formData.name,
          password: formData.password,
          phone: formData.phone,
          role: 'user',
          isApproved: false,
          created_at: new Date().toISOString()
        })

      if (insertError) throw insertError

      setSuccess(true)
      window.alert('가입 신청이 완료되었습니다. 관리자 승인 후 로그인이 가능합니다.')
      setTimeout(() => router.push('/login'), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">신청 완료!</h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            TJSCHOOL 가입 신청이 정상적으로 접수되었습니다.<br />
            관리자가 정보를 확인한 후 승인해 드릴 예정입니다.<br />
            감사합니다.
          </p>
          <button 
            onClick={() => router.push('/login')}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20"
          >
            로그인 페이지로 이동
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 group mb-6">
            <img src="/logo.png" alt="TJSCHOOL Logo" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold text-primary tracking-tighter">TJSCHOOL</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-800">가입 신청</h2>
          <p className="mt-2 text-gray-500">TJSCHOOL 캠퍼스 일원이 되어보세요.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-start space-x-3">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-4">이름</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all"
                placeholder="실명을 입력해주세요"
              />
            </div>
          </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-4">아이디</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="text"
                  required
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all"
                  placeholder="영문/숫자 아이디 입력"
                />
              </div>
            </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-4">전화번호</label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all"
                placeholder="010-0000-0000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-4">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all"
                placeholder="8자 이상 입력해주세요"
                minLength={8}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                <span>처리 중...</span>
              </>
            ) : (
              <span>가입 신청하기</span>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500">
          이미 계정이 있으신가요? <Link href="/login" className="text-primary font-bold hover:underline">로그인하기</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
