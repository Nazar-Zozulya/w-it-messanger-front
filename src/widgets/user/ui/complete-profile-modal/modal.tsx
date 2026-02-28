import { useForm } from "react-hook-form"
import { Modal } from "../../../../shared/ui/modal"
import styles from "./model.module.css"
import { CompleteProfileForm, CompleteProfileProps } from "./model.types"
import { Input } from "../../../../shared/ui/input"
import { Button } from "../../../../shared/ui/button"
import { POST } from "../../../../helpers/post"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useUserContext } from "../../../../entities/user"
import { useModalManagerStore } from "../../../../entities/modal/model/storage/modalManager"

export function CompleteProfileModal(props: CompleteProfileProps) {
	const { handleSubmit, control, formState } = useForm<CompleteProfileForm>()
	const [cookies, setCookie, removeCookie] = useCookies(['complete-profile'])
	const { closeModal } = useModalManagerStore()
	const { completeProfile } = useUserContext()
	const [error, setError] = useState<string>("")

	async function onSubmit(data: CompleteProfileForm) {
		const { name, surname, username } = data
		console.log("complete profile data: ", data)
		const result = await completeProfile(name, surname, username)

		if (result.status === "error") {
			setError(result.message ?? "")
		}

		if (result.status === "success") {
			removeCookie("complete-profile")
			closeModal()
		}
	}

	return (
		<Modal isClosingFromCover={props.isClosingFromCover}>
			<div className={styles.container}>
				<p className={styles.title}>Додай деталі про себе</p>
				<form
					className={styles.content}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={styles.inputsContainer}>
						<Input
							label="Ім'я"
							placeholder="Введіть ваше ім'я"
							error={formState.errors.name?.message}
							rules={{
								minLength: {
									value: 2,
									message:
										"Ім'я повинно містити не менше 2 символів",
								},
								maxLength: {
									value: 30,
									message:
										"Ім'я повинно містити не більше 30 символів",
								},
							}}
							control={control}
							name="name"
						/>
						<Input
							label="Прізвище"
							placeholder="Введіть прізвище"
							error={formState.errors.surname?.message}
							rules={{
								minLength: {
									value: 2,
									message:
										"Прізвище повинно містити не менше 2 символів",
								},
								maxLength: {
									value: 30,
									message:
										"Прізвище повинно містити не більше 30 символів",
								},
							}}
							control={control}
							name="surname"
						/>
						<Input
							label="Ім'я користувача"
							placeholder="@"
							error={formState.errors.username?.message}
							rules={{
								minLength: {
									value: 2,
									message:
										"Ім'я користувача повинно містити не менше 2 символів",
								},
								maxLength: {
									value: 30,
									message:
										"Ім'я користувача повинно містити не більше 30 символів",
								},
							}}
							control={control}
							name="username"
						/>
						<p className={styles.errorField}>{error}</p>
					</div>
					<p className={styles.suggestions}>
						Або оберіть:{" "}
						<a href="#">
							Запропоновані варіанти відповідно до Ім’я та
							Прізвища
						</a>
					</p>
					<Button
						text="Продовжити"
						fill={true}
						className={styles.button}
					/>
				</form>
			</div>
		</Modal>
	)
}
