import { AlbumIconProps } from "./icon.types";
import styles from './icon.module.css'

export function AlbumIcon(props: AlbumIconProps) {
    return (
        <div className={styles.container}>
            <img src="" alt="" className={styles.img} />
        </div>
    )
}