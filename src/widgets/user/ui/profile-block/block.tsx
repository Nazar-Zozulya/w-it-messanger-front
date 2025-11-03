import { UserAvatar } from '../../../../entities/user'
import styles from './block.module.css'






export function ProfileBlock() {


    return (
        <div className={styles.container}>
            <div className={styles.ProfileInfo}>
                <UserAvatar />

                <div className={styles.NameBlock}>
                    <p className={styles.Name}>name</p>
                    <p className={styles.Username}>@username</p>
                </div>

            </div>

            <div className={styles.ProfileStats}>
                <div className={styles.StatBlock}>
                    <p className={styles.StatCount}>566</p>
                    <p className={styles.StatName}>Дописи</p>
                </div>

                <div className={styles.StatBlock + " " + styles.BorderedSides}>
                    <p className={styles.StatCount}>566</p>
                    <p className={styles.StatName}>Читачі</p>
                </div>

                <div className={styles.StatBlock}>
                    <p className={styles.StatCount}>566</p>
                    <p className={styles.StatName}>Друзі</p>
                </div>

            </div>
        </div>
    )
}