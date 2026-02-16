import { ReactNode } from "react"

export interface ButtonProps {
    fill: boolean
    function?: () => void
    icon?: ReactNode,
    rightIcon?: ReactNode
    text?: string
    isSubmit?: boolean
    disabled?: boolean
    className?: string
    
    type?: "submit" | "reset" | "button" | undefined
}