import { redirect } from "react-router-dom"
import styles from "./button.module.css"
import { NavigationButtonProps } from "./button.types"

export function NavigationButton(props: NavigationButtonProps) {
	return (
        // TODO счетчик
		<button className={styles.container} onClick={()=>redirect(props.redirect)}>
			{props.icon}
			<p className={styles.text}>{props.text}</p>
		</button>
	)
}
