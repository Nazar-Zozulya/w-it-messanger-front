import { AlbumIconProps, LoadingAlbumIconProps } from "./icon.types"
import styles from "./icon.module.css"
import { Button } from "../../../../shared/ui/button"
import { ReactComponent as Eye } from "../../../../shared/ui/icons/eye.svg"
import { ReactComponent as SlashEye } from "../../../../shared/ui/icons/shashEye.svg"
import { ReactComponent as Trash } from "../../../../shared/ui/icons/trash.svg"

export function AlbumIcon(props: AlbumIconProps) {

	async function deleteImage() {
		props.onDelete(props.id)
	}

	async function toggleShown() {
		props.switchShown(props.id)
	}

	return (
		<div className={`${styles.container}`}>
			<img src={props.image} alt="" className={styles.img} />
			<div className={`${styles.imageButtons}`}>
				<Button
					fill={false}
					icon={props.shown ? <Eye style={{color: "#543C52"}} /> : <SlashEye style={{color: "#543C52"}} />}
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


function LoadingAlbumIcon(props: LoadingAlbumIconProps) {
	return (
		<div className={`${styles.container}`}>
			<img src={props.image} alt="" className={`${styles.img} ${styles.loading}`} />
			{/* <div className={`${styles.imageButtons}`}>
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
			</div> */}
		</div>
	)
}

AlbumIcon.Loading = LoadingAlbumIcon