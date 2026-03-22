'use client';
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SubNav = ({ navItems }) => {
  const pathname = usePathname()

  if (!navItems || navItems.length === 0) return null

  return (
    <div className="sticky top-[72px] z-40 bg-gray-50/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
        <ul className="flex justify-center whitespace-nowrap min-w-max">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className={`px-8 py-5 block text-sm font-bold transition-all relative ${
                    isActive 
                    ? 'text-primary' 
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SubNav
