import { Fragment, useEffect, useRef, useState } from "react"
import { PostCard, usePostsManager } from "../../../../entities/post"
import styles from "./list.module.css"
import { PostsListProps } from "./list.types"
import { Post } from "../../../../entities/post/model/types"
import { useParams } from "react-router-dom"
import { GET } from "../../../../helpers/get"
import { useUserContext } from "../../../../entities/user"
import { CreatePostBlock } from "../create-post-block"

const PAGE_SIZE = 10
const PRELOAD_OFFSET = PAGE_SIZE - 1

export function PostsList(props: PostsListProps) {
	const { posts, myPosts, getPosts, getMyPosts, getUserPosts } =
		usePostsManager()

	const { user } = useUserContext()
	const { id } = useParams()

	const [anotherUserPosts, setAnotherUserPosts] = useState<Post[] | null>(
		null,
	)

	const page = useRef(1)
	const myPage = useRef(1)
	const anotherUserPage = useRef(1)

	const observer = useRef<IntersectionObserver | null>(null)
	const targetRef = useRef<HTMLDivElement>(null)

	const loading = useRef(false)
	const hasMore = useRef(true)

	const currentPosts =
		props.mode === "main"
			? posts
			: props.mode === "myPosts"
				? myPosts
				: anotherUserPosts

	useEffect(() => {
		if (props.mode !== "anotherUser") return
		
		async function load() {
			if (!id) return
			const response = await getUserPosts(
				+id,
				anotherUserPage.current,
				PAGE_SIZE,
			)

			if (response.status === "error") return

			setAnotherUserPosts(response.data)

			if (response.data.length < PAGE_SIZE) {
				hasMore.current = false
			}
		}

		load()
	}, [id, props.mode])

	useEffect(() => {
		page.current = 1
		myPage.current = 1
		anotherUserPage.current = 1

		loading.current = false
		hasMore.current = true
	}, [props.mode, id])

	useEffect(() => {
		const element = targetRef.current

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
						page.current++

						console.log("page =", page.current)

						loadedCount = await getPosts(
							page.current,
							PAGE_SIZE,
						)

						break
					}

					case "myPosts": {
						if (!user) break

						myPage.current++

						loadedCount = await getMyPosts(
							user.id,
							myPage.current,
							PAGE_SIZE,
						)

						break
					}

					case "anotherUser": {
						if (!id) break

						anotherUserPage.current++

						const response = await getUserPosts(
							+id,
							anotherUserPage.current,
							PAGE_SIZE,
						)

						if (response.status === "error") break

						loadedCount = response.data.length

						setAnotherUserPosts(prev => [
							...(prev ?? []),
							...response.data,
						])

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

		return () => observer.current?.disconnect()
	}, [
		props.mode,
		id,
		user,
		getPosts,
		getMyPosts,
		getUserPosts,
		currentPosts?.length,
	])

	return (
		<div className={styles.list}>
			{props.mode !== "anotherUser" && <CreatePostBlock />}
			{/* <div className={styles.postsList}></div> */}
			{currentPosts?.map((post, index) => (
				<Fragment key={post.id}>
					{index === currentPosts.length - PRELOAD_OFFSET && (
						<div ref={targetRef} style={{ height: 1 }} />
					)}

					<PostCard
						post={post}
						key={post.id}
						isGoToProfile={props.mode === "main"}
					/>
				</Fragment>
			))}
			<div className={styles.bottomSpace}></div>
		</div>
	)
}
