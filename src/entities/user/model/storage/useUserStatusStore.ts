import { create } from "zustand"
import { UserStatus, UserStatusVariants } from "../types/userStatus"

interface UseUserStatusStore {
	users: UserStatus[] | null
	setUserNewStatus: (status: UserStatusVariants, userId: number) => void
	setInitialStatuses: (userStatuses: UserStatus[]) => void
}

export const useUserStatusStore = create<UseUserStatusStore>((set, get) => ({
	users: null,
	setUserNewStatus: async (status, userId) => {
		const allUsers = get().users

		// const isCurrentUser = allUsers.some((user) => user.id === userId)
		// if (!isCurrentUser) return

		const updatedUsers = allUsers?.map((user) => {
			if (user.id === userId) {
				user.status = status
			}
			return user
		})

		set({ users: updatedUsers })
	},
	setInitialStatuses: async (userStatuses) => {
		set({ users: userStatuses })
	},
}))
