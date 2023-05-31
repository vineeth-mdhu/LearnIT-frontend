import React, { useState, useEffect } from 'react'
// import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

import styles from '../../styles/Course.module.css'
import Link from 'next/link'
import Layout from '../../component/Layout'

function Course() {

    const [profileData,setProfileData]=useState(null)

    const router = useRouter();
    const { oid } = router.query;

    useEffect(() => {
        // fetchData()
    }, [oid])

    async function fetchData() {
            try {
                const { data, error } = await supabase.from('organization').select('*,post(*,organization(*))').eq('id', oid)

                if (data) {
                    console.log(data[0])
                    setProfileData(data[0])
                }

            } catch (error) {
                alert(error.message)
            }
    }
    // if(profileData)
    return (
        <>
            <Layout>
                <div>
                    
                </div>
            </Layout>
        </>
    )
}


export default Course