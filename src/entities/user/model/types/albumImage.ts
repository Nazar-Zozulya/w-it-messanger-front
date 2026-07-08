import { Album } from "./album"

export interface AlbumImage {
    id: number
    created_at: Date
    is_shown: boolean
    album: Album
    albumId: number
}