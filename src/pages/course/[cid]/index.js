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
import { faCheckCircle, faArrowRight , faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay, faCircle, faFileLines, faFileCode } from "@fortawesome/free-regular-svg-icons";
import Button from '@/component/Button';
import Loader from '@/component/Loader';

function CourseOverview() {
    const supabase = useSupabaseClient()
    const user = useUser()

    const router = useRouter();
    const {cid} = router.query;

    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)
    const [overview, setOverview] = useState(null)

    useEffect(() => {
        fetchData()
        console.log(cid)
    }, [])

    useEffect(() => {
        fetchOverview()
    }, [content])

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
                    console.log(data)
                    setContent(data[0])
                }
              } catch (error) {
                // alert('Error loading user data!')
                console.log(error)
              } finally {
                setLoading(false)
              }
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
                // alert('Error loading user data!')
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
                            <div><FontAwesomeIcon icon={faFileLines} /> {content.details.documents} Documents</div>
                            <div><FontAwesomeIcon icon={faCirclePlay}/> {content.details.videos} Videos</div>
                            <div><FontAwesomeIcon icon={faFileCode}/> {content.details.questions} Questions</div>
                        </div>
                        <Link href={{pathname:'/course/'+content.course_id+'/learn'}}>
                            <Button  buttonStyle="btn_outline" buttonSize="btn_small" link='#' >
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <p style={{marginRight:'10px'}}>Start Learning</p><FontAwesomeIcon icon={faArrowRight}/>
                                </div>
                            </Button>
                        </Link>
                        <Link href={{pathname:'/course/'+content.course_id+'/evaluation'}}>
                            <Button  buttonStyle="btn_outline" buttonSize="btn_small" link='#' >
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <p style={{marginRight:'10px'}}>Take Test</p><FontAwesomeIcon icon={faArrowRight}/>
                                </div>
                            </Button>
                        </Link>
                        <Button  buttonStyle="btn_outline" buttonSize="btn_small" link='#' >
                            <div style={{display:'flex', alignItems:'center'}}>
                                <p style={{marginRight:'10px'}}>Add To Courses</p><FontAwesomeIcon icon={faCirclePlus}/>
                            </div>
                        </Button>
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
            <Layout>
                <Loader/>
            </Layout>
        </>
    )
}


export default CourseOverview