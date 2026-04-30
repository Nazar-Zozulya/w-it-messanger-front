import { Button } from "../../../../shared/ui/button"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import { ReactComponent as Edit } from "../../../../shared/ui/icons/edit.svg"
import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"
import styles from "./block.module.css"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ChangePasswordBlockForm } from "./block.types"
import { Input } from "../../../../shared/ui/input"
import { POST } from "../../../../helpers/post"
import { User, useUserContext } from "../../../../entities/user"

export function ChangePasswordBlock() {
	const [isChanging, setIsChanging] = useState<boolean>(false)
	const { handleSubmit, formState, control } =
		useForm<ChangePasswordBlockForm>()
	const [error, setError] = useState<string>("")
	const { token } = useUserContext()

	async function onSubmit(data: ChangePasswordBlockForm) {
		console.log(data)

		const { password, confirmPassword } = data

		if (password !== confirmPassword) {
			setError("Паролі не співпадають")
			setIsChanging(false)
		}

		setError("")

		const response = await POST<User>({
			whichService: "userService",
			method: "PATCH",
			endpoint: "/api/user/chang-password",
			body: { password },
			token: token ?? "",
		})

		if (response.status === "error") {
			setError("error")
		}

		setIsChanging(false)
	}

	return (
		<UniversalBlockCard
			title="Пароль"
			button={
				<Button
					text={isChanging ? "Змінити пароль" : "Редагувати пароль"}
					function={() => {
						isChanging
							? handleSubmit(onSubmit)()
							: setIsChanging(true)
					}}
					fill={false}
					icon={<Edit />}
				/>
			}
		>
			<div className={styles.changePasswordBlock}>
				<Input
					control={control}
					label="Новий пароль"
					placeholder="Введіть новий пароль"
					name={"password"}
					isPassword={true}
					disabled={!isChanging}
				/>
				<Input
					control={control}
					label="Підтвердіть новий пароль"
					placeholder="Підтвердіть новий пароль"
					name={"confirmPassword"}
					isPassword={true}
					disabled={!isChanging}
				/>
				<p className={styles.error}>{error}</p>
			</div>
		</UniversalBlockCard>
	)
}
