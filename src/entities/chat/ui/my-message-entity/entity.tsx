import { MyMessageEntityProps } from "./entity.types"
import styles from "./entity.module.css"
import { ReactComponent as SendMessage } from "../../../../shared/ui/icons/send-message.svg"

export function MyMessageEntity(props: MyMessageEntityProps) {
	return (
		<div className={styles.container}>
			<div className={styles.messageBlock}>
				<p className={styles.text}>{props.text}</p>
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
	)
}
