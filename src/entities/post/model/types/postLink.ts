import { Post } from "./post"

export interface PostLink {
    id: number
    url: string
    post: Post
    postId: number
}