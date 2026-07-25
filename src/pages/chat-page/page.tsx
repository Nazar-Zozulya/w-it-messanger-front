import { useEffect, useState } from "react"
import {
	AllContactsBlock,
	ChatBlock,
	ChatNotificationsBlock,
} from "../../widgets/chat"
import styles from "./page.module.css"
import { ChatPageProps, ChatSelectedMode } from "./page.types"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ReactComponent as Peopel } from '../../shared/ui/icons/people.svg'
import { ReactComponent as Chats } from '../../shared/ui/icons/chat.svg'

export function ChatPage(props: ChatPageProps) {
	const [selectedMode, setSelectedMode] = useState<ChatSelectedMode>("contacts")
	const navigate = useNavigate()

	const location = useLocation()

	const { id } = useParams()

	useEffect(() => {
			switch (location.pathname) {
				case `/chat/${id}`:
					setSelectedMode("selected-chat")
					break
				case `/group/${id}`:
					setSelectedMode("selected-group")
					break
			}
		}, [location])

	return (
		<div className={styles.container}>
			<div className={styles.phoneHeader}>
				<button
					className={`${styles.navigationButton} ${selectedMode === "contacts" && styles.selected}`}
					onClick={() => {
						navigate("/chats")
						setSelectedMode("contacts")
					}}
				>
					<Peopel style={{ height: "1.8vh", width: "1.8vh" }} />
					<p className={styles.navigationButtonText}>Контакти</p>
				</button>
				<button
					className={`${styles.navigationButton} ${selectedMode === "notifications" && styles.selected}`}
					onClick={() => {
						navigate("/chats")
						setSelectedMode("notifications")
					}}
				>
					<Chats style={{ height: "1.8vh", width: "1.8vh" }} />
					<p className={styles.navigationButtonText}>
						Повідомлення
					</p>
				</button>
				<button
					className={`${styles.navigationButton} ${selectedMode === "groups" && styles.selected}`}
					onClick={() => {
						navigate("/chats")
						setSelectedMode("groups")
					}}
				>
					<Chats style={{ height: "1.8vh", width: "1.8vh" }} />
					<p className={styles.navigationButtonText}>Групові чати</p>
				</button>
			</div>
			<div className={styles.content}>
				{window.matchMedia("(pointer: coarse)").matches ? (
					<>
						{selectedMode === "contacts" && <AllContactsBlock />}
						{selectedMode === "notifications" && (
							<ChatNotificationsBlock mode="notifications" />
						)}
						{selectedMode === "groups" && (
							<ChatNotificationsBlock mode="groups" />
						)}
						{selectedMode === "selected-group" && (
							<ChatBlock mode={props.mode} />
						)}
						{selectedMode === "selected-chat" && (
							<ChatBlock mode={props.mode} />
						)}
					</>
				) : (
					<>
						<AllContactsBlock />
						<ChatBlock mode={props.mode} />
						<ChatNotificationsBlock mode="all" />
					</>
				)}
			</div>
			<div className={styles.bottomSpace}></div>
		</div>
	)
}
