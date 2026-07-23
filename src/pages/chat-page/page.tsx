import { AllContactsBlock, ChatBlock, ChatNotificationsBlock } from '../../widgets/chat'
import styles from './page.module.css'
import { ChatPageProps } from './page.types'


export function ChatPage(props: ChatPageProps) {
    return <div className={styles.container}>
        <div className={styles.content}>
            <AllContactsBlock/>
            <ChatBlock mode={props.mode} />
            <ChatNotificationsBlock />
        </div>
        <div className={styles.bottomSpace}></div>
    </div>
}