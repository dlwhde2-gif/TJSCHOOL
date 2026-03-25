import HistoryPage from '@/pages/HistoryPage'

export default function Page() {
  const navItems = [
    { name: '인사말', path: '/about/greetings' },
    { name: '교육목표', path: '/about/goals' },
    { name: '학교연혁', path: '/about/history' },
    { name: '오시는 길', path: '/about/map' },
  ]

  return (
    <HistoryPage mainCategory="학교소개" subCategory="학교연혁" navItems={navItems} />
  )
}
