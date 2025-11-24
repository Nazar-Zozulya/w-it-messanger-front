import { ChangeEvent } from "react"
import { Control, RegisterOptions } from "react-hook-form"

export interface InputProps {
	label?: string
	placeholder?: string
	isPassword?: boolean
	error?: string
	type?: "text" | "password" | "email"
	// onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	// value?: any
	control: Control<any, any, any>
	name: string
	rules?:
		| Omit<
				RegisterOptions<any, string>,
				"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
		  >
		| undefined
}
