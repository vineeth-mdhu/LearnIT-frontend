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

import Button from '@/component/Button';
import Loader from '@/component/Loader';


function CourseLearn() {
    const [sidebarToogle, setSidebarToogle] = useState(false)
    const supabase = useSupabaseClient()
    const user = useUser()

    const toogleSidebar = ()=>{
        setSidebarToogle(!sidebarToogle)
    }

    const [data,setData]=useState(null)
    const [loading, setLoading] = useState(true)
    const [mid, setMid] = useState(null)
    const [module,setModule]=useState("")
    const [userEnrollment, setUserEnrollment] = useState(null)

    const router = useRouter();
    const {cid} = router.query;

    useEffect(() => {
        fetchData()
        fetchUserData()
    }, [])

    useEffect(() => {
        fetchData()
        // fetchModule()
        console.log(cid,mid)
    }, [cid])

    useEffect(() => {
        console.log("test")
        fetchUserData()
    }, [user])

    useEffect(() => {
        fetchModule()
    }, [mid])

    var updateMid = (i) => {
        setLoading(true)
        setMid(i)
        setLoading(false)
    }

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

    async function fetchUserData() {
        if(user)
        {
            try {
                setLoading(true)
                console.log(user)
    
                let { data, error, status } = await supabase
                .from('user_enrollment')
                .select('*, courses ( * )')
                .eq('user_id',user.id)
                .eq('course_id', cid)
            
                if (error && status !== 406) {
                    throw error
                }
            
                if (data) {
                    console.log(data[0],"user enroll")
                    const test= data.map(element => element.course_id);
                    setUserEnrollment(data[0])
                }
                } catch (error) {
                // alert('Error loading user data!')
                    console.log(error)
                } finally {
                setLoading(false)
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
                    setMid(0)
                }
              } catch (error) {
                // alert('Error loading user data!')
                console.log(error)
              } finally {
                setLoading(false)
              }
        }
    }

    async function updateProgress() {
        try {
            setLoading(true)
            var newProgress = userEnrollment.progress
            newProgress.push(mid)

            const { error } = await supabase
            .from('user_enrollment')
            .update({progress: newProgress})
            .eq('enroll_id',userEnrollment.enroll_id)

            if (error) throw error
      
          } catch (error) {
            // alert('Error loading user data!')
            console.log(error)
          } finally {
            setLoading(false)
            // router.reload(window.location.pathname)
          }
    }

    if( cid && data && !loading && userEnrollment)
    return (
        <>
            
            <Layout>
                <div className={styles.main}>
                    <div className={sidebarToogle?styles.sidebar+' '+styles.sidebar_show:styles.sidebar+' '+styles.sidebar_hide}>
                        <Sidebar user_enrollment={userEnrollment} content={data.modules} course_name={data.course_name} course={cid} selected={mid} update_mid={updateMid}/>
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
                            <Button  buttonStyle="btn_primary" buttonSize="btn_small" link='#' onClick={()=>{updateProgress()}}>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <p style={{marginRight:'10px'}}>Mark As Complete</p><FontAwesomeIcon icon={faCheckCircle}/>
                                </div>
                            </Button >
                            {
                                mid+1<data.modules.length?
                                <Button  buttonStyle="btn_outline" buttonSize="btn_small" link='#' onClick={()=>{setMid(mid + 1)}}>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <p style={{marginRight:'10px'}}>Next</p><FontAwesomeIcon icon={faArrowRight}/>
                                    </div>
                                </Button>
                                :""
                            }
                            
                        </div>
                    </div> 
                    
                </div>
            </Layout>
        </>
    )
    else if(cid && data && loading && userEnrollment)
        return(
            <Layout>
                <div className={styles.main}>
                    <div className={sidebarToogle?styles.sidebar+' '+styles.sidebar_show:styles.sidebar+' '+styles.sidebar_hide}>
                        <Sidebar user_enrollment={userEnrollment} content={data.modules} course={cid} selected={mid} update_mid={setMid}/>
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