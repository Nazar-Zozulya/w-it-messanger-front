import { useForm } from "react-hook-form"
import { useModalManagerStore } from "../../../../entities/modal/model/storage/modalManager"
import { CloseModalButton } from "../../../../features/modal"
import { Modal } from "../../../../shared/ui/modal"
import styles from "./modal.module.css"
import { Input } from "../../../../shared/ui/input"
import { Button } from "../../../../shared/ui/button"
import { CreateAlbumCredentials } from "../../../../entities/album/model/types/album"
import { useAlbumsManager } from "../../../../entities/album"
import { useUserContext } from "../../../../entities/user"

export function UpdateAlbumModal() {
	const { closeModal, anyData, clearData } = useModalManagerStore()
	const { token } = useUserContext()

	// const [cookies, setCookie, removeCookie] = useCookies(['updateAlbumsData'])

	const { updateAlbum } = useAlbumsManager()

	const { handleSubmit, control } = useForm<CreateAlbumCredentials>({
		defaultValues: {
			name: anyData.name,
			topic: anyData.topic,
			year: anyData.year
		}
	})

	async function onSubmit(data: CreateAlbumCredentials) {
		console.log(data)

		if (!token) return

		updateAlbum(anyData.albumId, token, data )

		closeModal()
	}

	return (
		<Modal>
			<div className={styles.container}>
				<div className={styles.closeModalButtonDiv}>
					<CloseModalButton />
				</div>
				<p className={styles.title}>Редагувати альбом</p>

				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.inputsDiv}>
						<Input
							control={control}
							name="name"
							label="Назва альбому"
							placeholder="Настрій"
							fullWidth={true}
							// defaultValue={anyData.name}
						/>
						<Input
							control={control}
							name="topic"
							label="Оберіть тему"
							placeholder="Настрій"
							fullWidth={true}
							// defaultValue={anyData.topic}
						/>
						<Input
							control={control}
							name="name"
							type="date"
							label="Рік альбому"
							placeholder="Оберіть рік"
							fullWidth={true}
							// defaultValue={`${anyData.year}`}
						/>
					</div>
					<div className={styles.buttonsDiv}>
						<Button
							type="button"
							fill={false}
							text="Скасувати"
							function={() => {closeModal(); clearData()}}
						/>
						<Button type="submit" fill={true} text="Зберегти" />
					</div>
				</form>
			</div>
		</Modal>
	)
}
