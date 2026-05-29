import { useUserContext } from "../../../../entities/user"
import { AlbumCard } from "../album-card"
import { AddAlbumBlock } from "../add-album-block"
import { MyImagesBlock } from "../my-images-block"
import styles from "./block.module.css"
import { useAlbumsManager } from "../../../../entities/album"

export function AlbumBlock() {
	const { user } = useUserContext()

	const { albums } = useAlbumsManager()

	return (
		<div className={styles.container}>
			<MyImagesBlock />

			{(albums?.length ?? 1 > 0) ? (
				albums?.map((album) => {
					return (
						<AlbumCard
							id={album.id}
							name={album.name}
							year={album.year}
							createdAt={album.createdAt}
							topic={album.topic}
							previewImage={album.previewImage}
							shown={album.shown}
							images={album.images}
						/>
					)
				})
			) : (
				<AddAlbumBlock />
			)}
			<div className={styles.bottomSpace}></div>
		</div>
	)
}
