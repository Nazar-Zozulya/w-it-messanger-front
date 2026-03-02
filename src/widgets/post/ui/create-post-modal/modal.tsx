import { ReactComponent as XMark } from "../../../../shared/ui/icons/xMark.svg"
import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"
import { ReactComponent as Plus } from "../../../../shared/ui/icons/plus.svg"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { ReactComponent as Smile } from "../../../../shared/ui/icons/smile.svg"
import { ReactComponent as Send } from "../../../../shared/ui/icons/send.svg"

import styles from "./modal.module.css"
import { Modal } from "../../../../shared/ui/modal"
import { createPostForm } from "./modal.types"
import { Input } from "../../../../shared/ui/input"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { Button } from "../../../../shared/ui/button"
import { CloseModalButton } from "../../../../features/modal"
import { POST } from "../../../../helpers/post"
import { useUserContext } from "../../../../entities/user"
import { createPostData, usePostsManager } from "../../../../entities/post"

export function CreatePostModal() {
	const [tags, setTags] = useState<string[]>([])
	const [links, setLinks] = useState<string[]>([])
	const [images, setImages] = useState<string[]>()

	const { user } = useUserContext()

	const { createPost } = usePostsManager()

	// Переменная которая говорит что будет показываться кнопка добавления тега или инпут добавления тега
	// false = показуется кнопка добавления
	// true = показуется инпут добавления
	const [isAddingTagInputShowing, setIsAddingTagInputShowing] =
		useState<boolean>()

	const {
		handleSubmit: tagHandleSubmit,
		control: tagControl,
		formState: tagFormState,
		reset: tagReset,
	} = useForm<{ tag: string }>()
	const { handleSubmit, control, formState } = useForm<createPostForm>({})



	useEffect(() => {
		console.log(user, "user in create post modal")
	}, [user])



	function deleteTag(tag: string) {
		const newTags = tags.filter((fTag) => {
			return fTag !== tag
		})
		setTags(newTags)
	}

	function addNewTag(data: { tag: string }) {
		let newTag = data.tag

		if (!newTag.startsWith("#")) newTag= `#${newTag}`

		const newTags = [...tags, newTag]

		tagReset()

		setTags(newTags)
	}

	async function onSubmit(data: createPostForm) {

		if (!user) return

		const newData: createPostData = {
			...data,
			authorId: user.id,
			tags,
			images,
			links,
		}

		const response = await createPost(newData)

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
						error={formState.errors.title?.message}
						rules={{
							required: {
								value: true,
								message: "Заголовок обо'язковий",
							},
						}}
						control={control}
						name="title"
					/>

					<div className={styles.tagList}>
						{tags?.map((tag) => {
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
						error={formState.errors.content?.message}
						name="content"
						rows={8}
					/>
					<div className={styles.linksList}>
						<p className={styles.linksTitle}>Посилання</p>
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

					<div className={styles.imagesList}>
						{images?.map((image) => {
							return <img src={image} alt="" />
						})}
					</div>

					<div className={styles.footerButtons}>
						<Button
							fill={false}
							type="button"
							icon={<Gallery />}
							function={() => {}}
						/>
						<Button
							fill={false}
							icon={<Smile />}
							type="button"
							function={() => {}}
						/>
						<Button
							fill={true}
							rightIcon={<Send />}
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
