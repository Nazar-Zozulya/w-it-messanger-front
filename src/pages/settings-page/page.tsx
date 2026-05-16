import { useState } from "react"
import { SettingsBlock } from "../../widgets/settings"
import { AlbumBlock } from "../../widgets/album"
import styles from "./page.module.css"

export function SettingsPage() {
	const [pageSelector, setPageSelector] = useState<"settings" | "album">(
		"settings",
	)

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<button
					className={`${styles.selectButton} ${pageSelector === "settings" ? styles.selected : ""}`}
					onClick={() => {
						setPageSelector("settings")
					}}
				>
					Особиста інформація
				</button>
				<div className={styles.line}></div>
				<button
					className={`${styles.selectButton} ${pageSelector === "album" ? styles.selected : ""}`}
					onClick={() => {
						setPageSelector("album")
					}}
				>
					Альбоми
				</button>
			</div>
			{pageSelector === "settings" && <SettingsBlock />}
			{pageSelector === "album" && <AlbumBlock />}
		</div>
	)
}
