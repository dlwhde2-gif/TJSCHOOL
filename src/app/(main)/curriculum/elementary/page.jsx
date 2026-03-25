'use client';
import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { BookOpen, Star, Sun, Heart, CheckCircle2, Award, Zap, Smile } from 'lucide-react'

export default function ElementaryPage() {
  const navItems = [
    { name: '초등과정', path: '/curriculum/elementary' },
    { name: '중등과정', path: '/curriculum/middle' },
    { name: '언어/방과후', path: '/curriculum/language' },
  ]

  const coreCurriculum = [
    { 
      title: '기초다지기 (1~2학년)', 
      focus: '학습 습관 형성 및 기초 문해력/수리력 배양',
      items: ['바른 생활 습관 형성', '독서의 즐거움 깨닫기', '놀이 중심 교과 학습']
    },
    { 
      title: '역량키우기 (3~4학년)', 
      focus: '자율적 학습 능력 배양 및 창의적 문제 해결력 강화',
      items: ['교과별 핵심 개념 이해', '탐구 중심 프로젝트 수업', '다양한 체험 학습 확대']
    },
    { 
      title: '꿈 펼치기 (5~6학년)', 
      focus: '비판적 사고력 고찰 및 진로 탐색을 통한 글로벌 리더십',
      items: ['심화 주제 탐구 활동', '자기 주도적 학습 완성', '중등 연계 대비 교육']
    }
  ]

  const highlights = [
    { 
      title: '신앙 및 인성 교육', 
      desc: '기독교적 가치관을 바탕으로 올바른 인성을 갖춘 리더를 양성합니다.',
      icon: <Heart className="text-red-500" />
    },
    { 
      title: '영어 몰입 교육', 
      desc: '원어민 교사와 함께하는 매일 2시간 이상의 영어 수업으로 의사소통 능력을 키웁니다.',
      icon: <Star className="text-secondary" />
    },
    { 
      title: '창의 코딩 & 과학', 
      desc: '미래 사회가 요구하는 컴퓨터 사고력과 과학적 탐구심을 자극합니다.',
      icon: <Zap className="text-yellow-500" />
    },
    { 
      title: '1인 1악기 교육', 
      desc: '악기 연주를 통해 예술적 감수성을 키우고 정서적 안정을 도모합니다.',
      icon: <Award className="text-blue-500" />
    }
  ]

  return (
    <SubPageLayout mainCategory="교육과정" subCategory="초등과정" navItems={navItems}>
      <div className="max-w-6xl mx-auto py-12">
        {/* Intro Section */}
        <div className="text-center mb-24 px-4">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/5 text-primary rounded-full text-sm font-bold mb-6">
            <BookOpen size={16} /> <span>Elementary Curriculum</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
            사랑과 실력을 겸비한<br />
            <span className="text-primary">TJSCHOOL 초등 교육</span>
          </h3>
          <p className="max-w-3xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
            국내 유일의 융합형 교육과정을 통해 학생들의 잠재력을 발견하고,<br />
            바른 인성과 탁월한 실력을 갖춘 미래 인재로 성장시킵니다.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
          {highlights.map((h, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8">
                {React.cloneElement(h.icon, { size: 36 })}
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">{h.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Grade-wise Curriculum Table/Cards */}
        <div className="mb-28">
          <h4 className="text-3xl font-black text-gray-900 mb-12 text-center">학년별 중점 교육과정</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {coreCurriculum.map((c, i) => (
              <div key={i} className="bg-white rounded-[48px] overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:border-primary/20 transition-all group">
                <div className="p-10 bg-gray-50 group-hover:bg-primary/5 transition-colors">
                  <span className="text-primary font-bold text-sm mb-4 block uppercase tracking-widest">Stage 0{i+1}</span>
                  <h5 className="text-2xl font-bold text-gray-900 mb-4">{c.title}</h5>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.focus}</p>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <div className="space-y-4">
                    {c.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-700 font-medium tracking-tight">
                        <CheckCircle2 size={18} className="text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-primary rounded-[50px] p-12 md:p-20 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-primary/20">
          <div className="relative z-10 text-center md:text-left mb-10 md:mb-0">
            <h4 className="text-3xl md:text-4xl font-black mb-6">궁금한 점이 있으신가요?</h4>
            <p className="text-white/70 text-lg mb-0 font-medium">상세 교육 계획 및 입학 문의는 행정실로 연락 주세요.</p>
          </div>
          <div className="relative z-10">
            <a href="/about/admission/qna" className="inline-block bg-secondary text-primary px-12 py-6 rounded-3xl font-black hover:scale-105 transition-all text-lg shadow-xl shadow-black/10">
              상담 신청하기
            </a>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
      </div>
    </SubPageLayout>
  )
}

