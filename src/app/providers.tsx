import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login-page";
import { RegisterPage } from "../pages/register-page";




export function AppProviders() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<div>not found</div>} />
            </Routes>
        </BrowserRouter>
    )
}