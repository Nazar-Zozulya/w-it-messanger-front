import styles from "./footer.module.css"
import { ReactComponent as House } from "../../../../shared/ui/icons/house.svg"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { ReactComponent as People } from "../../../../shared/ui/icons/people.svg"
import { ReactComponent as Chat } from "../../../../shared/ui/icons/chat.svg"
import { useEffect, useState } from "react"
import { WhichSelectedForFooter } from "./footer.types"
import { useLocation, useNavigate } from "react-router-dom"

export function FooterForPhones() {
	const [whichSelected, setWhichSelected] =
		useState<WhichSelectedForFooter>("main")

	const navigate = useNavigate()

	const location = useLocation()

	useEffect(() => {
		switch (location.pathname) {
			case "/":
				setWhichSelected("main")
				break
			case "/my-posts":
				setWhichSelected("my posts")
				break
			case "/chats":
				setWhichSelected("chats")
				break
			case "/friends":
				setWhichSelected("friends")
				break
			case "/settings":
				setWhichSelected(null)
				break
		}
	}, [location])

	return (
		<div className={styles.container}>
			<button
				className={`${styles.navigationButton} ${whichSelected === "main" && styles.selected}`}
                onClick={() => {navigate("/")}}
			>
				<House style={{ height: "1.8vh", width: "1.8vh" }} />
				<p className={styles.navigationButtonText}>Головна</p>
			</button>
			<button
				className={`${styles.navigationButton} ${whichSelected === "my posts" && styles.selected}`}
                onClick={() => {navigate("/my-posts")}}
			>
				<Gallery style={{ height: "1.8vh", width: "1.8vh" }} />
				<p className={styles.navigationButtonText}>Мої публікації</p>
			</button>
			<button
				className={`${styles.navigationButton} ${whichSelected === "friends" && styles.selected}`}
                onClick={() => {navigate("/friends")}}
			>
				<People style={{ height: "1.8vh", width: "1.8vh" }} />
				<p className={styles.navigationButtonText}>Друзі</p>
			</button>
			<button
				className={`${styles.navigationButton} ${whichSelected === "chats" && styles.selected}`}
                onClick={() => {navigate("/chats")}}
			>
				<Chat style={{ height: "1.8vh", width: "1.8vh" }} />
				<p className={styles.navigationButtonText}>Чати</p>
			</button>
		</div>
	)
}
