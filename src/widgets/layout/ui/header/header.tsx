import styles from "./header.module.css"
import { ReactComponent as Logo } from "../../../../shared/ui/icons/logo.svg"
import { NavigationButton } from "../../../../features/layout"
import { Button } from "../../../../shared/ui/button/button"
import { ReactComponent as House } from "../../../../shared/ui/icons/house.svg"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { ReactComponent as People } from "../../../../shared/ui/icons/people.svg"
import { ReactComponent as Chat } from "../../../../shared/ui/icons/chat.svg"
import { ReactComponent as Settings } from "../../../../shared/ui/icons/settings.svg"
import { ReactComponent as Person } from "../../../../shared/ui/icons/person.svg"
import { ReactComponent as Plus } from "../../../../shared/ui/icons/plus.svg"
import { WhichSelected } from "./header.types"
import { useEffect, useState } from "react"
import { useUserContext } from "../../../../entities/user"
import { useLocation, useNavigate } from "react-router-dom"
import { useModalManagerStore } from "../../../../entities/modal/model/storage/modalManager"
import { LogoutButton } from "../../../../features/user"

export function Header() {
	const [whichSelected, setWhichSelected] = useState<WhichSelected>("main")

	const navigate = useNavigate()

	const { user } = useUserContext()

	const location = useLocation()

	const { logout } = useUserContext()

	const { openModal } = useModalManagerStore()

	useEffect(() => {
		switch (location.pathname) {
			case "/":
				setWhichSelected("main")
				break
			case "/my-posts":
				setWhichSelected("my posts")
				break
			case "/settings":
				setWhichSelected("settings")
				break
			case "/chats":
				setWhichSelected("chats")
				break
			case "/friends":
				setWhichSelected("friends")
				break
		}
	}, [location])

	return (
		<div className={styles.container}>
			<button
				className={styles.logoButton}
				onClick={() => {
					navigate("/")
					setWhichSelected("main")
				}}
			>
				<Logo style={{ height: "1.9vh" }} />
			</button>

			<div className={styles.navigationForPC}>
				{user && (
					<>
						<NavigationButton
							icon={
								<House
									style={{ height: "1.8vh", width: "1.8vh" }}
								/>
							}
							text="Головна"
							redirect="/"
							onClick={() => {
								setWhichSelected("main")
							}}
							isSelected={whichSelected == "main"}
						/>
						<NavigationButton
							icon={
								<Gallery
									style={{ height: "1.8vh", width: "1.8vh" }}
								/>
							}
							text="Мої публікації"
							redirect="/my-posts"
							onClick={() => {
								setWhichSelected("my posts")
							}}
							isSelected={whichSelected == "my posts"}
						/>
						<NavigationButton
							icon={
								<People
									style={{ height: "1.8vh", width: "1.8vh" }}
								/>
							}
							text="Друзі"
							redirect="/friends"
							onClick={() => {
								setWhichSelected("friends")
							}}
							isSelected={whichSelected == "friends"}
						/>
						<NavigationButton
							icon={
								<Chat
									style={{ height: "1.8vh", width: "1.8vh" }}
								/>
							}
							text="Чати"
							redirect="/chats"
							onClick={() => {
								setWhichSelected("chats")
							}}
							isSelected={whichSelected == "chats"}
						/>
						<NavigationButton
							icon={
								<Settings
									style={{ height: "1.8vh", width: "1.8vh" }}
								/>
							}
							text="Налаштування"
							redirect="/settings"
							onClick={() => {
								setWhichSelected("settings")
							}}
							isSelected={whichSelected == "settings"}
						/>
						<LogoutButton mode="PC" />
					</>
				)}

				{!user && (
					<Button
						fill={false}
						text={"Увійти"}
						function={() => {
							navigate("/auth")
						}}
						icon={
							<Person
								style={{ height: "1.6vh", width: "1.6vh" }}
							/>
						}
					/>
				)}
			</div>
			<div className={styles.navigationForPhone}>
				{user && (
					<>
						{whichSelected === "main" && (
							<Button
								fill={false}
								icon={
									<Plus
										style={{
											height: "1.8vh",
											width: "1.8vh",
										}}
									/>
								}
								function={() => {
									openModal("createPost")
								}}
							/>
						)}
						{whichSelected === "my posts" && (
							<Button
								fill={false}
								icon={
									<Plus
										style={{
											height: "1.8vh",
											width: "1.8vh",
										}}
									/>
								}
								function={() => {
									openModal("createPost")
								}}
							/>
						)}
						{whichSelected === "chats" && (
							<Button
								fill={false}
								icon={
									<Plus
										style={{
											height: "1.8vh",
											width: "1.8vh",
										}}
									/>
								}
								function={() => {
									openModal("createGroup")
								}}
							/>
						)}
						{whichSelected !== "chats" && (
							<Button
								fill={false}
								icon={
									<Settings
										style={{
											height: "1.8vh",
											width: "1.8vh",
										}}
									/>
								}
								function={() => {
									navigate("/settings")
								}}
							/>
						)}
						<Button
							fill={false}
							function={() => {
								logout()
								navigate("/auth")
							}}
							icon={<LogoutButton mode="mobile" />}
						/>
					</>
				)}

				{!user && (
					<Button
						fill={false}
						text={"Увійти"}
						function={() => {
							navigate("/auth")
						}}
						icon={
							<Person
								style={{ height: "1.6vh", width: "1.6vh" }}
							/>
						}
					/>
				)}
			</div>
		</div>
	)
}
