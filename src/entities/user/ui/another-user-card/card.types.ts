import { Message } from "../../../chat"

export interface AnotherUserCardProps {
	avatar?: string
	name?: string | null
	surname?: string | null
	username: string
	id: number
	function?: () => void
}

export interface AnotherUserChatCardProps {
	avatar?: string
	id: number
	name?: string | null
	surname?: string | null
	username: string
	lastMessage: Omit<Message, "createdAt">
	created_at?: Date
	function?: () => void
}

export interface AnotherUserGroupCardProps {
	avatar?: string
	id: number
	name: string
	lastMessage: Omit<Message, "createdAt">
	created_at?: Date
	function?: () => void
}
