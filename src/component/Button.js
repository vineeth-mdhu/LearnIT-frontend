import React from 'react';
import styles from '../styles/Button.module.css'

const STYLES = ['btn_primary', 'btn_outline'];
const SIZES = ['btn_medium', 'btn_large'];

const Button = ({children, type, onClick, buttonStyle, buttonSize,link}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return(
        <div className={styles.btn_mobile} >
            <button className={`${styles.btn} ${styles.btn_primary} ${styles.btn_medium}`} onClick={onClick} type={type}>
                {children}
            </button>
        </div>
    )
}

export default Button