import { DEFAULT_AVATAR } from '../../../../constants/default-avatar'
import styles from './avatar.module.css'


export function UserAvatar() {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={DEFAULT_AVATAR} alt="123" />
            <div className={styles.circle}></div>  {/* кружочек онлайна пользователя */}
        </div>
    )
}