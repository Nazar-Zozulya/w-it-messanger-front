import { useSocketStore } from "../../../../shared/socket"
import { Button } from "../../../../shared/ui/button"
import styles from "./block.module.css"

export function ChatBlock() {
	const { send } = useSocketStore()


	return (
		<div className={styles.container}>
			<div className={styles.noSelectedChatDiv}>
				<p className={styles.noSelectedChatTitle}>
					Почніть нове спілкування
				</p>
				<p className={styles.noSelectedChatText}>
					Оберіть контакт зі списку ліворуч або створіть групу, щоб
					почати спілкування
					<Button fill={true} text="submit" function={()=>{send("send", "data")}} />
				</p>
			</div>
		</div>
	)
}
