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
    tags?: string[] //TODO сделать тег
    links?: string[]
}