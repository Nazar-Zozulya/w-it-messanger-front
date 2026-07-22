import { create } from "zustand"
import { createConnection, createSocket } from "./socket"
import { Socket } from "socket.io-client"
import { Message, useChatsManager } from "../../entities/chat"
import { useUserStatusStore } from "../../entities/user"
import { UserStatus } from "../../entities/user/model/types"
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
	// sendNewMessage: (data: newMessageCredentials) => void
	enterGlobalChat: (userId: number) => void
	leaveGlobalChat: (userId: number) => void
	getStatuses: (userId: number) => void
}

export const useGlobalChatSocketStore = create<SocketStore>((set, get) => ({
	socket: null,
	connection: null,
	isConnected: false,

	connectSocket: () => {
		if (get().socket) return

		const socket = createSocket("global")

		socket.on("connect", () => {
			console.log(1111111)
			set({ isConnected: true })
		})

		socket.on("user:active", (id: number) => {
			useUserStatusStore.getState().setUserNewStatus("active", id)
		})

		socket.on("user:deactive", (id: number) => {
			useUserStatusStore.getState().setUserNewStatus("deactive", id)
		})

		socket.on("global-message:new", (message: Message) => {
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
						messages: [...(chat.messages ?? []), message],
					}
				})
			})
		})

		socket.on("user:all-statuses", (data: UserStatus[]) => {
			const { setInitialStatuses } = useUserStatusStore.getState()
			setInitialStatuses(data)
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
		
		const connection = createConnection("global", token)

		connection.on("user:active", (id: number) => {
			useUserStatusStore.getState().setUserNewStatus("active", id)
		})

		connection.on("user:deactive", (id: number) => {
			useUserStatusStore.getState().setUserNewStatus("deactive", id)
		})

		connection.on("global-message:new", (message: Message) => {
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
						messages: [...(chat.messages ?? []), message],
					}
				})
			})
		})

		connection.on("user:all-statuses", (data: UserStatus[]) => {
			const { setInitialStatuses } = useUserStatusStore.getState()
			setInitialStatuses(data)
		})

		connection.on("disconnect", () => {
			set({
				socket: null,
				isConnected: false,
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

		socket?.close()

		set({
			socket: null,
			isConnected: false,
		})
	},

	send: (event, data) => {
		const socket = get().socket

		emit(get().socket, get().connection, event, data)

		// socket?.emit(event, { data: data })
	},

	enterGlobalChat: (userId) => {
		console.log("2312312318238127893128973879127893========================")
		emit(get().socket, get().connection, "globalChat:join", userId)
		// get().socket?.emit("globalChat:join", chatId)
	},

	leaveGlobalChat: (userId) => {
		emit(get().socket, get().connection, "globalChat:leave", userId)
		// get().socket?.emit("globalChat:leave", chatId)
	},

	getStatuses: (userId) => {
		emit(get().socket, get().connection, "user:get-statuses", userId)
		// get().socket?.emit("user:get-statuses", userId)
	},
}))
