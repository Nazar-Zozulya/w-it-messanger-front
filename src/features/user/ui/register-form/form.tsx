import { Controller, useForm } from "react-hook-form"
import styles from "./form.module.css"
import { RegisterFormTypes } from "./form.types"
import { Input } from "../../../../shared/ui/input"
import { POST } from "../../../../helpers/post"

export function RegisterForm() {
	const { handleSubmit, control } = useForm<RegisterFormTypes>()

	async function onSubmit(data: RegisterFormTypes) {
		
		const { email, password, repeatPassword } = data
		// data.password

		const result = await POST({
			whichService: "userService",
			endpoint: "api/user/create",
			body: {email, password},
		})
		console.log(result)
	}

	return (
		<div className={styles.container}>
			<p className={styles.optionalTitle}>Приєднуйся до World IT</p>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{/* <div className={styles.inputsBlock}>
                </div> */}

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

				<Controller
					control={control}
					name="repeatPassword"
					rules={{
						required: {
							value: true,
							message: "Повторення паролю обов'язкове",
						},
					}}
					render={({ field }) => {
						return (
							<Input
								label="Підтверди пароль"
								placeholder="Повтори пароль"
								isPassword={true}
								value={field.value}
								onChange={field.onChange}
							/>
						)
					}}
				/>

				<button type="submit" className={styles.submitButton}>
					Створити акаунт
				</button>
			</form>
		</div>
	)
}
