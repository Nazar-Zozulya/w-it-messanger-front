import styles from './header.module.css'
import { ReactComponent as Logo } from '../../../../shared/ui/icons/logo.svg'
import { useNavigate } from 'react-router-dom'


export function AuthUserHeader() {
    const navigation = useNavigate()
    return (
        <div className={styles.container}>
            <button className={styles.logoButton} onClick={()=> navigation('/')}>
                <Logo style={{height: "1.9vh"}} />
            </button>
        </div>
    )
}