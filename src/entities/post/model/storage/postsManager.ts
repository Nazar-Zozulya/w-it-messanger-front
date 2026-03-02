import { create } from "zustand"
import { GET } from "../../../../helpers/get"
import { Result } from "../../../../types/result"
import { createPostData, Post } from "../types"
import { POST } from "../../../../helpers/post"

interface PostsManagerStoreTypes {
	posts: Post[] | null
	getPosts: () => void
	deletePost: (postId: number, userId: number) => void
	createPost: (data: createPostData) => void
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

			if (response.status === "success") {
				const newPosts = get().posts?.filter((post) => {
					return post.id !== postId
				})

				set({ posts: newPosts })
			}
		} catch (e) {
			console.log("Error fetching posts:", e)
		}
	},

	createPost: async (data) => {
		try {
			const response = await POST<Post>({
				whichService: "postService",
				endpoint: "api/post/create",
				body: data,
			})

			if (response.status === "success") {
				const posts = get().posts

				if (!posts) set({ posts: [response.data] })
				else {
					console.log(response.data)

					const newPost = {...response.data, }

					const newPosts = [...posts, response.data]

					console.log("new posts: ", newPosts)

					set({ posts: newPosts })
				}
			}
		} catch (e) {
			console.log("Error fetching posts:", e)
		}
	},
}))
