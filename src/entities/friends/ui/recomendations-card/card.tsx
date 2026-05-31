import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { Button } from "../../../../shared/ui/button"
import { User, UserAvatar } from "../../../user"
import styles from "./card.module.css"

export function RecomendationsCard(props: User) {
	return (
		<div className={styles.container}>
			<div className={styles.dataDiv}>
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
			</div>

			<div className={styles.buttonsDiv}>
				<Button text="Додати" fill={true} />
				<Button text="Видалити" fill={false} />
			</div>
		</div>
	)
}
