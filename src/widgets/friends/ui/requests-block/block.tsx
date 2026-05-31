import { RequestsCard } from "../../../../entities/friends"
import { Album, Profile, useUserContext } from "../../../../entities/user"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import { Image } from '../../../../entities/image'
import styles from "./block.module.css"

export function RequestsBlock() {
    const { user } = useUserContext()

	return (
		<div className={styles.container}>
			<UniversalBlockCard
				title="Запити"
                className={styles.block}
				button={
					<button className={styles.headerButton}>
						Повернутись до головної
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
		</div>
	)
}
