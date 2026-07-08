import { ConfirmFormTypes } from "./form.types"
import styles from "./form.module.css"
import VerificationInput from "react-verification-input"
import { Button } from "../../../../shared/ui/button"
import { useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { POST } from "../../../../helpers/post"
import { useState } from "react"
import { useUserContext } from "../../../../entities/user"
import { useCookies } from "react-cookie"

export function ConfirmForm(props: { email: string; password: string }) {
	const { handleSubmit, control } = useForm<ConfirmFormTypes>()
	const [cookies, setCookie, removeCookie] = useCookies(["complete-profile"])
	const [error, setError] = useState<string>("")
	const { register, confirmEmail } = useUserContext()
	const { email, password } = props

	const navigate = useNavigate()

	async function onSubmit(data: ConfirmFormTypes) {
		const { code } = data

		console.log("email: ", email)
		console.log("code: ", code)

		const result = await confirmEmail(email, code)
		console.log(result)

		if (result.status === "error") setError(`${result.message}`)
		else {
			const resultReg = await register(email, password)

			if (resultReg.status === "error") setError(`${resultReg.message}`)
			else {
				setCookie("complete-profile", "yes", {
					expires: new Date(Date.now() + 1000 * 1000),
				})
				// localStorage.setItem("completeProfile", "yes")
				navigate("/")
			}
		}
	}

	return (
		<div className={styles.container}>
			<p className={styles.title}>Підтвердження пошти</p>
			<p className={styles.description}>
				Ми надіслали 6-значний код на вашу пошту (you@example.com).
				Введіть його нижче, щоб підтвердити акаунт
			</p>

			<div className={styles.verInputDiv}>
				<p className={styles.label}>Код підтвердження</p>
				<Controller
					name="code"
					control={control}
					render={({ field }) => (
						<VerificationInput
							length={6}
							placeholder="___"
							value={field.value}
							onChange={field.onChange}
							classNames={{
								container: styles.inputContainer,
								character: styles.inputCharacter,
								characterInactive:
									styles.inputCharacterInactive,
								characterSelected:
									styles.inputCharacterSelected,
								characterFilled: styles.inputCharacterFilled,
							}}
						/>
					)}
				/>
				{/* <VerificationInput
					length={6}
					placeholder="___"
					classNames={{
						container: styles.inputContainer,
						character: styles.inputCharacter,
						characterInactive: styles.inputCharacterInactive,
						characterSelected: styles.inputCharacterSelected,
						characterFilled: styles.inputCharacterFilled,
					}}
				/> */}
			</div>
			<Button
				type="submit"
				fill={true}
				text="Підтвердити"
				className={styles.submitButton}
				function={() => handleSubmit(onSubmit)()}
				size="L"
			/>
			<button
				className={styles.backButton}
				onClick={() => navigate("/auth?mode=reg")}
			>
				Назад
			</button>
		</div>
	)
}
