import { useEffect } from 'react'
import { UserAvatar, useUserContext } from '../../../../entities/user'
import styles from './block.module.css'






export function ProfileBlock() {

    const { user } = useUserContext()

    useEffect(() => {
        console.log(user, "user in profile block")
    }, [user])


    return (
        <div className={styles.container}>
            <div className={styles.ProfileInfo}>
                <UserAvatar />

                <div className={styles.NameBlock}>
                    <p className={styles.Name}>{user?.name}</p>
                    <p className={styles.Username}>@{user?.username}</p>
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