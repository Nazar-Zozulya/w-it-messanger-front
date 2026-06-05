import { Album } from "../../../../entities/user"
import styles from "./block.module.css"
import { ReactComponent as Gallery } from '../../../../shared/ui/icons/gallery.svg'

export function UserAlbumsBlock(props: { albums: Album[] }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.titleDiv}>
					<Gallery stroke="#81818E" />
					<p className={styles.title}>Альбоми</p>
				</div>
				<button className={styles.seeAllButton}>Дивитись всі</button>
			</div>
			<div className={styles.line}></div>
			<div className={styles.content}>
				{props.albums.map((album) => {
					return (
						<div className={styles.album}>
							<p className={styles.name}>{album.name}</p>
							<div className={styles.textData}>
								<p className={styles.topic}>{album.topic}</p>
								<p className={styles.year}>{album.year}</p>
							</div>
							<img src={album.images[album.images.length - 1].base64} alt={album.name} className={styles.previewImage} />
						</div>
					)
				})}
			</div>
		</div>
	)
}
