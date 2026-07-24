import { User, Album, AlbumImage } from "."

export interface Profile {
	id: number

	user: User
	userId: number

	signature?: string

	birth_date?: Date | string

	avatar?: AlbumImage
	avatarId?: number

    pseudonym: string

    is_image_signature: boolean

    is_text_signature: boolean
    
    albums: Album[]

	// activeAvatar?: Avatar | undefined

	// activeAvatarId?: number | undefined

	// avatars: Avatar[]
}
