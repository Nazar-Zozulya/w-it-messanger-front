import { create } from "zustand"
import { Album } from "../../../user"
import { CreateAlbumCredentials } from "../types/album"
import { GET } from "../../../../helpers/get"
import { POST } from "../../../../helpers/post"

interface AlbumsManagerStoreTypes {
	albums: Album[] | null
	getAlbums: (token: string) => void
	createAlbum: (credentials: CreateAlbumCredentials, token: string) => void
	updateAlbum: (
		albumId: number,
		token: string,
		credentials: CreateAlbumCredentials,
	) => void
	deleteAlbum: (albumId: number, token: string) => void
	switchShownAlbum: (albumId: number, token: string) => void
}

export const useAlbumsManager = create<AlbumsManagerStoreTypes>((set, get) => ({
	albums: null,

	getAlbums: async (token) => {
		try {
			const response = await GET<Album[]>({
				whichService: "userService",
				endpoint: "api/user/album",
				token,
			})

			if (response.status === "success") {
				set({ albums: response.data })
			}

			console.log(response, "albums response")
		} catch (err) {
			console.log("Error fetching albums:", err)
		}
	},

	createAlbum: async (credentials, token) => {
		try {
			const response = await POST<Album>({
				whichService: "userService",
				endpoint: "api/user/album/create",
				token,
				body: credentials,
			})

			if (response.status === "success") {
				set({ albums: [...(get().albums ?? []), response.data] })
			}
		} catch (err) {
			console.log("Error creating album", err)
		}
	},

	updateAlbum: async (albumId, token, credentials) => {
		try {
			const response = await POST<Album>({
				whichService: "userService",
				endpoint: "api/user/album/update",
				method: "PUT",
				token,
				body: { ...credentials, id: albumId },
			})

			if (response.status === "success") {
				set({
					albums: get().albums?.map((album) => {
						if (album.id === albumId) {
							album.name = response.data.name
							album.topic = response.data.topic
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
				endpoint: "api/user/album/delete",
				method: "DELETE",
				token,
				body: {id: albumId},
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
				endpoint: "api/user/album/switch-shown",
				method: "PATCH",
				token,
				body: {id: albumId},
			})

			if (response.status === "success") {
				set({
					albums: get().albums?.map((album) => {
						if (album.id === albumId) {
							album.shown = !album.shown
						}
						return album
					}),
				})
			}
		} catch (err) {
			console.log("Error deleting album", err)
		}
        
	},
}))
