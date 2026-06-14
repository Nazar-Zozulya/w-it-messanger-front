import { ReactNode, useEffect } from "react"
import { usePostsManager } from "../entities/post"
import { useUserContext } from "../entities/user"
import { useAlbumsManager } from "../entities/album"
import { useFriendsManager } from "../entities/friends"
import { useChatSocketStore, useGlobalChatSocketStore } from "../shared/socket"
import { useChatsManager } from "../entities/chat"

interface InitialFetchesProps {
	children: ReactNode
}

export function InitialFetches(props: InitialFetchesProps) {
	const { getPosts, getMyPosts } = usePostsManager()

	const { connect } = useChatSocketStore()

	const { connect: connectGlobal } = useGlobalChatSocketStore()

	const { getAllFriends, getAllRecommendations, getAllRequests } =
		useFriendsManager()

	const { token, user } = useUserContext()

	const { getAlbums } = useAlbumsManager()

	const { getIndividualChats } = useChatsManager()

	useEffect(() => {
		// не надо токен для получения
		getPosts()
		connect()
		connectGlobal()
	}, [])

	useEffect(() => {
		if (!token) return

		getAlbums(token)
		getAllRecommendations(token)
		getAllFriends(token)
		getAllRequests(token)
	}, [token])

	useEffect(() => {
		if (!user) return

		getMyPosts(user.id)
		getIndividualChats(user.id)
	}, [user])

	return <>{props.children}</>
}
