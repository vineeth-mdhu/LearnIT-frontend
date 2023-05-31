import React from 'react'
import Button from '../Button'
import styles from '@/styles/VideoSection.module.css'

const BGARRAY = ['slide1.jpg', 'slide2.jpg' , 'slide3.jpg' , 'slide4.jpg'];


const VideoSection = () => {
    const [value, setValue] = React.useState(0);
    
    React.useEffect(() => {
        setInterval(() => {
            setValue((v) => (v === 3 ? 0 : v + 1));
        }, 6000);
    }, []);
    

    return (
        <div className={styles.video_container}>
            <div className={styles.bgImg} ><img className={styles.img} src={'/images/'+BGARRAY[value]} alt=""/></div>
            <h1>ONE PLATFORM,<br/> <span className={styles.styleh1} >UNLIMITED</span>  POSSIBILITIES</h1>
            <p>We use <span className={styles.pbold} >research, stratergy</span> and <span className={styles.pbold} >design</span> to <span className={styles.pbold} >create</span> <br/> <span className={styles.pcolor} >engaging learning experience</span></p>
            <div className={styles.video_btns} >
                <Button  buttonStyle="btn__primary" buttonSize="btn__large" link='#' >
                    Start Learning <i className="fas fa-play-circle"></i>
                </Button>
            </div>
        </div>
    )
}

export default VideoSection