import { ReactNode, useEffect } from "react"
import { usePostsManager } from "../entities/post"
import { useUserContext, useUserStatusStore } from "../entities/user"
import { useAlbumsManager } from "../entities/album"
import { useFriendsManager } from "../entities/friends"
import { useChatSocketStore, useGlobalChatSocketStore } from "../shared/socket"
import { useChatsManager } from "../entities/chat"
import { useLocation } from "react-router-dom"
import { WHICH_SERVICE } from "../constants/which-service"

interface InitialFetchesProps {
	children: ReactNode
}

export function InitialFetches(props: InitialFetchesProps) {
	const { getPosts, getMyPosts } = usePostsManager()

	const { connectSocket, connectSignalR } = useChatSocketStore()

	const {
		connectSocket: connectGlobalSocket,
		connectSignalR: connectGlobalSignalR,
		enterGlobalChat,
		leaveGlobalChat,
		getStatuses,
		isConnected,
	} = useGlobalChatSocketStore()

	const { users } = useUserStatusStore()

	const { getAllFriends, getAllRecommendations, getAllRequests } =
		useFriendsManager()

	const { token, user } = useUserContext()

	const { getAlbums } = useAlbumsManager()

	const { getIndividualChats } = useChatsManager()

	useEffect(() => {
		// не надо токен для получения
		// getPosts()
		// connect()
		// connectGlobal()
	}, [])

	useEffect(() => {
		if (!token) return

		getAlbums(token)
		getAllRecommendations(token)
		getAllFriends(token)
		getAllRequests(token)

		if (WHICH_SERVICE === "js") {
			connectSocket()
			connectGlobalSocket()
		} else {
			connectSignalR()
			connectGlobalSignalR()
		}
	}, [token])

	useEffect(() => {
		if (!user) return

		// getMyPosts(user.id)
		getIndividualChats(user.id)
		// getAllGroups(user.id)

		// enterGlobalChat(user.id)

		// getStatuses(user.id)

		const handleLeave = () => {
			leaveGlobalChat(user.id)
		}

		window.addEventListener("beforeunload", handleLeave)

		return () => {
			window.removeEventListener("beforeunload", handleLeave)
		}
	}, [user])

	useEffect(() => {
		if (!user) return
		if (!isConnected) return

		enterGlobalChat(user.id)
		getStatuses(user.id)
	}, [user, isConnected])

	useEffect(() => {
		console.log("user statuses:", users)
	}, [users])

	return <>{props.children}</>
}
