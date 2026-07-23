import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { data, Link, useParams } from "react-router-dom"

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

const PAGE_SIZE = 30
const PRELOAD_OFFSET = 15

export function ChatBlock(props: ChatBlockProps) {
	const { sendNewMessage, enterChat, leaveChat, send } = useChatSocketStore()
	const { send: globalSend } = useGlobalChatSocketStore()

	const { getMessagesFromChat } = useChatsManager()
	const chats = useChatsManager((s) => s.chats)

	const { user } = useUserContext()
	const { id } = useParams()

	const chatId = id ? Number(id) : null

	const chat = chats?.find((c) => c.id === chatId)

	const anotherUser = chat?.users?.find((u) => u.id !== user?.id) ?? null

	const { handleSubmit, control, reset } = useForm<SendMessageForm>({
		defaultValues: {
			text: "",
		},
	})

	const messagesRef = useRef<HTMLDivElement>(null)
	const targetRef = useRef<HTMLDivElement>(null)
	const observer = useRef<IntersectionObserver | null>(null)

	const page = useRef(1)
	const loading = useRef(false)
	const hasMore = useRef(true)
	const firstLoad = useRef(true)

	// ======================
	// Первая загрузка сообщений
	// ======================

	// useEffect(() => {
	// 	if (!chatId) return

	// 	page.current = 1
	// 	hasMore.current = true
	// 	firstLoad.current = true

	// 	console.log(useChatsManager.getState().chats)
	// 	loadFirstMessages()
	// }, [chatId])

	// ======================
	// Вход / выход из комнаты
	// ======================

	// useEffect(() => {
	// 	if (!chatId || !user || !anotherUser) return

	// 	enterChat(chatId)

	// 	return () => {
	// 		leaveChat(chatId)
	// 	}
	// }, [chatId, user?.id, anotherUser?.id])

	useEffect(() => {
		if (!chatId || !user || !anotherUser) return

		let cancelled = false

		const init = async () => {
			page.current = 1
			hasMore.current = true
			firstLoad.current = true

			loading.current = true

			try {
				await enterChat(chatId)

				if (cancelled) return

				const loaded = await getMessagesFromChat(
					chatId,
					1,
					PAGE_SIZE,
					true,
				)

				if (loaded < PAGE_SIZE) {
					hasMore.current = false
				}

				// Ждем пока React отрисует сообщения
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						if (!messagesRef.current) return

						messagesRef.current.scrollTop =
							messagesRef.current.scrollHeight

						firstLoad.current = false
					})
				})
			} finally {
				loading.current = false
			}
		}

		init()

		return () => {
			cancelled = true
			leaveChat(chatId)
		}
	}, [chatId, user?.id, anotherUser?.id])

	// ======================
	// Скролл вниз после первой загрузки
	// ======================

	// useEffect(() => {
	// 	if (!chat?.messages?.length) return
	// 	if (!firstLoad.current) return

	// 	requestAnimationFrame(() => {
	// 		requestAnimationFrame(() => {
	// 			if (!messagesRef.current) return

	// 			messagesRef.current.scrollTop = messagesRef.current.scrollHeight

	// 			firstLoad.current = false
	// 		})
	// 	})
	// }, [chat?.messages?.length])

	// ======================
	// Создание IntersectionObserver
	// ======================

	useEffect(() => {
		if (!targetRef.current) return

		observer.current?.disconnect()

		observer.current = new IntersectionObserver(loadMore, {
			root: messagesRef.current,
			threshold: 0,
		})

		observer.current.observe(targetRef.current)

		return () => observer.current?.disconnect()
	}, [chat?.messages?.length])

	// ======================
	// Загрузка первой страницы
	// ======================

	async function loadFirstMessages() {
		if (!chatId) return

		loading.current = true

		try {
			const loaded = await getMessagesFromChat(chatId, 1, PAGE_SIZE, true)

			if (loaded < PAGE_SIZE) {
				hasMore.current = false
			}
		} finally {
			loading.current = false
		}
	}

	// ======================
	// Загрузка следующих страниц
	// ======================

	async function loadMore([entry]: IntersectionObserverEntry[]) {
		if (!entry.isIntersecting) return
		if (loading.current) return
		if (!hasMore.current) return
		if (!chatId) return

		loading.current = true

		try {
			page.current++

			const loaded = await getMessagesFromChat(
				chatId,
				page.current,
				PAGE_SIZE,
				false,
			)

			if (loaded < PAGE_SIZE) {
				hasMore.current = false
				observer.current?.disconnect()
			}
		} finally {
			loading.current = false
		}
	}

	// ======================
	// Прокрутка вниз
	// ======================

	function scrollToBottom() {
		if (!messagesRef.current) return

		messagesRef.current.scrollTop = messagesRef.current.scrollHeight
	}

	// ======================
	// Отправка сообщения
	// ======================

	function sendMessage(data: SendMessageForm) {
		if (!chatId) return
		if (!user) return
		if (!anotherUser) return
		if (!chat) return

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
											props.mode === "chat"
												? anotherUser?.avatar ||
													DEFAULT_AVATAR
												: chat?.avatar?.base64 ||
													DEFAULT_AVATAR
										}
										className={styles.avatar}
										alt=""
									/>

									<p className={styles.chatName}>
										{props.mode === "chat"
											? anotherUser?.first_name
												? `${anotherUser.first_name} ${anotherUser.last_name}`
												: anotherUser?.username
											: (chat?.name ?? "Назва групи")}
									</p>
								</div>
							</div>
						</div>

						<div className={styles.headerLine}></div>
					</div>

					<div className={styles.messagesList} ref={messagesRef}>
						{chat?.messages?.map((message, index) => {
							console.log(chat?.messages)
							console.log(chat?.messages?.length)
							return (
								<Fragment key={message.id}>
									{index === PRELOAD_OFFSET && (
										<div
											ref={targetRef}
											style={{ height: 1 }}
										/>
									)}

									{message.senderId === user?.id ? (
										<MyMessageEntity
											text={message.text}
											created_at={
												new Date(
													message.created_at as string,
												)
											}
											readers={message.readers ?? []}
										/>
									) : (
										<OtherMessageEntity
											id={message.id}
											text={message.text}
											created_at={
												new Date(
													message.created_at as string,
												)
											}
											readers={message.readers ?? []}
											user={message.sender}
											mode={
												props.mode === "chat"
													? props.mode
													: "chat"
											}
										/>
									)}
								</Fragment>
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
