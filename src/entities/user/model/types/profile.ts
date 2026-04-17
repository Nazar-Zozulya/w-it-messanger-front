import { User, Avatar } from "."

export interface Profile {
    id: number

    user: User
    userId: number
    
    signature?: string

    dateOfBirth?: Date | string

    avatars: Avatar[]
}