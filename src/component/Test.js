import React, { useState, useEffect } from 'react'

function Test(props) {

    var questions = props.content
    var question_list = [...questions.content].map((item, index) => {
        return (
            <div key={index} style={{margin:'20px 0'}}>
                <p style={{fontSize:'1.1em',margin:'5px 0'}}>{index+1}. {item.question}</p>
                <ul >
                    {[...item.options].map((option, i) => {
                    return (
                        <li key={i}>
                            <input  style={{margin:'0 10px',cursor:'pointer'}} value={i} type="radio" name={index} />
                            <span>{option}</span>
                        </li>
                    );
                    })}
                </ul>
            </div>
        );
    })

    return (
        <>
            <div style={{margin:'20px'}}>
                {question_list}
            </div>
        </>
    )
}


export default Test