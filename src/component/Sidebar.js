import React from 'react'
import { useRouter } from 'next/router'
// import { supabase } from '../utils/supabaseClient'
import styles from '../styles/Sidebar.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay, faCircle, faFileLines, faFileCode } from "@fortawesome/free-regular-svg-icons";

function Sidebar(props) {
    const router = useRouter()

    async function signOut() {
        await supabase.auth.signOut()
        document.cookie = "Event=;";
        document.cookie = "Session=;";
        router.push('/')
    }

    var list_items = [...props.content].map((item,index)=>{return(
                        <li key={index} className={props.selected==index?styles.nav_item+' '+styles.selected:styles.nav_item} style={{margin:'1px 0'}}>
                            <Link href={'/course/cpp/'+index}>
                                <div style={{marginLeft:'5px',display:'flex', alignItems:'center', justifyContent:'space-between'}}>
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
                                        {props.selected==index?
                                            <FontAwesomeIcon icon={faCircle} className={styles.icon}/>
                                            :
                                            <FontAwesomeIcon icon={faCheckCircle} className={styles.icon}/>
                                        }
                                    </div>
                                </div>
                            </Link>
                            
                        </li>
                    )})

    return (
        <nav className={styles.navbar}>
            <ul className={styles.nav}>
                {/* <FontAwesomeIcon icon={faArrowsLeftToLine} style={{marginLeft:'11px', fontSize:'1.5em'}}/> */}
                {list_items}
            </ul>
        </nav>
    )
}

export default Sidebar
