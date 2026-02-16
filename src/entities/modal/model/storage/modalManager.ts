import { create } from "zustand";



type ModalType = 'createPost' | "completeProfile" | null;

interface ModalManagerStoreTypes {
    activeModal: ModalType;
    openModal: (modal: ModalType) => void;
    closeModal: () => void;
    switchModal: (modal: ModalType) => void;
}

export const useModalManagerStore = create<ModalManagerStoreTypes>((set) => ({
    activeModal: null,
    openModal: (modal) => set({ activeModal: modal }),
    closeModal: () => set({ activeModal: null }),
    switchModal: (modal) => set({ activeModal: modal }),
}));