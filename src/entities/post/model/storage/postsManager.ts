import { create } from "zustand"
import { GET } from "../../../../helpers/get"
import { Result } from "../../../../types/result"
import { createPostData, Post } from "../types"
import { POST } from "../../../../helpers/post"

interface PostsManagerStoreTypes {
	posts: Post[] | null
	myPosts: Post[] | null
	preNewPosts: createPostData[] | null
	// ети функции возвращают количество постов которые они получили и хешируют их в сторедже ето надо для того чтоб не кидать лишние запросы если запрос дал меньше постов чем указано в сайзе
	getPosts: (page: number, size: number) => Promise<number>
	getMyPosts: (id: number, page: number, size: number) => Promise<number>

	// ета функция не кеширует посты в сторедже поетому она возвращает посты
	getUserPosts: (
		id: number,
		page: number,
		size: number,
	) => Promise<Result<Post[]>>

	deletePost: (postId: number, userId: number) => Promise<Result<Post>>
	createPost: (data: createPostData, token: string) => Promise<Result<Post>>

	clearAllPosts: () => void
}

export const usePostsManager = create<PostsManagerStoreTypes>((set, get) => ({
	posts: null,
	myPosts: null,
	preNewPosts: null,

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
				// const oldPosts = get().posts

				// if (!oldPosts) {
				// 	set({ posts: response.data })
				// } else {
				// 	set({ posts: [...oldPosts, ...response.data] })
				// }

				return response
			}

			return response
		} catch (e) {
			console.log("Error fetching posts:", e)
			return { status: "error", message: "error fetching posts" }
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

			const newPosts = get().posts?.filter((post) => post.id !== postId)

			const myNewPosts = get().myPosts?.filter(
				(post) => post.id !== postId,
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
			set({ preNewPosts: [...(get().preNewPosts ?? []), data] })

			const response = await POST<Post>({
				whichService: "postService",
				endpoint: "api/post/create",
				body: data,
				token,
			})

			if (response.status === "error") {
				set((state) => ({
					preNewPosts: state.preNewPosts?.filter(
						(post) => post !== data,
					),
				}))
				return response
			}

			set((state) => ({
				preNewPosts: state.preNewPosts?.filter((post) => post !== data),
			}))

			const posts = get().posts
			const myPosts = get().myPosts

			if (!posts) {
				set({ posts: [response.data] })
			} else {
				set({ posts: [response.data, ...posts] })
			}

			if (!myPosts) {
				set({ myPosts: [response.data] })
			} else {
				set({ myPosts: [response.data, ...myPosts] })
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

	clearAllPosts: () => {
		set({ posts: null, myPosts: null })
	},
}))
