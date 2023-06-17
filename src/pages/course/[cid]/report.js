import Layout from '@/component/Layout'
import React, { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import styles from '@/styles/Report.module.css'

import LineChart from '@/component/LineChart'
import PolarChart from '@/component/PolarChart'
import DonutChart from '@/component/DonutChart'
import Loader from '@/component/Loader'

function Report() {
    // var chartData = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //     values: [10, 20, 15, 25, 30, 22]
    //   };

    // var polarChartData = {
    //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple','uda'],
    //   values: [12, 19, 3, 5, 2,10]
    // };

    // var donutChartData = {
    //   labels: ['Completed', 'Not Completed'],
    //   values: [12, 19]
    // };


  const supabase = useSupabaseClient()
  const user = useUser()

  const router = useRouter();
  const {cid} = router.query;

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [results, setResults] = useState(null)
  const [donut, setDonut] = useState(null)
  const [polar, setPolar] = useState(null)

  useEffect(() => {
    fetchData()
    console.log(cid)
  }, [])

  useEffect(() => {
    fetchData()
  }, [cid])

  async function fetchData() {
    if(cid)
    {
        try {
            setLoading(true)
      
            let { data, error, status } = await supabase
            .from('user_enrollment')
            .select('*, courses (*)')
            .eq('user_id',user.id)
            .eq('course_id',cid)
      
            if (error && status !== 406) {
              throw error
            }
      
            if (data) {
                console.log(data)
                setData(data[0])

                var chartData = {
                  labels: [],
                  values: []
                };

                data[0].results.forEach(element => {
                  chartData.labels.push(element.date)
                  chartData.values.push(element.score)
                });

                var donutChartData = {
                  labels: ['Completed', 'Not Completed'],
                  values: [data[0].progress.length,data[0].courses.modules.length-data[0].progress.length]
                }; 

                var PolarChartData = {
                  labels: data[0].courses.skills,
                  values: data[0].skill_state
                  // values: [0.1,0.4,0.73,0.43,0.8,0.35]
                };

                setResults(chartData)
                setDonut(donutChartData)
                setPolar(PolarChartData)
            }
          } catch (error) {
            // alert('Error loading user data!')
            console.log(error)
          } finally {
            setLoading(false)
          }
    }
}

    if(cid && results)
    return (
        <div>
            <Layout>
                <div className={styles.container}>
                  <div style={{flexGrow:'4'}}>
                    <h1 style={{marginLeft:'30px',marginBottom:'30px'}}>{data.courses.course_name} Report</h1>
                    <div className={styles.card}>
                      <h2>Score</h2>
                      <LineChart data={results} style={{width:'100%'}}/>
                    </div>
                  </div>
                  <div style={{flexGrow:'1'}}>
                    <div className={styles.card}>
                    <h3>Skills</h3>
                      <PolarChart data={polar}/>
                    </div>
                    <div className={styles.card}>
                      <h3>Chapters</h3>
                      <DonutChart data={donut} />
                    </div>
                  </div>
                </div>
            </Layout>
            
        </div>
    )
    else
    return(
      <div>
          <Layout>
              <Loader/>
          </Layout>
          
      </div>
    )
}

export default Report
