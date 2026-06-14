import styles from "./block.module.css"
import { ReactComponent as Chat } from "../../../../shared/ui/icons/chat.svg"
import { AnotherUserCard, useUserContext } from "../../../../entities/user"
import { useChatsManager } from "../../../../entities/chat"

export function ChatNotificationsBlock() {
	const { chats } = useChatsManager()
	const { user } = useUserContext()

	return (
		<div className={styles.container}>
			<div className={styles.chatsBlock}>
				<div className={styles.header}>
					<div className={styles.titleDiv}>
						<Chat style={{ color: "#81818D" }} />
						<p className={styles.title}>Повідомлення</p>
					</div>
					<button className={styles.seeAllButton}>
						Дивитись всі
					</button>
				</div>
				<div className={styles.list}>
					{chats?.map((chat) => {
						const anotherUser = chat.users.find(
							(chatUser) => chatUser.id !== user?.id,
						)

						return (
							<AnotherUserCard
								username={anotherUser?.username ?? ""}
								name={anotherUser?.name}
								surname={anotherUser?.surname}
								// avatar={}
								mode="default"
							/>
						)
					})}
				</div>
			</div>
			<div className={styles.chatsBlock}>
				<div className={styles.header}>
					<div className={styles.titleDiv}>
						<Chat style={{ color: "#81818D" }} />
						<p className={styles.title}>Групові чати</p>
					</div>
					<button className={styles.seeAllButton}>
						Дивитись всі
					</button>
				</div>
				<div className={styles.list}>
					<AnotherUserCard username="123123" mode="default" />
					<AnotherUserCard username="123123" mode="default" />
					<AnotherUserCard username="123123" mode="default" />
					<AnotherUserCard username="123123" mode="default" />
					<AnotherUserCard username="123123" mode="default" />
					<AnotherUserCard username="123123" mode="default" />
					<AnotherUserCard username="123123" mode="default" />
					<AnotherUserCard username="123123" mode="default" />
					<AnotherUserCard username="123123" mode="default" />
					<AnotherUserCard username="123123" mode="default" />
				</div>
			</div>
		</div>
	)
}
