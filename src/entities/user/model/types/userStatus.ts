export interface UserStatus {
    id: number
    status: UserStatusVariants
}

export type UserStatusVariants = "active" | "deactive"