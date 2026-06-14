import { io } from "socket.io-client"

export const SOCKET_URL = "http://localhost:8002"

export const createSocket = (namespace?: string) => {
	const socket = io(`${SOCKET_URL}/${namespace}`)

	return socket
}
