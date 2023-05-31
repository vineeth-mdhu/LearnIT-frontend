import React from 'react'
import { useRouter } from 'next/router'
// import { supabase } from '../utils/supabaseClient'
import styles from '../styles/Sidebar.module.css'
import Link from 'next/link'

function Sidebar(props) {
    const router = useRouter()

    async function signOut() {
        await supabase.auth.signOut()
        document.cookie = "Event=;";
        document.cookie = "Session=;";
        router.push('/')
    }

    var list_items = [...props.content].map((item,index)=>{return(
                        <li key={index} className={props.selected==index?styles.nav_item+' '+styles.selected:styles.nav_item}>
                            <Link href={'/course/cpp/'+index}>
                                <div style={{display:'flex'}}>
                                    <i 
                                        className={ 
                                                    item.type=="text"?
                                                    'fas fa-globe-africa':
                                                    item.type=="video"?
                                                    'fas fa-map-marker-alt':
                                                    item.type=="quiz"?
                                                    'fas fa-plus-square':
                                                    'fas fa-truck'
                                                }
                                    >
                                    </i>
                                    <p>{item.title}</p>
                                </div>
                            </Link>
                            
                        </li>
                    )})

    return (
        <nav className={styles.navbar}>
            <ul className={styles.nav}>
                {list_items}
            </ul>
        </nav>
    )
}

export default Sidebar
