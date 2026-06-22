import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"

import { ReactComponent as Search } from "../../../../shared/ui/icons/search.svg"
import { ReactComponent as Plus } from "../../../../shared/ui/icons/plus.svg"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { ReactComponent as Trash } from "../../../../shared/ui/icons/trash.svg"
import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"
import { Button } from "../../../../shared/ui/button"
import { Modal } from "../../../../shared/ui/modal"
import { Input } from "../../../../shared/ui/input"

import { User, useUserContext } from "../../../../entities/user"
import { useFriendsManager } from "../../../../entities/friends"
import { useModalManagerStore } from "../../../../entities/modal/model/storage/modalManager"
import { useChatsManager } from "../../../../entities/chat"

import { CloseModalButton } from "../../../../features/modal"

import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"

import styles from "./modal.module.css"
import { fileToBase64 } from "../../../../helpers/fileToBase64"

export function CreateGroupModal() {
	// general
	const { closeModal, openModal } = useModalManagerStore()
	const [step, setStep] = useState<"one" | "two">("one")
	const { allFriends } = useFriendsManager()
	const { user } = useUserContext()

	// step one
	const [takenUsers, setTakenUsers] = useState<number>(0)
	const [filteredFriends, setFilteredFriends] = useState<
		{ letter: string; users: User[] | null }[]
	>([])

	// step two
	const { handleSubmit, control, formState } = useForm<{ name: string }>()
	const [avatar, setAvatar] = useState<string | undefined>(undefined)
	const [takenFriends, setTakenFriends] = useState<User[]>([])
	const addAvatarRef = useRef<HTMLInputElement>(null)
	const { createGroup } = useChatsManager()
	const [errorStepTwo, setErrorStepTwo] = useState<string>("")

	useEffect(() => {
		if (!allFriends) return

		const grouped = allFriends.reduce<{ letter: string; users: User[] }[]>(
			(acc, friend) => {
				const letter = friend.name?.[0].toLowerCase() ?? ""

				const group = acc.find((g) => g.letter === letter)

				if (group) {
					group.users.push(friend)
				} else {
					acc.push({
						letter,
						users: [friend],
					})
				}

				return acc
			},
			[],
		)

		grouped.sort((a, b) => {
			const aIsDigit = /^\d/.test(a.letter)
			const bIsDigit = /^\d/.test(b.letter)

			if (aIsDigit && !bIsDigit) return 1
			if (!aIsDigit && bIsDigit) return -1

			return a.letter.localeCompare(b.letter, "uk")
		})

		setFilteredFriends(grouped)
		console.log(grouped)
	}, [allFriends])

	function toggleTakeUser(id: number) {
		const isMember = takenFriends.find(
			(takenFriend) => takenFriend.id === id,
		)

		if (!isMember) {
			const thisMember = allFriends?.find(
				(thisFriend) => thisFriend.id === id,
			)

			if (!thisMember) return

			setTakenFriends([...takenFriends, thisMember])
		} else {
			setTakenFriends(
				takenFriends.filter((takenFriend) => {
					return takenFriend.id !== id
				}),
			)
		}
	}

	function deleteMember(id: number) {
		setTakenFriends(
			takenFriends.filter((takenFriend) => {
				return takenFriend.id !== id
			}),
		)
	}

	async function openAvatarFilePicker() {
		const image = await addAvatarRef.current?.click()
	}

	async function getAvatar(event: React.ChangeEvent<HTMLInputElement>) {
		const image = event.target.files?.[0]

		if (!image) return

		const imageBase64 = await fileToBase64(image)

		if (!imageBase64) return

		setAvatar(imageBase64)
	}

	async function createGroupOnSubmit(data: { name: string }) {
		if (!user) return

		const allData: {
			avatar?: string
			name: string
			users: User[]
			adminId: number
		} = {
			name: data.name,
			avatar: avatar,
			users: takenFriends,
			adminId: user.id,
		}
		console.log("all group data:", allData)

		const response = await createGroup(
			allData.users,
			allData.name,
			allData.adminId,
			allData.avatar,
		)

		if (response.status === "error") {
			setErrorStepTwo(response.message ?? "")
			return
		}

		closeModal()
	}

	return (
		<Modal>
			<div className={styles.container}>
				<div className={styles.closeModalButtonDiv}>
					<CloseModalButton />
				</div>
				<p className={styles.title}>Нова група</p>
				{step === "one" ? (
					<>
						<div className={styles.searchDiv}>
							<button className={styles.searchButton}>
								<Search className={styles.searchIcon} />
							</button>
							<input
								type="text"
								className={styles.searchInput}
								placeholder="Пошук"
							/>
						</div>
						<p className={styles.takenUsersCount}>
							Вибрано: {takenUsers}
						</p>
						<div className={styles.usersList}>
							{filteredFriends.map((friendBlock) => {
								return (
									<div className={styles.friendsCluster}>
										<p className={styles.letter}>
											{friendBlock.letter}
										</p>
										{/* <div className={styles.letterUnderline}></div> */}
										{friendBlock.users?.map((friend) => {
											return (
												<div
													className={
														styles.friendCard
													}
												>
													<div
														className={
															styles.friendCardData
														}
													>
														<img
															src={DEFAULT_AVATAR}
															className={
																styles.avatar
															}
															alt=""
														/>
														<p
															className={
																styles.name
															}
														>
															{friend.name
																? `${friend.name} ${friend.surname}`
																: friend.username}
														</p>
													</div>
													{/* TODO доделать галочку */}
													<button
														onClick={() =>
															toggleTakeUser(
																friend.id,
															)
														}
														className={
															styles.selectFriendInput
														}
													>
														<Check
															style={{
																display:
																	takenFriends.find(
																		(
																			takenFriend,
																		) =>
																			takenFriend.id ===
																			friend.id,
																	)
																		? "flex"
																		: "none",
																color: "#543C52",
																height: "9px",
																["--stroke-width" as string]:
																	"3px",
															}}
														/>
													</button>
													{/* <input
														type="checkbox"
														className={
															styles.selectFriendInput
														}
													/> */}
												</div>
											)
										})}
									</div>
								)
							})}
						</div>
						<div className={styles.buttonsDiv}>
							<Button
								fill={false}
								text="Скасувати"
								function={closeModal}
							/>
							<Button
								fill={true}
								text="Далі"
								function={() => {
									setStep("two")
								}}
							/>
						</div>
					</>
				) : (
					<>
						<Input
							label="Назва"
							control={control}
							name="name"
							rules={{
								required: {
									value: true,
									message: "Ім'я для групи обов'язкове",
								},
							}}
							placeholder="Введіть назву"
							fullWidth={true}
							error={formState.errors.name?.message}
						/>

						<div className={styles.groupAvatarBlock}>
							<img
								src={avatar ?? DEFAULT_AVATAR}
								className={styles.avatar}
								alt=""
							/>
							<div className={styles.avatarButtons}>
								<button
									className={styles.addAvatar}
									onClick={() => {
										openAvatarFilePicker()
									}}
								>
									<Plus style={{ color: "#543C52" }} />
									Додайте фото
									<input
										ref={addAvatarRef}
										onChange={getAvatar}
										type="file"
										style={{ display: "none" }}
									/>
								</button>
								<button className={styles.selectAvatar}>
									<Gallery style={{ color: "#543C52" }} />
									Оберіть фото
								</button>
							</div>

							<div className={styles.membersBlock}>
								<p className={styles.membersTitle}>Учасники</p>
								<div className={styles.membersList}>
									{takenFriends.map((friend) => {
										return (
											<div className={styles.memberCard}>
												<div
													className={
														styles.friendCardData
													}
												>
													<img
														src={DEFAULT_AVATAR}
														className={
															styles.avatar
														}
														alt=""
													/>
													<p className={styles.name}>
														{friend.name
															? `${friend.name} ${friend.surname ?? ""}`
															: friend.username}
													</p>
												</div>
												<button
													className={
														styles.deleteMember
													}
													onClick={() => {
														deleteMember(friend.id)
													}}
												>
													<Trash
														style={{
															color: "#000",
														}}
													/>
												</button>
											</div>
										)
									})}
								</div>
							</div>
							<p className={styles.error}>{errorStepTwo}</p>
							<div className={styles.buttonsDiv}>
								<Button
									fill={false}
									text=" Назад"
									function={() => setStep("one")}
								/>
								<Button
									fill={true}
									text="Створити групу"
									function={() => {
										handleSubmit(createGroupOnSubmit)()
									}}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</Modal>
	)
}
