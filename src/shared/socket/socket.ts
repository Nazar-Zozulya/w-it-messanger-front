import { io } from "socket.io-client"

export const SOCKET_URL = "ws://localhost:8002"

export const createSocket = () => {
	const socket = io(SOCKET_URL)

	return socket
}
