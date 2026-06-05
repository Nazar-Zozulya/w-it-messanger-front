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
								name={user.name}
								surname={user.surname}
								email={user.email}
								password={user.password}
								profile={user.profile}
								profileId={user.profileId}
								images={user.images}
								albums={user.albums}
								createdAt={user.createdAt}
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
								name={user.name}
								surname={user.surname}
								email={user.email}
								password={user.password}
								profile={user.profile}
								profileId={user.profileId}
								images={user.images}
								albums={user.albums}
								createdAt={user.createdAt}
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
								name={user.name}
								surname={user.surname}
								email={user.email}
								password={user.password}
								profile={user.profile}
								profileId={user.profileId}
								images={user.images}
								albums={user.albums}
								createdAt={user.createdAt}
							/>
						)
					})}
				</div>
			</UniversalBlockCard>
			<div className={styles.bottomSpace}></div>
		</div>
	)
}
