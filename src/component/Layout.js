import React, { useState, useEffect } from 'react';
import Script from 'next/script'
// import Navbar from './Navbar';
import styles from '@/styles/Layout.module.css'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import("./Navbar"), {
ssr: false,
});

function Layout({children,user}) {

    return (
        <>
        <Head>
            <title>LearnIT</title>
            <meta name="description" content="Created by Utkarsh Singh" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main style={{display:'flex',width:'100vw'}}>
            <Navbar/>
            <div className={styles.children}>
                {children}
            </div>      
        </main>
        </>
    )
}

export default Layout
