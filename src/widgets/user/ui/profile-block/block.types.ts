import { User } from "../../../../entities/user"

export interface ProfileBlockProps {
	anotherUser?: User
	mode: "main" | "myPosts" | "anotherUser"
}
