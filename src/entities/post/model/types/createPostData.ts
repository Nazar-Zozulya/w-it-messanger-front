export interface createPostData {
    title: string
    content?: string

    authorId: number

    images?: string[]

    tags?: string[]
    links?: string[]
}