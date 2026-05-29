import { ReactNode } from "react"
import styles from "./card.module.css"
import { universalBlockCardProps } from "./card.types"

export function UniversalBlockCard(props: universalBlockCardProps) {
	const { children, className, button, title, onlyHeader = false } = props

	return (
		<div className={`${styles.container} ${className}`}>
			<div className={styles.header}>
				<p className={styles.title}>{title}</p>
				{button}
			</div>
			{onlyHeader === false ? <div className={styles.content}>{children}</div> : undefined}
		</div>
	)
}
