import React from 'react'
import styles from '../styles/CourseCard.module.css'

function CourseCard(props) {
    return (
        <>
            <li className={styles.course_cards_item}>
                <div className={styles.course_card}>
                    <div className={styles.badge} style={{display:props.badge?'':'none'}}>{props.badge}</div>
                    <div className={styles.course_tumb} data-category={props.label}>
                        <img src={props.src} alt=""></img>
                    </div>
                    <div className={styles.course_details}>
                        <span className={styles.course_catagory}>{props.category}</span>
                        <h4><a href="/products">{props.title}</a></h4>
                        <p>{props.detail}</p>
                        <div className={styles.course_bottom_details} style={{display:props.price?'':'none'}}>
                            <div className={styles.course_price} ><small>{props.priceOld}</small>{props.price}</div>
                            <div className={styles.course_links} >
                                <i className="far fa-heart"></i>
                                <a href={props.path} target='blank'><i className="far fa-play"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}

export default CourseCard