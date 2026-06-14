import { Profile } from ".";
import { Image } from '../../../image/model/types'
import { Album } from "./album";

export interface User{
    id: number;

    email: string;
    password: string;

    profile: Profile
    profileId: number

    name?: string;
    surname?: string;
    username: string;

    images: Image[];
    albums: Album[]

    lastLogin?: Date | string
    createdAt: Date | string
    updatedAt?: Date | string
}

export type UserToPost = Pick<User, "name" | "surname" | "username" | "id" > & {
    avatar?: string
}

export type UserToChat = Pick<User, "name" | "surname" | "username" | "id" > & {
    avatar?: string
}