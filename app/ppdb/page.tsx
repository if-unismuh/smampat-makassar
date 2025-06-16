import ContactSection from "@/components/ppdb/contact-section"
import CTASection from "@/components/ppdb/cta-section"
import FAQ from "@/components/ppdb/faq"
import PPDHero from "@/components/ppdb/ppd-hero"
import RegistrationSteps from "@/components/ppdb/registration-steps"
import Requirements from "@/components/ppdb/requirements"
import Timeline from "@/components/ppdb/timeline"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Penerimaan Peserta Didik Baru - SMAM4 Makassar",
  description: "Informasi lengkap tentang penerimaan peserta didik baru di SMA Muhammadiyah 4 Makassar",
}

export default function PPDPage() {
  return (
    <main className="min-h-screen">
      <PPDHero />
      <div className="container mx-auto px-4 py-12 space-y-24">
        <Timeline />
        <Requirements />
        <RegistrationSteps />
        <FAQ />
        <ContactSection />
        <CTASection />
      </div>
    </main>
  )
}
