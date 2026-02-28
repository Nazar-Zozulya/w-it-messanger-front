import { SmallModalProps } from "./modal.types"
import styles from "./modal.module.css"

export function SmallModal(props: SmallModalProps) {
	return (
		<div className={`${styles.container} ${props.containerStyle}`}>
			{props.initiator}
			<div
				className={props.modalContainerStyle}
				style={{ display: props.isVisible ? "flex" : "none" }}
			>
				{props.modal}
			</div>
		</div>
	)
}
