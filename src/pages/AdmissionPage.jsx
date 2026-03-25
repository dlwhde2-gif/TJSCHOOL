'use client';
import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { FileText, Calendar, CheckCircle, Info } from 'lucide-react'

const AdmissionPage = ({ subCategory = "珥덈벑?낇븰?덈궡", navItems: propNavItems }) => {
  const defaultNavItems = [
    { name: '珥덈벑?낇븰?덈궡', path: '/about/admission' },
    { name: '以묐벑?낇븰?덈궡', path: '/about/admission/middle' },
    { name: '?낇븰?곷떞', path: '/about/admission/qna' },
  ]
  const navItems = propNavItems || defaultNavItems;

  const steps = [
    { icon: <FileText />, title: '?먯꽌 ?묒닔', desc: '?덊럹?댁? ?먮뒗 諛⑸Ц ?묒닔' },
    { icon: <Calendar />, title: '?낇븰 ?꾪삎', desc: '?쒕쪟 ?ъ궗 諛?硫댁젒 ?꾪삎' },
    { icon: <CheckCircle />, title: '?⑷꺽 諛쒗몴', desc: '媛쒕퀎 ?듬낫 諛??덊럹?댁? 怨듭?' },
    { icon: <Info />, title: '?깅줉 ?덈궡', desc: '?낇븰 ?깅줉 諛??ㅻ━?뷀뀒?댁뀡' },
  ]

  const isMiddle = subCategory.includes('以묐벑');

  return (
    <SubPageLayout 
      mainCategory="?낇븰?덈궡" 
      subCategory={subCategory} 
      navItems={navItems}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-lg mb-4 tracking-widest uppercase">Admission Guide</h2>
          <h3 className="text-4xl font-bold text-gray-800">TJSCHOOL {subCategory} ?덉감 ?덈궡</h3>
          <p className="mt-4 text-gray-500">湲濡쒕쾶 ?몄옱瑜??ν븳 泥?嫄몄쓬, TJSCHOOL怨??④퍡?섏꽭??</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-gray-500 text-sm">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gray-100" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-[40px] p-12 border border-gray-100">
          <h4 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-secondary pl-6">紐⑥쭛 ?붽컯</h4>
          <div className="space-y-6">
            <div className="flex bg-white p-6 rounded-2xl shadow-sm items-center justify-between">
              <span className="font-bold text-gray-700">紐⑥쭛 ???/span>
              <span className="text-gray-600">
                {isMiddle ? '以묓븰援?1?숇뀈 ~ 3?숇뀈' : '珥덈벑?숆탳 1?숇뀈 ~ 6?숇뀈'}
              </span>
            </div>
            <div className="flex bg-white p-6 rounded-2xl shadow-sm items-center justify-between">
              <span className="font-bold text-gray-700">?꾪삎 諛⑸쾿</span>
              <span className="text-gray-600">?쒕쪟?꾪삎 50% + ?숈깮 硫댁젒 50%</span>
            </div>
            <div className="flex bg-white p-6 rounded-2xl shadow-sm items-center justify-between">
              <span className="font-bold text-gray-700">?쒖텧 ?쒕쪟</span>
              <span className="text-gray-600">?낇븰?먯꽌, 二쇰??깅줉?깅낯, ?앺솢湲곕줉遺 ?щ낯</span>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default AdmissionPage

