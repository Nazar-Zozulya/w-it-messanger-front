import { ChangeEvent } from "react"

export interface InputProps {
    label: string
    placeholder: string
    isPassword?: boolean
    error?: string
    type?: "text" | "password" | "email"
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: any
}