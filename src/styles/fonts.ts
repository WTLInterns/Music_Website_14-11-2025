import { Bebas_Neue, Inter } from 'next/font/google'

export const display = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
})

export const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})
