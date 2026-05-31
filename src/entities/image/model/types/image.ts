export interface Image {
    id: number
    base64: string
    shown: boolean
    createdAt: Date
    updatedAt: Date
    userId: number | null
    albumId: number | null
}