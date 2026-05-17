import { ConfirmFormTypes } from "./form.types"
import styles from "./form.module.css"
import VerificationInput from "react-verification-input"
import { Button } from "../../../../shared/ui/button"
import { useNavigate } from "react-router-dom"

export function ConfirmForm() {

    const navigate = useNavigate()

	return (
		<div className={styles.container}>
			<p className={styles.title}>Підтвердження пошти</p>
			<p className={styles.description}>
				Ми надіслали 6-значний код на вашу пошту (you@example.com).
				Введіть його нижче, щоб підтвердити акаунт
			</p>

			<div className={styles.verInputDiv}>
				<p className={styles.label}>Код підтвердження</p>
				<VerificationInput
					length={6}
					placeholder="___"
					classNames={{
						container: styles.inputContainer,
						character: styles.inputCharacter,
						characterInactive: styles.inputCharacterInactive,
						characterSelected: styles.inputCharacterSelected,
						characterFilled: styles.inputCharacterFilled,
					}}
				/>
			</div>
			<Button
				type="submit"
				fill={true}
				text="Підтвердити"
				className={styles.submitButton}
                size="L"
                
			/>
			<button className={styles.backButton} onClick={() => navigate("/auth?mode=reg")}>Назад</button>
		</div>
	)
}
