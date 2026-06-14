import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthPage, FriendsPage, MainPage, SettingsPage } from "../pages"
import { Layout } from "../widgets/layout"
import { ChatPage } from "../pages/chat-page"

export function AppProviders() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/auth" element={<AuthPage />} />
				<Route path="*" element={<div>not found</div>} />
				<Route path="/" element={<Layout />}> 
					<Route path="/" element={<MainPage mode="main" />} />
					<Route path="/my-posts" element={<MainPage mode="myPosts" />} />
					<Route path="/:id" element={<MainPage mode="anotherUser" />} />
					<Route path="/friends" element={<FriendsPage />} />
					<Route path="/settings" element={<SettingsPage />} />
					<Route path="/chats" element={<ChatPage mode="no-chat"/>} />
					<Route path="/chat/:id" element={<ChatPage mode="chat"/>} />
				</ Route>
				
			</Routes>
		</BrowserRouter>
	)
}
