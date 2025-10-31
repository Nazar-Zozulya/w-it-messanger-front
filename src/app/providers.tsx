import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthPage } from "../pages/auth-page/page"
import { UserContextProvider } from "../entities/user"
import { Layout } from "../widgets/layout"
import { MainPage } from "../pages/main-page"

export function AppProviders() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/auth" element={<AuthPage />} />
					<Route path="*" element={<div>not found</div>} />
					<Route path="/" element={<Layout />}> 
						<Route path="/" element={<MainPage />} />
					</ Route>
					
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	)
}
