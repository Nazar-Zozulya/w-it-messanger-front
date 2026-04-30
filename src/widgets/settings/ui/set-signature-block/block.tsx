import { Button } from "../../../../shared/ui/button";
import { UniversalBlockCard } from "../../../../shared/ui/universal-block-card";
import { ReactComponent as Edit } from "../../../../shared/ui/icons/edit.svg"
import { ReactComponent as Check } from "../../../../shared/ui/icons/check.svg"
import styles from './block.module.css'
import { useState } from "react";

export function SetSignatureBlock() {

	const [isChanging, setIsChanging] = useState<boolean>(false)



    return (
        <UniversalBlockCard
				title="Варіанти підпису"
				button={
					<Button
						text={isChanging ? "" : "Редагувати Інформацію"}
						// function={() => {
						// 	isChanging
						// 		? handleSubmit(onSubmit)()
						// 		: setIsChanging(true)
						// }}
						fill={false}
						icon={isChanging ? <Check /> : <Edit />}
					/>
				}
			>
				<div className={styles.container}>
					113
				</div>
			</UniversalBlockCard>
    )
}