import { servicesUrlPath } from "../constants/api"
import { ServicesUrlPath } from "../types/api"
import { Result } from "../types/result"

interface POSTTypes {
	whichService: keyof ServicesUrlPath
	endpoint: string
	headers?: HeadersInit
	token?: string
	body: any
}

export async function POST<T>(params: POSTTypes): Promise<Result<T>> {
	const { whichService, endpoint, headers, token, body } = params

	const serviceUrl = servicesUrlPath[whichService]

	const requestHeaders: HeadersInit = new Headers(headers)
    requestHeaders.set("Content-Type", "application/json")

	if (token) {
		requestHeaders.set("Authorization", `Bearer ${token}`)
	}

    try {
        const response = await fetch(`${serviceUrl}/${endpoint}`, {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(body)
        })

        
        const result: Result<T> = await response.json()
        
        if (result.status === "error"){
			return { ...result, code: response.status }
		}

        return result
    } catch(err) {
        console.log(err)
		return {
			status: "error",
			message: "Network error!:(",
			code: 400
		}
    }


}
