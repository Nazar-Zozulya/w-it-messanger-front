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
	setUser: (user: User) => void
	login: (email: string, password: string) => Promise<Result<string>>
	register: (
		email: string,
		password: string,
		// repeatPassword: string,
	) => Promise<Result<string>>
	preConfirmEmail: (email: string) => Promise<Result<string>>
	confirmEmail: (email: string, code: string) => Promise<Result<string>>
	logout: () => void
	completeProfile: (
		name?: string,
		surname?: string,
		username?: string,
	) => Promise<Result<User>>
	getUser: (token: string) => Promise<Result<User>>
	update: (
		data: Partial<User & { avatar?: string }>,
	) => Promise<Result<User>>
}

const initalValue: userContextTypes = {
	user: null,
	token: null,
	setUser: (user: User) => {
		return
	},
	login: async (email, password) => {
		return { status: "error" } as Error
	},
	register: async (email, password) => {
		return { status: "error" } as Error
	},
	preConfirmEmail: async (email) => {
		return { status: "error" } as Error
	},
	confirmEmail: async (email, code) => {
		return { status: "error" } as Error
	},
	logout: () => {},
	completeProfile: async (name, surname, username) => {
		return { status: "error" } as Error
	},
	getUser: async (token) => {
		return { status: "error" } as Error
	},
	update: async (data) => {
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
		// repeatPassword: string,
	) {
		// if (password !== repeatPassword) {
		// 	return {
		// 		status: "error",
		// 		message: "Паролі не спвпадають",
		// 		code: 400,
		// 	} as Error
		// }

		const result = await POST<string>({
			whichService: "userService",
			endpoint: "api/user/create",
			body: { email, password },
		})

		if (result.status === "error") {
			return result
		}

		setToken(result.data)

		return result
	}

	async function preConfirmEmail(email: string) {
		const result = await POST<string>({
			whichService: "userService",
			endpoint: "api/user/pre-confirm-email",
			body: {
				email
			}
		})

		return result
	}

	async function confirmEmail(email: string, code: string) {
		const result = await POST<string>({
			whichService: "userService",
			endpoint: "api/user/confirm-email",
			body: {
				email: email,
				code: +code,
			},
		})

		return result
	}

	function logout() {
		setToken(null)
		setUser(null)

		localStorage.removeItem("token")
	}

	async function completeProfile(
		first_name?: string,
		surname?: string,
		last_name?: string,
	) {
		const result = await POST<User>({
			whichService: "userService",
			endpoint: "api/user/complete-profile",
			method: "PATCH",
			body: {
				first_name,
				surname,
				last_name,
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

	async function update(data: Partial<User & { avatar?: string }>) {
		const result = await POST<User>({
			whichService: "userService",
			endpoint: "api/user/update",
			method: "PATCH",
			token: token ?? "",
			body: data,
		})

		if (result.status === "error") {
			return result
		}

		console.log("user:", result.data)

		setUser(result.data)

		return result
	}

	// юзефект при измененний токена
	useEffect(() => {
		// console.log("TOKEN: ", token)
		// если нету токена то проверяем наличие его в localStorage и если и там его нету то очищаем localStorage
		if (!token) {
			const storagedToken = localStorage.getItem("token")

			if (!storagedToken) {
				localStorage.removeItem("token")
			}
		}
		// если есть токен то получаем по нему юзера и сохраняем в localStorage
		else {
			getUser(token)

			localStorage.setItem("token", token)
		}
	}, [token])

	// юзефект при запуске сайта на получение токена
	useEffect(() => {
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
				setUser,
				logout,
				login,
				register,
				preConfirmEmail,
				confirmEmail,
				completeProfile,
				getUser,
				update,
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}
