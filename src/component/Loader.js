import React from 'react'
import styles from '@/styles/Loader.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight} from "@fortawesome/free-solid-svg-icons";

function Loader() {
    return (
        <div className={styles.loader_container}>
            <FontAwesomeIcon icon={faRotateRight} className={styles.spinner}/>
        </div>
    )
}

export default Loader
