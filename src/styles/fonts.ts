import { Bebas_Neue, Inter, Oswald } from 'next/font/google'

export const display = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
})

export const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-oswald',
})
