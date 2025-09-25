import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "../pages/auth-page/page";



export function AppProviders() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="*" element={<div>not found</div>} />
            </Routes>
        </BrowserRouter>
    )
}