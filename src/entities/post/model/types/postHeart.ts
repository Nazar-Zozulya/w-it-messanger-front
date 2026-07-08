import { User } from "../../../user"
import { Post } from "./post"

export interface PostHeart {
	id: number
	user: User
	userId: number
	post: Post
	postId: number
}
