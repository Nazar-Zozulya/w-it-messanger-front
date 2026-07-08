import { Image } from "../../../image"
import { Tag } from "../../../tag"
import { UserToPost } from "../../../user"
import { PostHeart } from "./postHeart"
import { PostImage } from "./postImage"
import { PostLike } from "./postLike"
import { PostLink } from "./postLink"
import { PostView } from "./postView"

export interface Post {
    id: number
    title: string
    topic?: string
    content?: string

    created_at: Date
    updated_at: Date

    authorId: number
    author: UserToPost

    images?: PostImage[]
    views?: PostView[]
    likes?: PostLike[]
    tags?: Tag[]
    links?: PostLink[]
    hearts?: PostHeart[]
}