import { ReactNode } from "react"

export interface ModalProps {
    children: ReactNode
    isClosingFromCover?: boolean
}

export interface SettingsModalProps extends Omit<ModalProps, "children" > {}