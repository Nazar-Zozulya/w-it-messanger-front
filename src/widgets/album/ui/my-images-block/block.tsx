import { Button } from "../../../../shared/ui/button"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import styles from "./block.module.css"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { useEffect, useRef, useState } from "react"
import { Image } from "../../../../entities/image/model/types"
import { AddNewIcon } from "../add-new-icon"
import { fileToBase64 } from "../../../../helpers/fileToBase64"
import { AlbumIcon } from "../album-icon"
import { useUserContext } from "../../../../entities/user"
import { POST } from "../../../../helpers/post"

export function MyImagesBlock() {
	const [images, setImages] = useState<Image[]>([])
	const [preImages, setPreImages] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [newImage, setNewImage] = useState<string | null>(null)
	const { user, token } = useUserContext()

	useEffect(() => {
		if (!user) return

		if (!user.images) return

		setImages(user.images)
	}, [user])

	const inputRef = useRef<HTMLInputElement>(null)

	async function deleteImage(id: number) {
		const newImages = images.filter((image) => {
			return image.id !== id
		})

		setImages(newImages)
	}

	async function switchShown(id: number) {
		const switchedImage = images.map((image) => {
			if (image.id === id) {
				image.shown = !image.shown
			}
			return image
		})

		setImages(switchedImage)
	}

	async function openFilePicker() {
		const image = await inputRef.current?.click()
	}

	async function addNewImage(event: React.ChangeEvent<HTMLInputElement>) {
		const image = event.target.files?.[0]

		if (!image) return

		if (!token) return

		const imageBase64 = await fileToBase64(image)

		console.log(imageBase64)

		if (!imageBase64) return
		setPreImages((prev) => [...prev, imageBase64])

		const response = await POST<Image>({
			whichService: "userService",
			endpoint: "api/user/image/add",
			token: token,
			body: {
				image: imageBase64,
			},
		})

		if (response.status === "error") {
			setPreImages(
				preImages.filter((image) => {
					return image !== imageBase64
				}),
			)
			return
		}

		setPreImages(
			preImages.filter((image) => {
				return image !== imageBase64
			}),
		)

		setImages((prev) => [...prev, response.data])
	}

	useEffect(() => {
		setIsLoading(true)
		// ...
		setIsLoading(false)
	}, [])

	useEffect(() => {
		if (!newImage) return
		setPreImages((prev) => [...prev, newImage])
	}, [newImage])

	return (
		<UniversalBlockCard
			button={
				<Button
					text="Додати фото"
					icon={<Gallery />}
					function={() => openFilePicker()}
					fill={false}
				/>
			}
			title="Мої фото"
		>
			<>
				<input
					type="file"
					className={styles.hiddenInput}
					ref={inputRef}
					onChange={addNewImage}
				/>
				{isLoading ? (
					<div className={styles.loadingBlock}>
						<p>loading...</p>
					</div>
				) : images.length > 0 ? (
					<div className={styles.imagesList}>
						{images.map((image) => {
							return (
								<AlbumIcon
									image={image.base64}
									isLoading={false}
									id={image.id}
									shown={image.shown}
									onDelete={deleteImage}
									switchShown={switchShown}
								/>
							)
						})}
					</div>
				) : (
					<div className={styles.imagesList}>
						<AddNewIcon setImage={setNewImage} />
					</div>
				)}
			</>
		</UniversalBlockCard>
	)
}
