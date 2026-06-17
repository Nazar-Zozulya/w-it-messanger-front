import { Message } from "../../../chat"

export interface AbotherUserCardProps {
    avatar?: string
    name?: string | null
    surname?: string | null
    username: string
    function? :() => void
}

export interface AbotherUserChatCardProps {
    avatar?: string
    id: number
    name?: string | null
    surname?: string | null
    username: string
    lastMessage: Omit<Message, "createdAt">
    createdAt?: Date
    function? :() => void
}