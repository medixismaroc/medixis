import Image from 'next/image'

export const metadata = { title: 'Site en maintenance | Medixis', robots: { index: false } }

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <Image src="/img/logo.png" alt="Medixis" width={1200} height={988} className="h-28 w-auto" priority />
      <h1 className="mt-10 text-2xl font-bold text-ink">Site en cours de mise à jour</h1>
      <p className="mt-3 max-w-md text-muted">Nous revenons très vite. / We will be back shortly.</p>
    </div>
  )
}
