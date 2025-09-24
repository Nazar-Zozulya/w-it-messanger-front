import styles from './input.module.css'
import { InputProps } from './input.types'
import { ReactComponent as Eye } from '../icons/eye.svg'



export function Input(props: InputProps) {
    const { label, placeholder, isPassword = false, type } = props


    return (
        <div className={styles.container}>
            <p className={styles.label}>{label}</p>
            <div className={styles.helpInputDiv}>
                <input type={isPassword ? "password" : type}  placeholder={placeholder} className={styles.input}/>
                { isPassword ? <Eye /> : undefined  }
            </div>
        </div>
    )
}