import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { useUserStatusStore } from "../../model/storage"
import styles from "./avatar.module.css"

export function UserAvatar(props: { avatar: string | undefined, id: number }) {

	const { users } = useUserStatusStore()

	const user = users?.find(user => user.id === props.id)

	return (
		<div className={styles.container}>
			<img
				className={styles.image}
				src={props.avatar ?? DEFAULT_AVATAR}
				alt="123"
			/>
			<div className={`${styles.circle} ${user?.status ? user.status === "active" ? styles.online : styles.offline : styles.noStatus}`}></div>
			{/* кружочек онлайна пользователя */}
		</div>
	)
}
