import { POST } from "../../../../helpers/post"
import { useChatSocketStore } from "../../../../shared/socket"
import { Button } from "../../../../shared/ui/button"
import styles from "./block.module.css"
import { ChatBlockProps, SendMessageForm } from "./block.types"
import { ReactComponent as Arrow } from "../../../../shared/ui/icons/arrow.svg"
import { Input } from "../../../../shared/ui/input"
import { useForm } from "react-hook-form"
import { ReactComponent as Smile } from "../../../../shared/ui/icons/smile.svg"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { ReactComponent as Send } from "../../../../shared/ui/icons/send.svg"
import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {
	Chat,
	MyMessageEntity,
	OtherMessageEntity,
	useChatsManager,
} from "../../../../entities/chat"
import { UserToChat, useUserContext } from "../../../../entities/user"

export function ChatBlock(props: ChatBlockProps) {
	const { send } = useChatSocketStore()

	const { getChat } = useChatsManager()

	const { user } = useUserContext()

	const { handleSubmit, control, reset } = useForm<SendMessageForm>({
		defaultValues: {
			text: ""
		}
	})

	const [chatData, setChatData] = useState<Chat | null>(null)

	const [anotherUser, setAnotherUser] = useState<UserToChat | null>(null)

	function sendMessage(data: SendMessageForm) {

		function fetchMessage () {
			const newMessage = await 
		
		reset()
		}

		fetchMessage()

	}

	const { id } = useParams()

	useEffect(() => {
		async function fetchChat() {
			if (!id) return

			if (!user) return

			const response = await getChat(user.id, +id)

			console.log(4252)
			if (response.status === "error") return

			setChatData(response.data)
			setAnotherUser(
				response.data.users.find(
					(findUser) => findUser.id !== user.id,
				) ?? null,
			)
		}

		fetchChat()
	}, [id, user])

	return (
		<div
			className={`${styles.container} ${props.mode === "chat" ? styles.chatStyles : styles.noChatStyles}`}
		>
			{props.mode === "chat" ? (
				<>
					<div className={styles.header}>
						<div className={styles.headerContent}>
							<div className={styles.headerLeftData}>
								<button className={styles.arrowButton}>
									<Arrow className={styles.arrow} />
								</button>
								<div className={styles.headerChatWithDiv}>
									<img
										src={
											anotherUser?.avatar
												? anotherUser.avatar
												: DEFAULT_AVATAR
										}
										className={styles.avatar}
										alt=""
									/>
									<p className={styles.chatName}>
										{anotherUser?.name
											? `${anotherUser.name} ${anotherUser.surname}`
											: anotherUser?.username}
									</p>
								</div>
							</div>
						</div>

						<div className={styles.headerLine}></div>
					</div>
					<div className={styles.messagesList}>
						<MyMessageEntity
							text="idi nahuy!"
							createdAt={new Date()}
							readers={[]}
						/>
						<OtherMessageEntity
							text="idi nahuy!"
							createdAt={new Date()}
							readers={[]}
							user={{ username: "123123", id: 2 }}
						/>
					</div>
					<form
						className={styles.sendInput}
						onSubmit={handleSubmit(sendMessage)}
					>
						<Input
							control={control}
							name={"text"}
							placeholder="Повідомлення"
							fullWidth={true}
							// defaultValue=""
						/>
						<div className={styles.sendInputButton}>
							<Button
								fill={false}
								type="button"
								icon={<Smile width={20} height={20} />}
							/>
							<Button
								fill={false}
								type="button"
								icon={<Gallery />}
							/>
							<Button fill={true} icon={<Send />} />
						</div>
					</form>
				</>
			) : (
				<>
					<div className={styles.noSelectedChatDiv}>
						<p className={styles.noSelectedChatTitle}>
							Почніть нове спілкування
						</p>
						<p className={styles.noSelectedChatText}>
							Оберіть контакт зі списку ліворуч або створіть
							групу, щоб почати спілкування
						</p>
					</div>
				</>
			)}
		</div>
	)
}
