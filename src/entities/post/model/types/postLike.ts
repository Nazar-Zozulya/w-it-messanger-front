import { User } from "../../../user"
import { Post } from "./post"

export interface PostLike {
    id: number
    user: User
    userId: number
    post: Post
    postId: number
}