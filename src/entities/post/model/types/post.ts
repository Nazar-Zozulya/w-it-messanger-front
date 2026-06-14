import { Image } from "../../../image"
import { Tag } from "../../../tag"
import { UserToPost } from "../../../user"

export interface Post {
    id: number
    title: string
    content?: string

    authorId: number
    author: UserToPost

    images?: Image[]
    views: number
    likes: number
    tags?: Tag[]
    links?: string[]
}