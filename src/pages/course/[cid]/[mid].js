import React, { useState, useEffect } from 'react'
// import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

import styles from '@/styles/CourseLearn.module.css'
import Link from 'next/link'
import Layout from '@/component/Layout'
import Sidebar from '@/component/Sidebar';

import cpp from '@/courses/cpp/content.js'
import module1 from '@/courses/cpp/module1';
import module2 from '@/courses/cpp/module2';
import module3 from '@/courses/cpp/module3';
import module5 from '@/courses/cpp/module5';


function CourseLearn() {
    const [sidebarToogle, setSidebarToogle] = useState(false)
    var modules = [module1,module2,module3,module5]

    const toogleSidebar = ()=>{
        setSidebarToogle(!sidebarToogle)
    }

    const [profileData,setProfileData]=useState(null)

    const router = useRouter();
    const {cid, mid } = router.query;

    useEffect(() => {
        // fetchData()
    }, [mid])

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

    if(cpp && mid)
    return (
        <>
            <Layout>
                <div className={styles.main}>
                    <div className={sidebarToogle?styles.sidebar+' '+styles.sidebar_show:styles.sidebar+' '+styles.sidebar_hide}>
                        <Sidebar content={cpp} selected={mid}/>
                    </div>
                    <div className={styles.container}>
                        {
                            cpp[mid].type=='text'?
                            <div>
                                {modules[cpp[mid].content]}
                            </div>
                            :
                            cpp[mid].type=='video'?
                            <iframe src={cpp[mid].content}/>
                            :
                            cpp[mid].type=='quiz'?
                            'quiz'
                            :''
                        }
                    </div> 
                </div>
            </Layout>
        </>
    )
}


export default CourseLearn