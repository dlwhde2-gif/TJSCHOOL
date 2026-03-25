import BoardWritePage from '@/pages/BoardWritePage'

export default function VideoGalleryWrite() {
  const navItems = [
    { name: '사진갤러리', path: '/life/gallery' },
    { name: '영상갤러리', path: '/life/video' },
    { name: '급식식단', path: '/life/meal' },
    { name: '보도자료', path: '/life/news' },
  ]

  return (
    <BoardWritePage 
      mainCategory="학교생활" 
      subCategory="영상갤러리" 
      navItems={navItems} 
    />
  )
}
