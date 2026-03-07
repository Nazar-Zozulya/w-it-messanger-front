import { rejects } from "assert"
import { resolve } from "path"

export async function fileToBase64(file: File): Promise<string | null> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.readAsDataURL(file)

		reader.onload = () => {
			const base64String = reader.result as string
			resolve(base64String)
		}

		reader.onerror = (error) => {
			reject(error)
		}
	})
}
