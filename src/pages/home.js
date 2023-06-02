import React, { useState, useEffect } from 'react'
// import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../component/Layout'
import CourseCard from '@/component/CourseCard';
import Footer from '@/component/Footer';
// import Card from '../component/Card';

function Home() {
    const [profile, setProfile] = useState(null)
    const [type, setType] = useState(null)
    const [index, setIndex] = useState(0)
    const [feedData, setFeedData] = useState(null)

    useEffect(() => {
        // fetchProfile()
    }, [])

    useEffect(() => {
        // fetchData()
    }, [profile])

    useEffect(() => {
        // fetchFeed()
    }, [type])

    async function fetchProfile() {
        try {
            const profileData = await supabase.auth.user()

            if (profileData) {
                setProfile(profileData)
            }

        } catch (error) {
            alert(error.message)
        }
    }

    async function fetchData() {
        if (profile)
            try {
                const { data, error } = await supabase.from('type').select('*').eq('entity_id', profile.id)

                if (data) {
                    console.log(data[0].type)
                    setType(data[0].type)
                }

            } catch (error) {
                alert(error.message)
            }
    }

    async function fetchFeed() {
        if (profile && type) {
            if (type == "organization") {
                let aff = []
                try {
                    const { data, error } = await supabase.from('organization').select('*').eq('id', profile.id)

                    if (data) {
                        console.log('afflesi', data[0].affeliate_org)
                        aff = [...data[0].affeliate_org]
                        console.log(aff)
                        // setType(data[0].type)
                        try {
                            const { data, error } = await supabase.from('post').select('*,organization(*)').in('owner_id', aff)

                            if (data) {
                                console.log(data)
                                setFeedData(data)
                            }

                        } catch (error) {
                            console.log(error.message)
                        }
                    }

                } catch (error) {
                    console.log(error.message)
                }
            }
            else {
                const success = await supabase
                    .from('post_buffer')
                    .select(
                        'post(*,organization(*))'
                    )
                    .eq('user_id', profile.id)
                    .order('created_at', { ascending: false })

                    // setIndex(index+6)

                if (success) {
                    console.log(success.data)
                    setFeedData(success.data)
                }
            }
        }
    }
    
    return (
        <>
            <Layout>
                <div className={styles.main}>
                    <h2>My Courses</h2>
                    <div className={styles.course_display}>
                    <CourseCard
                        // badge='Sale-50%'
                        label='Beginner'
                        src='images/img-6.peg'
                        category='Programming'
                        title='C++'
                        detail=''
                    />
                    <CourseCard
                        // badge='Sale-50%'
                        label='Beginner'
                        src='images/img-6.jg'
                        category='Programming'
                        title='Python'
                        detail=''
                    />
                    <CourseCard
                        // badge='Sale-50%'
                        label='Beginner'
                        src='images/img-6.jpe'
                        category='Programming'
                        title='Computer Networks'
                        detail=''
                    />
                    </div>
                    <Footer/>
                </div>
            </Layout>

        </>
    )
    
}

export default Home