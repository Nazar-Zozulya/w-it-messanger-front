import { Button } from "../../../../shared/ui/button"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import styles from "./block.module.css"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { useEffect, useRef, useState } from "react"
import { Image } from "../../../../entities/image/model/types"
import { AddNewIcon } from "../add-new-icon"
import { fileToBase64 } from "../../../../helpers/fileToBase64"
import { AlbumIcon } from "../album-icon"

export function MyImagesBlock() {
	const [images, setImages] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [newImage, setNewImage] = useState<string | null>(null)

	const inputRef = useRef<HTMLInputElement>(null)

	async function openFilePicker() {
		const image = await inputRef.current?.click()
	}

	async function addNewImage(event: React.ChangeEvent<HTMLInputElement>) {
		const image = event.target.files?.[0]

		if (!image) return

		const imageBase64 = await fileToBase64(image)

		console.log(imageBase64)

		if (!imageBase64) return

		setImages(prev => [...prev, imageBase64])

	}

	useEffect(() => {
		setIsLoading(true)
		// ...
		setIsLoading(false)
	}, [])

	useEffect(() => {
		if (!newImage) return
		setImages(prev => [...prev, newImage])
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
					<div className={styles.imagesList}>{images.map((image)=> {
						return (
							<AlbumIcon image={image} />
						)
					})}</div>
				) : (
					<div className={styles.imagesList}>
						<AddNewIcon setImage={setNewImage} />
					</div>
				)}
			</>
		</UniversalBlockCard>
	)
}
