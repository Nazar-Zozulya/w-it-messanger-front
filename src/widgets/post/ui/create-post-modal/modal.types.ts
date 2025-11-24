export interface createPostModalProps {
    isVisible: boolean
    onClose: () => void
    
}

export interface createPostForm {
    title: string
    content?: string

    images?: string[]

    tags?: string[]
    links?: string[]
}