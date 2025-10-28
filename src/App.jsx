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
import ReagmentPage from "./pages/admin/inventoryReagent/ReagmentPage"
import SettingPage from "./pages/admin/SettingPage"
import ProfilePage from "./pages/admin/ProfilePage" 
import QuotesPage from "./pages/admin/quotes/QuotesPage"
import ResultsRelease from "./pages/admin/ResultsRelease"

import EquipmentInfo from "./pages/admin/inventoryEquipment/EquipmentInfo"
import SelectOptionToCheckInventoryPage from "./pages/admin/inventoryEquipment/SelectOptionToCheckInventoryPage"
import SearchOptionCheckInv from "./pages/admin/inventoryEquipment/SearchOptionCheckInv"
import LocationOptionCheckInv from "./pages/admin/inventoryEquipment/LocationOptionCheckInv"
import CustomersAndUsersPage from "./pages/admin/CustomerAndUsers/CustomersAndUsersPage"
import ReagentInfo from "./pages/admin/inventoryReagent/ReagentInfo"
import ReportEquipments from "./pages/admin/inventoryEquipment/ReportEquipments"
import PublicLayout from "./layouts/PublicLayout"
import QuotationCustomer from "./pages/public/QuotationCustomer"




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

                            <Route path="/public" element={<PublicLayout />}>
                                <Route index element={<LoginPage />} />
                                <Route path="cotizacion/ensayo" element={<QuotationCustomer />} />
                            </Route>

                            <Route element={<PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]} />}>
                                <Route path="/system" element={<SystemLayaout />}>
                                    <Route index element={<DashboardPage />} />
                                    <Route path="settings" element={<SettingPage />} />
                                    <Route path="profile" element={<ProfilePage />} />

                                    <Route path="inventory/equipments" element={<EquipmentPage />} />
                                    <Route path="inventory/equipments/info/:idEquipment" element={<EquipmentInfo />} />
                                    <Route path="inventory/equipment/report" element={<ReportEquipments />}/>
                                    <Route path="inventory/check/:typeInventory" element={<SelectOptionToCheckInventoryPage />}/>
                                    <Route path="inventory/check/search/:typeInventory" element={<SearchOptionCheckInv />}/>
                                    <Route path="inventory/check/location/:typeInventory" element={<LocationOptionCheckInv />}/>
                                    
                                    


                                    <Route path="inventory/reagents" element={<ReagmentPage />} />
                                    <Route path="inventory/reagents/info/:reagentId" element={<ReagentInfo />}/>
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


