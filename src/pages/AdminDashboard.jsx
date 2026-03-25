'use client';
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Save, LogOut, Image as ImageIcon, Settings, Bell, Users, Loader2, Check, X, LayoutDashboard, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard') // dashboard, users, popups, heroes, subheroes
  const [popups, setPopups] = useState([])
  const [heroImages, setHeroImages] = useState([])
  const [subHeroes, setSubHeroes] = useState([]) 
  const [users, setUsers] = useState([])
  const [userSearchTerm, setUserSearchTerm] = useState('')
  const [histories, setHistories] = useState([])
  const [newHistory, setNewHistory] = useState({ year: new Date().getFullYear(), month: 1, content: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [adminUser, setAdminUser] = useState(null)
  const router = useRouter()
  const supabase = getSupabase()

  const categories = ['학교소개', '입학안내', '교육과정', '학교생활', '커뮤니티']

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      if (parsed.role !== 'admin') {
        window.alert('관리자 권한이 없습니다.')
        router.push('/')
      }
      setAdminUser(parsed)
    } else {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      if (activeTab === 'dashboard' || activeTab === 'popups') {
        const { data: pops } = await supabase.from('popups').select('*').order('createdAt', { ascending: false })
        setPopups(pops || [])
      }
      if (activeTab === 'dashboard' || activeTab === 'history') {
        const { data: hists } = await supabase.from('histories').select('*').order('year', { ascending: false }).order('month', { ascending: false })
        setHistories(hists || [])
      }
      if (activeTab === 'dashboard' || activeTab === 'heroes') {
        const { data } = await supabase.from('settings').select('*').eq('key', 'heroImages').maybeSingle()
        if (data && data.value) setHeroImages(JSON.parse(data.value))
      }
      if (activeTab === 'dashboard' || activeTab === 'users') {
        const { data } = await supabase.from('users').select('*').order('createdAt', { ascending: false })
        setUsers(data || [])
      }
      if (activeTab === 'dashboard' || activeTab === 'subheroes') {
        const { data } = await supabase.from('settings').select('*').like('key', 'hero_%')
        setSubHeroes(data || [])
      }
    } catch (err) { console.error(err) }
    finally { setIsLoading(false) }
  }

  const handleUpdateSubHero = async (category, url) => {
    try {
      const { error } = await supabase.from('settings').upsert({ key: `hero_${category}`, value: url }, { onConflict: 'key' })
      if (error) throw error
    } catch (err) { console.error(err) }
  }

  const handleApproveUser = async (username, status) => {
    try {
      const { error } = await supabase.from('users').update({ isApproved: status }).eq('username', username)
      if (error) throw error
      setUsers(users.map(u => u.username === username ? { ...u, isApproved: status } : u))
    } catch (err) { window.alert(err.message) }
  }

  const handleDeleteUser = async (username) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      const { error } = await supabase.from('users').delete().eq('username', username)
      if (error) throw error
      setUsers(users.filter(u => u.username !== username))
    } catch (err) { window.alert(err.message) }
  }

  const handleUpdateHero = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from('settings').upsert({ key: 'heroImages', value: JSON.stringify(heroImages) }, { onConflict: 'key' })
      if (error) throw error
      window.alert('히어로 이미지가 저장되었습니다.')
    } catch (err) { window.alert(err.message) }
    finally { setIsLoading(false) }
  }

  const handleAddPopup = async () => {
    try {
      const { data, error } = await supabase.from('popups').insert({
        image: 'https://images.unsplash.com/photo-1544717297-fa154daaf76e',
        link: '#',
        isActive: true
      }).select().single()
      if (error) throw error
      setPopups([data, ...popups])
    } catch (err) { window.alert(err.message) }
  }

  const handleDeletePopup = async (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return
    try {
      const { error } = await supabase.from('popups').delete().eq('id', id)
      if (error) throw error
      setPopups(popups.filter(p => p.id !== id))
    } catch (err) { window.alert(err.message) }
  }

  const handleTogglePopup = async (id, currentStatus) => {
    try {
      const { error } = await supabase.from('popups').update({ isActive: !currentStatus }).eq('id', id)
      if (error) throw error
      setPopups(popups.map(p => p.id === id ? { ...p, isActive: !currentStatus } : p))
    } catch (err) { window.alert(err.message) }
  }

  const handleAddHistory = async () => {
    try {
      await supabase.from('histories').insert(newHistory)
      window.alert('연혁이 추가되었습니다.')
      setNewHistory({ year: new Date().getFullYear(), month: 1, content: '' })
      fetchData()
    } catch (err) { window.alert(err.message) }
  }

  const handleDeleteHistory = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await supabase.from('histories').delete().eq('id', id)
      fetchData()
    } catch (err) { window.alert(err.message) }
  }

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={48} /></div>

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 space-y-8 hidden md:flex">
        <Link href="/" className="flex items-center space-x-2 px-2">
          <img src="/TJPROJECT%20LOGO.png" className="h-8 w-auto object-contain" alt="Logo" />
          <span className="font-black text-primary text-xl tracking-tighter">TJSCHOOL</span>
        </Link>
        <nav className="flex-1 space-y-2">
           <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-primary/5 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
             <LayoutDashboard size={20} /> <span>대시보드</span>
           </button>
           <button onClick={() => setActiveTab('users')} className={`w-full flex items-center space-x-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-primary/5 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
             <Users size={20} /> <span>회원 승인 관리</span>
           </button>
           <button onClick={() => setActiveTab('popups')} className={`w-full flex items-center space-x-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'popups' ? 'bg-primary/5 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
             <Bell size={20} /> <span>팝업 관리</span>
           </button>
           <button onClick={() => setActiveTab('heroes')} className={`w-full flex items-center space-x-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'heroes' ? 'bg-primary/5 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
             <ImageIcon size={20} /> <span>메인 히어로</span>
           </button>
           <button onClick={() => setActiveTab('subheroes')} className={`w-full flex items-center space-x-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'subheroes' ? 'bg-primary/5 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
             <Settings size={20} /> <span>서브 히어로</span>
           </button>
           <button onClick={() => setActiveTab('history')} className={`w-full flex items-center space-x-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'history' ? 'bg-primary/5 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
             <Calendar size={20} /> <span>학교 연혁 관리</span>
           </button>
           <hr className="my-4 border-gray-50" />
           <Link href="/community/notice" className="w-full flex items-center space-x-3 p-3 text-gray-400 hover:bg-gray-50 rounded-xl transition-all">
             <Settings size={20} /> <span>홈페이지 관리</span>
           </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            {activeTab === 'dashboard' && '관리자 대시보드'}
            {activeTab === 'users' && '회원 승인 관리'}
            {activeTab === 'popups' && '팝업 관리'}
            {activeTab === 'heroes' && '메인 히어로 관리'}
            {activeTab === 'subheroes' && '서브 히어로 관리'}
            {activeTab === 'history' && '학교 연혁 관리'}
          </h1>
          <button onClick={() => { localStorage.removeItem('user'); router.push('/') }} className="flex items-center text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={18} className="mr-2" /> 로그아웃
          </button>
        </div>

        <div className="space-y-10">
            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                  <p className="text-gray-400 font-bold mb-2">대기 회원</p>
                  <p className="text-4xl font-black text-primary">{users.filter(u => !u.isApproved).length}</p>
                </div>
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                  <p className="text-gray-400 font-bold mb-2">활성 팝업</p>
                  <p className="text-4xl font-black text-secondary">{popups.filter(p => p.isActive).length}</p>
                </div>
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                  <p className="text-gray-400 font-bold mb-2">히어로 이미지</p>
                  <p className="text-4xl font-black text-gray-800">{heroImages.length}</p>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100 gap-4">
                  <input
                    type="text"
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    placeholder="아이디, 이름, 학생이름 검색..."
                    className="w-full md:w-80 px-5 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-primary rounded-xl outline-none font-medium transition-all"
                  />
                  <button
                    onClick={() => {
                      const headers = ['아이디', '이름', '학생이름', '역할', '승인상태']
                      const csvData = users
                        .filter(u => 
                          u.username.toLowerCase().includes(userSearchTerm.toLowerCase()) || 
                          u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) || 
                          (u.phone && u.phone.toLowerCase().includes(userSearchTerm.toLowerCase()))
                        )
                        .map(u => [
                          u.username,
                          u.name,
                          u.phone || '',
                          u.role,
                          u.isApproved ? '승인완료' : '승인대기'
                        ])
                      
                      const csvString = [
                        headers.join(','),
                        ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
                      ].join('\n')
                      
                      const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' })
                      const url = URL.createObjectURL(blob)
                      const link = document.createElement('a')
                      link.href = url
                      link.setAttribute('download', `TJSCHOOL_회원목록_${new Date().toISOString().split('T')[0]}.csv`)
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    className="w-full md:w-auto px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    엑셀(CSV) 다운로드
                  </button>
                </div>
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-400">아이디</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-400">이름</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-400">학생이름</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-400">역할</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-400">승인상태</th>
                      <th className="px-8 py-5 text-right text-sm font-bold text-gray-400">작업</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users
                      .filter(u => 
                        u.username.toLowerCase().includes(userSearchTerm.toLowerCase()) || 
                        u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) || 
                        (u.phone && u.phone.toLowerCase().includes(userSearchTerm.toLowerCase()))
                      )
                      .map(u => (
                      <tr key={u.username} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6 font-bold text-gray-800">{u.username}</td>
                        <td className="px-8 py-6 text-gray-600 font-medium">{u.name}</td>
                        <td className="px-8 py-6 text-gray-600 font-medium">{u.phone || '-'}</td>
                        <td className="px-8 py-6"><span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>{u.role}</span></td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.isApproved ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'}`}>
                            {u.isApproved ? '승인완료' : '승인대기'}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-2">
                          {!u.isApproved ? (
                            <button onClick={() => handleApproveUser(u.username, true)} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"><Check size={20} /></button>
                          ) : (
                            <button onClick={() => handleApproveUser(u.username, false)} className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"><X size={20} /></button>
                          )}
                          <button onClick={() => handleDeleteUser(u.username)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}

            {/* Popups Tab */}
            {activeTab === 'popups' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <button onClick={handleAddPopup} className="lg:col-span-2 py-8 border-2 border-dashed border-gray-200 rounded-[32px] text-gray-400 font-bold hover:bg-white hover:border-primary hover:text-primary transition-all flex items-center justify-center">
                  <Plus size={24} className="mr-2" /> 새로운 팝업 추가
                </button>
                {popups.map(p => (
                  <div key={p.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-6">
                    <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-inner border border-gray-50 bg-gray-50">
                      <img src={p.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-4">

                      <div className="flex flex-col gap-2">
                         <input 
                           type="file"
                           accept="image/*"
                           id={`popup-upload-${p.id}`}
                           className="hidden"
                           onChange={async (e) => {
                             const file = e.target.files[0]
                             if (!file) return
                             setIsLoading(true)
                             try {
                               const ext = file.name.split('.').pop()
                               const path = `popups/p_${Date.now()}.${ext}`
                               const { error: upErr } = await supabase.storage.from('yujung-storage').upload(path, file)
                               if (upErr) throw upErr
                               const { data: { publicUrl } } = supabase.storage.from('yujung-storage').getPublicUrl(path)
                               setPopups(popups.map(item => item.id === p.id ? {...item, image: publicUrl} : item))
                               await supabase.from('popups').update({ image: publicUrl }).eq('id', p.id)
                             } catch (err) { window.alert(err.message) }
                             finally { setIsLoading(false) }
                           }}
                         />
                         <label 
                           htmlFor={`popup-upload-${p.id}`}
                           className="w-full bg-primary/5 text-primary py-3 rounded-xl text-center font-bold cursor-pointer hover:bg-primary/10 transition-all"
                         >
                           팝업 이미지 업로드
                         </label>
                         <input value={p.image} onChange={async (e) => {
                           const val = e.target.value
                           setPopups(popups.map(item => item.id === p.id ? {...item, image: val} : item))
                           await supabase.from('popups').update({ image: val }).eq('id', p.id)
                         }} className="w-full text-[10px] text-gray-300 bg-transparent px-2 outline-none truncate" placeholder="이미지 URL" />
                      </div>
                      <div className="flex items-center justify-between">
                        <button onClick={() => handleTogglePopup(p.id, p.isActive)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${p.isActive ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {p.isActive ? '표시 중' : '숨김'}
                        </button>
                        <button onClick={() => handleDeletePopup(p.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Heroes Tab */}
            {activeTab === 'heroes' && (
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-xl font-bold">메인 슬라이드 관리</h3>
                   <button onClick={handleUpdateHero} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20">변경사항 저장</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {heroImages.map((url, i) => (
                    <div key={i} className="space-y-3 p-4 bg-gray-50 rounded-3xl relative group">
                      <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
                        <img src={url} className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/400x225?text=Invalid+URL'} />
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <input 
                          type="file"
                          accept="image/*"
                          id={`hero-upload-${i}`}
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files[0]
                            if (!file) return
                            setIsLoading(true)
                            try {
                              const ext = file.name.split('.').pop()
                              const randomStr = Math.random().toString(36).substring(2, 8)
                              const path = `heroes/main_${Date.now()}_${randomStr}.${ext}`
                              const { error: upErr } = await supabase.storage.from('yujung-storage').upload(path, file)
                              if (upErr) throw upErr
                              const { data: { publicUrl } } = supabase.storage.from('yujung-storage').getPublicUrl(path)
                              const next = [...heroImages]
                              next[i] = publicUrl
                              setHeroImages(next)
                            } catch (err) { window.alert(err.message) }
                            finally { setIsLoading(false) }
                          }}
                        />
                        <label 
                          htmlFor={`hero-upload-${i}`}
                          className="w-full bg-primary/5 text-primary py-2 rounded-xl text-center text-sm font-bold cursor-pointer hover:bg-primary/10 transition-all"
                        >
                          이미지 업로드
                        </label>
                        <input 
                          value={url} 
                          onChange={(e) => {
                            const next = [...heroImages]
                            next[i] = e.target.value
                            setHeroImages(next)
                          }}
                          className="w-full bg-white border border-gray-100 p-2 rounded-xl text-xs text-gray-500 outline-none truncate"
                          placeholder="또는 이미지 URL 직접 입력"
                        />
                      </div>

                      <button onClick={() => setHeroImages(heroImages.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={() => setHeroImages([...heroImages, ''])} className="aspect-[16/9] border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold hover:bg-gray-100 transition-all flex flex-col items-center justify-center">
                    <Plus size={32} className="mb-2" /> 새 이미지 추가
                  </button>
                </div>
              </div>
            )}
            {/* Sub Heroes Tab */}
            {activeTab === 'subheroes' && (
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-xl font-bold">카테고리별 히어로 관리</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {categories.map(cat => {
                    const current = subHeroes.find(s => s.key === `hero_${cat}`)?.value || ''
                    return (
                      <div key={cat} className="space-y-4 p-6 bg-gray-50 rounded-[32px] border border-gray-100">
                        <p className="font-black text-gray-800 ml-2">{cat}</p>
                        <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-sm bg-white mb-4">
                          <img src={current} className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/800x340?text=' + encodeURIComponent(cat)} />
                        </div>
                        <div className="flex flex-col gap-3">
                          <input 
                            type="file"
                            accept="image/*"
                            id={`upload-${cat}`}
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files[0]
                              if (!file) return
                              
                              setIsLoading(true)
                              try {
                                const ext = file.name.split('.').pop()
                                const randomStr = Math.random().toString(36).substring(2, 8)
                                const path = `heroes/sub_${Date.now()}_${randomStr}.${ext}`
                                const { error: upErr } = await supabase.storage.from('yujung-storage').upload(path, file)
                                if (upErr) throw upErr
                                
                                const { data: { publicUrl } } = supabase.storage.from('yujung-storage').getPublicUrl(path)
                                await handleUpdateSubHero(cat, publicUrl)
                                window.alert(`${cat} 히어로 이미지가 업데이트되었습니다.`)
                                fetchData() // Refresh
                              } catch (err) { window.alert(err.message) }
                              finally { setIsLoading(false) }
                            }}
                          />
                          <label 
                            htmlFor={`upload-${cat}`}
                            className="w-full bg-white px-4 py-3 rounded-xl text-center font-bold text-primary border-2 border-primary/20 hover:bg-primary/5 cursor-pointer transition-all"
                          >
                            이미지 업로드
                          </label>
                          <input 
                            value={current} 
                            onChange={(e) => {
                              const val = e.target.value
                              setSubHeroes(prev => {
                                const exists = prev.find(s => s.key === `hero_${cat}`)
                                if (exists) return prev.map(s => s.key === `hero_${cat}` ? {...s, value: val} : s)
                                return [...prev, { key: `hero_${cat}`, value: val }]
                              })
                            }}
                            className="w-full bg-white px-4 py-2 rounded-xl text-xs outline-none border border-gray-100 truncate"
                            placeholder="또는 이미지 URL 입력"
                          />
                          <button 
                            onClick={() => handleUpdateSubHero(cat, current)}
                            className="bg-primary text-white py-2 rounded-xl font-bold text-sm"
                          >직접 입력 저장</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-6">
                  <h3 className="text-xl font-bold">학교 연혁 추가</h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input type="number" value={newHistory.year} onChange={e => setNewHistory({...newHistory, year: e.target.value})} placeholder="연도 (예: 2024)" className="px-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-2xl outline-none w-32 font-bold text-center" />
                    <input type="number" min="1" max="12" value={newHistory.month} onChange={e => setNewHistory({...newHistory, month: e.target.value})} placeholder="월" className="px-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-2xl outline-none w-24 font-bold text-center" />
                    <input type="text" value={newHistory.content} onChange={e => setNewHistory({...newHistory, content: e.target.value})} placeholder="연혁 내용을 입력하세요" className="flex-1 px-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-2xl outline-none font-medium" />
                    <button onClick={handleAddHistory} className="px-8 py-4 bg-primary text-white rounded-2xl font-bold whitespace-nowrap shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">추가하기</button>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-6">
                  <h3 className="text-xl font-bold">학교 연혁 목록</h3>
                  <div className="space-y-4">
                    {histories.map(h => (
                      <div key={h.id} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-6 bg-gray-50 rounded-[24px] hover:bg-white border-2 border-transparent hover:border-gray-100 transition-all shadow-sm">
                        <div className="flex-shrink-0 flex items-center justify-center w-24 bg-white py-3 rounded-xl shadow-sm text-primary font-black">
                          {h.year}.{h.month.toString().padStart(2, '0')}
                        </div>
                        <input value={h.content} onChange={async (e) => {
                          const val = e.target.value
                          setHistories(histories.map(item => item.id === h.id ? {...item, content: val} : item))
                          await supabase.from('histories').update({ content: val }).eq('id', h.id)
                        }} className="flex-1 bg-transparent border-b border-transparent focus:border-primary px-4 py-2 outline-none font-medium text-gray-700" />
                        <button onClick={() => handleDeleteHistory(h.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors shrink-0 self-end md:self-auto">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
      </main>
    </div>
  )
}

export default AdminDashboard
