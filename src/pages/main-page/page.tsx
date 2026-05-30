import { useEffect, useState } from "react"
import { ChatsBlock, RequestBlock } from "../../widgets/main_page"
import { CreatePostBlock, CreatePostModal, PostsList } from "../../widgets/post"
import { ProfileBlock } from "../../widgets/user"
import { useCookies } from "react-cookie"
import { useModalManagerStore } from "../../entities/modal/model/storage/modalManager"
import { useUserContext } from "../../entities/user"
import styles from "./page.module.css"
import { MainPageProps } from "./page.types"

export function MainPage(props: MainPageProps) {
	const { openModal } = useModalManagerStore()

	const { token } = useUserContext()

	const [cookies, setCookie, removeCookie] = useCookies(["complete-profile"])

	useEffect(() => {
		if (!token) {
			removeCookie("complete-profile")
		}

		if (cookies["complete-profile"] === "yes" && token) {
			openModal("completeProfile")
			// удаления не надо ведь ето куки бует жить 10 секунд
			// removeCookie("complete-profile")
		}
	}, [cookies])

	return (
		<div className={styles.container}>
			<div className={styles.leftBlock}>
				<ProfileBlock />
				{props.mode === "main" && (
					<>
						<RequestBlock />
						<ChatsBlock />
					</>
				)}
			</div>
			<div className={styles.content}>
				<CreatePostBlock />

				<PostsList  mode={props.mode} />

				<div className={styles.bottomSpace}></div>
			</div>
		</div>
	)
}
