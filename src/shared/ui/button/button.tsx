import { ButtonProps } from "./button.types";
import styles from './buton.module.css'

export function Button(props: ButtonProps) {

    return (
        <button className={`${styles.container} ${props.fill ? styles.fill : styles.unFill}`} onClick={()=>props.function} >
            {props.icon}
            <p className={styles.text}>{props.text}</p>
        </button>
    )
}