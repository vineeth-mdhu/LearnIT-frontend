import React, { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
import Markdown from "markdown-to-jsx"
import Code from '@/component/Code';

import styles from '@/styles/CourseOverview.module.css'
import Link from 'next/link'
import Layout from '@/component/Layout'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay, faCircle, faFileLines, faFileCode } from "@fortawesome/free-regular-svg-icons";
import Button from '@/component/Button';

function CourseOverview() {
    const supabase = useSupabaseClient()
    const user = useUser()

    const router = useRouter();
    const {cid} = router.query;
    const mid = 0;

    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)
    const [overview, setOverview] = useState(null)

    useEffect(() => {
        fetchData()
        console.log(cid,mid)
    }, [cid])

    useEffect(() => {
        fetchOverview()
    }, [content])

    async function fetchData() {
        try {
            setLoading(true)
      
            let { data, error, status } = await supabase
            .from('courses')
            .select('*')
            .eq('course_id', 1)
      
            if (error && status !== 406) {
              throw error
            }
      
            if (data) {
                console.log(data)
                setContent(data[0])
            }
          } catch (error) {
            alert('Error loading user data!')
            console.log(error)
          } finally {
            setLoading(false)
          }
    }

    async function fetchOverview() {
        if(content)
            try {
                setLoading(true)
          
                fetch(content.overview).then((response) => response.text()).then((text) => {
                    setOverview(text)
                  })
          
              } catch (error) {
                alert('Error loading user data!')
                console.log(error)
              } finally {
                setLoading(false)
              }
    }

    if(content && overview)
    return (
        <>
            <Layout>
                <div className={styles.main}>
                    
                    <div className={styles.banner}>
                        <h1>{content.course_name} <FontAwesomeIcon icon={faCheckCircle}  style={{color:'green'}}/></h1>
                        <div className={styles.iconset}>
                            <div><FontAwesomeIcon icon={faFileLines} /> 75 Documents</div>
                            <div><FontAwesomeIcon icon={faCirclePlay}/> 10 Videos</div>
                            <div><FontAwesomeIcon icon={faFileCode}/> 100 Questions</div>
                        </div>
                        <Link href='/course/cpp/1'>
                            <Button  buttonStyle="btn_outline" buttonSize="btn_small" link='#' >
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <p style={{marginRight:'10px'}}>Start Learning</p><FontAwesomeIcon icon={faArrowRight}/>
                                </div>
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.desc}>
                        <Markdown options={{
                            overrides: {
                            Code: {
                                component: Code
                            }
                            }
                        }} style={{width:'100%'}}>
                            {overview}
                        </Markdown>
                    </div>
                </div>
            </Layout>
        </>
    )
    else
    return(
        <>
            <div>
                loading...
            </div>
        </>
    )
}


export default CourseOverview