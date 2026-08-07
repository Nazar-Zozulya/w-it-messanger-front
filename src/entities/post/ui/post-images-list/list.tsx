import { PostImagesListProps } from "./list.types"
import styles from "./list.module.css"
import { PostImage } from "../../model/types"
import { WhichDeviceType } from "../../../../helpers/which-device-type"
import { ReactComponent as Trash } from "../../../../shared/ui/icons/trash.svg"
import { Button } from "../../../../shared/ui/button"

export function PostImagesList(props: PostImagesListProps) {
	const chunkImages: PostImage[][] = props.images.reduce<PostImage[][]>(
		(acc: PostImage[][], image) => {
			const lastChunk = acc[acc.length - 1]
			const preLastChunk = acc[acc.length - 2]

			const device = WhichDeviceType()
			const big: number =
				device === "mobile" ? 1 : device === "tablet" ? 2 : 3
			const low: number =
				device === "mobile" ? 1 : device === "tablet" ? 1 : 2

			// Условия, при которых создается новый массив
			if (
				!lastChunk || // Сначала строго проверяем, если вообще ничего нет
				(!preLastChunk && lastChunk.length === big) || // Если прошлый ряд пуст, а первый набрал 3
				(preLastChunk?.length === big && lastChunk.length === low) || // Чередование: после 3 идет 2
				(preLastChunk?.length === low && lastChunk.length === big) // Чередование: после 2 идет 3
			) {
				acc.push([image])
			} else {
				lastChunk.push(image)
			}

			return acc
		},
		[],
	)
	return (
		<div className={styles.container}>
			{chunkImages.map((imageChunk) => {
				return (
					<div className={styles.imageChunkList}>
						{imageChunk.map((image, index) => {
							return (
								<div
									className={`${styles.imageDiv} ${imageChunk.length === 3 && styles.threeImage}
                                        ${imageChunk.length === 2 && styles.twoImage}
                                        ${imageChunk.length === 1 && styles.oneImage}`}
								>
									<img
										className={`${styles.image} 
										`}
										src={image.original_image}
										alt={"Фото не прогрузилося."}
									/>
									{props.isDelete && (
										<Button
											fill={false}
											type="button"
											icon={<Trash />}
											className={styles.imageDeleteButton}
											function={()=>{props.onDelete  && props.onDelete(image.original_image,index)}}
										/>
									)}
								</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
