import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import styles from "./card.module.css"
import { AbotherUserCardProps } from "./card.types"

export function AnotherUserCard(props: AbotherUserCardProps) {
	return (
		<div className={styles.container}>
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
		</div>
	)
}
