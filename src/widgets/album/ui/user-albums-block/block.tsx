import { Album } from "../../../../entities/user"
import styles from "./block.module.css"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { useEffect, useState } from "react"
import { useAlbumsManager } from "../../../../entities/album"
import { useNavigate } from "react-router-dom"


export function UserAlbumsBlock(props: {userId: number}) {

	const [albums, setAlbums] = useState<Album[] | null>(null)

	const { getAlbumsByUserId } = useAlbumsManager()

	const navigate = useNavigate()


	useEffect(() => {
		async function fetchAlbums() {
			const response = await getAlbumsByUserId(props.userId, 1, 3)

			if (response.status === "success") {
				setAlbums(response.data)
			}
		}

		fetchAlbums()
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.titleDiv}>
					<Gallery stroke="#81818E" />
					<p className={styles.title}>Альбоми</p>
				</div>
				<button className={styles.seeAllButton} onClick={() => {navigate(`/albums/${props.userId}`)}}>Дивитись всі</button>
			</div>
			{albums &&
			albums.length > 0 ? (
				<div className={styles.line}></div>
			) : undefined}

			<div className={styles.content}>
				{albums &&
				albums.length >
					0 ? (
					albums
						.filter((a) => a.isMyPhotoAlbum !== true)
						.map((album) => {
							return (
								<div className={styles.album}>
									<p className={styles.name}>{album.name}</p>
									<div className={styles.textData}>
										<p className={styles.topic}>
											{album.theme}
										</p>
										<p className={styles.year}>
											{album.year}
										</p>
									</div>
									{album?.images && album.images.length > 0 ? <img
										src={
											album?.images[
												album?.images?.length - 1
											]?.image
										}
										alt={album.name}
										className={styles.previewImage}
									/> : undefined }
									{/* <img
										src={
											album?.images[
												album.images.length - 1
											]?.image
										}
										alt={album.name}
										className={styles.previewImage}
									/> */}
								</div>
							)
						})
				) : (
					<p className={styles.noAlbums}>
						Поки що у цього користувача немає альбомів.
					</p>
				)}
			</div>
		</div>
	)
}
