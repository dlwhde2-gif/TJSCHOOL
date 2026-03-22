'use client'
import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import QuickMenu from '@/components/QuickMenu'
import Popup from '@/components/Popup'

export default function MainLayout({ children }) {
  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col pt-[72px]">
      <Header />
      <QuickMenu />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
      <Popup />
    </div>
  )
}
