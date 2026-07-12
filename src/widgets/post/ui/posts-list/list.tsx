import { Fragment, useEffect, useRef, useState } from "react"
import { PostCard, usePostsManager } from "../../../../entities/post"
import styles from "./list.module.css"
import { PostsListProps } from "./list.types"
import { Post } from "../../../../entities/post/model/types"
import { useParams } from "react-router-dom"
import { GET } from "../../../../helpers/get"

export function PostsList(props: PostsListProps) {
	const { posts, myPosts, getPosts } = usePostsManager()

	const [anotherUserPosts, setAnotherUserPosts] = useState<Post[] | null>(null)

	const { id } = useParams()

	const [page, setPage] = useState(1)

	const observers = useRef<Map<number, IntersectionObserver>>(new Map())
	const triggered = useRef<Set<number>>(new Set())

	const observe = (element: HTMLDivElement | null, observerId: number) => {
		if (!element) return
		if (observers.current.has(observerId)) return

		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return
			console.log("Observer", observerId)
			if (triggered.current.has(observerId)) return

			triggered.current.add(observerId)

			setPage((prev) => {
				getPosts(prev + 1, 10)
				return prev + 1
			})

			observer.disconnect()
			observers.current.delete(observerId)
		})

		observer.observe(element)
		observers.current.set(observerId, observer)
	}

	useEffect(() => {
		getPosts(1, 10)
	}, [])

	useEffect(() => {
		if (props.mode !== "anotherUser") return

		async function fetchPosts() {
			const response = await GET<Post[]>({
				whichService: "postService",
				endpoint: `api/post/all/${id}`,
			})

			if (response.status === "error") return

			setAnotherUserPosts(response.data)
		}

		fetchPosts()
	}, [id, props.mode])

	return (
		<div className={styles.list}>
			{props.mode === "main"
				? posts?.map((post, index) => (
						<Fragment key={post.id}>
							<PostCard post={post} isGoToProfile />

							{(index + 1) % 10 === 0 && (
								<div
									ref={(el) =>
										observe(el, Math.floor(index / 10))
									}
									style={{ height: 1 }}
								/>
							)}
						</Fragment>
				  ))
				: null}

			{props.mode === "myPosts"
				? myPosts?.map((post) => (
						<PostCard
							key={post.id}
							post={post}
							isGoToProfile={false}
						/>
				  ))
				: null}

			{props.mode === "anotherUser"
				? anotherUserPosts?.map((post) => (
						<PostCard
							key={post.id}
							post={post}
							isGoToProfile={false}
						/>
				  ))
				: null}
		</div>
	)
}