import { create } from "zustand";
import { GET } from "../../../../helpers/get";
import { Result } from "../../../../types/result";
import { Post } from "../types";





interface PostsManagerStoreTypes {
    posts: Post[] | null
    getPosts: () => void
}


export const usePostsManager = create<PostsManagerStoreTypes>((set) => ({
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
}))