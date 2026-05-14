import { Button } from "../../../../shared/ui/button";
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card";
import { ReactComponent as Edit } from "../../../../shared/ui/icons/edit.svg"
import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"
import styles from './block.module.css'
import { useState } from "react";
import { Input } from "../../../../shared/ui/input";
import { useUserContext } from "../../../../entities/user";
import signature from '../../../../assets/images/signature.png'

export function SetSignatureBlock() {


	const [isChanging, setIsChanging] = useState<boolean>(false)
	const { user } = useUserContext()



    return (
        <UniversalBlockCard
				title="Варіанти підпису"
				button={
					<Button
						text={isChanging ? "" : "Редагувати Інформацію"}
						function={() => {
							// isChanging
							// 	? handleSubmit(onSubmit)()
							// 	: setIsChanging(true)
							setIsChanging(!isChanging)
						}}
						fill={false}
						icon={isChanging ? <Check /> : <Edit />}
					/>
				}
			>
				<div className={styles.setSignatureBlock}>
					<div className={styles.setVisibleName}>
						<div className={`${styles.changedPart} ${isChanging ? styles.changing : ''}`}>
							<input type="checkbox" disabled={isChanging ? false : true} />
							<p>Ім’я та прізвище</p>
						</div>
						<p className={styles.name}>{user?.name || 'Не вказано'}</p>
					</div>
					<div className={styles.setVisibseSignature}>
						<div className={`${styles.changedPart} ${isChanging ? styles.changing : ''}`}>
							<input type="checkbox" disabled={isChanging ? false : true} />
							<p>Ім’я та прізвище</p>
						</div>
						<img className={styles.signature} src={signature} alt="Підпис" />
					</div>
				</div>
			</UniversalBlockCard>
    )
}