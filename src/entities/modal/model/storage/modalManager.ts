import { create } from "zustand"
import { Post } from "../../../post/model/types"

type ModalType =
	| "createPost"
	| "updatePost"
	| "completeProfile"
	| "createAlbum"
	| "updateAlbum"
	| "createGroup"
	| "changeGroup"
	| "addPeopleToGroup"
	| null

interface ModalManagerStoreTypes {
	activeModal: ModalType
	anyData: any
	updatePostData: Post | null 
	setData: (data: any) => void
	setUpdatePostData: (data: Post | null) => void
	clearData: () => void
	openModal: (modal: ModalType) => void
	closeModal: () => void
	switchModal: (modal: ModalType) => void
}

export const useModalManagerStore = create<ModalManagerStoreTypes>((set) => ({
	activeModal: null,
	anyData: null,
	updatePostData: null,
	setData: (data) => set({ anyData: data }),
	setUpdatePostData: (data) => set({ updatePostData: data }),
	clearData: () => set({ anyData: null }),
	openModal: (modal) => set({ activeModal: modal }),
	closeModal: () => set({ activeModal: null }),
	switchModal: (modal) => set({ activeModal: modal }),
}))

// GsP79I6ZRB2fnSYdBD3EdA
