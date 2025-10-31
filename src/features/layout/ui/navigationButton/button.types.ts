import { ReactNode } from "react";

export interface NavigationButtonProps {
    icon: ReactNode
    text: string
    redirect: string
    isSelected?: boolean
}