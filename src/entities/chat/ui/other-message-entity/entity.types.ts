import { Image } from "../../../image"
import { UserToChat } from "../../../user"

export interface OtherMessageEntityProps {
    text: string
    images?: Image[]
    createdAt: Date
    readers: UserToChat[]
    user: UserToChat
}