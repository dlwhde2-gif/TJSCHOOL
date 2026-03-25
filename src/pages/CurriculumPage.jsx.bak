import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { BookOpen, Globe, Cpu, Palette } from 'lucide-react'

const CurriculumPage = ({ mainCategory, subCategory, navItems }) => {
  const modules = [
    { 
      icon: <BookOpen />, 
      title: '?¬í™” êµê³¼ê³¼ì •', 
      desc: 'ê¸°ì´ˆ ?™ë¬¸??ê¹Šì´ë¥??”í•˜??? ë¡ ???˜ì—…ê³?ë§ì¶¤??ì§€??, 
      tags: ['êµ?–´', '?˜í•™', '?¬íšŒ', 'ê³¼í•™'] 
    },
    { 
      icon: <Globe />, 
      title: 'ê¸€ë¡œë²Œ ?¸ì–´', 
      desc: '?ì–´ë¯?êµì‚¬?€ ?¨ê»˜?˜ëŠ” 100% ?ì–´ ?˜ê²½ ë°????¸êµ­???µë“', 
      tags: ['English', 'Chinese', 'Coding'] 
    },
    { 
      icon: <Cpu />, 
      title: 'IT & ì½”ë”©', 
      desc: 'ë¯¸ë˜ ?¬íšŒë¥?ì£¼ë„???¼ë¦¬???¬ê³ ?€ ?„ë¡œê·¸ë˜ë°??¥ë ¥ ?¨ì–‘', 
      tags: ['Python', 'Robotics', 'AI'] 
    },
    { 
      icon: <Palette />, 
      title: 'ì°½ì˜ ?ˆìˆ ', 
      desc: 'ê°ì„±???ê·¹?˜ëŠ” ?Œì•…, ë¯¸ìˆ , ì²´ìœ¡ ?µí•© ?ˆìˆ  êµìœ¡', 
      tags: ['Art', 'Music', 'Sports'] 
    },
  ]

  return (
    <SubPageLayout mainCategory={mainCategory} subCategory={subCategory} navItems={navItems}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((m, i) => (
            <div key={i} className="flex gap-8 p-10 bg-white border border-gray-100 rounded-[32px] hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="shrink-0 w-20 h-20 bg-primary/5 rounded-[20px] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                {m.icon}
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-gray-800">{m.title}</h4>
                <p className="text-gray-500 leading-relaxed font-medium">{m.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {m.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full text-xs font-bold group-hover:bg-secondary/20 group-hover:text-primary transition-all">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-gray-900 rounded-[40px] text-white relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-secondary font-bold mb-2">Detailed Curriculum</h4>
              <p className="text-3xl font-bold">?™ë…„ë³??ì„¸ êµìœ¡ ê³„íš???¤ìš´ë¡œë“œ</p>
            </div>
            <button className="px-12 py-5 bg-white text-gray-900 rounded-2xl font-black hover:bg-secondary hover:text-primary transition-all whitespace-nowrap">
              PDF ?¤ìš´ë¡œë“œ
            </button>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default CurriculumPage
