import { Album, useUserContext } from "../../../../entities/user"
import { AlbumCard } from "../album-card"
import { AddAlbumBlock } from "../add-album-block"
import { MyImagesBlock } from "../my-images-block"
import styles from "./block.module.css"
import { useAlbumsManager } from "../../../../entities/album"
import { Fragment, useEffect, useRef, useState } from "react"
import { LoadingAlbumCard } from "../album-card/card"
import { BounceLoader } from "react-spinners"

const PAGE_SIZE = 4
const PRELOAD_OFFSET = PAGE_SIZE - 1

export function AlbumBlock() {
	const { user, token } = useUserContext()

	const { albums, getAlbums, preAlbums } = useAlbumsManager()

	const page = useRef(1)

	const observer = useRef<IntersectionObserver | null>(null)
	const targetRef = useRef<HTMLDivElement>(null)

	const loading = useRef(false)
	const [isLoading, setIsLoading] = useState(false)
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
			setIsLoading(true)

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
				loading.current = false
			} finally {
				loading.current = false
				setIsLoading(false)
			}
		})

		observer.current.observe(element)

		return () => observer.current?.disconnect()
	}, [user])

	return (
		<div className={styles.container}>
			<MyImagesBlock />
			{/* <BeatLoader /> */}

			<AddAlbumBlock
				mode={
					albums?.filter((a) => a.isMyPhotoAlbum !== true) &&
					albums?.filter((a) => a.isMyPhotoAlbum !== true).length > 0
						? "has-albums"
						: "no-albums"
				}
			/>
			{preAlbums?.map((album, index) => {
				return (
					<LoadingAlbumCard
						name={album.name}
						theme={album.theme}
						year={album.year}
					/>
				)
			})}
			{albums
				?.filter((a) => a.isMyPhotoAlbum !== true)
				?.map((album, index) => {
					console.log("albums =", albums)
					console.log("length =", albums?.length)
					return (
						<Fragment key={album.id}>
							{index === albums?.length - PRELOAD_OFFSET && (
								<div ref={targetRef} style={{ height: 1 }} />
							)}
							<AlbumCard
								isYourAlbum={true}
								id={album.id}
								profileId={album.profileId}
								isMyPhotoAlbum={album.isMyPhotoAlbum}
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
			{isLoading === true && <BounceLoader color="#81818d" size={"5vh"} />}
			<div className={styles.bottomSpace}></div>
		</div>
	)
}

export function AnotherUserAlbumBlock(props: { userId: number }) {
	const { user, token } = useUserContext()

	const { getAlbumsByUserId } = useAlbumsManager()

	const [albums, setAlbums] = useState<Album[] | null>(null)

	const page = useRef(1)

	const observer = useRef<IntersectionObserver | null>(null)
	const targetRef = useRef<HTMLDivElement>(null)

	const loading = useRef(false)
	const [isLoading, setIsLoading] = useState(false)
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
			setIsLoading(true)

			try {
				let loadedCount = 0

				page.current++

				console.log("page =", page.current)
				if (!token) return

				const response = await getAlbumsByUserId(
					props.userId,
					page.current,
					PAGE_SIZE,
				)

				if (response.status === "error") return

				setAlbums((prevAlbums) => [
					...(prevAlbums ?? []),
					...response.data,
				])

				loadedCount = response.data.length

				if (loadedCount < PAGE_SIZE) {
					console.log("pisi popi kakashki")
					hasMore.current = false
					observer.current?.disconnect()
				}
			} finally {
				loading.current = false
				setIsLoading(false)
			}
		})

		observer.current.observe(element)

		return () => observer.current?.disconnect()
	}, [user, albums])

	useEffect(() => {
		async function fetchAlbums() {
			const response = await getAlbumsByUserId(props.userId, 1, PAGE_SIZE)

			if (response.status === "success") {
				setAlbums(response.data)
			}
		}

		fetchAlbums()
	}, [])

	return (
		<div className={styles.container}>
			{albums?.map((album, index) => {
				console.log("albums =", albums)
				console.log("length =", albums?.length)
				return (
					<Fragment key={album.id}>
						{index === albums?.length - PRELOAD_OFFSET && (
							<div ref={targetRef} style={{ height: 1 }} />
						)}
						<AlbumCard
							isYourAlbum={false}
							id={album.id}
							profileId={album.profileId}
							isMyPhotoAlbum={album.isMyPhotoAlbum}
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
			{isLoading === true && <BounceLoader color="#81818d" size={"5vh"} />}
			<div className={styles.bottomSpace}></div>
		</div>
	)
}
