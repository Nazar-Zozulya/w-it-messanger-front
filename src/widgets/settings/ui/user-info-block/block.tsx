import { useForm } from "react-hook-form"
import { UserInfoChangeForm } from "./block.types"
import { useState } from "react"
import { POST } from "../../../../helpers/post"
import { useUserContext } from "../../../../entities/user"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import { Input } from "../../../../shared/ui/input"
import { Button } from "../../../../shared/ui/button"

import styles from "./block.module.css"

import { ReactComponent as Edit } from "../../../../shared/ui/icons/edit.svg"
import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"

export function UserInfoBlock() {
	const { user } = useUserContext()

	const { handleSubmit, formState, control } = useForm<UserInfoChangeForm>()

	const [isChanging, setIsChanging] = useState<boolean>(false)

	async function onSubmit(data: UserInfoChangeForm) {
		setIsChanging(false)
		console.log(data)
		if (!data.name && !data.surname && !data.dateOfBirth && !data.email) {
			console.log("no data")
		}

		const response = await POST({
			whichService: "userService",
			endpoint: "api/user/update",
			method: "PATCH",
			body: { ...data, id: user?.id },
		})

		console.log(response)
	}

	return (
		<UniversalBlockCard
			title="Особиста інформація"
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
			<div className={styles.userInfoBlock}>
				<Input
					control={control}
					label="Ім'я"
					defaultValue={user?.name}
					placeholder="Введіть ваше ім'я"
					error={formState.errors.name?.message}
					name={"name"}
					disabled={!isChanging}
				/>
				<Input
					control={control}
					label="Прізвище"
					defaultValue={user?.surname}
					placeholder="Введіть ваше прізвище"
					error={formState.errors.surname?.message}
					name={"surname"}
					disabled={!isChanging}
				/>
				<Input
					control={control}
					label="Дата народження"
					type={"date"}
					defaultValue={
						user?.profile?.dateOfBirth?.toString().split("T")[0]
					}
					error={formState.errors.dateOfBirth?.message}
					name={"dateOfBirth"}
					disabled={!isChanging}
				/>
				<Input
					control={control}
					label="Електронна адреса"
					defaultValue={user?.email}
					placeholder="Введіть вашу електронну адресу"
					error={formState.errors.email?.message}
					name={"email"}
					disabled={!isChanging}
				/>
			</div>
		</UniversalBlockCard>
	)
}
