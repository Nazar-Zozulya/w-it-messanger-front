import { User, Avatar } from "."

export interface Profile {
    id: number

    user: User
    userId: number
    
    signature?: string

    dateOfBirth?: Date | string

    activeAvatar?: string | undefined

    activeAvatarId?: number | undefined

    avatars: Avatar[]
}