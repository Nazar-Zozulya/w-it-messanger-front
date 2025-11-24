import { Controller, useForm } from "react-hook-form"
import styles from "./form.module.css"
import { LoginFormTypes } from "./form.types"
import { Input } from "../../../../shared/ui/input"
import { POST } from "../../../../helpers/post"
import { useState } from "react"
import { useUserContext } from "../../../../entities/user"

export function LoginForm() {
	const { handleSubmit, control } = useForm<LoginFormTypes>()
	const [validationError, setValidationError] = useState<string | null>(null)
	const { login } = useUserContext()

	async function onSubmit(data: LoginFormTypes) {
		const { email, password } = data
		// data.password

		const result = await login(email, password)
		console.log(result)
	}

	return (
		<div className={styles.container}>
			<p className={styles.optionalTitle}>З Поверненням до World IT</p>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

				<p className={styles.errorField}>{validationError}</p>

				<button type="submit" className={styles.submitButton}>
					Повернутися в акаунт
				</button>
			</form>
		</div>
	)
}
