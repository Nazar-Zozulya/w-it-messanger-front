import {
	RecomendationsCard,
	useFriendsManager,
} from "../../../../entities/friends"
import { Album, Profile, useUserContext } from "../../../../entities/user"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import styles from "./block.module.css"
import { Image } from "../../../../entities/image"
import { RecomendationsBlockProps } from "./block.types"
import { Fragment, useEffect, useRef } from "react"

const PAGE_SIZE = 6
const PRELOAD_OFFSET = PAGE_SIZE - 5

export function RecomendationsBlock(props: RecomendationsBlockProps) {
	const { recommendations, getAllRecommendations } = useFriendsManager()

	const { token } = useUserContext()

	const page = useRef(1)

	const observer = useRef<IntersectionObserver | null>(null)
	const targetRef = useRef<HTMLDivElement>(null)

	const loading = useRef(false)
	const hasMore = useRef(true)

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

				page.current++

				console.log("page =", page.current)
				if (!token) return

				loadedCount = await getAllRecommendations(
					token,
					page.current,
					PAGE_SIZE,
				)

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
	}, [token])

	return (
		<div className={styles.container}>
			<UniversalBlockCard
				title="Рекомендації"
				className={styles.block}
				button={
					<button
						className={styles.headerButton}
						onClick={props.goToMain}
					>
						Повернутись до головної
					</button>
				}
			>
				<div className={styles.list}>
					{recommendations?.map((user, index) => {
						return (
							<Fragment key={user.id}>
								{index ===
									recommendations?.length - PRELOAD_OFFSET && (
									<div
										ref={targetRef}
										style={{ height: 1 }}
									/>
								)}

								<RecomendationsCard
									id={user.id}
									username={user.username}
									first_name={user.first_name}
									last_name={user.last_name}
									email={user.email}
									password={user.password}
									profile={user.profile}
									profileId={user.profileId}
									images={user.images}
									is_active={user.is_active}
									is_staff={user.is_staff}
									is_superuser={user.is_superuser}
									date_joined={user.date_joined}
								/>
							</Fragment>
						)
					})}
				</div>
			</UniversalBlockCard>
		</div>
	)
}
