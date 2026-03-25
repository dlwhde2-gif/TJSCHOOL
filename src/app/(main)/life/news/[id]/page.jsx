import BoardDetailPage from '@/pages/BoardDetailPage'

export default function SchoolNewsDetail() {
  const navItems = [
    { name: '사진갤러리', path: '/life/gallery' },
    { name: '영상갤러리', path: '/life/video' },
    { name: '급식식단', path: '/life/meal' },
    { name: '보도자료', path: '/life/news' },
  ]

  return (
    <BoardDetailPage 
      mainCategory="학교생활" 
      subCategory="보도자료" 
      navItems={navItems} 
    />
  )
}
