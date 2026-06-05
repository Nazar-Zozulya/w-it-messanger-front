import { useEffect, useState } from "react"
import { ChatsBlock, RequestBlock } from "../../widgets/main_page"
import { CreatePostBlock, CreatePostModal, PostsList } from "../../widgets/post"
import { ProfileBlock } from "../../widgets/user"
import { useCookies } from "react-cookie"
import { useModalManagerStore } from "../../entities/modal/model/storage/modalManager"
import { User, useUserContext } from "../../entities/user"
import styles from "./page.module.css"
import { MainPageProps } from "./page.types"
import { useNavigate, useParams } from "react-router-dom"
import { GET } from "../../helpers/get"
import { UserAlbumsBlock } from "../../widgets/album"

export function MainPage(props: MainPageProps) {
	const { openModal } = useModalManagerStore()
	const [anotherUser, setAnotherUser] = useState<User | null>(null)
	const { user } = useUserContext()
	const navigate = useNavigate()
	const { id } = useParams()
	useEffect(() => {
		if (!id) {
			setAnotherUser(null)
			return
		}

		if (props.mode !== "anotherUser") return
		;(async () => {
			if (+id === user?.id)  return navigate("/my-posts")

			const anotherUser = await GET<User>({
				whichService: "userService",
				endpoint: `api/user/get/${id}`,
			})

			if (anotherUser.status === "error") return

			setAnotherUser(anotherUser.data)
		})()
	}, [id, props.mode])

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
				{props.mode !== "anotherUser" && <ProfileBlock mode={props.mode} />}
				{props.mode === "anotherUser" && anotherUser && (
					<ProfileBlock mode={props.mode} anotherUser={anotherUser} />
				)}
				{props.mode === "main" && (
					<>
						<RequestBlock />
						<ChatsBlock />
					</>
				)}
				{props.mode === "anotherUser" && (
					<UserAlbumsBlock albums={anotherUser?.albums || []} />
				)}
			</div>
			<div className={styles.content}>
				<CreatePostBlock />

				<PostsList mode={props.mode} />

				<div className={styles.bottomSpace}></div>
			</div>
		</div>
	)
}
