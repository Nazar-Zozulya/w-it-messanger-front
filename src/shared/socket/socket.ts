import { HubConnectionBuilder } from "@microsoft/signalr"
import { io } from "socket.io-client"
import { servicesUrlPath } from "../../constants/api"

export const SOCKET_URL = servicesUrlPath.chatService

export const createSocket = (namespace?: string) => {
	const socket = io(`${SOCKET_URL}/${namespace}`)

	return socket
}

export function createConnection(hub: string, token: string) {
	console.log(`${SOCKET_URL}/${hub}`)
	return new HubConnectionBuilder()
		.withUrl(`${SOCKET_URL}/${hub}`, {
			accessTokenFactory: () => token ?? "",
		})
		.withAutomaticReconnect()
		.build()
}