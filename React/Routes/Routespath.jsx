import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Routemiddleware from "../Middlewares/route.middleware";
import Layout from "../Layouts/Layout";
// Lazy load components agian
const AdminHome = React.lazy(() => import("../Pages/Admin/AdminHome"));
const UserHome = React.lazy(() => import("../Pages/User/UserHome"));
const SuperadminHome = React.lazy(
    () => import("../Pages/Superadmin/SuperadminHome"),
);
const Listmenu = React.lazy(() => import("../Pages/Admin/Listmenu"));
const Addmenu = React.lazy(() => import("../Pages/Admin/Addmenu"));

const Listreview = React.lazy(() => import("../Pages/Admin/Listreview"));
const Addreview = React.lazy(() => import("../Pages/Admin/Addreview"));

const Listbuisness = React.lazy(() => import("../Pages/Admin/BusinessList"));
const AddBusiness = React.lazy(() => import("../Pages/Admin/AddBusiness"));

const ListSettings = React.lazy(() => import("../Pages/Admin/ListSettings"));
const Addsetting = React.lazy(() => import("../Pages/Admin/AddSetting"));

const Register = React.lazy(() => import("../Pages/Auth/Register"));
const Login = React.lazy(() => import("../Pages/Auth/Login"));
const Error404 = React.lazy(() => import("../Pages/Auth/Error404"));
const ForgetPassword = React.lazy(() => import("../Pages/Auth/ForgotPassword"));
const Otp = React.lazy(() => import("../Pages/Auth/Otp"));
const ResetPassword = React.lazy(() => import("../Pages/Auth/ResetPassword"));

function Routespath() {
    return (
        <Router>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Routemiddleware
                                Component={UserHome}
                                name="UserHome"
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Routemiddleware
                                Component={Login}
                                name="UserHome"
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Routemiddleware
                                Component={Register}
                                name="Register"
                            />
                        }
                    />
                    <Route
                        path="/404"
                        element={
                            <Routemiddleware
                                Component={Error404}
                                name="Error404"
                            />
                        }
                    />
                    <Route
                        path="/otp"
                        element={<Routemiddleware Component={Otp} name="otp" />}
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <Routemiddleware
                                Component={ResetPassword}
                                name="ResetPassword"
                            />
                        }
                    />
                    <Route
                        path="/forget-password"
                        element={
                            <Routemiddleware
                                Component={ForgetPassword}
                                name="ForgetPassword"
                            />
                        }
                    />
                    <Route element={<Layout />}>
                        <Route
                            path="/admin"
                            element={
                                <Routemiddleware
                                    Component={AdminHome}
                                    name="AdminHome"
                                />
                            }
                        />
                        <Route
                            path="/admin/listmenu"
                            element={
                                <Routemiddleware
                                    Component={Listmenu}
                                    name="Listmenu"
                                />
                            }
                        />
                        <Route
                            path="/admin/addmenu"
                            element={
                                <Routemiddleware
                                    Component={Addmenu}
                                    name="Addmenu"
                                />
                            }
                        />
                        <Route
                            path="/admin/listreview"
                            element={
                                <Routemiddleware
                                    Component={Listreview}
                                    name="Listreview"
                                />
                            }
                        />
                        <Route
                            path="/admin/addreview"
                            element={
                                <Routemiddleware
                                    Component={Addreview}
                                    name="Addreview"
                                />
                            }
                        />
                        <Route
                            path="/admin/listbuisness"
                            element={
                                <Routemiddleware
                                    Component={Listbuisness}
                                    name="listbuisness"
                                />
                            }
                        />
                        <Route
                            path="/admin/addBusiness"
                            element={
                                <Routemiddleware
                                    Component={AddBusiness}
                                    name="addBusiness"
                                />
                            }
                        />

                        <Route
                            path="/admin/addsetting"
                            element={
                                <Routemiddleware
                                    Component={Addsetting}
                                    name="addsetting"
                                />
                            }
                        />
                                                <Route
                            path="/admin/listsetting"
                            element={
                                <Routemiddleware
                                    Component={ListSettings}
                                    name="listsetting"
                                />
                            }
                        />
                        <Route
                            path="/superadmin"
                            element={
                                <Routemiddleware
                                    Component={SuperadminHome}
                                    name="SuperadminHome"
                                />
                            }
                        />
                    </Route>
                </Routes>
            </React.Suspense>
        </Router>
    );
}

export default Routespath;
