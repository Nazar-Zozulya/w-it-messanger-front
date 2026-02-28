import React, { ReactNode } from "react"

export interface SmallModalProps {
    isVisible: boolean
    onClose: () => void
    // container: ReactNode
    initiator: ReactNode
    modal: ReactNode

    containerStyle?: string
    modalContainerStyle?: string
}