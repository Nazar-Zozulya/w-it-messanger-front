import { redirect, useNavigate } from "react-router-dom"
import styles from "./button.module.css"
import { NavigationButtonProps } from "./button.types"

export function NavigationButton(props: NavigationButtonProps) {
	const navigation = useNavigate()
	
	return (
        // TODO счетчик
		<button className={`${styles.container} ${props.isSelected && styles.selected}`} onClick={()=>{props.onClick && props.onClick(); navigation(props.redirect)}}>
			{props.icon}
			<p className={styles.text}>{props.text}</p>
		</button>
	)
}
