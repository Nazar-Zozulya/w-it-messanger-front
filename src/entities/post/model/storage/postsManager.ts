import { create } from "zustand"
import { GET } from "../../../../helpers/get"
import { Result } from "../../../../types/result"
import { createPostData, Post } from "../types"
import { POST } from "../../../../helpers/post"
// import { error } from "console"

interface PostsManagerStoreTypes {
	posts: Post[] | null
	getPosts: () => void
	deletePost: (postId: number, userId: number) => Promise<Result<Post>>
	createPost: (data: createPostData) => Promise<Result<Post>>
}

export const usePostsManager = create<PostsManagerStoreTypes>((set, get) => ({
	posts: null,

	getPosts: async () => {
		try {
			const response = await GET<Post[]>({
				whichService: "postService",
				endpoint: "api/post/all",
			})

			if (response.status === "success") {
				set({ posts: response.data })
			}

			console.log(response, "posts response")
		} catch (e) {
			console.log("Error fetching posts:", e)
		}
	},

	deletePost: async (postId, userId) => {
		try {
			const response = await POST<Post>({
				whichService: "postService",
				endpoint: "api/post/delete",
				method: "DELETE",
				body: { id: postId, userId },
			})

			if (response.status === "error") return response

			const newPosts = get().posts?.filter((post) => {
				return post.id !== postId
			})

			set({ posts: newPosts })
			return response
		} catch (e) {
			console.log("Error fetching posts:", e)
			return {status: "error", message: "problem with deleting post"}
		}
	},

	createPost: async (data) => {
		try {
			const response = await POST<Post>({
				whichService: "postService",
				endpoint: "api/post/create",
				body: data,
			})

			if (response.status === "error") return response

			const posts = get().posts

			if (!posts) {
				set({ posts: [response.data] })
			} else {
				const newPosts = [...posts, response.data]

				set({ posts: newPosts })
			}
			return response
		} catch (e) {
			console.log("Error fetching posts:", e)
			return { status: "error", message: "error wirh creating post" }
		}
	},
}))
