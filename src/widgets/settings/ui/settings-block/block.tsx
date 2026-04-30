import { Button } from "../../../../shared/ui/button"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import { ReactComponent as Edit } from "../../../../shared/ui/icons/edit.svg"
import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"

import styles from "./block.module.css"
import { useUserContext } from "../../../../entities/user"
import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { UserInfoBlock } from "../user-info-block"
import { UserAvatarBlock } from "../user-avatar-block"
import { ChangePasswordBlock } from "../change-password-block"
import { SetSignatureBlock } from "../set-signature-block"

export function SettingsBlock() {
	const { user } = useUserContext()

	return (
		<div className={styles.container}>
			<UserAvatarBlock />

			<UserInfoBlock />

			<ChangePasswordBlock />

			<SetSignatureBlock />
		</div>
	)
}
