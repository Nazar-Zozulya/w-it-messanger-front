import styles from "./block.module.css"
import { ReactComponent as ChatIcon } from "../../../../shared/ui/icons/chat.svg"
import {
	AnotherUserChatCard,
	AnotherUserGroupCard,
	useUserContext,
} from "../../../../entities/user"
import { Chat, useChatsManager } from "../../../../entities/chat"
import { POST } from "../../../../helpers/post"
import { useNavigate } from "react-router-dom"

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
					{/* <button className={styles.seeAllButton}>
						Дивитись всі
					</button> */}
				</div>
				<div className={styles.list}>
					{chats?.map((chat) => {
						const anotherUser = chat.users.find(
							(chatUser) => chatUser.id !== user?.id,
						)

						return (
							<AnotherUserChatCard
								username={anotherUser?.username ?? ""}
								name={anotherUser?.first_name}
								surname={anotherUser?.last_name}
								avatar={anotherUser?.avatar}
								lastMessage={
									chat.messages[chat.messages.length - 1] ??
									[]
								}
								id={anotherUser?.id as number}
								created_at={
									chat.messages.length === 0
										? undefined
										: new Date(
												chat.messages[
													chat.messages.length - 1
												].created_at as string,
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
					{/* <button className={styles.seeAllButton}>
						Дивитись всі
					</button> */}
				</div>
				<div className={styles.list}>
					{/* {groups?.map((group) => {
						// const anotherUser = chat.users.find(
						// 	(chatUser) => chatUser.id !== user?.id,
						// )

						return (
							<AnotherUserGroupCard
								name={group.name ?? "Нова група"}
								// name={anotherUser?.name}
								// surname={anotherUser?.surname}
								lastMessage={
									group.messages[group.messages.length - 1] ??
									[]
								}
								avatar={group.avatar?.base64}
								id={group.id}
								created_at={
									group.messages.length === 0
										? undefined
										: new Date(
												group.messages[
													group.messages.length - 1
												].createdAt as string,
											)
								}
								// avatar={}
								function={async () => {
									// const response = await POST<Chat>({
									// 	whichService: "chatService",
									// 	endpoint: "api/chat/get-chat",
									// 	body: {
									// 		userId: user?.id,
									// 		anotherUserId: anotherUser?.id,
									// 	},
									// })

									// if (response.status === "error") {
									// 	console.log(
									// 		"chat found or create problems",
									// 	)
									// 	return
									// }
									navigate(`/group/${group.id}`)
								}}
							/>
						)
					})} */}
				</div>
			</div>
		</div>
	)
}
