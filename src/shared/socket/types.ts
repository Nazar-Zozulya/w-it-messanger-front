export interface newMessageCredentials {
    chatId: number
	receiversId: number[]
	senderId: number
	text: string
}

export interface newGroupMessageCredentials {
    chatId: number
	receiversIds: number[]
	senderId: number
	text: string
}

export interface seeMessageCredentials {
    messageId: number
	readerId: number
}