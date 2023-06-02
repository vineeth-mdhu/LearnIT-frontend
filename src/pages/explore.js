import React, { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../component/Layout'
import CourseCard from '@/component/CourseCard';
import Footer from '@/component/Footer';
import Loader from '@/component/Loader';

function Explore() {
    const supabase = useSupabaseClient()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            setLoading(true)
      
            let { data, error, status } = await supabase
            .from('courses')
            .select('*')
      
            if (error && status !== 406) {
              throw error
            }
      
            if (data) {
                console.log(data)
                setData(data)
            }
          } catch (error) {
            alert('Error loading user data!')
            console.log(error)
          } finally {
            setLoading(false)
        }
    }

    if(data){
        var courses = [...data].map((item,index)=>{return(
                <CourseCard
                    // badge='Sale-50%'
                    label='Beginner'
                    src={item.banner}
                    course_id={item.course_id}
                    category='Programming'
                    title={item.course_name}
                    detail={item.desc}
                />
        )})
    }

    if(data)
    return (
        <>
            <Layout>
                <div className={styles.main}>
                    <h2>Explore All Courses</h2>
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

export default Explore