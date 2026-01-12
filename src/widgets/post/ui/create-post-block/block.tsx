import { Button } from '../../../../shared/ui/button'
import styles from './block.module.css'
import { ReactComponent as Smile } from '../../../../shared/ui/icons/smile.svg'
import { useModalManagerStore } from '../../../../entities/modal/model/storage/modalManager'
import { Post } from '../../../../entities/post/model/types'



export function CreatePostBlock() {
    const { openModal } = useModalManagerStore()

    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <textarea placeholder='Текст публікації' rows={4} />
            </form>
            <div className={styles.buttons}>
                <Button fill={false} function={()=>console.log(123)} icon={<Smile />} />
                <Button fill={true} function={()=>{openModal("createPost")}} text='Перейти до оформлення' />
            </div>
        </div>
    )
}