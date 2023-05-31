import Layout from '@/component/Layout'
import Test from '@/component/Test'
import React from 'react'

import cpp from '@/courses/cpp/content.js'

function Evaluation() {
    return (
        <div>
            <Layout>
                <div>
                    <Test content={cpp[5]}/>
                </div>
            </Layout>
            
        </div>
    )
}

export default Evaluation
