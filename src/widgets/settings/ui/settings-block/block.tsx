import { Button } from "../../../../shared/ui/button"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import { ReactComponent as Edit } from "../../../../shared/ui/icons/edit.svg"
import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"

import styles from "./block.module.css"
import { useUserContext } from "../../../../entities/user"
import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { UserInfoBlock } from "../user-info-block"
import { UserAvatarBlock } from "../user-avatar-block"

export function SettingsBlock() {
	const { user } = useUserContext()

	return (
		<div className={styles.container}>
			<UserAvatarBlock />

			<UserInfoBlock />

			<UniversalBlockCard
				title="Редагувати пароль"
				button={
					<Button
						text="Редагувати Інформацію"
						fill={false}
						icon={<Edit />}
					/>
				}
			>
				<div className={styles.changePasswordBlock}>
					<button className={styles.changeAvatar}>
						<img
							src={
								user?.profile.avatars[0]
									? user?.profile.avatars[0].image
									: DEFAULT_AVATAR
							}
							alt=""
							className={styles.avatar}
						/>
					</button>
					<p className={styles.name}>
						{user?.name && user?.surname
							? `${user.name} ${user.surname}`
							: "Увас не вказано ім'я"}
					</p>
					<button className={styles.changeUsername}>
						<p className={styles.username}>{user?.username}</p>
					</button>
				</div>
			</UniversalBlockCard>

			<UniversalBlockCard
				title="Варіанти підпису"
				button={
					<Button
						text="Редагувати Інформацію"
						fill={false}
						icon={<Edit />}
					/>
				}
			>
				<div className={styles.additionalSettingsBlock}>
					<button className={styles.changeAvatar}>
						<img
							src={
								user?.profile.avatars[0]
									? user?.profile.avatars[0].image
									: DEFAULT_AVATAR
							}
							alt=""
							className={styles.avatar}
						/>
					</button>
					<p className={styles.name}>
						{user?.name && user?.surname
							? `${user.name} ${user.surname}`
							: "Увас не вказано ім'я"}
					</p>
					<button className={styles.changeUsername}>
						<p className={styles.username}>{user?.username}</p>
					</button>
				</div>
			</UniversalBlockCard>
		</div>
	)
}
