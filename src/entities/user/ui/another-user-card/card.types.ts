import { Message } from "../../../chat"
import { AlbumImage } from "../../model/types"

export interface AnotherUserCardProps {
	avatar?: AlbumImage
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
