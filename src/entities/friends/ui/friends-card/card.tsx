import { useNavigate } from "react-router-dom"
import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { Button } from "../../../../shared/ui/button"
import { User, UserAvatar, useUserContext } from "../../../user"
import styles from "./card.module.css"
import { useFriendsManager } from "../../model/storage"

export function FriendsCard(props: User) {
	const navigate = useNavigate()
	const { deleteRelationship } = useFriendsManager()
	const { token } = useUserContext()

	return (
		<div className={styles.container}>
			<button
				onClick={() => navigate(`/${props.id}`)}
				className={styles.dataDiv}
			>
				<UserAvatar
					avatar={
						props.profile?.activeAvatar?.image?.base64 ??
						DEFAULT_AVATAR
					}
				/>

				<div className={styles.textDiv}>
					<p className={styles.name}>
						{props.name} {props.surname}
					</p>
					<p className={styles.username}></p>
				</div>
			</button>

			<div className={styles.buttonsDiv}>
				<Button
					text="Повідомлення"
					fill={true}
					function={() => navigate(`/${props.id}`)}
				/>
				<Button
					text="Видалити"
					fill={false}
					function={() => navigate(`/${props.id}`)}
				/>
			</div>
		</div>
	)
}
