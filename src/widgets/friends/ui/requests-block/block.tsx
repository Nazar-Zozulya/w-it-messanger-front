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
		</div>
	)
}
