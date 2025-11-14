import type { AppProps } from 'next/app'
import '@styles/globals.css'
import Layout from '@components/Layout'
import { display, sans, oswald } from '@styles/fonts'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${sans.variable} ${oswald.variable}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
