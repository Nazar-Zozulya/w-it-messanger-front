import { Tag } from "../../../tag"
import { User } from "../../../user"

export interface Post {
    id: number
    title: string
    content?: string

    authorId: number
    author: User

    images?: string[]
    views: number
    likes: number
    tags?: Tag[] //TODO сделать тег
    links?: string[]
}