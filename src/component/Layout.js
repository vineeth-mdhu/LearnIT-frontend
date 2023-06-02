import React, { useState, useEffect } from 'react';
import Script from 'next/script'
// import Navbar from './Navbar';
import styles from '@/styles/Layout.module.css'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Auth from './Auth'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const Navbar = dynamic(() => import("./Navbar"), {
ssr: false,
});

function Layout({children,user,skip_auth}) {
    const session = useSession()
    const supabase = useSupabaseClient()

    if(!session && !skip_auth){
        return(
            <Auth />
        )
    }
    else{
        return (
            <>
            <Head>
                <title>LearnIT</title>
                <meta name="description" content="Created by Utkarsh Singh" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <main style={{display:'flex',width:'100vw'}}>
                <Navbar session={session}/>
                <div className={styles.children}>
                    {children}
                </div>      
            </main>
            </>
        )
    }
}

export default Layout
