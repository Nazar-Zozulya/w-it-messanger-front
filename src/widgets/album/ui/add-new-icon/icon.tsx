import { Button } from "../../../../shared/ui/button"
import styles from "./icon.module.css"
import { ReactComponent as Plus } from "../../../../shared/ui/icons/plus.svg"
import { useRef } from "react"
import { fileToBase64 } from "../../../../helpers/fileToBase64"
import { AddNewIconProps } from "./icon.types"

export function AddNewIcon(props: AddNewIconProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	async function openFilePicker() {
		const image = await inputRef.current?.click()
	}

	async function addNewImage(event: React.ChangeEvent<HTMLInputElement>) {
		const image = event.target.files?.[0]

		if (!image) return

        const imageBase64 = await fileToBase64(image)

		props.setImage(imageBase64 ?? "")
	}

	return (
		<button className={styles.container} onClick={() => openFilePicker()}>
			<input type="file" className={styles.hiddenInput} ref={inputRef} onChange={addNewImage} />
			<Button
				icon={<Plus />}
				fill={false}
				className={styles.buttonIcon}
			/>
		</button>
	)
}
