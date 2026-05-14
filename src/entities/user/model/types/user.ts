import { Profile } from ".";
import { UserImage } from "./userImage";


export interface User{
    id: number;

    email: string;
    password: string;

    profile: Profile
    profileId: number

    name?: string;
    surname?: string;
    username?: string;

    images?: UserImage[];

    lastLogin?: Date | string
    createdAt: Date | string
    updatedAt?: Date | string
}