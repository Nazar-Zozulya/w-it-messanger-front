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
	Chat,
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

	const { getMessagesFromChat, getChatById } = useChatsManager()
	const chats = useChatsManager((s) => s.chats)

	const { user } = useUserContext()
	const { id } = useParams()

	const chat = chats?.find((c) => c.id === Number(id))

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

	useEffect(() => {
		if (!chat?.id || !user) return

		let cancelled = false

		const init = async () => {
			page.current = 1
			hasMore.current = true
			firstLoad.current = true

			loading.current = true

			try {
				await enterChat(chat?.id ?? 0)

				if (cancelled) return

				const loaded = await getMessagesFromChat(
					chat?.id ?? 0,
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
			leaveChat(chat?.id ?? 0)
		}
	}, [chat?.id, user?.id])

	useEffect(() => {
		async function fetchChat() {
			if (!id) return
			if (chat) return

			const response = await getChatById(+id)
		}

		fetchChat()
	}, [id])

	useEffect(() => {
		console.log("current chat:", chat)
		console.log("chatId:", chat?.id)
	}, [chat, chat?.id])

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

	async function loadFirstMessages() {
		if (!chat?.id) return

		loading.current = true

		try {
			const loaded = await getMessagesFromChat(
				chat?.id,
				1,
				PAGE_SIZE,
				true,
			)

			if (loaded < PAGE_SIZE) {
				hasMore.current = false
			}
		} finally {
			loading.current = false
		}
	}

	async function loadMore([entry]: IntersectionObserverEntry[]) {
		if (!entry.isIntersecting) return
		if (loading.current) return
		if (!hasMore.current) return
		if (!chat?.id) return

		loading.current = true

		try {
			page.current++

			const loaded = await getMessagesFromChat(
				chat?.id,
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

	function scrollToBottom() {
		if (!messagesRef.current) return

		messagesRef.current.scrollTop = messagesRef.current.scrollHeight
	}

	function sendMessage(data: SendMessageForm) {
		if (!chat?.id) return
		if (!user) return
		// if (!anotherUser) return
		if (!chat) return

		console.log("chat.avatar_url: ", chat.avatar_url)
		console.log(chat)
		console.log(chat?.messages)
		console.log(chat?.messages?.length)

		sendNewMessage({
			chatId: chat.id,
			receiversId: chat?.users.map((u) => u.id),
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
											props.mode === "chat" &&
											!chat?.is_group
												? (chat?.users.find(
														(u) =>
															u.id !== user?.id,
													)?.avatar ?? DEFAULT_AVATAR)
												: (chat?.avatar_url ??
													DEFAULT_AVATAR)
										}
										className={styles.avatar}
										alt=""
									/>

									<p className={styles.chatName}>
										{props.mode === "chat" &&
										!chat?.is_group
											? chat?.users.find(
													(u) => u.id !== user?.id,
												)?.first_name
												? `${chat?.users.find((u) => u.id !== user?.id)?.first_name} ${chat?.users.find((u) => u.id !== user?.id)?.last_name}`
												: chat?.users.find(
														(u) =>
															u.id !== user?.id,
													)?.username
											: (chat?.name ??
												chat?.users.map(
													(u) => `${u?.first_name}, `,
												))}
									</p>
								</div>
							</div>
						</div>

						<div className={styles.headerLine}></div>
					</div>

					<div className={styles.messagesList} ref={messagesRef}>
						{chat?.messages?.map((message, index) => {
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
							{window.matchMedia("(pointer: fine)").matches && (
								<Button
									fill={false}
									type="button"
									icon={<Smile width={20} height={20} />}
									function={() => {
										send("rooms", {})
									}}
								/>
							)}
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
