import { create } from "zustand"
import { Chat, Message } from "../types"
import { POST } from "../../../../helpers/post"
import { GET } from "../../../../helpers/get"
import { Result } from "../../../../types/result"

interface ChatsManagerStoreTypes {
	chats: Chat[] | null
	getChat: (userId: number, anotherUserId: number) => Promise<Result<Chat>>
	// getMessagesFromChat: (chatId: number) => void
	getIndividualChats: (userId: number) => void
}

export const useChatsManager = create<ChatsManagerStoreTypes>((set, get) => ({
	chats: null,
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

		set({ chats: updatedChats })

		return getChat
	},
	// getMessagesFromChat: async (chatId) => {
	// 	const getMessages = await GET<Message[]>({
	// 		whichService: "chatService",
	// 		endpoint: `api/chat/message/${chatId}`,
	// 	})

	// 	if (getMessages.status === "error") return

	// 	const chats = get().chats

	// 	let selectedChat = chats?.find((chat) => chat.id === chatId) as Chat

	// 	selectedChat = { ...selectedChat, messages: getMessages.data }

	// 	const updatedChats = chats?.map((chat) => {
	// 		if (chat.id === selectedChat.id) {
	// 			return selectedChat
	// 		}
	// 		return chat
	// 	})

	// 	set({ chats: updatedChats })
	// },
	getIndividualChats: async (userId) => {
		const getChats = await GET<Chat[]>({
			whichService: "chatService",
			endpoint: `api/chat/chats/${userId}`,
		})

		if (getChats.status === "error") return

		console.log("chats: ", getChats.data)

		set({ chats: getChats.data })

	},
}))
