import { Button } from "../../../../shared/ui/button"
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card"
import styles from "./block.module.css"
import { ReactComponent as Plus } from "../../../../shared/ui/icons/plus.svg"
import { useModalManagerStore } from "../../../../entities/modal/model/storage/modalManager"

export function AddAlbumBlock(props:{mode: "no-albums" | "has-albums"}) {
	const { openModal } = useModalManagerStore()

	return (
		<UniversalBlockCard
			title={props.mode === "no-albums" ? "Немає ще жодного альбому" : ""}
			button={
				<Button
					text="Створити альбом"
					fill={false}
					icon={<Plus />}
					function={() => openModal("createAlbum")}
				/>
			}
			onlyHeader={true}
		/>
	)
}
