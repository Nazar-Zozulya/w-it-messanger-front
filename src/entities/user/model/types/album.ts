import { Profile } from "./profile"
import { AlbumImage } from "./albumImage"

export interface Album {
    id: number
    name: string
    theme: string
    year: number

    created_at: Date

    is_shown: boolean

    is_default: string

    profile: Profile

    previewImage: string
    images: AlbumImage[]
}