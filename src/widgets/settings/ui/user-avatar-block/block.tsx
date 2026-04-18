import { useForm } from "react-hook-form"
import { UserAvatarChangeForm } from "./block.types"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { fileToBase64 } from "../../../../helpers/fileToBase64"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card/card"
import { useUserContext } from "../../../../entities/user"
import { Button } from "../../../../shared/ui/button"
import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { Input } from "../../../../shared/ui/input"

import styles from "./block.module.css"

import { ReactComponent as Edit } from "../../../../shared/ui/icons/edit.svg"
import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"
import { POST } from "../../../../helpers/post"

export function UserAvatarBlock() {
	const { handleSubmit, formState, control } = useForm<UserAvatarChangeForm>()

	const { user } = useUserContext()

	const [username, setUsername] = useState<string>("")

	useEffect(() => {
		setUsername(user?.username || "")
	}, [user])

	const [newAvatar, setNewAvatar] = useState<string | null>(null)

	const [error, setError] = useState<string | null>(null)

	const [isChanging, setIsChanging] = useState<boolean>(false)

	const changeAvatarRef = useRef<HTMLInputElement>(null)

	async function onSubmit(data: UserAvatarChangeForm) {
		setIsChanging(false)

		const newData = { ...data, id: user?.id, avatar: newAvatar }

		const response = await POST({
			whichService: "userService",
			endpoint: "api/user/update",
			method: "PATCH",
			body: newData,
		})

		if (response.status === "error") {
			setError(response.message ?? "unknown error")

			return
		}

		if (data.username) {
			setUsername(data.username)
		}
		
		setError(null)

		console.log(response)
	}

	async function onChangeAvatarClick(e: ChangeEvent<HTMLInputElement>) {
		// const avatarClick = changeAvatarRef.current?.click()

		const avatar = e.target.files?.[0]

		if (!avatar) {
			console.log("no avatar")
			return
		}

		const avatarBase64 = await fileToBase64(avatar)

		if (!avatarBase64) {
			console.log("file error")
			return
		}

		setNewAvatar(avatarBase64)

		console.log(avatar)
	}

	return (
		<UniversalBlockCard
			title="Картка профілю"
			button={
				<Button
					text={isChanging ? "" : "Редагувати Інформацію"}
					function={() => {
						isChanging
							? handleSubmit(onSubmit)()
							: setIsChanging(true)
					}}
					fill={false}
					icon={isChanging ? <Check /> : <Edit />}
				/>
			}
		>
			<div className={styles.avatarAndUsernameBlock}>
				<button
					className={styles.changeAvatar}
					disabled={!isChanging}
					onClick={() => {
						changeAvatarRef.current?.click()
					}}
					style={{
						cursor: isChanging ? "pointer" : "default",
					}}
				>
					<input
						type="file"
						ref={changeAvatarRef}
						className={styles.avatarInput}
						onChange={onChangeAvatarClick}
					/>
					<img
						src={
							newAvatar
								? newAvatar
								: user?.profile.avatars[0]
									? user.profile.avatars[
											user.profile.activeAvatarId
												? user.profile.activeAvatarId -
													1
												: -1
										].image
									: DEFAULT_AVATAR
						}
						// src={
						// 	user?.profile.avatars[0]
						// 		? user?.profile.avatars[0].image
						// 		: newAvatar
						// 			? newAvatar
						// 			: DEFAULT_AVATAR
						// }
						alt=""
						className={styles.avatar}
					/>
				</button>
				<p className={styles.name}>
					{user?.name && user?.surname
						? `${user.name} ${user.surname}`
						: "Увас не вказано ім'я"}
				</p>
				{isChanging ? (
					<Input
						control={control}
						defaultValue={username}
						placeholder="Введіть ваш логін"
						style={{ textAlign: "center" }}
						error={formState.errors.username?.message}
						name={"username"}
						size="small"
					/>
				) : (
					<>
						<p className={styles.username}>{username}</p>
						<p className={styles.error}>{error}</p>
					</>
				)}
			</div>
		</UniversalBlockCard>
	)
}
