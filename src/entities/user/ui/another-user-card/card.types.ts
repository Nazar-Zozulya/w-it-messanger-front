export interface AbotherUserCardProps {
    mode: "default" | "chat" | "request"
    avatar?: string
    name?: string | null
    surname?: string | null
    username: string
    lastMessage?: string
    subscribersCount?: number
}