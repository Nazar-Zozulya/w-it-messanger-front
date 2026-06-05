import { useEffect, useState } from "react"
import { PostCard, usePostsManager } from "../../../../entities/post"
import styles from "./list.module.css"
import { PostsListProps } from "./list.types"
import { Post } from "../../../../entities/post/model/types"
import { useParams } from "react-router-dom"
import { GET } from "../../../../helpers/get"

export function PostsList(props: PostsListProps) {
	const { posts, myPosts } = usePostsManager()

	const [anotherUserPosts, setAnotherUserPosts] = useState<Post[] | null>(null)

	const { id } = useParams()

	useEffect(() => {
		if (props.mode !== "anotherUser") return
		async function fetchPosts() {
			if (props.mode === "anotherUser") {
				const posts = await GET<Post[]>({
					whichService: "postService",
					endpoint: `api/post/all/${id}`
				})
				if (posts.status === "error") return

				setAnotherUserPosts(posts.data)
			}
		}
		fetchPosts()
	}, [id, props.mode])

	return (
		<div className={styles.list}>
			{props.mode === "main" ? (
				posts?.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						isGoToProfile={true}
					/>
				))
			) : (
				<></>
			)}
			{props.mode === "myPosts" ? (
				myPosts?.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						isGoToProfile={false}
					/>
				))
			) : (
				<></>
			)}
			{props.mode === "anotherUser" ? (
				anotherUserPosts?.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						isGoToProfile={false}
					/>
				))
			) : (
				<></>
			)}
		</div>
	)
}
