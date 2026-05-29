import { Album, useUserContext } from "../../../../entities/user"
import { AddNewIcon, AlbumIcon } from "../../../../features/album"
import { Button } from "../../../../shared/ui/button"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import styles from "./card.module.css"
import { ReactComponent as Eye } from "../../../../shared/ui/icons/eye.svg"
import { ReactComponent as SlashEye } from "../../../../shared/ui/icons/shashEye.svg"
import { ReactComponent as Edit } from "../../../../shared/ui/icons/edit.svg"
import { ReactComponent as Trash } from "../../../../shared/ui/icons/trash.svg"
import { ReactComponent as ThreeDots } from "../../../../shared/ui/icons/3dots.svg"
import { POST } from "../../../../helpers/post"
import { useAlbumsManager } from "../../../../entities/album"
import { useModalManagerStore } from "../../../../entities/modal/model/storage/modalManager"
import { useEffect, useState } from "react"
import { Image } from "../../../../entities/image"
import { SmallModal } from "../../../../shared/ui/small-modal"

export function AlbumCard(props: Omit<Album, "user">) {
	const { switchShownAlbum, deleteAlbum } = useAlbumsManager()

	const [isMoreOptionsModalVisible, setIsMoreOptionsModalVisible] =
		useState<boolean>(false)

	const [images, setImages] = useState<Image[]>([])
	const [preImages, setPreImages] = useState<string[]>([])

	const { openModal, setData } = useModalManagerStore()
	const { token } = useUserContext()
	async function albumSwitchShown() {
		if (!token) return
		switchShownAlbum(props.id, token)
	}

	async function albumDelete() {
		if (!token) return
		deleteAlbum(props.id, token)
	}

	async function albumUpdate() {
		setData({ albumId: props.id, name: props.name, topic: props.topic, year: props.year })

		openModal("updateAlbum")
	}

	async function deleteImage(id: number) {
		if (!token) return

		const response = await POST<string>({
			method: "DELETE",
			whichService: "userService",
			endpoint: "api/user/image/delete",
			token,
			body: { imageId: id },
		})

		if (response.status === "error") return

		setImages(
			images.filter((image) => {
				return image.id !== id
			}),
		)
	}

	async function switchShownImage(id: number) {
		if (!token) return

		const response = await POST<string>({
			method: "PATCH",
			whichService: "userService",
			endpoint: "api/user/image/switch-shown",
			token,
			body: { imageId: id },
		})

		if (response.status === "error") return

		setImages(
			images.map((image) => {
				if (image.id === id) {
					image.shown = !image.shown
				}
				return image
			}),
		)
	}

	async function addNewImage(image: string) {
		if (!token) return

		setPreImages((prev) => [...prev, image])

		const response = await POST<Image>({
			whichService: "userService",
			endpoint: "api/user/album/image/add",
			token: token,
			body: {
				image: image,
				albumId: props.id,
			},
		})

		if (response.status === "error") {
			return
		}
		setPreImages(
			preImages.filter((image) => {
				return image !== image
			}),
		)

		setImages([...images, response.data])
	}

	useEffect(() => {
		setImages(props.images)
	}, [props.images])

	return (
		<UniversalBlockCard
			title={props.name}
			button={
				<div className={styles.headerButtonsDiv}>
					<Button
						icon={props.shown ? <Eye /> : <SlashEye />}
						function={albumSwitchShown}
						fill={false}
					/>
					<button className={styles.threeDotsButton}>
						<SmallModal
							isVisible={isMoreOptionsModalVisible}
							onClose={() => {
								setIsMoreOptionsModalVisible(
									!isMoreOptionsModalVisible,
								)
							}}
							initiator={
								<button
									className={styles.moreOptionsButton}
									onClick={() => {
										setIsMoreOptionsModalVisible(
											!isMoreOptionsModalVisible,
										)
									}}
								>
									<ThreeDots
										style={{
											display: !isMoreOptionsModalVisible
												? "flex"
												: "none",
										}}
									/>
								</button>
							}
							modal={
								<div className={styles.moreOptionsModal}>
									<button
										className={styles.moreOptionsButton}
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "flex-end",
										}}
										onClick={() => {
											setIsMoreOptionsModalVisible(
												!isMoreOptionsModalVisible,
											)
										}}
									>
										<ThreeDots />
									</button>
									<button
										className={
											styles.moreOptionsModalButton
										}
										onClick={() => {albumSwitchShown(); setIsMoreOptionsModalVisible(false)}}
									>
										{ props.shown ? <Eye /> : <SlashEye /> }
										<p>{props.shown ? "Цей альбом бачите тільки ви" : "Цей альбом бачать всі"}</p>
									</button>
									<button
										className={
											styles.moreOptionsModalButton
										}
										onClick={albumUpdate}
									>
										<Edit />
										<p>Редагувати альбом</p>
									</button>
									<div className={styles.line}></div>
									<button
										className={
											styles.moreOptionsModalButton
										}

										onClick={albumDelete}
									>
										<Trash />
										<p>Видалити альбом</p>
									</button>
								</div>
							}
						/>
					</button>
				</div>
			}
		>
			<div className={styles.container}>
				<div className={styles.header}>
					<p className={styles.topic}>{props.topic}</p>
					<p className={styles.year}>{props.year}</p>
				</div>
				<div className={styles.line}></div>
				<div className={styles.content}>
					<p className={styles.title}>Фотографії</p>
					<div className={styles.imagesList}>
						{(images ?? []).map((image) => {
							return (
								<AlbumIcon
									image={image.base64}
									id={image.id}
									shown={image.shown}
									onDelete={deleteImage}
									switchShown={switchShownImage}
								/>
							)
						})}
						{preImages.map((image) => {
							return <AlbumIcon.Loading image={image} />
						})}
						<AddNewIcon addImage={addNewImage} />
					</div>
				</div>
			</div>
		</UniversalBlockCard>
	)
}
