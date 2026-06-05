import { useState } from "react"
import { FriendsBlock, FriendsMainBlock, RecomendationsBlock, RequestsBlock } from "../../widgets/friends"
import styles from "./page.module.css"

export function FriendsPage() {
	const [pageSelector, setPageSelector] = useState<
		"main" | "requests" | "recomendations" | "friends"
	>("main")

	return (
		<div className={styles.container}>
			<div className={styles.navigation}>
				<button
					className={`${styles.selectButton} ${pageSelector === "main" ? styles.selected : ""}`}
					onClick={() => {
						setPageSelector("main")
					}}
				>
					Головна
				</button>
				<button
					className={`${styles.selectButton} ${pageSelector === "requests" ? styles.selected : ""}`}
					onClick={() => {
						setPageSelector("requests")
					}}
				>
					Запити
				</button>
                <button
					className={`${styles.selectButton} ${pageSelector === "recomendations" ? styles.selected : ""}`}
					onClick={() => {
						setPageSelector("recomendations")
					}}
				>
					Рекомендації
				</button>
				<button
					className={`${styles.selectButton} ${pageSelector === "friends" ? styles.selected : ""}`}
					onClick={() => {
						setPageSelector("friends")
					}}
				>
					Всі друзі
				</button>
			</div>

            { pageSelector === "main" && <FriendsMainBlock goToRequests={ ()=> setPageSelector("requests") } goToRecomendations={ ()=> setPageSelector("recomendations") } goToFriends={ ()=> setPageSelector("friends") } /> }
            { pageSelector === "requests" && <RequestsBlock goToMain={ ()=> setPageSelector("main") } /> }
            { pageSelector === "recomendations" && <RecomendationsBlock goToMain={ ()=> setPageSelector("main") } /> }
            { pageSelector === "friends" && <FriendsBlock goToMain={ ()=> setPageSelector("main") } /> }
		</div>
	)
}
