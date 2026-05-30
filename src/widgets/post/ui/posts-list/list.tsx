import { useState } from "react"
import { PostCard, usePostsManager } from "../../../../entities/post"
import styles from "./list.module.css"
import { PostsListProps } from "./list.types"
import { Post } from "../../../../entities/post/model/types"

export function PostsList(props: PostsListProps) {
	const { posts, myPosts } = usePostsManager()

	return (
		<div className={styles.list}>
			{props.mode === "main" ? (
				posts?.map((post) => (
					<PostCard
						key={post.id}
						id={post.id}
						title={post.title}
						content={post.content}
						authorId={post.authorId}
						author={post.author}
						views={post.views}
						likes={post.likes}
						tags={post.tags}
						links={post.links}
						images={post.images}
					/>
				))
			) : (
				<></>
			)}
			{props.mode === "myPosts" ? (
				myPosts?.map((post) => (
					<PostCard
						key={post.id}
						id={post.id}
						title={post.title}
						content={post.content}
						authorId={post.authorId}
						author={post.author}
						views={post.views}
						likes={post.likes}
						tags={post.tags}
						links={post.links}
						images={post.images}
					/>
				))
			) : (
				<></>
			)}
		</div>
	)
}
