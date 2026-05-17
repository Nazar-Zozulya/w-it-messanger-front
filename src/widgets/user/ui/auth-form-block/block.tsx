import { ConfirmForm, LoginForm, RegisterForm } from "../../../../features/user"
import styles from "./block.module.css"
import bgImage from "../photos/bg-photo-for-auth-page.png"
import { useEffect, useState } from "react"

export function AuthFormBlock() {
	const [logOrReg, setLogOrReg] = useState<"log" | "reg" | "confirm">("confirm")

	useEffect(() => {
		// получаем ссылку
		const url = document.location.href
		// проверяем на наличие query параметров
		if (!url.split("?")[1]) {
			return
		}

		// деструктуризируем query параметры
		const [key, value] = url.split("=")
		// соединяем их в виде обьекта
		const queryParameters = { [key]: value }

		// проверяем на наличие параметра mode
		if (queryParameters.mode) {
			// проверяем на значения параметра mode через switch case
			switch (queryParameters.mode) {
				case "log":
					console.log("log")
					setLogOrReg("log")
					break
				case "reg":
					console.log("reg")
					setLogOrReg("reg")
					break
				case "confirm":
					console.log("confirm")
					setLogOrReg("confirm")
					break
				default:
					console.log("defalt")
					setLogOrReg("log")
					break
			}
		}
	}, [])

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
