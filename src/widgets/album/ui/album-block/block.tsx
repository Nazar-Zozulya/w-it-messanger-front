import { useUserContext } from "../../../../entities/user"
import { AlbumCard } from "../album-card"
import { AddAlbumBlock } from "../add-album-block"
import { MyImagesBlock } from "../my-images-block"
import styles from "./block.module.css"
import { useAlbumsManager } from "../../../../entities/album"
import { Fragment, useEffect, useRef } from "react"

const PAGE_SIZE = 4
const PRELOAD_OFFSET = PAGE_SIZE - 1

export function AlbumBlock() {
	const { user, token } = useUserContext()

	const { albums, getAlbums } = useAlbumsManager()

	const page = useRef(1)

	const observer = useRef<IntersectionObserver | null>(null)
	const targetRef = useRef<HTMLDivElement>(null)

	const loading = useRef(false)
	const hasMore = useRef(true)

	useEffect(() => {
		const element = targetRef.current

		if (!element) return

		observer.current?.disconnect()

		observer.current = new IntersectionObserver(async ([entry]) => {
			if (!entry.isIntersecting) return
			if (loading.current) return
			if (!hasMore.current) return

			loading.current = true

			try {
				let loadedCount = 0

				page.current++

				console.log("page =", page.current)
				if (!token) return

				loadedCount = await getAlbums(token, page.current, PAGE_SIZE)

				if (loadedCount < PAGE_SIZE) {
					hasMore.current = false
					observer.current?.disconnect()
				}
			} finally {
				loading.current = false
			}
		})

		observer.current.observe(element)

		return () => observer.current?.disconnect()
	}, [user])

	console.log("albums =", albums)
	console.log("length =", albums?.length)
	return (
		<div className={styles.container}>
			<MyImagesBlock />

			<AddAlbumBlock
				mode={albums && albums.length > 0 ? "has-albums" : "no-albums"}
			/>
			{albums?.map((album, index) => {
				console.log("albums =", albums)
				console.log("length =", albums?.length)
				return (
					<Fragment key={album.id}>
						{index === albums?.length - PRELOAD_OFFSET && (
							<div ref={targetRef} style={{ height: 1 }} />
						)}
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
					</Fragment>
				)
			})}

			{/* {(albums && albums.length > 0) ? (
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
			) : ( */}
			{/* )} */}
			<div className={styles.bottomSpace}></div>
		</div>
	)
}
