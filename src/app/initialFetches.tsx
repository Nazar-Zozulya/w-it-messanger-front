import { ReactNode, useEffect, useState } from "react"
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
	const { getPosts, getMyPosts, posts, myPosts } = usePostsManager()

	const { connectSocket, connectSignalR, disconnect } = useChatSocketStore()

	const location = useLocation()

	// const [isFriendsLoaded, setIsFriendsLoaded] = useState<boolean>(false)

	// const [isAlbumsLoaded, setIsAlbumsLoaded] = useState<boolean>(false)

	const {
		connectSocket: connectGlobalSocket,
		connectSignalR: connectGlobalSignalR,
		disconnect: disconnectGlobal,
		enterGlobalChat,
		leaveGlobalChat,
		getStatuses,
		isConnected,
	} = useGlobalChatSocketStore()

	const {
		getAllFriends,
		getAllRecommendations,
		getAllRequests,
		requests,
		recommendations,
		allFriends,
	} = useFriendsManager()

	const { token, user } = useUserContext()

	const { getAlbums, albums } = useAlbumsManager()

	const { getIndividualChats, getGroups, chats } = useChatsManager()

	useEffect(() => {
		// не надо токен для получения
		getPosts(1, 10)
		// connect()
		// connectGlobal()
	}, [])

	useEffect(() => {
		if (!token) {
			disconnect()
			disconnectGlobal()
			return
		}

		if (!albums) getAlbums(token, 1, 4)
		if (!recommendations) getAllRecommendations(token, 1, 6)
		if (!allFriends) getAllFriends(token, 1, 6)
		getAllFriends(token, 1, 6)
		getAllFriends(token, 1, 6)
		getAllFriends(token, 1, 6)
		getAllFriends(token, 1, 6)
		if (!requests) getAllRequests(token, 1, 6)

		if (WHICH_SERVICE === "js") {
			connectSocket()
			connectGlobalSocket()
		} else {
			connectSignalR(token)
			connectGlobalSignalR(token)
		}
	}, [token])

	useEffect(() => {
		if (!user) {
			disconnect()
			disconnectGlobal()
			return
		}

		if (!myPosts) getMyPosts(user.id, 1, 10)
		if (!chats) {
			getIndividualChats(user.id, 1, 7)
			getGroups(user.id, 1, 7)
		}

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

	return <>{props.children}</>
}
