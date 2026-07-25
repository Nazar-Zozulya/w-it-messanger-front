import { useNavigate, useParams } from "react-router-dom"
import { ProfileBlock } from "../../widgets/user"
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import { User, useUserContext } from "../../entities/user"
import { GET } from "../../helpers/get"
import { AnotherUserAlbumBlock } from "../../widgets/album"

export function UserAlbumsPage() {
	const { id } = useParams()

	const [anotherUser, setAnotherUser] = useState<User | null>(null)

	const { user } = useUserContext()

	const navigate = useNavigate()

	useEffect(() => {
		if (!id) return
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
	}, [id])

	return (
		<div className={styles.container}>
			{anotherUser && (
				<ProfileBlock mode="anotherUser" anotherUser={anotherUser} />
			)}

            {id && (
                <AnotherUserAlbumBlock userId={+id} />
            )}
		</div>
	)
}
