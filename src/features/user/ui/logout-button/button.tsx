import { useNavigate } from "react-router-dom"
import { useUserContext, useUserStatusStore } from "../../../../entities/user"
import { Button } from "../../../../shared/ui/button"
import { ReactComponent as Logout } from "../../../../shared/ui/icons/logout.svg"
import { useAlbumsManager } from "../../../../entities/album"
import { useChatsManager } from "../../../../entities/chat"
import { useFriendsManager } from "../../../../entities/friends"
import { usePostsManager } from "../../../../entities/post"
import { useChatSocketStore, useGlobalChatSocketStore } from "../../../../shared/socket"

export function LogoutButton(props: { mode: "PC" | "mobile" }) {
	const navigation = useNavigate()

	const { clearAllAlbums } = useAlbumsManager()
	const { clearAllChats } = useChatsManager()
	const { clearAllFriends } = useFriendsManager()
	const { clearAllPosts, getPosts } = usePostsManager()
	const { clearAllStatuses } = useUserStatusStore()
	
	const { leaveGlobalChat } = useGlobalChatSocketStore()

	const { disconnect } = useChatSocketStore()
	const { disconnect: disconnectGlobal } = useGlobalChatSocketStore()

	const { logout } = useUserContext()
	const { user } = useUserContext()

	return (
		<Button
			fill={false}
			function={() => {
				if (!user) return
				leaveGlobalChat(user?.id)
				disconnect()
				disconnectGlobal()
				logout()
				clearAllAlbums()
				clearAllChats()
				clearAllFriends()
				clearAllPosts()
				clearAllStatuses()
				getPosts(1, 10)
				navigation("/auth")
			}}
			icon={<Logout style={{ height: "1.8vh", width: "1.8vh" }} />}
			text={props.mode === "PC" ? "Вихід" : undefined}
		/>
	)
}
