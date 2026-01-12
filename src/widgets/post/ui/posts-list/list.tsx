import { PostCard, usePostsManager } from "../../../../entities/post"
import styles from "./list.module.css"

export function PostsList() {
	const { posts } = usePostsManager()

	return (
		<div className={styles.list}>
			{posts &&
				posts.map((post) => {
					return (
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
					)
				})}
		</div>
	)
}
