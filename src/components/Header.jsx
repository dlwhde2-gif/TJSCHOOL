'use client';
import React, { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, LogIn, User, LogOut, Search, Bell } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
    router.refresh()
  }

  const navItems = [
    { 
      name: '학교소개', 
      path: '/about/greetings',
      subItems: [
        { name: '인사말', path: '/about/greetings' },
        { name: '교육목표', path: '/about/goals' },
        { name: '학교연혁', path: '/about/history' },
        { name: '오시는 길', path: '/about/map' },
      ]
    },
    { 
      name: '입학안내', 
      path: '/about/admission',
      subItems: [
        { name: '초등입학안내', path: '/about/admission' },
        { name: '중등입학안내', path: '/about/admission/middle' },
        { name: '입학상담', path: '/about/admission/qna' },
      ]
    },
    { 
      name: '교육과정', 
      path: '/curriculum/elementary',
      subItems: [
        { name: '초등과정', path: '/curriculum/elementary' },
        { name: '중등과정', path: '/curriculum/middle' },
        { name: '방과후학교', path: '/curriculum/language' },
        { name: '학사일정', path: '/curriculum/calendar' },
      ]
    },
    { 
      name: '학교생활', 
      path: '/life/gallery',
      subItems: [
        { name: '사진갤러리', path: '/life/gallery' },
        { name: '영상갤러리', path: '/life/video' },
        { name: '급식식단', path: '/life/meal' },
        { name: '보도자료', path: '/life/news' },
      ]
    },
    { 
      name: '커뮤니티', 
      path: '/community/notice',
      subItems: [
        { name: '공지사항', path: '/community/notice' },
        { name: '가정통신문', path: '/community/letter' },
        { name: '각종서식', path: '/community/download' },
      ]
    },
  ]

  const isHomePage = pathname === '/'
  // Forced white background for visibility on home page as requested
  const headerStyle = true 

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      headerStyle ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <img src="/TJPROJECT%20LOGO.png" alt="TJSCHOOL Logo" className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
            <div className="flex flex-col">
              <span className={`text-2xl font-black tracking-tighter transition-colors ${headerStyle ? 'text-primary' : 'text-white'}`}>TJSCHOOL</span>
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${headerStyle ? 'text-gray-400' : 'text-white/60'}`}>Global Campus</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <div key={item.name} className="relative group py-2">
                <Link 
                  href={item.path} 
                  className={`text-[15px] font-bold tracking-tight transition-colors flex items-center group-hover:text-primary ${
                    headerStyle ? 'text-gray-600' : 'text-white'
                  }`}
                >
                  {item.name}
                  <ChevronDown size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[200px] grid gap-2">
                    {item.subItems.map((sub) => (
                      <Link 
                        key={sub.name} 
                        href={sub.path}
                        className="text-sm font-medium text-gray-500 hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-all"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{user.name}님</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={18} />
                  <span>로그아웃</span>
                </button>
                {user.role === 'admin' && (
                  <Link href="/admin" className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-primary hover:text-white transition-all">
                    <Settings size={20} />
                  </Link>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                  headerStyle 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95' 
                  : 'bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-primary'
                }`}
              >
                로그인
              </Link>
            )}
          </div>

          <button 
            className={`lg:hidden p-2 rounded-xl transition-all ${headerStyle ? 'text-primary bg-primary/5' : 'text-white bg-white/10'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="p-6 space-y-8">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-4">
                  <p className="text-xs font-black text-gray-300 uppercase tracking-widest">{item.name}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {item.subItems.map((sub) => (
                      <Link 
                        key={sub.name} 
                        href={sub.path}
                        className="text-gray-600 font-bold hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-gray-50">
                {user ? (
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">{user.name}님 환영합니다</span>
                    <button onClick={handleLogout} className="text-red-500 font-bold">로그아웃</button>
                  </div>
                ) : (
                  <Link 
                    href="/login" 
                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={20} />
                    <span>로그인</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const Settings = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>

export default Header
