import { useEffect } from "react"
import { useModalManagerStore } from "../entities/modal/model/storage/modalManager"
import { CreatePostModal } from "../widgets/post"
import { CompleteProfileModal } from "../widgets/user"
import { CreateAlbumModal, UpdateAlbumModal } from "../widgets/album"
import { CreateGroupStepOneModal } from "../widgets/chat"

export function ModalsShower(props: { children: React.ReactNode }) {
	const { activeModal } = useModalManagerStore()

	return (
		<>
			{props.children}

			{activeModal === "createPost" && <CreatePostModal />}

			{activeModal === "completeProfile" && <CompleteProfileModal />}

			{activeModal === "createAlbum" && <CreateAlbumModal />}

			{activeModal === "updateAlbum" && <UpdateAlbumModal />}

			{activeModal === "createGroupStepOne" && <CreateGroupStepOneModal/>}
		</>
	)
}
