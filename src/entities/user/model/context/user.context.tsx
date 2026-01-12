import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react"
import { User } from "../types"
import { POST } from "../../../../helpers/post"
import { GET } from "../../../../helpers/get"
import { Error, Result } from "../../../../types/result"

interface userContextTypes {
	user: User | null
	token: string | null
	login: (email: string, password: string) => Promise<Result<string>>
	register: (
		email: string,
		password: string,
		repeatPassword: string
	) => Promise<Result<string>>
	completeProfile: (
		name?: string,
		surname?: string,
		username?: string
	) => Promise<Result<User>>
	getUser: (token: string) => Promise<Result<User>>
}

const initalValue: userContextTypes = {
	user: null,
	token: null,
	login: async (email, password) => {
		return { status: "error" } as Error
	},
	register: async (email, password, repeatPassword) => {
		return { status: "error" } as Error
	},
	completeProfile: async (name, surname, username) => {
		return { status: "error" } as Error
	},
	getUser: async (token) => {
		return { status: "error" } as Error
	},
}

export const UserContext = createContext<userContextTypes>(initalValue)

export function useUserContext() {
	return useContext(UserContext)
}

interface userProviderProps {
	children: ReactNode
}

export function UserContextProvider(props: userProviderProps) {
	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState<string | null>(null)

	async function login(email: string, password: string) {
		const result = await POST<string>({
			whichService: "userService",
			endpoint: "api/user/auth",
			body: { email, password },
		})

		if (result.status === "error") {
			return result
		}

		setToken(result.data)

		return result
	}

	async function register(
		email: string,
		password: string,
		repeatPassword: string
	) {
		if (password !== repeatPassword) {
			return {
				status: "error",
				message: "Паролі не спвпадають",
				code: 400,
			} as Error
		}

		const result = await POST<string>({
			whichService: "userService",
			endpoint: "api/user/create",
			body: { email, password },
		})

		if (result.status === "error") {
			return result
		}

		return result
	}

	async function completeProfile(
		name?: string,
		surname?: string,
		username?: string
	) {
		const result = await POST<User>({
			whichService: "userService",
			endpoint: "api/user/complete-profile",
			body: {
				name,
				surname,
				username,
			},
			token: token as string,
		})

		if (result.status === "error") {
			return result
		}

		getUser(token as string)

		return result
	}

	async function getUser(token: string) {
		const result = await GET<User>({
			whichService: "userService",
			endpoint: "api/user/get",
			token,
		})

		if (result.status === "error") {
			return result
		}

		setUser(result.data)

		return result
	}

	// юзефект при измененний токена
	useEffect(() => {
		if (!token) return
		console.log(45)

		getUser(token)
		console.log(user)

		localStorage.setItem("token", token)
	}, [token])

	// юзефект при запуске сайта на получение токена
	useEffect(() => {
		console.log(44)
		const userToken = localStorage.getItem("token")

		if (!userToken) return

		setToken(userToken)
	}, [])

	useEffect(() => {
		console.log("user changed:", user)
	}, [user])

	return (
		<UserContext.Provider
			value={{
				user,
				token,
				login,
				register,
				completeProfile,
				getUser,
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}
