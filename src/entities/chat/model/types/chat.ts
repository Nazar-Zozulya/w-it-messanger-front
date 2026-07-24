import { Message } from "."
import { Image } from "../../../image"
import { UserToChat } from "../../../user"

export interface Chat {
    id: number
    name?: string
    is_group: boolean
    avatar_url?: string
    avatar_publicId?: number
    users: UserToChat[]
    admin: UserToChat
    adminId: number
    // createdAt: Date
    // updatedAt: Date
    messages: Message[]
}