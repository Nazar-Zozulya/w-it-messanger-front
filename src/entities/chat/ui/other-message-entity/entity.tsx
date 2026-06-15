import { OtherMessageEntityProps } from "./entity.types"
import styles from "./entity.module.css"
import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { ReactComponent as SendMessage } from "../../../../shared/ui/icons/send-message.svg"

export function OtherMessageEntity(props: OtherMessageEntityProps) {
	return (
		<div className={styles.container}>
			<div className={styles.allMessageBlock}>
				<img
					src={DEFAULT_AVATAR}
					className={styles.avatar}
					alt=""
				/>
				<div className={styles.messageBlock}>
					<div className={styles.textBlock}>
						<p className={styles.name}>
							{props.user.name
								? `${props.user.name} ${props.user.surname}`
								: props.user.username}
						</p>
						<p className={styles.text}>{props.text}</p>
					</div>
					<div className={styles.addicInfo}>
						<p className={styles.createdAt}>
							{
								props.createdAt
									.toISOString()
									.slice(11, 16) /**  "14:05"*/
							}
						</p>
						<SendMessage width={10} height={10} stroke="#81818E" />
					</div>
				</div>
			</div>
		</div>
	)
}
