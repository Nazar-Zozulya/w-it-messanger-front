import { User } from "../../../user"
import { UserToPost } from "../../../user/model/types/user"

export interface createPostData {
    title: string
    content?: string

    author: UserToPost

    images?: string[]

    tags?: string[]
    links?: string[]
}