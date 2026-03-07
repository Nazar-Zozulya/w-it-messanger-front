import { useEffect } from "react"
import { useModalManagerStore } from "../entities/modal/model/storage/modalManager"
import { CreatePostModal } from "../widgets/post"
import { CompleteProfileModal } from "../widgets/user"

export function ModalsShower(props: { children: React.ReactNode }) {
	const { activeModal } = useModalManagerStore()
	useEffect(() => {
		console.log("Active modal changed to: ", activeModal)

		if (activeModal ){
			console.log('sosi')
		}
	}, [activeModal])


	return (
		<>
			{props.children}

			{activeModal == "createPost" && <CreatePostModal />}

			{activeModal == "completeProfile" && (
				<CompleteProfileModal isClosingFromCover={false} />
			)}
		</>
	)
}
