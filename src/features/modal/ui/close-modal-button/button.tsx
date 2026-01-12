import { useModalManagerStore } from "../../../../entities/modal/model/storage/modalManager"
import { ReactComponent as XMark } from "../../../../shared/ui/icons/xMark.svg"
import styles from './button.module.css'




export function CloseModalButton() {

    const { closeModal } = useModalManagerStore()


    return (
        <button className={styles.button} onClick={() => closeModal()}>
            <XMark width={18} height={18} />
        </button>
    )
}