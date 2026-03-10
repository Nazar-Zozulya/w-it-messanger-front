import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthPage, MainPage, SettingsPage } from "../pages"
import { Layout } from "../widgets/layout"

export function AppProviders() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/auth" element={<AuthPage />} />
				<Route path="*" element={<div>not found</div>} />
				<Route path="/" element={<Layout />}> 
					<Route path="/" element={<MainPage />} />
					<Route path="/settings" element={<SettingsPage />} />
				</ Route>
				
			</Routes>
		</BrowserRouter>
	)
}
