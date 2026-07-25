import { User } from "../../../../entities/user"

export interface PostsListProps {
    mode: "main" | "myPosts" | "anotherUser"
    anotherUser: User | null
}