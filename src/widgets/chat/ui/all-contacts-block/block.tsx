import { Button } from "../../../../shared/ui/button"
import styles from "./block.module.css"
import { ReactComponent as Plus } from "../../../../shared/ui/icons/plus.svg"
import { ReactComponent as People } from "../../../../shared/ui/icons/people.svg"
import { ReactComponent as Search } from "../../../../shared/ui/icons/search.svg"
import { AnotherUserCard, useUserContext } from "../../../../entities/user"
import { useFriendsManager } from "../../../../entities/friends"
import { POST } from "../../../../helpers/post"
import { use } from "react"
import { useNavigate } from "react-router-dom"
import { Chat } from "../../../../entities/chat"
import { useModalManagerStore } from "../../../../entities/modal/model/storage/modalManager"

export function AllContactsBlock() {
	const { allFriends } = useFriendsManager()
	const { user } = useUserContext()
	const navigate = useNavigate()
	const { openModal } = useModalManagerStore()

	return (
		<div className={styles.container}>
			<Button
				fill={true}
				text="Створити груповий чат"
				icon={<Plus />}
				className={styles.createGroupButton}
				function={() => {openModal("createGroup")}}
			/>
			<div className={styles.allContacts}>
				<div className={styles.titleDiv}>
					<People style={{ color: "#81818D" }} />
					<p className={styles.title}>Контакти</p>
				</div>
				<div className={styles.searchDiv}>
					<button className={styles.searchButton}>
						<Search style={{ color: "#81818D" }} />
					</button>
					<input
						type="text"
						className={styles.searchInput}
						placeholder="Пошук"
					/>
				</div>
				<div className={styles.contactsList}>
					{allFriends?.map((friend) => {
						return (
							<AnotherUserCard
								username={friend.username}
								function={async () => {
									const response = await POST<Chat>({
										whichService: "chatService",
										endpoint: "api/chat/get-chat",
										body: {
											userId: user?.id,
											anotherUserId: friend.id,
										},
									})

									if (response.status === "error") {
										console.log("chat found or create problems")
										return
									}
									navigate(`/chat/${response.data.id}`)
								}}
								name={friend.name}
								surname={friend.surname}
								// avatar={
								// 	friend.profile.activeAvatar?.image.base64
								// }
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}
