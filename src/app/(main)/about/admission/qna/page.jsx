import BoardPage from '@/pages/BoardPage'

export default function AdmissionQna() {
  const navItems = [
    { name: '초등입학안내', path: '/about/admission' },
    { name: '중등입학안내', path: '/about/admission/middle' },
    { name: '입학상담', path: '/about/admission/qna' },
  ]

  return (
    <BoardPage 
      mainCategory="입학안내" 
      subCategory="입학상담" 
      navItems={navItems} 
    />
  )
}
