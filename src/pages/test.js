import React, { useState, useEffect } from 'react'

function Test() {

    return (
        <>
            <CourseCard
                // badge='Sale-50%'
                label='Beginner'
                src='images/img-6.jpeg'
                category='Programming'
                title='C++'
                detail='Robotics Kit which contains building blocks (Q-bits), Electronics (Motherboard, Plug & Play Sensors/actuators)'
                priceOld='₹200'
                price='₹100'
            />
        </>
    )
}


export default Test