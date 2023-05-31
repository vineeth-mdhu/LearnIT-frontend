import React from 'react'
import styles from '@/styles/Features.module.css'

const Features = () => {
    return (
        <div className={styles.home__features}>
            <div className={styles.feature}>
                <i className=" fal fa-code"></i>
                <h3 className={styles.feature_title}>Write Code</h3>
                <p className={styles.feature_desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis rerum et fugiat accusantium </p>
            </div>
            <div className={styles.feature}>
                <i className=" fal fa-code"></i>
                <h3 className={styles.feature_title}>Write Code</h3>
                <p className={styles.feature_desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis rerum et fugiat accusantium </p>
            </div>
            <div className={styles.feature}>
                <i className=" fal fa-code"></i>
                <h3 className={styles.feature_title}>Write Code</h3>
                <p className={styles.feature_desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis rerum et fugiat accusantium </p>
            </div>
        </div>
    )
}

export default Features
