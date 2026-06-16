import styles from "./block.module.css"
import { ReactComponent as ChatIcon } from "../../../../shared/ui/icons/chat.svg"
import { AnotherUserCard, useUserContext } from "../../../../entities/user"
import { Chat, useChatsManager } from "../../../../entities/chat"
import { POST } from "../../../../helpers/post"
import { useNavigate } from "react-router-dom"
import { AnotherUserChatCard } from "../../../../entities/user/ui/another-user-card"

export function ChatNotificationsBlock() {
	const { chats } = useChatsManager()
	const { user } = useUserContext()

	const navigate = useNavigate()

	return (
		<div className={styles.container}>
			<div className={styles.chatsBlock}>
				<div className={styles.header}>
					<div className={styles.titleDiv}>
						<ChatIcon style={{ color: "#81818D" }} />
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
							<AnotherUserChatCard
								username={anotherUser?.username ?? ""}
								name={anotherUser?.name}
								surname={anotherUser?.surname}
								lastMessage={
									chat.messages[chat.messages.length - 1] ?? []
								}
								createdAt={
									new Date(
										chat.messages[chat.messages.length - 1]
											.createdAt as string,
									)
								}
								// avatar={}
								function={async () => {
									const response = await POST<Chat>({
										whichService: "chatService",
										endpoint: "api/chat/get-chat",
										body: {
											userId: user?.id,
											anotherUserId: anotherUser?.id,
										},
									})

									if (response.status === "error") {
										console.log(
											"chat found or create problems",
										)
										return
									}
									navigate(`/chat/${response.data.id}`)
								}}
							/>
						)
					})}
				</div>
			</div>
			<div className={styles.chatsBlock}>
				<div className={styles.header}>
					<div className={styles.titleDiv}>
						<ChatIcon style={{ color: "#81818D" }} />
						<p className={styles.title}>Групові чати</p>
					</div>
					<button className={styles.seeAllButton}>
						Дивитись всі
					</button>
				</div>
				<div className={styles.list}>
					<AnotherUserCard username="123123" />
					<AnotherUserCard username="123123" />
					<AnotherUserCard username="123123" />
					<AnotherUserCard username="123123" />
					<AnotherUserCard username="123123" />
					<AnotherUserCard username="123123" />
					<AnotherUserCard username="123123" />
					<AnotherUserCard username="123123" />
					<AnotherUserCard username="123123" />
					<AnotherUserCard username="123123" />
				</div>
			</div>
		</div>
	)
}
