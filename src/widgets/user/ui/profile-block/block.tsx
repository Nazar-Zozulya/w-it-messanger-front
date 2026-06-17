import { useEffect, useState } from "react"
import { User, UserAvatar, useUserContext } from "../../../../entities/user"
import styles from "./block.module.css"
import { ProfileBlockProps } from "./block.types"
import {
	FriendshipStatus,
	useFriendsManager,
} from "../../../../entities/friends"
import { Button } from "../../../../shared/ui/button"
import { POST } from "../../../../helpers/post"
import { Chat } from "../../../../entities/chat"
import { useNavigate } from "react-router-dom"

export function ProfileBlock(props: ProfileBlockProps) {
	const { user, token } = useUserContext()

	const { whichFriendship, deleteRelationship, acceptRequest, sendRequest } =
		useFriendsManager()

	const [friendshipStatus, setFriendshipStatus] =
		useState<FriendshipStatus | null>(null)

	const [selectedUser, setSelectedUser] = useState<User | null | undefined>(
		null,
	)

	const navigate = useNavigate()

	useEffect(() => {
		async function fetchAnotherUser() {
			if (props.mode === "anotherUser") {
				setSelectedUser(props.anotherUser)
				if (!token) return
				const statusOfFriendship = await whichFriendship(
					props.anotherUser?.id ?? 1,
					token,
				)
				setFriendshipStatus(statusOfFriendship)
			} else {
				setSelectedUser(user)
			}
		}
		fetchAnotherUser()
	}, [props.mode])

	async function reuseFriendshipStatus() {
		if (!token) return
		const statusOfFriendship = await whichFriendship(
			props.anotherUser?.id ?? 1,
			token,
		)
		setFriendshipStatus(statusOfFriendship)
	}

	useEffect(() => {
		if (props.mode === "anotherUser") {
			setSelectedUser(props.anotherUser)
		} else {
			setSelectedUser(user)
		}
	}, [user])

	return (
		<div
			className={`${styles.container} ${props.mode === "anotherUser" ? styles.anotherUserSize : undefined}`}
		>
			<div className={styles.ProfileInfo}>
				<UserAvatar
					avatar={
						selectedUser?.profile.activeAvatar?.image.base64 ??
						undefined
					}
				/>

				<div className={styles.NameBlock}>
					<p className={styles.Name}>{selectedUser?.name}</p>
					<p className={styles.Username}>@{selectedUser?.username}</p>
				</div>
			</div>

			{user ? (
				<div className={styles.anotherOrMyProfileStats}>
					<div className={styles.ProfileStats}>
						<div className={styles.StatBlock}>
							<p className={styles.StatCount}>566</p>
							<p className={styles.StatName}>Дописи</p>
						</div>

						<div
							className={
								styles.StatBlock + " " + styles.BorderedSides
							}
						>
							<p className={styles.StatCount}>566</p>
							<p className={styles.StatName}>Читачі</p>
						</div>

						<div className={styles.StatBlock}>
							<p className={styles.StatCount}>566</p>
							<p className={styles.StatName}>Друзі</p>
						</div>
					</div>
					{props.mode === "anotherUser" ? (
						<div className={styles.anotherUserButtons}>
							{friendshipStatus === "none" && (
								<Button
									fill={true}
									text={"Додати друга"}
									function={async () => {
										if (!token) return
										const response = await sendRequest(
											props.anotherUser?.id ?? 0,
											token,
										)
										if (response.status === "success") {
											setFriendshipStatus("requester")
										}
									}}
								/>
							)}

							{friendshipStatus === "requester" && (
								<Button
									fill={true}
									text={"Відмінити запрос"}
									function={async () => {
										if (!token) return
										const response =
											await deleteRelationship(
												props.anotherUser?.id ?? 0,
												token,
											)
										if (response.status === "success") {
											setFriendshipStatus("none")
										}
									}}
								/>
							)}

							{friendshipStatus === "recipient" && (
								<Button
									fill={true}
									text={"Підтвердити"}
									function={async () => {
										if (!token) return
										const response = await acceptRequest(
											props.anotherUser?.id ?? 0,
											token,
										)
										if (response.status == "success") {
											setFriendshipStatus("friends")
										}
									}}
								/>
							)}

							{friendshipStatus === "friends" && (
								<Button
									fill={true}
									text={"Повідомлення"}
									function={async () => {
										const response = await POST<Chat>({
											whichService: "chatService",
											endpoint: "api/chat/get-chat",
											body: {
												userId: user?.id,
												anotherUserId: selectedUser?.id,
											},
										})

										if (response.status === "error") {
											console.log(
												"chat found or create problems",
											)
											return
										}
										navigate(`/chat/${response.data.id}`)
									}}
								/>
							)}

							{/* <Button fill={true} text={friendshipStatus ?? ""} /> */}

							{friendshipStatus === "none" ||
							friendshipStatus === "requester" ? undefined : (
								<Button
									fill={false}
									text="Видалити"
									function={async () => {
										if (!token) return
										const response =
											await deleteRelationship(
												props.anotherUser?.id ?? 0,
												token,
											)
										if (response.status === "success") {
											setFriendshipStatus("none")
										}
									}}
								/>
							)}
						</div>
					) : undefined}
					{/* {friendshipStatus} */}
				</div>
			) : (
				<a href="auth">auth</a>
			)}

			{/* <div className={styles.ProfileStats}>
                <div className={styles.StatBlock}>
                    <p className={styles.StatCount}>566</p>
                    <p className={styles.StatName}>Дописи</p>
                </div>

                <div className={styles.StatBlock + " " + styles.BorderedSides}>
                    <p className={styles.StatCount}>566</p>
                    <p className={styles.StatName}>Читачі</p>
                </div>

                <div className={styles.StatBlock}>
                    <p className={styles.StatCount}>566</p>
                    <p className={styles.StatName}>Друзі</p>
                </div>

            </div> */}
		</div>
	)
}
