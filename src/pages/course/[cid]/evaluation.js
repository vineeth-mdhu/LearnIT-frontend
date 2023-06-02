import Layout from '@/component/Layout'
import React from 'react'
import { useRouter } from 'next/router'

import cpp from '@/courses/cpp/content.js'
import Test from '@/component/Test'

function Evaluation() {
    const questions = [
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answerIndex: 2
  },
  {
    question: "Which country is home to the tallest mountain in the world, Mount Everest?",
    options: ["India", "Nepal", "China", "Bhutan"],
    answerIndex: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    answerIndex: 0
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Cu", "Fe"],
    answerIndex: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    answerIndex: 0
  },
  {
    question: "Who is the author of the Harry Potter book series?",
    options: ["J.K. Rowling", "Stephen King", "George R.R. Martin", "Dan Brown"],
    answerIndex: 0
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Lion", "Tiger", "Elephant", "Giraffe"],
    answerIndex: 0
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    answerIndex: 0
  },
  {
    question: "What is the square root of 144?",
    options: ["9", "11", "12", "15"],
    answerIndex: 2
  },
  {
    question: "Which language is most widely spoken in Brazil?",
    options: ["Spanish", "Portuguese", "English", "French"],
    answerIndex: 1
  },
  {
    question: "Which city is known as the 'Big Apple'?",
    options: ["New York City", "Los Angeles", "Chicago", "San Francisco"],
    answerIndex: 0
  },
  {
    question: "Which instrument has 88 keys?",
    options: ["Guitar", "Violin", "Piano", "Drums"],
    answerIndex: 2
  },
  {
    question: "What is the chemical symbol for iron?",
    options: ["Fe", "Au", "Cu", "Ag"],
    answerIndex: 0
  },
  {
    question: "Who discovered the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
    answerIndex: 1
  },
  {
    question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
    options: ["Venus", "Mars", "Saturn", "Uranus"],
    answerIndex: 0
  },
  {
    question: "Which is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answerIndex: 1
  },
  {
    question: "What is the chemical symbol for silver?",
    options: ["Ag", "Au", "Cu", "Fe"],
    answerIndex: 0
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "F. Scott Fitzgerald"],
    answerIndex: 0
  },
  {
    question: "Which country is known for inventing the sport of cricket?",
    options: ["England", "Australia", "India", "South Africa"],
    answerIndex: 0
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Earth", "Neptune"],
    answerIndex: 0
  }
];
  const router = useRouter();
  const {cid} = router.query;

    if(cid)
    return (
        <div>
            <Layout>
                <div>
                    <Test cid={cid} questions={questions} timeLimit={100} />
                </div>
            </Layout>
            
        </div>
    )
}

export default Evaluation
