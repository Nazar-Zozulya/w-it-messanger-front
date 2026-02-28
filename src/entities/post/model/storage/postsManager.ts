import { create } from "zustand";
import { GET } from "../../../../helpers/get";
import { Result } from "../../../../types/result";
import { Post } from "../types";
import { POST } from "../../../../helpers/post";





interface PostsManagerStoreTypes {
    posts: Post[] | null
    getPosts: () => void
    deletePost: (postId: number) => void
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

    deletePost: async (postId) => {
        try {
            const response = await POST<Post>({
                whichService: "postService",
                endpoint: "api/post/delete",
                method: "DELETE",
                body: { id: postId }
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
    }
}))