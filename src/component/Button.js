import React from 'react';
import styles from '../styles/Button.module.css'

const STYLES = ['btn_primary', 'btn_outline'];
const SIZES = ['btn_small','btn_medium', 'btn_large'];

const Button = ({children, type, onClick, buttonStyle, buttonSize,link}) => {
    const checkButtonStyle = styles[STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]];
    const checkButtonSize = styles[SIZES.includes(buttonSize) ? buttonSize : SIZES[0]];


    return(
        <div className={styles.btn_mobile} >
            <button className={`${styles.btn} ${checkButtonSize} ${checkButtonStyle}`} onClick={onClick} type={type}>
                {children}
            </button>
        </div>
    )
}

export default Button