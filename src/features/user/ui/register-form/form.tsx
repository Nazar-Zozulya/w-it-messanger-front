import { Controller, useForm } from "react-hook-form"
import styles from "./form.module.css"
import { RegisterFormTypes } from "./form.types"
import { Input } from "../../../../shared/ui/input"
import { POST } from "../../../../helpers/post"
import { useState } from "react"
import { useUserContext } from "../../../../entities/user"
import { redirect } from "react-router-dom"
import { Button } from "../../../../shared/ui/button"

export function RegisterForm() {
	const { handleSubmit, control } = useForm<RegisterFormTypes>()
	const [validationError, setValidationError] = useState<string | null>(null)

	const { register } = useUserContext()

	async function onSubmit(data: RegisterFormTypes) {
		const { email, password, repeatPassword } = data
		const result = await register(email, password, repeatPassword)

		if (result.status === "error") {
			setValidationError(result.status)
		}

		if (result.status === "success") {
			localStorage.setItem("completeProfile", "yes")
		}
		redirect("/")
	}

	return (
		<div className={styles.container}>
			<p className={styles.optionalTitle}>Приєднуйся до World IT</p>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.inputsBlock}>
					<Input
						label="Електронна пошта"
						placeholder="you@example.com"
						type="email"
						rules={{
							required: {
								value: true,
								message: "Ел. пошта обов'язкова",
							},
						}}
						control={control}
						name="email"
					/>

					<Input
						label="Пароль"
						placeholder="Введи пароль"
						rules={{
							required: {
								value: true,
								message: "Пароль обов'язковий",
							},
						}}
						isPassword={true}
						control={control}
						name="password"
					/>

					<Input
						label="Підтверди пароль"
						placeholder="Повтори пароль"
						rules={{
							required: {
								value: true,
								message: "Повторення обов'язкове",
							},
						}}
						isPassword={true}
						control={control}
						name="repeatPassword"
					/>
				</div>

				<p className={styles.errorField}>{validationError} error field</p>

				<Button type="submit" fill={true} text="Створити акаунт" className={styles.submitButton} />
			</form>
		</div>
	)
}
