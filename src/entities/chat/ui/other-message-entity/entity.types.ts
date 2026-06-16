import { Image } from "../../../image"
import { UserToChat } from "../../../user"

export interface OtherMessageEntityProps {
    id: number
    text: string
    images?: Image[]
    createdAt: Date
    readers: UserToChat[]
    user: UserToChat
}