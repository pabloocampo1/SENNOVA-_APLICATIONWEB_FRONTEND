import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AuthLayaout from "./layouts/AuthLayaout"
import LoginPage from "./pages/auth/LoginPage"
import SystemLayaout from "./layouts/SystemLayaout"
import DashboardPage from "./pages/admin/dashboard/dashboardPage"
import { ThemeContextProvider } from "./context/ThemeContextProvider"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"



function App() {

    return <>
        <GoogleOAuthProvider clientId="rfdfdfd">
            <Router>
                <ThemeContextProvider>

                    <Routes>

                        <Route path="/signIn" element={<AuthLayaout />}>
                            <Route index element={<LoginPage />} />
                        </Route>

                        <Route path="/system" element={<SystemLayaout />}>
                            <Route index element={<DashboardPage />} />
                            {/* <Route/> */}
                        </Route>

                    </Routes>
                </ThemeContextProvider>
            </Router>
        </GoogleOAuthProvider>
    </>
}

export default App



