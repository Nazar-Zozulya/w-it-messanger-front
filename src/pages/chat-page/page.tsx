import { AllContactsBlock, ChatBlock, ChatNotificationsBlock } from '../../widgets/chat'
import styles from './page.module.css'


export function ChatPage() {
    return <div className={styles.container}>
        <div className={styles.content}>
            <AllContactsBlock/>
            <ChatBlock />
            <ChatNotificationsBlock />
        </div>
        <div className={styles.bottomSpace}></div>
    </div>
}