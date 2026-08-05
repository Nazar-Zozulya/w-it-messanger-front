import { createPostData, Post } from "../../model/types";

export interface PostCardProps {
    post: Post
    isGoToProfile: boolean
}

export interface LoadingPostCardProps {
    post: createPostData
}