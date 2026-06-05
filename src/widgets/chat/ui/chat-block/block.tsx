import styles from "./block.module.css"

export function ChatBlock() {
	return (
		<div className={styles.container}>
			<div className={styles.noSelectedChatDiv}>
				<p className={styles.noSelectedChatTitle}>
					Почніть нове спілкування
				</p>
				<p className={styles.noSelectedChatText}>
					Оберіть контакт зі списку ліворуч або створіть групу, щоб
					почати спілкування
				</p>
			</div>
		</div>
	)
}
