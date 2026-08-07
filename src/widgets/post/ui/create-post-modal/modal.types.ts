import { Post } from "../../../../entities/post/model/types"

export interface createPostForm {
	title: string
	content?: string

	// authorId: number

	// images?: string[]

	// tags: string[]
	// links: string[]
}

export interface createPostModalProps {
	mode: "create" | "update"
}
