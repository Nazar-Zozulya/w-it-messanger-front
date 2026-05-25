import { AlbumIconProps } from "./icon.types"
import styles from "./icon.module.css"
import { Button } from "../../../../shared/ui/button"
import { ReactComponent as Eye } from "../../../../shared/ui/icons/eye.svg"
import { ReactComponent as SlashEye } from "../../../../shared/ui/icons/shashEye.svg"
import { ReactComponent as Trash } from "../../../../shared/ui/icons/trash.svg"

export function AlbumIcon(props: AlbumIconProps) {
	return (
		<div className={styles.container}>
			<img src={props.image} alt="" className={styles.img} />
			<div className={styles.imageButtons}>
				<Button fill={false} icon={<Eye />} className={styles.imageButton} />
				<Button fill={false} icon={<Trash />} className={styles.imageButton} />
			</div>
		</div>
	)
}
