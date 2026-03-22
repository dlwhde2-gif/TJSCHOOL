'use client';
import React from 'react'
import SubHero from './SubHero'
import SubNav from './SubNav'
import { motion } from 'framer-motion'

const SubPageLayout = ({ children, mainCategory, subCategory, navItems }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <SubHero mainCategory={mainCategory} subCategory={subCategory} />
      <SubNav navItems={navItems} />
      
      <main className="flex-1 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-20"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}

export default SubPageLayout
