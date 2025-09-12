import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AuthLayaout from "./layouts/AuthLayaout"
import LoginPage from "./pages/auth/LoginPage"
import SystemLayaout from "./layouts/SystemLayaout"
import DashboardPage from "./pages/admin/dashboard/dashboardPage"
import { ThemeContextProvider } from "./context/ThemeContextProvider"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"

import { AuthContextProvider } from "./context/AuthContext"
import PrivateRoute from "./routes/PrivateRoute"
import NoAccessModal from "./components/NoAccessModal"




function App() {

    return <>
        <GoogleOAuthProvider clientId="205317144145-dntssvrb84osb754okeetq2349hua44f.apps.googleusercontent.com">
            <Router>
                <AuthContextProvider>
                    <ThemeContextProvider>
                        <Routes>
                            
                            <Route path="/signIn" element={<AuthLayaout />}>
                                <Route index element={<LoginPage />} />
                                 <Route path="noAccess" element={<NoAccessModal />} />
                            </Route>

                            <Route element={<PrivateRoute  allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}/>}>
                                <Route path="/system" element={<SystemLayaout />}>
                                    <Route index element={<DashboardPage />} />
                                    {/* <Route/> */}
                                </Route>
                            </Route>





                        </Routes>
                    </ThemeContextProvider>

                </AuthContextProvider>
            </Router>
        </GoogleOAuthProvider>
    </>
}

export default App


