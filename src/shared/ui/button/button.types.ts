import { ReactNode } from "react"

export interface ButtonProps {
    fill: boolean
    function: () => void
    icon?: ReactNode,
    text?: string
}