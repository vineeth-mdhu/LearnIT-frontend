import React from 'react'
import Button from '../Button'
import styles from '@/styles/VideoSection.module.css'
import Link from 'next/link'

const BGARRAY = ['1.jpg', '2.jpg' , '3.jpg' , '4.jpg'];


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
                <Link href='/explore'>
                    <Button  buttonStyle="btn_primary" buttonSize="btn_large" link='#' >
                        Start Learning <i className="fas fa-play-circle"></i>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default VideoSection