import React, { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../component/Layout'
import CourseCard from '@/component/CourseCard';
import Footer from '@/component/Footer';
import Loader from '@/component/Loader';
function Home() {
    const user = useUser()
    const supabase = useSupabaseClient()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log("test")
        fetchUserData()
    }, [user])

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
                    console.log(data,"test")
                    setData(data)
                }
                } catch (error) {
                // alert('Error loading user data!')
                    console.log(error)
                } finally {
                setLoading(false)
            }
        }
        
    }

    if(data){
        var courses = [...data].map((item,index)=>{return(
            <CourseCard
                // badge='Sale-50%'
                label='Beginner'
                src={item.courses.banner}
                course_id={item.courses.course_id}
                category='Programming'
                title={item.courses.course_name}
                detail={item.courses.desc}
                key={index}
            />
        )})
    }

    if(!loading && data)
    return (
        <>
            <Layout>
                <div className={styles.main}>
                    <h2>My Courses</h2>
                    <div className={styles.course_display}>
                        {courses}
                    </div>
                    <Footer/>
                </div>
            </Layout>

        </>
    )
    else
    return(
        <Layout>
            <Loader/>
        </Layout>
    )
    
}

export default Home