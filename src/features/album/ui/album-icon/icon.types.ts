import { Album } from "../../../../entities/user"

export interface AlbumIconProps {
	id: number
	image: string
	created_at: Date
	is_shown: boolean
	album: Album
	albumId: number
	onDelete: (id: number) => void
	switchShown: (id: number) => void
}

export interface LoadingAlbumIconProps {
	image: string
}
