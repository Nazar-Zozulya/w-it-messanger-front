import { ReactNode } from "react";
import styles from './card.module.css'
import { universalBlockCardProps } from "./card.types";

export function UniversalBlockCard(props: universalBlockCardProps) {
    const {children, className, button, title} = props

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.header}>
                <p className={styles.title}>{title}</p>
                {button}
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}