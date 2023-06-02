import Head from 'next/head'

import Auth from '../component/Auth'

export default function Home() {

  return (
    <div>
      <Head>
            <title>LearnIT</title>
            <meta name="description" content="Created by Utkarsh Singh" />
            <link rel="icon" href="/favicon.jpg" />
        </Head>

      <main>
          <Auth />
      </main>

    </div>
  )
}
