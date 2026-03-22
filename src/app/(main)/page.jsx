import Header from '@/components/Header'
import HeroSlider from '@/components/HeroSlider'
import InfoSection from '@/components/InfoSection'
import AdmissionSection from '@/components/AdmissionSection'
import ActivityGallery from '@/components/ActivityGallery'
import NoticeCalendar from '@/components/NoticeCalendar'
import QuickMenu from '@/components/QuickMenu'
import Footer from '@/components/Footer'
import Popup from '@/components/Popup'

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <InfoSection />
      <AdmissionSection />
      <ActivityGallery />
      <NoticeCalendar />
    </main>
  )
}
