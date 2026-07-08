import { User, Album } from "."

export interface Profile {
	id: number

	user: User
	userId: number

	signature?: string

	birth_date?: Date | string

	avatar: string

    pseudonym: string

    is_image_signature: boolean

    is_text_signature: boolean
    
    albums: Album[]

	// activeAvatar?: Avatar | undefined

	// activeAvatarId?: number | undefined

	// avatars: Avatar[]
}
