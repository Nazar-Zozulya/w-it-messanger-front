import { Fragment, useEffect, useRef, useState } from "react"
import { PostCard, usePostsManager } from "../../../../entities/post"
import styles from "./list.module.css"
import { PostsListProps } from "./list.types"
import { Post } from "../../../../entities/post/model/types"
import { useParams } from "react-router-dom"
import { GET } from "../../../../helpers/get"
import { useUserContext } from "../../../../entities/user"

const PAGE_SIZE = 10
const PRELOAD_OFFSET = 9

export function PostsList(props: PostsListProps) {
	const { posts, myPosts, getPosts, getMyPosts, getUserPosts } =
		usePostsManager()

	const [anotherUserPosts, setAnotherUserPosts] = useState<Post[] | null>(
		null,
	)

	const { user } = useUserContext()
	const { id } = useParams()

	const [page, setPage] = useState(1)
	const [myPage, setMyPage] = useState(1)
	const [anotherUserPage, setAnotherUserPage] = useState(1)

	const observer = useRef<IntersectionObserver | null>(null)
	const loading = useRef(false)
	const hasMore = useRef(true)

	const observe = (element: HTMLDivElement | null) => {
		if (!element) return

		observer.current?.disconnect()

		observer.current = new IntersectionObserver(async ([entry]) => {
			if (!entry.isIntersecting) return
			if (loading.current) return
			if (!hasMore.current) return

			loading.current = true

			try {
				let loadedCount = 0

				switch (props.mode) {
					case "main": {
						const nextPage = page + 1
						loadedCount = await getPosts(nextPage, PAGE_SIZE)
						setPage(nextPage)
						break
					}

					case "myPosts": {
						if (!user) break

						const nextPage = myPage + 1
						loadedCount = await getMyPosts(
							user.id,
							nextPage,
							PAGE_SIZE,
						)
						setMyPage(nextPage)
						break
					}

					case "anotherUser": {
						if (!id) break

						const nextPage = anotherUserPage + 1
						loadedCount = await getUserPosts(
							+id,
							nextPage,
							PAGE_SIZE,
						)
						setAnotherUserPage(nextPage)
						break
					}
				}

				if (loadedCount < PAGE_SIZE) {
					hasMore.current = false
					observer.current?.disconnect()
				}
			} finally {
				loading.current = false
			}
		})

		observer.current.observe(element)
	}

	useEffect(() => {
		return () => {
			observer.current?.disconnect()
		}
	}, [])

	useEffect(() => {
		loading.current = false
		hasMore.current = true

		observer.current?.disconnect()

		setPage(1)
		setMyPage(1)
		setAnotherUserPage(1)
	}, [props.mode, id])

	useEffect(() => {
		if (props.mode !== "anotherUser") return

		async function fetchPosts() {
			const response = await GET<Post[]>({
				whichService: "postService",
				endpoint: `api/post/all/${id}`,
			})

			if (response.status === "error") return

			setAnotherUserPosts(response.data)

			if (response.data.length < PAGE_SIZE) {
				hasMore.current = false
			}
		}

		fetchPosts()
	}, [id, props.mode])

	const currentPosts =
		props.mode === "main"
			? posts
			: props.mode === "myPosts"
				? myPosts
				: anotherUserPosts

	return (
		<div className={styles.list}>
			{currentPosts?.map((post, index) => (
				<Fragment key={post.id}>
					{index === currentPosts.length - PRELOAD_OFFSET && (
						<div
							ref={observe}
							style={{ height: 1 }}
						/>
					)}

					<PostCard
						post={post}
						isGoToProfile={props.mode === "main"}
					/>
				</Fragment>
			))}
		</div>
	)
}