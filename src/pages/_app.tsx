import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@styles/globals.css'
import Layout from '@components/Layout'
import { display, sans, oswald } from '@styles/fonts'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${sans.variable} ${oswald.variable}`}>
      <Head>
        <link rel="icon" href="/images/music1.jpg" />
        <link rel="shortcut icon" href="/images/music1.jpg" />
        <link rel="apple-touch-icon" href="/images/music1.jpg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
