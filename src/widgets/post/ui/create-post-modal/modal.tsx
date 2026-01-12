import { Modal } from "../../../../shared/ui/modal"
import { createPostForm } from "./modal.types"
import styles from "./modal.module.css"
import { ReactComponent as XMark } from "../../../../shared/ui/icons/xMark.svg"
import { Input } from "../../../../shared/ui/input"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
import { Button } from "../../../../shared/ui/button"
import { ReactComponent as Plus } from "../../../../shared/ui/icons/plus.svg"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { ReactComponent as Smile } from "../../../../shared/ui/icons/smile.svg"
import { ReactComponent as Send } from "../../../../shared/ui/icons/send.svg"
import { CloseModalButton } from "../../../../features/modal"
import { POST } from "../../../../helpers/post"
import { useUserContext } from "../../../../entities/user"
import { UserContext } from "../../../../entities/user/model/context/user.context"

export function CreatePostModal() {
	const [tags, setTags] = useState<string[]>(["#тег1", "#тег2"])
	const [links, setLinks] = useState<string[]>([])
	const [images, setImages] = useState<string[]>()
	const { user } = useUserContext()
	const { handleSubmit, control, formState } = useForm<createPostForm>({
		defaultValues: {
			// tags: [],
			// links: [""],
		},
	})

	useEffect(() => {
		console.log(user, "user in create post modal")
	}, [user])

	async function onSubmit(data: createPostForm) {
		console.log(user,"=golyboi")

		if (!user) return
		const response = await POST<string>({
			whichService: "postService",
			endpoint: "api/post/create",
			body: { ...data, authorId: user.id },
		})

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
								<button className={styles.tag}>
									<p>{tag}</p>
								</button>
							)
						})}
						<Button.Small
							fill={false}
							function={() => {}}
							icon={<Plus />}
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
