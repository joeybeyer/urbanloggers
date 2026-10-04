import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileCTA } from '@/components/ui/MobileCTA'
import { GclidCapture } from '@/components/GclidCapture'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Urban Loggers LLC | Tree Service Milwaukee, WI',
    template: '%s | Urban Loggers LLC',
  },
  description:
    'Professional tree removal, trimming, stump grinding, and emergency tree service in Greater Milwaukee, WI. 20+ years experience. Call (414) 240-4626.',
  metadataBase: new URL('https://urbanloggers.org'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The site-wide LocalBusiness used to live here. It cannot: this layout wraps every page and has
  // no way to know which profile serves the page, so it always emitted the service-area NAP. On
  // /waukesha/ and /menomonee-falls/ that put TWO LocalBusiness entities on one page carrying two
  // different phone numbers — the opposite of the NAP consistency the markup exists to provide.
  //
  // Each page now emits the LocalBusiness for the profile serving it: the 16 city pages and the
  // homepage below. Service pages emit Service schema instead, which is the correct type for them.
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5KHHBRTP');`,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5KHHBRTP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <GclidCapture />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  )
}
