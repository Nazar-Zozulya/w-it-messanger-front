import { useNavigate } from "react-router-dom"
import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { Button } from "../../../../shared/ui/button"
import { User, UserAvatar, useUserContext } from "../../../user"
import styles from "./card.module.css"
import { useFriendsManager } from "../../model/storage"

export function RequestsCard(props: User) {
	const navigate = useNavigate()

	return (
		<div className={styles.container}>
			<button
				onClick={() => navigate(`/${props.id}`)}
				className={styles.dataDiv}
			>
				<UserAvatar
					avatar={
						props.profile?.avatar ??
						DEFAULT_AVATAR
					}
				/>

				<div className={styles.textDiv}>
					<p className={styles.name}>
						{props.first_name} {props.last_name}
					</p>
					<p className={styles.username}></p>
				</div>
			</button>

			<div className={styles.buttonsDiv}>
				<Button
					text="Підтвердити"
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
