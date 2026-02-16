import { ButtonProps } from "./button.types"
import styles from "./buton.module.css"

export function Button(props: ButtonProps) {
	const {
		fill,
		function: buttonFunction,
		icon,
		rightIcon,
		text,
		isSubmit,
		disabled = false,
		className,
		type,
	} = props

	return (
		<button
			className={`
				${
					styles.container // Дефолтный стиль для кнопки
				} 
				${
					className ? className : "" // Если передан класс, добавляем его
				}
				${
					styles.containerHover // Стиль для кнопки при наведении
				}
				${
					fill ? styles.fill : styles.unFill // Стиль для заполненной или незаполненной кнопки
				} 
				 ${
					disabled ? styles.disabled : "" // Стиль для отключенной кнопки
				}
				${
					icon && !text ? styles.onlyIcon : null // Стиль для кнопки, которая содержит только иконку
				}
				`}

			onClick={() => buttonFunction && buttonFunction()}

			disabled={disabled}

			type={type}
		>
			{icon}
			{text && <p className={styles.text}>{text}</p>}
			{rightIcon}
		</button>
	)
}

function SmallButton(props: ButtonProps) {
	const {
		fill,
		function: buttonFunction,
		icon,
		rightIcon,
		text,
		isSubmit,
		disabled = false,
		className,
		type,
	} = props

	return (
		<button
			className={`
				${
					styles.smallContainer // Дефолтный стиль для кнопки
				} 
				${
					className ? className : "" // Если передан класс, добавляем его
				}
				${
					styles.containerHover // Стиль для кнопки при наведении
				}
				${
					fill ? styles.fill : styles.unFill // Стиль для заполненной или незаполненной кнопки
				} 
				 ${
					disabled ? styles.disabled : "" // Стиль для отключенной кнопки
				}
				${
					icon && !text ? styles.smallOnlyIcon : null // Стиль для кнопки, которая содержит только иконку
				}
				`}
			onClick={() => buttonFunction && buttonFunction()}

			disabled={disabled}
			type={type}
		>
			{icon}
			{text && <p className={styles.smallText}>{text}</p>}
			{rightIcon}
		</button>
	)
}

Button.Small = SmallButton
