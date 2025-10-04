import { Controller, useForm } from "react-hook-form"
import styles from "./form.module.css"
import { LoginFormTypes } from "./form.types"
import { Input } from "../../../../shared/ui/input"
import { POST } from "../../../../helpers/post"

export function LoginForm() {
	const { handleSubmit, control } = useForm<LoginFormTypes>()

	async function onSubmit(data: LoginFormTypes) {
		const { email, password } = data
		// data.password

		const result = await POST({
			whichService: "userService",
			endpoint: "api/user/auth",
			body: { email, password },
		})
		console.log(result)
	}

	return (
		<div className={styles.container}>
			<p className={styles.optionalTitle}>З Поверненням до World IT</p>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Controller
					control={control}
					name="email"
					rules={{
						required: {
							value: true,
							message: "Ел. пошта обов'язкова",
						},
					}}
					render={({ field }) => {
						return (
							<Input
								label="Електронна пошта"
								placeholder="you@example.com"
								value={field.value}
								type="email"
								onChange={field.onChange}
							/>
						)
					}}
				/>

				<Controller
					control={control}
					name="password"
					rules={{
						required: {
							value: true,
							message: "Пароль обов'язковий",
						},
					}}
					render={({ field }) => {
						return (
							<Input
								label="Пароль"
								placeholder="Введи пароль"
								isPassword={true}
								value={field.value}
								onChange={field.onChange}
							/>
						)
					}}
				/>

				<button type="submit" className={styles.submitButton}>
					Повернутися в акаунт
				</button>
			</form>
		</div>
	)
}
