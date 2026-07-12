import { create } from "zustand"
import { GET } from "../../../../helpers/get"
import { Result } from "../../../../types/result"
import { createPostData, Post } from "../types"
import { POST } from "../../../../helpers/post"
// import { error } from "console"

interface PostsManagerStoreTypes {
	posts: Post[] | null
	myPosts: Post[] | null
	getPosts: (page: number, size: number) => void
	getMyPosts: (id: number) => void
	deletePost: (postId: number, userId: number) => Promise<Result<Post>>
	createPost: (data: createPostData, token: string) => Promise<Result<Post>>
}

export const usePostsManager = create<PostsManagerStoreTypes>((set, get) => ({
	posts: null,
	myPosts: null,

	getPosts: async (page: number, size: number) => {
		try {
			const response = await GET<Post[]>({
				whichService: "postService",
				endpoint: `api/post/all/?page=${page}&size=${size}`,
			})

			if (response.status === "success") {
				console.log("SUCCESS")

				const oldPosts = get().posts
				console.log("oldPosts", oldPosts)
				console.log("response.data", response.data)

				if (!oldPosts) {
					console.log("SET 1")
					set({ posts: response.data })
				} else {
					console.log("SET 2")
					set({ posts: [...oldPosts, ...response.data] })
				}

				console.log("after set", get().posts)
			}

			console.log(response, "posts response")
		} catch (e) {
			console.log("Error fetching posts:", e)
		}
	},
	getMyPosts: async (id) => {
		try {
			const response = await GET<Post[]>({
				whichService: "postService",
				endpoint: `api/post/all/${id}`,
			})

			if (response.status === "success") {
				set({ myPosts: response.data })
			}

			console.log(response, "my posts response")
		} catch (e) {
			console.log("Error fetching my posts:", e)
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

			const myNewPosts = get().myPosts?.filter((post) => {
				return post.id !== postId
			})

			set({ posts: newPosts, myPosts: myNewPosts })
			return response
		} catch (e) {
			console.log("Error fetching posts:", e)
			return { status: "error", message: "problem with deleting post" }
		}
	},

	createPost: async (data, token) => {
		try {
			console.log("new posts data:", data)

			const response = await POST<Post>({
				whichService: "postService",
				endpoint: "api/post/create",
				body: data,
				token,
			})

			if (response.status === "error") return response

			const posts = get().posts

			const myPosts = get().myPosts

			if (!posts) {
				set({ posts: [response.data] })
			} else {
				const newPosts = [...posts, response.data]
				set({ posts: newPosts })
			}

			if (!myPosts) {
				set({ myPosts: [response.data] })
			} else {
				const myNewPosts = [...myPosts, response.data]
				set({ myPosts: myNewPosts })
			}

			return response
		} catch (e) {
			console.log("Error fetching posts:", e)
			return { status: "error", message: "error wirh creating post" }
		}
	},
}))
