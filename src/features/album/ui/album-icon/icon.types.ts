export interface AlbumIconProps {
    image: string
    id: number
    shown: boolean
    onDelete: (id: number) => void
    switchShown: (id: number) => void
}

export interface LoadingAlbumIconProps {
    image: string
}