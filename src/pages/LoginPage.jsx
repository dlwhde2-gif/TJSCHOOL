'use client';
import React, { useState } from 'react'
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = getSupabase()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // 1. Check user in our custom users table (Supabase Auth can also be used, but keeping previous logic)
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('username', email) // 'email' state holds the username now
        .single()

      if (userError || !user) {
        throw new Error('등록되지 않은 아이디이거나 정보를 찾을 수 없습니다.')
      }

      if (user.password !== password) {
        throw new Error('비밀번호가 일치하지 않습니다.')
      }

      if (!user.isApproved) {
        throw new Error('관리자의 가입 승인이 대기 중입니다.')
      }

      // 2. Success - Save to session
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }))

      window.alert(`${user.name}님, 환영합니다!`)
      router.push('/')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 group mb-6">
            <img src="/logo.png" alt="TJSCHOOL Logo" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold text-primary tracking-tighter">TJSCHOOL</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-800">로그인</h2>
          <p className="mt-2 text-gray-500">TJSCHOOL 캠퍼스에 오신 것을 환영합니다.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-start space-x-3 animate-shake">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-4">아이디</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all"
                placeholder="아이디를 입력하세요"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-4">비밀번호</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all"
                placeholder="••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                <span>로그인 중...</span>
              </>
            ) : (
              <span>로그인하기</span>
            )}
          </button>
        </form>

        <div className="mt-10 text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <span className="relative px-4 bg-white text-gray-400 text-sm">또는</span>
          </div>
          <p className="text-gray-500">
            아직 계정이 없으신가요? <br />
            <Link href="/register" className="text-primary font-bold hover:underline">가입 신청하기</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
