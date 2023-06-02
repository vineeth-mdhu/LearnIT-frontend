import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Navbar.module.css'
import dynamic from "next/dynamic";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
function Navbar({session}) {

    const [profile, setProfile] = useState(null)
    const [type, setType] = useState(null)
    const router = useRouter()
    const supabase = useSupabaseClient()
    const user = useUser()

    useEffect(() => {
        // fetchData()
    }, [user])

    async function fetchData() {
        if(profile)
        try {
            const {data, error} = await supabase.from('type').select('*').eq('entity_id',profile.id)
 
            if(data)
            {
                console.log(data[0].type)
                setType(data[0].type)
            }

        } catch (error) {
            alert(error.message)
        }
    }

    async function signOut() {
        await supabase.auth.signOut()
        document.cookie = "Event=;";
        document.cookie = "Session=;";
        router.reload(window.location.pathname)
    }

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.navbar_container}>
                    <div className={styles.navbar_logo}>
                        <Link href='/home'><p className={styles.navbar_logo_name}>LearnIT</p></Link>
                    </div>

                    <ul className={styles.nav_menu}>
                        
                    </ul>

                    <ul className={styles.nav_menu}>
                        {session?
                            <div  style={{paddingRight:'10px'}} className={styles.nav_menu}>
                                
                                <li className={styles.nav_item}>
                                    <Link href='/home'><i className="far fa-home" style={{fontSize:'1.5em'}}></i></Link>
                                </li>
                                
                                <li className={styles.nav_item}>
                                    <Link href='/explore'><i className="far fa-compass" style={{fontSize:'1.5em'}}></i></Link>
                                </li>
        
                                
                                <li className={styles.nav_item}>
                                    <Link href='/test'><i className="far fa-hammer" style={{fontSize:'1.5em'}}></i></Link>
                                </li>
                            </div>
                            :
                            <></>
                        }
                        
                        <li >
                            {session?
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <img style={{width:'30px',marginRight:'10px',borderRadius:'50%'}} 
                                        src={"https://avatars.dicebear.com/api/initials/"+session.user.email+".svg"}>
                                    </img>
                                    <p className={styles.uemail} style={{fontSize:'1em'}}>{session.user.email}</p>
                                </div>
                                :
                                ''
                            }
                        </li>
                        <li className={styles.nav_item}>
                            {session?
                                <div className={styles.nav_links} onClick={signOut}>
                                   <i className="far fa-sign-out" style={{fontSize:'1.5em'}}></i> 
                                </div>:
                                 <Link href='/login'>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <p>Sign In </p>
                                        <i className="far fa-sign-in" style={{fontSize:'1.5em', marginLeft:'10px'}}></i>
                                    </div>
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar
