import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ApplicationStore from "./utils/localStorageUtil";


const ProtectedCustomerRoutes = () => {
    const userToken = ApplicationStore().getStorage('token');
    const userRole = ApplicationStore().getStorage('userRole');
    return userToken && userRole == "user" ? <Outlet /> : <Navigate replace to="/login" />;
}

export default ProtectedCustomerRoutes;