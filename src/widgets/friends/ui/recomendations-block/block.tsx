import { RecomendationsCard } from '../../../../entities/friends'
import { Album, Profile, useUserContext } from '../../../../entities/user'
import { UniversalBlockCard } from '../../../../shared/ui/universal-block-card'
import styles from './block.module.css'
import { Image } from "../../../../entities/image"


export function RecomendationsBlock() {
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
		</div>
	)
}