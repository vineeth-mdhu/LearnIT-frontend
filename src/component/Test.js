import Link from 'next/link';
import { useState, useEffect } from 'react';

const Test = ({ questions, timeLimit, cid, submitResult }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const [showResultButton, setShowResultButton] = useState(false);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (remainingTime > 0) {
      setSelectedAnswers(prevAnswers => {
        const newAnswers = [...prevAnswers];
        newAnswers[questionIndex] = answerIndex;
        return newAnswers;
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prevQuestion => prevQuestion - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    setShowResults(true);
    setRemainingTime(0);
    const score = calculateScore();
    submitResult(score,selectedAnswers);
  };

  const handleShowResult = () => {
    setShowResults(false)
    setShowResultButton(true)
  };

  useEffect(() => {
    let timer = null;

    if (remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      setShowResults(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [remainingTime]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    let score = 0;

    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answerIndex) {
        score++;
      }
    });

    return score;
  };

  const renderResultsPopup = () => {
    const score = calculateScore();
    const totalQuestions = questions.length;

    return (
      <div className="popup">
        <div className="popup-content">
          <h2>Results</h2>
          <p>
            You scored {score} out of {totalQuestions} questions correctly!
          </p>
          <button className="close-button" onClick={() => handleShowResult() }>
            Close
          </button>
        </div>
        <style jsx>{`
        .popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.5);
            border-left: 1px solid #ccc;
          }

        .close-button{
            margin-top: 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer
          }
  
          .popup-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 4px;
            text-align: center;
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="quiz-container">
      <div className="side-panel">
        <h2>Questions</h2>
        <ul>
          {questions.map((_, index) => {
            const isAnswered = selectedAnswers[index] !== undefined;
            const questionNumberClassName = `question-number ${isAnswered ? 'attempted' : ''} ${index === currentQuestion ? 'current' : ''}`;

            return (
                <span
                style={{margin:'5px'}}
                key={index}
                className={questionNumberClassName}
                onClick={() => handleQuestionClick(index)}
                >
                {index + 1}
                </span>
            );
            })}
        </ul>
        <div className="side-panel-footer">
            <div className="timer">
                <span className="timer-icon">{/* Add an icon here, if desired */}</span>
                <span className="timer-text">Time Remaining:</span>
                <span className="timer-countdown">{formatTime(remainingTime)}</span>
            </div>
            <div>
                {!showResultButton && (
                    <button className="submit-button" onClick={handleSubmit} disabled={remainingTime <= 0}>
                    Submit
                    </button>
                )}
                {showResultButton && (
                    <button className="show-result-button" onClick={()=>setShowResults(true)}>
                        Show Result
                    </button>
                )}
                {showResultButton && (
                  <Link href={'/course/'+cid}>
                    <button className="submit-button">
                        Exit
                    </button>
                  </Link>
                )}

            </div>

        </div>
        
      </div>
      <div className="main-panel">
        <div className="question">
            <h2>Question {currentQuestion + 1}</h2>
            <p className="question-text">{questions[currentQuestion].question}</p>
            <ul className="options">
            {questions[currentQuestion].options.map((option, index) => {
                const isAnswered = selectedAnswers[currentQuestion] !== undefined;
                const isCorrect = questions[currentQuestion].answerIndex === index;
                const isSelected = selectedAnswers[currentQuestion] === index;

                let optionClassName = 'option';
                if (isAnswered) {
                optionClassName += isCorrect ? ' correct' : ' incorrect';
                }
                if (isSelected) {
                optionClassName += ' selected';
                }

                return (
                <li
                    key={index}
                    className={optionClassName}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                >
                    {option}
                </li>
                );
            })}
            </ul>
        </div>
        
        <div className="navigation-buttons">
          <button
            className="previous-button"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0 || remainingTime <= 0}
          >
            Previous
          </button>
          <button
            className="next-button"
            onClick={handleNextQuestion}
            disabled={currentQuestion === questions.length - 1 || remainingTime <= 0}
          >
            Next
          </button>
        </div>
      </div>
      {showResults && renderResultsPopup()}
      <style jsx>{`
        .quiz-container {
          display: flex;
          margin: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          height: calc(100vh - var(--navbar-height) - 40px)
        }

        .side-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px;
          border-right: 1px solid #ccc;
        }

        .side-panel-footer {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        
        .question{
            overflow-y: scroll;
            flex: 1;
            padding-right:10px;
        }

        .question-number {
          display: inline-block;
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border: 2px solid #ccc;
          border-radius: 50%;
          text-align: center;
          line-height: 30px;
          font-weight: bold;
          cursor: pointer;
        }

        .attempted {
          background-color: #ccc;
        }

        .current {
          border-color: #007bff;
          color: #007bff;
        }

        .main-panel {
          flex: 3;
          padding: 20px;
          height:100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .question-text {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .options {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .options .option {
            display: flex;
            align-items: center;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
          }
          
          .options .option.correct {
            background-color: #d4edda;
            border-color: #c3e6cb;
          }
          
          .options .option.incorrect {
            background-color: #f8d7da;
            border-color: #f5c6cb;
          }
          
          .options .option.selected {
            background-color: #f0f0f0;
          }
          
          .options .option.selected.correct {
            background-color: #c3e6cb;
          }
          

        .navigation-buttons {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }

        .navigation-buttons button {
          margin: 0 10px;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }

        .show-result-button{
            margin:5px;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            background-color: #007bff;
            color: #fff;
        }

        .navigation-buttons .previous-button {
          background-color: #007bff;
          color: #fff;
        }

        .navigation-buttons .next-button {
          background-color: #28a745;
          color: #fff;
        }

        .navigation-buttons button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-button {
          margin-top: 20px;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          background-color: #dc3545;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }

        .timer {
            margin-top: 20px;
            font-weight: bold;
            display: flex;
            align-items: center;
          }
          
          .timer-icon {
            margin-right: 5px;
          }
          
          .timer-text {
            font-size: 16px;
          }
          
          .timer-countdown {
            font-size: 24px;
            color: #007bff;
            margin-left: 5px;
          }
      `}</style>
    </div>
  );
};

export default Test;
