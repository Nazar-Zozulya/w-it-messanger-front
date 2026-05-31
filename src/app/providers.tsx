import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthPage, FriendsPage, MainPage, SettingsPage } from "../pages"
import { Layout } from "../widgets/layout"

export function AppProviders() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/auth" element={<AuthPage />} />
				<Route path="*" element={<div>not found</div>} />
				<Route path="/" element={<Layout />}> 
					<Route path="/" element={<MainPage mode="main" />} />
					<Route path="/my-posts" element={<MainPage mode="myPosts" />} />
					<Route path="/friends" element={<FriendsPage />} />
					<Route path="/settings" element={<SettingsPage />} />
				</ Route>
				
			</Routes>
		</BrowserRouter>
	)
}
