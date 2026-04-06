import React from "react"
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Tajawal, Noto_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/i18n/language-context'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});
const tajawal = Tajawal({ 
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal"
});
const notoArabic = Noto_Sans_Arabic({ 
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-arabic"
});

export const metadata: Metadata = {
  title: 'MAISON | Luxury Fashion',
  description: 'Discover timeless elegance and modern luxury. Curated collections of premium fashion for the discerning woman.',
  generator: 'SetaX',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${inter.variable} ${tajawal.variable} ${notoArabic.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
