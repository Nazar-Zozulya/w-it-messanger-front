import { Image } from "../../../image"
import { UserToChat } from "../../../user"

export interface MyMessageEntityProps {
    text: string
    images?: Image[]
    createdAt: Date
    readers: UserToChat[]
}