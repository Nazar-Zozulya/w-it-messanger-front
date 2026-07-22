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
					{requests?.map((user) => {
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
					})}
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
					{recommendations?.map((user) => {
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
					})}
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
					{allFriends?.map((user) => {
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
					})}
				</div>
			</UniversalBlockCard>
			<div className={styles.bottomSpace}></div>
		</div>
	)
}
