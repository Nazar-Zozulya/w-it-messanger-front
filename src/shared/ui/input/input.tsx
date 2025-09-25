import styles from './input.module.css'
import { InputProps } from './input.types'
import { ReactComponent as Eye } from '../icons/eye.svg'
import { ReactComponent as SlashEye } from '../icons/shashEye.svg'
import { useState } from 'react'



export function Input(props: InputProps) {
    const { label, placeholder, isPassword = false, type = "text" } = props

    const [isVisible, setIsVisible] = useState(false)


    return (
        <div className={styles.container}>
            <p className={styles.label}>{label}</p>
            <div className={styles.helpInputDiv}>
                <input type={isPassword ? isVisible ? "text" : "password" : type}  placeholder={placeholder} className={styles.input}/>
                { isPassword && <button style={{border: "none", background: "none", cursor: "pointer"}} onClick={()=>setIsVisible(!isVisible)}>{!isVisible ? <SlashEye /> : <Eye />}</button> }
            </div>
        </div>
    )
}