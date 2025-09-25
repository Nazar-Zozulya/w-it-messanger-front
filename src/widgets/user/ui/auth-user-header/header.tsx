import styles from './header.module.css'
import { ReactComponent as Logo } from '../../../../shared/ui/icons/logo.svg'


export function AuthUserHeader() {
    return (
        <div className={styles.container}>
            <Logo height={20} />
        </div>
    )
}