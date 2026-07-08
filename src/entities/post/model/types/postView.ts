import { User } from "../../../user"
import { Post } from "./post"

export interface PostView {
	id: number
	user: User
	userId: number
	post: Post
	postId: number
}
