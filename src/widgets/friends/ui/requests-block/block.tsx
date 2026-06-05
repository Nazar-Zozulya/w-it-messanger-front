import { RequestsCard, useFriendsManager } from "../../../../entities/friends"
import { Album, Profile, useUserContext } from "../../../../entities/user"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import { Image } from '../../../../entities/image'
import styles from "./block.module.css"
import { RequestsBlockProps } from "./block.types"

export function RequestsBlock(props: RequestsBlockProps) {
	const { requests } = useFriendsManager()


	return (
		<div className={styles.container}>
			<UniversalBlockCard
				title="Запити"
                className={styles.block}
				button={
					<button className={styles.headerButton} onClick={props.goToMain}>
						Повернутись до головної
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
		</div>
	)
}
