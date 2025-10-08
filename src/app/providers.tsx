import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthPage } from "../pages/auth-page/page"
import { UserContextProvider } from "../entities/user"

export function AppProviders() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/auth" element={<AuthPage />} />
					<Route path="*" element={<div>not found</div>} />
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	)
}
