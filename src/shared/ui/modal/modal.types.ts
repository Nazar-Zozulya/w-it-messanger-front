import { isVisible } from "@testing-library/user-event/dist/utils";
import { ReactNode } from "react";

export interface ModalProps {
    isVisible: boolean
    onClose: () => void
    children: ReactNode
}