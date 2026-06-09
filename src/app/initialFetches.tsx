import { ReactNode, useEffect } from "react"
import { usePostsManager } from "../entities/post"
import { useUserContext } from "../entities/user"
import { useAlbumsManager } from "../entities/album"
import { useFriendsManager } from "../entities/friends"
import { useSocketStore } from "../shared/socket"

interface InitialFetchesProps {
	children: ReactNode
}

export function InitialFetches(props: InitialFetchesProps) {
	const { getPosts, getMyPosts } = usePostsManager()

	const { connect } = useSocketStore()

	const { getAllFriends, getAllRecommendations, getAllRequests } = useFriendsManager()

	const { token, user } = useUserContext()

	const { getAlbums } = useAlbumsManager()

	useEffect(() => {
		// не надо токен для получения
        getPosts()
		connect()
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
	}, [user])

	return <>{props.children}</>
}
