import { ReactNode } from "react"

export interface ButtonProps {
    fill: boolean
    function?: () => void
    size?: "M" | "L"
    icon?: ReactNode,
    rightIcon?: ReactNode
    text?: string
    isSubmit?: boolean
    disabled?: boolean
    className?: string
    children?: ReactNode
    
    type?: "submit" | "reset" | "button" | undefined
}