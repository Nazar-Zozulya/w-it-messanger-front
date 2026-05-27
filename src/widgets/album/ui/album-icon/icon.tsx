import { AlbumIconProps } from "./icon.types"
import styles from "./icon.module.css"
import { Button } from "../../../../shared/ui/button"
import { ReactComponent as Eye } from "../../../../shared/ui/icons/eye.svg"
import { ReactComponent as SlashEye } from "../../../../shared/ui/icons/shashEye.svg"
import { ReactComponent as Trash } from "../../../../shared/ui/icons/trash.svg"
import { POST } from "../../../../helpers/post"
import { useUserContext } from "../../../../entities/user"

export function AlbumIcon(props: AlbumIconProps) {
	const { token } = useUserContext()

	async function deleteImage() {
		if (!token) return

		const response = await POST<string>({
			method: "DELETE",
			whichService: "userService",
			endpoint: "api/user/image/delete",
			token,
			body: { imageId: props.id },
		})

		if (response.status === "success") {
			props.onDelete(props.id)
		}
	}

	async function toggleShown() {
		if (!token) return

		const response = await POST<string>({
			method: "PATCH",
			whichService: "userService",
			endpoint: "api/user/image/switch-shown",
			token,
			body: { imageId: props.id },
		})

		if (response.status === "success") {
			props.switchShown(props.id)
		}
	}

	return (
		<div className={`${styles.container}`}>
			<img src={props.image} alt="" className={styles.img} />
			<div className={`${styles.imageButtons}`}>
				<Button
					fill={false}
					icon={props.shown ? <Eye /> : <SlashEye />}
					className={styles.imageButton}
					function={() => {
						toggleShown()
					}}
				/>
				<Button
					fill={false}
					icon={<Trash />}
					className={styles.imageButton}
					function={() => {
						deleteImage()
					}}
				/>
			</div>
		</div>
	)
}
