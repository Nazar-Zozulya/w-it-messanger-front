import { useEffect, useRef, useState } from "react"
import { ChatsBlock, RequestBlock } from "../../widgets/main_page"
import { CreatePostBlock, PostsList } from "../../widgets/post"
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

	const { user, token } = useUserContext()

	const navigate = useNavigate()
	const { id } = useParams()

	const contentRef = useRef<HTMLDivElement>(null)

	const [cookies, , removeCookie] = useCookies(["complete-profile"])

	useEffect(() => {
		contentRef.current?.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}, [props.mode, id])

	useEffect(() => {
		if (!id) {
			setAnotherUser(null)
			return
		}

		if (props.mode !== "anotherUser") return

		;(async () => {
			if (+id === user?.id) {
				navigate("/my-posts")
				return
			}

			const response = await GET<User>({
				whichService: "userService",
				endpoint: `api/user/get/${id}`,
			})

			if (response.status === "error") return

			setAnotherUser(response.data)
		})()
	}, [id, props.mode, user])

	useEffect(() => {
		if (!token) {
			removeCookie("complete-profile")
			return
		}

		if (cookies["complete-profile"] === "yes") {
			openModal("completeProfile")
		}
	}, [cookies, token])

	return (
		<div className={styles.container}>
			<div className={styles.leftBlock}>
				{props.mode !== "anotherUser" && (
					<ProfileBlock mode={props.mode} />
				)}

				{props.mode === "anotherUser" && anotherUser && (
					<ProfileBlock
						mode={props.mode}
						anotherUser={anotherUser}
					/>
				)}

				{props.mode === "main" && (
					<>
						<RequestBlock />
						<ChatsBlock />
					</>
				)}

				{props.mode === "anotherUser" && (
					<UserAlbumsBlock
						albums={anotherUser?.profile.albums || []}
					/>
				)}
			</div>

			<div
				ref={contentRef}
				className={styles.content}
			>
				{props.mode !== "anotherUser" && <CreatePostBlock />}

				<PostsList mode={props.mode} />

				<div className={styles.bottomSpace}></div>
			</div>
		</div>
	)
}