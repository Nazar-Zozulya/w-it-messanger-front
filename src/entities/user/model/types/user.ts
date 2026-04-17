import { Profile } from ".";


export interface User{
    id: number;

    email: string;
    password: string;

    profile: Profile
    profileId: number

    name?: string;
    surname?: string;
    username?: string;

    lastLogin?: Date | string
    createdAt: Date | string
    updatedAt?: Date | string
}