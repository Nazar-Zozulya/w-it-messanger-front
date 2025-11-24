import { ReactNode } from "react"

export interface ButtonProps {
    fill: boolean
    function: () => void
    icon?: ReactNode,
    rightIcon?: ReactNode,
    text?: string
    isSubmit?: boolean
    type?: "submit" | "reset" | "button" | undefined
}