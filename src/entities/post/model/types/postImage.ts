import { Post } from "./post"

export interface PostImage {
    id: number
    original_image: string
    compressed_image: string
    post: Post
    postId: number
}