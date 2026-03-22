import AdmissionPage from '@/pages/AdmissionPage'

export default function MiddleAdmission() {
  const navItems = [
    { name: '초등입학안내', path: '/about/admission' },
    { name: '중등입학안내', path: '/about/admission/middle' },
    { name: '입학상담', path: '/about/admission/qna' },
  ]

  return (
    <AdmissionPage 
      navItems={navItems}
      subCategory="중등입학안내"
    />
  )
}
