import styles from "./block.module.css"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import {
	FriendsCard,
	RecomendationsCard,
	RequestsCard,
	useFriendsManager,
} from "../../../../entities/friends"
import { Album, Profile, useUserContext } from "../../../../entities/user"
import { Image } from "../../../../entities/image"
import { FriendsMainBlockProps } from "./block.types"

export function FriendsMainBlock(props: FriendsMainBlockProps) {
	const { requests, recommendations, allFriends } = useFriendsManager()

	const { user } = useUserContext()

	return (
		<div className={styles.container}>
			<UniversalBlockCard
				title="Запити"
				button={
					<button
						className={styles.headerButton}
						onClick={props.goToRequests}
					>
						Дивитись всі
					</button>
				}
			>
				<div className={styles.list}>
					{requests && requests.length > 0 ? requests?.slice(
							0,
							(window.matchMedia("(max-width: 1270px)").matches &&
								window.matchMedia("(min-width: 1026px)")
									.matches) ||
								(window.matchMedia("(max-width: 900px)")
									.matches &&
									window.matchMedia("(min-width: 768px)")
										.matches)
								? 4
								: (window.matchMedia("(max-width: 1025px)")
											.matches &&
											window.matchMedia(
												"(min-width: 901px)",
											).matches) ||
									  window.matchMedia("(min-width: 1271px)")
											.matches
									? 6
									: 2,
						).map((user) => {
						return (
							<RequestsCard
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
						)
					}) : <p className={styles.noItems}>Поки що немає запитів</p>}
				</div>
			</UniversalBlockCard>
			<UniversalBlockCard
				title="Рекомендації"
				button={
					<button
						className={styles.headerButton}
						onClick={props.goToRecomendations}
					>
						Дивитись всі
					</button>
				}
			>
				<div className={styles.list}>
					{recommendations && recommendations.length > 0 ? recommendations?.slice(
							0,
							(window.matchMedia("(max-width: 1270px)").matches &&
								window.matchMedia("(min-width: 1026px)")
									.matches) ||
								(window.matchMedia("(max-width: 900px)")
									.matches &&
									window.matchMedia("(min-width: 768px)")
										.matches)
								? 4
								: (window.matchMedia("(max-width: 1025px)")
											.matches &&
											window.matchMedia(
												"(min-width: 901px)",
											).matches) ||
									  window.matchMedia("(min-width: 1271px)")
											.matches
									? 6
									: 2,
						).map((user) => {
						return (
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
						)
					}) : <p className={styles.noItems}>Поки що немає рекомендацій</p>}
				</div>
			</UniversalBlockCard>
			<UniversalBlockCard
				title="Всі друзі"
				button={
					<button
						className={styles.headerButton}
						onClick={props.goToFriends}
					>
						Дивитись всі
					</button>
				}
			>
				<div className={styles.list}>
					{allFriends && allFriends.length > 0 ? allFriends?.slice(
								0,
							(window.matchMedia("(max-width: 1270px)").matches &&
								window.matchMedia("(min-width: 1026px)")
									.matches) ||
								(window.matchMedia("(max-width: 900px)")
									.matches &&
									window.matchMedia("(min-width: 768px)")
										.matches)
								? 4
								: (window.matchMedia("(max-width: 1025px)")
											.matches &&
											window.matchMedia(
												"(min-width: 901px)",
											).matches) ||
									  window.matchMedia("(min-width: 1271px)")
											.matches
									? 6
									: 2,
						)
						.map((user) => {
							return (
								<FriendsCard
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
							)
						}) : <p className={styles.noItems}>Поки що немає друзів</p>}
				</div>
			</UniversalBlockCard>
			<div className={styles.bottomSpace}></div>
		</div>
	)
}
