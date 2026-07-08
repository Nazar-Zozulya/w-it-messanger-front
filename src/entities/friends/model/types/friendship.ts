import { User } from "../../../user"

export interface Friendship {
    id: number
    status: FriendshipStatus
    from_user: User
    from_user_id: number
    to_user: User
    to_user_id: number
    created_at: Date
}


type FriendshipStatus = "pending" | "accepted"