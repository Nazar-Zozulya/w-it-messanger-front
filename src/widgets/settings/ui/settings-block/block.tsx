import { Button } from "../../../../shared/ui/button"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import { ReactComponent as Edit } from "../../../../shared/ui/icons/edit.svg"
import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"

import styles from "./block.module.css"
import { useUserContext } from "../../../../entities/user"
import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { useForm } from "react-hook-form"
import { UserInfoChangeForm } from "./block.types"
import { Input } from "../../../../shared/ui/input"
import { useState } from "react"

export function SettingsBlock() {
	const { user } = useUserContext()

	const { handleSubmit, formState, control } = useForm<UserInfoChangeForm>()

	const [isUserDataChanging, setIsUserDataChanging] = useState<boolean>(false)

	async function onSubmit(data: UserInfoChangeForm) {}

	return (
		<div className={styles.container}>
			<UniversalBlockCard
				title="Картка профілю"
				button={
					<Button
						text="Редагувати Інформацію"
						fill={false}
						icon={<Edit />}
					/>
				}
			>
				<div className={styles.avatarAndUsernameBlock}>
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
				title="Особиста інформація"
				button={
					<Button
						text={isUserDataChanging ? "" : "Редагувати Інформацію"   }
						type={isUserDataChanging ? "submit" : "button"}
						function={()=>{setIsUserDataChanging(!isUserDataChanging)}}
						fill={false}
						icon={isUserDataChanging ? <Check />: <Edit />}
					/>
				}
			>
				<div className={styles.userInfoBlock}>
					<form
						className={styles.userInfoForm}
						onSubmit={handleSubmit(onSubmit)}
					>
						<Input
							control={control}
							label="Ім'я"
							placeholder="Введіть ваше ім'я"
							error={formState.errors.name?.message}
							name={"name"}
							disabled={!isUserDataChanging}
						/>
						<Input
							control={control}
							label="Прізвище"
							placeholder="Введіть ваше прізвище"
							error={formState.errors.surname?.message}
							name={"surname"}
							disabled={!isUserDataChanging}
						/>
						<Input
							control={control}
							label="Дата народження"
							type={"date"}
							error={formState.errors.dateOfBirth?.message}
							name={"dateOfBirth"}
							disabled={!isUserDataChanging}
						/>
						<Input
							control={control}
							label="Електронна адреса"
							placeholder="Введіть вашу електронну адресу"
							error={formState.errors.name?.message}
							name={"email"}
							disabled={!isUserDataChanging}
						/>
					</form>
				</div>
			</UniversalBlockCard>

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
