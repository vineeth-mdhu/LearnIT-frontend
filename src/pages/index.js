import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import VideoSection from '@/component/Index/VideoSection'
import Features from '@/component/Index/Features'
import Footer from '@/component/Footer'
import Layout from '@/component/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>LearnIT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout skip_auth={true}>
        <div>
          <VideoSection/>
          <Features/>
          <Footer/>
        </div>
      </Layout>
    </>
  )
}
