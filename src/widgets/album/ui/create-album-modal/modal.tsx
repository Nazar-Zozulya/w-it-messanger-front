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

export function CreateAlbumModal() {
	const { closeModal } = useModalManagerStore()

	const { createAlbum } = useAlbumsManager()

	const { token } = useUserContext()

	const { handleSubmit, control } = useForm<CreateAlbumCredentials>()

	async function onSubmit(data: CreateAlbumCredentials) {
		console.log(data)
        if (!token) return

        createAlbum({...data, year: +data.year}, token)

		closeModal()
	}

	return (
		<Modal>
			<div className={styles.container}>
				<div className={styles.closeModalButtonDiv}>
					<CloseModalButton />
				</div>
				<p className={styles.title}>Створити альбом</p>

				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.inputsDiv}>
						<Input
							control={control}
							name="name"
							label="Назва альбому"
							placeholder="Настрій"
							fullWidth={true}
						/>
						<Input
							control={control}
							name="theme"
							label="Оберіть тему"
							placeholder="Настрій"
							fullWidth={true}
						/>
						<Input
							control={control}
							name="year"
							label="Рік альбому"
							placeholder="Оберіть рік"
							fullWidth={true}
						/>
					</div>
					<div className={styles.buttonsDiv}>
						<Button
							type="button"
							fill={false}
							text="Скасувати"
							function={closeModal}
						/>
						<Button type="submit" fill={true} text="Зберегти" />
					</div>
				</form>
			</div>
		</Modal>
	)
}
