import { useUserContext } from "../../../../entities/user"
import { AlbumCard } from "../album-card"
import { AddAlbumBlock } from "../add-album-block"
import { MyImagesBlock } from "../my-images-block"
import styles from "./block.module.css"
import { useAlbumsManager } from "../../../../entities/album"

export function AlbumBlock() {
	const { user } = useUserContext()

	const { albums } = useAlbumsManager()

	console.log("albums =", albums);
	console.log("length =", albums?.length);
	return (
		<div className={styles.container}>
			<MyImagesBlock />

			{(albums && albums.length > 0) ? (
				albums?.map((album) => {
					console.log("albums =", albums);
					console.log("length =", albums?.length);
					return (
						<AlbumCard
							id={album.id}
							name={album.name}
							year={album.year}
							created_at={album.created_at}
							theme={album.theme}
							// previewImage={album.previewImage}
							is_shown={album.is_shown}
							is_default={album.is_default}
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
