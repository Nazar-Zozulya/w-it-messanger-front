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

export function ChatNotificationsBlock(props: {
	mode: "notifications" | "groups" | "all"
}) {
	const { chats, getIndividualChats, getGroups } = useChatsManager()
	const { user } = useUserContext()

	const chatsPage = useRef(1)
	const groupsPage = useRef(1)

	const chatsObserver = useRef<IntersectionObserver | null>(null)
	const groupsObserver = useRef<IntersectionObserver | null>(null)

	const chatsTargetRef = useRef<HTMLDivElement>(null)
	const groupsTargetRef = useRef<HTMLDivElement>(null)

	const chatsLoading = useRef(false)
	const groupsLoading = useRef(false)

	const chatsHasMore = useRef(true)
	const groupsHasMore = useRef(true)

	const individualChats = chats?.filter((chat) => !chat.is_group) ?? []
	const groups = chats?.filter((chat) => chat.is_group) ?? []

	const navigate = useNavigate()

	useEffect(() => {
		const element = chatsTargetRef.current

		if (!element) return

		chatsObserver.current?.disconnect()

		chatsObserver.current = new IntersectionObserver(async ([entry]) => {
			if (!entry.isIntersecting) return
			if (chatsLoading.current) return
			if (!chatsHasMore.current) return
			if (!user) return

			chatsLoading.current = true

			try {
				chatsPage.current++

				const loadedCount = await getIndividualChats(
					user.id,
					chatsPage.current,
					PAGE_SIZE,
				)

				if (loadedCount < PAGE_SIZE) {
					chatsHasMore.current = false
					chatsObserver.current?.disconnect()
				}
			} finally {
				chatsLoading.current = false
			}
		})

		chatsObserver.current.observe(element)

		return () => chatsObserver.current?.disconnect()
	}, [user, individualChats.length])

	useEffect(() => {
		const element = groupsTargetRef.current
		console.log("groups effect")
		console.log(groupsTargetRef.current)

		if (!element) return

		groupsObserver.current?.disconnect()

		groupsObserver.current = new IntersectionObserver(async ([entry]) => {
			if (!entry.isIntersecting) return
			if (groupsLoading.current) return
			if (!groupsHasMore.current) return
			if (!user) return

			groupsLoading.current = true

			try {
				groupsPage.current++

				const loadedCount = await getGroups(
					user.id,
					groupsPage.current,
					PAGE_SIZE,
				)

				if (loadedCount < PAGE_SIZE) {
					groupsHasMore.current = false
					groupsObserver.current?.disconnect()
				}
			} finally {
				groupsLoading.current = false
			}
		})

		groupsObserver.current.observe(element)

		return () => groupsObserver.current?.disconnect()
	}, [user, groups.length])

	return (
		<div className={styles.container}>
			{props.mode !== "groups" && (
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
						{individualChats?.map((chat, index) => {
							if (chat.is_group === true) return
							const anotherUser = chat.users.find(
								(chatUser) => chatUser.id !== user?.id,
							)

							return (
								<Fragment key={chat.id}>
									{index ===
										individualChats?.length -
											PRELOAD_OFFSET && (
										<div
											ref={chatsTargetRef}
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
															chat.messages
																.length - 1
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
													anotherUserId:
														anotherUser?.id,
												},
											})

											if (response.status === "error") {
												console.log(
													"chat found or create problems",
												)
												return
											}
											navigate(
												`/chat/${response.data.id}`,
											)
										}}
									/>
								</Fragment>
							)
						})}
					</div>
				</div>
			)}
			{props.mode !== "notifications" && (
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
						{groups?.map((group, index) => {
							if (group.is_group === false) return
							const anotherUser = group.users.find(
								(groupUser) => groupUser.id !== user?.id,
							)

							return (
								<Fragment key={group.id}>
									{index ===
										groups?.length - PRELOAD_OFFSET && (
										<div
											ref={groupsTargetRef}
											style={{ height: 1 }}
										/>
									)}

									<AnotherUserGroupCard
										name={group.name ?? "Нова група"}
										// name={anotherUser?.name}
										// surname={anotherUser?.surname}
										lastMessage={
											group.messages[
												group.messages.length - 1
											] ?? []
										}
										avatar={group.avatar_url}
										id={group.id}
										created_at={
											group.messages.length === 0
												? undefined
												: new Date(
														group.messages[
															group.messages
																.length - 1
														].created_at as string,
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
								</Fragment>
							)
						})}
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
			)}
		</div>
	)
}
