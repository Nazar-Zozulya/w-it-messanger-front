import { rejects } from "assert"
import { resolve } from "path"

export async function fileToBase64(file: File): Promise<string | null> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.readAsDataURL(file)

		reader.onload = () => {
			const base64String = reader.result as string

			const pureBase64 = base64String.split(",")[1]

			resolve(`data:${file.type};base64,${pureBase64}`)
		}

		reader.onerror = (error) => {
			reject(error)
		}
	})
}
