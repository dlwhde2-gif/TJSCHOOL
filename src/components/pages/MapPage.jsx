import React from 'react'
import SubPageLayout from '@/components/SubPageLayout'
import { MapPin, Phone, Mail, Clock, Bus, Train } from 'lucide-react'

const MapPage = () => {
  const navItems = [
    { name: '?몄궗留?, path: '/about/greetings' },
    { name: '援먯쑁紐⑺몴', path: '/about/goals' },
    { name: '?숆탳?고쁺', path: '/about/history' },
    { name: '?ㅼ떆??湲?, path: '/about/map' },
  ]

  return (
    <SubPageLayout 
      mainCategory="?숆탳?뚭컻" 
      subCategory="?ㅼ떆??湲? 
      navItems={navItems}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-lg mb-4 tracking-widest uppercase">Location</h2>
          <h3 className="text-4xl font-bold text-gray-800">TJSCHOOL 罹좏띁???ㅼ떆??湲?/h3>
        </div>

        <div className="bg-gray-200 rounded-[40px] h-[450px] mb-12 overflow-hidden shadow-inner grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.7!2d126.8!3d37.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e0d!2z6rCc7Y-s6rWQ7ZqM!5e0!3m2!1sko!2skr!4v1" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">?곕씫泥?諛?二쇱냼</h4>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-1">罹좏띁???꾩튂</p>
                <p className="text-gray-500">?쒖슱?밸퀎???묒쿇援?TJSCHOOL 罹좏띁??鍮뚮뵫 4痢?/p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-1">???踰덊샇</p>
                <p className="text-gray-500">02-1234-5678</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">援먰넻 ?덈궡</h4>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                <Bus size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-1">踰꾩뒪 ?댁슜 ??/p>
                <p className="text-gray-500">TJSCHOOL?????섏감 (123踰? 456踰? 789踰?</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                <Train size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-1">吏?섏쿋 ?댁슜 ??/p>
                <p className="text-gray-500">5?몄꽑 TJSCHOOL??3踰?異쒓뎄?먯꽌 ?꾨낫 5遺?/p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

export default MapPage

