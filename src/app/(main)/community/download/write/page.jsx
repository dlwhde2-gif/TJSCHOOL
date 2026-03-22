import BoardWritePage from '@/pages/BoardWritePage'

export default function DownloadWritePage() {
  const navItems = [
    { name: '공지사항', path: '/community/notice' },
    { name: '가정통신문', path: '/community/letter' },
    { name: '보도자료', path: '/community/news' },
    { name: '각종서식', path: '/community/download' },
  ]

  return (
    <BoardWritePage 
      mainCategory="커뮤니티" 
      subCategory="각종서식" 
      navItems={navItems} 
    />
  )
}
