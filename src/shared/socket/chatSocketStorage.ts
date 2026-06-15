import { create } from "zustand"
import { Socket } from "socket.io-client"
import { createSocket } from "./socket"
import { Result } from "../../types/result"
import { newMessageCredentials } from "./types"
import { Message } from "../../entities/chat"
import { useChatsManager } from "../../entities/chat"

interface SocketStore {
	socket: Socket | null
	isConnected: boolean

	connect: () => void
	disconnect: () => void

	send: <T>(event: string, data: T) => void
	sendNewMessage: (data: newMessageCredentials) => void
	enterChat: (chatId: number) => void
}

export const useChatSocketStore = create<SocketStore>((set, get) => ({
	socket: null,
	isConnected: false,

	connect: () => {
		if (get().socket) return

		const socket = createSocket("chat")

		socket.on("connect", () => {
			console.log("socket connected:", socket.id)
			set({ isConnected: true })
		})

		// 💣 MAIN MESSAGE HANDLER (ONLY SOURCE OF TRUTH)
		socket.on("message:new", (message: Message) => {
			const { setChats } = useChatsManager.getState()

			console.log("message:new:", message)

			setChats((prev) => {
				if (!prev) return []

				return prev.map((chat) => {
					if (Number(chat.id) !== Number(message.chatId)) {
						return chat
					}

					return {
						...chat,
						messages: [
							...(chat.messages ?? []),
							message,
						],
					}
				})
			})
		})

		socket.on("disconnect", () => {
			console.log("socket disconnected")
			set({
				socket: null,
				isConnected: false,
			})
		})

		set({ socket })
	},

	disconnect: () => {
		const socket = get().socket

		socket?.disconnect()

		set({
			socket: null,
			isConnected: false,
		})
	},

	send: (event, data) => {
		get().socket?.emit(event, data)
	},

	// 💣 IMPORTANT: NO setChats HERE
	sendNewMessage: (data) => {
		get().socket?.emit("message:send", data)
	},

	enterChat: (chatId) => {
		get().socket?.emit("chat:join", chatId)
	},
}))