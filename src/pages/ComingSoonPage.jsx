'use client';
import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'

const ComingSoonPage = ({ title, mainCategory, subCategory, navItems }) => {
  return (
    <SubPageLayout
      mainCategory={mainCategory}
      subCategory={subCategory}
      navItems={navItems}
    >
      <div className="flex flex-col items-center justify-center py-40 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-primary mb-8">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{subCategory} 페이지 준비 중</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          현재 해당 페이지의 콘텐츠를 정성껏 준비하고 있습니다.<br />
          빠른 시일 내에 멋진 모습으로 찾아뵙겠습니다.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-10 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg"
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    </SubPageLayout>
  )
}

export default ComingSoonPage
