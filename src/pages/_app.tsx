import type { AppProps } from 'next/app'
import '@styles/globals.css'
import Layout from '@components/Layout'
import { display, sans } from '@styles/fonts'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
