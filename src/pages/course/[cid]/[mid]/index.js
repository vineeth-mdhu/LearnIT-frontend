import React, { useState, useEffect } from 'react'
// import { supabase } from '../../utils/supabaseClient'
import Markdown from "markdown-to-jsx"
import Code from '@/component/Code';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

import styles from '@/styles/CourseLearn.module.css'
import Link from 'next/link'
import Layout from '@/component/Layout'
import Sidebar from '@/component/Sidebar';

import cpp from '@/courses/cpp/content.js'
import test from '@/courses/test.md'
import module1 from '@/courses/cpp/module1';
import module2 from '@/courses/cpp/module2';
import module3 from '@/courses/cpp/module3';
import module5 from '@/courses/cpp/module5';
import Button from '@/component/Button';


function CourseLearn() {
    const [sidebarToogle, setSidebarToogle] = useState(false)
    var modules = [module1,module2,module3,module5]

    const toogleSidebar = ()=>{
        setSidebarToogle(!sidebarToogle)
    }

    const [profileData,setProfileData]=useState(null)

    const router = useRouter();
    const {cid, mid} = router.query;

    useEffect(() => {
        // fetchData()
        console.log(cid,mid)
    }, [cid])

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

    if(mid && cid )
    return (
        <>
            
            <Layout>
                <div className={styles.main}>
                    <div className={sidebarToogle?styles.sidebar+' '+styles.sidebar_show:styles.sidebar+' '+styles.sidebar_hide}>
                        <Sidebar content={cpp} selected={mid}/>
                    </div>
                    <div className={styles.container}>
                        <h1 style={{marginBottom:'20px', textDecoration: 'underline'}}>{cpp[mid].title}</h1>
                        {
                            cpp[mid].type=='text'?
                            <div style={{width:'100%'}}>
                                {modules[cpp[mid].content]}
                            </div>
                            :
                            cpp[mid].type=='video'?
                            <div>
                                <iframe width="560" height="315" src={cpp[mid].content} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                            :
                            cpp[mid].type=='quiz'?
                            'quiz'
                            :''
                        }
                        <Markdown options={{
                            overrides: {
                            Code: {
                                component: Code
                            }
                            }
                        }} style={{width:'100%'}}>
                            {test}
                        </Markdown>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Button  buttonStyle="btn_primary" buttonSize="btn_small" link='#' >
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <p style={{marginRight:'10px'}}>Mark As Complete</p><FontAwesomeIcon icon={faCheckCircle}/>
                                </div>
                            </Button>
                            <Button  buttonStyle="btn_outline" buttonSize="btn_small" link='#' >
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <p style={{marginRight:'10px'}}>Next</p><FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                </div>
                            </Button>
                        </div>
                    </div> 
                    
                </div>
            </Layout>
        </>
    )
}


export default CourseLearn