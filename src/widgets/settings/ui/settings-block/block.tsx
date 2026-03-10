import { Button } from "../../../../shared/ui/button"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import { ReactComponent as Edit } from "../../../../shared/ui/icons/edit.svg"
import styles from './block.module.css'
import { useUserContext } from "../../../../entities/user"
import { DEFAULT_AVATAR } from "../../../../shared/ui/constants"
import { useForm } from "react-hook-form"
import { UserInfoChangeForm } from "./block.types"
import { Input } from "../../../../shared/ui/input"

export function SettingsBlock() {
	const { user } = useUserContext()

	const { handleSubmit, formState, control } = useForm<UserInfoChangeForm>()

	async function onSubmit(data: UserInfoChangeForm) {

	}

	return (
		<div>
			<UniversalBlockCard
				title="Картка профілю"
				button={
					<Button text="Редагувати Інформацію" fill={false} icon={<Edit />} />
				}
			>
				<div className={styles.avatarAndUsernameBlock}>
					<button className={styles.changeAvatar}>
						<img src={user?.profile.avatars[0] ?  user?.profile.avatars[0].image : DEFAULT_AVATAR} alt="" className={styles.avatar} />
					</button>
					<p className={styles.name}>{user?.name && user?.surname ? `${user.name} ${user.surname}`: 'Увас не вказано ім\'я'}</p>
					<button className={styles.changeUsername}>
						<p className={styles.username}>{user?.username}</p>
					</button>
				</div>
			</UniversalBlockCard>

			<UniversalBlockCard
				title="Особиста інформація"
				button={
					<Button text="Редагувати Інформацію" fill={false} icon={<Edit />} />
				}
			>
				<div className={styles.userInfoBlock}>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* <Input /> */}
					</form>
				</div>
			</UniversalBlockCard>

			<UniversalBlockCard
				title="Редагувати пароль"
				button={
					<Button text="Редагувати Інформацію" fill={false} icon={<Edit />} />
				}
			>
				<div className={styles.changePasswordBlock}>
					<button className={styles.changeAvatar}>
						<img src={user?.profile.avatars[0] ?  user?.profile.avatars[0].image : DEFAULT_AVATAR} alt="" className={styles.avatar} />
					</button>
					<p className={styles.name}>{user?.name && user?.surname ? `${user.name} ${user.surname}`: 'Увас не вказано ім\'я'}</p>
					<button className={styles.changeUsername}>
						<p className={styles.username}>{user?.username}</p>
					</button>
				</div>
			</UniversalBlockCard>

			<UniversalBlockCard
				title="Варіанти підпису"
				button={
					<Button text="Редагувати Інформацію" fill={false} icon={<Edit />} />
				}
			>
				<div className={styles.additionalSettingsBlock}>
					<button className={styles.changeAvatar}>
						<img src={user?.profile.avatars[0] ?  user?.profile.avatars[0].image : DEFAULT_AVATAR} alt="" className={styles.avatar} />
					</button>
					<p className={styles.name}>{user?.name && user?.surname ? `${user.name} ${user.surname}`: 'Увас не вказано ім\'я'}</p>
					<button className={styles.changeUsername}>
						<p className={styles.username}>{user?.username}</p>
					</button>
				</div>
			</UniversalBlockCard>
		</div>
	)
}
