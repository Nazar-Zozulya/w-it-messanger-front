import { create } from "zustand";



type ModalType = 'createPost' | "completeProfile" | "createAlbum" | "updateAlbum" | "createGroupStepOne" | null;

interface ModalManagerStoreTypes {
    activeModal: ModalType;
    anyData: any
    setData: (data: any) => void
    clearData: () => void
    openModal: (modal: ModalType) => void;
    closeModal: () => void;
    switchModal: (modal: ModalType) => void;
}

export const useModalManagerStore = create<ModalManagerStoreTypes>((set) => ({
    activeModal: null,
    anyData: null,
    setData: (data) => set({anyData: data}),
    clearData: () => set({anyData: null}),
    openModal: (modal) => set({ activeModal: modal }),
    closeModal: () => set({ activeModal: null }),
    switchModal: (modal) => set({ activeModal: modal }),
}));

// GsP79I6ZRB2fnSYdBD3EdA