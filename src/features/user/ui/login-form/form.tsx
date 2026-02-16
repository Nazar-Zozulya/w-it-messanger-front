import { useForm } from "react-hook-form"
import styles from "./form.module.css"
import { LoginFormTypes } from "./form.types"
import { Input } from "../../../../shared/ui/input"
import { useState } from "react"
import { useUserContext } from "../../../../entities/user"
import { Button } from "../../../../shared/ui/button"
import { redirect } from "react-router-dom"

export function LoginForm() {
	const { handleSubmit, control } = useForm<LoginFormTypes>()
	const [validationError, setValidationError] = useState<string | null>(null)
	const { login } = useUserContext()

	async function onSubmit(data: LoginFormTypes) {
		const { email, password } = data
		// data.password

		const result = await login(email, password)
		// console.log(result)
		if (result.status === "error") {
			setValidationError(result.message ?? 'Помилка входу')
		}
		else {
			redirect("/")
		}
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

				<p className={styles.errorField}>{validationError} error field</p>

				<Button type="submit" fill={true} text="Повернутися в акаунт" className={styles.submitButton} />
			</form>
		</div>
	)
}
