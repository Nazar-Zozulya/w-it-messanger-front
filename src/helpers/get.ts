import { get } from "http";
import { ServicesUrlPath } from "../types/api";
import { Result } from "../types/result";
import { servicesUrlPath } from "../constants/api";


interface GETTypes {
    whichService: keyof ServicesUrlPath
    endpoint: string
    headers?: HeadersInit
    token?: string
}






export async function GET<T>(params: GETTypes): Promise<Result<T>>{
    const { whichService, endpoint, headers, token } = params

    const serviceUrl = servicesUrlPath[whichService]

    const requestHeaders: HeadersInit = new Headers(headers) 

    if (token){
        requestHeaders.set("Authorization", `Bearer ${token}`)
    }

    try {
        const response = await fetch(`${serviceUrl}/${endpoint}`, {
            method: "GET",
            headers: requestHeaders,
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


// GET({whichService:  "userService", })