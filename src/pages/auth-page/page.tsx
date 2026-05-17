import { AuthFormBlock, AuthUserHeader } from "../../widgets/user"
import styles from './page.module.css'

export function AuthPage() {
	return (
		<div
			className={styles.container}
		>
			<AuthUserHeader />

			<div className={styles.content}>
				<AuthFormBlock />
			</div>

		</div>
	)
}
