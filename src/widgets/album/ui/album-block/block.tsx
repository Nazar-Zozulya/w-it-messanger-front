import { MyImagesBlock } from "../my-images-block"
import styles from "./block.module.css"


export function AlbumBlock() {
    return (
        <div className={styles.container}>
            <MyImagesBlock />
        </div>
    )
}