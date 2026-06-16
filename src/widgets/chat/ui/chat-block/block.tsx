import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"

import {
	useChatSocketStore,
	useGlobalChatSocketStore,
} from "../../../../shared/socket"
import { Button } from "../../../../shared/ui/button"
import { Input } from "../../../../shared/ui/input"

import styles from "./block.module.css"
import { ChatBlockProps, SendMessageForm } from "./block.types"

import { ReactComponent as Arrow } from "../../../../shared/ui/icons/arrow.svg"
import { ReactComponent as Smile } from "../../../../shared/ui/icons/smile.svg"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { ReactComponent as Send } from "../../../../shared/ui/icons/send.svg"

import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"

import {
	MyMessageEntity,
	OtherMessageEntity,
	useChatsManager,
} from "../../../../entities/chat"

import { useUserContext } from "../../../../entities/user"

export function ChatBlock(props: ChatBlockProps) {
	const { sendNewMessage, enterChat, leaveChat, send } = useChatSocketStore()

	const { send: globalSend } = useGlobalChatSocketStore()

	const { getChat, setChats } = useChatsManager()
	const chats = useChatsManager((s) => s.chats)

	const { user } = useUserContext()
	const { id } = useParams()

	const chatId = id ? Number(id) : null

	const chat = chats?.find((c) => c.id === chatId)

	const anotherUser = chat?.users?.find((u) => u.id !== user?.id) ?? null

	const messagesRef = useRef<HTMLDivElement>(null)

	const { handleSubmit, control, reset } = useForm<SendMessageForm>({
		defaultValues: {
			text: "",
		},
	})

	useEffect(() => {
		async function fetchChat() {
			if (!chatId || !user) return

			const response = await getChat(user.id, chatId)

			if (response.status === "error") return

			setChats((prev) => {
				if (!prev) return [response.data]

				const exists = prev.some((c) => c.id === response.data.id)

				if (exists) {
					return prev.map((c) =>
						c.id === response.data.id ? response.data : c,
					)
				}

				return [...prev, response.data]
			})

			enterChat(response.data.id)
		}

		fetchChat()

		return () => {
			if (!chatId) return
			leaveChat(chatId)
		}
	}, [chatId, user])

	useEffect(() => {
		if (!messagesRef.current) return

		messagesRef.current.scrollTop = messagesRef.current.scrollHeight
	}, [chat?.messages])

	function sendMessage(data: SendMessageForm) {
		if (!chatId || !user || !anotherUser || !chat) return

		sendNewMessage({
			chatId: chat.id,
			receiverId: anotherUser.id,
			senderId: user.id,
			text: data.text,
		})

		reset()
	}

	return (
		<div
			className={`${styles.container} ${
				props.mode === "chat" ? styles.chatStyles : styles.noChatStyles
			}`}
		>
			{props.mode === "chat" ? (
				<>
					<div className={styles.header}>
						<div className={styles.headerContent}>
							<div className={styles.headerLeftData}>
								<Link
									className={styles.arrowButton}
									to={"/chats"}
								>
									<Arrow className={styles.arrow} />
								</Link>

								<div className={styles.headerChatWithDiv}>
									<img
										src={
											anotherUser?.avatar ||
											DEFAULT_AVATAR
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

					<div className={styles.messagesList}  ref={messagesRef}>
						{chat?.messages?.map((message) => {
							console.log("message:", message.readers)
							if (message.senderId === user?.id) {
								return (
									<MyMessageEntity
										key={message.id}
										text={message.text}
										createdAt={
											new Date(
												message.createdAt as string,
											)
										}
										readers={message.readers ?? []}
									/>
								)
							}

							return (
								<OtherMessageEntity
									key={message.id}
									id={message.id}
									text={message.text}
									createdAt={
										new Date(message.createdAt as string)
									}
									readers={message.readers ?? []}
									user={message.sender}
								/>
							)
						})}
					</div>

					<form
						className={styles.sendInput}
						onSubmit={handleSubmit(sendMessage)}
					>
						<Input
							control={control}
							name="text"
							placeholder="Повідомлення"
							fullWidth
						/>

						<div className={styles.sendInputButton}>
							<Button
								fill={false}
								type="button"
								icon={<Smile width={20} height={20} />}
								function={() => {
									send("rooms", {})
								}}
							/>
							<Button
								fill={false}
								type="button"
								icon={<Gallery />}
								function={() => {
									globalSend("global-rooms", {})
								}}
							/>
							<Button fill icon={<Send />} />
						</div>
					</form>
				</>
			) : (
				<div className={styles.noSelectedChatDiv}>
					<p className={styles.noSelectedChatTitle}>
						Почніть нове спілкування
					</p>
					<p className={styles.noSelectedChatText}>
						Оберіть контакт зі списку ліворуч або створіть групу,
						щоб почати спілкування
					</p>
				</div>
			)}
		</div>
	)
}
