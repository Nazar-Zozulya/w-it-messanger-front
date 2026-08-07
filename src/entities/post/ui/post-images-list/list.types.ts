import { PostImage } from "../../model/types";
import { AlbumImage } from "../../../user/model/types";

export interface PostImagesListProps {
    images: PostImage[]
    isDelete?: boolean
    onDelete?: (image: string, imageIndex: number) => void
}