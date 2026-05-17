import { ConfirmForm, LoginForm, RegisterForm } from "../../../../features/user"
import styles from "./block.module.css"
import bgImage from "../photos/bg-photo-for-auth-page.png"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export function AuthFormBlock() {
	const [logOrReg, setLogOrReg] = useState<"log" | "reg" | "confirm">("reg")

	const [searchParams] = useSearchParams()

	useEffect(() => {
		// получаем query параметр
		const mode = searchParams.get("mode")

		switch (mode) {
			case "log":
				setLogOrReg("log")
				break
			case "reg":
				setLogOrReg("reg")
				break
			case "confirm":
				setLogOrReg("confirm")
				break
			default:
				setLogOrReg("log")
		}
	}, [searchParams])

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{logOrReg !== "confirm" ? (
					<div className={styles.logOrRegBlock}>
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
								Реєстрація
							</p>
						</button>
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
								Авторизація
							</p>
						</button>
					</div>
				) : null}
				{logOrReg === "log" && <LoginForm />}
				{logOrReg === "reg" && <RegisterForm />}
				{logOrReg === "confirm" && <ConfirmForm />}
			</div>
			<img src={bgImage} alt="" className={styles.bgImage} />
		</div>
	)
}
