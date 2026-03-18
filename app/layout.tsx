import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { localBusinessSchema } from '@/lib/schema'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Urban Loggers LLC | Tree Service Milwaukee, WI',
    template: '%s | Urban Loggers LLC',
  },
  description:
    'Professional tree removal, trimming, stump grinding, and emergency tree service in Greater Milwaukee, WI. 20+ years experience. Call (414) 514-0750.',
  metadataBase: new URL('https://urbanloggers.org'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schema = localBusinessSchema()

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
