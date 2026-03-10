import { Profile } from "./profile"

export interface Avatar {
    id: number

    image: string

    active: boolean
    shown: boolean

    profile: Profile
    profileId: number
}