import { Button } from '../../../../shared/ui/button'
import styles from './block.module.css'
import { ReactComponent as Plus } from '../../../../shared/ui/icons/plus.svg'
import { ReactComponent as People } from '../../../../shared/ui/icons/people.svg'
import { ReactComponent as Search } from '../../../../shared/ui/icons/search.svg'
import { AnotherUserCard } from '../../../../entities/user'

export function AllContactsBlock() {
    return <div className={styles.container}>
        <Button fill={true} text='Створити груповий чат' icon={<Plus />} className={styles.createGroupButton} />
        <div className={styles.allContacts}>
            <div className={styles.titleDiv}>
                <People style={{color: "#81818D"}} />
                <p className={styles.title}>Контакти</p>
            </div>
            <div className={styles.searchDiv}>
                <button className={styles.searchButton}>
                    <Search style={{color: "#81818D"}} />
                </button>
                <input type="text" className={styles.searchInput} placeholder='Пошук' />
            </div>
            <div className={styles.contactsList}>
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
                <AnotherUserCard username='123123'  mode='default' />
            </div>
        </div>
    </div>
}