import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import AuthLayaout from "./layouts/AuthLayaout";
import LoginPage from "./pages/auth/LoginCompo";
import SystemLayaout from "./layouts/SystemLayaout";
import DashboardPage from "./pages/admin/dashboard/dashboardPage";
import { ThemeContextProvider } from "./context/ThemeContextProvider";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { AuthContextProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import NoAccessModal from "./components/NoAccessModal";
import EquipmentPage from "./pages/admin/inventoryEquipment/EquipmentPage";
import ReagmentPage from "./pages/admin/inventoryReagent/ReagmentPage";
import SettingPage from "./pages/admin/SettingPage";
import ProfilePage from "./pages/admin/ProfilePage";
import QuotesPage from "./pages/admin/quotes/QuotesPage";
import ResultsRelease from "./pages/admin/ResultRelease/ResultsRelease";
import EquipmentInfo from "./pages/admin/inventoryEquipment/EquipmentInfo";
import SelectOptionToCheckInventoryPage from "./pages/admin/inventoryEquipment/SelectOptionToCheckInventoryPage";
import SearchOptionCheckInv from "./pages/admin/inventoryEquipment/SearchOptionCheckInv";
import LocationOptionCheckInv from "./pages/admin/inventoryEquipment/LocationOptionCheckInv";
import CustomersAndUsersPage from "./pages/admin/CustomerAndUsers/CustomersAndUsersPage";
import ReagentInfo from "./pages/admin/inventoryReagent/ReagentInfo";
import ReportEquipments from "./pages/admin/inventoryEquipment/ReportEquipments";
import PublicLayout from "./layouts/PublicLayout";
import QuotationCustomer from "./pages/public/QuotationCustomer";
import TestRequestInfo from "./pages/admin/ResultRelease/TestRequestInfo";
import SampleReceptionPage from "./pages/admin/ResultRelease/componentsTestRequets/SampleReceptionPage";
import ResultExecution from "./pages/admin/ResultRelease/ResultExecution";
import SampleReleaseResult from "./pages/admin/ResultRelease/componentsTestRequets/SampleReleaseResult";
import SamplesWithoutReception from "./pages/admin/ResultRelease/componentsTestRequets/ResultExecution/SamplesWithoutReception";
import ResultExecutionSamplesAvailable from "./pages/admin/ResultRelease/componentsTestRequets/ResultExecution/ResultExecutionSamplesAvailable";
import SamplesDelivered from "./pages/admin/ResultRelease/componentsTestRequets/ResultExecution/SamplesDelivered";
import ForgotPasswordCompo from "./pages/auth/ForgotPasswordCompo";

import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import TokenExpiredPage from "./pages/auth/TokenExpiredPage";
import AboutSystem from "./pages/admin/AboutSystemPage";
import UserManual from "./pages/admin/UserManual";
import Home from "./pages/public/Home";
import NoAccessPage from "./pages/public/NoAccessPage";
import ProductsInfoPage from "./pages/admin/analysis/ProductsInfoPage";
import MatrixAdminPage from "./pages/admin/analysis/MatrixPage";
import AnalysisPage from "./pages/admin/analysis/AnalysisPage";

function App() {
    return (
        <GoogleOAuthProvider clientId="205317144145-dntssvrb84osb754okeetq2349hua44f.apps.googleusercontent.com">
            <ThemeContextProvider>
                <Router>
                    <AuthContextProvider>
                        <Routes>
                            <Route path="/" element={<PublicLayout />}>
                                <Route index element={<Home />} />
                                <Route
                                    path="cotizacion"
                                    element={<QuotationCustomer />}
                                />
                                <Route
                                    path="no-access-role"
                                    element={<NoAccessPage />}
                                />
                            </Route>

                            <Route path="/signIn" element={<AuthLayaout />}>
                                <Route index element={<LoginPage />} />
                                <Route
                                    path="noAccess"
                                    element={<NoAccessModal />}
                                />
                                <Route
                                    path="forgot-password"
                                    element={<ForgotPasswordCompo />}
                                />
                                <Route
                                    path="change-password/:token"
                                    element={<ChangePasswordPage />}
                                />
                                <Route
                                    path="token-expired"
                                    element={<TokenExpiredPage />}
                                />
                            </Route>

                            <Route
                                element={
                                    <PrivateRoute
                                        allowedRoles={[
                                            "ROLE_ADMIN",
                                            "ROLE_SUPERADMIN",
                                            "ROLE_ANALYST",
                                        ]}
                                    />
                                }
                            >
                                <Route
                                    path="/system"
                                    element={<SystemLayaout />}
                                >
                                    {/* . RUTAS DE SISTEMA (ACCESO GENERAL) y RUTAS PARA ROLE_ANALYST*/}
                                    <Route index element={<DashboardPage />} />
                                    <Route
                                        path="settings"
                                        element={<SettingPage />}
                                    />
                                    <Route
                                        path="profile"
                                        element={<ProfilePage />}
                                    />
                                    <Route
                                        path="inventory/equipments"
                                        element={<EquipmentPage />}
                                    />
                                    <Route
                                        path="inventory/equipments/info/:idEquipment"
                                        element={<EquipmentInfo />}
                                    />
                                    <Route
                                        path="inventory/equipment/report"
                                        element={<ReportEquipments />}
                                    />

                                    <Route
                                        path="inventory/check/:typeInventory"
                                        element={
                                            <SelectOptionToCheckInventoryPage />
                                        }
                                    />
                                    <Route
                                        path="inventory/check/search/:typeInventory"
                                        element={<SearchOptionCheckInv />}
                                    />
                                    <Route
                                        path="inventory/check/location/:typeInventory"
                                        element={<LocationOptionCheckInv />}
                                    />
                                    <Route
                                        path="inventory/reagents"
                                        element={<ReagmentPage />}
                                    />
                                    <Route
                                        path="inventory/reagents/info/:reagentId"
                                        element={<ReagentInfo />}
                                    />
                                    <Route
                                        path="about-system"
                                        element={<AboutSystem />}
                                    />
                                    <Route
                                        path="user-guide"
                                        element={<UserManual />}
                                    />
                                    <Route
                                        path="results"
                                        element={<ResultsRelease />}
                                    />
                                    <Route
                                        path="result/test-request/:testRequestId"
                                        element={<TestRequestInfo />}
                                    />
                                    <Route
                                        path="result/test-request/:requestCode/:sampleId"
                                        element={<SampleReleaseResult />}
                                    />
                                    <Route
                                        path="result/test-request/:testRequestId/recepcion-muestras"
                                        element={<SampleReceptionPage />}
                                    />

                                    {/* . RUTAS SOLO PARA ADMIN Y SUPERADMIN  */}

                                    <Route
                                        element={
                                            <PrivateRoute
                                                allowedRoles={[
                                                    "ROLE_ADMIN",
                                                    "ROLE_SUPERADMIN",
                                                ]}
                                            />
                                        }
                                    >
                                        <Route
                                            path="quotes"
                                            element={<QuotesPage />}
                                        />
                                        <Route
                                            path="products"
                                            element={<AnalysisPage />}
                                        />
                                        <Route
                                            path="products/:analysisId/:analysisName"
                                            element={<ProductsInfoPage />}
                                        />
                                        <Route
                                            path="products/matrices"
                                            element={<MatrixAdminPage />}
                                        />
                                    </Route>

                                    <Route
                                        element={
                                            <PrivateRoute
                                                allowedRoles={[
                                                    "ROLE_SUPERADMIN",
                                                ]}
                                            />
                                        }
                                    >
                                        <Route
                                            path="result/execution-test"
                                            element={<ResultExecution />}
                                        >
                                            <Route
                                                index
                                                element={
                                                    <Navigate
                                                        to="available"
                                                        replace
                                                    />
                                                }
                                            />
                                            <Route
                                                path="available"
                                                element={
                                                    <ResultExecutionSamplesAvailable />
                                                }
                                            />
                                            <Route
                                                path="delivered"
                                                element={<SamplesDelivered />}
                                            />
                                            <Route
                                                path="without-reception"
                                                element={
                                                    <SamplesWithoutReception />
                                                }
                                            />
                                        </Route>

                                        <Route
                                            path="users"
                                            element={<CustomersAndUsersPage />}
                                        />
                                    </Route>
                                </Route>
                            </Route>
                        </Routes>
                    </AuthContextProvider>
                </Router>
            </ThemeContextProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
