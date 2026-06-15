import { UserToChat } from "../../../user"
import { Image } from "../../../image"
import { Chat } from "./chat"

export interface Message {
    id: number
    text: string
    createdAt: Date | string
    updatedAt: Date | string
    sender: UserToChat
    senderId: number
    readers: UserToChat[]
    images: Image[]
    chat: Chat
    chatId: number
}