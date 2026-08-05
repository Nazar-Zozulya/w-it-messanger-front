import { create } from "zustand"
import { Album } from "../../../user"
import { CreateAlbumCredentials } from "../types/album"
import { GET } from "../../../../helpers/get"
import { POST } from "../../../../helpers/post"
import { Result } from "../../../../types/result"

interface AlbumsManagerStoreTypes {
	albums: Album[] | null
	preAlbums: CreateAlbumCredentials[] | null
	getAlbums: (token: string, page: number, size: number) => Promise<number>
	getAlbumsByUserId: (userId: number, page: number, size: number) => Promise<Result<Album[]>>
	createAlbum: (credentials: CreateAlbumCredentials, token: string) => void
	updateAlbum: (
		albumId: number,
		token: string,
		credentials: CreateAlbumCredentials,
	) => void
	deleteAlbum: (albumId: number, token: string) => void
	switchShownAlbum: (albumId: number, token: string) => void
	clearAllAlbums: () => void
}

export const useAlbumsManager = create<AlbumsManagerStoreTypes>((set, get) => ({
	albums: null,
	preAlbums: null,

	getAlbums: async (token, page, size) => {
		try {
			const response = await GET<Album[]>({
				whichService: "userService",
				endpoint: `api/user/albums?page=${page}&size=${size}`,
				token,
			})

			if (response.status === "success") {
				console.log("setting albums", response.data)
				set({ albums: [...(get().albums ?? []), ...response.data] })
				return response.data.length
			}

			console.log(response, "albums response")
			return 0
		} catch (err) {
			console.log("Error fetching albums:", err)
			return 0
		}
	},

	getAlbumsByUserId: async (userId, page, size) => {
		try {
			const response = await GET<Album[]>({
				whichService: "userService",
				endpoint: `api/user/albums/${userId}?page=${page}&size=${size}`,
			})
			return response
		} catch (err) {
			console.log("Error fetching albums:", err)
			return {status: "error", message: "Error fetching albums"}
		}
	},

	createAlbum: async (credentials, token) => {
		try {
			set({ preAlbums: [...(get().preAlbums ?? []), credentials] })
			const response = await POST<Album>({
				whichService: "userService",
				endpoint: "api/user/albums/create",
				token,
				body: credentials,
			})

			if (response.status === "success") {
				set({ preAlbums: get().preAlbums?.filter((album) => album !== credentials) })
				set({ albums: [...(get().albums ?? []), response.data] })
			}
			set({ preAlbums: get().preAlbums?.filter((album) => album !== credentials) })
		} catch (err) {
			console.log("Error creating album", err)
		}
	},

	updateAlbum: async (albumId, token, credentials) => {
		try {
			const response = await POST<Album>({
				whichService: "userService",
				endpoint: "api/user/albums/update",
				method: "PUT",
				token,
				body: { ...credentials, id: albumId },
			})

			if (response.status === "success") {
				set({
					albums: get().albums?.map((album) => {
						if (album.id === albumId) {
							album.name = response.data.name
							album.theme = response.data.theme
							album.year = response.data.year
						}
						return album
					}),
				})
			}
		} catch (err) {
			console.log("Error updating album", err)
		}
	},

	deleteAlbum: async (albumId, token) => {
		try {
			const response = await POST<Album>({
				whichService: "userService",
				endpoint: "api/user/albums/delete",
				method: "DELETE",
				token,
				body: { id: albumId },
			})

			if (response.status === "success") {
				set({
					albums: get().albums?.filter((album) => {
						return album.id !== albumId
					}),
				})
			}
		} catch (err) {
			console.log("Error deleting album", err)
		}
	},

	switchShownAlbum: async (albumId, token) => {
		try {
			const response = await POST<Album>({
				whichService: "userService",
				endpoint: "api/user/albums/switch-shown",
				method: "PATCH",
				token,
				body: { id: albumId },
			})

			if (response.status === "success") {
				set({
					albums: get().albums?.map((album) => {
						if (album.id === albumId) {
							album.is_shown = !album.is_shown
						}
						return album
					}),
				})
			}
		} catch (err) {
			console.log("Error deleting album", err)
		}
	},

	clearAllAlbums: () => {
		set({albums: null})
	}
}))
