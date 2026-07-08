import { Profile } from ".";
import { Image } from '../../../image/model/types'

export interface User {
    id: number;

    username: string;
    email: string;
    password: string;

    first_name: string;
    last_name: string;

    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;

    last_login?: Date | string;
    date_joined: Date | string;

    profile: Profile;
    profileId: number;

    images: Image[];
    // groups: Group[];
    // user_permissions: Permission[];
}

export type UserToPost = Pick<User, "first_name" | "last_name" | "username" | "id" > & {
    avatar?: string
}

export type UserToChat = Pick<User, "first_name" | "last_name" | "username" | "id" > & {
    avatar?: string
}