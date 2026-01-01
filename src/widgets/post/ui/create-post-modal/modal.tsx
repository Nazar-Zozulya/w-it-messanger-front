import { Modal } from "../../../../shared/ui/modal"
import { createPostForm } from "./modal.types"
import styles from "./modal.module.css"
import { ReactComponent as XMark } from "../../../../shared/ui/icons/xMark.svg"
import { Input } from "../../../../shared/ui/input"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "../../../../shared/ui/button"
import { ReactComponent as Plus } from "../../../../shared/ui/icons/plus.svg"
import { ReactComponent as Gallery } from "../../../../shared/ui/icons/gallery.svg"
import { ReactComponent as Smile } from "../../../../shared/ui/icons/smile.svg"
import { ReactComponent as Send } from "../../../../shared/ui/icons/send.svg"
import { CloseModalButton } from "../../../../features/modal"

export function CreatePostModal() {
	const [tags, setTags] = useState<string[]>()
	const [links, setLinks] = useState<string[]>()
	const [images, setImages] = useState<string[]>()
	const { handleSubmit, control } = useForm<createPostForm>()

	async function onSubmit(data: createPostForm) {
		console.log(data)
	}

	return (
		<Modal>
			<div className={styles.container}>
				<div className={styles.closeModalButtonDiv}>
					<CloseModalButton />
				</div>
				<p className={styles.title}>Створення публікації</p>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
					<Input
						label="Назва публікації"
						placeholder="Введіть назву"
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
								<div className={styles.tag}>
									<p>{tag}</p>
								</div>
							)
						})}
						<Button.Small
							fill={false}

							function={() => {}}
							icon={<Plus />}
						/>
					</div>

					<Input
						placeholder="Ввведіть контент"
						control={control}
						name="title"
					/>
					<div className={styles.linksList}>
						<Input
							label="Посилання"
							placeholder="Посилання"
							control={control}
							name="title"
						/>
						<Button.Small
							fill={false}
							function={() => {}}
							icon={<Plus />}
						/>
					</div>
					
					<div className={styles.imagesList}>
						{images?.map((image) => {
							return(
								<img src={image} alt="" />
							)
						})}
					</div>
				</form>

				<div className={styles.footerButtons}>
					<Button fill={false} icon={<Gallery />} function={()=>{}} />
					<Button fill={false} icon={<Smile />} function={()=>{}} />
					<Button fill={true} rightIcon={<Send />} text="Публікація" function={()=>{}}  />
				</div>
			</div>
		</Modal>
	)
}
