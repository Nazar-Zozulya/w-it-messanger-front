import { CloseModalButton } from "../../../../features/modal"
import { Modal } from "../../../../shared/ui/modal"
import styles from "./modal.module.css"
import { ReactComponent as Search } from "../../../../shared/ui/icons/search.svg"
import { useEffect, useState } from "react"
import { useFriendsManager } from "../../../../entities/friends"
import { User } from "../../../../entities/user"

export function CreateGroupStepOneModal() {
	const [takenUsers, setTakenUsers] = useState<number>(0)
	const { allFriends } = useFriendsManager()
	const [filteredFriends, setFilteredFriends] = useState<
		{ letter: string; users: Pick<User, "name">[] | null }[]
	>([])

	useEffect(() => {
		if (!allFriends) return

		const friends: Pick<User, "name">[] = [
			{ name: "aff" },
			{ name: "1" },
			{ name: "Aff" },
			{ name: "bff" },
			{ name: "cff" },
		]

		const grouped = friends.reduce<
			{ letter: string; users: Pick<User, "name">[] }[]
		>((acc, friend) => {
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
		}, [])

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
	return (
		<Modal>
			<div className={styles.container}>
				<div className={styles.closeModalButtonDiv}>
					<CloseModalButton />
				</div>
				<p className={styles.title}>Нова група</p>
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
				<p className={styles.takenUsersCount}>{takenUsers}</p>
				<div className={styles.usersList}></div>
			</div>
		</Modal>
	)
}
