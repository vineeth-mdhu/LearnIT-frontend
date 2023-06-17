import Layout from '@/component/Layout'
import React, { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import axios from 'axios';

import cpp from '@/courses/cpp/content.js'
import Test from '@/component/Test'
import Loader from '@/component/Loader'

function Evaluation() {
//     const questions = [
//   {
//     question: "What is the capital of Australia?",
//     options: ["Sydney", "Melbourne", "Canberra", "Perth"],
//     answerIndex: 2
//   }
// ];


  const supabase = useSupabaseClient()
  const user = useUser()

  const router = useRouter();
  const {cid} = router.query;

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [questionsList, setQuestionsList] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    fetchData()
    fetchQuestions()
    console.log(cid)
  }, [])

  useEffect(() => {
    fetchData()
    fetchQuestions()
  }, [cid])

  useEffect(() => {
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
            .select('*')
            .eq('user_id',user.id)
            .eq('course_id',cid)
        
            if (error && status !== 406) {
                throw error
            }
        
            if (data) {
                console.log(data,"test")
                setUserData(data)
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

async function fetchQuestions() {
  if(cid)
  {
      try {
          setLoading(true)
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              mode:'no-cors',
              body: JSON.stringify({ title: 'React POST Request Example' })
          };
          console.log("testing backend",cid)

          const response = await axios.post('https://learnit-backend.onrender.com/get-qs', { course_id: cid }, { mode: 'no-cors' })
          console.log(response.data,'dsadasd');
          setQuestions(response.data)

        } catch (error) {
          // alert('Error loading user data!')
          console.log(error)
        } finally {
          setLoading(false)
        }
  }
}

async function submitResult(score,selectedAnswers) {
      try {
          setLoading(true)
          console.log(user.id, cid,score,questions.length, userData[0].results,selectedAnswers)
          console.log("agsdfghs",questions,selectedAnswers)

          var queer = []
          questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.answerIndex) {
              var temp ={
                correct:true,
                difficulty:question.difficulty,
                skill:question.skill
              }
              queer.push(temp)
            }
            else{
              var temp ={
                correct:false,
                difficulty:question.difficulty,
                skills:question.skill
              }
              queer.push(temp)
            }
          });

          console.log("asjkbd",queer)

          const today = new Date();
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1; // Months start at 0!
          let dd = today.getDate();
          if (dd < 10) dd = '0' + dd;
          if (mm < 10) mm = '0' + mm;
          const formattedToday = dd + '/' + mm + '/' + yyyy;

          var result = {
            date:formattedToday,
            score:score/questions.length*100
          }
          var query = userData[0].results
          query.push(result)

          // console.log(user.id, cid,score,questions.length, query)

          let { data, error, status } = await supabase
          .from('user_enrollment')
          .update({'results':query})
          .eq('course_id', cid)
          .eq('user_id',user.id)

          var response = await axios.post('https://learnit-backend.onrender.com/submit', { course_id: cid, student_id: user.id, qs: queer }, { mode: 'no-cors' })
          console.log(response.data,'dsadasd');

          var response = await axios.get('https://learnit-model1.onrender.com/recommend?course_id='+cid+'&student_id='+user.id, { mode: 'no-cors' })
          console.log(response.data,'dsadasd');
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
              console.log(data)
          }

        } catch (error) {
          // alert('Error loading user data!')
          console.log(error)
        } finally {
          setLoading(false)
        }
}

    if(cid && content && questions)
    return (
        <div>
            <Layout>
                <div>
                    <Test cid={cid} questions={questions} timeLimit={300} submitResult={submitResult}/>
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

export default Evaluation
