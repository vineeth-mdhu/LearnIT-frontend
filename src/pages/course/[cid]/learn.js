import React, { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Markdown from "markdown-to-jsx"
import Code from '@/component/Code';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

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
import Loader from '@/component/Loader';


function CourseLearn() {
    const [sidebarToogle, setSidebarToogle] = useState(false)
    var modules = [module1,module2,module3,module5]
    const supabase = useSupabaseClient()

    const toogleSidebar = ()=>{
        setSidebarToogle(!sidebarToogle)
    }

    const [data,setData]=useState(null)
    const [loading, setLoading] = useState(true)
    const [mid, setMid] = useState(0)
    const [module,setModule]=useState("")

    const router = useRouter();
    const {cid} = router.query;

    useEffect(() => {
        fetchData()
        // fetchModule()
        console.log(cid,mid)
    }, [cid])

    useEffect(() => {
        fetchModule()
    }, [mid])

    async function fetchModule() {
        if(data)
        {
            if(data.modules[mid].type == "text")
            {
                // console.log(data.modules[mid].content)
                try {
                    setLoading(true)
            
                    fetch(data.modules[mid].content).then((response) => response.text()).then((text) => {
                        setModule(text)
                    })
            
                } catch (error) {
                    // alert('Error loading user data!')
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        }
            
    }

    async function fetchData() {
        if(cid)
        {
            try {
                setLoading(true)
          
                let { data, error, status } = await supabase
                .from('courses')
                .select('*')
                .eq('course_id', cid)
          
                if (error && status !== 406) {
                  throw error
                }
          
                if (data) {
                    console.log(data[0])
                    setData(data[0])
                }
              } catch (error) {
                // alert('Error loading user data!')
                console.log(error)
              } finally {
                setLoading(false)
              }
        }
    }

    if( cid && data && !loading)
    return (
        <>
            
            <Layout>
                <div className={styles.main}>
                    <div className={sidebarToogle?styles.sidebar+' '+styles.sidebar_show:styles.sidebar+' '+styles.sidebar_hide}>
                        <Sidebar content={data.modules} course_name={data.course_name} course={cid} selected={mid} update_mid={setMid}/>
                    </div>
                    <div className={styles.container}>
                        <h1 style={{marginBottom:'20px', textDecoration: 'underline'}}>{data.modules[mid].title}</h1>
                        {
                            data.modules[mid].type=='text'?
                            <div style={{width:'100%'}}>
                                <Markdown options={{
                                    overrides: {
                                    Code: {
                                        component: Code
                                    }
                                    }
                                }} style={{width:'100%'}}>
                                    {module}
                                </Markdown>
                            </div>
                            :
                            data.modules[mid].type=='video'?
                            <div>
                                <iframe width="560" height="315" src={data.modules[mid].content} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                            :
                            data.modules[mid].type=='quiz'?
                            'quiz'
                            :''
                        }
                        
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Button  buttonStyle="btn_primary" buttonSize="btn_small" link='#' >
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <p style={{marginRight:'10px'}}>Mark As Complete</p><FontAwesomeIcon icon={faCheckCircle}/>
                                </div>
                            </Button>
                            <Button  buttonStyle="btn_outline" buttonSize="btn_small" link='#' >
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <p style={{marginRight:'10px'}}>Next</p><FontAwesomeIcon icon={faArrowRight}/>
                                </div>
                            </Button>
                        </div>
                    </div> 
                    
                </div>
            </Layout>
        </>
    )
    else if(cid && data && loading)
        return(
            <Layout>
                <div className={styles.main}>
                    <div className={sidebarToogle?styles.sidebar+' '+styles.sidebar_show:styles.sidebar+' '+styles.sidebar_hide}>
                        <Sidebar content={data.modules} course={cid} selected={mid} update_mid={setMid}/>
                    </div>
                    <div className={styles.container}>
                        <Loader/>
                    </div> 
                    
                </div>
            </Layout>
        )
    else
    return(
        <Layout>
            <Loader/>
        </Layout>
    )
}


export default CourseLearn