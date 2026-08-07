import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"
import { ReactComponent as Plus } from "../../../../shared/ui/icons/plus.svg"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { ReactComponent as Smile } from "../../../../shared/ui/icons/smile.svg"
import { ReactComponent as Send } from "../../../../shared/ui/icons/send.svg"
import { ReactComponent as Trash } from "../../../../shared/ui/icons/trash.svg"

import styles from "./modal.module.css"
import { Modal } from "../../../../shared/ui/modal"
import { createPostForm, createPostModalProps } from "./modal.types"
import { Input } from "../../../../shared/ui/input"
import { Controller, useForm } from "react-hook-form"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Button } from "../../../../shared/ui/button"
import { CloseModalButton } from "../../../../features/modal"
import { User, useUserContext } from "../../../../entities/user"
import {
	createPostData,
	PostImagesList,
	usePostsManager,
} from "../../../../entities/post"
import { useModalManagerStore } from "../../../../entities/modal/model/storage/modalManager"
import { fileToBase64 } from "../../../../helpers/fileToBase64"
import { UserToPost } from "../../../../entities/user/model/types/user"
import { Post, PostImage } from "../../../../entities/post/model/types"
import { Tag } from "../../../../entities/tag"

export function CreatePostModal(props: createPostModalProps) {
	const [tags, setTags] = useState<string[]>([])
	const [links, setLinks] = useState<string[]>([])
	const [images, setImages] = useState<string[]>([])
	const [error, setError] = useState<string>("")

	const selectImageInputRef = useRef<HTMLInputElement | null>(null)

	const { user } = useUserContext()

	const { closeModal, updatePostData, setUpdatePostData } =
		useModalManagerStore()

	const { createPost } = usePostsManager()

	const { token } = useUserContext()

	// Переменная которая говорит что будет показываться кнопка добавления тега или инпут добавления тега
	// false = показуется кнопка добавления
	// true = показуется инпут добавления
	const [isAddingTagInputShowing, setIsAddingTagInputShowing] =
		useState<boolean>()

	// форма для тегов
	const {
		handleSubmit: tagHandleSubmit,
		control: tagControl,
		formState: tagFormState,
		reset: tagReset,
	} = useForm<{ tag: string }>()

	// форма для картинок
	// const {
	// 	handleSubmit: ImageHandleSubmit,
	// 	control: ImageControl,
	// 	formState: ImageFormState,
	// 	reset: ImageReset,
	// } = useForm<{ image: string }>()

	// форма для поста
	const { handleSubmit, control, formState } = useForm<createPostForm>({})

	function deleteTag(tag: string) {
		const newTags = tags.filter((fTag) => {
			return fTag !== tag
		})
		setTags(newTags)
	}

	useEffect(() => {
		if (props.mode === "update") {
			if (!updatePostData) return

			setImages(
				updatePostData.images?.map((image) => image.original_image) ??
					[],
			)

			setTags(updatePostData.tags?.map((t) => t.name) ?? [])

			setLinks(updatePostData.links?.map((l) => l.url) ?? [])
		}

		return () => {
			setUpdatePostData(null)
		}
	}, [])

	function addNewTag(data: { tag: string | undefined }) {
		let newTag = data.tag

		// проверка на наличие символов в строке
		if (!newTag) {
			tagReset()
			return
		}

		// проверка на наличие не только пробелов в строке
		if (newTag.trim().length === 0) {
			tagReset()
			return
		}

		// проверка на наличие # в начале
		if (!newTag.startsWith("#")) newTag = `#${newTag}`

		const newTags = [...tags, newTag]

		tagReset()

		setTags(newTags)
	}

	function deleteImage(image: string, imageIndex: number) {
		const newImages = images.filter((fImage, index) => {
			return index !== imageIndex
		})
		setImages(newImages)
	}

	function addNewImage(image: string) {
		setImages((prev) => [...prev, image])
	}

	function triggerImageInput() {
		if (!selectImageInputRef.current) return

		const getImage = selectImageInputRef.current.click()

		// addNewImage({image: getImage})
	}

	async function selectImage(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]

		e.target.value = ""

		if (!file) return

		const imageBase64 = await fileToBase64(file)

		if (!imageBase64) return

		const newImage = addNewImage(imageBase64)
	}

	async function onSubmit(data: createPostForm) {
		if (!user) return
		if (!token) return
		const postAuthor: UserToPost = {
			username: user.username,
			id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
			avatar: user.profile?.avatar?.image,
		}

		const newData: createPostData = {
			...data,
			author: postAuthor,
			tags,
			images,
			links,
		}

		const response = props.mode === "create" ? createPost(newData, token) : 
		closeModal()
		// if (response.status === "error") setError(response.message ?? "error")

		// if (response.status === "success") {
		// }
		console.log(response)
	}

	// const { fields, append, remove } = useFieldArray({
	// 	control,
	// 	name: 'links'
	// })

	return (
		<Modal>
			<div className={styles.container}>
				<div className={styles.closeModalButtonDiv}>
					<CloseModalButton />
				</div>
				<p className={styles.title}>Створення публікації</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.content}
				>
					<Input
						label="Назва публікації"
						placeholder="Введіть назву"
						defaultValue={props.mode === "update" ? updatePostData?.title : ""}
						error={formState.errors.title?.message}
						rules={{
							required: {
								value: true,
								message: "Заголовок обо'язковий",
							},
						}}
						control={control}
						fullWidth={
							window.matchMedia("(pointer: coarse)").matches
								? true
								: false
						}
						name="title"
					/>

					<div className={styles.tagList}>
						{[...tags].map((tag) => {
							return (
								<button
									className={styles.tag}
									type="button"
									onClick={() => {
										deleteTag(tag)
									}}
								>
									<p>{tag}</p>
								</button>
							)
						})}
						{isAddingTagInputShowing ? (
							<>
								<Controller
									control={tagControl}
									name={"tag"}
									render={({ field }) => {
										return (
											<input
												{...field}
												type={"text"}
												placeholder={""}
												className={styles.addTagInput}
											/>
										)
									}}
								/>
							</>
						) : (
							<></>
						)}
						<Button.Small
							fill={false}
							type={"button"}
							function={() => {
								if (isAddingTagInputShowing) {
									tagHandleSubmit(addNewTag)()
								}
								setIsAddingTagInputShowing(
									!isAddingTagInputShowing,
								)
							}}
							icon={
								isAddingTagInputShowing ? <Check /> : <Plus />
							}
						/>
					</div>

					<Input.TextArea
						placeholder="Ввведіть контент"
						control={control}
						defaultValue={props.mode === "update" ? updatePostData?.content : ""}
						error={formState.errors.content?.message}
						name="content"
						rows={8}
					/>
					<div className={styles.linksList}>
						{/* <p className={styles.linksTitle}>Посилання</p> */}
						{/* {!links ? (
							<div className={styles.linkItem}>
								<Input
									placeholder="Посилання"
									control={control}
									name="links"
								/>
								<Button.Small
									fill={false}
									function={() => {}}
									icon={<Plus />}
								/>
							</div>
						) : (
							<>
								{links.map((link, itemIndex) => {
									return (
										<div className={styles.linkItem} key={itemIndex}>
											<Input
												placeholder="Посилання"
												control={control}
												name={`links.${itemIndex}`}
												defaultValue={link}
												
											/>

											<Button.Small
												fill={false}
												function={() => {
													const newLinks = links.filter((item, index) => {
														return index !== itemIndex
													})
													console.log(newLinks)

													setLinks(newLinks)
												}}
												icon={<XMark />}
											/>
										</div>
									)
								})}
								<div className={styles.linkItem}>
									<Input
										placeholder="Посилання"
										control={control}
										name="links"
									/>

									<Button.Small
										fill={false}
										function={() => {}}
										icon={<Plus />}
									/>
								</div>
							</>
						)} */}
					</div>

					{/* <div className={styles.imagesList}>
						{images?.map((image, index) => {
							return (
								<div className={styles.postImage}>
									<img src={image} alt="image format error" />
									<Button
										fill={false}
										icon={<Trash />}
										type={"button"}
										className={styles.postImageDeleteButton}
										function={() => {deleteImage(image, index)}}
									/>
								</div>
							)
						})}
					</div> */}
					<PostImagesList
						images={[
							...images.map((image) => ({
								original_image: image,
								id: 0,
								compressed_image: "",
								post: {} as Post,
								postId: 0,
								// остальные поля, если они обязательны
							})),
						]}
						isDelete={true}
						onDelete={deleteImage}
					/>

					<p>{error}</p>

					<div className={styles.footerButtons}>
						<Button
							fill={false}
							icon={<Gallery width={20} height={20} />}
							type="button"
							children={
								<input
									className={styles.imageSelectInput}
									type="file"
									ref={selectImageInputRef}
									onChange={selectImage}
									accept="image/*"
								></input>
							}
							function={triggerImageInput}
						/>
						<Button
							fill={false}
							type="button"
							icon={<Smile width={20} height={20} />}
							children
							function={() => {}}
						/>
						<Button
							fill={true}
							rightIcon={<Send width={20} height={20} />}
							text="Публікація"
							type="submit"
							function={() => {}}
						/>
					</div>
				</form>
			</div>
		</Modal>
	)
}
