import { create } from "zustand"
import { GET } from "../../../../helpers/get"
import { Result } from "../../../../types/result"
import { createPostData, Post } from "../types"
import { POST } from "../../../../helpers/post"

interface PostsManagerStoreTypes {
	posts: Post[] | null
	myPosts: Post[] | null
	getPosts: (page: number, size: number) => Promise<number>
	getMyPosts: (id: number, page: number, size: number) => Promise<number>
	getUserPosts: (id: number, page: number, size: number) => Promise<number>
	deletePost: (postId: number, userId: number) => Promise<Result<Post>>
	createPost: (
		data: createPostData,
		token: string
	) => Promise<Result<Post>>
}

export const usePostsManager = create<PostsManagerStoreTypes>((set, get) => ({
	posts: null,
	myPosts: null,

	getPosts: async (page, size) => {
		try {
			const response = await GET<Post[]>({
				whichService: "postService",
				endpoint: `api/post/all/?page=${page}&size=${size}`,
			})

			if (response.status === "success") {
				const oldPosts = get().posts

				if (!oldPosts) {
					set({ posts: response.data })
				} else {
					set({ posts: [...oldPosts, ...response.data] })
				}

				return response.data.length
			}

			return 0
		} catch (e) {
			console.log("Error fetching posts:", e)
			return 0
		}
	},

	getMyPosts: async (id, page, size) => {
		try {
			const response = await GET<Post[]>({
				whichService: "postService",
				endpoint: `api/post/all/${id}?page=${page}&size=${size}`,
			})

			if (response.status === "success") {
				set((state) => ({
					myPosts: [...(state.myPosts ?? []), ...response.data],
				}))

				return response.data.length
			}

			return 0
		} catch (e) {
			console.log("Error fetching my posts:", e)
			return 0
		}
	},

	getUserPosts: async (id, page, size) => {
		try {
			const response = await GET<Post[]>({
				whichService: "postService",
				endpoint: `api/post/all/${id}?page=${page}&size=${size}`,
			})

			if (response.status === "success") {
				// Если потом вынесешь anotherUserPosts в Zustand,
				// то поменяешь это место.
				const oldPosts = get().posts

				if (!oldPosts) {
					set({ posts: response.data })
				} else {
					set({ posts: [...oldPosts, ...response.data] })
				}

				return response.data.length
			}

			return 0
		} catch (e) {
			console.log("Error fetching posts:", e)
			return 0
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

			const newPosts = get().posts?.filter(
				(post) => post.id !== postId
			)

			const myNewPosts = get().myPosts?.filter(
				(post) => post.id !== postId
			)

			set({
				posts: newPosts,
				myPosts: myNewPosts,
			})

			return response
		} catch (e) {
			console.log("Error deleting post:", e)

			return {
				status: "error",
				message: "problem with deleting post",
			}
		}
	},

	createPost: async (data, token) => {
		try {
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
				set({ posts: [...posts, response.data] })
			}

			if (!myPosts) {
				set({ myPosts: [response.data] })
			} else {
				set({ myPosts: [...myPosts, response.data] })
			}

			return response
		} catch (e) {
			console.log("Error creating post:", e)

			return {
				status: "error",
				message: "error with creating post",
			}
		}
	},
}))