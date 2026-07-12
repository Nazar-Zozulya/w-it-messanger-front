import { SettingsModalProps } from "../../../../shared/ui/modal/modal.types"

export interface CompleteProfileForm {
    first_name: string
    last_name: string
    username: string
}


export interface CompleteProfileProps extends SettingsModalProps {}