import React, { useState, useEffect } from 'react'
// import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

import styles from '../styles/Explore.module.css'
import Link from 'next/link'
import Layout from '../component/Layout'

function Explore() {
    const [feedData, setFeedData] = useState(null)

    useEffect(() => {
        // fetchFeed()
    }, [])

    async function fetchFeed() {
        const success = await supabase
                    .from('post')
                    .select(
                        '*,organization(*))'
                    )

                if (success) {
                    console.log(success.data)
                    setFeedData(success.data)
                }
    }

    return (
        <>
            <Layout>
            </Layout>
        </>
    )
}


export default Explore