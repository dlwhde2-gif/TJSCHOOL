import './globals.css'
import ApiWrapper from '@/components/ApiWrapper'

export const metadata = {
  title: 'TJSCHOOL',
  description: '기독교 정신을 바탕으로 글로벌 캠퍼스 인재를 양성하는 TJSCHOOL입니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased text-gray-900 bg-white selection:bg-secondary selection:text-primary overflow-x-hidden">
        <ApiWrapper>
          {children}
        </ApiWrapper>
      </body>
    </html>
  )
}
