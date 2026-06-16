export interface newMessageCredentials {
    chatId: number
	receiverId: number
	senderId: number
	text: string
}

export interface seeMessageCredentials {
    messageId: number
	readerId: number
}