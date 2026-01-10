import styles from "./input.module.css"
import { InputProps, TextAreaProps } from "./input.types"
import { ReactComponent as Eye } from "../icons/eye.svg"
import { ReactComponent as SlashEye } from "../icons/shashEye.svg"
import { useState } from "react"
import { Controller } from "react-hook-form"

export function Input(props: InputProps) {
	const {
		label,
		placeholder,
		isPassword = false,
		type = "text",
		// value,
		error,
		// onChange,
		control,
		name,
		rules,
		defaultValue,
		...otherProps
	} = props

	const [isVisible, setIsVisible] = useState(false)

	return (
		<div className={styles.container}>
			<p className={styles.label}>{label}</p>
			<div className={styles.helpInputDiv}>
				<Controller
					control={control}
					name={name}
					rules={rules}
					render={({ field }) => {
						return (
							<input
								type={
									isPassword
										? isVisible
											? "text"
											: "password"
										: type
								}
								placeholder={placeholder}
								className={styles.input}
								value={field.value}
								defaultValue={defaultValue}
								onChange={(e) => field.onChange(e)}
								// onChange={}
								{...otherProps}
							/>
						)
					}}
				/>
				{isPassword && (
					<button
						style={{
							border: "none",
							background: "none",
							cursor: "pointer",
						}}
						onClick={() => setIsVisible(!isVisible)}
					>
						{!isVisible ? <SlashEye /> : <Eye />}
					</button>
				)}
			</div>
			<p className={styles.error}>{error}</p>
		</div>
	)
}




function TextArea(props: TextAreaProps) {
	const {
		label,
		placeholder,
		// value,
		error,
		// onChange,
		control,
		name,
		rules,
		rows = 1,
		defaultValue,
		...otherProps
	} = props

	const [isVisible, setIsVisible] = useState(false)

	return (
		<div className={styles.containerTextArea}>
			<p className={styles.label}>{label}</p>
			<div className={styles.helpInputDiv}>
				<Controller
					control={control}
					name={name}
					rules={rules}
					render={({ field }) => {
						return (
							<textarea
								placeholder={placeholder}
								className={styles.textarea}
								value={field.value}
								onChange={(e) => field.onChange(e)}
								rows={rows}
								wrap="soft"
								defaultValue={defaultValue}
								{...otherProps}
							/>
						)
					}}
				/>
			</div>
		</div>
	)
}


Input.TextArea = TextArea