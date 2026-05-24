import { User } from "./user"
import { Image } from '../../../image/model/types'

export interface Album {
    id: number
    name: string
    createdAt: Date
    previewImage: string
    shown: boolean
    tag: string
    user: User
    images: Image[]
}