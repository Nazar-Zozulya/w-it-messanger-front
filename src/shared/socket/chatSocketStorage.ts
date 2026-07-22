import { create } from "zustand"
import { Socket } from "socket.io-client"
import { createSocket, createConnection } from "."
import { Result } from "../../types/result"
import {
	newGroupMessageCredentials,
	newMessageCredentials,
	seeMessageCredentials,
} from "./types"
import { Message } from "../../entities/chat"
import { useChatsManager } from "../../entities/chat"
import { HubConnection } from "@microsoft/signalr"
import { emit } from "../../helpers/emit-socket"

interface SocketStore {
	socket: Socket | null
	connection: HubConnection | null
	isConnected: boolean

	connectSocket: () => void
	connectSignalR: (token: string) => void
	disconnect: () => void

	send: <T>(event: string, data: T) => void
	sendNewMessage: (data: newMessageCredentials) => void
	// sendNewGroupMessage: (data: newGroupMessageCredentials) => void
	seeMessage: (data: seeMessageCredentials) => void
	// seeGroupMessage: (data: seeMessageCredentials) => void
	enterChat: (chatId: number) => void
	leaveChat: (chatId: number) => void
}

export const useChatSocketStore = create<SocketStore>((set, get) => ({
	socket: null,
	connection: null,
	isConnected: false,

	connectSocket: () => {
		if (get().socket) return

		const socket = createSocket("chat")

		socket.on("connect", () => {
			set({ isConnected: true })
		})

		// 💣 MAIN MESSAGE HANDLER (ONLY SOURCE OF TRUTH)
		socket.on("message:new", (message: Message) => {
			const { setChats } = useChatsManager.getState()

			console.log(message)

			setChats((prev) => {
				if (!prev) return []

				return prev.map((chat) => {
					if (Number(chat.id) !== Number(message.chatId)) {
						return chat
					}

					return {
						...chat,
						messages: [...(chat.messages ?? []), message],
					}
				})
			})
		})

		socket.on("message:saw", (message: Message) => {
			const { setChats } = useChatsManager.getState()

			setChats((prev) => {
				if (!prev) return []

				return prev.map((chat) => {
					if (Number(chat.id) !== Number(message.chatId)) {
						return chat
					}

					return {
						...chat,
						messages: chat.messages?.map((oldMessage) => {
							if (oldMessage.id !== message.id) {
								return oldMessage
							}

							return {
								...oldMessage,
								readers: message.readers,
							}
						}),
					}
				})
			})
		})

		socket.on("disconnect", () => {
			set({
				socket: null,
				isConnected: false,
			})
		})

		set({ socket })
	},

	connectSignalR: async (token) => {
		if (get().connection) return

		const connection = createConnection("chat", token)

		connection.on("message:new", (message: Message) => {
			const { setChats } = useChatsManager.getState()

			setChats((prev) => {
				if (!prev) return []

				return prev.map((chat) => {
					if (Number(chat.id) !== Number(message.chatId)) {
						return chat
					}

					return {
						...chat,
						messages: [...(chat.messages ?? []), message],
					}
				})
			})
		})

		connection.on("message:saw", (message: Message) => {
			const { setChats } = useChatsManager.getState()

			setChats((prev) => {
				if (!prev) return []

				return prev.map((chat) => {
					if (Number(chat.id) !== Number(message.chatId)) {
						return chat
					}

					return {
						...chat,
						messages: chat.messages?.map((oldMessage) => {
							if (oldMessage.id !== message.id) {
								return oldMessage
							}

							return {
								...oldMessage,
								readers: message.readers,
							}
						}),
					}
				})
			})
		})

		connection.onclose(() => {
			set({
				connection: null,
				isConnected: false,
			})
		})

		await connection.start()

		set({
			connection,
			isConnected: true,
		})
		set({ connection })
	},

	disconnect: () => {
		const socket = get().socket

		socket?.disconnect()

		set({
			socket: null,
			connection: null,
			isConnected: false,
		})
	},

	send: (event, data) => {
		emit(get().socket, get().connection, event, data)
		// get().socket?.emit(event, data)
	},

	sendNewMessage: (data) => {
		emit(get().socket, get().connection, "message:send", data)
		// get().socket?.emit("message:send", data)
	},

	// sendNewGroupMessage: (data) => {
	// 	get().socket?.emit("message-group:send", data)
	// },

	seeMessage: (data) => {
		emit(get().socket, get().connection, "message:see", data)
		// get().socket?.emit("message:see", data)
	},

	// seeGroupMessage: (data) => {
	// 	get().socket?.emit("message-group:see", data)
	// },

	enterChat: (chatId) => {
		emit(get().socket, get().connection, "chat:join", chatId)
		// try {
		// 	console.log("before invoke")

		// 	const result = await get().connection?.invoke("chat:join", chatId)

		// 	console.log("after invoke", result)
		// } catch (e) {
		// 	console.error("invoke error", e)
		// }
		// get().socket?.emit("chat:join", chatId)
	},

	leaveChat: (chatId) => {
		emit(get().socket, get().connection, "chat:leave", chatId)
		// get().socket?.emit("chat:leave", chatId)
	},
}))
