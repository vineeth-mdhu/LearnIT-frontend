import React from 'react'
import styles from '@/styles/Features.module.css'

const Features = () => {
    return (
        <div className={styles.home__features}>
            <div className={styles.feature}>
                <i className=" fal fa-code"></i>
                <h3 className={styles.feature_title}>Extensive Courses</h3>
                <p className={styles.feature_desc}>Detailed Courses for number on Computer Science Topics with detailed explanations..</p>
            </div>
            <div className={styles.feature}>
                <i className=" fal fa-code"></i>
                <h3 className={styles.feature_title}>Adaptive Tests</h3>
                <p className={styles.feature_desc}>Tests structured according to your knowledge level and course progress with new questions every test to examine your skills.</p>
            </div>
            <div className={styles.feature}>
                <i className=" fal fa-code"></i>
                <h3 className={styles.feature_title}>AI Recommendations</h3>
                <p className={styles.feature_desc}>Analysis of performance and module recommendations to improve performance and learning.</p>
            </div>
        </div>
    )
}

export default Features
