import { Modal } from "../../../../shared/ui/modal";
import { createPostModalProps } from "./modal.types";
import styles from './modal.module.css'
import { ReactComponent as XMark } from '../../../../shared/ui/icons/xMark.svg'





export function CreatePostModal(props: createPostModalProps) {
    const { isVisible, onClose } = props

    return (
        <Modal isVisible = {isVisible} onClose={onClose} >
            <div className={styles.container}>
                <button className={styles.closeButton}>X</button>
            </div>
        </Modal>
    )
}