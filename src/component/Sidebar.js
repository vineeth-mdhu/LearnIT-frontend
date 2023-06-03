import React from 'react'
import { useRouter } from 'next/router'
// import { supabase } from '../utils/supabaseClient'
import styles from '../styles/Sidebar.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay, faCircle, faFileLines, faFileCode } from "@fortawesome/free-regular-svg-icons";

function Sidebar(props) {
    const router = useRouter()

    var update = (mid) => {
        // console.log(mid)
        props.update_mid(mid)
    }

    // console.log(props.content)
    var list_items = [...props.content].map((item,index)=>{return(
                        <li key={index} className={props.selected==index?styles.nav_item+' '+styles.selected:styles.nav_item} style={{margin:'1px 0'}}>
                                <div style={{marginLeft:'5px',display:'flex', alignItems:'center', justifyContent:'space-between'}} onClick={()=>update(index)}>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        {
                                            item.type=="text"?
                                                <FontAwesomeIcon icon={faFileLines} />:
                                            item.type=="video"?
                                                <FontAwesomeIcon icon={faCirclePlay}/>:
                                            item.type=="quiz"?
                                                <FontAwesomeIcon icon={faFileCode}/>:
                                                <FontAwesomeIcon icon={faFileCode}/>
                                        }
                                        <p style={{marginLeft:'15px'}}>{item.title}</p>
                                    </div>
                                    <div style={{marginLeft:'10px'}}>
                                        {props.user_enrollment.progress.includes(index)?
                                            <FontAwesomeIcon icon={faCheckCircle} className={styles.icon}/>
                                            :
                                            <FontAwesomeIcon icon={faCircle} className={styles.icon}/>
                                        }
                                    </div>
                                </div>
                            
                        </li>
                    )})

    return (
        <nav className={styles.navbar}>
            <ul className={styles.nav}>
                <Link href={'/course/'+props.course} style={{marginBottom:'15px'}}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{margin:'0 15px', fontSize:'1em'}}/>
                    {props.course_name}
                </Link>
                {list_items}
            </ul>
        </nav>
    )
}

export default Sidebar
