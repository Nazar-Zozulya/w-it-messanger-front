import { LoginForm, RegisterForm } from "../../../../features/user"
import styles from "./block.module.css"
import bgImage from "../photos/bg-photo-for-auth-page.png"
import { useState } from "react"

export function AuthFormBlock() {
	const [logOrReg, setLogOrReg] = useState<"log" | "reg">("reg")

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.logOrRegBlock}>
					<button
						className={styles.logOrRegButton}
						onClick={() => setLogOrReg("log")}
					>
						<p
							className={`${
								logOrReg == "reg"
									? styles.logOrRegText
									: styles.logOrRegActiveText
							}`}
						>
							Реєстрація
						</p>
					</button>
					<button
						className={styles.logOrRegButton}
						onClick={() => setLogOrReg("reg")}
					>
						<p
							className={`${
								logOrReg == "log"
									? styles.logOrRegText
									: styles.logOrRegActiveText
							}`}
						>
							Авторизація
						</p>
					</button>
				</div>
				{logOrReg === "reg" ? <LoginForm /> : <RegisterForm />}
			</div>
			<img src={bgImage} alt="" className={styles.bgImage} />
		</div>
	)
}
