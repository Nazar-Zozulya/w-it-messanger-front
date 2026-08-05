import styles from "./block.module.css"
import { ReactComponent as ChatIcon } from "../../../../shared/ui/icons/chat.svg"
import { useFriendsManager } from "../../../../entities/friends"
import { Chat, useChatsManager } from "../../../../entities/chat"
import { AnotherUserChatCard, useUserContext } from "../../../../entities/user"
import { POST } from "../../../../helpers/post"
import { useNavigate } from "react-router-dom"

export function ChatsBlock() {
	const { chats } = useChatsManager()
	const { user } = useUserContext()
	const filteredChats = chats?.filter(
		(c) =>
			c.is_group === false &&
			c.messages.length > 0 &&
			!c.messages[c.messages.length - 1].readers.some(
				(r) => r.id === user?.id,
			),
	)
	const navigate = useNavigate()

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					{/* TODO Поменять people.svg чтоб stroke, color, fill на  него работали */}
					<ChatIcon width={20} stroke="#81818D" color="#81818D" />
					<p>Повідомлення</p>
				</div>

				<button
					className={styles.seeAll}
					onClick={() => {
						navigate("/chats")
					}}
				>
					Дивитись всі
				</button>
			</div>
			<div className={styles.chatsList}>
				{filteredChats && filteredChats.length > 0 ? (
					filteredChats.map((chat) => {
						const anotherUser = chat.users.find(
							(chatUser) => chatUser.id !== user?.id,
						)

						return (
							<AnotherUserChatCard
								username={anotherUser?.username ?? ""}
								name={anotherUser?.first_name}
								surname={anotherUser?.last_name}
								avatar={anotherUser?.avatar}
								lastMessage={chat.messages.at(-1)}
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
					})
				) : (
					<p className={styles.noChats}>
						Поки що у вас немає повідомлень.
					</p>
				)}
			</div>
		</div>
	)
}
