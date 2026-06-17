import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { useUserContext } from "../../model/context"
import { useUserStatusStore } from "../../model/storage"
import styles from "./card.module.css"
import { AbotherUserCardProps, AbotherUserChatCardProps } from "./card.types"

export function AnotherUserCard(props: AbotherUserCardProps) {
	return (
		<button className={styles.container} onClick={props.function}>
			<img
				src={props.avatar ? props.avatar : DEFAULT_AVATAR}
				className={styles.avatar}
				alt=""
			/>
			<div className={styles.text}>
				<p className={styles.name}>
					{props.name && props.surname
						? `${props.name} ${props.surname}`
						: props.username}
				</p>
			</div>
		</button>
	)
}

export function AnotherUserChatCard(props: AbotherUserChatCardProps) {
	const { user } = useUserContext()

	const { users } = useUserStatusStore()

	return (
		<button
			className={`${styles.container} ${styles.chatContainer} ${
				props.lastMessage.senderId === user?.id
					? undefined
					: props.lastMessage?.readers?.find(
								(reader) => reader.id === user?.id,
						  )
						? undefined
						: styles.newMessage
			}`}
			onClick={props.function}
		>
			<img
				src={props.avatar ? props.avatar : DEFAULT_AVATAR}
				className={styles.avatar}
				alt=""
			/>
			<p>{users?.map((userStatus) =>{
				console.log("userStatus:",userStatus)
				if (userStatus.id === props.id) {
					return `${userStatus.status}`
				}
				else { 
					return "ff"
				}
			})}</p>
			<div className={styles.chatText}>
				<div className={styles.textLeftPart}>
					<p className={styles.name}>
						{props.name && props.surname
							? `${props.name} ${props.surname}`
							: props.username}
					</p>
					<p className={styles.lastMessage}>
						{props.lastMessage.text}
					</p>
				</div>
				<p className={styles.createdAt}>
					{props.createdAt
						?.toISOString()
						.slice(11, 16) /**  "14:05"*/}
				</p>
			</div>
		</button>
	)
}
