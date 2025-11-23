import { createPortal } from "react-dom";
import { ModalProps } from "./modal.types";
import styles from './modal.module.css'




export function Modal(props: ModalProps) {

    return(
        createPortal(<div className={styles.modal} onClick={props.onClose}>
            {props.children}
        </div>, document.body)
    )
}

