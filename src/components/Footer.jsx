'use client';
import React from 'react'
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/logo.png" alt="TJSCHOOL Logo" className="w-12 h-12 object-contain" />
              <span className="text-2xl font-black text-white tracking-tighter">TJSCHOOL</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              하나님의 사랑으로 꿈을 키우고<br />
              세상을 변화시키는 글로벌 리더들의 배움터
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"><Instagram size={18} /></button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"><Facebook size={18} /></button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"><Youtube size={18} /></button>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-bold">Quick Links</h4>
            <ul className="space-y-4">
              {['학교소개', '입학안내', '교육과정', '학교생활', '커뮤니티'].map((item) => (
                <li key={item}><Link href="#" className="text-gray-400 hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-bold">Contact Us</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              기독교 정신을 바탕으로 글로벌 캠퍼스 인재를 양성하는 TJSCHOOL입니다. 
              세상을 변화시키는 창의적이고 따뜻한 리더를 키웁니다.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} className="text-primary" />
                <span className="text-sm">서울특별시 강남구 테헤란로 (TJSCHOOL 캠퍼스)</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} className="text-primary" />
                <span className="text-sm">02-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} className="text-primary" />
                <span className="text-sm">info@tjschool.or.kr</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-bold">Newsletter</h4>
            <p className="text-gray-400">학교의 최신 소식을 이메일로 받아보세요.</p>
            <div className="flex">
              <input type="text" placeholder="Email Address" className="bg-white/5 border-none px-6 py-4 rounded-l-2xl outline-none w-full" />
              <button className="bg-primary px-6 py-4 rounded-r-2xl font-bold">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">© 2026 TJSCHOOL. All rights reserved.</p>
          <div className="flex space-x-8 text-sm text-gray-500">
            <button className="hover:text-white transition-colors">이용약관</button>
            <button className="hover:text-white transition-colors font-bold text-primary">개인정보처리방침</button>
            <button className="hover:text-white transition-colors">이메일무단수집거부</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
