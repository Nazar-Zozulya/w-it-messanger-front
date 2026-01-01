import { ButtonProps } from "./button.types"
import styles from "./buton.module.css"

export function Button(props: ButtonProps) {
	return (
		<button
			className={`${styles.container} ${
				props.fill ? styles.fill : styles.unFill
			} ${props.icon && !props.text ? styles.onlyIcon : null}` }
			onClick={() => props.function()}
			type={props.type}
		>
			{props.icon}
			{props.text && <p className={styles.text}>{props.text}</p>}
			{props.rightIcon}
		</button>
	)
}

function SmallButton(props: ButtonProps) {
	return (
		<button
			className={`${styles.smallContainer} ${
				props.fill ? styles.fill : styles.unFill
			} ${props.icon && !props.text ? styles.smallOnlyIcon : null}` }
			onClick={() => props.function()}
			type={props.type}
		>
			{props.icon}
			{props.text && <p className={styles.smallText}>{props.text}</p>}
			{props.rightIcon}
		</button>
	)
}


Button.Small = SmallButton
