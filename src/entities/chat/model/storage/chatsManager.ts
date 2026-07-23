import { create } from "zustand"
import { Chat, Message } from "../types"
import { POST } from "../../../../helpers/post"
import { GET } from "../../../../helpers/get"
import { Result } from "../../../../types/result"
import { User } from "../../../user"

interface ChatsManagerStoreTypes {
	chats: Chat[] | null
	setChats: (value: Chat[] | ((prev: Chat[] | null) => Chat[] | null)) => void
	// setGroups: (
	// 	value: Chat[] | ((prev: Chat[] | null) => Chat[] | null),
	// ) => void
	getChat: (userId: number, anotherUserId: number) => Promise<Result<Chat>>
	// getMessagesFromChat: (chatId: number) => void
	getIndividualChats: (
		userId: number,
		page: number,
		size: number,
	) => Promise<number>

	createGroup: (
		users: User[],
		name: string,
		adminId: number,
		avatar?: string,
	) => Promise<Result<Chat>>

	getMessagesFromChat: (
		chatId: number,
		page: number,
		size: number,
		replace: boolean,
	) => Promise<number>
	// getGroup: (groupId: number) => Promise<Result<Chat>>
	// getAllGroups: (userId: number) => void
}

export const useChatsManager = create<ChatsManagerStoreTypes>((set, get) => ({
	chats: null,
	groups: null,

	setChats: (value) =>
		set((state) => ({
			chats: typeof value === "function" ? value(state.chats) : value,
		})),

	// setGroups: (value) =>
	// 	set((state) => ({
	// 		groups: typeof value === "function" ? value(state.groups) : value,
	// 	})),

	getChat: async (userId, anotherUserId) => {
		const getChat = await POST<Chat>({
			whichService: "chatService",
			endpoint: "api/chat/get-chat",
			body: {
				userId,
				anotherUserId,
			},
		})

		if (getChat.status === "error") return getChat

		const allChats = get().chats

		const someChat = allChats?.some((chat) => chat.id === getChat.data.id)

		if (!someChat) {
			const updatedChats = [...(allChats ?? []), getChat.data]

			set({ chats: updatedChats })
		}

		const updatedChats = allChats?.map((chat) => {
			if (chat.id === getChat.data.id) {
				return getChat.data
			}
			return chat
		})

		console.log("updatedChats: ", updatedChats)

		set({ chats: updatedChats })

		return getChat
	},
	getIndividualChats: async (userId, page, size) => {
		const getChats = await GET<Chat[]>({
			whichService: "chatService",
			endpoint: `api/chat/chats/${userId}?page=${page}&size=${size}`,
		})

		if (getChats.status === "error") return 0

		set({ chats: [...(get().chats ?? []), ...getChats.data] })
		return getChats.data.length
	},
	createGroup: async (users, name, adminId, avatar) => {
		const newGroup = await POST<Chat>({
			whichService: "chatService",
			endpoint: "api/chat/group/create",
			body: {
				users,
				name,
				avatar,
				adminId,
			},
		})

		if (newGroup.status === "error") return newGroup

		const allGroups = get().chats

		set({ chats: [...(allGroups ?? []), newGroup.data] })

		return newGroup
	},

	getMessagesFromChat: async (chatId, page, size, replace = false) => {
		console.log("messages")
		console.log(get().chats)
		const messages = await GET<Message[]>({
			whichService: "chatService",
			endpoint: `api/chat/messages/${chatId}?page=${page}&size=${size}`,
		})

		if (messages.status === "error") return 0

		console.log("before set", get().chats)

		set((state) => ({
			chats: state.chats?.map((chat) =>
				chat.id === chatId
					? {
							...chat,
							messages: replace
								? messages.data
								: [
										...messages.data.filter(
											(m) =>
												!(chat.messages ?? []).some(
													(x) => x.id === m.id,
												),
										),
										...(chat.messages ?? []),
									],
						}
					: chat,
			),
		}))

		return messages.data.length
	},
	// getGroup: async (groupId) => {
	// 	const group = await GET<Chat>({
	// 		whichService: "chatService",
	// 		endpoint: `api/chat/group/${groupId}`,
	// 	})

	// 	if (group.status === "error") return group

	// 	const allGroups = get().groups ?? []

	// 	const exists = allGroups.some((item) => item.id === group.data.id)

	// 	if (exists) {
	// 		set({
	// 			groups: allGroups.map((item) =>
	// 				item.id === group.data.id ? group.data : item,
	// 			),
	// 		})
	// 	} else {
	// 		set({
	// 			groups: [...allGroups, group.data],
	// 		})
	// 	}

	// 	return group
	// },
	// getAllGroups: async (userId) => {
	// 	const gettedGroups = await GET<Chat[]>({
	// 		whichService: "chatService",
	// 		endpoint: `api/chat/groups/${userId}`,
	// 	})

	// 	if (gettedGroups.status === "error") return

	// 	set({ groups: gettedGroups.data })
	// },
}))
