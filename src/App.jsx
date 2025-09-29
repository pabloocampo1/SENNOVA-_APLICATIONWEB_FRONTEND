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
import EquipmentPage from "./pages/admin/inventoryEquipment/EquipmentPage"
import ReagmentPage from "./pages/admin/ReagmentPage"
import SettingPage from "./pages/admin/SettingPage"
import ProfilePage from "./pages/admin/ProfilePage"
import QuotesPage from "./pages/admin/QuotesPage"
import ResultsRelease from "./pages/admin/ResultsRelease"
import CustomersAndUsersPage from "./pages/admin/CustomersAndUsersPage"
import EquipmentInfo from "./pages/admin/inventoryEquipment/EquipmentInfo"
import SelectOptionToCheckInventoryPage from "./pages/admin/inventoryEquipment/SelectOptionToCheckInventoryPage"
import SearchOptionCheckInv from "./pages/admin/inventoryEquipment/SearchOptionCheckInv"
import LocationOptionCheckInv from "./pages/admin/inventoryEquipment/LocationOptionCheckInv"




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

                            <Route element={<PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]} />}>
                                <Route path="/system" element={<SystemLayaout />}>
                                    <Route index element={<DashboardPage />} />
                                    <Route path="settings" element={<SettingPage />} />
                                    <Route path="profile" element={<ProfilePage />} />


                                    <Route path="inventory/equipments" element={<EquipmentPage />} />
                                    <Route path="inventory/equipments/info/:idEquipment" element={<EquipmentInfo />} />
                                    <Route path="inventory/equipments/check" element={<SelectOptionToCheckInventoryPage />}/>
                                    <Route path="inventory/equipments/check/search" element={<SearchOptionCheckInv />}/>
                                    <Route path="inventory/equipments/check/location" element={<LocationOptionCheckInv />}/>


                                    <Route path="inventory/reagents" element={<ReagmentPage />} />
                                    <Route path="quotes" element={<QuotesPage />} />
                                    <Route path="results" element={<ResultsRelease />} />
                                    <Route path="users" element={<CustomersAndUsersPage />} />

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


