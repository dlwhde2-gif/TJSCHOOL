import BoardPage from '@/pages/BoardPage'

export default function LetterListPage() {
  const navItems = [
    { name: '공지사항', path: '/community/notice' },
    { name: '가정통신문', path: '/community/letter' },
    { name: '각종서식', path: '/community/download' },
  ]

  return (
    <BoardPage 
      mainCategory="커뮤니티" 
      subCategory="가정통신문" 
      navItems={navItems} 
    />
  )
}
