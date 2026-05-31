import { Profile } from "./profile"
import { Image } from '../../../image'

export interface Avatar {
    id: number

    image: Image
    imageId: number

    active: boolean
    shown: boolean

    profile: Profile
    profileId: number
}