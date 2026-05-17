import { ConfirmFormTypes } from './form.types'
import styles from './form.module.css'
import VerificationInput from 'react-verification-input'



export function ConfirmForm() {
    return (
        <div><VerificationInput length={10} /></div>
    )
}