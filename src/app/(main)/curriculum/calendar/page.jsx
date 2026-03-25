import SubPageLayout from '@/components/SubPageLayout'

export default function SchoolCalendar() {
  const navItems = [
    { name: '초등과정', path: '/curriculum/elementary' },
    { name: '중등과정', path: '/curriculum/middle' },
    { name: '방과후학교', path: '/curriculum/language' },
  ]

  return (
    <SubPageLayout mainCategory="교육과정" subCategory="학사일정" navItems={navItems}>
      <div className="max-w-5xl mx-auto py-20">
        <div className="bg-white rounded-[40px] shadow-2xl p-12 text-center border border-gray-100">
          <div className="text-secondary font-black text-2xl mb-4 tracking-widest uppercase">School Calendar</div>
          <h2 className="text-4xl font-black text-gray-800 mb-8">2026학년도 학사일정</h2>
          <div className="aspect-[4/3] bg-gray-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold text-xl italic">학사일정 표가 준비 중입니다.</p>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
