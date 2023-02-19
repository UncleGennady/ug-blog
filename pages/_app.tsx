import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from "next/head";
import Layout from "@/components/layout";
import { Raleway } from '@next/font/google'

export const raleway = Raleway({
    weight: ['400','600','700'],
    style:["normal"],
    subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (<>
        <Head>
          <link rel="icon" href="/ug_logo.png" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
  )
}
