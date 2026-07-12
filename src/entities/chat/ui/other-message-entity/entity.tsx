import { OtherMessageEntityProps } from "./entity.types"
import styles from "./entity.module.css"
import { DEFAULT_AVATAR } from "../../../../constants/default-avatar"
import { ReactComponent as SendMessage } from "../../../../shared/ui/icons/send-message.svg"
import { useEffect, useRef } from "react"
import { useChatSocketStore } from "../../../../shared/socket"
import { useUserContext } from "../../../user"

export function OtherMessageEntity(props: OtherMessageEntityProps) {
	const targetRef = useRef(null)

	const { seeMessage } = useChatSocketStore()

	const { user } = useUserContext()

	useEffect(() => {
		if (!user) return

		const isRead = props.readers?.some((reader) => reader.id === user.id)

		if (isRead) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					seeMessage({
						messageId: props.id,
						readerId: user.id,
					})

					observer.disconnect()
				}
			},
			{
				threshold: 0.8,
			},
		)

		const element = targetRef.current

		if (element) {
			observer.observe(element)
		}

		return () => {
			observer.disconnect()
		}
	}, [user, props.id, props.readers, seeMessage])
	return (
		<div className={styles.container} ref={targetRef}>
			<div className={styles.allMessageBlock}>
				<img src={DEFAULT_AVATAR} className={styles.avatar} alt="" />
				<div className={styles.messageBlock}>
					<div className={styles.textBlock}>
						<p className={styles.name}>
							{props.user?.first_name
								? `${props.user.first_name} ${props.user.last_name}`
								: props.user?.username}
						</p>
						<p className={styles.text}>{props.text}</p>
					</div>
					<div className={styles.addicInfo}>
						<p className={styles.createdAt}>
							{
								props.createdAt
									.toISOString()
									.slice(11, 16) /**  "14:05"*/
							}
						</p>
						<SendMessage
							width={10}
							height={10}
							color={
								props.readers.length === 0
									? "#81818E"
									: "#583b53"
							}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
