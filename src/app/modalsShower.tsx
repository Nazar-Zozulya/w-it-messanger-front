import { useEffect } from "react"
import { useModalManagerStore } from "../entities/modal/model/storage/modalManager"
import { CreatePostModal } from "../widgets/post"
import { CompleteProfileModal } from "../widgets/user"
import { CreateAlbumModal, UpdateAlbumModal } from "../widgets/album"
import { CreateGroupModal } from "../widgets/chat"

export function ModalsShower(props: { children: React.ReactNode }) {
	const { activeModal } = useModalManagerStore()

	return (
		<>
			{props.children}

			{activeModal === "createPost" && <CreatePostModal mode="create" />}

			{activeModal === "updatePost" && <CreatePostModal mode="update" />}

			{activeModal === "completeProfile" && <CompleteProfileModal />}

			{activeModal === "createAlbum" && <CreateAlbumModal />}

			{activeModal === "updateAlbum" && <UpdateAlbumModal />}

			{activeModal === "createGroup" && <CreateGroupModal />}
		</>
	)
}
