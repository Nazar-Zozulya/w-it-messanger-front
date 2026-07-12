import { Button } from "../../../../shared/ui/button"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import styles from "./block.module.css"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { useEffect, useRef, useState } from "react"
import { Image } from "../../../../entities/image/model/types"
import { AddNewIcon, AlbumIcon } from "../../../../features/album"
import { fileToBase64 } from "../../../../helpers/fileToBase64"
import { useUserContext } from "../../../../entities/user"
import { POST } from "../../../../helpers/post"

export function MyImagesBlock() {
	const [images, setImages] = useState<Image[]>([])
	const [preImages, setPreImages] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [newImage, setNewImage] = useState<string | null>(null)
	const { user, token, setUser } = useUserContext()

	useEffect(() => {
		if (!user) return

		if (!user.images) return

		setImages(user.images)
	}, [user?.images])

	const inputRef = useRef<HTMLInputElement>(null)

	async function deleteImage(id: number) {
		if (!token || !user) return

		const response = await POST<string>({
			method: "DELETE",
			whichService: "userService",
			endpoint: "api/user/image/delete",
			token,
			body: { imageId: id },
		})

		if (response.status !== "success") return

		// images
		const newImages = images.filter((img) => img.id !== id)
		setImages(newImages)

		// user
		const profile = user.profile

		// const remainingAvatars =
		// 	profile.avatars?.filter((a) => a.imageId !== id) ?? []

		// const isActiveAvatar = profile.avatar?.imageId === id

		// const newUser = {
		// 	...user,
		// 	profile: {
		// 		...profile,
		// 		avatars: remainingAvatars,
		// 		activeAvatar: isActiveAvatar
		// 			? remainingAvatars.at(-1)
		// 			: profile.avatar,
		// 	},
		// }

		// setUser(newUser)
	}

	async function switchShown(id: number) {
		if (!token) return

		const response = await POST<string>({
			method: "PATCH",
			whichService: "userService",
			endpoint: "api/user/image/switch-shown",
			token,
			body: { imageId: id },
		})

		if (response.status === "success") {
			const switchedImage = images.map((image) => {
				if (image.id === id) {
					image.shown = !image.shown
				}
				return image
			})

			setImages(switchedImage)
		}
	}

	async function openFilePicker() {
		const image = await inputRef.current?.click()
	}

	async function addNewImage(image: string) {
		if (!token) return

		setPreImages((prev) => [...prev, image])

		const response = await POST<Image>({
			whichService: "userService",
			endpoint: "api/user/image/add",
			token: token,
			body: {
				image: image,
			},
		})

		if (response.status === "error") {
			setPreImages(
				preImages.filter((image) => {
					return image !== image
				}),
			)
			return
		}

		setPreImages(
			preImages.filter((image) => {
				return image !== image
			}),
		)

		setImages((prev) => [...prev, response.data])
	}

	async function getImage(event: React.ChangeEvent<HTMLInputElement>) {
		const image = event.target.files?.[0]

		if (!image) return

		const imageBase64 = await fileToBase64(image)

		if (!imageBase64) return

		await addNewImage(imageBase64)
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
					onChange={getImage}
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
									id={image.id}
									shown={image.shown}
									onDelete={deleteImage}
									switchShown={switchShown}
								/>
							)
						})}
						{preImages.map((image) => {
							return <AlbumIcon.Loading image={image} />
						})}
					</div>
				) : (
					<div className={styles.imagesList}>
						<AddNewIcon addImage={addNewImage} />
					</div>
				)}
			</>
		</UniversalBlockCard>
	)
}
