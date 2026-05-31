import styles from "./block.module.css"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import { FriendsCard, RecomendationsCard, RequestsCard, useFriendsManager } from "../../../../entities/friends"
import { Album, Profile, useUserContext } from "../../../../entities/user"
import { Image } from "../../../../entities/image"

export function FriendsMainBlock() {
	const { requests, recomendations, allFriends } = useFriendsManager()

	const { user } = useUserContext()

	return (
		<div className={styles.container}>
			<UniversalBlockCard
				title="Запити"
				button={
					<button className={styles.headerButton}>
						Дивитись всі
					</button>
				}
			>
				<div className={styles.list}>
					<RequestsCard
						id={user?.id ?? 1}
						username={user?.username}
						name={user?.name ?? ""}
						surname={user?.surname ?? ""}
						email={user?.email ?? ""}
						password={user?.password ?? ""}
						profile={user?.profile as Profile}
						profileId={user?.profileId ?? 1}
						images={user?.images as Image[]}
						albums={user?.albums as Album[]}
						createdAt={user?.createdAt ?? new Date()}
					/>
				</div>
			</UniversalBlockCard>
			<UniversalBlockCard
				title="Рекомендації"
				button={
					<button className={styles.headerButton}>
						Дивитись всі
					</button>
				}
			>
				<div className={styles.list}>
					<RecomendationsCard
						id={user?.id ?? 1}
						username={user?.username}
						name={user?.name ?? ""}
						surname={user?.surname ?? ""}
						email={user?.email ?? ""}
						password={user?.password ?? ""}
						profile={user?.profile as Profile}
						profileId={user?.profileId ?? 1}
						images={user?.images as Image[]}
						albums={user?.albums as Album[]}
						createdAt={user?.createdAt ?? new Date()}
					/>
				</div>
			</UniversalBlockCard>
			<UniversalBlockCard
				title="Всі друзі"
				button={
					<button className={styles.headerButton}>
						Дивитись всі
					</button>
				}
			>
				<div className={styles.list}>
					<FriendsCard
						id={user?.id ?? 1}
						username={user?.username}
						name={user?.name ?? ""}
						surname={user?.surname ?? ""}
						email={user?.email ?? ""}
						password={user?.password ?? ""}
						profile={user?.profile as Profile}
						profileId={user?.profileId ?? 1}
						images={user?.images as Image[]}
						albums={user?.albums as Album[]}
						createdAt={user?.createdAt ?? new Date()}
					/>
				</div>
			</UniversalBlockCard>
			<div className={styles.bottomSpace}></div>
		</div>
	)
}
