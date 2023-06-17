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
import { faCheckCircle, faArrowRight , faCirclePlus, faListCheck} from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay, faCircle, faFileLines, faFileCode } from "@fortawesome/free-regular-svg-icons";
import Button from '@/component/Button';
import Loader from '@/component/Loader';

function CourseOverview() {
    const supabase = useSupabaseClient()
    const user = useUser()

    const router = useRouter();
    const {cid} = router.query;

    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState(null)
    const [overview, setOverview] = useState(null)
    const [userEnrollment, setUserEnrollment] = useState(null)
    const [userAllEnrollment, setUserAllEnrollment] = useState(null)
    const [recommendation, setRecommendation] = useState(null)

    useEffect(() => {
        fetchData()
        console.log(cid)
    }, [])

    useEffect(() => {
        console.log("test")
        fetchUserData()
    }, [user])

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
            
                if (error && status !== 406) {
                    throw error
                }
            
                if (data) {
                    const test= data.map(element => element.course_id);
                    console.log(test,"test")
                    setUserEnrollment(test)
                    setUserAllEnrollment(data)
                    data.forEach(entry=>{
                        if(entry.course_id == cid)
                            setRecommendation(entry.recommendation)
                    })
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

    async function addCourse(id) {
        try {
            setLoading(true)
            const query = {
                user_id: user.id,
                course_id: id,
                progress: [],
                completed: false,
            }
            console.log(query)

            const queer = {
                student_id: user.id,
                course_id: id,
                current_state: [0,0,0,0,0,0],
                next_state: [0,0,0,0,0,0],
            }

            var { error } = await supabase
            .from('user_enrollment')
            .insert(query)

            if (error) throw error

            var { error } = await supabase
            .from('state')
            .insert(queer)

            if (error) throw error
      
          } catch (error) {
            // alert('Error loading user data!')
            console.log(error)
          } finally {
            setLoading(false)
            router.reload(window.location.pathname)
          }
    }

    if(content && overview && userEnrollment)
    return (
        <>
            <Layout>
                <div className={styles.main}>
                    
                    <div className={styles.banner}>
                        <h1>{content.course_name} 
                        {   userEnrollment.includes(content.course_id)?
                                userAllEnrollment.find(x => x.course_id === content.course_id).completed == true?
                                    <FontAwesomeIcon icon={faCheckCircle}  style={{color:'green', marginLeft:'20px'}}/>
                                        :
                                    <FontAwesomeIcon icon={faListCheck}  style={{color:'gray', marginLeft:'20px'}}/>
                                :
                                ""
                                
                        }
                        </h1>
                        <div className={styles.iconset}>
                            <div><FontAwesomeIcon icon={faFileLines} /> {content.details.documents} Documents</div>
                            <div><FontAwesomeIcon icon={faCirclePlay}/> {content.details.videos} Videos</div>
                            <div><FontAwesomeIcon icon={faFileCode}/> {content.details.questions} Questions</div>
                        </div>
                        {
                            userAllEnrollment!=null && userAllEnrollment.find(x => x.course_id === content.course_id)?
                            <div style={{margin:'10px 10px'}}>Completed  { userAllEnrollment.find(x => x.course_id === content.course_id).progress.length}/{content.modules.length}  Chapters</div>
                            :
                            ""
                        }
                        {
                            userEnrollment.includes(content.course_id)?
                                <div style={{display:'flex'}}>
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
                                    <Link href={{pathname:'/course/'+content.course_id+'/report'}}>
                                        <Button  buttonStyle="btn_outline" buttonSize="btn_small" link='#' >
                                            <div style={{display:'flex', alignItems:'center'}}>
                                                <p style={{marginRight:'10px'}}>View Report</p><FontAwesomeIcon icon={faArrowRight}/>
                                            </div>
                                        </Button>
                                    </Link>
                                </div>

                            :
                                <Button  buttonStyle="btn_outline" buttonSize="btn_small" link='#' onClick={()=>{addCourse(content.course_id)}}>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <p style={{marginRight:'10px'}}>Add To Courses</p><FontAwesomeIcon icon={faCirclePlus}/>
                                    </div>
                                </Button>
                        }
                    </div>
                    <div className={styles.desc}>
                        {
                            recommendation?
                            <div>
                                <h1>Recommendation</h1>
                                <Link href={{pathname:'/course/'+content.course_id+'/learn'}}>
                                    <Button  buttonStyle="btn_outline" buttonSize="btn_small" link='#' >
                                        <div style={{display:'flex', alignItems:'center'}}>
                                            <p style={{marginRight:'10px'}}>{content.modules[recommendation].title}</p><FontAwesomeIcon icon={faArrowRight}/>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                            :
                            ""
                        }
                        
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