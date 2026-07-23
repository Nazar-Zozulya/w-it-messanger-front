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
import { Fragment, useEffect, useRef } from "react"

const PAGE_SIZE = 7
const PRELOAD_OFFSET = PAGE_SIZE - 1

export function ChatNotificationsBlock() {
	const { chats, getIndividualChats } = useChatsManager()
	const { user } = useUserContext()

	const page = useRef(1)

	const observer = useRef<IntersectionObserver | null>(null)
	const targetRef = useRef<HTMLDivElement>(null)

	const loading = useRef(false)
	const hasMore = useRef(true)

	const navigate = useNavigate()

	useEffect(() => {
		const element = targetRef.current

		if (!element) return

		observer.current?.disconnect()

		observer.current = new IntersectionObserver(async ([entry]) => {
			if (!entry.isIntersecting) return
			if (loading.current) return
			if (!hasMore.current) return

			loading.current = true

			try {
				let loadedCount = 0

				page.current++

				console.log("page =", page.current)
				if (!user) return

				loadedCount = await getIndividualChats(
					user?.id,
					page.current,
					PAGE_SIZE,
				)

				if (loadedCount < PAGE_SIZE) {
					hasMore.current = false
					observer.current?.disconnect()
				}
			} finally {
				loading.current = false
			}
		})

		observer.current.observe(element)

		return () => observer.current?.disconnect()
	}, [user])

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
					{chats?.map((chat, index) => {
						if (chat.is_group === true) return
						const anotherUser = chat.users.find(
							(chatUser) => chatUser.id !== user?.id,
						)

						return (
							<Fragment key={chat.id}>
								{index === chats?.length - PRELOAD_OFFSET && (
									<div
										ref={targetRef}
										style={{ height: 1 }}
									/>
								)}

								<AnotherUserChatCard
									username={anotherUser?.username ?? ""}
									name={anotherUser?.first_name}
									surname={anotherUser?.last_name}
									avatar={anotherUser?.avatar}
									lastMessage={
										chat.messages[
											chat.messages.length - 1
										] ?? []
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
							</Fragment>
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
