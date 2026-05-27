export interface AlbumIconProps {
    image: string
    isLoading: boolean
    id: number
    shown: boolean
    onDelete: (id: number) => void
    switchShown: (id: number) => void
}