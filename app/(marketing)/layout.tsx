import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { getRanges } from '@/lib/data'

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const ranges = await getRanges()
  return (
    <>
      <Header />
      <main className="flex-1 pt-17">{children}</main>
      <Footer ranges={ranges} />
      <WhatsAppButton />
    </>
  )
}
